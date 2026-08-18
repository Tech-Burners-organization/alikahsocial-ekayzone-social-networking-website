"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FormInput, FormTextarea, FormUpload } from "@/components/ui/CustomUi/ReuseForm/Form";
import { contactSupportSchema, type ContactSupportFormValues } from "@/schemas/create";
import {
    PillLabel,
    pillInputClassName,
    pillTextareaClassName,
} from "@/components/shared/create/formStyles";
import SettingsSubmitBar from "../../../_components/SettingsSubmitBar";

const FORM_ID = "contact-support-form";

export default function ContactSupportForm() {
    const router = useRouter();

    const form = useForm<ContactSupportFormValues>({
        resolver: zodResolver(contactSupportSchema),
        defaultValues: { subject: "", message: "", screenshot: [] },
    });

    const onSubmit = form.handleSubmit(() => {
        toast.success("Ticket submitted");
        router.push("/settings/help-centre/tickets");
    });

    return (
        <>
            <form id={FORM_ID} onSubmit={onSubmit} className="flex flex-col gap-5">
                <FormInput
                    control={form.control}
                    name="subject"
                    label={<PillLabel>Subject</PillLabel>}
                    placeholder="Enter Subject"
                    inputClassName={pillInputClassName}
                />

                <FormTextarea
                    control={form.control}
                    name="message"
                    label={<PillLabel>Message</PillLabel>}
                    placeholder="Describe your issue"
                    inputClassName={pillTextareaClassName}
                />

                <FormUpload
                    control={form.control}
                    name="screenshot"
                    label={
                        <span className="text-sm font-bold text-[#5e6062]">
                            Screenshot <span className="font-medium">(Optional)</span>
                        </span>
                    }
                    maxFiles={1}
                    accept="image/*"
                />
            </form>

            <SettingsSubmitBar
                formId={FORM_ID}
                label="Submit Ticket"
                isSubmitting={form.formState.isSubmitting}
            />
        </>
    );
}
