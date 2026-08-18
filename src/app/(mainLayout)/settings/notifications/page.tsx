import type { Metadata } from "next";
import PageWraper from "@/components/ui/CustomUi/PageWraper";
import SettingsSection from "../_components/SettingsSection";
import SettingsNavRow from "../_components/SettingsNavRow";
import { NOTIFICATION_CHANNELS } from "../_lib/data";

export const metadata: Metadata = {
    title: "Notifications | eKayzone",
    description: "Choose how eKayzone reaches you — email and SMS.",
};

export default function NotificationsSettingsPage() {
    return (
        <PageWraper title="Notifications" backToPreviousPage>
            <SettingsSection>
                {NOTIFICATION_CHANNELS.map((channel) => (
                    <SettingsNavRow
                        key={channel.label}
                        label={channel.label}
                        icon={channel.icon}
                        href={channel.href}
                    />
                ))}
            </SettingsSection>
        </PageWraper>
    );
}
