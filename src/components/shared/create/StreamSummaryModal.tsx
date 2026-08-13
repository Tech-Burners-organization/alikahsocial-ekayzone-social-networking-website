"use client";

import Image from "next/image";
import { X } from "lucide-react";
import ReusableModal from "@/components/ui/CustomUi/ReuseableModal";

export interface StreamSummaryStats {
    duration: string;
    peakViewers: number;
    totalViewers: number;
    likes: number;
    comments: number;
    shares: number;
}

interface StreamSummaryModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    stats: StreamSummaryStats;
}

export default function StreamSummaryModal({ open, onOpenChange, stats }: StreamSummaryModalProps) {
    const rows: { label: string; value: string | number }[] = [
        { label: "Duration", value: stats.duration },
        { label: "Peak Viewers", value: stats.peakViewers },
        { label: "Total Viewers", value: stats.totalViewers },
        { label: "Likes", value: stats.likes },
        { label: "Comments", value: stats.comments },
        { label: "Shares", value: stats.shares },
    ];

    return (
        <ReusableModal
            open={open}
            onOpenChange={onOpenChange}
            title=""
            description=""
            maxWidth="sm:max-w-[448px]"
            footer={null}
            hideDefaultCloseButton
        >
            <div className="relative flex flex-col items-center gap-6 pt-1 text-center">
                <button
                    type="button"
                    onClick={() => onOpenChange(false)}
                    aria-label="Close"
                    className="absolute -top-2 -right-2 flex size-8 items-center justify-center rounded-full border border-border bg-white shadow-sm transition-colors hover:bg-muted"
                >
                    <X className="size-4 text-foreground" />
                </button>

                <Image src="/images/create/launch-success.svg" alt="" width={89} height={89} />

                <h2 className="text-2xl font-bold text-[#0a2c07]">Stream Summary</h2>

                <div className="flex w-full flex-col">
                    {rows.map((row, index) => (
                        <div
                            key={row.label}
                            className={
                                index === 0
                                    ? "flex items-center justify-between py-3"
                                    : "flex items-center justify-between border-t border-border py-3"
                            }
                        >
                            <span className="text-base text-muted-foreground">{row.label}</span>
                            <span className="text-base font-bold text-[#0a2c07]">{row.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </ReusableModal>
    );
}
