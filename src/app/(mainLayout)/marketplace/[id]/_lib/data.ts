import { getFilteredProducts, getProductById, type Product } from '../../_lib/data';

export interface Review {
    id: string;
    name: string;
    avatar: string;
    date: string;
    rating: number;
    comment: string;
}

export interface ProductReviews {
    breakdown: Record<1 | 2 | 3 | 4 | 5, number>;
    items: Review[];
}

export interface ProductDetail extends Product {
    images: string[];
    description: string;
    specs: string[];
    sellerHandle: string;
    sellerAvatar: string;
    stock: 'in-stock' | 'out-of-stock';
    reviews: ProductReviews;
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

const FALLBACK_SPECS = [
    'Condition: Brand new, sealed packaging',
    'Warranty: Covered by seller guarantee',
    'Shipping: Dispatched within 2 business days',
    'Returns: 7-day return window',
];

const FALLBACK_SELLER_AVATAR =
    'https://images.unsplash.com/photo-1600486913747-55e5470d6f40?w=120&h=120&fit=crop';

// Simple deterministic string hash so the same product always gets the same
// review pair / breakdown — SSR output must not depend on Math.random().
function hashId(id: string): number {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
        hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
    }
    return hash;
}

function buildDescription(product: Product): string {
    return `The ${product.title} from ${product.seller} pairs everyday reliability with standout quality. It's a trusted pick on eKayzone Marketplace, backed by verified buyer reviews and responsive seller support.`;
}

function buildBreakdown(rating: number, reviewCount: number): ProductReviews['breakdown'] {
    const sampleTotal = Math.min(reviewCount, 58);
    const weights = [1, 2, 3, 4, 5].map((star) => Math.max(0.05, 1 - Math.abs(star - rating) / 3));
    const weightSum = weights.reduce((sum, weight) => sum + weight, 0);
    const [one, two, three, four, five] = weights.map((weight) =>
        Math.round((weight / weightSum) * sampleTotal)
    );

    return { 1: one, 2: two, 3: three, 4: four, 5: five };
}

function buildReviews(product: Product): ProductReviews {
    const offset = hashId(product.id) % REVIEW_POOL.length;
    const items = [0, 1].map((step) => {
        const template = REVIEW_POOL[(offset + step) % REVIEW_POOL.length];
        return { id: `${product.id}-review-${step}`, ...template };
    });

    return { breakdown: buildBreakdown(product.rating, product.reviewCount), items };
}

export function getProductDetail(id: string): ProductDetail | undefined {
    const product = getProductById(id);
    if (!product) return undefined;

    return {
        ...product,
        images: product.images ?? [product.image],
        description: product.description ?? buildDescription(product),
        specs: product.specs ?? FALLBACK_SPECS,
        sellerHandle: product.sellerHandle ?? `@${product.seller.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
        sellerAvatar: product.sellerAvatar ?? FALLBACK_SELLER_AVATAR,
        stock: product.stock ?? 'in-stock',
        reviews: buildReviews(product),
    };
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
    const sameCategory = getFilteredProducts({
        search: '',
        category: product.category,
        sort: 'relevance',
    }).filter((candidate) => candidate.id !== product.id);

    if (sameCategory.length >= limit) {
        return sameCategory.slice(0, limit);
    }

    const usedIds = new Set([product.id, ...sameCategory.map((item) => item.id)]);
    const fallback = getFilteredProducts({ search: '', category: 'all', sort: 'relevance' }).filter(
        (candidate) => !usedIds.has(candidate.id)
    );

    return [...sameCategory, ...fallback].slice(0, limit);
}
