import type { Metadata } from "next";
import PageWraper from "@/components/ui/CustomUi/PageWraper";
import ReusableTabs from "@/components/ui/CustomUi/ReusableTabs";
import ProfileHeader from "./_components/ProfileHeader";
import ProfileInfo from "./_components/ProfileInfo";
import ProfileActionButtons from "./_components/ProfileActionButtons";
import ProfileVideoGrid from "./_components/ProfileVideoGrid";
import { getMyProfile, getMyVideosByTab, isProfileTab, type ProfileTab } from "./_lib/data";

export const metadata: Metadata = {
    title: "Profile | eKayzone",
};

function firstValue(value: string | string[] | undefined): string | undefined {
    return Array.isArray(value) ? value[0] : value;
}

export default async function MyProfilePage({ searchParams }: PageProps<"/profile">) {
    const params = await searchParams;
    const rawTab = firstValue(params.tab);
    const tab: ProfileTab = isProfileTab(rawTab) ? rawTab : "videos";

    const profile = getMyProfile();

    return (
        <PageWraper title="Profile" backToPreviousPage={false}>
            <ProfileHeader profile={profile} />
            <ProfileInfo profile={profile} />

            <div className="mt-5">
                <ProfileActionButtons />
            </div>

            <ReusableTabs<ProfileTab>
                activeTab={tab}
                tabName="tab"
                align="left"
                variant="bordered"
                tabContentStyle="mt-5"
                tabs={[
                    { label: "Videos", value: "videos", content: <ProfileVideoGrid videos={getMyVideosByTab("videos")} /> },
                    { label: "Liked", value: "liked", content: <ProfileVideoGrid videos={getMyVideosByTab("liked")} /> },
                    { label: "Saved", value: "saved", content: <ProfileVideoGrid videos={getMyVideosByTab("saved")} /> },
                ]}
            />
        </PageWraper>
    );
}
