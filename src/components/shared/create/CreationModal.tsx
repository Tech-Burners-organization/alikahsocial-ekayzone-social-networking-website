"use client";

import Image from "next/image";
import ReusableModal from "@/components/ui/CustomUi/ReuseableModal";
import { X } from "lucide-react";

type ModalType = "end-stream" | "product-launched" | "service-launched";

const LAUNCHED_COPY: Record<"product-launched" | "service-launched", { title: string; description: string }> = {
    "product-launched": {
        title: "Product Launched!",
        description: "Your product is now live and reaching people.",
    },
    "service-launched": {
        title: "Service Launched!",
        description: "Your service is now live and reaching people.",
    },
};

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
                title=""
                description=""
                maxWidth="sm:max-w-[460px]"
                footer={null}
                hideDefaultCloseButton
            >
                <div className="relative flex flex-col items-center gap-5 pt-1 text-center">
                    <button
                        type="button"
                        onClick={() => onOpenChange(false)}
                        aria-label="Close"
                        className="absolute -top-3 -right-1 flex size-10 items-center justify-center rounded-full border border-black/5 bg-secondary-color/10 shadow-sm transition-colors hover:bg-secondary-color/20"
                    >
                        <X className="size-5 text-foreground" />
                    </button>

                    <h2 className="text-2xl font-bold text-foreground">End your live stream?</h2>
                    <p className="text-base text-muted-foreground">
                        Your Stream will be saved and available for replay
                    </p>

                    <div className="flex w-full gap-3">
                        <button
                            type="button"
                            onClick={() => onOpenChange(false)}
                            className="h-12 flex-1 rounded-full bg-muted font-bold text-foreground transition-colors hover:bg-muted/70"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                onConfirm?.();
                                onOpenChange(false);
                            }}
                            className="h-12 flex-1 rounded-full bg-[#ff3366] font-bold text-white transition-colors hover:bg-[#ff3366]/90"
                        >
                            End Stream
                        </button>
                    </div>
                </div>
            </ReusableModal>
        );
    }

    if (type === "product-launched" || type === "service-launched") {
        const copy = LAUNCHED_COPY[type];

        return (
            <ReusableModal
                open={open}
                onOpenChange={onOpenChange}
                title=""
                description=""
                maxWidth="sm:max-w-[504px]"
                footer={null}
                hideDefaultCloseButton
            >
                <div className="relative flex flex-col items-center gap-6 py-2 text-center">
                    <button
                        type="button"
                        onClick={() => onOpenChange(false)}
                        aria-label="Close"
                        className="absolute -top-2 -right-2 flex size-8 items-center justify-center rounded-full border border-border bg-white shadow-sm transition-colors hover:bg-muted"
                    >
                        <X className="size-4 text-foreground" />
                    </button>

                    <Image
                        src="/images/create/launch-success.svg"
                        alt=""
                        width={111}
                        height={111}
                    />

                    <div className="space-y-1.5">
                        <h2 className="text-2xl font-bold text-[#0a2c07]">{copy.title}</h2>
                        <p className="mx-auto max-w-xs text-base text-muted-foreground">
                            {copy.description}
                        </p>
                    </div>
                </div>
            </ReusableModal>
        );
    }

    return null;
}
