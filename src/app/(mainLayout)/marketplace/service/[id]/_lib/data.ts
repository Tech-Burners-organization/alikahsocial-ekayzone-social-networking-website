import { getServiceById, type Service, type ServicePricingTier } from '../../../_lib/services';
import { buildReviews, type ReviewsSummary } from '../../../_lib/reviews';

export interface ServiceDetail extends Service {
    description: string;
    pricing: ServicePricingTier[];
    sellerHandle: string;
    sellerAvatar: string;
    reviews: ReviewsSummary;
}

const FALLBACK_SELLER_AVATAR =
    'https://images.unsplash.com/photo-1600486913747-55e5470d6f40?w=120&h=120&fit=crop';

function buildDescription(service: Service): string {
    return `${service.title} from ${service.seller}. Book with confidence — verified seller, real customer reviews, and clear upfront pricing.`;
}

export function getServiceDetail(id: string): ServiceDetail | undefined {
    const service = getServiceById(id);
    if (!service) return undefined;

    return {
        ...service,
        description: service.description ?? buildDescription(service),
        pricing: service.pricing ?? [{ label: 'Standard Service', price: service.priceFrom }],
        sellerHandle: service.sellerHandle ?? `@${service.seller.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
        sellerAvatar: service.sellerAvatar ?? FALLBACK_SELLER_AVATAR,
        reviews: buildReviews(service),
    };
}
