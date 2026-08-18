import type { Metadata } from "next";
import PageWraper from "@/components/ui/CustomUi/PageWraper";
import SettingsSection from "../_components/SettingsSection";
import SettingsNavRow from "../_components/SettingsNavRow";
import FaqAccordion from "./_components/FaqAccordion";
import { FAQ_ITEMS, HELP_CENTRE_LINKS } from "../_lib/data";

export const metadata: Metadata = {
    title: "Help Center | eKayzone",
    description: "Contact support, track your tickets and browse frequently asked questions.",
};

export default function HelpCentrePage() {
    return (
        <PageWraper title="Help Center" backToPreviousPage>
            <div className="flex flex-col gap-5">
                <SettingsSection>
                    {HELP_CENTRE_LINKS.map((link) => (
                        <SettingsNavRow
                            key={link.label}
                            label={link.label}
                            icon={link.icon}
                            href={link.href}
                            badge={link.badge}
                        />
                    ))}
                </SettingsSection>

                <section className="flex flex-col gap-4">
                    <h2 className="text-sm font-medium text-[#5e6062]">FREQUENTLY ASKED QUESTIONS</h2>
                    <FaqAccordion items={FAQ_ITEMS} />
                </section>
            </div>
        </PageWraper>
    );
}
