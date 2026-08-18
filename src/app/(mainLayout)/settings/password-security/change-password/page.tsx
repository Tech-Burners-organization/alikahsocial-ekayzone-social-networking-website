import type { Metadata } from "next";
import PageWraper from "@/components/ui/CustomUi/PageWraper";
import ChangePasswordForm from "./_components/ChangePasswordForm";

export const metadata: Metadata = {
    title: "Change Password | eKayzone",
};

export default function ChangePasswordPage() {
    return (
        <PageWraper title="Change Password" backToPreviousPage>
            <ChangePasswordForm />
        </PageWraper>
    );
}
