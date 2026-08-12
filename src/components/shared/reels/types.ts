export interface BaseFeedItem {
    id: string;
    posterId: string;
    username: string;
    displayName: string;
    avatarUrl: string;
    isVerified: boolean;
    caption: string;
    hashtags: string[];
    likes: number;
    commentsCount: number;
    shares: number;
    comments: CommentEntry[];
}

export interface ReelFeedItem extends BaseFeedItem {
    kind: "reel";
    videoUrl: string;
}

export interface LiveFeedItem extends BaseFeedItem {
    kind: "live";
    videoUrl: string;
    viewerCount: number;
}

export type FeedItem = ReelFeedItem | LiveFeedItem;

export interface CommentReply {
    id: string;
    username: string;
    avatarUrl: string;
    text: string;
    timestamp: string;
    likeCount: number;
}

export interface CommentEntry extends CommentReply {
    replies: CommentReply[];
}

export const REPORT_REASONS = [
    "Spam",
    "Nudity or sexual content",
    "Hate speech or symbols",
    "Harassment or bullying",
    "Violence or dangerous behavior",
    "False information",
    "Scam or fraud",
    "Intellectual property violation",
    "Self-harm or suicide",
    "Child safety",
    "Illegal or regulated goods",
    "Impersonation",
    "Other",
] as const;

export type ReportReason = (typeof REPORT_REASONS)[number];

export interface ProfileThumbnail {
    id: string;
    thumbnailUrl: string;
    views: number;
    isLive?: boolean;
}

export interface CreatorProfile {
    posterId: string;
    userName: string;
    fullName: string;
    avatarUrl: string;
    isVerified: boolean;
    bio: string;
    followerCount: number;
    followingCount: number;
    videos: ProfileThumbnail[];
    likedVideos: ProfileThumbnail[];
}
