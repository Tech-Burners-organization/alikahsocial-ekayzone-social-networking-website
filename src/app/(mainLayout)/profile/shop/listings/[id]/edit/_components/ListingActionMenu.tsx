"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Megaphone, MoreVertical, Trash2 } from "lucide-react";
import { toast } from "sonner";
import ConfirmActionModal from "@/components/shared/ConfirmActionModal";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ListingActionMenu({ listingId }: { listingId: string }) {
    const [deleteOpen, setDeleteOpen] = useState(false);
    const router = useRouter();

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger
                    className="flex size-10 items-center justify-center rounded-full bg-[#f2f2f4] text-foreground transition-colors hover:bg-[#e9e9ee]"
                    aria-label="Listing options"
                >
                    <MoreVertical className="size-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem onClick={() => router.push(`/profile/promote/${listingId}`)}>
                        <Megaphone />
                        Promote Product
                    </DropdownMenuItem>
                    <DropdownMenuItem variant="destructive" onClick={() => setDeleteOpen(true)}>
                        <Trash2 />
                        Delete Product
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <ConfirmActionModal
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
                message="Are you sure you want to delete this product? This action cannot be undone, and the product will be permanently removed from your store."
                confirmLabel="Delete Product"
                cancelLabel="Cancel"
                tone="danger"
                confirmFirst
                onConfirm={() => {
                    toast.success("Product deleted");
                    router.push("/profile/shop?tab=listings");
                }}
            />
        </>
    );
}
