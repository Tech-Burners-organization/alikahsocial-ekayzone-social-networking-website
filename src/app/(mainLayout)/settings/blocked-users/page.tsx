import type { Metadata } from "next";
import Image from "next/image";
import PageWraper from "@/components/ui/CustomUi/PageWraper";
import UrlSearchBar from "@/components/shared/UrlSearchBar";
import TagButton from "../_components/TagButton";
import { getBlockedUsers } from "../_lib/data";

export const metadata: Metadata = {
    title: "Blocked Users | eKayzone",
};

function firstValue(value: string | string[] | undefined): string | undefined {
    return Array.isArray(value) ? value[0] : value;
}

export default async function BlockedUsersPage({
    searchParams,
}: PageProps<"/settings/blocked-users">) {
    const params = await searchParams;
    const search = firstValue(params.search) ?? "";
    const users = getBlockedUsers(search);

    return (
        <PageWraper title="Blocked Users" backToPreviousPage>
            <div className="flex flex-col gap-5">
                <UrlSearchBar defaultValue={search} placeholder="Search blocked users" />

                {users.length > 0 ? (
                    <div className="flex flex-col gap-2.5">
                        {users.map((user) => (
                            <div
                                key={user.id}
                                className="flex min-h-[71px] items-center justify-between gap-4 rounded-2xl border border-[#e5e8ea] bg-white px-2.5 py-1.5 shadow-[0_1px_0.5px_rgba(0,0,0,0.03)]"
                            >
                                <div className="flex items-center gap-1">
                                    <div className="relative size-[45px] shrink-0 overflow-hidden rounded-full bg-muted">
                                        <Image
                                            src={user.avatar}
                                            alt={user.name}
                                            fill
                                            sizes="45px"
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-lg font-bold leading-7 text-[#1b1c1c]">
                                            {user.name}
                                        </p>
                                        <p className="text-sm font-medium text-[#5e6062]">{user.handle}</p>
                                    </div>
                                </div>

                                <TagButton label="Unblock" toastMessage={`${user.name} unblocked`} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-border py-16 text-center">
                        <p className="text-sm font-medium text-foreground">No blocked users found</p>
                        <p className="text-sm text-muted-foreground">
                            {search ? "Try a different search term." : "You have not blocked anyone."}
                        </p>
                    </div>
                )}
            </div>
        </PageWraper>
    );
}
