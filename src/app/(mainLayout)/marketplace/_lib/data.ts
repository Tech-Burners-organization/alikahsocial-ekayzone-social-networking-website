import {
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
    /** Additional gallery images for the product detail page. Defaults to `[image]`. */
    images?: string[];
    description?: string;
    specs?: string[];
    sellerHandle?: string;
    sellerAvatar?: string;
    stock?: 'in-stock' | 'out-of-stock';
}

export interface CategoryPill {
    id: string;
    label: string;
    icon: LucideIcon | null;
    iconSrc?: string;
}

export const CATEGORY_PILLS: CategoryPill[] = [
    { id: 'all', label: 'All', icon: null, iconSrc: '/images/marketplace/category-all.svg' },
    { id: 'electronics', label: 'Electronics', icon: null, iconSrc: '/images/marketplace/category-electronics.svg' },
    { id: 'fashion', label: 'Fashion', icon: null, iconSrc: '/images/marketplace/category-fashion.svg' },
    { id: 'beauty', label: 'Beauty', icon: null, iconSrc: '/images/marketplace/category-beauty.svg' },
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
        images: [
            'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&h=700&fit=crop',
            'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=1200&h=700&fit=crop',
            'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=1200&h=700&fit=crop',
        ],
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
        images: [
            'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=1200&h=700&fit=crop',
            'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=1200&h=700&fit=crop',
            'https://images.unsplash.com/photo-1539185441755-769473a23570?w=1200&h=700&fit=crop',
        ],
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
        images: [
            'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=1200&h=700&fit=crop',
            'https://images.unsplash.com/photo-1539185441755-769473a23570?w=1200&h=700&fit=crop',
            'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=1200&h=700&fit=crop',
        ],
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
        images: [
            'https://images.unsplash.com/photo-1539185441755-769473a23570?w=1200&h=700&fit=crop',
            'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=1200&h=700&fit=crop',
            'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1200&h=700&fit=crop',
        ],
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
        images: [
            'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=1200&h=700&fit=crop',
            'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1200&h=700&fit=crop',
            'https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=1200&h=700&fit=crop',
        ],
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
        images: [
            'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1200&h=700&fit=crop',
            'https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=1200&h=700&fit=crop',
            'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=1200&h=700&fit=crop',
        ],
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
        images: [
            'https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=1200&h=700&fit=crop',
            'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=1200&h=700&fit=crop',
            'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=1200&h=700&fit=crop',
        ],
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
        images: [
            'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=1200&h=700&fit=crop',
            'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=1200&h=700&fit=crop',
            'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=1200&h=700&fit=crop',
        ],
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
        images: [
            'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=1200&h=700&fit=crop',
            'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=1200&h=700&fit=crop',
            'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1200&h=700&fit=crop',
        ],
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
        images: [
            'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=1200&h=700&fit=crop',
            'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1200&h=700&fit=crop',
            'https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=1200&h=700&fit=crop',
        ],
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
        images: [
            'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1200&h=700&fit=crop',
            'https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=1200&h=700&fit=crop',
            'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&h=700&fit=crop',
        ],
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
        images: [
            'https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=1200&h=700&fit=crop',
            'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&h=700&fit=crop',
            'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=1200&h=700&fit=crop',
        ],
        seller: 'SneakerWorld',
        discount: 20,
        category: 'fashion',
    },
    {
        id: '13',
        title: 'MSI Laptop',
        price: 1200,
        originalPrice: 1600,
        currency: 'R',
        rating: 4.8,
        reviewCount: 521,
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1200&h=700&fit=crop',
            'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&h=700&fit=crop',
            'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=1200&h=700&fit=crop',
            'https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?w=1200&h=700&fit=crop',
        ],
        seller: 'TechZone SA',
        sellerHandle: '@techzonesa',
        sellerAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&h=120&fit=crop',
        discount: 25,
        category: 'electronics',
        stock: 'in-stock',
        description:
            'Powerful and reliable, the MSI Gaming Laptop is designed for gaming, productivity, and creative work. It features a high-performance Intel Core processor, NVIDIA graphics, and a smooth Full HD display that delivers fast and responsive performance. With high-speed SSD storage, upgradeable RAM, and advanced cooling technology, this laptop ensures efficient multitasking and stable performance during demanding tasks.',
        specs: [
            'Brand: MSI',
            'Processor: Intel Core i5 / i7',
            'Graphics: NVIDIA GeForce GTX / RTX',
            'Display: 15.6" Full HD (1920×1080)',
            'RAM: 8GB / 16GB DDR4',
            'Storage: 512GB / 1TB SSD',
            'Operating System: Windows 11',
            'Connectivity: WiFi, Bluetooth, HDMI, USB Type-C',
        ],
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

export function getProductById(id: string): Product | undefined {
    return PRODUCTS.find((product) => product.id === id);
}

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
