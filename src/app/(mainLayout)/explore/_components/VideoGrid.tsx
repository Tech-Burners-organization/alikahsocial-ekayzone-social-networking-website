import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { formatCompactNumber } from "@/lib/format";
import type { DiscoverThumbnail } from "../_lib/data";

export default function VideoGrid({ items }: { items: DiscoverThumbnail[] }) {
    return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {items.map((item) => (
                <Link
                    key={item.id}
                    href="/explore/watch"
                    className="group relative aspect-9/12 overflow-hidden rounded-lg shadow-sm"
                >
                    <Image
                        src={item.thumbnailUrl}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                    <span className="absolute bottom-1.5 left-1.5 flex items-center gap-1 text-sm font-bold text-white">
                        <Play className="size-4 fill-white" />
                        {formatCompactNumber(item.views)}
                    </span>
                </Link>
            ))}
        </div>
    );
}
