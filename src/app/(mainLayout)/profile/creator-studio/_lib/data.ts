import {
    Eye,
    Users,
    UserPlus,
    Heart,
    MessageCircle,
    Share2,
    Clock,
    TrendingUp,
    type LucideIcon,
} from "lucide-react";
import { AllImages } from "../../../../../../public/images/AllImages";
import { getPastStreamVideos, type MyVideo } from "../../_lib/data";

const COVER = AllImages.cover.src;

// Deterministic pseudo-random value in [min, max] — no Math.random so server/client
// renders agree and repeated calls don't drift.
function stableValue(seed: number, min: number, max: number): number {
    const pseudoRandom = Math.abs(Math.sin(seed * 999.13)) % 1;
    return Math.round(min + pseudoRandom * (max - min));
}

export type CreatorStudioTab = "overview" | "content" | "audience" | "live" | "campaign";

export const CREATOR_STUDIO_TABS: { value: CreatorStudioTab; label: string }[] = [
    { value: "overview", label: "Overview" },
    { value: "content", label: "Content" },
    { value: "audience", label: "Audience" },
    { value: "live", label: "Live" },
    { value: "campaign", label: "Campaign" },
];

export function isCreatorStudioTab(value: unknown): value is CreatorStudioTab {
    return CREATOR_STUDIO_TABS.some((tab) => tab.value === value);
}

// ---------------------------------------------------------------------------
// Overview
// ---------------------------------------------------------------------------

export interface StatCardData {
    id: string;
    label: string;
    value: string;
    changePercent: number;
    icon: LucideIcon;
}

export function getOverviewStats(): StatCardData[] {
    return [
        { id: "video-views", label: "Video Views", value: "12.4K", changePercent: 18, icon: Eye },
        { id: "profile-visits", label: "Profile Visits", value: "3.2K", changePercent: 18, icon: Users },
        { id: "followers-gained", label: "Followers Gained", value: "+247", changePercent: 18, icon: UserPlus },
        { id: "total-likes", label: "Total likes", value: "5.4K", changePercent: 18, icon: Heart },
        { id: "comments", label: "Comments", value: "892", changePercent: 18, icon: MessageCircle },
        { id: "shares", label: "Shares", value: "341", changePercent: 18, icon: Share2 },
        { id: "watch-time", label: "Watch Time", value: "48.2h", changePercent: 18, icon: Clock },
        { id: "engagement-rate", label: "Engagement Rate", value: "7.4%", changePercent: -18, icon: TrendingUp },
    ];
}

export interface MonthlyPoint {
    label: string;
    followers: number;
}

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function getFollowerGrowth(): MonthlyPoint[] {
    let running = 1800;
    return MONTH_LABELS.map((label, index) => {
        running += stableValue(index + 1, 600, 1900);
        return { label, followers: Math.min(running, 20000) };
    });
}

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

export type VideoSort = "views" | "reach" | "likes" | "shares";

export const VIDEO_SORT_OPTIONS: { value: VideoSort; label: string }[] = [
    { value: "views", label: "Most Views" },
    { value: "reach", label: "Most Reach" },
    { value: "likes", label: "Most Likes" },
    { value: "shares", label: "Most Shares" },
];

export function isVideoSort(value: unknown): value is VideoSort {
    return VIDEO_SORT_OPTIONS.some((option) => option.value === value);
}

export interface VideoPerformanceItem {
    id: string;
    title: string;
    thumbnailUrl: string;
    views: number;
    reach: number;
    likes: number;
    shares: number;
}

const CONTENT_VIDEO_TITLES = [
    "Product Showcase: Tool Kit",
    "Unboxing New Stock Arrivals",
    "5 Tips for Longer-Lasting Braids",
    "Behind the Scenes: Order Fulfillment",
    "Q&A: Your Skincare Questions Answered",
];

