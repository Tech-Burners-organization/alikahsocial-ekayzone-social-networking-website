import ProductCard from "@/components/shared/marketplace/ProductCard";
import { getFilteredProducts, type SortOption } from "../_lib/data";
import MarketplaceSearchBar from "./MarketplaceSearchBar";
import CategoryPills from "./CategoryPills";
import SortDropdown from "./SortDropdown";

export default function ProductsPanel({
    search,
    category,
    sort,
}: {
    search: string;
    category: string;
    sort: SortOption;
}) {
    const products = getFilteredProducts({ search, category, sort });

    return (
        <div className="space-y-5">
            {/* ─── Search Bar ────────────────────────── */}
            <MarketplaceSearchBar defaultValue={search} />

            {/* ─── Category Pills ────────────────────── */}
            <CategoryPills active={category} />

            {/* ─── Results Count + Sort ──────────────── */}
            <div className="flex items-center justify-between">
                <p className="text-base font-semibold text-muted-foreground">
                    {products.length} Product{products.length === 1 ? '' : 's'}
                </p>
                <SortDropdown value={sort} />
            </div>

            {/* ─── Product Grid ──────────────────────── */}
            {products.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-border py-16 text-center">
                    <p className="text-sm font-medium text-foreground">No products found</p>
                    <p className="text-sm text-muted-foreground">
                        Try a different search term or category.
                    </p>
                </div>
            )}
        </div>
    );
}
