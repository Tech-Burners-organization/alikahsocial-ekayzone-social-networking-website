import {
    Camera,
    Car,
    Dumbbell,
    Home,
    Sparkles,
} from 'lucide-react';
import { isSortOption, type CategoryPill, type SortOption } from './data';

export interface ServicePricingTier {
    label: string;
    price: number;
}

export interface Service {
    id: string;
    title: string;
    seller: string;
    sellerHandle?: string;
    sellerAvatar?: string;
    rating: number;
    reviewCount: number;
    location: string;
    priceFrom: number;
    currency: string;
    image: string;
    category: string;
    badge?: string;
    description?: string;
    pricing?: ServicePricingTier[];
}

export const SERVICE_CATEGORY_PILLS: CategoryPill[] = [
    { id: 'all', label: 'All', icon: null },
    { id: 'beauty', label: 'Beauty', icon: Sparkles },
    { id: 'automotive', label: 'Automotive', icon: Car },
    { id: 'photography', label: 'Photography', icon: Camera },
    { id: 'home', label: 'Home Services', icon: Home },
    { id: 'fitness', label: 'Fitness', icon: Dumbbell },
];

export const SERVICE_SORT_OPTIONS = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'rating-desc', label: 'Highest Rated' },
] as const satisfies readonly { value: SortOption; label: string }[];

const SERVICES: Service[] = [
    {
        id: 's1',
        title: 'Hair Styling & Braiding',
        seller: 'GlamHair Studio',
        sellerHandle: '@glamhairstudio',
        sellerAvatar: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=120&h=120&fit=crop',
        rating: 4.8,
        reviewCount: 521,
        location: 'Soweto',
        priceFrom: 120,
        currency: 'R',
        image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=600&fit=crop',
        category: 'beauty',
        badge: 'Best Seller',
        description:
            'Full hair styling services including braids, weaves, cornrows, dreadlocks, and natural hair care.',
        pricing: [
            { label: 'Cornrows', price: 180 },
            { label: 'Box Braids', price: 120 },
            { label: 'French Twist', price: 200 },
            { label: 'Fishtail Braid', price: 150 },
            { label: 'Dutch Braid', price: 170 },
        ],
    },
    {
        id: 's2',
        title: 'Nail Art & Manicure',
        seller: 'NailBar SA',
        sellerHandle: '@nailbarsa',
        sellerAvatar: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=120&h=120&fit=crop',
        rating: 4.7,
        reviewCount: 342,
        location: 'Soweto',
        priceFrom: 90,
        currency: 'R',
        image: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=800&h=600&fit=crop',
        category: 'beauty',
        description: 'Gel manicures, nail art, and acrylic sets using premium, long-lasting products.',
        pricing: [
            { label: 'Classic Manicure', price: 90 },
            { label: 'Gel Overlay', price: 150 },
            { label: 'Custom Nail Art (per hand)', price: 60 },
        ],
    },
    {
        id: 's3',
        title: 'Makeup Artistry',
        seller: 'GlamHair Studio',
        sellerHandle: '@glamhairstudio',
        sellerAvatar: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=120&h=120&fit=crop',
        rating: 4.9,
        reviewCount: 198,
        location: 'Johannesburg',
        priceFrom: 350,
        currency: 'R',
        image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&h=600&fit=crop',
        category: 'beauty',
        description: 'Bridal, event, and photoshoot makeup with a full consultation and trial session.',
    },
    {
        id: 's4',
        title: 'Full Car Service',
        seller: 'AutoCare Service',
        sellerHandle: '@autocareservice',
        sellerAvatar: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=120&h=120&fit=crop',
        rating: 4.6,
        reviewCount: 276,
        location: 'Pretoria',
        priceFrom: 450,
        currency: 'R',
        image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&h=600&fit=crop',
        category: 'automotive',
        description: 'Complete vehicle service including oil change, brake check, and full diagnostics.',
    },
    {
        id: 's5',
        title: 'Mobile Car Wash',
        seller: 'ShineOnWheels',
        sellerHandle: '@shineonwheels',
        sellerAvatar: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=120&h=120&fit=crop',
        rating: 4.5,
        reviewCount: 143,
        location: 'Soweto',
        priceFrom: 120,
        currency: 'R',
        image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=800&h=600&fit=crop',
        category: 'automotive',
        description: 'We come to you — full exterior wash, interior vacuum, and tyre shine at your door.',
    },
    {
        id: 's6',
        title: 'Photography Session',
        seller: 'Bless Studio',
        sellerHandle: '@blessstudio',
        sellerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop',
        rating: 4.9,
        reviewCount: 521,
        location: 'Johannesburg',
        priceFrom: 800,
        currency: 'R',
        image: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=800&h=600&fit=crop',
        category: 'photography',
        description: 'Portrait, event, and product photography with same-week edited digital delivery.',
    },
    {
        id: 's7',
        title: 'Event Videography',
        seller: 'Bless Studio',
        sellerHandle: '@blessstudio',
        sellerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop',
        rating: 4.8,
        reviewCount: 167,
        location: 'Sandton',
        priceFrom: 1200,
        currency: 'R',
        image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=600&fit=crop',
        category: 'photography',
        description: 'Full-day event coverage with a highlight reel and raw footage handover.',
    },
    {
        id: 's8',
        title: 'Deep Home Cleaning',
        seller: 'CleenSweep',
        sellerHandle: '@cleensweep',
        sellerAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop',
        rating: 4.7,
        reviewCount: 389,
        location: 'Soweto',
        priceFrom: 280,
        currency: 'R',
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop',
        category: 'home',
        description: 'Top-to-bottom deep clean covering kitchens, bathrooms, floors, and upholstery.',
    },
    {
        id: 's9',
        title: 'Garden Landscaping',
        seller: 'GreenThumb SA',
        sellerHandle: '@greenthumbsa',
        sellerAvatar: 'https://images.unsplash.com/photo-1523419409543-a5e549c1faa8?w=120&h=120&fit=crop',
        rating: 4.6,
        reviewCount: 98,
        location: 'Pretoria',
        priceFrom: 500,
        currency: 'R',
        image: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&h=600&fit=crop',
        category: 'home',
        description: 'Garden design, lawn care, and hedge trimming from a local landscaping team.',
    },
    {
        id: 's10',
        title: 'Personal Training Session',
        seller: 'FitLife Coaching',
        sellerHandle: '@fitlifecoaching',
        sellerAvatar: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=120&h=120&fit=crop',
        rating: 4.8,
        reviewCount: 234,
        location: 'Sandton',
        priceFrom: 250,
        currency: 'R',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
        category: 'fitness',
        description: 'One-on-one strength and conditioning sessions tailored to your goals.',
    },
];

