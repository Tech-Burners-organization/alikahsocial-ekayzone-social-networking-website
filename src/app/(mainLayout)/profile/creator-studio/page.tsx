import type { Metadata } from "next";
import PageWraper from "@/components/ui/CustomUi/PageWraper";
import ReusableTabs from "@/components/ui/CustomUi/ReusableTabs";
import OverviewPanel from "./_components/OverviewPanel";
import ContentPanel from "./_components/ContentPanel";
import AudiencePanel from "./_components/AudiencePanel";
import LivePanel from "./_components/LivePanel";
import CampaignPanel from "./_components/CampaignPanel";
import { CREATOR_STUDIO_TABS, isCreatorStudioTab, isVideoSort, type CreatorStudioTab } from "./_lib/data";

export const metadata: Metadata = {
    title: "Creator Studio | eKayzone",
    description: "Track your video performance, audience, live streams, and campaigns.",
};

function firstValue(value: string | string[] | undefined): string | undefined {
    return Array.isArray(value) ? value[0] : value;
}

export default async function CreatorStudioPage({ searchParams }: PageProps<"/profile/creator-studio">) {
    const params = await searchParams;

    const rawTab = firstValue(params.tab);
    const tab: CreatorStudioTab = isCreatorStudioTab(rawTab) ? rawTab : "overview";

    const rawSort = firstValue(params.sort);
    const sort = isVideoSort(rawSort) ? rawSort : "views";

    return (
        <PageWraper title="Creator Studio" backToPreviousPage>
            <ReusableTabs<CreatorStudioTab>
                activeTab={tab}
                tabName="tab"
                align="center"
                tabContentStyle="mt-6"
                tabs={CREATOR_STUDIO_TABS.map((studioTab) => ({
                    label: studioTab.label,
                    value: studioTab.value,
                    content:
                        studioTab.value === "overview" ? (
                            <OverviewPanel />
                        ) : studioTab.value === "content" ? (
                            <ContentPanel sort={sort} />
                        ) : studioTab.value === "audience" ? (
                            <AudiencePanel />
                        ) : studioTab.value === "live" ? (
                            <LivePanel />
                        ) : (
                            <CampaignPanel />
                        ),
                }))}
            />
        </PageWraper>
    );
}
