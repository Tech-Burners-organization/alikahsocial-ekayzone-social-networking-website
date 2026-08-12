import PageWraper from '@/components/ui/CustomUi/PageWraper';
import ReusableTabs from '@/components/ui/CustomUi/ReusableTabs';
import ProductsPanel from './_components/ProductsPanel';
import ServicesPanel from './_components/ServicesPanel';
import { isSortOption, type SortOption } from './_lib/data';

type MarketplaceTab = 'products' | 'services';

function firstValue(value: string | string[] | undefined): string | undefined {
    return Array.isArray(value) ? value[0] : value;
}

export default async function MarketplacePage({ searchParams }: PageProps<'/marketplace'>) {
    const params = await searchParams;

    const tab: MarketplaceTab = firstValue(params.tab) === 'services' ? 'services' : 'products';
    const search = firstValue(params.search) ?? '';
    const category = firstValue(params.category) ?? 'all';
    const rawSort = firstValue(params.sort);
    const sort: SortOption = isSortOption(rawSort) ? rawSort : 'relevance';

    return (
        <PageWraper title="Marketplace" backToPreviousPage={false}>
            <ReusableTabs<MarketplaceTab>
                activeTab={tab}
                tabName="tab"
                align="left"
                tabContentStyle="mt-5"
                tabs={[
                    {
                        label: 'Products',
                        value: 'products',
                        content: <ProductsPanel search={search} category={category} sort={sort} />,
                    },
                    {
                        label: 'Services',
                        value: 'services',
                        content: <ServicesPanel />,
                    },
                ]}
            />
        </PageWraper>
    );
}
