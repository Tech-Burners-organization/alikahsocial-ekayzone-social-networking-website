import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SHOP_STATUS_BADGE, type ShopOrder } from "../_lib/data";

/**
 * Seller-side order row. Also backs the Bookings tab, where `placedAt` carries a time
 * alongside the date.
 */
export default function ShopOrderCard({ order }: { order: ShopOrder }) {
    const badge = SHOP_STATUS_BADGE[order.status];

    return (
        <Link
            href={`/profile/shop/orders/${order.id}`}
            className="flex flex-col gap-4 rounded-xl border border-[#e5e8ea] bg-white p-2.5 transition-colors hover:border-secondary-color/40 md:flex-row md:items-end"
        >
            {/* Below md the card stacks: full-bleed image on top, then the order details. */}
            <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-lg bg-muted md:h-25.75 md:w-25">
                <Image
                    src={order.image}
                    alt={order.title}
                    fill
                    sizes="(min-width: 768px) 100px, 100vw"
                    className="object-cover"
                />
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                <div className="flex flex-col gap-0.5">
                    <h2 className="truncate text-lg font-bold leading-7 text-[#0a2c07]">{order.title}</h2>
                    <p className="text-sm text-[#313233]">
                        From {order.buyer} | Qty : <span className="font-bold">{order.quantity}</span>
                    </p>
                </div>

                <div className="flex items-center gap-2.5">
                    <p className="text-base font-bold leading-6 text-secondary-color">
                        {order.currency}
                        {order.price}
                    </p>
                    <span
                        className={cn(
                            "flex items-center justify-center rounded p-1.5 text-xs font-bold",
                            badge.className
                        )}
                    >
                        {badge.label}
                    </span>
                </div>

                <p className="text-sm font-semibold text-[#5e6062]">{order.placedAt}</p>
            </div>
        </Link>
    );
}
