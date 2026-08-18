"use client";

import { useState } from "react";
import SettingsToggle from "@/components/shared/SettingsToggle";

interface SettingsToggleRowProps {
    label: string;
    description?: string;
    defaultChecked?: boolean;
    /**
     * Always-on preferences the user cannot turn off (order receipts, security alerts,
     * OTP codes). Renders checked and disabled, matching the dimmed toggles in the design.
     */
    locked?: boolean;
}

export default function SettingsToggleRow({
    label,
    description,
    defaultChecked = false,
    locked = false,
}: SettingsToggleRowProps) {
    const [checked, setChecked] = useState(defaultChecked);

    return (
        <label
            className={`flex min-h-[71px] items-center justify-between gap-4 border-b border-[#e5e8ea] px-2.5 py-1.5 last:border-b-0 ${
                locked ? "cursor-default" : "cursor-pointer"
            }`}
        >
            <span className="flex flex-col">
                <span className="text-lg font-bold leading-7 text-[#1b1c1c]">{label}</span>
                {description && (
                    <span className="text-sm font-medium text-[#5e6062]">{description}</span>
                )}
            </span>
            <SettingsToggle
                checked={locked ? true : checked}
                onCheckedChange={setChecked}
                disabled={locked}
            />
        </label>
    );
}
