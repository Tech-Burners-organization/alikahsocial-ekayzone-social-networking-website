import type { Metadata } from "next";
import PageWraper from "@/components/ui/CustomUi/PageWraper";
import NotificationChannelPanel from "../_components/NotificationChannelPanel";
import { EMAIL_NOTIFICATIONS } from "../../_lib/data";

export const metadata: Metadata = {
    title: "Email Notifications | eKayzone",
};

export default function EmailNotificationsPage() {
    return (
        <PageWraper title="Email Notifications" backToPreviousPage>
            <NotificationChannelPanel channel={EMAIL_NOTIFICATIONS} />
        </PageWraper>
    );
}
