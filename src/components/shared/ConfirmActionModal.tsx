"use client";

import { CircleAlert } from "lucide-react";
import ReusableModal from "@/components/ui/CustomUi/ReuseableModal";
import { cn } from "@/lib/utils";

interface ConfirmActionModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    message: string;
    confirmLabel: string;
    cancelLabel?: string;
    onConfirm: () => void;
    /**
     * Work performed by the secondary button. Needed by dialogs whose primary button is the
     * *safe* choice (e.g. "Keep Product"), leaving the secondary to carry the real action.
     */
    onCancel?: () => void;
    /** `danger` paints the confirm button red; `primary` paints it green. */
    tone?: "primary" | "danger";
    /** Puts the confirm button first, as the destructive dialogs in the design do. */
    confirmFirst?: boolean;
}

/**
 * Centered confirmation dialog used by the destructive shop flows
 * (cancelling an order, deleting a listing).
 */
export default function ConfirmActionModal({
    open,
    onOpenChange,
    message,
    confirmLabel,
    cancelLabel = "Cancel",
    onConfirm,
    onCancel,
    tone = "primary",
    confirmFirst = false,
}: ConfirmActionModalProps) {
    const confirmButton = (
        <button
            type="button"
            onClick={() => {
                onConfirm();
                onOpenChange(false);
            }}
            className={cn(
                "h-12 flex-1 rounded-full font-bold text-white transition-colors",
                tone === "danger"
                    ? "bg-[#d93f3f] hover:bg-[#d93f3f]/90"
                    : "bg-secondary-color hover:bg-secondary-color/90"
            )}
        >
            {confirmLabel}
        </button>
    );

    const cancelButton = (
        <button
            type="button"
            onClick={() => {
                onCancel?.();
                onOpenChange(false);
            }}
            className={cn(
                "h-12 flex-1 rounded-full border border-black/6 font-bold transition-colors",
                tone === "danger"
                    ? "bg-[#f9fafb] text-[#d93f3f] hover:bg-[#f2f2f4]"
                    : "bg-[#f9fafb] text-[#5e6062] hover:bg-[#f2f2f4]"
            )}
        >
            {cancelLabel}
        </button>
    );

    return (
        <ReusableModal
            open={open}
            onOpenChange={onOpenChange}
            title=""
            maxWidth="sm:max-w-[454px]"
            footer={null}
            hideDefaultCloseButton
        >
            <div className="flex flex-col items-center gap-5 text-center">
                <span className="flex size-12 items-center justify-center rounded-full bg-[#d93f3f]/10">
                    <CircleAlert className="size-6 text-[#d93f3f]" />
                </span>

                <p className="text-base font-bold text-foreground">{message}</p>

                <div className="flex w-full gap-3">
                    {confirmFirst ? (
                        <>
                            {confirmButton}
                            {cancelButton}
                        </>
                    ) : (
                        <>
                            {cancelButton}
                            {confirmButton}
                        </>
                    )}
                </div>
            </div>
        </ReusableModal>
    );
}
