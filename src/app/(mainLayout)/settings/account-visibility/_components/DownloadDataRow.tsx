"use client";

import { Download } from "lucide-react";
import { toast } from "sonner";

export default function DownloadDataRow() {
    return (
        <button
            type="button"
            onClick={() => toast.success("We'll email you a link to download your data")}
            className="flex w-full items-center gap-1.5 px-1.5 py-3 text-left text-[#313233] transition-colors hover:text-secondary-color"
        >
            <Download className="size-5 shrink-0" />
            <span className="text-base font-semibold leading-6">Download My Data</span>
        </button>
    );
}
