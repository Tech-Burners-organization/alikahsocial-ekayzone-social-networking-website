import type { Metadata } from "next";
import PageWraper from "@/components/ui/CustomUi/PageWraper";
import SettingsSection from "../../_components/SettingsSection";
import SettingsToggleRow from "../../_components/SettingsToggleRow";

export const metadata: Metadata = {
    title: "Two-Factor Authentication | eKayzone",
};

export default function TwoFactorPage() {
    return (
        <PageWraper title="Two-Factor Authentication" backToPreviousPage>
            <SettingsSection flush>
                <SettingsToggleRow label="Enable 2FA" description="Add an extra layer of security" />
            </SettingsSection>
        </PageWraper>
    );
}
