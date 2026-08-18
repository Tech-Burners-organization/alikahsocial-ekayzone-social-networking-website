"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ConfirmActionModal from "@/components/shared/ConfirmActionModal";
import type { ShopOrderStatus } from "../../../_lib/data";

const BUTTON_BASE =
    "flex h-14 flex-1 items-center justify-center rounded-full border-2 text-xl font-bold shadow-[inset_0_3px_3px_rgba(255,255,255,0.12)] transition-colors";

/**
 * Sticky footer for the order detail screen. A pending order is accepted or declined;
 * an accepted one is marked dispatched. Settled orders get no actions.
 */
export default function OrderDetailActions({
    orderId,
    status,
}: {
    orderId: string;
    status: ShopOrderStatus;
}) {
    const [declineOpen, setDeclineOpen] = useState(false);
    const router = useRouter();

    if (status !== "pending" && status !== "dispatched") return null;

    return (
        <>
            <div className="sticky bottom-0 z-10 -mx-10 mt-2 border-y border-[#e5e8ea] bg-white px-10 py-8 shadow-[0_1px_1px_-0.5px_rgba(0,0,0,0.03),0_3px_3px_-1.5px_rgba(0,0,0,0.03),0_20px_20px_-12px_rgba(0,0,0,0.03)]">
                <div className="flex items-center gap-1.5">
                    {status === "pending" ? (
                        <>
                            <button
                                type="button"
                                onClick={() => toast.success(`Order #${orderId} accepted`)}
                                className={`${BUTTON_BASE} border-secondary-color bg-secondary-color text-white hover:bg-secondary-color/90`}
                            >
                                Accept
                            </button>
                            <button
                                type="button"
                                onClick={() => setDeclineOpen(true)}
                                className={`${BUTTON_BASE} border-[#e5e8ea] bg-[#f2f2f4] text-[#d93f3f] hover:bg-[#e9e9ee]`}
                            >
                                Decline
                            </button>
                        </>
                    ) : (
                        <button
                            type="button"
                            onClick={() => toast.success(`Order #${orderId} marked as dispatched`)}
                            className={`${BUTTON_BASE} border-[#bfdbfe] bg-[#eff6ff] text-[#1d4ed8] hover:border-[#0a2c07] hover:bg-[#0a2c07] hover:text-white`}
                        >
                            Mark as Dispatched
                        </button>
                    )}
                </div>
            </div>

            <ConfirmActionModal
                open={declineOpen}
                onOpenChange={setDeclineOpen}
                message="Are you sure you want to cancel this product?"
                cancelLabel="Cancel"
                confirmLabel="Keep Product"
                onConfirm={() => undefined}
                onCancel={() => {
                    toast.success(`Order #${orderId} declined`);
                    router.refresh();
                }}
            />
        </>
    );
}
