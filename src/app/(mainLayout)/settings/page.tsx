import type { Metadata } from "next";
import PageWraper from "@/components/ui/CustomUi/PageWraper";
import SettingsSection from "./_components/SettingsSection";
import SettingsNavRow from "./_components/SettingsNavRow";
import LogOutButton from "./_components/LogOutButton";
import { SETTINGS_SECTIONS } from "./_lib/data";

export const metadata: Metadata = {
    title: "Settings | eKayzone",
    description: "Manage your account, privacy, subscription and support preferences.",
};

export default function SettingsPage() {
    return (
        <PageWraper title="Settings" backToPreviousPage>
            <div className="flex flex-col gap-5">
                {SETTINGS_SECTIONS.map((section) => (
                    <SettingsSection key={section.title} title={section.title}>
                        {section.items.map((item) => (
                            <SettingsNavRow
                                key={item.label}
                                label={item.label}
                                icon={item.icon}
                                href={item.href}
                            />
                        ))}
                        {section.footerRow && (
                            <SettingsNavRow
                                label={section.footerRow.label}
                                icon={section.footerRow.icon}
                                isStatic
                            />
                        )}
                    </SettingsSection>
                ))}

                <div className="pt-4">
                    <LogOutButton />
                </div>
            </div>
        </PageWraper>
    );
}
