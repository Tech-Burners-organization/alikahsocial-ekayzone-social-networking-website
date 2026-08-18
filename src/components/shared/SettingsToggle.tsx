"use client";

import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The chunky 64×40 toggle used across the settings screens — visually distinct from the
 * compact `Switch` used elsewhere, so it wraps the same base-ui primitive with its own chrome.
 */
export default function SettingsToggle({ className, ...props }: SwitchPrimitive.Root.Props) {
    return (
        <SwitchPrimitive.Root
            className={cn(
                "group flex h-10 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-b from-[#ececf0] to-[#f9f9fa] outline-none focus-visible:ring-3 focus-visible:ring-secondary-color/40 data-disabled:cursor-not-allowed data-disabled:opacity-50",
                className
            )}
            {...props}
        >
            <span className="flex h-8 w-14 items-center rounded-[10px] px-1 transition-colors group-data-checked:bg-secondary-color group-data-unchecked:bg-[#dddfe4]">
                <SwitchPrimitive.Thumb className="flex h-6 w-8 items-center justify-center rounded-lg bg-white shadow-[0_2px_3px_-1.5px_rgba(0,0,0,0.12)] transition-transform data-checked:translate-x-4 data-unchecked:translate-x-0">
                    <Check
                        className="size-3.5 text-secondary-color opacity-0 transition-opacity group-data-checked:opacity-100"
                        strokeWidth={3}
                    />
                </SwitchPrimitive.Thumb>
            </span>
        </SwitchPrimitive.Root>
    );
}
