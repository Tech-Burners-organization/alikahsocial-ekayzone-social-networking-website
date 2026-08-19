import { BadgeCheck } from "lucide-react";
import { FollowButton } from "../FollowButton";

interface BottomInfoBarProps {
    username: string;
    isVerified: boolean;
    caption: string;
    hashtags: string[];
    onAvatarClick: () => void;
}

export function BottomInfoBar({ username, isVerified, caption, hashtags, onAvatarClick }: BottomInfoBarProps) {
    // The bottom padding clears the seek bar plus any iOS home indicator.
    return (
        <div className="absolute bottom-0 left-0 right-0 px-4 pt-4 pb-[calc(1.5rem+env(safe-area-inset-bottom))] bg-linear-to-t from-black/80 via-black/20 to-transparent pointer-events-none flex flex-col gap-3">
            {/* Channel Info & Follow Action */}
            <div className="flex items-center gap-2 pointer-events-auto">
                <button
                    type="button"
                    onClick={onAvatarClick}
                    aria-label={`View ${username}'s profile`}
                    className="w-9 h-9 rounded-full bg-linear-to-tr from-secondary-color to-secondary-color/50 p-0.5"
                >
                    <div className="w-full h-full rounded-full bg-zinc-800 border-2 border-black" />
                </button>
                <button type="button" onClick={onAvatarClick} className="text-white text-sm font-semibold tracking-wide flex items-center gap-1">
                    @{username}
                    {isVerified && <BadgeCheck className="h-3.5 w-3.5 fill-secondary-color text-black" />}
                </button>
                <FollowButton />
            </div>

            {/* Caption & Contextual Tag Blocks */}
            <div className="text-white text-xs flex flex-col gap-1.5 max-w-[85%]">
                <p className="font-medium leading-relaxed drop-shadow-sm">{caption}</p>
                <div className="flex gap-2 text-zinc-300 font-semibold tracking-normal">
                    {hashtags.map((tag) => (
                        <span key={tag}>{tag}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}
