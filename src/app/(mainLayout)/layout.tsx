import { AppSidebar } from "@/components/shared/app-sidebar";
import Topbar from "@/components/shared/Topbar";
import { SidebarProvider } from "@/components/ui/sidebar";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div>
            <SidebarProvider>
                <AppSidebar />
                <main className="w-full min-w-0 relative">
                    <div className="p-4 flex items-center justify-between gap-4 border-b w-full bg-background z-10 sticky! top-0">
                        <Topbar />
                    </div>
                    <div className="">
                        <div className="bg-secondary-color w-full">
                            <div>{children}</div>
                        </div>
                    </div>
                </main>
            </SidebarProvider>

        </div>
    );
};

export default MainLayout;
