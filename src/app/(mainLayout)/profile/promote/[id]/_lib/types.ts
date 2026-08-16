import { Eye, ShoppingBag, Users, type LucideIcon } from "lucide-react";

export type PromoteStep = "video" | "goal" | "audience" | "budget" | "review";

export const PROMOTE_STEPS: PromoteStep[] = ["video", "goal", "audience", "budget", "review"];

export const STEP_TITLES: Record<PromoteStep, string> = {
    video: "Choose a video to promote",
    goal: "Choose your Goal",
    audience: "Define Your Audience",
    budget: "Choose Budget",
    review: "Review & Pay",
};

export type PromoteGoal = "views" | "followers" | "marketplace";

export interface GoalOption {
    value: PromoteGoal;
    icon: LucideIcon;
    title: string;
    subtitle: string;
    description: string;
    label: string;
}

export const GOAL_OPTIONS: GoalOption[] = [
    {
        value: "views",
        icon: Eye,
        title: "More Video Views",
        subtitle: "Get more people watching",
        description:
            "We will show your video to users most likely to watch it all the way through. Best for reach and awareness.",
        label: "More Video Views",
    },
    {
        value: "followers",
        icon: Users,
        title: "More Followers",
        subtitle: "Grow your audience",
        description: "We will show your video to users most likely to follow you. Best for long-term audience growth.",
        label: "More Followers",
    },
    {
        value: "marketplace",
        icon: ShoppingBag,
        title: "More Marketplace Visits",
        subtitle: "Drive traffic to your listing",
        description:
            "We will add a Shop Now button to your video and show it to users most likely to visit your listing.",
        label: "More Marketplace Visits",
    },
];

export type AudienceMode = "automatic" | "custom";
export type AudienceGender = "all" | "male" | "female";

export interface CustomAudience {
    ageRange: [number, number];
    gender: AudienceGender;
    locations: string[];
}

export const DEFAULT_CUSTOM_AUDIENCE: CustomAudience = {
    ageRange: [18, 54],
    gender: "all",
    locations: ["South Africa"],
};

export const LOCATION_SUGGESTIONS = [
    "South Africa",
    "Cape Town",
    "Johannesburg",
    "Durban",
    "Pretoria",
    "Gqeberha",
    "Bloemfontein",
];

export type PromoteDuration = 1 | 3 | 5 | 7;

export const DURATION_OPTIONS: PromoteDuration[] = [1, 3, 5, 7];

export const BUDGET_PRESETS = [50, 100, 200] as const;

export const BUDGET_MIN = 20;
export const BUDGET_MAX = 500;

export type PromotePaymentMethod = "payfast" | "paypal";

export const PAYMENT_OPTIONS: { value: PromotePaymentMethod; label: string; currency: string }[] = [
    { value: "payfast", label: "PayFast", currency: "ZAR" },
    { value: "paypal", label: "PayPal", currency: "USD" },
];

/** Rough ZAR -> USD display conversion for the PayPal option — mock data only. */
export const ZAR_TO_USD_RATE = 16 / 300;
