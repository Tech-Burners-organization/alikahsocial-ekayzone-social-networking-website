export interface Review {
    id: string;
    name: string;
    avatar: string;
    date: string;
    rating: number;
    comment: string;
}

export interface ReviewsSummary {
    breakdown: Record<1 | 2 | 3 | 4 | 5, number>;
    items: Review[];
}

const REVIEW_POOL: Omit<Review, 'id'>[] = [
    {
        name: 'Alex Smith',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
        date: 'June 24, 2025',
        rating: 5,
        comment: 'Exactly as described and arrived well packaged. Great value for the price — would buy again.',
    },
    {
        name: 'Emily Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
        date: 'April 24, 2025',
        rating: 4,
        comment: 'Good quality overall. Delivery took a couple of days longer than expected but the seller kept me updated.',
    },
    {
        name: 'Thandi Nkosi',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
        date: 'March 2, 2025',
        rating: 5,
        comment: 'Really happy with this purchase — works perfectly and looks even better in person.',
    },
    {
        name: 'Sipho Dlamini',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
        date: 'February 14, 2025',
        rating: 4,
        comment: 'Solid product for the price. A couple of small wear signs after a few weeks but still going strong.',
    },
];

// Simple deterministic string hash so the same record always gets the same
// review pair / breakdown — SSR output must not depend on Math.random().
function hashId(id: string): number {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
        hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
    }
    return hash;
}

function buildBreakdown(rating: number, reviewCount: number): ReviewsSummary['breakdown'] {
    const sampleTotal = Math.min(reviewCount, 58);
    const weights = [1, 2, 3, 4, 5].map((star) => Math.max(0.05, 1 - Math.abs(star - rating) / 3));
    const weightSum = weights.reduce((sum, weight) => sum + weight, 0);
    const [one, two, three, four, five] = weights.map((weight) =>
        Math.round((weight / weightSum) * sampleTotal)
    );

    return { 1: one, 2: two, 3: three, 4: four, 5: five };
}

/** Deterministic mock reviews for any id + rating/reviewCount pair — shared by product and service detail pages. */
export function buildReviews(record: { id: string; rating: number; reviewCount: number }): ReviewsSummary {
    const offset = hashId(record.id) % REVIEW_POOL.length;
    const items = [0, 1].map((step) => {
        const template = REVIEW_POOL[(offset + step) % REVIEW_POOL.length];
        return { id: `${record.id}-review-${step}`, ...template };
    });

    return { breakdown: buildBreakdown(record.rating, record.reviewCount), items };
}
