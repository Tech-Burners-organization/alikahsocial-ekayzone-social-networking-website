import { BarChart3, ShoppingBag, TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import DailyCampaignSpendChart from "./charts/DailyCampaignSpendChart";
import AllCampaignsModal from "./AllCampaignsModal";
import ListingViewsModal, { ListingViewsTriggerRow } from "./ListingViewsModal";
import {
    getAllCampaigns,
    getCampaignStatRows,
    getDailyCampaignSpend,
    getFeaturedCampaign,
    getListingBreakdown,
    getListingViewsFromVideos,
    getMarketplaceAnalyticsRows,
} from "../_lib/data";

const BADGE_TONE_CLASSES = {
    success: "bg-[#23c56c]/15 text-[#23c56c]",
    warning: "bg-[#e8943f]/15 text-[#e8943f]",
};

export default function CampaignPanel() {
    const featured = getFeaturedCampaign();
    const campaigns = getAllCampaigns();
    const statRows = getCampaignStatRows();
    const spendData = getDailyCampaignSpend();
    const marketplaceRows = getMarketplaceAnalyticsRows();
    const listingViews = getListingViewsFromVideos();
    const listingBreakdown = getListingBreakdown();

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-5 rounded-xl border border-border bg-background p-2.5 shadow-[0px_1px_0.5px_rgba(0,0,0,0.03)]">
                <div className="flex flex-col gap-2.5">
                    <div className="flex items-center gap-1">
                        <BarChart3 className="size-5 text-foreground" />
                        <h2 className="text-xl font-bold text-foreground">Campaign Performance</h2>
                    </div>

                    <div className="flex flex-col gap-3 rounded-xl border border-secondary-color bg-secondary-color/10 p-2.5">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-1">
                                <span className="size-1 rounded-full bg-secondary-color" />
                                <span className="text-sm font-bold text-secondary-color">Live Campaign</span>
                            </div>
                            <p className="text-lg font-bold text-foreground">{featured.name}</p>
                        </div>
                        <div className="flex items-center gap-8">
                            <div className="flex flex-col gap-0.5">
                                <span className="text-sm text-muted-foreground">Spend</span>
                                <span className="text-base font-bold text-foreground">{featured.spend}</span>
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <span className="text-sm text-muted-foreground">Reach</span>
                                <span className="text-base font-bold text-foreground">{featured.reach}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm font-bold text-foreground">
                                {featured.daysRemaining} Days
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col">
                    {statRows.map((row) => (
                        <div key={row.label} className="flex flex-col gap-1 border-b border-border px-1.5 py-2.5 last:border-b-0">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-foreground">{row.label}</span>
                                <div className="flex items-center gap-1.5">
                                    <span className="text-base font-bold text-foreground">{row.value}</span>
                                    {row.badge && (
                                        <span
                                            className={cn(
                                                "rounded-xl px-1.5 py-1 text-xs font-bold",
                                                BADGE_TONE_CLASSES[row.badge.tone]
                                            )}
                                        >
                                            {row.badge.text}
                                        </span>
                                    )}
                                </div>
                            </div>
                            {row.caption && <span className="text-xs text-foreground">{row.caption}</span>}
                            {row.progress && (
                                <div className="h-1.25 w-full overflow-hidden rounded-full bg-secondary-color/10">
                                    <div
                                        className="h-full rounded-full bg-secondary-color"
                                        style={{ width: `${(row.progress.spent / row.progress.total) * 100}%` }}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <DailyCampaignSpendChart data={spendData} />

                <AllCampaignsModal campaigns={campaigns} />
            </div>

            <div className="flex flex-col gap-5 rounded-xl border border-border bg-background p-2.5 shadow-[0px_1px_0.5px_rgba(0,0,0,0.03)]">
                <div className="flex items-center gap-1">
                    <ShoppingBag className="size-5 text-foreground" />
                    <h2 className="text-xl font-bold text-foreground">Marketplace Analytics</h2>
                </div>

                <div className="flex flex-col">
                    {marketplaceRows.map((row) =>
                        row.label === "Listing Views from Videos" ? (
                            <div key={row.label} className="border-b border-border px-1.5 py-2.5">
                                <ListingViewsModal
                                    items={listingViews}
                                    trigger={<ListingViewsTriggerRow value={row.value} caption={row.caption} />}
                                />
                            </div>
                        ) : (
                            <div key={row.label} className="flex flex-col gap-1.5 border-b border-border px-1.5 py-2.5 last:border-b-0">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-foreground">{row.label}</span>
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-base font-bold text-foreground">{row.value}</span>
                                        {row.badge && (
                                            <span
                                                className={cn(
                                                    "rounded-xl px-1.5 py-1 text-xs font-bold",
                                                    BADGE_TONE_CLASSES[row.badge.tone]
                                                )}
                                            >
                                                {row.badge.text}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                {row.caption && <span className="text-xs text-foreground">{row.caption}</span>}
                                {row.chips && (
                                    <div className="flex flex-wrap items-center gap-1">
                                        {row.chips.map((chip) => (
                                            <span
                                                key={chip}
                                                className="rounded-xl bg-muted px-1.5 py-1 text-xs font-medium text-muted-foreground"
                                            >
                                                {chip}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <h3 className="text-base font-bold text-foreground">Per Listing Breakdown</h3>
                    <div className="overflow-x-auto rounded-lg border border-border">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-muted">
                                <tr>
                                    <th className="px-2.5 py-2.5 text-sm font-bold text-foreground">Listing</th>
                                    <th className="px-2.5 py-2.5 text-sm font-bold text-foreground">Views</th>
                                    <th className="px-2.5 py-2.5 text-sm font-bold text-foreground">CVR</th>
                                    <th className="px-2.5 py-2.5 text-sm font-bold text-foreground">Trend</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listingBreakdown.map((row) => (
                                    <tr key={row.listing} className="border-t border-border">
                                        <td className="px-2.5 py-3 font-medium text-foreground">{row.listing}</td>
                                        <td className="px-2.5 py-3 text-foreground">{row.views}</td>
                                        <td className="px-2.5 py-3 text-foreground">{row.cvr}</td>
                                        <td className="px-2.5 py-3">
                                            {row.trend === "up" ? (
                                                <TrendingUp className="size-5 text-[#23c56c]" />
                                            ) : (
                                                <TrendingDown className="size-5 text-[#d93f3f]" />
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
