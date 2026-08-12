"use client";

import { usePathname } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar } from "@/components/shared/Sidebar";
import Topbar from "@/components/shared/Topbar";
import { RightRail } from "@/components/shared/RightRail";

// Routes whose content owns the full remaining width (e.g. a 3-pane chat
// layout) and can't coexist with the fixed-width right rail.
const FULL_WIDTH_ROUTES = ["/chat"];

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const pathname = usePathname();
    const isFullWidth = FULL_WIDTH_ROUTES.some((route) => pathname?.startsWith(route));

    return (
        <SidebarProvider>
            <Sidebar />
            <div className="flex min-w-0 flex-1 flex-col">
                <Topbar />
                <div className="flex min-w-0 flex-1 bg-background-color">
                    <main className="min-w-0 flex-1 h-[calc(100vh-56px)] overflow-y-auto scrollbar-none relative">{children}</main>
                    {!isFullWidth && <RightRail />}
                </div>
            </div>
        </SidebarProvider>
    );
};

export default MainLayout;
