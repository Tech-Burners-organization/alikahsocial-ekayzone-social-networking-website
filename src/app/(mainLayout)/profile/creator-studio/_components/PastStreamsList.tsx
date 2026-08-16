"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, Heart, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { formatCompactNumber } from "@/lib/format";
import type { PastStreamItem } from "../_lib/data";

export default function PastStreamsList({ streams }: { streams: PastStreamItem[] }) {
    const [query, setQuery] = useState("");

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return streams;
        return streams.filter((stream) => stream.title.toLowerCase().includes(q));
    }, [streams, query]);

    return (
        <div className="flex flex-col gap-3">
            <h2 className="text-xl font-bold text-foreground">Past Streams</h2>

            <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search videos"
                    className="h-12 rounded-full border-none bg-muted pl-10 text-sm"
                />
            </div>

            <div className="flex flex-col gap-2.5">
                {filtered.map((stream) => (
                    <div
                        key={stream.id}
                        className="flex items-center gap-2.5 rounded-xl border border-border bg-background p-2.5 shadow-[0px_1px_0.5px_rgba(0,0,0,0.03)]"
                    >
                        <div className="relative h-28.5 w-27 shrink-0 overflow-hidden rounded-xl bg-muted">
                            <Image src={stream.thumbnailUrl} alt={stream.title} fill sizes="108px" className="object-cover" />
                        </div>
                        <div className="flex flex-col items-start gap-2">
                            <div className="flex flex-col gap-1">
                                <p className="text-lg font-bold text-foreground">{stream.title}</p>
                                <div className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
                                    <span>{stream.publishedAt}</span>
                                    <span className="size-1 rounded-full bg-muted-foreground" />
                                    <span>{stream.durationLabel}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="flex items-center gap-1 text-sm font-medium text-foreground">
                                    <Eye className="size-4" />
                                    {formatCompactNumber(stream.views)}
                                </span>
                                <span className="flex items-center gap-1 text-sm font-medium text-foreground">
                                    <Heart className="size-4" />
                                    {formatCompactNumber(stream.likes)}
                                </span>
                            </div>
                            <Link
                                href={`/profile/video/${stream.id}`}
                                className="text-xs font-bold text-secondary-color hover:underline"
                            >
                                View Full Report
                            </Link>
                        </div>
                    </div>
                ))}

                {filtered.length === 0 && (
                    <p className="py-8 text-center text-sm text-muted-foreground">No streams found</p>
                )}
            </div>
        </div>
    );
}
