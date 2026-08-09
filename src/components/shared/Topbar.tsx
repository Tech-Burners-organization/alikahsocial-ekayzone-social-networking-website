"use client";

import { Smartphone } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

const Topbar = () => {
    return (
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b border-slate-100 bg-white px-4">
            <SidebarTrigger />

            <div className="ml-auto flex items-center gap-1 rounded-full bg-background-color py-1.5 pr-1.5 pl-4">
                <button
                    type="button"
                    className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold text-base-color transition-colors"
                >
                    <Smartphone className="size-4" />
                    Get App
                </button>
                <span className="h-4 w-px bg-white/15" />
                <button
                    type="button"
                    className="rounded-full bg-secondary-color px-5 py-1.5 text-sm font-semibold text-white transition-colors"
                >
                    Log in
                </button>
            </div>
        </header>
    );
};

export default Topbar;
