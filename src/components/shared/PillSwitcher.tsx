import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface PillSwitcherItem<T extends string> {
    label: string;
    value: T;
    icon?: ReactNode;
}

interface PillSwitcherProps<T extends string> {
    items: PillSwitcherItem<T>[];
    activeValue: T;
    /** Query-string key this switcher drives, e.g. `tab`. */
    param: string;
    basePath: string;
    /** Current query values, carried over so a switch doesn't drop `search`, `sort`, etc. */
    searchParams?: Record<string, string | string[] | undefined>;
    /** Params to drop when switching — e.g. clearing `search` so results aren't filtered by a stale query. */
    resetParams?: string[];
    /** `light` = white raised pill (My Orders), `primary` = solid green pill (My Shop). */
    variant?: "light" | "primary";
    className?: string;
}

const RAISED_SHADOW =
    "shadow-[0_1px_0.5px_rgba(0,0,0,0.03),0_3px_1.5px_rgba(0,0,0,0.03),0_20px_10px_rgba(0,0,0,0.03)]";

const ACTIVE_CLASSES: Record<NonNullable<PillSwitcherProps<string>["variant"]>, string> = {
    light: cn("border border-black/[0.06] bg-white text-base font-bold text-[#313233]", RAISED_SHADOW),
    primary: cn("border border-secondary-color bg-secondary-color text-base font-bold text-white", RAISED_SHADOW),
};

const INACTIVE_CLASSES: Record<NonNullable<PillSwitcherProps<string>["variant"]>, string> = {
    light: "text-[15px] font-semibold text-[#8c929c] hover:text-[#313233]",
    primary: "text-base font-semibold text-[#1b1c1c]/30 hover:text-[#1b1c1c]/60",
};

/**
 * URL-driven segmented control rendered entirely on the server — navigation happens
 * through `<Link>`, so switching tabs needs no client-side JavaScript.
 */
export default function PillSwitcher<T extends string>({
    items,
    activeValue,
    param,
    basePath,
    searchParams,
    resetParams,
    variant = "light",
    className,
}: PillSwitcherProps<T>) {
    const buildHref = (value: T) => {
        const params = new URLSearchParams();

        for (const [key, raw] of Object.entries(searchParams ?? {})) {
            if (key === param || resetParams?.includes(key)) continue;
            const single = Array.isArray(raw) ? raw[0] : raw;
            if (single) params.set(key, single);
        }

        params.set(param, value);
        return `${basePath}?${params.toString()}`;
    };

    return (
        <div
            className={cn(
                "flex items-center gap-1.5 rounded-[18px] border border-black/[0.03] bg-[#f2f2f4]/80 p-1.5",
                className
            )}
        >
            {items.map((item) => {
                const isActive = item.value === activeValue;

                return (
                    <Link
                        key={item.value}
                        href={buildHref(item.value)}
                        scroll={false}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                            "flex h-11 flex-1 items-center justify-center gap-1 rounded-xl px-3 transition-colors",
                            isActive ? ACTIVE_CLASSES[variant] : INACTIVE_CLASSES[variant]
                        )}
                    >
                        {item.icon}
                        {item.label}
                    </Link>
                );
            })}
        </div>
    );
}
