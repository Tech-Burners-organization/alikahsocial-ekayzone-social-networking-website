"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { cn } from "@/lib/utils";
import { CATEGORY_PILLS } from "../_lib/data";

export default function CategoryPills({ active }: { active: string }) {
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
            {CATEGORY_PILLS.map((pill) => {
                const Icon = pill.icon;
                const isActive = active === pill.id;
                return (
                    <button
                        key={pill.id}
                        type="button"
                        onClick={() => handleChange(pill.id)}
                        className={cn(
                            'flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium whitespace-nowrap transition-all',
                            isActive
                                ? 'bg-[#00A86B] text-white'
                                : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                        )}
                    >
                        {Icon && <Icon className="size-4" />}
                        {pill.label}
                    </button>
                );
            })}
        </div>
    );
}
