"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { SORT_OPTIONS, type SortOption } from "../_lib/data";

export default function SortDropdown({ value }: { value: SortOption }) {
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
            <SelectTrigger className="h-auto w-fit gap-1.5 border-none bg-transparent p-0 text-sm font-medium text-foreground shadow-none hover:bg-transparent focus-visible:ring-0 dark:bg-transparent dark:hover:bg-transparent">
                <span className="font-normal text-muted-foreground">Sort by:</span>
                <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
                {SORT_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
