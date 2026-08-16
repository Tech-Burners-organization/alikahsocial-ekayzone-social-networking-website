import { AllImages } from "../../../../../public/images/AllImages";
import { getDummyItemAt } from "@/components/shared/reels/feedData";
import { getFilteredProducts } from "@/app/(mainLayout)/marketplace/_lib/data";
import type { CommentEntry } from "@/components/shared/reels/types";

export type VideoKind = "video" | "stream";

export interface LinkedListing {
    id: string;
    name: string;
    price: number;
    currency: string;
    image: string;
}

export interface ViewerTrendPoint {
    label: string;
    viewers: number;
}

export interface MyVideo {
    id: string;
    title: string;
    thumbnailUrl: string;
    kind: VideoKind;
    views: number;
    publishedAt: string;
    durationLabel?: string;
    avgWatchDuration?: string;
    completionRate?: number;
    totalWatchTimeHours?: number;
    peakViewers?: number;
    likes: number;
    commentsCount: number;
    shares: number;
    saves?: number;
    linkedListing: LinkedListing | null;
    viewerTrend?: ViewerTrendPoint[];
    comments: CommentEntry[];
}

export interface MyProfile {
    fullName: string;
    userName: string;
    avatarUrl: string;
    coverUrl: string;
    isPro: boolean;
    bio: string;
    followingCount: number;
    followerCount: number;
    rating: number;
}

const COVER = AllImages.cover.src;
const AVATAR = AllImages.profile.src;

// Deterministic pseudo-random value in [min, max], stable per seed (no Math.random
// so server/client renders agree and repeated calls don't drift).
function stableValue(seed: number, min: number, max: number): number {
    const pseudoRandom = Math.abs(Math.sin(seed * 999.13)) % 1;
    return Math.round(min + pseudoRandom * (max - min));
}

const VIDEO_TITLES = [
    "How I Package all my skin care orders",
    "Morning Routine for Glowing Skin",
    "Behind the Scenes: Order Fulfillment",
    "Q&A: Your Skincare Questions Answered",
    "Unboxing New Stock Arrivals",
    "5 Tips for Longer-Lasting Braids",
    "Live Cooking: Quick Weeknight Dinner",
    "Studio Tour + Restock Day",
    "Packing Orders for Weekend Market",
];

function buildViewerTrend(seed: number): ViewerTrendPoint[] {
    return ["0:00", "20:00", "40:00", "60:00"].map((label, i) => ({
        label,
        viewers: stableValue(seed + i, 80, 420),
    }));
}

function buildLinkedListing(index: number, kind: VideoKind): LinkedListing | null {
    if (kind !== "video" || index % 4 !== 0) return null;

    const linkableProducts = getFilteredProducts({ search: "", category: "all", sort: "relevance" });
    const product = linkableProducts[index % linkableProducts.length];

    return {
        id: product.id,
        name: product.title,
        price: product.price,
        currency: product.currency,
        image: product.image,
    };
}

function buildVideo(index: number): MyVideo {
    const kind: VideoKind = index % 3 === 1 ? "stream" : "video";
    const title = VIDEO_TITLES[index % VIDEO_TITLES.length];

    return {
        id: `v${index + 1}`,
        title,
        thumbnailUrl: COVER,
        kind,
        views: stableValue(index, 1200, 210000),
        publishedAt: "14 Mar 2026 • 4:35 PM",
        durationLabel: kind === "stream" ? "1h 24m" : undefined,
        avgWatchDuration: kind === "video" ? `${stableValue(index + 1, 1, 3)}m ${stableValue(index + 2, 5, 55)}s` : undefined,
        completionRate: kind === "video" ? stableValue(index + 3, 40, 92) : undefined,
        totalWatchTimeHours: kind === "video" ? stableValue(index + 4, 20, 600) : undefined,
        peakViewers: kind === "stream" ? stableValue(index + 5, 150, 900) : undefined,
        likes: stableValue(index + 6, 200, 2400),
        commentsCount: stableValue(index + 7, 40, 500),
        shares: stableValue(index + 8, 10, 200),
        saves: kind === "video" ? stableValue(index + 9, 30, 300) : undefined,
        linkedListing: buildLinkedListing(index, kind),
        viewerTrend: kind === "stream" ? buildViewerTrend(index) : undefined,
        comments: getDummyItemAt(index).comments,
    };
}

const VIDEO_POOL: MyVideo[] = Array.from({ length: 9 }, (_, i) => buildVideo(i));

export function getMyProfile(): MyProfile {
    return {
        fullName: "Thabo Mokoena",
        userName: "thabo_mokoena",
        avatarUrl: AVATAR,
        coverUrl: COVER,
        isPro: true,
        bio: "Just someone who enjoys discovering new ideas, meeting different people, and learning something useful every day. Trying to stay positive and keep moving forward.",
        followingCount: 128,
        followerCount: 1200,
        rating: 4.8,
    };
}

export type ProfileTab = "videos" | "liked" | "saved";

export function isProfileTab(value: unknown): value is ProfileTab {
    return value === "videos" || value === "liked" || value === "saved";
}

export function getMyVideosByTab(tab: ProfileTab): MyVideo[] {
    if (tab === "videos") return VIDEO_POOL.slice(0, 6);
    if (tab === "liked") return VIDEO_POOL.slice(3, 9);
    return [1, 8, 4, 6, 0, 7].map((i) => VIDEO_POOL[i]);
}

export function getMyVideoById(id: string): MyVideo | undefined {
    return VIDEO_POOL.find((video) => video.id === id);
}

/** Videos eligible for promotion — live streams can't be boosted, only regular uploads. */
export function getPromotableVideos(): MyVideo[] {
    return VIDEO_POOL.filter((video) => video.kind === "video");
}

/** Past live streams — used by the Creator Studio "Live" tab. */
export function getPastStreamVideos(): MyVideo[] {
    return VIDEO_POOL.filter((video) => video.kind === "stream");
}
