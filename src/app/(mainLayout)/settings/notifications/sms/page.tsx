import type { Metadata } from "next";
import PageWraper from "@/components/ui/CustomUi/PageWraper";
import NotificationChannelPanel from "../_components/NotificationChannelPanel";
import { SMS_NOTIFICATIONS } from "../../_lib/data";

export const metadata: Metadata = {
    title: "SMS Notifications | eKayzone",
};

export default function SmsNotificationsPage() {
    return (
        <PageWraper title="SMS Notifications" backToPreviousPage>
            <NotificationChannelPanel channel={SMS_NOTIFICATIONS} />
        </PageWraper>
    );
}
