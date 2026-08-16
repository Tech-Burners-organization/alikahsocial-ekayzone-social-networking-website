import { getFilteredServices, SERVICE_SORT_OPTIONS } from "../_lib/services";
import type { SortOption } from "../_lib/data";
import MarketplaceSearchBar from "./MarketplaceSearchBar";
import CategoryPills from "./CategoryPills";
import SortDropdown from "./SortDropdown";
import ServiceListItem from "./ServiceListItem";

export default function ServicesPanel({
    search,
    category,
    sort,
}: {
    search: string;
    category: string;
    sort: SortOption;
}) {
    const services = getFilteredServices({ search, category, sort });

    return (
        <div className="space-y-5">
            <MarketplaceSearchBar defaultValue={search} placeholder="Search services" />

            <CategoryPills active={category} variant="services" />

            <div className="flex items-center justify-between">
                <p className="text-base font-semibold text-muted-foreground">
                    {services.length} Service{services.length === 1 ? '' : 's'}
                </p>
                <SortDropdown value={sort} options={SERVICE_SORT_OPTIONS} />
            </div>

            {services.length > 0 ? (
                <div className="flex flex-col gap-3">
                    {services.map((service) => (
                        <ServiceListItem key={service.id} service={service} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-border py-16 text-center">
                    <p className="text-sm font-medium text-foreground">No services found</p>
                    <p className="text-sm text-muted-foreground">
                        Try a different search term or category.
                    </p>
                </div>
            )}
        </div>
    );
}