export function getVideoPerformance(sort: VideoSort): VideoPerformanceItem[] {
    const items: VideoPerformanceItem[] = CONTENT_VIDEO_TITLES.map((title, index) => ({
        id: `cv${index + 1}`,
        title,
        thumbnailUrl: COVER,
        views: stableValue(index + 1, 1200, 4800),
        reach: stableValue(index + 11, 1800, 6200),
        likes: stableValue(index + 21, 80, 620),
        shares: stableValue(index + 31, 10, 90),
    }));

    return items.sort((a, b) => b[sort] - a[sort]);
}

// ---------------------------------------------------------------------------
// Audience
// ---------------------------------------------------------------------------

export interface GenderSlice {
    label: string;
    percent: number;
    color: string;
}

export function getGenderAnalytics(): GenderSlice[] {
    return [
        { label: "Male", percent: 54, color: "#3b82f6" },
        { label: "Female", percent: 40, color: "#ec4899" },
        { label: "Other", percent: 6, color: "#8b5cf6" },
    ];
}

export interface AgeBucket {
    label: string;
    percent: number;
}

export function getAgeRangeAnalytics(): AgeBucket[] {
    return [
        { label: "15-17", percent: 8 },
        { label: "18-24", percent: 32 },
        { label: "25-34", percent: 45 },
        { label: "35-44", percent: 28 },
        { label: "45-54", percent: 14 },
        { label: "60+", percent: 6 },
    ];
}

export interface LocationShare {
    label: string;
    percent: number;
}

export function getTopLocations(): LocationShare[] {
    return [
        { label: "South Africa", percent: 54 },
        { label: "Saudi Arabia", percent: 30 },
        { label: "Ethiopia", percent: 20 },
        { label: "France", percent: 15 },
        { label: "Bangladesh", percent: 10 },
        { label: "Others", percent: 8 },
    ];
}

// ---------------------------------------------------------------------------
// Live
// ---------------------------------------------------------------------------

export function getLiveStreamStats(): StatCardData[] {
    return [
        { id: "total-views", label: "Total Views", value: "5.2K", changePercent: 0, icon: Eye },
        { id: "total-stream-hours", label: "Total Stream Hours", value: "10.5h", changePercent: 0, icon: Clock },
        { id: "avg-peak-viewers", label: "Avg Peak Viewers", value: "620", changePercent: 0, icon: Users },
        { id: "avg-watch-duration", label: "Avg Watch Duration", value: "8m 34s", changePercent: 0, icon: Clock },
        { id: "followers-from-streams", label: "Followers From Streams", value: "+86", changePercent: 0, icon: UserPlus },
        { id: "total-comments", label: "Total Comments", value: "1.4K", changePercent: 0, icon: MessageCircle },
    ];
}

export interface PastStreamItem {
    id: string;
    title: string;
    thumbnailUrl: string;
    publishedAt: string;
    durationLabel: string;
    views: number;
    likes: number;
}

export function getPastStreams(search: string): PastStreamItem[] {
    const streams: PastStreamItem[] = getPastStreamVideos().map((video: MyVideo) => ({
        id: video.id,
        title: video.title,
        thumbnailUrl: video.thumbnailUrl,
        publishedAt: video.publishedAt,
        durationLabel: video.durationLabel ?? "1h 24m",
        views: video.views,
        likes: video.likes,
    }));

    const q = search.trim().toLowerCase();
    if (!q) return streams;
    return streams.filter((stream) => stream.title.toLowerCase().includes(q));
}

// ---------------------------------------------------------------------------
// Campaign
// ---------------------------------------------------------------------------

export type CampaignStatus = "active" | "ended";

export interface Campaign {
    id: string;
    name: string;
    status: CampaignStatus;
    spend: string;
    reach: string;
    ctr: string;
    daysRemaining?: number;
}

export function getAllCampaigns(): Campaign[] {
    return [
        { id: "camp-1", name: "Tool Kit Promo", status: "active", spend: "R1,200", reach: "9.4K", ctr: "3.8%", daysRemaining: 4 },
        { id: "camp-2", name: "Faucet Fix Video", status: "ended", spend: "R1,200", reach: "9.4K", ctr: "3.8%" },
        { id: "camp-3", name: "Dishwasher Clean Tips", status: "ended", spend: "R980", reach: "7.1K", ctr: "3.1%" },
        { id: "camp-4", name: "Closet Organizer Guide", status: "ended", spend: "R650", reach: "5.6K", ctr: "2.9%" },
    ];
}

