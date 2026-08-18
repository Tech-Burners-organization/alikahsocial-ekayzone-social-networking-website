export const SHOP_TABS = [
    { label: "Overview", value: "overview" },
    { label: "Orders", value: "orders" },
    { label: "Bookings", value: "bookings" },
    { label: "Listings", value: "listings" },
    { label: "Ratings", value: "ratings" },
] as const;

export type ShopTab = (typeof SHOP_TABS)[number]["value"];

export function isShopTab(value: unknown): value is ShopTab {
    return SHOP_TABS.some((tab) => tab.value === value);
}

/* ─── Overview ─────────────────────────────────────────────── */

export interface ShopStat {
    label: string;
    value: string;
    /** Path to the icon exported from the Figma design system. */
    iconSrc: string;
}

export interface SummaryRow {
    label: string;
    value: string;
}

export function getShopStats(): ShopStat[] {
    return [
        { label: "Revenue", value: "R12,450", iconSrc: "/images/shop/stat-revenue.svg" },
        { label: "Total Orders", value: "34", iconSrc: "/images/shop/stat-orders.svg" },
        { label: "Pending Orders", value: "3", iconSrc: "/images/shop/stat-pending.svg" },
        { label: "Average Rating", value: "4.8", iconSrc: "/images/shop/stat-rating.svg" },
    ];
}

export function getQuickStats(): SummaryRow[] {
    return [
        { label: "Listing Views", value: "2,340" },
        { label: "Inquiry Rate", value: "8.2%" },
        { label: "Conversion Rate", value: "3.1%" },
    ];
}

export function getEarningsSummary(): SummaryRow[] {
    return [
        { label: "Total Revenue this month", value: "R12,450" },
        { label: "Total Orders Completed", value: "28" },
    ];
}

export const EARNINGS_NOTE =
    "Payments are processed directly via PayFast or PayPal. No manual withdrawal needed.";

/* ─── Orders & bookings ────────────────────────────────────── */

export type ShopOrderStatus = "pending" | "dispatched" | "delivered" | "cancelled";

/** Seller-side badge palette — deliberately distinct from the buyer palette in My Orders. */
export const SHOP_STATUS_BADGE: Record<ShopOrderStatus, { label: string; className: string }> = {
    pending: { label: "Pending", className: "bg-[#e8943f]/20 text-[#e8943f]" },
    dispatched: { label: "Dispatched", className: "bg-[#3dabe2]/20 text-[#1d4ed8]" },
    delivered: { label: "Delivered", className: "bg-[#0a2c07] text-white" },
    cancelled: { label: "Cancelled", className: "bg-[#d93f3f] text-white" },
};

export interface ShopOrder {
    id: string;
    title: string;
    buyer: string;
    quantity: number;
    price: number;
    currency: string;
    status: ShopOrderStatus;
    placedAt: string;
    image: string;
}

const SHOP_ORDERS: ShopOrder[] = [
    {
        id: "10001",
        title: "Af-1 Dior Navy White 11",
        buyer: "Lerato M",
        quantity: 1,
        price: 1200,
        currency: "R",
        status: "pending",
        placedAt: "Mar 5 , 2026",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    },
    {
        id: "10002",
        title: "Af-1 Dior Navy White 11",
        buyer: "Lerato M",
        quantity: 1,
        price: 1200,
        currency: "R",
        status: "dispatched",
        placedAt: "Mar 5 , 2026",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    },
    {
        id: "10003",
        title: "Af-1 Dior Navy White 11",
        buyer: "Lerato M",
        quantity: 1,
        price: 1200,
        currency: "R",
        status: "delivered",
        placedAt: "Mar 5 , 2026",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    },
    {
        id: "10004",
        title: "Af-1 Dior Navy White 11",
        buyer: "Lerato M",
        quantity: 1,
        price: 1200,
        currency: "R",
        status: "cancelled",
        placedAt: "Mar 5 , 2026",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    },
];

/** Service bookings share the order card shape, with a time appended to the date. */
const SHOP_BOOKINGS: ShopOrder[] = [
    {
        id: "20001",
        title: "Hair Styling and Braiding",
        buyer: "Naledi K",
        quantity: 1,
        price: 1200,
        currency: "R",
        status: "pending",
        placedAt: "Mar 5 , 2026 at 14:00",
        image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=400&h=520&fit=crop",
    },
    {
        id: "20002",
        title: "Deep Home Cleaning",
        buyer: "Sipho D",
        quantity: 1,
        price: 1200,
        currency: "R",
        status: "dispatched",
        placedAt: "Mar 6 , 2026 at 09:30",
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=520&fit=crop",
    },
    {
        id: "20003",
        title: "Nail Art & Manicure",
        buyer: "Thandi Z",
        quantity: 1,
        price: 1200,
        currency: "R",
        status: "delivered",
        placedAt: "Mar 2 , 2026 at 11:00",
        image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=520&fit=crop",
    },
];

