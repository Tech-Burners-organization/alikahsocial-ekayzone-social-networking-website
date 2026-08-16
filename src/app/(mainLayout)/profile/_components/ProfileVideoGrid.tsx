import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { formatCompactNumber } from "@/lib/format";
import type { MyVideo } from "../_lib/data";

interface ProfileVideoGridProps {
    videos: MyVideo[];
}

export default function ProfileVideoGrid({ videos }: ProfileVideoGridProps) {
    if (videos.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-border py-16 text-center">
                <p className="text-sm font-medium text-foreground">No videos yet</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {videos.map((video) => (
                <Link
                    key={video.id}
                    href={`/profile/video/${video.id}`}
                    className="group relative aspect-[270/316] overflow-hidden rounded-lg shadow-[0px_1px_1px_-0.5px_rgba(0,0,0,0.03),0px_3px_3px_-1.5px_rgba(0,0,0,0.03),0px_20px_20px_-12px_rgba(0,0,0,0.03)]"
                >
                    <Image
                        src={video.thumbnailUrl}
                        alt={video.title}
                        fill
                        sizes="(max-width: 640px) 50vw, 270px"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20" />

                    {video.kind === "stream" && (
                        <span className="absolute right-2 top-4 rounded bg-black/60 px-1.5 py-1 text-sm font-bold leading-none text-white">
                            STREAMED
                        </span>
                    )}

                    <span className="absolute bottom-1.5 left-1.5 flex items-center gap-1 text-sm font-bold leading-none text-white">
                        <Play className="size-5 fill-white" />
                        {formatCompactNumber(video.views)}
                    </span>
                </Link>
            ))}
        </div>
    );
}
