import type { Metadata } from "next";
import PageWraper from "@/components/ui/CustomUi/PageWraper";
import SettingsSection from "../_components/SettingsSection";
import SettingsRadioCard from "../_components/SettingsRadioCard";
import SettingsToggleRow from "../_components/SettingsToggleRow";

export const metadata: Metadata = {
    title: "Comments & Messages | eKayzone",
};

const AUDIENCE_OPTIONS = [
    { value: "everyone", label: "Everyone" },
    { value: "followers", label: "Followers Only" },
    { value: "no-one", label: "No One" },
];

export default function CommentsMessagesPage() {
    return (
        <PageWraper title="Comments & Messages" backToPreviousPage>
            <div className="flex flex-col gap-4">
                <SettingsSection title="WHO CAN COMMENT" flush>
                    <SettingsRadioCard
                        name="who-can-comment"
                        options={AUDIENCE_OPTIONS}
                        defaultValue="everyone"
                    />
                </SettingsSection>

                <SettingsSection title="WHO CAN SEND DMS" flush>
                    <SettingsRadioCard
                        name="who-can-dm"
                        options={AUDIENCE_OPTIONS}
                        defaultValue="everyone"
                    />
                </SettingsSection>

                <SettingsSection flush>
                    <SettingsToggleRow
                        label="Filter Offensive Comments"
                        description="Auto-hide offensive content"
                        defaultChecked
                    />
                </SettingsSection>
            </div>
        </PageWraper>
    );
}
