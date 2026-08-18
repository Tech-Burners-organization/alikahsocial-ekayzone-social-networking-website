import { Check, LocateFixed, MessageCircle, Star, type LucideIcon } from "lucide-react";

/** The two halves of the My Orders switcher — physical goods vs. booked services. */
export type OrderKind = "products" | "services";

export function isOrderKind(value: unknown): value is OrderKind {
    return value === "products" || value === "services";
}

export type BuyerOrderStatus =
    | "dispatched"
    | "delivered"
    | "completed"
    | "cancelled"
    | "upcoming";

export interface BuyerOrder {
    id: string;
    kind: OrderKind;
    title: string;
    seller: string;
    price: number;
    currency: string;
    status: BuyerOrderStatus;
    /** Pre-formatted for display — products show a date, services a date + time. */
    placedAt: string;
    image: string;
    /** Marketplace listing this order was placed against, for the card's overflow menu. */
    listingHref: string;
}

interface StatusBadge {
    label: string;
    className: string;
}

/**
 * Buyer-side badge palette. The seller-side (My Shop) uses a different palette for
 * the same status names, so the two maps are deliberately kept apart.
 */
export const BUYER_STATUS_BADGE: Record<BuyerOrderStatus, StatusBadge> = {
    dispatched: { label: "Dispatched", className: "bg-[#e8943f]/20 text-[#e8943f]" },
    delivered: { label: "Delivered", className: "bg-[#47ee92]/20 text-[#234a34]" },
    completed: { label: "Completed", className: "bg-[#23c56c] text-white" },
    cancelled: { label: "Cancelled", className: "bg-[#d93f3f]/20 text-[#d93f3f]" },
    upcoming: { label: "Upcoming", className: "bg-[#3dabe2]/20 text-[#3dabe2]" },
};

export interface OrderAction {
    label: string;
    icon: LucideIcon;
    /** "Mark as Received" is the only action whose icon trails the label. */
    iconPosition: "leading" | "trailing";
    className: string;
    href?: string;
}

/** Contextual footer button per status. `cancelled` orders intentionally have none. */
export const BUYER_STATUS_ACTION: Partial<Record<BuyerOrderStatus, OrderAction>> = {
    dispatched: {
        label: "Track Order",
        icon: LocateFixed,
        iconPosition: "leading",
        className: "border-[#bfdbfe] bg-[#eff6ff] text-[#1d4ed8] hover:bg-[#dbeafe]",
    },
    delivered: {
        label: "Mark as Received",
        icon: Check,
        iconPosition: "trailing",
        className: "border-black/[0.06] bg-[#23c56c] text-white hover:bg-[#23c56c]/90",
    },
    completed: {
        label: "Leave a Review",
        icon: Star,
        iconPosition: "leading",
        className: "border-[#fde68a] bg-[#fffbeb] text-[#92400e] hover:bg-[#fef3c7]",
    },
    upcoming: {
        label: "View Chat",
        icon: MessageCircle,
        iconPosition: "leading",
        className: "border-[#a7f3d0] bg-[#f0fdf4] text-[#047857] hover:bg-[#dcfce7]",
        href: "/chat",
    },
};

const BUYER_ORDERS: BuyerOrder[] = [
    {
        id: "o1",
        kind: "products",
        title: "Af-1 Dior Navy White 11",
        seller: "FitGear SA",
        price: 1200,
        currency: "R",
        status: "dispatched",
        placedAt: "Mar 5 , 2026",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
        listingHref: "/marketplace/1",
    },
    {
        id: "o2",
        kind: "products",
        title: "TWS Earbuds W7",
        seller: "Tech Zone",
        price: 1200,
        currency: "R",
        status: "delivered",
        placedAt: "Mar 5 , 2026",
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop",
        listingHref: "/marketplace/13",
    },
    {
        id: "o3",
        kind: "products",
        title: "3W Clinic Intensive UV Sunblock",
        seller: "GlowUp Beauty",
        price: 1200,
        currency: "R",
        status: "completed",
        placedAt: "Mar 5 , 2026",
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
        listingHref: "/marketplace/6",
    },
    {
        id: "o4",
        kind: "products",
        title: "Mens Premium T-Shirt- Anti",
        seller: "FabriLife",
        price: 1200,
        currency: "R",
        status: "cancelled",
        placedAt: "Mar 5 , 2026",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
        listingHref: "/marketplace/8",
    },
    {
        id: "o5",
        kind: "services",
        title: "Hair Styling and Braiding",
        seller: "Aura Studio",
        price: 1200,
        currency: "R",
        status: "upcoming",
        placedAt: "Mar 5 , 2026 at 14:00",
        image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=400&h=520&fit=crop",
        listingHref: "/marketplace/service/s1",
    },
];

export function getBuyerOrders({ kind, search }: { kind: OrderKind; search: string }): BuyerOrder[] {
    const query = search.trim().toLowerCase();

    return BUYER_ORDERS.filter((order) => {
        if (order.kind !== kind) return false;
        if (query.length === 0) return true;
        return (
            order.title.toLowerCase().includes(query) ||
            order.seller.toLowerCase().includes(query)
        );
    });
}
