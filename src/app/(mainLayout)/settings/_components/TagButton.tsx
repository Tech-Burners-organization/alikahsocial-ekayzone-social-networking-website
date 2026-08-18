"use client";

import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface TagButtonProps {
    label: string;
    /** Message shown when pressed. Actions are local until a backend exists. */
    toastMessage: string;
    className?: string;
}

/** Small pill action on the right of a settings row — "Disconnect", "Unblock", "Connect". */
export default function TagButton({ label, toastMessage, className }: TagButtonProps) {
    return (
        <button
            type="button"
            onClick={() => toast.success(toastMessage)}
            className={cn(
                "flex h-7 shrink-0 items-center justify-center rounded-lg border border-black/6 bg-white px-2.5 text-xs font-semibold text-[#5b616d] shadow-[0_2px_0.75px_rgba(0,0,0,0.03)] transition-colors hover:bg-[#f2f2f4]",
                className
            )}
        >
            {label}
        </button>
    );
}
