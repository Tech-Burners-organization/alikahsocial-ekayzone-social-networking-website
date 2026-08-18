import type { Metadata } from "next";
import PageWraper from "@/components/ui/CustomUi/PageWraper";
import ContactSupportForm from "./_components/ContactSupportForm";

export const metadata: Metadata = {
    title: "Contact Support | eKayzone",
};

export default function ContactSupportPage() {
    return (
        <PageWraper title="Contact Support" backToPreviousPage>
            <ContactSupportForm />
        </PageWraper>
    );
}
