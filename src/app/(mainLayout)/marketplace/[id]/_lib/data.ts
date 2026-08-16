import { getFilteredProducts, getProductById, type Product } from '../../_lib/data';
import { buildReviews, type ReviewsSummary } from '../../_lib/reviews';

export type { Review, ReviewsSummary } from '../../_lib/reviews';

export interface ProductDetail extends Product {
    images: string[];
    description: string;
    specs: string[];
    sellerHandle: string;
    sellerAvatar: string;
    stock: 'in-stock' | 'out-of-stock';
    reviews: ReviewsSummary;
}

const FALLBACK_SPECS = [
    'Condition: Brand new, sealed packaging',
    'Warranty: Covered by seller guarantee',
    'Shipping: Dispatched within 2 business days',
    'Returns: 7-day return window',
];

const FALLBACK_SELLER_AVATAR =
    'https://images.unsplash.com/photo-1600486913747-55e5470d6f40?w=120&h=120&fit=crop';

function buildDescription(product: Product): string {
    return `The ${product.title} from ${product.seller} pairs everyday reliability with standout quality. It's a trusted pick on eKayzone Marketplace, backed by verified buyer reviews and responsive seller support.`;
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
