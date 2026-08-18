import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { BUYER_STATUS_ACTION, BUYER_STATUS_BADGE, type BuyerOrder } from "../_lib/data";
import OrderActionMenu from "./OrderActionMenu";

const ACTION_BASE =
    "flex h-10 w-full items-center justify-center gap-1 rounded-full border text-sm font-semibold shadow-[inset_0_2px_3px_rgba(255,255,255,0.09)] transition-colors";

export default function MyOrderCard({ order }: { order: BuyerOrder }) {
    const badge = BUYER_STATUS_BADGE[order.status];
    const action = BUYER_STATUS_ACTION[order.status];
    const ActionIcon = action?.icon;

    const actionContent = action && ActionIcon && (
        <>
            {action.iconPosition === "leading" && <ActionIcon className="size-5" />}
            {action.label}
            {action.iconPosition === "trailing" && <ActionIcon className="size-5" />}
        </>
    );

    return (
        <article className="flex flex-col gap-[7px] rounded-xl border border-[#e5e8ea] bg-white p-2.5">
            <div className="flex w-full flex-col items-center gap-[18px]">
                <div className="flex w-full items-end gap-4">
                    <div className="relative h-[103px] w-[100px] shrink-0 overflow-hidden rounded-lg bg-muted">
                        <Image
                            src={order.image}
                            alt={order.title}
                            fill
                            sizes="100px"
                            className="object-cover"
                        />
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                        <div className="flex flex-col gap-0.5">
                            <div className="flex items-center justify-between gap-3">
                                <h2 className="truncate text-lg font-bold leading-7 text-[#0a2c07]">
                                    {order.title}
                                </h2>
                                <OrderActionMenu listingHref={order.listingHref} />
                            </div>
                            <p className="text-sm font-semibold text-[#313233]">{order.seller}</p>
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
                </div>

                {action && <div className="h-px w-full bg-[#e5e8ea]" />}
            </div>

            {action &&
                (action.href ? (
                    <Link href={action.href} className={cn(ACTION_BASE, action.className)}>
                        {actionContent}
                    </Link>
                ) : (
                    <button type="button" className={cn(ACTION_BASE, action.className)}>
                        {actionContent}
                    </button>
                ))}
        </article>
    );
}
