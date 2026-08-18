"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { REVIEW_SORT_OPTIONS, type ReviewSort } from "../_lib/data";

export default function ReviewSortSelect({ value }: { value: ReviewSort }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [, startTransition] = useTransition();

    const handleChange = (next: ReviewSort | null) => {
        if (!next) return;

        const params = new URLSearchParams(searchParams);

        if (next === "newest") {
            params.delete("reviewSort");
        } else {
            params.set("reviewSort", next);
        }

        startTransition(() => {
            router.replace(`${pathname}?${params.toString()}`, { scroll: false });
        });
    };

    return (
        <Select value={value} onValueChange={handleChange}>
            <SelectTrigger className="h-12! w-fit shrink-0 rounded-full border-black/[0.03] bg-[#f2f2f4] px-4 text-sm font-medium text-[#313233] shadow-none focus-visible:ring-0">
                <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
                {REVIEW_SORT_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
