import type { Metadata } from "next";
import { AtSign, KeyRound, Link2, ShieldCheck } from "lucide-react";
import PageWraper from "@/components/ui/CustomUi/PageWraper";
import SettingsSection from "../_components/SettingsSection";
import SettingsNavRow from "../_components/SettingsNavRow";
import DeleteAccountRow from "./_components/DeleteAccountRow";

export const metadata: Metadata = {
    title: "Password & Security | eKayzone",
};

const SECURITY_ITEMS = [
    { label: "Change Password", href: "/settings/password-security/change-password", icon: KeyRound },
    { label: "Two-Factor Authentication", href: "/settings/password-security/two-factor", icon: ShieldCheck },
    { label: "Connected Accounts", href: "/settings/password-security/connected-accounts", icon: Link2 },
    { label: "Phone & Email", href: "/settings/password-security/phone-email", icon: AtSign },
];

export default function PasswordSecurityPage() {
    return (
        <PageWraper title="Password & Security" backToPreviousPage>
            <div className="flex flex-col gap-5">
                <SettingsSection>
                    {SECURITY_ITEMS.map((item) => (
                        <SettingsNavRow
                            key={item.label}
                            label={item.label}
                            icon={item.icon}
                            href={item.href}
                        />
                    ))}
                </SettingsSection>

                <SettingsSection>
                    <DeleteAccountRow />
                </SettingsSection>
            </div>
        </PageWraper>
    );
}
