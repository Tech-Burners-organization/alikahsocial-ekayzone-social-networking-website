import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SettingsSectionProps {
    /** Uppercase label above the card. Omit for an unlabelled card. */
    title?: string;
    children: ReactNode;
    /** Rows that manage their own dividers (toggle/radio lists) opt out of the card's padding. */
    flush?: boolean;
    className?: string;
}

/** Label + rounded white card — the repeating shell of every settings screen. */
export default function SettingsSection({ title, children, flush, className }: SettingsSectionProps) {
    return (
        <section className="flex w-full flex-col gap-2.5">
            {title && <h2 className="text-sm font-medium text-[#5e6062]">{title}</h2>}
            <div
                className={cn(
                    "w-full rounded-[20px] border border-[#e5e8ea] bg-white",
                    flush ? "px-1.5" : "flex flex-col gap-2 p-2.5",
                    className
                )}
            >
                {children}
            </div>
        </section>
    );
}
