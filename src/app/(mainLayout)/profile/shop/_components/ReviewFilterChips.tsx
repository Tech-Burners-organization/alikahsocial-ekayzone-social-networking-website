import Link from "next/link";
import { Briefcase, Package, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { REVIEW_FILTERS, type ReviewFilter } from "../_lib/data";

const FILTER_ICONS: Record<ReviewFilter, typeof Star> = {
    all: Star,
    products: Package,
    services: Briefcase,
};

interface ReviewFilterChipsProps {
    active: ReviewFilter;
    searchParams: Record<string, string | string[] | undefined>;
}

export default function ReviewFilterChips({ active, searchParams }: ReviewFilterChipsProps) {
    const buildHref = (value: ReviewFilter) => {
        const params = new URLSearchParams();

        for (const [key, raw] of Object.entries(searchParams)) {
            if (key === "reviewFilter") continue;
            const single = Array.isArray(raw) ? raw[0] : raw;
            if (single) params.set(key, single);
        }

        if (value !== "all") params.set("reviewFilter", value);
        return `/profile/shop?${params.toString()}`;
    };

    return (
        <div className="flex items-center gap-2">
            {REVIEW_FILTERS.map((filter) => {
                const Icon = FILTER_ICONS[filter.value];
                const isActive = filter.value === active;

                return (
                    <Link
                        key={filter.value}
                        href={buildHref(filter.value)}
                        scroll={false}
                        aria-current={isActive ? "true" : undefined}
                        className={cn(
                            "flex h-9 items-center justify-center gap-0.5 rounded-full border px-2.5 transition-colors",
                            isActive
                                ? "border-secondary-color bg-secondary-color text-sm font-bold text-white"
                                : "border-[#e5e8ea] bg-[#f2f2f4] text-sm font-medium text-[#313233] hover:bg-[#e9e9ee]"
                        )}
                    >
                        <Icon className={cn("size-3.5", isActive && "fill-white")} />
                        {filter.label}
                    </Link>
                );
            })}
        </div>
    );
}
