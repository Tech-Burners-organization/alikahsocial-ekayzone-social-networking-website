import type { Metadata } from "next";
import PageWraper from "@/components/ui/CustomUi/PageWraper";
import FeedbackForm from "./_components/FeedbackForm";

export const metadata: Metadata = {
    title: "Your Feedback | eKayzone",
};

export default function FeedbackPage() {
    return (
        <PageWraper title="Your Feedback" backToPreviousPage>
            <FeedbackForm />
        </PageWraper>
    );
}
