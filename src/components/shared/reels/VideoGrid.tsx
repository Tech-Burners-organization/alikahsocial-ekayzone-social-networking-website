import Image from "next/image";
import Link from "next/link";
import { Play, Radio } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCompactNumber } from "@/lib/format";
import type { ProfileThumbnail } from "./types";

interface VideoGridProps {
    items: ProfileThumbnail[];
    href: string;
    columnsClassName?: string;
    emptyMessage?: string;
}

export function VideoGrid({
    items,
    href,
    columnsClassName = "grid-cols-2 sm:grid-cols-3",
    emptyMessage = "No posts yet",
}: VideoGridProps) {
    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-muted">
                    <Play className="size-6 text-muted-foreground/50" />
                </div>
                <p className="text-sm font-medium text-muted-foreground">{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className={cn("grid gap-1", columnsClassName)}>
            {items.map((item) => (
                <Link
                    key={item.id}
                    href={href}
                    className="group relative aspect-9/12 overflow-hidden rounded-md bg-muted"
                >
                    <Image
                        src={item.thumbnailUrl}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {item.isLive && (
                        <span className="absolute left-1.5 top-1.5 flex items-center gap-0.5 rounded bg-rose-500 px-1.5 py-0.5 text-[10px] font-bold leading-none text-white">
                            <Radio className="size-2.5" />
                            LIVE
                        </span>
                    )}
                    <span className="absolute bottom-1.5 left-1.5 flex items-center gap-0.5 rounded bg-black/30 px-1 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
                        <Play className="size-2.5 fill-white" />
                        {formatCompactNumber(item.views)}
                    </span>
                </Link>
            ))}
        </div>
    );
}
