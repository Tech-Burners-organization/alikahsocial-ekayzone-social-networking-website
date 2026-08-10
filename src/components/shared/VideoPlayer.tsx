// components/VideoPlayer.tsx
'use client';

import { memo, useEffect, useRef, useState } from 'react';

interface VideoPlayerProps {
    src: string;
    username: string;
    caption: string;
    likes: string;
    comments: string;
    shares: string;
    isMuted: boolean;
    onMuteChange: (muted: boolean) => void;
    volume: number;
    onVolumeChange: (volume: number) => void;
}

function VideoPlayer({ src, username, caption, likes, comments, shares, isMuted, onMuteChange, volume, onVolumeChange }: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const wasPlayingBeforeSeekRef = useRef(false);
    const iconTimeoutRef = useRef<number | null>(null);
    const seekRafRef = useRef<number | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showVolumeControl, setShowVolumeControl] = useState(false);
    const [showPlaybackIcon, setShowPlaybackIcon] = useState(false);
    const [playbackIcon, setPlaybackIcon] = useState<'play' | 'pause'>('play');
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isSeeking, setIsSeeking] = useState(false);

    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    videoElement.play()
                        .then(() => setIsPlaying(true))
                        .catch(() => setIsPlaying(false)); // Handles browser autoplay blocking policies
                } else {
                    videoElement.pause();
                    setIsPlaying(false);
                    videoElement.currentTime = 0;
                }
            },
            { threshold: 0.6 } // High threshold guarantees accurate active slide selection
        );

        observer.observe(videoElement);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        videoElement.muted = isMuted;
        videoElement.volume = volume;
    }, [isMuted, volume]);

    useEffect(() => {
        return () => {
            if (iconTimeoutRef.current !== null) window.clearTimeout(iconTimeoutRef.current);
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
            videoElement.play().then(() => setIsPlaying(true)).catch(() => { });
        }
    };

    const progressPercent = duration ? (currentTime / duration) * 100 : 0;

    // Toggles playback state when clicking anywhere on the video player area
    const handleVideoClick = () => {
        if (!videoRef.current) return;

        if (isPlaying) {
            videoRef.current.pause();
            setIsPlaying(false);
            setPlaybackIcon('pause');
        } else {
            videoRef.current.play().catch(() => { });
            setIsPlaying(true);
            setPlaybackIcon('play');
        }

        setShowPlaybackIcon(true);
        if (iconTimeoutRef.current !== null) {
            window.clearTimeout(iconTimeoutRef.current);
        }
        iconTimeoutRef.current = window.setTimeout(() => {
            setShowPlaybackIcon(false);
            iconTimeoutRef.current = null;
        }, 800);
    };

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
                    src={src}
                    onClick={handleVideoClick}
                    className="h-full w-full object-contain cursor-pointer"
                    loop
                    muted={isMuted}
                    playsInline
                    preload="metadata"
                />

                {/* --- SEEK BAR (Instagram-style drag-to-scrub progress track) --- */}
                <div
                    ref={progressBarRef}
                    className="absolute bottom-0 left-0 right-0 z-30 flex items-center px-0 py-2 cursor-pointer touch-none"
                    onPointerDown={handleProgressPointerDown}
                    onPointerMove={handleProgressPointerMove}
                    onPointerUp={handleProgressPointerUp}
                    onPointerCancel={handleProgressPointerUp}
                    onTouchStart={(event) => event.stopPropagation()}
                    onTouchMove={(event) => event.stopPropagation()}
                    onTouchEnd={(event) => event.stopPropagation()}
                    onClick={(event) => event.stopPropagation()}
                >
                    <div className="relative h-0.75 w-full rounded-full bg-white/30">
                        <div
                            className="absolute left-0 top-0 h-full rounded-full bg-secondary-color"
                            style={{ width: `${progressPercent}%` }}
                        />
                        <div
                            className={`absolute top-1/2 h-3 w-3 -translate-y-1/2 -translate-x-1/2 rounded-full bg-secondary-color shadow-md transition-opacity ${isSeeking ? 'opacity-100 scale-125' : 'opacity-0'}`}
                            style={{ left: `${progressPercent}%` }}
                        />
                    </div>
                </div>

                {showPlaybackIcon && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/10">
                        <div className="rounded-full bg-black/50 p-5 text-white shadow-lg backdrop-blur-sm">
                            {playbackIcon === 'play' ? (
                                <svg className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            ) : (
                                <svg className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
                                </svg>
                            )}
                        </div>
                    </div>
                )}

                {/* --- BOTTOM INTERACTION & OVERLAY GRAPHICS --- */}
                <div className="absolute bottom-0 left-0 right-0 px-4 pt-4 pb-6 bg-linear-to-t from-black/80 via-black/20 to-transparent pointer-events-none flex flex-col gap-3">

                    {/* Channel Info & Follow Action */}
                    <div className="flex items-center gap-2 pointer-events-auto">
                        <div className="w-9 h-9 rounded-full bg-linear-to-tr from-secondary-color to-secondary-color/50 p-0.5">
                            <div className="w-full h-full rounded-full bg-zinc-800 border-2 border-black" />
                        </div>
                        <span className="text-white text-sm font-semibold tracking-wide flex items-center gap-1">
                            @{username}
                            <span className="text-emerald-400 text-xs">●</span>
                        </span>
                        <button className="ml-1 bg-emerald-500 hover:bg-emerald-600 transition-colors text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                            Follow
                        </button>
                    </div>

                    {/* Caption & Contextual Tag Blocks */}
                    <div className="text-white text-xs flex flex-col gap-1.5 max-w-[85%]">
                        <p className="font-medium leading-relaxed drop-shadow-sm">{caption}</p>
                        <div className="flex gap-2 text-zinc-300 font-semibold tracking-normal">
                            <span>#LearnWithMe</span>
                            <span>#Education</span>
                        </div>
                    </div>
                </div>

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

                {/* --- RIGHT ACTION CONTROL BAR --- */}
                <div className="absolute right-4 bottom-24 flex flex-col items-center gap-5 text-white z-10">

                    {/* Like Utility Node */}
                    <div className="flex flex-col items-center gap-1 cursor-pointer group">
                        <div className="p-2.5 rounded-full bg-transparent group-hover:bg-white/10 transition-colors">
                            <svg className="w-6 h-6 stroke-current fill-none transition-transform group-active:scale-90" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                        <span className="text-xs font-semibold tracking-wide drop-shadow-md">{likes}</span>
                    </div>

                    {/* Comment Utility Node */}
                    <div className="flex flex-col items-center gap-1 cursor-pointer group">
                        <div className="p-2.5 rounded-full bg-transparent group-hover:bg-white/10 transition-colors">
                            <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <span className="text-xs font-semibold tracking-wide drop-shadow-md">{comments}</span>
                    </div>

                    {/* Share Utility Node */}
                    <div className="flex flex-col items-center gap-1 cursor-pointer group">
                        <div className="p-2.5 rounded-full bg-transparent group-hover:bg-white/10 transition-colors">
                            <svg className="w-6 h-6 stroke-current fill-none transform rotate-45" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </div>
                        <span className="text-xs font-semibold tracking-wide drop-shadow-md">{shares}</span>
                    </div>

                    {/* Bookmark Utility Node */}
                    <div className="flex flex-col items-center cursor-pointer group pt-1">
                        <div className="p-2.5 rounded-full bg-transparent group-hover:bg-white/10 transition-colors">
                            <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </svg>
                        </div>
                    </div>

                    {/* More Menu Node */}
                    <div className="flex flex-col items-center cursor-pointer group">
                        <div className="p-2.5 rounded-full bg-transparent group-hover:bg-white/10 transition-colors">
                            <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}

export default memo(VideoPlayer);
