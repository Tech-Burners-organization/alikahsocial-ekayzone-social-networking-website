import { cn } from "@/lib/utils";

interface SettingsSubmitBarProps {
    formId: string;
    label: string;
    isSubmitting?: boolean;
    className?: string;
}

/** Full-width sticky save button shared by the settings forms. Must render inside a `PageWraper`. */
export default function SettingsSubmitBar({
    formId,
    label,
    isSubmitting,
    className,
}: SettingsSubmitBarProps) {
    return (
        <div
            className={cn(
                "sticky bottom-0 z-10 -mx-10 mt-2 border-t border-[#e5e8ea] bg-background px-10 py-6",
                className
            )}
        >
            <button
                type="submit"
                form={formId}
                disabled={isSubmitting}
                className="flex h-14 w-full items-center justify-center rounded-full border-2 border-secondary-color bg-secondary-color text-xl font-bold text-white shadow-[inset_0_3px_3px_rgba(255,255,255,0.12)] transition-colors hover:bg-secondary-color/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {isSubmitting ? "Saving..." : label}
            </button>
        </div>
    );
}
