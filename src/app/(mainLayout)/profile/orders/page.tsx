import type { Metadata } from "next";
import Image from "next/image";
import PageWraper from "@/components/ui/CustomUi/PageWraper";
import PillSwitcher from "@/components/shared/PillSwitcher";
import UrlSearchBar from "@/components/shared/UrlSearchBar";
import MyOrderCard from "./_components/MyOrderCard";
import { getBuyerOrders, isOrderKind, type OrderKind } from "./_lib/data";

export const metadata: Metadata = {
    title: "My Orders | eKayzone",
    description: "Track the products you have bought and the services you have booked.",
};

function firstValue(value: string | string[] | undefined): string | undefined {
    return Array.isArray(value) ? value[0] : value;
}

const TAB_ITEMS = [
    {
        label: "Products",
        value: "products" as const,
        icon: <Image src="/images/shop/icon-products.svg" alt="" width={19} height={20} />,
    },
    {
        label: "Services",
        value: "services" as const,
        icon: <Image src="/images/shop/icon-services.svg" alt="" width={20} height={20} />,
    },
];

export default async function MyOrdersPage({ searchParams }: PageProps<"/profile/orders">) {
    const params = await searchParams;

    const rawTab = firstValue(params.tab);
    const tab: OrderKind = isOrderKind(rawTab) ? rawTab : "products";
    const search = firstValue(params.search) ?? "";

    const orders = getBuyerOrders({ kind: tab, search });

    return (
        <PageWraper title="My Orders" backToPreviousPage>
            <div className="flex flex-col gap-4">
                <PillSwitcher<OrderKind>
                    items={TAB_ITEMS}
                    activeValue={tab}
                    param="tab"
                    basePath="/profile/orders"
                    searchParams={params}
                    resetParams={["search"]}
                    variant="light"
                />

                <UrlSearchBar
                    defaultValue={search}
                    placeholder={tab === "products" ? "Search products" : "Search services"}
                />

                {orders.length > 0 ? (
                    <div className="flex flex-col gap-2.5">
                        {orders.map((order) => (
                            <MyOrderCard key={order.id} order={order} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-border py-16 text-center">
                        <p className="text-sm font-medium text-foreground">No orders found</p>
                        <p className="text-sm text-muted-foreground">
                            {search
                                ? "Try a different search term."
                                : `You have not ordered any ${tab} yet.`}
                        </p>
                    </div>
                )}
            </div>
        </PageWraper>
    );
}
