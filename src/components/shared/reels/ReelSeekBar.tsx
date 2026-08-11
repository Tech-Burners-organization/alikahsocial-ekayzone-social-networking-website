import type { RefObject } from "react";

interface ReelSeekBarProps {
    barRef: RefObject<HTMLDivElement | null>;
    progressPercent: number;
    isSeeking: boolean;
    onPointerDown: (event: React.PointerEvent<HTMLDivElement>) => void;
    onPointerMove: (event: React.PointerEvent<HTMLDivElement>) => void;
    onPointerUp: (event: React.PointerEvent<HTMLDivElement>) => void;
}

// Instagram-style drag-to-scrub progress track, pinned to the bottom of the video.
export function ReelSeekBar({ barRef, progressPercent, isSeeking, onPointerDown, onPointerMove, onPointerUp }: ReelSeekBarProps) {
    return (
        <div
            ref={barRef}
            className="absolute bottom-0 left-0 right-0 z-30 flex items-center px-0 py-2 cursor-pointer touch-none"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
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
                    className={`absolute top-1/2 h-3 w-3 -translate-y-1/2 -translate-x-1/2 rounded-full bg-secondary-color shadow-md transition-opacity ${isSeeking ? "opacity-100 scale-125" : "opacity-0"}`}
                    style={{ left: `${progressPercent}%` }}
                />
            </div>
        </div>
    );
}
