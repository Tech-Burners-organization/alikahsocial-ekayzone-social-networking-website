import { Store } from "lucide-react";

export default function ServicesPanel() {
    return (
        <div className="flex flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-border py-20 text-center">
            <Store className="size-8 text-muted-foreground mb-1" />
            <p className="text-sm font-medium text-foreground">Services are coming soon</p>
            <p className="text-sm text-muted-foreground">
                Check back later to browse services from sellers.
            </p>
        </div>
    );
}
