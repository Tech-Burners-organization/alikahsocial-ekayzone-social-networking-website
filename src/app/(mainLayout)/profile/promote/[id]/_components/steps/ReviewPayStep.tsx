"use client";

import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatCompactNumber } from "@/lib/format";
import { estimateReach, estimateTotalSpend } from "../../_lib/estimate";
import {
    GOAL_OPTIONS,
    PAYMENT_OPTIONS,
    ZAR_TO_USD_RATE,
    type AudienceMode,
    type PromoteDuration,
    type PromoteGoal,
    type PromotePaymentMethod,
} from "../../_lib/types";
import type { MyVideo } from "../../../../_lib/data";

interface ReviewPayStepProps {
    video: MyVideo;
    goal: PromoteGoal;
    audienceMode: AudienceMode;
    dailyBudget: number;
    duration: PromoteDuration;
    paymentMethod: PromotePaymentMethod;
    onPaymentMethodChange: (method: PromotePaymentMethod) => void;
}

export default function ReviewPayStep({
    video,
    goal,
    audienceMode,
    dailyBudget,
    duration,
    paymentMethod,
    onPaymentMethodChange,
}: ReviewPayStepProps) {
    const totalSpend = estimateTotalSpend(dailyBudget, duration);
    const [reachMin, reachMax] = estimateReach(dailyBudget);
    const goalLabel = GOAL_OPTIONS.find((option) => option.value === goal)?.label ?? "";

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 rounded-xl border border-border bg-background p-2.5">
                <div className="flex items-center gap-2">
                    <div className="relative h-18 w-18.25 shrink-0 overflow-hidden rounded-lg bg-muted">
                        <Image src={video.thumbnailUrl} alt={video.title} fill sizes="73px" className="object-cover" />
                    </div>
                    <div>
                        <p className="text-lg font-bold text-foreground">{video.title}</p>
                        <p className="text-base font-semibold text-muted-foreground">Your Video</p>
                    </div>
                </div>

                <div className="flex flex-col">
                    <div className="flex items-center justify-between border-b border-border px-1.5 py-2.5">
                        <span className="text-sm font-medium text-foreground">Goal</span>
                        <span className="text-base font-bold text-foreground">{goalLabel}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-border px-1.5 py-2.5">
                        <span className="text-sm font-medium text-foreground">Audience</span>
                        <span className="text-base font-bold text-foreground capitalize">{audienceMode}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-border px-1.5 py-2.5">
                        <span className="text-sm font-medium text-foreground">Budget</span>
                        <span className="text-base font-bold text-foreground">
                            R{dailyBudget}/day for {duration} {duration === 1 ? "day" : "days"}
                        </span>
                    </div>
                    <div className="flex items-center justify-between border-b border-border px-1.5 py-2.5">
                        <span className="text-sm font-medium text-foreground">Estimated Reach</span>
                        <span className="text-base font-bold text-foreground">
                            {formatCompactNumber(reachMin)}-{formatCompactNumber(reachMax)} people
                        </span>
                    </div>
                    <div className="flex items-center justify-between px-1.5 py-2.5">
                        <span className="text-sm font-medium text-foreground">Total Charge</span>
                        <span className="text-base font-bold text-foreground">R{totalSpend}</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-1.5">
                <h2 className="px-0.5 text-lg font-bold text-foreground">Payment Method</h2>
                <RadioGroup
                    value={paymentMethod}
                    onValueChange={(next) => onPaymentMethodChange(next as PromotePaymentMethod)}
                    className="gap-1.5"
                >
                    {PAYMENT_OPTIONS.map((option) => (
                        <label
                            key={option.value}
                            className="flex cursor-pointer items-center justify-between gap-2.5 rounded-xl border border-border bg-background px-3 py-4"
                        >
                            <span className="flex items-center gap-2.5">
                                <RadioGroupItem value={option.value} />
                                <span className="flex flex-col">
                                    <span className="text-base font-bold text-foreground">{option.label}</span>
                                    <span className="text-sm font-medium text-muted-foreground">{option.currency}</span>
                                </span>
                            </span>
                            <span className="text-xl font-bold text-secondary-color">
                                {option.value === "payfast" ? `R${totalSpend}` : `$${Math.round(totalSpend * ZAR_TO_USD_RATE)}`}
                            </span>
                        </label>
                    ))}
                </RadioGroup>
            </div>
        </div>
    );
}
