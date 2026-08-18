import UrlSearchBar from "@/components/shared/UrlSearchBar";
import ListingCard from "./ListingCard";
import { getShopListings } from "../_lib/data";

export default function ListingsPanel({ search }: { search: string }) {
    const listings = getShopListings(search);

    return (
        <div className="flex flex-col gap-4">
            <UrlSearchBar defaultValue={search} placeholder="Search listings" />

            {listings.length > 0 ? (
                <div className="flex flex-col gap-4">
                    {listings.map((listing) => (
                        <ListingCard key={listing.id} listing={listing} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-border py-16 text-center">
                    <p className="text-sm font-medium text-foreground">No listings found</p>
                    <p className="text-sm text-muted-foreground">
                        {search ? "Try a different search term." : "You have no listings yet."}
                    </p>
                </div>
            )}
        </div>
    );
}
