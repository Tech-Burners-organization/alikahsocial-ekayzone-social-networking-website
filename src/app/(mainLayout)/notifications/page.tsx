import PageWraper from "@/components/ui/CustomUi/PageWraper";
import { getNotifications } from "./_lib/data";
import { NotificationsEmptyState } from "./_components/NotificationsEmptyState";

export default async function NotificationsPage() {
    const notifications = getNotifications();

    return (
        <PageWraper title="Notifications" backToPreviousPage={false}>
            {notifications.length === 0 ? <NotificationsEmptyState /> : null}
        </PageWraper>
    );
}
