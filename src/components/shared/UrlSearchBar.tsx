"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import ReuseSearchInput from "@/components/ui/CustomUi/ReuseForm/ReuseSearchInput";

interface UrlSearchBarProps {
    defaultValue: string;
    placeholder?: string;
    /** Query key to write into. Defaults to `search`. */
    param?: string;
}

/**
 * Debounced search field that keeps its value in the URL, so the surrounding page can
 * stay a server component and re-render its filtered results on the server.
 */
export default function UrlSearchBar({
    defaultValue,
    placeholder = "Search",
    param = "search",
}: UrlSearchBarProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [, startTransition] = useTransition();

    const handleSearch = useCallback(
        (value: string) => {
            const params = new URLSearchParams(searchParams);
            const trimmed = value.trim();

            if (trimmed) {
                params.set(param, trimmed);
            } else {
                params.delete(param);
            }

            startTransition(() => {
                router.replace(`${pathname}?${params.toString()}`, { scroll: false });
            });
        },
        [param, pathname, router, searchParams]
    );

    return (
        <ReuseSearchInput
            placeholder={placeholder}
            defaultValue={defaultValue}
            setSearch={handleSearch}
            setPage={() => {}}
            className="w-full"
            inputClassName="h-12 rounded-full border-black/[0.03] bg-[#f2f2f4] px-4 pl-10 text-sm font-medium placeholder:text-[#5e6062]"
        />
    );
}
