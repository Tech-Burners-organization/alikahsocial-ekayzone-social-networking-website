import type { Metadata } from "next";
import PageWraper from "@/components/ui/CustomUi/PageWraper";
import PillSwitcher from "@/components/shared/PillSwitcher";
import OverviewPanel from "./_components/OverviewPanel";
import OrdersPanel from "./_components/OrdersPanel";
import ListingsPanel from "./_components/ListingsPanel";
import RatingsPanel from "./_components/RatingsPanel";
import {
    SHOP_TABS,
    isReviewFilter,
    isReviewSort,
    isShopTab,
    type ReviewFilter,
    type ReviewSort,
    type ShopTab,
} from "./_lib/data";

export const metadata: Metadata = {
    title: "My Shop | eKayzone",
    description: "Manage your shop's orders, bookings, listings and ratings.",
};

function firstValue(value: string | string[] | undefined): string | undefined {
    return Array.isArray(value) ? value[0] : value;
}

export default async function MyShopPage({ searchParams }: PageProps<"/profile/shop">) {
    const params = await searchParams;

    const rawTab = firstValue(params.tab);
    const tab: ShopTab = isShopTab(rawTab) ? rawTab : "overview";
    const search = firstValue(params.search) ?? "";

    const rawFilter = firstValue(params.reviewFilter);
    const reviewFilter: ReviewFilter = isReviewFilter(rawFilter) ? rawFilter : "all";

    const rawSort = firstValue(params.reviewSort);
    const reviewSort: ReviewSort = isReviewSort(rawSort) ? rawSort : "newest";

    return (
        <PageWraper title="My Shop" backToPreviousPage>
            <div className="flex flex-col gap-5">
                <PillSwitcher<ShopTab>
                    items={SHOP_TABS.map((shopTab) => ({ label: shopTab.label, value: shopTab.value }))}
                    activeValue={tab}
                    param="tab"
                    basePath="/profile/shop"
                    searchParams={params}
                    resetParams={["search", "reviewFilter", "reviewSort"]}
                    variant="primary"
                />

                {tab === "overview" && <OverviewPanel />}
                {tab === "orders" && <OrdersPanel search={search} mode="orders" />}
                {tab === "bookings" && <OrdersPanel search={search} mode="bookings" />}
                {tab === "listings" && <ListingsPanel search={search} />}
                {tab === "ratings" && (
                    <RatingsPanel
                        filter={reviewFilter}
                        sort={reviewSort}
                        search={search}
                        searchParams={params}
                    />
                )}
            </div>
        </PageWraper>
    );
}
