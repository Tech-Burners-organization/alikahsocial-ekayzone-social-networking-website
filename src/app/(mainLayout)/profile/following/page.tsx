import type { Metadata } from "next";
import PageWraper from "@/components/ui/CustomUi/PageWraper";
import ConnectionSearchBar from "../_components/ConnectionSearchBar";
import ConnectionsList from "../_components/ConnectionsList";
import { getFollowing } from "../_lib/connections";

export const metadata: Metadata = {
    title: "Following | eKayzone",
};

function firstValue(value: string | string[] | undefined): string | undefined {
    return Array.isArray(value) ? value[0] : value;
}

export default async function FollowingPage({ searchParams }: PageProps<"/profile/following">) {
    const params = await searchParams;
    const search = firstValue(params.search) ?? "";
    const following = getFollowing(search);

    return (
        <PageWraper title="Following" backToPreviousPage>
            <div className="flex flex-col gap-5">
                <ConnectionSearchBar defaultValue={search} placeholder="Search following" />
                <ConnectionsList
                    connections={following}
                    actionLabel="Unfollow"
                    toggledLabel="Follow"
                    emptyMessage="Not following anyone yet"
                />
            </div>
        </PageWraper>
    );
}
