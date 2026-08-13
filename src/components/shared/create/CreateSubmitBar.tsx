import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CreateSubmitBarProps {
    formId: string;
    label: string;
    isSubmitting?: boolean;
    icon?: ReactNode;
    variant?: "primary" | "live";
}

const VARIANT_CLASSES: Record<NonNullable<CreateSubmitBarProps["variant"]>, string> = {
    primary: "border-secondary-color bg-secondary-color hover:bg-secondary-color/90",
    live: "border-[#ff3366] bg-[#ff3366] hover:bg-[#ff3366]/90",
};

/** Sticky bottom action bar for the Create Product / Create Service / Go Live pages. Must render inside a `PageWraper`. */
export function CreateSubmitBar({ formId, label, isSubmitting, icon, variant = "primary" }: CreateSubmitBarProps) {
    return (
        <div className="sticky bottom-0 z-10 -mx-10 mt-2 border-t border-border bg-background px-10 py-6">
            <button
                type="submit"
                form={formId}
                disabled={isSubmitting}
                className={cn(
                    "flex h-14 w-full items-center justify-center gap-2 rounded-full border-2 text-lg font-bold text-white shadow-[inset_0_3px_3px_rgba(255,255,255,0.12)] transition-colors disabled:cursor-not-allowed disabled:opacity-60",
                    VARIANT_CLASSES[variant]
                )}
            >
                {icon}
                {isSubmitting ? "Publishing..." : label}
            </button>
        </div>
    );
}
