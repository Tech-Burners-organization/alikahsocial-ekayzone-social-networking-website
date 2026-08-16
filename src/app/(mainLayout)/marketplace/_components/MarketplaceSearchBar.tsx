"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import ReuseSearchInput from "@/components/ui/CustomUi/ReuseForm/ReuseSearchInput";

export default function MarketplaceSearchBar({
    defaultValue,
    placeholder = "Search products",
}: {
    defaultValue: string;
    placeholder?: string;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [, startTransition] = useTransition();

    const handleSearch = useCallback(
        (value: string) => {
            const params = new URLSearchParams(searchParams);
            const trimmed = value.trim();

            if (trimmed) {
                params.set("search", trimmed);
            } else {
                params.delete("search");
            }

            startTransition(() => {
                router.replace(`${pathname}?${params.toString()}`, { scroll: false });
            });
        },
        [pathname, router, searchParams]
    );

    return (
        <ReuseSearchInput
            placeholder={placeholder}
            defaultValue={defaultValue}
            setSearch={handleSearch}
            setPage={() => {}}
            className="w-full"
        />
    );
}
