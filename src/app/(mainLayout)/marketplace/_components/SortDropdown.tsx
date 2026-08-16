"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { SlidersHorizontal } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from "@/components/ui/select";
import { SORT_OPTIONS, type SortOption } from "../_lib/data";

export default function SortDropdown({
    value,
    options = SORT_OPTIONS,
}: {
    value: SortOption;
    /** Defaults to the product sort list; pass a subset (e.g. without "Biggest Discount") to reuse this control elsewhere. */
    options?: readonly { value: SortOption; label: string }[];
}) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [, startTransition] = useTransition();

    const handleChange = (next: SortOption | null) => {
        if (!next) return;

        const params = new URLSearchParams(searchParams);

        if (next === "relevance") {
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
            <SelectTrigger className="h-7.5 w-fit gap-1 rounded-full border-none bg-secondary-color px-3 py-1 text-base font-bold text-white shadow-none hover:bg-secondary-color/90 focus-visible:ring-0 dark:bg-secondary-color dark:hover:bg-secondary-color/90 [&_svg]:text-white">
                <SlidersHorizontal className="size-5" />
                Sort
            </SelectTrigger>
            <SelectContent align="end">
                {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
