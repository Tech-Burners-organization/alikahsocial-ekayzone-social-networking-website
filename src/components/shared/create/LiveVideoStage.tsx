"use client";

import type { RefObject } from "react";
import { Camera, CameraOff, Mic, MicOff } from "lucide-react";
import { cn } from "@/lib/utils";

function LiveDot() {
    return (
        <svg width="11" height="11" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M5.16362 1.57603L1.57603 5.16362C0.602613 6.13704 0.115902 6.62375 0.0225997 7.21284C-0.00753323 7.4031 -0.00753323 7.5969 0.0225997 7.78716C0.115902 8.37625 0.602612 8.86296 1.57603 9.83638L5.16362 13.424C6.13704 14.3974 6.62375 14.8841 7.21284 14.9774C7.4031 15.0075 7.5969 15.0075 7.78716 14.9774C8.37625 14.8841 8.86296 14.3974 9.83638 13.424L13.424 9.83638C14.3974 8.86296 14.8841 8.37624 14.9774 7.78716C15.0075 7.5969 15.0075 7.4031 14.9774 7.21284C14.8841 6.62375 14.3974 6.13704 13.424 5.16362L9.83638 1.57603C8.86296 0.602617 8.37625 0.115902 7.78716 0.0225997C7.5969 -0.00753323 7.4031 -0.00753323 7.21284 0.0225997C6.62375 0.115902 6.13704 0.602614 5.16362 1.57603Z"
                fill="white"
            />
        </svg>
    );
}

interface LiveVideoStageProps {
    videoRef: RefObject<HTMLVideoElement | null>;
    active: boolean;
    error: string | null;
    videoEnabled: boolean;
    audioEnabled: boolean;
    elapsedLabel: string;
    viewerLabel: string;
    onToggleVideo: () => void;
    onToggleAudio: () => void;
    onEndStream: () => void;
}

export function LiveVideoStage({
    videoRef,
    active,
    error,
    videoEnabled,
    audioEnabled,
    elapsedLabel,
    viewerLabel,
    onToggleVideo,
    onToggleAudio,
    onEndStream,
}: LiveVideoStageProps) {
    return (
        <div className="flex flex-1 flex-col gap-4">
            <div className="flex items-center gap-1.5">
                <span className="flex h-9 w-20 items-center justify-center gap-1.5 rounded-full bg-[#ff3366] text-base font-bold text-white shadow-sm">
                    <LiveDot />
                    Live
                </span>
                <span className="text-base font-bold text-foreground">{elapsedLabel}</span>
                <span className="ml-1 flex h-8 items-center gap-1 rounded-full bg-secondary-color px-2.5 text-sm font-semibold text-white">
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                        <circle cx="12" cy="12" r="3" />
                    </svg>
                    {viewerLabel}
                </span>
            </div>

            <div className="relative aspect-524/754 max-h-[70vh] w-full overflow-hidden rounded-lg bg-muted">
                <video ref={videoRef} autoPlay muted playsInline className={active ? "size-full object-cover" : "hidden"} />

                {!active && (
                    <div className="flex size-full flex-col items-center justify-center gap-2 px-6 text-center">
                        <p className="text-base text-muted-foreground">
                            {error ?? "Starting your camera…"}
                        </p>
                    </div>
                )}

                <div className="absolute inset-x-0 bottom-8 flex items-center justify-center gap-16">
                    <button
                        type="button"
                        onClick={onToggleVideo}
                        className="flex flex-col items-center gap-1"
                    >
                        <span
                            className={cn(
                                "flex size-11.75 items-center justify-center rounded-full",
                                videoEnabled ? "bg-black/40" : "bg-black/60"
                            )}
                        >
                            {videoEnabled ? (
                                <Camera className="size-6 text-white" />
                            ) : (
                                <CameraOff className="size-6 text-white" />
                            )}
                        </span>
                        <span className="text-sm font-bold text-foreground">
                            Camera {videoEnabled ? "On" : "Off"}
                        </span>
                    </button>

                    <button
                        type="button"
                        onClick={onToggleAudio}
                        className="flex flex-col items-center gap-1"
                    >
                        <span
                            className={cn(
                                "flex size-11.75 items-center justify-center rounded-full",
                                audioEnabled ? "bg-black/40" : "bg-black/60"
                            )}
                        >
                            {audioEnabled ? (
                                <Mic className="size-6 text-white" />
                            ) : (
                                <MicOff className="size-6 text-white" />
                            )}
                        </span>
                        <span className="text-sm font-bold text-foreground">
                            Mic {audioEnabled ? "On" : "Off"}
                        </span>
                    </button>
                </div>
            </div>

            <button
                type="button"
                onClick={onEndStream}
                className="h-10 w-fit rounded-full border border-[#d93f3f] bg-[#d93f3f] px-4 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#d93f3f]/90"
            >
                End Stream
            </button>
        </div>
    );
}
