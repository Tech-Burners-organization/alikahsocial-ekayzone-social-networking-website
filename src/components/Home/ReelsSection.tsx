// app/reels/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
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

const loadBatch = (pageIndex: number): FeedItem[] => [
    {
        id: `reel-${pageIndex}-1`,
        url: './video/video1.mp4',
        username: 'learn_with_thandi',
        caption: "Grade 12 Math's made easy! Part 1 📐 #LearnWithMe #Education",
        likes: '1.2K',
        comments: '124',
        shares: '1.2K'
    },
    {
        id: `reel-${pageIndex}-2`,
        url: './video/video2.mp4',
        username: 'animation_hub',
        caption: 'Testing standard landscape aspect ratio tracking natively in your UI framework 🐰',
        likes: '4.8K',
        comments: '312',
        shares: '840'
    },
    {
        id: `reel-${pageIndex}-3`,
        url: './video/video3.mp4',
        username: 'tech_reviews',
        caption: 'Auto-play testing and interactive tap actions running perfectly! ⚡',
        likes: '822',
        comments: '45',
        shares: '109'
    }
];
export default function ReelsSection() {
    const [feed, setFeed] = useState<FeedItem[]>(() => loadBatch(1));
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMuted, setIsMuted] = useState(true);
    const [volume, setVolume] = useState(0.8);
    const triggerRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLElement>(null);
    const startYRef = useRef<number | null>(null);
    const deltaYRef = useRef(0);
    const navigationLockRef = useRef(false);
    const navigationTimeoutRef = useRef<number | null>(null);
    const activeIndexRef = useRef(0);

    const clearNavigationLock = () => {
        if (navigationTimeoutRef.current) {
            window.clearTimeout(navigationTimeoutRef.current);
        }

        navigationTimeoutRef.current = window.setTimeout(() => {
            navigationLockRef.current = false;
        }, 700);
    };

    const scrollToVideo = (index: number) => {
        const container = containerRef.current;
        if (!container) return;

        const reelItems = Array.from(container.children).filter(
            (child): child is HTMLElement => child instanceof HTMLElement && child.getAttribute('data-reel-item') === 'true'
        );

        const nextIndex = Math.max(0, Math.min(index, reelItems.length - 1));
        if (nextIndex === activeIndexRef.current) return;

        activeIndexRef.current = nextIndex;
        setActiveIndex(nextIndex);

        const targetItem = reelItems[nextIndex];
        if (targetItem) {
            targetItem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const navigateByDirection = (direction: 1 | -1) => {
        if (navigationLockRef.current) return;

        navigationLockRef.current = true;
        clearNavigationLock();
        scrollToVideo(activeIndexRef.current + direction);
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

    useEffect(() => {
        const trigger = triggerRef.current;
        if (!trigger) return;

        const pipeline = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setFeed((current) => [...current, ...loadBatch(Math.floor(current.length / 2) + 1)]);
                }
            },
            { threshold: 0.1 }
        );

        pipeline.observe(trigger);
        return () => pipeline.disconnect();
    }, []);

    useEffect(() => {
        return () => {
            if (navigationTimeoutRef.current) {
                window.clearTimeout(navigationTimeoutRef.current);
            }
        };
    }, []);

    console.log(feed)

    return (
        <main
            ref={containerRef}
            onTouchStart={(event) => handleSwipeStart(event.touches[0]?.clientY ?? 0)}
            onTouchMove={(event) => handleSwipeMove(event.touches[0]?.clientY ?? 0)}
            onTouchEnd={handleSwipeEnd}
            onWheel={(event) => {
                if (Math.abs(event.deltaY) < 60) return;
                event.preventDefault();
                navigateByDirection(event.deltaY > 0 ? 1 : -1);
            }}
            className="h-full w-full overflow-y-auto overflow-x-hidden touch-pan-y scroll-smooth snap-y snap-mandatory bg-zinc-950 scrollbar-none"
        >
            {feed.map((item) => (
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
            ))}
            <div ref={triggerRef} className="h-2 snap-start bg-transparent w-full" />
        </main>
    );
}