export function getServiceById(id: string): Service | undefined {
    return SERVICES.find((service) => service.id === id);
}

const SERVICE_SORTERS: Record<SortOption, (a: Service, b: Service) => number> = {
    relevance: () => 0,
    'price-asc': (a, b) => a.priceFrom - b.priceFrom,
    'price-desc': (a, b) => b.priceFrom - a.priceFrom,
    'rating-desc': (a, b) => b.rating - a.rating,
    'discount-desc': () => 0,
};

export function getFilteredServices({
    search,
    category,
    sort,
}: {
    search: string;
    category: string;
    sort: string;
}): Service[] {
    const query = search.trim().toLowerCase();
    const isValidCategory = category === 'all' || SERVICE_CATEGORY_PILLS.some((pill) => pill.id === category);
    const effectiveCategory = isValidCategory ? category : 'all';
    const effectiveSort: SortOption = isSortOption(sort) ? sort : 'relevance';

    const filtered = SERVICES.filter((service) => {
        const matchesCategory = effectiveCategory === 'all' || service.category === effectiveCategory;
        const matchesSearch =
            query.length === 0 ||
            service.title.toLowerCase().includes(query) ||
            service.seller.toLowerCase().includes(query);
        return matchesCategory && matchesSearch;
    });

    return [...filtered].sort(SERVICE_SORTERS[effectiveSort]);
}
