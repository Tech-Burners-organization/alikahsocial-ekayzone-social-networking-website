import { Eye } from "lucide-react";
import { formatCompactNumber } from "@/lib/format";

interface LiveBadgeProps {
    viewerCount: number;
}

// Top-left "● Live  👁 7.4K" pill — occupies the corner the mute control uses on
// reels; live items have no mute control of their own (muting is still driven by
// the shared isMuted state, just without a per-item UI toggle here).
export function LiveBadge({ viewerCount }: LiveBadgeProps) {
    return (
        <div className="absolute left-4 top-4 z-20 flex items-center gap-2">
            <span className="flex items-center gap-1 rounded-full bg-rose-500 px-2.5 py-1 text-xs font-bold text-white shadow-md">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                Live
            </span>
            <span className="flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                <Eye className="h-3.5 w-3.5" />
                {formatCompactNumber(viewerCount)}
            </span>
        </div>
    );
}
