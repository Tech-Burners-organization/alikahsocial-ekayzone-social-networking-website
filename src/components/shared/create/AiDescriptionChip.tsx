"use client";

import { Sparkles } from "lucide-react";
import { toast } from "sonner";

export function AiDescriptionChip() {
    return (
        <button
            type="button"
            onClick={() => toast.info("Upgrade to PRO to write descriptions with AI")}
            className="flex w-fit items-center gap-1 rounded-md bg-[#156de1]/10 px-1.5 py-1 shadow-[0_0_0_3px_rgba(21,109,225,0.12)] transition-colors hover:bg-[#156de1]/15"
        >
            <Sparkles className="size-4 text-[#156de1]" />
            <span className="text-xs font-bold text-[#156de1]">Write description with AI</span>
            <span className="flex items-center justify-center rounded-full bg-amber-500 px-1.5 py-0.5 text-[8px] font-bold text-white">
                Pro
            </span>
        </button>
    );
}
