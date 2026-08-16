import type { AudienceGender, PromoteDuration } from "./types";

export function estimateTotalSpend(dailyBudget: number, duration: PromoteDuration): number {
    return dailyBudget * duration;
}

export function estimateReach(dailyBudget: number): [number, number] {
    return [Math.round(dailyBudget * 84), Math.round(dailyBudget * 141)];
}

export function estimateVideoViews(dailyBudget: number): [number, number] {
    return [Math.round(dailyBudget * 60), Math.round(dailyBudget * 107)];
}

export function estimateAudienceSize(gender: AudienceGender, locationCount: number): [number, number] {
    const genderFactor = gender === "all" ? 1 : 0.55;
    const locationFactor = locationCount > 0 ? Math.max(0.3, 1 - 0.15 * locationCount) : 1;
    const min = 240_000 * genderFactor * locationFactor;
    const max = 480_000 * genderFactor * locationFactor;
    return [Math.round(min), Math.round(max)];
}

const DATE_FORMATTER = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short" });

/** Campaign starts tomorrow and runs for `duration` days, e.g. "27 Mar - 30 Mar". */
export function formatCampaignRunDates(duration: PromoteDuration): string {
    const start = new Date();
    start.setDate(start.getDate() + 1);
    const end = new Date(start);
    end.setDate(end.getDate() + duration);

    return `${DATE_FORMATTER.format(start)} - ${DATE_FORMATTER.format(end)}`;
}
