import {
    Monitor,
    Shirt,
    Sparkles,
    Gem,
    Gamepad2,
    type LucideIcon,
} from 'lucide-react';

export interface Product {
    id: string;
    title: string;
    price: number;
    originalPrice?: number;
    currency: string;
    rating: number;
    reviewCount: number;
    image: string;
    seller: string;
    discount?: number;
    category: string;
}

export const CATEGORY_PILLS: { id: string; label: string; icon: LucideIcon | null }[] = [
    { id: 'all', label: 'All', icon: null },
    { id: 'electronics', label: 'Electronics', icon: Monitor },
    { id: 'fashion', label: 'Fashion', icon: Shirt },
    { id: 'beauty', label: 'Beauty', icon: Sparkles },
    { id: 'jewelry', label: 'Jewelry', icon: Gem },
    { id: 'gaming', label: 'Gaming', icon: Gamepad2 },
];

export const SORT_OPTIONS = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'rating-desc', label: 'Highest Rated' },
    { value: 'discount-desc', label: 'Biggest Discount' },
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number]['value'];

export function isSortOption(value: unknown): value is SortOption {
    return SORT_OPTIONS.some((option) => option.value === value);
}

const PRODUCTS: Product[] = [
    {
        id: '1',
        title: 'Nike Air Max 270',
        price: 1200,
        originalPrice: 1599,
        currency: 'R',
        rating: 4.8,
        reviewCount: 521,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
        seller: 'FitGear SA',
        discount: 25,
        category: 'fashion',
    },
    {
        id: '2',
        title: 'Adidas Ultraboost 22',
        price: 1450,
        originalPrice: 1899,
        currency: 'R',
        rating: 4.7,
        reviewCount: 384,
        image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop',
        seller: 'SneakerWorld',
        discount: 24,
        category: 'fashion',
    },
    {
        id: '3',
        title: 'Puma RS-X Running',
        price: 980,
        originalPrice: 1350,
        currency: 'R',
        rating: 4.5,
        reviewCount: 210,
        image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop',
        seller: 'FitGear SA',
        discount: 27,
        category: 'fashion',
    },
    {
        id: '4',
        title: 'New Balance 574 Classic',
        price: 899,
        originalPrice: 1200,
        currency: 'R',
        rating: 4.6,
        reviewCount: 156,
        image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&h=400&fit=crop',
        seller: 'UrbanKicks',
        discount: 25,
        category: 'fashion',
    },
    {
        id: '5',
        title: 'Jordan 1 Retro High',
        price: 2200,
        originalPrice: 2799,
        currency: 'R',
        rating: 4.9,
        reviewCount: 678,
        image: 'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=400&h=400&fit=crop',
        seller: 'SneakerWorld',
        discount: 21,
        category: 'fashion',
    },
    {
        id: '6',
        title: 'Nike Dunk Low Panda',
        price: 1100,
        originalPrice: 1450,
        currency: 'R',
        rating: 4.7,
        reviewCount: 892,
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
        seller: 'FitGear SA',
        discount: 24,
        category: 'fashion',
    },
    {
        id: '7',
        title: 'Reebok Classic Leather',
        price: 750,
        originalPrice: 999,
        currency: 'R',
        rating: 4.4,
        reviewCount: 301,
        image: 'https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=400&h=400&fit=crop',
        seller: 'UrbanKicks',
        discount: 25,
        category: 'fashion',
    },
    {
        id: '8',
        title: 'Converse Chuck 70 High',
        price: 680,
        originalPrice: 899,
        currency: 'R',
        rating: 4.6,
        reviewCount: 445,
        image: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=400&h=400&fit=crop',
        seller: 'FitGear SA',
        discount: 24,
        category: 'fashion',
    },
    {
        id: '9',
        title: 'Vans Old Skool',
        price: 599,
        originalPrice: 799,
        currency: 'R',
        rating: 4.5,
        reviewCount: 567,
        image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=400&fit=crop',
        seller: 'SneakerWorld',
        discount: 25,
        category: 'fashion',
    },
    {
        id: '10',
        title: 'Asics Gel-Kayano 29',
        price: 1650,
        originalPrice: 2100,
        currency: 'R',
        rating: 4.8,
        reviewCount: 234,
        image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400&h=400&fit=crop',
        seller: 'RunPro',
        discount: 21,
        category: 'fashion',
    },
    {
        id: '11',
        title: 'Nike Air Force 1 07',
        price: 1350,
        originalPrice: 1699,
        currency: 'R',
        rating: 4.9,
        reviewCount: 1024,
        image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop',
        seller: 'FitGear SA',
        discount: 20,
        category: 'fashion',
    },
    {
        id: '12',
        title: 'Yeezy Boost 350 V2',
        price: 2800,
        originalPrice: 3500,
        currency: 'R',
        rating: 4.7,
        reviewCount: 412,
        image: 'https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=400&h=400&fit=crop',
        seller: 'SneakerWorld',
        discount: 20,
        category: 'fashion',
    },
];

// Comparators keep insertion order for ties (Array#sort is stable), so
// 'relevance' returning 0 is a legitimate no-op sort, not a bug.
const SORTERS: Record<SortOption, (a: Product, b: Product) => number> = {
    relevance: () => 0,
    'price-asc': (a, b) => a.price - b.price,
    'price-desc': (a, b) => b.price - a.price,
    'rating-desc': (a, b) => b.rating - a.rating,
    'discount-desc': (a, b) => (b.discount ?? 0) - (a.discount ?? 0),
};

export function getFilteredProducts({
    search,
    category,
    sort,
}: {
    search: string;
    category: string;
    sort: SortOption;
}): Product[] {
    const query = search.trim().toLowerCase();

    const filtered = PRODUCTS.filter((product) => {
        const matchesCategory = category === 'all' || product.category === category;
        const matchesSearch =
            query.length === 0 ||
            product.title.toLowerCase().includes(query) ||
            product.seller.toLowerCase().includes(query);
        return matchesCategory && matchesSearch;
    });

    return [...filtered].sort(SORTERS[sort]);
}
