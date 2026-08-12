'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import VideoPlayer, { type VideoPlayerControls } from '../VideoPlayer';
import type { FeedItem } from './types';

interface ReelsProps {
    items: FeedItem[];
}

interface IndexHandlers {
    ref: (instance: VideoPlayerControls | null) => void;
    onActive: () => void;
}

// A reusable, purely data-driven reels feed: pass in whatever items you want
// scrolled through (the home feed, one user's videos, …) and it renders them in
// a native CSS scroll-snap list. No pagination, no windowed mounting — the
// browser's own scroll-snap handles navigation, and each VideoPlayer's existing
// IntersectionObserver drives its own play/pause.
export function Reels({ items }: ReelsProps) {
    const [isMuted, setIsMuted] = useState(true);
    const [volume, setVolume] = useState(0.8);
    const controlsMapRef = useRef(new Map<number, VideoPlayerControls>());
    const activeIndexRef = useRef(0);

    // One stable {ref, onActive} pair per index, so VideoPlayer's memo() isn't
    // busted by a fresh callback identity every render. The closures only touch
    // controlsMapRef/activeIndexRef when actually invoked later (as a ref
    // callback during commit, or from the IntersectionObserver) — never during
    // this render itself.
    const handlers = useMemo<IndexHandlers[]>(
        () =>
            items.map((_, index) => ({
                ref: (instance) => {
                    if (instance) controlsMapRef.current.set(index, instance);
                    else controlsMapRef.current.delete(index);
                },
                onActive: () => {
                    activeIndexRef.current = index;
                },
            })),
        [items]
    );

    // Spacebar toggles play/pause on whichever reel is currently in view, unless
    // focus is inside a text field (e.g. the comments sheet's input).
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.code !== 'Space') return;

            const target = event.target as HTMLElement | null;
            if (target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA' || target?.isContentEditable) return;

            event.preventDefault();
            controlsMapRef.current.get(activeIndexRef.current)?.togglePlayback();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <main className="h-full w-full overflow-y-auto overflow-x-hidden touch-pan-y scroll-smooth snap-y snap-mandatory bg-zinc-950 scrollbar-none">
            {items.map((item, index) => (
                <VideoPlayer
                    key={item.id}
                    ref={handlers[index].ref}
                    item={item}
                    isMuted={isMuted}
                    onMuteChange={setIsMuted}
                    volume={volume}
                    onVolumeChange={setVolume}
                    onActive={handlers[index].onActive}
                />
            ))}
        </main>
    );
}
