"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { formatCompactNumber } from "@/lib/format";
import type { MyVideo } from "../../../../_lib/data";

interface ChooseVideoStepProps {
    videos: MyVideo[];
    selectedId: string;
    onSelect: (id: string) => void;
}

export default function ChooseVideoStep({ videos, selectedId, onSelect }: ChooseVideoStepProps) {
    const [query, setQuery] = useState("");

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return videos;
        return videos.filter((video) => video.title.toLowerCase().includes(q));
    }, [videos, query]);

    return (
        <div className="flex flex-col gap-4">
            <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search videos"
                    className="h-12 rounded-full border-none bg-muted pl-10 text-sm"
                />
            </div>

            <RadioGroup value={selectedId} onValueChange={(value) => onSelect(value as string)} className="gap-2.5">
                {filtered.map((video) => (
                    <label
                        key={video.id}
                        className="flex items-center gap-2.5 rounded-xl border border-border bg-background p-2.5"
                    >
                        <div className="relative h-13 w-14.25 shrink-0 overflow-hidden rounded-lg bg-muted">
                            <Image src={video.thumbnailUrl} alt={video.title} fill sizes="57px" className="object-cover" />
                        </div>
                        <div className="flex flex-1 items-center justify-between gap-3">
                            <div>
                                <p className="text-lg font-bold text-foreground">{video.title}</p>
                                <p className="text-sm text-foreground">{formatCompactNumber(video.views)} Views</p>
                            </div>
                            <RadioGroupItem value={video.id} className="size-6" />
                        </div>
                    </label>
                ))}

                {filtered.length === 0 && (
                    <p className="py-8 text-center text-sm text-muted-foreground">No videos found</p>
                )}
            </RadioGroup>
        </div>
    );
}
