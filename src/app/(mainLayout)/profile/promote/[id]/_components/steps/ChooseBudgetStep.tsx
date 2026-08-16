"use client";

import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { formatCompactNumber } from "@/lib/format";
import { estimateReach, estimateTotalSpend, estimateVideoViews, formatCampaignRunDates } from "../../_lib/estimate";
import { BUDGET_MAX, BUDGET_MIN, BUDGET_PRESETS, DURATION_OPTIONS, type PromoteDuration } from "../../_lib/types";

interface ChooseBudgetStepProps {
    dailyBudget: number;
    onDailyBudgetChange: (value: number) => void;
    duration: PromoteDuration;
    onDurationChange: (value: PromoteDuration) => void;
}

export default function ChooseBudgetStep({
    dailyBudget,
    onDailyBudgetChange,
    duration,
    onDurationChange,
}: ChooseBudgetStepProps) {
    const totalSpend = estimateTotalSpend(dailyBudget, duration);
    const [reachMin, reachMax] = estimateReach(dailyBudget);
    const [viewsMin, viewsMax] = estimateVideoViews(dailyBudget);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
                <span className="text-sm font-semibold text-muted-foreground">Daily Budget</span>

                <p className="text-center">
                    <span className="text-5xl font-bold text-secondary-color">R{dailyBudget}</span>
                    <span className="text-xl text-muted-foreground">/day</span>
                </p>

                <Slider
                    value={dailyBudget}
                    onValueChange={(value) => onDailyBudgetChange(value as number)}
                    min={BUDGET_MIN}
                    max={BUDGET_MAX}
                    step={10}
                />
                <div className="flex items-center justify-between text-sm font-medium text-foreground">
                    <span>R{BUDGET_MIN}</span>
                    <span>R{BUDGET_MAX}</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                    {BUDGET_PRESETS.map((preset) => (
                        <button
                            key={preset}
                            type="button"
                            onClick={() => onDailyBudgetChange(preset)}
                            className={cn(
                                "h-10 rounded-full border px-4 text-sm font-bold transition-colors",
                                dailyBudget === preset
                                    ? "border-black/10 bg-secondary-color text-white shadow-sm"
                                    : "border-black/5 bg-white text-muted-foreground hover:bg-muted/50"
                            )}
                        >
                            R{preset}/day
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <span className="text-sm font-semibold text-muted-foreground">Duration</span>
                <div className="inline-flex w-fit gap-1.5 rounded-2xl border border-border bg-white/80 p-1.5">
                    {DURATION_OPTIONS.map((option) => (
                        <button
                            key={option}
                            type="button"
                            onClick={() => onDurationChange(option)}
                            className={cn(
                                "h-9 rounded-lg px-2.5 text-sm font-bold transition-colors",
                                duration === option ? "bg-secondary-color text-white shadow-sm" : "text-muted-foreground"
                            )}
                        >
                            {option} {option === 1 ? "day" : "days"}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-2 rounded-xl border border-border bg-background p-2.5">
                <h2 className="px-1.5 py-2 text-lg font-bold text-foreground">Estimated Results</h2>
                <div className="flex flex-col">
                    <div className="flex items-center justify-between border-b border-border px-1.5 py-2.5">
                        <span className="text-sm font-medium text-foreground">Total Spend</span>
                        <span className="text-base font-bold text-foreground">R{totalSpend}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-border px-1.5 py-2.5">
                        <span className="text-sm font-medium text-foreground">Estimated Reach</span>
                        <span className="text-base font-bold text-foreground">
                            {formatCompactNumber(reachMin)}-{formatCompactNumber(reachMax)} people
                        </span>
                    </div>
                    <div className="flex items-center justify-between border-b border-border px-1.5 py-2.5">
                        <span className="text-sm font-medium text-foreground">Est. video views</span>
                        <span className="text-base font-bold text-foreground">
                            {formatCompactNumber(viewsMin)}-{formatCompactNumber(viewsMax)}
                        </span>
                    </div>
                    <div className="flex items-center justify-between px-1.5 py-2.5">
                        <span className="text-sm font-medium text-foreground">Campaign runs</span>
                        <span className="text-base font-bold text-foreground">{formatCampaignRunDates(duration)}</span>
                    </div>
                </div>
            </div>

            <p className="text-center text-xs text-muted-foreground">
                Results are estimates and may vary. You will only be charged the actual amount spent.
            </p>
        </div>
    );
}