function matchesOrder(order: ShopOrder, query: string): boolean {
    if (query.length === 0) return true;
    return (
        order.title.toLowerCase().includes(query) ||
        order.buyer.toLowerCase().includes(query) ||
        order.id.includes(query)
    );
}

export function getShopOrders(search: string): ShopOrder[] {
    const query = search.trim().toLowerCase();
    return SHOP_ORDERS.filter((order) => matchesOrder(order, query));
}

export function getShopBookings(search: string): ShopOrder[] {
    const query = search.trim().toLowerCase();
    return SHOP_BOOKINGS.filter((booking) => matchesOrder(booking, query));
}

/* ─── Order detail ─────────────────────────────────────────── */

export interface ShopOrderDetail extends ShopOrder {
    buyerFullName: string;
    phone: string;
    memberSince: string;
    paymentMethod: string;
    note: string;
    address: {
        street: string;
        city: string;
        province: string;
        postalCode: string;
    };
}

export function getShopOrderById(id: string): ShopOrderDetail | undefined {
    const order = [...SHOP_ORDERS, ...SHOP_BOOKINGS].find((entry) => entry.id === id);
    if (!order) return undefined;

    return {
        ...order,
        buyerFullName: "Lerato Mokoena",
        phone: "+27 82 345 6789",
        memberSince: "Jan 2026",
        paymentMethod: "Cash on Delivery",
        note: "Leave in in front of the door if i don't reply",
        address: {
            street: "14 Khumalo Street",
            city: "Soweto",
            province: "Gauteng",
            postalCode: "1804",
        },
    };
}

/* ─── Listings ─────────────────────────────────────────────── */

export interface ShopListing {
    id: string;
    title: string;
    price: number;
    discountPrice?: number;
    currency: string;
    rating: number;
    reviewCount: number;
    views: number;
    /** Days until the listing expires. Omitted when the listing does not expire. */
    daysLeft?: number;
    image: string;
    description: string;
    category: string;
    stockQuantity: number;
}

const LISTING_DESCRIPTION =
    "Step into refined street luxury with the Af-1 Dior Navy White — a bold fusion of classic sneaker culture and high-end fashion inspired by Dior aesthetics.\nCrafted for those who appreciate both style and comfort, this pair redefines everyday wear with a premium look and versatile colorway.";

const SHOP_LISTINGS: ShopListing[] = [
    {
        id: "l1",
        title: "Af-1 Dior Navy White 11",
        price: 1200,
        currency: "R",
        rating: 4.8,
        reviewCount: 521,
        views: 1240,
        daysLeft: 42,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
        description: LISTING_DESCRIPTION,
        category: "sports",
        stockQuantity: 122,
    },
    {
        id: "l2",
        title: "Af-1 Dior Navy White 11",
        price: 1200,
        discountPrice: 900,
        currency: "R",
        rating: 4.8,
        reviewCount: 521,
        views: 1240,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
        description: LISTING_DESCRIPTION,
        category: "fashion",
        stockQuantity: 48,
    },
];

export function getShopListings(search: string): ShopListing[] {
    const query = search.trim().toLowerCase();
    if (query.length === 0) return SHOP_LISTINGS;
    return SHOP_LISTINGS.filter((listing) => listing.title.toLowerCase().includes(query));
}

export function getShopListingById(id: string): ShopListing | undefined {
    return SHOP_LISTINGS.find((listing) => listing.id === id);
}

/* ─── Ratings ──────────────────────────────────────────────── */

export const REVIEW_FILTERS = [
    { label: "All", value: "all" },
    { label: "Products", value: "products" },
    { label: "Services", value: "services" },
] as const;

export type ReviewFilter = (typeof REVIEW_FILTERS)[number]["value"];

export function isReviewFilter(value: unknown): value is ReviewFilter {
    return REVIEW_FILTERS.some((filter) => filter.value === value);
}

export const REVIEW_SORT_OPTIONS = [
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
    { value: "highest", label: "Highest Rated" },
    { value: "lowest", label: "Lowest Rated" },
] as const;

export type ReviewSort = (typeof REVIEW_SORT_OPTIONS)[number]["value"];

