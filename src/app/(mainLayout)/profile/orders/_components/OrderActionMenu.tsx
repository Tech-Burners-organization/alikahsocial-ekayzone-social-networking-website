"use client";

import Link from "next/link";
import { MessageCircle, MoreVertical, ReceiptText } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/** Overflow menu on a buyer order card. */
export default function OrderActionMenu({ listingHref }: { listingHref: string }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className="flex size-5 shrink-0 items-center justify-center rounded-full text-foreground/70 transition-colors hover:text-foreground"
                aria-label="Order options"
            >
                <MoreVertical className="size-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuItem render={<Link href={listingHref} />}>
                    <ReceiptText />
                    View Listing
                </DropdownMenuItem>
                <DropdownMenuItem render={<Link href="/chat" />}>
                    <MessageCircle />
                    Contact Seller
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
