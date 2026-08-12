'use client';

import Image from 'next/image';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface OrderPlacedDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function OrderPlacedDialog({ open, onOpenChange }: OrderPlacedDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="flex flex-col items-center gap-6 rounded-xl border border-border py-10 text-center sm:max-w-sm">
                <Image src="/images/marketplace/order-placed-check.svg" alt="" width={111} height={111} />
                <p className="text-3xl font-bold text-foreground">Order Placed</p>
            </DialogContent>
        </Dialog>
    );
}
