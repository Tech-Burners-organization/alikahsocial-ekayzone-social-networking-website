import type { Metadata } from "next";
import { Info } from "lucide-react";
import PageWraper from "@/components/ui/CustomUi/PageWraper";
import SettingsSection from "../_components/SettingsSection";
import SettingsRadioCard from "../_components/SettingsRadioCard";
import SettingsToggleRow from "../_components/SettingsToggleRow";
import DownloadDataRow from "./_components/DownloadDataRow";

export const metadata: Metadata = {
    title: "Account Visibility | eKayzone",
};

const VISIBILITY_OPTIONS = [
    { value: "public", label: "Public", description: "Anyone can see your profile and content" },
    { value: "private", label: "Private", description: "Only approved followers see your content" },
];

export default function AccountVisibilityPage() {
    return (
        <PageWraper title="Account Visibility" backToPreviousPage>
            <div className="flex flex-col gap-4">
                <SettingsSection title="PROFILE VISIBILITY" flush>
                    <SettingsRadioCard
                        name="profile-visibility"
                        options={VISIBILITY_OPTIONS}
                        defaultValue="public"
                    />
                </SettingsSection>

                <SettingsSection title="CONTENT VISIBILITY" flush>
                    <SettingsToggleRow label="Show Liked Videos" defaultChecked />
                    <SettingsToggleRow label="Show Active Status" defaultChecked />
                </SettingsSection>

                <SettingsSection flush className="px-0">
                    <DownloadDataRow />
                </SettingsSection>

                <p className="flex items-start gap-1.5 px-1.5 text-xs font-medium text-[#5e6062]">
                    <Info className="mt-px size-3 shrink-0" />
                    Marketplace listings are always public regardless of your visibility setting.
                </p>
            </div>
        </PageWraper>
    );
}
