import { AllImages } from "../../../../public/images/AllImages";
import type { CommentEntry, CommentReply, CreatorProfile, FeedItem, ProfileThumbnail } from "./types";

const PAGE_SIZE = 3; // deliberately matches the sliding mount-window size in ReelsSection
const SIMULATED_LATENCY_MS = 900;

const AVATAR = AllImages.profile.src;
const COVER = AllImages.cover.src;
const VIDEOS = ["/video/video1.mp4", "/video/video2.mp4", "/video/video3.mp4"];

interface PosterTemplate {
    posterId: string;
    username: string;
    displayName: string;
    isVerified: boolean;
    caption: string;
    hashtags: string[];
    videoIndex: number;
    kind: "reel" | "live";
    bio: string;
}

// Deterministic dummy content — no faker, no backend. `chef_nomsa` mirrors the
// live-cooking-stream example from the reference mockup.
const POSTER_TEMPLATES: PosterTemplate[] = [
    {
        posterId: "poster-thandi",
        username: "learn_with_thandi",
        displayName: "Thandi Nkosi",
        isVerified: true,
        caption: "Grade 12 Math's made easy! Part 1 📐",
        hashtags: ["#LearnWithMe", "#Education"],
        videoIndex: 0,
        kind: "reel",
        bio: "Grade 12 Maths tutor. Breaking down tricky topics one reel at a time. New lesson every week 📚",
    },
    {
        posterId: "poster-animation-hub",
        username: "animation_hub",
        displayName: "Animation Hub",
        isVerified: false,
        caption: "Testing standard landscape aspect ratio tracking natively in your UI framework 🐰",
        hashtags: ["#Animation", "#Design"],
        videoIndex: 1,
        kind: "reel",
        bio: "Motion design experiments and behind-the-scenes animation breakdowns.",
    },
    {
        posterId: "poster-tech-reviews",
        username: "tech_reviews",
        displayName: "Tech Reviews",
        isVerified: true,
        caption: "Auto-play testing and interactive tap actions running perfectly! ⚡",
        hashtags: ["#Tech", "#Reviews"],
        videoIndex: 2,
        kind: "reel",
        bio: "Honest reviews on the gadgets you actually asked about. No sponsors, just opinions.",
    },
    {
        posterId: "poster-chef-nomsa",
        username: "chef_nomsa",
        displayName: "Chef Nomsa",
        isVerified: true,
        caption: "Let's cook dinner tonight",
        hashtags: ["#Cooking", "#LiveNow"],
        videoIndex: 0,
        kind: "live",
        bio: "Home cook turned live-stream chef. Tune in most evenings for dinner inspiration 🍲",
    },
    {
        posterId: "poster-sipho",
        username: "sipho.d",
        displayName: "Sipho Dlamini",
        isVerified: false,
        caption: "Braids and styling tutorial for beginners 💇🏾‍♀️",
        hashtags: ["#HairTutorial", "#SmallBusinessSA"],
        videoIndex: 1,
        kind: "reel",
        bio: "Braids, styling, and small-business tips from my chair to your feed.",
    },
];

const COMMENTERS = [
    { username: "mike_m", avatarUrl: AVATAR },
    { username: "jess_writes", avatarUrl: AVATAR },
    { username: "thabo92", avatarUrl: AVATAR },
    { username: "keshni_b", avatarUrl: AVATAR },
];

const COMMENT_MESSAGES = [
    "This is so helpful! 🔥",
    "Wow, didn't know that!",
    "Been waiting for this one 🙌",
    "Can you do a part 2?",
    "Saved for later, thank you!",
];

function buildReply(seed: number): CommentReply {
    const commenter = COMMENTERS[seed % COMMENTERS.length];
    return {
        id: `reply-${seed}`,
        username: commenter.username,
        avatarUrl: commenter.avatarUrl,
        text: COMMENT_MESSAGES[(seed + 1) % COMMENT_MESSAGES.length],
        timestamp: `${(seed % 6) + 1}h`,
        likeCount: (seed * 7) % 40,
    };
}

