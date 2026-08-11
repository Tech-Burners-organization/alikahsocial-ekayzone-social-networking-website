// app/reels/page.tsx
'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import VideoPlayer from '../shared/VideoPlayer';

interface FeedItem {
    id: string;
    url: string;
    username: string;
    caption: string;
    likes: string;
    comments: string;
    shares: string;
}

// Content cycles through these templates forever. Swap getReelAt's body for a real
// paginated fetch keyed by index once the backend serves unique per-reel content —
// the sliding-window mounting below stays valid either way.
const REEL_TEMPLATES: Omit<FeedItem, 'id'>[] = [
    {
        url: './video/video1.mp4',
        username: 'learn_with_thandi',
        caption: "Grade 12 Math's made easy! Part 1 📐 #LearnWithMe #Education",
        likes: '1.2K',
        comments: '124',
        shares: '1.2K'
    },
    {
        url: './video/video2.mp4',
        username: 'animation_hub',
        caption: 'Testing standard landscape aspect ratio tracking natively in your UI framework 🐰',
        likes: '4.8K',
        comments: '312',
        shares: '840'
    },
    {
        url: './video/video3.mp4',
        username: 'tech_reviews',
        caption: 'Auto-play testing and interactive tap actions running perfectly! ⚡',
        likes: '822',
        comments: '45',
        shares: '109'
    }
];

const getReelAt = (index: number): FeedItem => ({
    id: `reel-${index}`,
    ...REEL_TEMPLATES[index % REEL_TEMPLATES.length]
});

const NAVIGATION_SETTLE_MS = 700; // Matches the native smooth-scroll duration for one viewport

export default function ReelsSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMuted, setIsMuted] = useState(true);
    const [volume, setVolume] = useState(0.8);
    const containerRef = useRef<HTMLElement>(null);
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

    useEffect(() => {
        return () => {
            if (navigationTimeoutRef.current) {
                window.clearTimeout(navigationTimeoutRef.current);
            }
        };
    }, []);

    return (
        <main
            ref={containerRef}
            onTouchStart={(event) => handleSwipeStart(event.touches[0]?.clientY ?? 0)}
            onTouchMove={(event) => handleSwipeMove(event.touches[0]?.clientY ?? 0)}
            onTouchEnd={handleSwipeEnd}
            className="h-full w-full overflow-y-auto overflow-x-hidden touch-pan-y scroll-smooth snap-y snap-mandatory bg-zinc-950 scrollbar-none"
        >
            {mountedIndices.map((index) => {
                const item = getReelAt(index);
                return (
                    <VideoPlayer
                        key={item.id}
                        src={item.url}
                        username={item.username}
                        caption={item.caption}
                        likes={item.likes}
                        comments={item.comments}
                        shares={item.shares}
                        isMuted={isMuted}
                        onMuteChange={setIsMuted}
                        volume={volume}
                        onVolumeChange={setVolume}
                    />
                );
            })}
        </main>
    );
}
