import { formatCompactNumber } from "@/lib/format";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ActionRailProps {
    isLiked: boolean;
    likeCount: number;
    onToggleLike: () => void;
    commentsCount: number;
    onOpenComments: () => void;
    shareCount: number;
    onOpenShare: () => void;
    isSaved: boolean;
    onToggleSave: () => void;
    onViewProfile: () => void;
    onReportVideo: () => void;
}

export function ActionRail({
    isLiked,
    likeCount,
    onToggleLike,
    commentsCount,
    onOpenComments,
    shareCount,
    onOpenShare,
    isSaved,
    onToggleSave,
    onViewProfile,
    onReportVideo,
}: ActionRailProps) {
    return (
        <div className="absolute right-4 bottom-24 flex flex-col items-center gap-5 text-white z-10">
            {/* Like Utility Node */}
            <button type="button" onClick={onToggleLike} aria-label="Like" className="flex flex-col items-center gap-1 cursor-pointer group" aria-pressed={isLiked}>
                <div className="p-2.5 rounded-full bg-transparent group-hover:bg-white/10 transition-colors">
                    <svg
                        className={`w-6 h-6 transition-transform group-active:scale-90 ${isLiked ? "fill-rose-500 stroke-rose-500" : "fill-none stroke-current"}`}
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </div>
                <span className="text-xs font-semibold tracking-wide drop-shadow-md">{formatCompactNumber(likeCount)}</span>
            </button>

            {/* Comment Utility Node */}
            <button type="button" onClick={onOpenComments} aria-label="Comments" className="flex flex-col items-center gap-1 cursor-pointer group">
                <div className="p-2.5 rounded-full bg-transparent group-hover:bg-white/10 transition-colors">
                    <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                </div>
                <span className="text-xs font-semibold tracking-wide drop-shadow-md">{formatCompactNumber(commentsCount)}</span>
            </button>

            {/* Share Utility Node */}
            <button type="button" onClick={onOpenShare} aria-label="Share" className="flex flex-col items-center gap-1 cursor-pointer group">
                <div className="p-2.5 rounded-full bg-transparent group-hover:bg-white/10 transition-colors">
                    <svg className="w-6 h-6 stroke-current fill-none transform rotate-45" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                </div>
                <span className="text-xs font-semibold tracking-wide drop-shadow-md">{formatCompactNumber(shareCount)}</span>
            </button>

            {/* Bookmark Utility Node */}
            <button type="button" onClick={onToggleSave} aria-label="Save" className="flex flex-col items-center cursor-pointer group pt-1" aria-pressed={isSaved}>
                <div className="p-2.5 rounded-full bg-transparent group-hover:bg-white/10 transition-colors">
                    <svg className={`w-6 h-6 ${isSaved ? "fill-secondary-color stroke-secondary-color" : "fill-none stroke-current"}`} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                </div>
            </button>

            {/* More Menu Node */}
            <DropdownMenu>
                <DropdownMenuTrigger
                    render={
                        <button type="button" className="flex flex-col items-center cursor-pointer group" aria-label="More options">
                            <div className="p-2.5 rounded-full bg-transparent group-hover:bg-white/10 transition-colors">
                                <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                </svg>
                            </div>
                        </button>
                    }
                />
                <DropdownMenuContent side="top" align="end" sideOffset={8}>
                    <DropdownMenuItem className="cursor-pointer" onClick={onViewProfile}>
                        View Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={onReportVideo}>
                        Report Video
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
