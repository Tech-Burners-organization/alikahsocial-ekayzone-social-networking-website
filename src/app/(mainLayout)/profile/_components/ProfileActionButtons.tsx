import Link from "next/link";
import { BarChart3, ClipboardList, ShoppingBag } from "lucide-react";

export default function ProfileActionButtons() {
    return (
        <div className="flex flex-wrap items-center gap-1">
            <Link
                href="/profile/creator-studio"
                className="flex h-12 items-center justify-center gap-2 rounded-full border border-black/9 bg-secondary-color px-5 text-base font-bold text-white shadow-[inset_0_3px_3px_rgba(255,255,255,0.12)] transition-colors hover:bg-secondary-color/90"
            >
                <BarChart3 className="size-5" />
                Creator Studio
            </Link>
            <Link
                href="/profile/orders"
                className="flex h-12 items-center justify-center gap-2 rounded-full border border-secondary-color bg-secondary-color/10 px-5 text-base font-bold text-secondary-color transition-colors hover:bg-secondary-color/15"
            >
                <ClipboardList className="size-5" />
                My Orders
            </Link>
            <Link
                href="/profile/shop"
                className="flex h-12 items-center justify-center gap-2 rounded-full border border-black/[0.06] bg-muted px-5 text-base font-bold text-foreground transition-colors hover:bg-muted/70"
            >
                <ShoppingBag className="size-5" />
                My Shop
            </Link>
        </div>
    );
}
