import Link from "next/link";

export default function PromoteVideoBar({ videoId }: { videoId: string }) {
    return (
        <div className="sticky bottom-0 z-10 -mx-6 mt-2 border-t border-border bg-background px-6 py-4 shadow-[0_-4px_12px_rgba(0,0,0,0.04)] md:-mx-10 md:px-10">
            <Link
                href={`/profile/promote/${videoId}`}
                className="flex h-14 w-full items-center justify-center rounded-full border-2 border-secondary-color bg-secondary-color text-xl font-bold text-white shadow-[inset_0_3px_3px_rgba(255,255,255,0.12)] transition-colors hover:bg-secondary-color/90"
            >
                Promote Video
            </Link>
        </div>
    );
}
