"use client";

import { Timer, Zap, Ban } from "lucide-react";
import { cn } from "@/lib/utils";
import ReusableModal from "@/components/ui/CustomUi/ReuseableModal";
import type { Campaign } from "../_lib/data";

export default function AllCampaignsModal({ campaigns }: { campaigns: Campaign[] }) {
    return (
        <ReusableModal
            title="All Campaigns"
            maxWidth="sm:max-w-lg"
            trigger={
                <button
                    type="button"
                    className="flex h-10 w-full items-center justify-center gap-1.5 rounded-lg text-sm font-semibold text-secondary-color transition-colors hover:bg-secondary-color/5"
                >
                    View all campaigns
                </button>
            }
        >
            <div className="flex flex-col gap-2.5">
                {campaigns.map((campaign) => (
                    <div
                        key={campaign.id}
                        className={cn(
                            "flex flex-col gap-3 rounded-xl border p-2.5",
                            campaign.status === "active"
                                ? "border-secondary-color bg-secondary-color/10"
                                : "border-border bg-muted"
                        )}
                    >
                        <div className="flex items-center justify-between">
                            <p className="text-lg font-bold text-foreground">{campaign.name}</p>
                            {campaign.status === "active" ? (
                                <span className="flex items-center gap-0.5 rounded-xl bg-secondary-color px-1.5 py-1 text-xs font-bold text-white">
                                    Active
                                    <Zap className="size-3.5 fill-white" />
                                </span>
                            ) : (
                                <span className="flex items-center gap-0.5 rounded-xl bg-[#ff6b6b] px-1.5 py-1 text-xs font-bold text-white">
                                    Ended
                                    <Ban className="size-3.5" />
                                </span>
                            )}
                        </div>

                        <div className="flex items-center gap-8">
                            <div className="flex flex-col gap-0.5">
                                <span className="text-sm text-muted-foreground">Spend</span>
                                <span className="text-base font-bold text-foreground">{campaign.spend}</span>
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <span className="text-sm text-muted-foreground">Reach</span>
                                <span className="text-base font-bold text-foreground">{campaign.reach}</span>
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <span className="text-sm text-muted-foreground">CTR</span>
                                <span className="text-base font-bold text-foreground">{campaign.ctr}</span>
                            </div>
                        </div>

                        {campaign.daysRemaining != null && (
                            <div className="flex items-center gap-1 text-sm font-bold text-secondary-color">
                                <Timer className="size-4" />
                                {campaign.daysRemaining} days remaining
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </ReusableModal>
    );
}
