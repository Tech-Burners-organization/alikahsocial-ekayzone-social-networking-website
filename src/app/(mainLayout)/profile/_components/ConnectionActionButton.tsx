"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface ConnectionActionButtonProps {
    actionLabel: string;
    toggledLabel: string;
}

export default function ConnectionActionButton({ actionLabel, toggledLabel }: ConnectionActionButtonProps) {
    const [toggled, setToggled] = useState(false);

    return (
        <button
            type="button"
            onClick={() => setToggled((prev) => !prev)}
            className={cn(
                "shrink-0 rounded-full px-6 py-2 text-sm font-bold transition-colors",
                toggled
                    ? "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    : "bg-secondary-color text-white hover:bg-secondary-color/90"
            )}
        >
            {toggled ? toggledLabel : actionLabel}
        </button>
    );
}
