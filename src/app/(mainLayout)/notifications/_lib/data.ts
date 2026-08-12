export interface NotificationItem {
    id: string;
    actorName: string;
    actorAvatarUrl: string;
    message: string;
    createdAt: string;
    read: boolean;
}

// TODO: replace with a real notifications endpoint once it exists.
export function getNotifications(): NotificationItem[] {
    return [];
}
