"use client";

import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface CampaignLaunchedModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function CampaignLaunchedModal({ open, onOpenChange }: CampaignLaunchedModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="flex flex-col items-center gap-6 rounded-xl border border-border py-10 text-center sm:max-w-sm">
                <Image src="/images/marketplace/order-placed-check.svg" alt="" width={111} height={111} />
                <div className="flex flex-col gap-2">
                    <p className="text-2xl font-bold text-foreground">Campaign Launched!</p>
                    <p className="text-base text-muted-foreground">Your campaign is now live and reaching people.</p>
                </div>
            </DialogContent>
        </Dialog>
    );
}
