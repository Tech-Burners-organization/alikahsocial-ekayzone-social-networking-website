"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CircleX, MoreVertical } from "lucide-react";
import { toast } from "sonner";
import ConfirmActionModal from "@/components/shared/ConfirmActionModal";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function OrderDetailMenu({ orderId }: { orderId: string }) {
    const [cancelOpen, setCancelOpen] = useState(false);
    const router = useRouter();

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger
                    className="flex size-10 items-center justify-center rounded-full bg-[#f2f2f4] text-foreground transition-colors hover:bg-[#e9e9ee]"
                    aria-label="Order options"
                >
                    <MoreVertical className="size-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                    <DropdownMenuItem variant="destructive" onClick={() => setCancelOpen(true)}>
                        <CircleX />
                        Cancel Order
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <ConfirmActionModal
                open={cancelOpen}
                onOpenChange={setCancelOpen}
                message="Are you sure you want to cancel this product?"
                cancelLabel="Cancel"
                confirmLabel="Keep Product"
                onConfirm={() => undefined}
                onCancel={() => {
                    toast.success(`Order #${orderId} cancelled`);
                    router.refresh();
                }}
            />
        </>
    );
}
