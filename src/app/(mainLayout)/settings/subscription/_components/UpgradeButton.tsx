"use client";

import { toast } from "sonner";

export default function UpgradeButton() {
    return (
        <button
            type="button"
            onClick={() => toast.success("Redirecting to checkout…")}
            className="flex h-12 w-full items-center justify-center rounded-full border-2 border-black/9 bg-white text-lg font-bold text-secondary-color shadow-[inset_0_3px_3px_rgba(255,255,255,0.12)] transition-colors hover:bg-white/90"
        >
            Upgrade now
        </button>
    );
}
