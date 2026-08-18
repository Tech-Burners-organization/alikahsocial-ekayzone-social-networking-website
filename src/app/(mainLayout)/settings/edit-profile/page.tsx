import type { Metadata } from "next";
import PageWraper from "@/components/ui/CustomUi/PageWraper";
import EditProfileForm from "./_components/EditProfileForm";
import { getSettingsProfile } from "../_lib/data";

export const metadata: Metadata = {
    title: "Edit Profile | eKayzone",
};

export default function EditProfilePage() {
    const { fullName, userName, bio, avatarUrl } = getSettingsProfile();

    return (
        <PageWraper title="Edit Profile" backToPreviousPage>
            <EditProfileForm
                fullName={fullName}
                userName={userName}
                bio={bio}
                avatarUrl={avatarUrl}
            />
        </PageWraper>
    );
}
