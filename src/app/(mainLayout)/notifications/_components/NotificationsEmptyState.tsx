import { BellOff } from "lucide-react";

export function NotificationsEmptyState() {
    return (
        <div className="flex flex-col items-center justify-center gap-5 py-24 text-center">
            <div className="flex size-[134px] items-center justify-center rounded-full bg-emerald-50">
                <BellOff className="size-14 text-secondary-color" />
            </div>
            <div className="flex flex-col gap-1">
                <p className="text-2xl font-bold text-foreground">There&rsquo;s no notifications</p>
                <p className="text-lg text-slate-600">Your notifications will be appear on this page.</p>
            </div>
        </div>
    );
}
