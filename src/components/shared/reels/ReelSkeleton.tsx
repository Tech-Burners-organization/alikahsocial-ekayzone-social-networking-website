import { Loader2 } from "lucide-react";

// Same root sizing + data-attrs as VideoPlayer's <section> — the sliding-window
// scroll math in ReelsSection (scrollToPosition / recenter effect) depends on
// every mounted child being an identically-sized, tagged data-reel-item.
export function ReelSkeleton() {
    return (
        <section
            data-reel-item="true"
            className="h-[calc(100vh-56px)] w-full snap-start snap-always relative flex items-center justify-center bg-zinc-950 font-sans select-none"
        >
            <div className="flex flex-col items-center gap-3 text-zinc-400">
                <Loader2 className="h-8 w-8 animate-spin text-secondary-color" />
                <p className="text-sm font-medium">Loading next reel…</p>
            </div>
        </section>
    );
}
