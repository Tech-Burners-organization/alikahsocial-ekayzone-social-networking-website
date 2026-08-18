import { Info } from "lucide-react";
import ShopStatCard from "./ShopStatCard";
import SummaryCard from "./SummaryCard";
import {
    EARNINGS_NOTE,
    getEarningsSummary,
    getQuickStats,
    getShopStats,
} from "../_lib/data";

export default function OverviewPanel() {
    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
                {getShopStats().map((stat) => (
                    <ShopStatCard key={stat.label} stat={stat} />
                ))}
            </div>

            <SummaryCard title="Quick Stats" rows={getQuickStats()} />

            <SummaryCard
                title="Earnings Summary"
                rows={getEarningsSummary()}
                footnote={
                    <p className="flex items-start gap-1 text-xs text-[#1b1c1c]">
                        <Info className="mt-px size-3 shrink-0" />
                        {EARNINGS_NOTE}
                    </p>
                }
            />
        </div>
    );
}
