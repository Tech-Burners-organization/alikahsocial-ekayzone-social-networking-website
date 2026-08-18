import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import PageWraper from "@/components/ui/CustomUi/PageWraper";
import UpgradeButton from "./_components/UpgradeButton";
import { getCurrentPlan, getUpgradePlan } from "../_lib/data";

export const metadata: Metadata = {
    title: "Manage Subscription | eKayzone",
};

export default function SubscriptionPage() {
    const currentPlan = getCurrentPlan();
    const upgradePlan = getUpgradePlan();

    return (
        <PageWraper title="Manage Subscription" backToPreviousPage>
            <div className="flex flex-col gap-4">
                <section className="flex flex-col gap-2.5">
                    <h2 className="text-sm font-medium text-[#5e6062]">Current plan</h2>

                    <div className="flex flex-col gap-3 rounded-xl border border-[#e5e8ea] bg-white p-3">
                        <p className="text-2xl font-bold text-[#0a2c07]">{currentPlan.name}</p>
                        <ul className="flex flex-col gap-1.5">
                            {currentPlan.features.map((feature) => (
                                <li key={feature} className="flex items-center gap-[7px]">
                                    <CheckCircle2 className="size-[18px] shrink-0 text-secondary-color" />
                                    <span className="text-base text-[#313233]">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                <section className="flex flex-col gap-3 rounded-xl border border-[#e5e8ea] bg-secondary-color p-3">
                    <div className="flex flex-col gap-1 text-white">
                        <p className="text-2xl font-bold">{upgradePlan.name}</p>
                        <p className="text-base font-medium">{upgradePlan.priceLabel}</p>
                    </div>

                    <ul className="flex flex-col gap-1.5">
                        {upgradePlan.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-[7px]">
                                <CheckCircle2 className="size-[18px] shrink-0 fill-white text-secondary-color" />
                                <span className="text-base font-semibold leading-6 text-white">
                                    {feature}
                                </span>
                            </li>
                        ))}
                    </ul>

                    <UpgradeButton />
                </section>
            </div>
        </PageWraper>
    );
}
