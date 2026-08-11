// app/reels/page.tsx
'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import VideoPlayer, { type VideoPlayerControls } from '../shared/VideoPlayer';
import { FeedTabs, type FeedTab } from '../shared/reels/FeedTabs';
import { ReelSkeleton } from '../shared/reels/ReelSkeleton';
import { useFeedWindow } from '../shared/reels/useFeedWindow';

const NAVIGATION_SETTLE_MS = 700; // Matches the native smooth-scroll duration for one viewport

export default function ReelsSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeTab, setActiveTab] = useState<FeedTab>('for-you');
    const [isMuted, setIsMuted] = useState(true);
    const [volume, setVolume] = useState(0.8);
    const containerRef = useRef<HTMLElement>(null);
    const activeControlsRef = useRef<VideoPlayerControls>(null);
    const startYRef = useRef<number | null>(null);
    const deltaYRef = useRef(0);
    const navigationLockRef = useRef(false);
    const navigationTimeoutRef = useRef<number | null>(null);
    const activeIndexRef = useRef(0);

    // Only these 3 indices are ever mounted, so the DOM/video element count stays
    // flat no matter how far the user scrolls (previous, current, next).
    const windowStart = Math.max(0, activeIndex - 1);
    const mountedIndices = [windowStart, windowStart + 1, windowStart + 2];
    const activePositionInWindow = activeIndex - windowStart;

    const { getItemAt } = useFeedWindow(mountedIndices);

    // When the window shifts (a reel enters/leaves), the DOM reorders and the
    // current item's offset within the container changes even though nothing
    // moved on screen. Recenter scrollTop instantly to match, so the reorder is
    // invisible. Skipped when the window doesn't shift (the very first/last step
    // at the start of the feed), letting the smooth scrollIntoView animate freely.
    const prevWindowStartRef = useRef(windowStart);
    useLayoutEffect(() => {
        const container = containerRef.current;
        if (container && prevWindowStartRef.current !== windowStart) {
            container.scrollTop = activePositionInWindow * container.clientHeight;
        }
        prevWindowStartRef.current = windowStart;
    }, [windowStart, activePositionInWindow]);

    const scrollToPosition = (position: number) => {
        const container = containerRef.current;
        if (!container) return;

        const reelItems = Array.from(container.children).filter(
            (child): child is HTMLElement => child instanceof HTMLElement && child.getAttribute('data-reel-item') === 'true'
        );

        reelItems[position]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const navigateByDirection = useCallback((direction: 1 | -1) => {
        if (navigationLockRef.current) return;

        const nextIndex = Math.max(0, activeIndexRef.current + direction);
        if (nextIndex === activeIndexRef.current) return;

        navigationLockRef.current = true;

        // Scroll smoothly to the target while it's still part of the current
        // window; the mounted window itself only swaps once this animation has
        // had time to settle (see the recenter effect above), so the swap never
        // shows as a jump.
        const oldWindowStart = Math.max(0, activeIndexRef.current - 1);
        scrollToPosition(nextIndex - oldWindowStart);

        if (navigationTimeoutRef.current) window.clearTimeout(navigationTimeoutRef.current);
        navigationTimeoutRef.current = window.setTimeout(() => {
            activeIndexRef.current = nextIndex;
            setActiveIndex(nextIndex);
            navigationLockRef.current = false;
            navigationTimeoutRef.current = null;
        }, NAVIGATION_SETTLE_MS);
    }, []);

    const handleTabChange = (tab: FeedTab) => {
        if (tab === activeTab) return;
        setActiveTab(tab);

        if (navigationTimeoutRef.current) {
            window.clearTimeout(navigationTimeoutRef.current);
            navigationTimeoutRef.current = null;
        }
        navigationLockRef.current = false;
        activeIndexRef.current = 0;
        setActiveIndex(0);

        // The recenter effect only fires when the mounted window itself shifts,
        // which it won't if we were already at index 0 or 1 (windowStart stays 0
        // either way) — reset the scroll position directly so switching tabs
        // always jumps back to the top.
        if (containerRef.current) containerRef.current.scrollTop = 0;
    };

    const handleSwipeStart = (clientY: number) => {
        startYRef.current = clientY;
        deltaYRef.current = 0;
    };

    const handleSwipeMove = (clientY: number) => {
        if (startYRef.current === null) return;
        deltaYRef.current = clientY - startYRef.current;
    };

    const handleSwipeEnd = () => {
        if (startYRef.current === null) return;

        if (deltaYRef.current < -70) {
            navigateByDirection(1);
        } else if (deltaYRef.current > 70) {
            navigateByDirection(-1);
        }

        startYRef.current = null;
        deltaYRef.current = 0;
    };

    // React's onWheel prop is always registered as a passive listener, so it can't
    // call preventDefault(). A native listener is required to stop the page from
    // scrolling normally while we drive our own snap-navigation.
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (event: WheelEvent) => {
            if (Math.abs(event.deltaY) < 60) return;
            event.preventDefault();
            navigateByDirection(event.deltaY > 0 ? 1 : -1);
        };

        container.addEventListener('wheel', handleWheel, { passive: false });
        return () => container.removeEventListener('wheel', handleWheel);
    }, [navigateByDirection]);

    // Spacebar toggles play/pause on whichever reel is currently active, unless
    // focus is inside a text field (e.g. the comments sheet's input).
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.code !== 'Space') return;

            const target = event.target as HTMLElement | null;
            if (target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA' || target?.isContentEditable) return;

            event.preventDefault();
            activeControlsRef.current?.togglePlayback();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        return () => {
            if (navigationTimeoutRef.current) {
                window.clearTimeout(navigationTimeoutRef.current);
            }
        };
    }, []);

    return (
        <>
            <FeedTabs activeTab={activeTab} onTabChange={handleTabChange} />
            <main
                ref={containerRef}
                onTouchStart={(event) => handleSwipeStart(event.touches[0]?.clientY ?? 0)}
                onTouchMove={(event) => handleSwipeMove(event.touches[0]?.clientY ?? 0)}
                onTouchEnd={handleSwipeEnd}
                className="h-full w-full overflow-y-auto overflow-x-hidden touch-pan-y scroll-smooth snap-y snap-mandatory bg-zinc-950 scrollbar-none"
            >
                {mountedIndices.map((index) => {
                    const item = getItemAt(index);
                    if (!item) return <ReelSkeleton key={`skeleton-${index}`} />;

                    return (
                        <VideoPlayer
                            key={item.id}
                            ref={index === activeIndex ? activeControlsRef : null}
                            item={item}
                            isMuted={isMuted}
                            onMuteChange={setIsMuted}
                            volume={volume}
                            onVolumeChange={setVolume}
                        />
                    );
                })}
            </main>
        </>
    );
}
