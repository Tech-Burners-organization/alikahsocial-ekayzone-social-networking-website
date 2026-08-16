import type { ServicePricingTier } from "../../../_lib/services";

export default function ServicePricingList({
    pricing,
    currency,
}: {
    pricing: ServicePricingTier[];
    currency: string;
}) {
    return (
        <div className="flex flex-col gap-2.5">
            <h2 className="text-xl font-bold text-foreground">Pricing</h2>
            <div className="flex flex-col">
                {pricing.map((tier) => (
                    <div
                        key={tier.label}
                        className="flex items-center justify-between border-b border-border px-1.5 py-2.5"
                    >
                        <span className="text-lg text-foreground">{tier.label}</span>
                        <span className="text-xl font-bold text-secondary-color">
                            {currency}
                            {tier.price}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
