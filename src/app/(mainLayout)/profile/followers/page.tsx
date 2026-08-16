import type { Metadata } from "next";
import PageWraper from "@/components/ui/CustomUi/PageWraper";
import ConnectionSearchBar from "../_components/ConnectionSearchBar";
import ConnectionsList from "../_components/ConnectionsList";
import { getFollowers } from "../_lib/connections";

export const metadata: Metadata = {
    title: "Followers | eKayzone",
};

function firstValue(value: string | string[] | undefined): string | undefined {
    return Array.isArray(value) ? value[0] : value;
}

export default async function FollowersPage({ searchParams }: PageProps<"/profile/followers">) {
    const params = await searchParams;
    const search = firstValue(params.search) ?? "";
    const followers = getFollowers(search);

    return (
        <PageWraper title="Followers" backToPreviousPage>
            <div className="flex flex-col gap-5">
                <ConnectionSearchBar defaultValue={search} placeholder="Search followers" />
                <ConnectionsList
                    connections={followers}
                    actionLabel="Follow"
                    toggledLabel="Following"
                    emptyMessage="No followers found"
                />
            </div>
        </PageWraper>
    );
}
