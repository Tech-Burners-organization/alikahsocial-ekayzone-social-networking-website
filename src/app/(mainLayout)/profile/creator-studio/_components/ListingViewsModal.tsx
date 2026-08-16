"use client";

import { forwardRef } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import ReusableModal from "@/components/ui/CustomUi/ReuseableModal";
import { formatCompactNumber } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { ListingViewItem } from "../_lib/data";

export default function ListingViewsModal({
    items,
    trigger,
}: {
    items: ListingViewItem[];
    trigger: React.ReactElement;
}) {
    return (
        <ReusableModal title="Listing Views from Videos" maxWidth="sm:max-w-lg" trigger={trigger}>
            <div className="flex flex-col divide-y divide-border">
                {items.map((item) => (
                    <div key={item.rank} className="flex items-center gap-2.5 py-2.5">
                        <span className="w-6 shrink-0 text-center text-base font-bold text-foreground">
                            {item.rank}
                        </span>
                        <div className="relative size-10.5 shrink-0 overflow-hidden rounded-lg bg-muted">
                            <Image src={item.thumbnailUrl} alt={item.title} fill sizes="42px" className="object-cover" />
                        </div>
                        <p className="flex-1 text-base font-medium text-foreground">{item.title}</p>
                        <span className="text-base font-bold text-secondary-color">
                            {formatCompactNumber(item.views)}
                        </span>
                    </div>
                ))}
            </div>
        </ReusableModal>
    );
}

interface ListingViewsTriggerRowProps extends React.ComponentPropsWithoutRef<"button"> {
    value: string;
    caption?: string;
}

/**
 * Rendered via ReusableModal's `trigger` prop, which base-ui clones with its own
 * onClick/aria/ref props (React.cloneElement) — those extra props MUST land on the
 * real `<button>` here, not be swallowed, or the row becomes unclickable.
 */
export const ListingViewsTriggerRow = forwardRef<HTMLButtonElement, ListingViewsTriggerRowProps>(
    function ListingViewsTriggerRow({ value, caption, className, ...props }, ref) {
        return (
            <button ref={ref} type="button" className={cn("flex w-full flex-col gap-1 text-left", className)} {...props}>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">Listing Views from Videos</span>
                    <span className="flex items-center gap-0.5">
                        <span className="text-base font-bold text-foreground">{value}</span>
                        <ChevronRight className="size-5 text-muted-foreground" />
                    </span>
                </div>
                {caption && <span className="text-xs text-foreground">{caption}</span>}
            </button>
        );
    }
);
