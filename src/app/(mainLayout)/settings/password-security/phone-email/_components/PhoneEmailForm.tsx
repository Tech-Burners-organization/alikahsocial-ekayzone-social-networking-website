"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BadgeCheck } from "lucide-react";
import { toast } from "sonner";
import { FormInput } from "@/components/ui/CustomUi/ReuseForm/Form";
import { phoneEmailSchema, type PhoneEmailFormValues } from "@/schemas/create";
import { PillLabel, pillInputClassName } from "@/components/shared/create/formStyles";
import SettingsSubmitBar from "../../../_components/SettingsSubmitBar";

const FORM_ID = "phone-email-form";

/** Takes discrete fields rather than the profile object — only these two cross the RSC boundary. */
export default function PhoneEmailForm({ email, phone }: { email: string; phone: string }) {
    const form = useForm<PhoneEmailFormValues>({
        resolver: zodResolver(phoneEmailSchema),
        defaultValues: { email, phone },
    });

    const onSubmit = form.handleSubmit(() => {
        toast.success("Contact details updated");
    });

    return (
        <>
            <div className="flex flex-col gap-4">
                <p className="text-sm font-medium text-[#5e6062]">
                    These details are used to sign you in, recover your account and receive order
                    updates.
                </p>

                <form id={FORM_ID} onSubmit={onSubmit} className="flex flex-col gap-4">
                    <FormInput
                        control={form.control}
                        name="email"
                        label={<PillLabel>Email Address</PillLabel>}
                        placeholder="Enter your email address"
                        type="email"
                        inputClassName={pillInputClassName}
                        suffix={<BadgeCheck className="size-5 text-secondary-color" />}
                    />

                    <FormInput
                        control={form.control}
                        name="phone"
                        label={<PillLabel>Phone Number</PillLabel>}
                        placeholder="Enter your phone number"
                        type="tel"
                        inputClassName={pillInputClassName}
                        suffix={<BadgeCheck className="size-5 text-secondary-color" />}
                    />
                </form>
            </div>

            <SettingsSubmitBar
                formId={FORM_ID}
                label="Save Changes"
                isSubmitting={form.formState.isSubmitting}
            />
        </>
    );
}
