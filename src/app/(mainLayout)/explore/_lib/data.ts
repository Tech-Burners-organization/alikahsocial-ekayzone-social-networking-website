import { AllImages } from "../../../../../public/images/AllImages";

export interface ExploreCategory {
    id: string;
    label: string;
    videoCount: string;
    bg: string;
    border: string;
    iconSrc: string;
}

export const EXPLORE_CATEGORIES: ExploreCategory[] = [
    { id: "education", label: "Education", videoCount: "12.4K", bg: "#eff4fe", border: "#b8c2ff", iconSrc: "/images/explore/category-education.svg" },
    { id: "products", label: "Products", videoCount: "14.4K", bg: "#fef0e8", border: "#d8b38a", iconSrc: "/images/explore/category-products.svg" },
    { id: "sounds", label: "Sounds", videoCount: "4K", bg: "#f5ebfe", border: "#c8a7f2", iconSrc: "/images/explore/category-sounds.svg" },
    { id: "home-services", label: "Home Services", videoCount: "8.7K", bg: "#e6f7f5", border: "#a9d8c8", iconSrc: "/images/explore/category-home-services.svg" },
    { id: "beauty", label: "Beauty", videoCount: "70K", bg: "#fcebf4", border: "#d9a8c3", iconSrc: "/images/explore/category-beauty.svg" },
    { id: "fitness", label: "Fitness", videoCount: "20K", bg: "#fdf6eb", border: "#cfc3a7", iconSrc: "/images/explore/category-fitness.svg" },
    { id: "food", label: "Food", videoCount: "1M", bg: "#fdecef", border: "#e3b7c2", iconSrc: "/images/explore/category-food.svg" },
    { id: "tech", label: "Tech", videoCount: "122K", bg: "#e6f7fa", border: "#9fcfe0", iconSrc: "/images/explore/category-tech.svg" },
];

export function getCategoryById(id: string): ExploreCategory | undefined {
    return EXPLORE_CATEGORIES.find((category) => category.id === id);
}

export interface TrendingHashtag {
    tag: string;
    videoCount: string;
    posts: string;
}

export const TRENDING_HASHTAGS: TrendingHashtag[] = [
    { tag: "SouthAfrica", videoCount: "14.2K", posts: "5.2K" },
    { tag: "MatricPrep", videoCount: "12.5K", posts: "4.1K" },
    { tag: "India", videoCount: "18.3K", posts: "6.7K" },
    { tag: "USA", videoCount: "20.1K", posts: "7.4K" },
    { tag: "France", videoCount: "9.7K", posts: "3.3K" },
];

export function getHashtagByTag(tag: string): TrendingHashtag | undefined {
    return TRENDING_HASHTAGS.find((hashtag) => hashtag.tag.toLowerCase() === tag.toLowerCase());
}

export interface DiscoverThumbnail {
    id: string;
    thumbnailUrl: string;
    views: number;
}

// Deterministic pseudo-random count in [min, max], stable per index — mirrors
// the same approach used for reels/profile thumbnails (no Math.random so
// server/client output always agrees).
function stableCount(index: number, min: number, max: number): number {
    const span = max - min;
    const pseudoRandom = Math.abs(Math.sin(index * 999.13)) % 1;
    return Math.round(min + pseudoRandom * span);
}

export function getDiscoverThumbnails(seed: number, count = 6): DiscoverThumbnail[] {
    return Array.from({ length: count }, (_, i) => ({
        id: `discover-${seed}-${i}`,
        thumbnailUrl: AllImages.cover.src,
        views: stableCount(seed + i, 1200, 210000),
    }));
}
