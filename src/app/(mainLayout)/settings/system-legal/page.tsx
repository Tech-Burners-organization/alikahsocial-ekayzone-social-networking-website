import type { Metadata } from "next";
import { FileText } from "lucide-react";
import PageWraper from "@/components/ui/CustomUi/PageWraper";
import SettingsSection from "../_components/SettingsSection";
import SettingsNavRow from "../_components/SettingsNavRow";
import { LEGAL_DOCUMENTS } from "../_lib/data";

export const metadata: Metadata = {
    title: "System & Legal | eKayzone",
};

export default function SystemLegalPage() {
    return (
        <PageWraper title="System & Legal" backToPreviousPage>
            <SettingsSection>
                {LEGAL_DOCUMENTS.map((document) => (
                    <SettingsNavRow
                        key={document.label}
                        label={document.label}
                        icon={FileText}
                        href={document.href}
                    />
                ))}
            </SettingsSection>
        </PageWraper>
    );
}
