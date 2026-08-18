import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MessageCircle } from "lucide-react";
import PageWraper from "@/components/ui/CustomUi/PageWraper";
import { getShopOrderById } from "../../_lib/data";
import OrderDetailActions from "./_components/OrderDetailActions";
import OrderDetailMenu from "./_components/OrderDetailMenu";

export const metadata: Metadata = {
    title: "Order Detail | eKayzone",
};

function DetailRow({
    label,
    value,
    accent,
    bordered,
}: {
    label: string;
    value: string;
    accent?: boolean;
    bordered?: boolean;
}) {
    return (
        <div
            className={
                bordered
                    ? "flex items-center justify-between gap-6 border-b border-[#e5e8ea] px-1.5 py-2.5"
                    : "flex items-center justify-between gap-6 px-1.5 py-2.5"
            }
        >
            <p className="shrink-0 text-sm font-medium text-[#1b1c1c]">{label}</p>
            <p
                className={`text-right text-base font-bold leading-6 ${
                    accent ? "text-secondary-color" : "text-[#0a2c07]"
                }`}
            >
                {value}
            </p>
        </div>
    );
}

export default async function ShopOrderDetailPage({ params }: PageProps<"/profile/shop/orders/[id]">) {
    const { id } = await params;
    const order = getShopOrderById(id);

    if (!order) notFound();

    return (
        <PageWraper title="Order Detail" backToPreviousPage headerAction={<OrderDetailMenu orderId={order.id} />}>
            <div className="flex flex-col gap-4">
                <section className="flex flex-col gap-2">
                    <h2 className="text-lg font-bold leading-7 text-[#0a2c07]">Product Ordered</h2>

                    <div className="flex items-center gap-4 rounded-xl border border-[#e5e8ea] bg-white p-2.5">
                        <div className="relative h-[85px] w-[71px] shrink-0 overflow-hidden rounded-lg bg-muted">
                            <Image
                                src={order.image}
                                alt={order.title}
                                fill
                                sizes="71px"
                                className="object-cover"
                            />
                        </div>
                        <div className="flex min-w-0 flex-1 flex-col">
                            <h3 className="truncate text-lg font-bold leading-7 text-[#0a2c07]">
                                {order.title}
                            </h3>
                            <p className="text-base font-bold leading-7 text-secondary-color">
                                {order.currency}
                                {order.price}
                            </p>
                            <p className="text-sm font-semibold text-[#5e6062]">{order.placedAt}</p>
                        </div>
                    </div>
                </section>

                <section className="flex flex-col gap-2">
                    <h2 className="text-lg font-bold leading-7 text-[#0a2c07]">Buyer Information</h2>

                    <div className="flex flex-col gap-2 rounded-xl border border-[#f2f2f4] bg-white p-2.5 shadow-[0_1px_0.5px_rgba(0,0,0,0.03)]">
                        <div className="flex flex-col">
                            <DetailRow label="Order ID" value={`#${order.id}`} />
                            <DetailRow label="Full Name" value={order.buyerFullName} />
                            <DetailRow label="Phone" value={order.phone} accent />
                            <DetailRow label="Member Since" value={order.memberSince} />
                            <DetailRow label="Payment Method" value={order.paymentMethod} />
                            <DetailRow label="Note" value={order.note} bordered />

                            <div className="flex items-center justify-between px-1.5 py-2.5">
                                <p className="text-base font-semibold leading-6 text-[#1b1c1c]">
                                    Delivery Address
                                </p>
                            </div>

                            <DetailRow label="Street" value={order.address.street} />
                            <DetailRow label="City" value={order.address.city} />
                            <DetailRow label="Province" value={order.address.province} />
                            <DetailRow label="Postal Code" value={order.address.postalCode} />
                        </div>

                        <Link
                            href="/chat"
                            className="flex h-9 w-fit items-center justify-center gap-1 rounded-[10px] border border-secondary-color bg-secondary-color px-2.5 text-sm font-bold text-white shadow-[0_1px_0.5px_rgba(0,0,0,0.03)] transition-colors hover:bg-secondary-color/90"
                        >
                            <MessageCircle className="size-4" />
                            Send Message
                        </Link>
                    </div>
                </section>
            </div>

            <OrderDetailActions orderId={order.id} status={order.status} />
        </PageWraper>
    );
}
