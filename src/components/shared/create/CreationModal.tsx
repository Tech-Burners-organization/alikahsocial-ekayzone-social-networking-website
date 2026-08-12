"use client";

import ReusableModal from "@/components/ui/CustomUi/ReuseableModal";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

type ModalType = "end-stream" | "product-launched";

interface CreationModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    type: ModalType;
    onConfirm?: () => void;
}

export default function CreationModal({
    open,
    onOpenChange,
    type,
    onConfirm,
}: CreationModalProps) {
    if (type === "end-stream") {
        return (
            <ReusableModal
                open={open}
                onOpenChange={onOpenChange}
                title="End your live stream?"
                description="Your Stream will be saved and available for replay"
                maxWidth="sm:max-w-md"
                footer={
                    <div className="flex gap-3 w-full pb-2">
                        <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            className={cn(
                                "flex-1 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-semibold",
                                "shadow-sm"
                            )}
                            onClick={() => {
                                onConfirm?.();
                                onOpenChange(false);
                            }}
                        >
                            End Stream
                        </Button>
                    </div>
                }
            >
                <div className="flex flex-col items-center gap-5 text-center -mt-4">
                    <div className="p-5 rounded-full bg-rose-100/60">
                        <AlertTriangle className="size-7 text-rose-500" />
                    </div>
                    <div className="space-y-1.5">
                        <p className="text-sm text-base-color/60">
                            Your Stream will be saved and available for replay
                        </p>
                    </div>
                </div>
            </ReusableModal>
        );
    }

    if (type === "product-launched") {
        return (
            <ReusableModal
                open={open}
                onOpenChange={onOpenChange}
                title=""
                description=""
                maxWidth="sm:max-w-[500px]"
                footer={null}
            >
                <div className="flex flex-col items-center gap-5 text-center py-4 relative">
                    <button
                        type="button"
                        onClick={() => onOpenChange(false)}
                        className="absolute right-4 top-4 p-2 rounded-full bg-white border border-[#e2e2e2] shadow-sm hover:bg-base-color/5 transition-colors"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-white"
                        >
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                        </svg>
                    </button>

                    <div className="p-8 rounded-full bg-base-color/10">
                        <CheckCircle2 className="size-[44px] text-emerald-500" />
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-[#0a2c07]">
                            Product Launched!
                        </h2>
                        <p className="text-base text-base-color/60 max-w-xs mx-auto">
                            Your product is now live and reaching people.
                        </p>
                    </div>
                </div>
            </ReusableModal>
        );
    }

    return null;
}