export function isReviewSort(value: unknown): value is ReviewSort {
    return REVIEW_SORT_OPTIONS.some((option) => option.value === value);
}

export interface ShopReview {
    id: string;
    author: string;
    avatar: string;
    date: string;
    /** Sortable form of `date`, kept separate so the display string stays as designed. */
    timestamp: number;
    rating: number;
    listingTitle: string;
    listingType: "products" | "services";
    comment: string;
}

const AVATAR = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop";

const REVIEWS: ShopReview[] = [
    {
        id: "r1",
        author: "Alex Smith",
        avatar: AVATAR,
        date: "June 24, 2025",
        timestamp: Date.UTC(2025, 5, 24),
        rating: 5,
        listingTitle: "Wireless Earbuds Pro",
        listingType: "products",
        comment: "Absolutely love the earbuds! Sound quality is incredible and they fit perfectly.",
    },
    {
        id: "r2",
        author: "Alex Smith",
        avatar: AVATAR,
        date: "June 24, 2025",
        timestamp: Date.UTC(2025, 5, 23),
        rating: 5,
        listingTitle: "Deep Home Cleaning",
        listingType: "services",
        comment: "Best deep clean I've ever had. My house looks brand new. Will definitely book again!",
    },
    {
        id: "r3",
        author: "Alex Smith",
        avatar: AVATAR,
        date: "June 24, 2025",
        timestamp: Date.UTC(2025, 5, 22),
        rating: 5,
        listingTitle: "Wireless Earbuds Pro",
        listingType: "products",
        comment: "Absolutely love the earbuds! Sound quality is incredible and they fit perfectly.",
    },
    {
        id: "r4",
        author: "Alex Smith",
        avatar: AVATAR,
        date: "June 24, 2025",
        timestamp: Date.UTC(2025, 5, 21),
        rating: 4,
        listingTitle: "Deep Home Cleaning",
        listingType: "services",
        comment: "Absolutely love the earbuds! Sound quality is incredible and they fit perfectly.",
    },
    {
        id: "r5",
        author: "Alex Smith",
        avatar: AVATAR,
        date: "June 24, 2025",
        timestamp: Date.UTC(2025, 5, 20),
        rating: 4,
        listingTitle: "Deep Home Cleaning",
        listingType: "services",
        comment: "Absolutely love the earbuds! Sound quality is incredible and they fit perfectly.",
    },
    {
        id: "r6",
        author: "Alex Smith",
        avatar: AVATAR,
        date: "June 24, 2025",
        timestamp: Date.UTC(2025, 5, 19),
        rating: 5,
        listingTitle: "Wireless Earbuds Pro",
        listingType: "products",
        comment: "Absolutely love the earbuds! Sound quality is incredible and they fit perfectly.",
    },
    {
        id: "r7",
        author: "Alex Smith",
        avatar: AVATAR,
        date: "June 24, 2025",
        timestamp: Date.UTC(2025, 5, 18),
        rating: 3,
        listingTitle: "Wireless Earbuds Pro",
        listingType: "products",
        comment: "Absolutely love the earbuds! Sound quality is incredible and they fit perfectly.",
    },
];

export interface RatingSummary {
    average: number;
    total: number;
    /** Review counts keyed by star rating, as shown in the breakdown bars. */
    breakdown: Record<1 | 2 | 3 | 4 | 5, number>;
}

export function getRatingSummary(): RatingSummary {
    return {
        average: 4.8,
        total: 521,
        breakdown: { 5: 35, 4: 12, 3: 8, 2: 2, 1: 1 },
    };
}

const REVIEW_SORTERS: Record<ReviewSort, (a: ShopReview, b: ShopReview) => number> = {
    newest: (a, b) => b.timestamp - a.timestamp,
    oldest: (a, b) => a.timestamp - b.timestamp,
    highest: (a, b) => b.rating - a.rating,
    lowest: (a, b) => a.rating - b.rating,
};

export function getShopReviews({
    filter,
    search,
    sort,
}: {
    filter: ReviewFilter;
    search: string;
    sort: ReviewSort;
}): ShopReview[] {
    const query = search.trim().toLowerCase();

    const filtered = REVIEWS.filter((review) => {
        const matchesFilter = filter === "all" || review.listingType === filter;
        const matchesSearch =
            query.length === 0 ||
            review.author.toLowerCase().includes(query) ||
            review.listingTitle.toLowerCase().includes(query) ||
            review.comment.toLowerCase().includes(query);
        return matchesFilter && matchesSearch;
    });

    return [...filtered].sort(REVIEW_SORTERS[sort]);
}