function buildComments(itemSeed: number): CommentEntry[] {
    return Array.from({ length: 4 }, (_, i) => {
        const seed = itemSeed * 10 + i;
        const commenter = COMMENTERS[seed % COMMENTERS.length];
        const hasReplies = i % 2 === 0;
        return {
            id: `comment-${seed}`,
            username: commenter.username,
            avatarUrl: commenter.avatarUrl,
            text: COMMENT_MESSAGES[seed % COMMENT_MESSAGES.length],
            timestamp: `${(seed % 8) + 1}h`,
            likeCount: 24 + ((seed * 3) % 60),
            replies: hasReplies ? [buildReply(seed), buildReply(seed + 100)] : [],
        };
    });
}

// Deterministic pseudo-random count in [min, max], stable per index (no Math.random
// so server/client and repeated calls agree).
function stableCount(index: number, min: number, max: number): number {
    const span = max - min;
    const pseudoRandom = Math.abs(Math.sin(index * 999.13)) % 1;
    return Math.round(min + pseudoRandom * span);
}

export function getDummyItemAt(index: number): FeedItem {
    const template = POSTER_TEMPLATES[index % POSTER_TEMPLATES.length];
    const base = {
        id: `feed-${index}`,
        posterId: template.posterId,
        username: template.username,
        displayName: template.displayName,
        avatarUrl: AVATAR,
        isVerified: template.isVerified,
        caption: template.caption,
        hashtags: template.hashtags,
        likes: stableCount(index, 400, 5200),
        commentsCount: stableCount(index + 1, 20, 400),
        shares: stableCount(index + 2, 50, 1400),
        comments: buildComments(index),
        videoUrl: VIDEOS[template.videoIndex],
    };

    if (template.kind === "live") {
        return { ...base, kind: "live", viewerCount: stableCount(index + 3, 900, 9800) };
    }
    return { ...base, kind: "reel" };
}

export interface FeedPage {
    items: FeedItem[];
    nextCursor: string;
}

export async function fetchFeedPage(cursor: string | null, limit = PAGE_SIZE): Promise<FeedPage> {
    await new Promise((resolve) => setTimeout(resolve, SIMULATED_LATENCY_MS));
    const start = cursor ? Number(cursor) : 0;
    const items = Array.from({ length: limit }, (_, i) => getDummyItemAt(start + i));
    return { items, nextCursor: String(start + limit) };
}

function buildThumbnails(seed: number, count: number): ProfileThumbnail[] {
    return Array.from({ length: count }, (_, i) => ({
        id: `thumb-${seed}-${i}`,
        thumbnailUrl: COVER,
        views: stableCount(seed + i, 1200, 210000),
        isLive: i === 1 && seed % 2 === 0,
    }));
}

const PROFILE_CACHE = new Map<string, CreatorProfile>();

export function getProfileForPoster(posterId: string): CreatorProfile {
    const cached = PROFILE_CACHE.get(posterId);
    if (cached) return cached;

    const templateIndex = POSTER_TEMPLATES.findIndex((t) => t.posterId === posterId);
    const template = POSTER_TEMPLATES[templateIndex >= 0 ? templateIndex : 0];
    const seed = templateIndex >= 0 ? templateIndex : 0;

    const profile: CreatorProfile = {
        posterId: template.posterId,
        username: template.username,
        displayName: template.displayName,
        avatarUrl: AVATAR,
        isVerified: template.isVerified,
        bio: template.bio,
        followerCount: stableCount(seed + 10, 800, 128000),
        followingCount: stableCount(seed + 20, 30, 400),
        videos: buildThumbnails(seed, 6),
        likedVideos: buildThumbnails(seed + 50, 6),
    };

    PROFILE_CACHE.set(posterId, profile);
    return profile;
}