export function getFeaturedCampaign(): Campaign {
    return getAllCampaigns()[0];
}

export interface CampaignSpendPoint {
    label: string;
    spend: number;
}

export function getDailyCampaignSpend(): CampaignSpendPoint[] {
    return [
        { label: "Mon", spend: 16 },
        { label: "Tue", spend: 50 },
        { label: "Wed", spend: 22 },
        { label: "Thu", spend: 16 },
        { label: "Fri", spend: 21 },
        { label: "Sat", spend: 8 },
        { label: "Sun", spend: 29 },
    ];
}

export interface CampaignStatRow {
    label: string;
    value: string;
    caption?: string;
    badge?: { text: string; tone: "success" | "warning" };
    progress?: { spent: number; total: number };
}

export function getCampaignStatRows(): CampaignStatRow[] {
    return [
        {
            label: "Total Ad Spend",
            value: "R2,450",
            caption: "R2,450 spent of R3,000 total budget",
            progress: { spent: 2450, total: 3000 },
        },
        {
            label: "Promoted Reach",
            value: "18.2K",
            caption: "28,400 impressions · 1.6x Frequency",
        },
        { label: "CPM", value: "R134.60", badge: { text: "Average", tone: "warning" } },
        { label: "CTR (Click-Through Rate)", value: "3.6%", badge: { text: "Above Avg", tone: "success" } },
        { label: "Cost per Listing Visit", value: "R1.42" },
        { label: "Listing Clicks", value: "842", caption: "3.4% of impressions" },
    ];
}

export interface MarketplaceAnalyticsRow {
    label: string;
    value: string;
    caption?: string;
    badge?: { text: string; tone: "success" | "warning" };
    chips?: string[];
}

export function getMarketplaceAnalyticsRows(): MarketplaceAnalyticsRow[] {
    return [
        {
            label: "Listing Views from Videos",
            value: "1,248",
            caption: "How to fix a leaky faucet drove 847 of 1,248 views",
        },
        { label: "Inquiry Conversion Rate", value: "4.2%", badge: { text: "Above Avg", tone: "success" } },
        { label: "Top Traffic Video", value: "18.2K", caption: "How to fix a leaky faucet" },
        { label: "Response Rate", value: "94.2%", badge: { text: "Above Avg", tone: "success" } },
        { label: "Avg Response Time", value: "2.4 hrs", badge: { text: "Average", tone: "warning" } },
        {
            label: "Listing Views from Ads",
            value: "52",
            chips: ["38 from videos", "9 from search", "5 from profile"],
        },
    ];
}

export interface ListingBreakdownRow {
    listing: string;
    views: number;
    cvr: string;
    trend: "up" | "down";
}

export function getListingBreakdown(): ListingBreakdownRow[] {
    return [
        { listing: "Professional Nail Kit", views: 1248, cvr: "4.2%", trend: "up" },
        { listing: "Professional Hair Dryer", views: 856, cvr: "4.4%", trend: "down" },
        { listing: "Professional Tool Set", views: 612, cvr: "3.6%", trend: "up" },
    ];
}

export interface ListingViewItem {
    rank: number;
    title: string;
    thumbnailUrl: string;
    views: number;
}

const LISTING_VIEW_VIDEOS: { title: string; views: number }[] = [
    { title: "How to fix a leaky faucet", views: 847 },
    { title: "Cleaning your dishwasher", views: 312 },
    { title: "Tips for organizing your closet", views: 204 },
    { title: "Choosing the right paint color", views: 615 },
    { title: "DIY home decor ideas", views: 422 },
    { title: "Maintaining your garden in spring", views: 708 },
    { title: "How to declutter your living space", views: 556 },
    { title: "Creating a budget for home repairs", views: 398 },
];

export function getListingViewsFromVideos(): ListingViewItem[] {
    return LISTING_VIEW_VIDEOS.map((item, index) => ({
        rank: index + 1,
        title: item.title,
        thumbnailUrl: COVER,
        views: item.views,
    }));
}
