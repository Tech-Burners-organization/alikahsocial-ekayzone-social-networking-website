// components/VideoPlayer.tsx
'use client';

import { memo, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import { ReelSeekBar } from './reels/ReelSeekBar';
import { BottomInfoBar } from './reels/BottomInfoBar';
import { LiveBadge } from './reels/LiveBadge';
import { LiveJoinOverlay } from './reels/LiveJoinOverlay';
import { PlaybackPulseOverlay, type PlaybackPulseHandle } from './reels/PlaybackPulseOverlay';
import { LikeBurstOverlay, type LikeBurstHandle } from './reels/LikeBurstOverlay';
import { ActionRail } from './reels/ActionRail';
import { CommentsSheet } from './reels/CommentsSheet';
import { ShareModal } from './reels/ShareModal';
import { ReportModal } from './reels/ReportModal';
import type { FeedItem } from './reels/types';

export interface VideoPlayerControls {
    togglePlayback: () => void;
}

interface VideoPlayerProps {
    item: FeedItem;
    isMuted: boolean;
    onMuteChange: (muted: boolean) => void;
    volume: number;
    onVolumeChange: (volume: number) => void;
    onActive?: () => void;
    ref?: React.Ref<VideoPlayerControls>;
}

type OverlayKind = 'comments' | 'share' | 'reportVideo' | null;

function VideoPlayer({ item, isMuted, onMuteChange, volume, onVolumeChange, onActive, ref }: VideoPlayerProps) {
    const router = useRouter();
    const videoRef = useRef<HTMLVideoElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const wasPlayingBeforeSeekRef = useRef(false);
    const seekRafRef = useRef<number | null>(null);
    const pulseRef = useRef<PlaybackPulseHandle>(null);
    const burstRef = useRef<LikeBurstHandle>(null);

    const [showVolumeControl, setShowVolumeControl] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isSeeking, setIsSeeking] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [hasJoinedLive, setHasJoinedLive] = useState(false);
    const [activeOverlay, setActiveOverlay] = useState<OverlayKind>(null);

    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    videoElement.play().catch(() => { }); // Handles browser autoplay blocking policies
                    onActive?.();
                } else {
                    videoElement.pause();
                    videoElement.currentTime = 0;
                }
            },
            { threshold: 0.6 } // High threshold guarantees accurate active slide selection
        );

        observer.observe(videoElement);
        return () => observer.disconnect();
    }, [onActive]);

    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        videoElement.muted = isMuted;
        videoElement.volume = volume;
    }, [isMuted, volume]);

    useEffect(() => {
        return () => {
            if (seekRafRef.current !== null) cancelAnimationFrame(seekRafRef.current);
        };
    }, []);

    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        const handleLoadedMetadata = () => setDuration(videoElement.duration || 0);
        const handleTimeUpdate = () => {
            if (isSeeking) return; // Avoid fighting the dragged thumb with playback ticks
            setCurrentTime(videoElement.currentTime);
        };

        videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);
        videoElement.addEventListener('timeupdate', handleTimeUpdate);

        if (videoElement.duration) setDuration(videoElement.duration);

        return () => {
            videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
            videoElement.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, [isSeeking]);

    // Translates a pointer's screen position into a video timestamp and applies it
    const seekToClientX = (clientX: number) => {
        const bar = progressBarRef.current;
        const videoElement = videoRef.current;
        if (!bar || !videoElement || !duration) return;

        const rect = bar.getBoundingClientRect();
        const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
        const nextTime = ratio * duration;

        setCurrentTime(nextTime); // Immediate visual feedback for the thumb/fill

        // Coalesce rapid pointermove events into one actual seek per frame,
        // since assigning currentTime forces the decoder to a keyframe each time.
        if (seekRafRef.current !== null) cancelAnimationFrame(seekRafRef.current);
        seekRafRef.current = requestAnimationFrame(() => {
            videoElement.currentTime = nextTime;
            seekRafRef.current = null;
        });
    };

    const handleProgressPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
        event.stopPropagation();

        const videoElement = videoRef.current;
        if (videoElement) {
            wasPlayingBeforeSeekRef.current = !videoElement.paused;
            videoElement.pause();
        }

        setIsSeeking(true);
        event.currentTarget.setPointerCapture(event.pointerId);
        seekToClientX(event.clientX);
    };

    const handleProgressPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
        if (!isSeeking) return;
        event.stopPropagation();
        seekToClientX(event.clientX);
    };

    const handleProgressPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
        if (!isSeeking) return;
        event.stopPropagation();
        setIsSeeking(false);

        const videoElement = videoRef.current;
        if (videoElement && wasPlayingBeforeSeekRef.current) {
            videoElement.play().catch(() => { });
        }
    };

    const progressPercent = duration ? (currentTime / duration) * 100 : 0;

    // Toggles playback state when clicking anywhere on the video player area.
    // Decided from videoElement.paused (not React state) so taps, spacebar, and
    // autoplay-block/IntersectionObserver-driven pauses never desync.
    const handleVideoClick = () => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        if (videoElement.paused) {
            videoElement.play().catch(() => { });
            pulseRef.current?.play('play');
        } else {
            videoElement.pause();
            pulseRef.current?.play('pause');
        }
    };

    useImperativeHandle(ref, () => ({ togglePlayback: handleVideoClick }));

    const handleMuteToggle = () => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        const nextMutedState = !videoElement.muted;
        videoElement.muted = nextMutedState;
        onMuteChange(nextMutedState);
    };

    const handleVolumeChange = (value: number) => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        onVolumeChange(value);
        videoElement.volume = value;
        if (value > 0) {
            onMuteChange(false);
        }
    };

    const handleToggleLike = () => {
        setIsLiked((prev) => {
            const next = !prev;
            if (next) burstRef.current?.play();
            return next;
        });
    };

    const handleToggleSave = () => {
        setIsSaved((prev) => {
            const next = !prev;
            toast.success(next ? 'Saved' : 'Removed from saved');
            return next;
        });
    };

    const closeOverlay = () => setActiveOverlay(null);

    return (
        <section data-reel-item="true" className="h-[calc(100vh-56px)] w-full snap-start snap-always relative flex items-center justify-center bg-zinc-950 font-sans select-none">

            {/*
        Responsive Outer Frame Container:
        Locks presentation to standard mobile view constraints (9:16 layout)
        even when deployed across wide desktop viewports.
      */}
            <div className="relative h-full w-full aspect-9/16 bg-black flex items-center justify-center overflow-hidden shadow-2xl">

                {/*
          Video Element Layer:
          'object-contain' keeps landscape videos letterboxed without cropping,
          while portrait videos automatically span full scale height.
        */}
                <video
                    ref={videoRef}
                    src={item.videoUrl}
                    onClick={handleVideoClick}
                    className="h-full w-full object-contain cursor-pointer"
                    loop={item.kind === 'reel'}
                    muted={isMuted}
                    playsInline
                    preload="metadata"
                />

                {item.kind === 'reel' && (
                    <ReelSeekBar
                        barRef={progressBarRef}
                        progressPercent={progressPercent}
                        isSeeking={isSeeking}
                        onPointerDown={handleProgressPointerDown}
                        onPointerMove={handleProgressPointerMove}
                        onPointerUp={handleProgressPointerUp}
                    />
                )}

                <PlaybackPulseOverlay ref={pulseRef} />
                <LikeBurstOverlay ref={burstRef} />

                {item.kind === 'live' ? (
                    <>
                        <LiveBadge viewerCount={item.viewerCount} />
                        {!hasJoinedLive ? (
                            <LiveJoinOverlay
                                username={item.username}
                                isVerified={item.isVerified}
                                caption={item.caption}
                                onJoin={() => setHasJoinedLive(true)}
                            />
                        ) : (
                            <button
                                type="button"
                                aria-label="Leave live"
                                onClick={() => setHasJoinedLive(false)}
                                className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </>
                ) : (
                    <div
                        className="absolute left-4 top-8 z-10 flex items-center gap-2 rounded-full bg-base-color/25 p-1.5 text-secondary-color backdrop-blur-sm transition"
                        onMouseEnter={() => setShowVolumeControl(true)}
                        onMouseLeave={() => setShowVolumeControl(false)}
                    >
                        <button
                            type="button"
                            onClick={handleMuteToggle}
                            className="rounded-full p-1 text-secondary-color"
                            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                        >
                            {isMuted || volume === 0 ? (
                                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M11 5L6 9H2v6h4l5 4V5z" />
                                    <line x1="22" y1="9" x2="16" y2="15" />
                                    <line x1="16" y1="9" x2="22" y2="15" />
                                </svg>
                            ) : (
                                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M11 5L6 9H2v6h4l5 4V5z" />
                                    <path d="M15.54 8.46a5 5 0 010 7.07" />
                                    <path d="M18.66 5.34a9 9 0 010 13.32" />
                                </svg>
                            )}
                        </button>

                        {showVolumeControl && (
                            <div className="relative flex items-center rounded-full px-1 py-0">
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={volume}
                                    onChange={(event) => handleVolumeChange(Number(event.target.value))}
                                    className="h-1 w-24 appearance-none rounded-full bg-zinc-500 accent-secondary-color focus:outline-none"
                                />
                            </div>
                        )}
                    </div>
                )}

                <BottomInfoBar
                    username={item.username}
                    isVerified={item.isVerified}
                    caption={item.caption}
                    hashtags={item.hashtags}
                    onAvatarClick={() => router.push(`/profile/${item.username}`)}
                />

                <ActionRail
                    isLiked={isLiked}
                    likeCount={item.likes + (isLiked ? 1 : 0)}
                    onToggleLike={handleToggleLike}
                    commentsCount={item.commentsCount}
                    onOpenComments={() => setActiveOverlay('comments')}
                    shareCount={item.shares}
                    onOpenShare={() => setActiveOverlay('share')}
                    isSaved={isSaved}
                    onToggleSave={handleToggleSave}
                    onViewProfile={() => router.push(`/profile/${item.username}`)}
                    onReportVideo={() => setActiveOverlay('reportVideo')}
                />
            </div>

            <CommentsSheet
                open={activeOverlay === 'comments'}
                onOpenChange={(open) => (open ? setActiveOverlay('comments') : closeOverlay())}
                kind={item.kind}
                commentsCount={item.commentsCount}
                comments={item.comments}
            />
            <ShareModal
                open={activeOverlay === 'share'}
                onOpenChange={(open) => (open ? setActiveOverlay('share') : closeOverlay())}
                shareUrl={typeof window !== 'undefined' ? window.location.href : ''}
                shareTitle={item.caption}
            />
            <ReportModal
                open={activeOverlay === 'reportVideo'}
                onOpenChange={(open) => (open ? setActiveOverlay('reportVideo') : closeOverlay())}
                target="video"
                targetUsername={item.username}
            />
        </section>
    );
}

export default memo(VideoPlayer);
