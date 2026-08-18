import UrlSearchBar from "@/components/shared/UrlSearchBar";
import ShopOrderCard from "./ShopOrderCard";
import { getShopBookings, getShopOrders } from "../_lib/data";

interface OrdersPanelProps {
    search: string;
    /** `bookings` swaps the source list and the copy; the card layout is shared. */
    mode: "orders" | "bookings";
}

export default function OrdersPanel({ search, mode }: OrdersPanelProps) {
    const entries = mode === "orders" ? getShopOrders(search) : getShopBookings(search);
    const noun = mode === "orders" ? "orders" : "bookings";

    return (
        <div className="flex flex-col gap-4">
            <UrlSearchBar defaultValue={search} placeholder={`Search ${noun}`} />

            {entries.length > 0 ? (
                <div className="flex flex-col gap-4">
                    {entries.map((entry) => (
                        <ShopOrderCard key={entry.id} order={entry} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-border py-16 text-center">
                    <p className="text-sm font-medium text-foreground">No {noun} found</p>
                    <p className="text-sm text-muted-foreground">
                        {search ? "Try a different search term." : `You have no ${noun} yet.`}
                    </p>
                </div>
            )}
        </div>
    );
}
