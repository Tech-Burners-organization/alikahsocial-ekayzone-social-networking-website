"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { cn } from "@/lib/utils";
import { CATEGORY_PILLS } from "../_lib/data";
import { SERVICE_CATEGORY_PILLS } from "../_lib/services";

export default function CategoryPills({
    active,
    variant = "products",
}: {
    active: string;
    /**
     * Which category list to render. Resolved from a client-side import (not a prop) because the
     * list carries Lucide icon component references, which can't cross the Server → Client boundary as a prop.
     */
    variant?: "products" | "services";
}) {
    const pills = variant === "services" ? SERVICE_CATEGORY_PILLS : CATEGORY_PILLS;
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [, startTransition] = useTransition();

    const handleChange = (id: string) => {
        const params = new URLSearchParams(searchParams);

        if (id === "all") {
            params.delete("category");
        } else {
            params.set("category", id);
        }

        startTransition(() => {
            router.replace(`${pathname}?${params.toString()}`, { scroll: false });
        });
    };

    return (
        <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
            {pills.map((pill) => {
                const Icon = pill.icon;
                const isActive = active === pill.id;
                return (
                    <button
                        key={pill.id}
                        type="button"
                        onClick={() => handleChange(pill.id)}
                        className={cn(
                            'flex h-9 shrink-0 cursor-pointer items-center gap-1.5 rounded-full border px-3 text-base font-bold whitespace-nowrap transition-all',
                            isActive
                                ? 'border-transparent bg-secondary-color text-white'
                                : 'border-border bg-[#f2f2f4] text-foreground hover:bg-muted'
                        )}
                    >
                        {pill.iconSrc ? (
                            <Image src={pill.iconSrc} alt="" width={20} height={20} className="size-5 shrink-0" />
                        ) : (
                            Icon && <Icon className="size-5 shrink-0" />
                        )}
                        {pill.label}
                    </button>
                );
            })}
        </div>
    );
}
