"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FormPassword } from "@/components/ui/CustomUi/ReuseForm/Form";
import { changePasswordSchema, type ChangePasswordFormValues } from "@/schemas/create";
import { PillLabel, pillInputClassName } from "@/components/shared/create/formStyles";
import SettingsSubmitBar from "../../../_components/SettingsSubmitBar";

const FORM_ID = "change-password-form";

export default function ChangePasswordForm() {
    const form = useForm<ChangePasswordFormValues>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    const onSubmit = form.handleSubmit(() => {
        toast.success("Password updated");
        form.reset();
    });

    return (
        <>
            <form id={FORM_ID} onSubmit={onSubmit} className="flex flex-col gap-2.5">
                <FormPassword
                    control={form.control}
                    name="currentPassword"
                    label={<PillLabel>Current Password</PillLabel>}
                    placeholder="Enter current password"
                    inputClassName={pillInputClassName}
                />
                <FormPassword
                    control={form.control}
                    name="newPassword"
                    label={<PillLabel>New Password</PillLabel>}
                    placeholder="Enter new password"
                    inputClassName={pillInputClassName}
                />
                <FormPassword
                    control={form.control}
                    name="confirmPassword"
                    label={<PillLabel>Confirm New Password</PillLabel>}
                    placeholder="Confirm new password"
                    inputClassName={pillInputClassName}
                />
            </form>

            <SettingsSubmitBar
                formId={FORM_ID}
                label="Update Password"
                isSubmitting={form.formState.isSubmitting}
            />
        </>
    );
}
