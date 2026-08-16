"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { ChevronDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { VIDEO_SORT_OPTIONS, type VideoSort } from "../_lib/data";

export default function VideoPerformanceSort({ value }: { value: VideoSort }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [, startTransition] = useTransition();

    const handleChange = (next: VideoSort | null) => {
        if (!next) return;

        const params = new URLSearchParams(searchParams);
        if (next === "views") {
            params.delete("sort");
        } else {
            params.set("sort", next);
        }

        startTransition(() => {
            router.replace(`${pathname}?${params.toString()}`, { scroll: false });
        });
    };

    return (
        <Select value={value} onValueChange={handleChange}>
            <SelectTrigger className="h-9 w-fit gap-1.5 rounded-lg border-none bg-muted px-2.5 py-1.5 text-sm font-semibold text-foreground shadow-none focus-visible:ring-0 [&_svg]:size-4">
                {VIDEO_SORT_OPTIONS.find((option) => option.value === value)?.label}
                <ChevronDown className="size-4" />
            </SelectTrigger>
            <SelectContent align="end">
                {VIDEO_SORT_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
