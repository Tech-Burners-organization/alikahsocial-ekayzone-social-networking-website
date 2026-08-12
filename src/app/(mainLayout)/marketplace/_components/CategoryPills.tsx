"use client";

import Image from "next/image";
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
                            'flex h-9 items-center gap-1.5 rounded-full border px-3 text-base font-bold whitespace-nowrap transition-all',
                            isActive
                                ? 'border-transparent bg-secondary-color text-white'
                                : 'border-border bg-[#f2f2f4] text-foreground hover:bg-muted'
                        )}
                    >
                        {pill.iconSrc ? (
                            <Image src={pill.iconSrc} alt="" width={20} height={20} className="size-5" />
                        ) : (
                            Icon && <Icon className="size-5" />
                        )}
                        {pill.label}
                    </button>
                );
            })}
        </div>
    );
}
