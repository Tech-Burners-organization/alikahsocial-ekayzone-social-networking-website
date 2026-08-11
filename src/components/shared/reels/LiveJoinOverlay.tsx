import { BadgeCheck, Radio } from "lucide-react";

interface LiveJoinOverlayProps {
    username: string;
    isVerified: boolean;
    caption: string;
    onJoin: () => void;
}

export function LiveJoinOverlay({ username, isVerified, caption, onJoin }: LiveJoinOverlayProps) {
    return (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/30 pointer-events-auto">
            <div className="flex flex-col items-center gap-2 px-6 text-center pointer-events-auto">
                <div className="h-16 w-16 rounded-full bg-linear-to-tr from-rose-500 to-rose-300 p-0.5">
                    <div className="h-full w-full rounded-full bg-zinc-800 border-2 border-black" />
                </div>
                <span className="flex items-center gap-1 text-sm font-semibold text-white drop-shadow-md">
                    @{username}
                    {isVerified && <BadgeCheck className="h-4 w-4 fill-secondary-color text-black" />}
                </span>
                <p className="max-w-64 text-sm text-white/90 drop-shadow-md">{caption}</p>
                <button
                    type="button"
                    onClick={onJoin}
                    className="mt-2 flex items-center gap-2 rounded-full bg-rose-500 px-5 py-2 text-sm font-bold text-white shadow-lg transition-colors hover:bg-rose-600"
                >
                    <Radio className="h-4 w-4" />
                    Join Live
                </button>
            </div>
        </div>
    );
}
