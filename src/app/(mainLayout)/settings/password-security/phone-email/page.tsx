import type { Metadata } from "next";
import PageWraper from "@/components/ui/CustomUi/PageWraper";
import PhoneEmailForm from "./_components/PhoneEmailForm";
import { getSettingsProfile } from "../../_lib/data";

export const metadata: Metadata = {
    title: "Phone & Email | eKayzone",
};

export default function PhoneEmailPage() {
    const { email, phone } = getSettingsProfile();

    return (
        <PageWraper title="Phone & Email" backToPreviousPage>
            <PhoneEmailForm email={email} phone={phone} />
        </PageWraper>
    );
}
