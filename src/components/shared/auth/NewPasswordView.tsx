"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { FormPassword } from "@/components/ui/CustomUi/ReuseForm/Form";
import { changePassword } from "@/service/AuthService/AuthServiceAPi";
import { newPasswordSchema, type NewPasswordFormValues } from "@/schemas/auth";
import { useAuthModal } from "@/context/AuthModalProvider";

export default function NewPasswordView() {
    const { setView } = useAuthModal();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { control, handleSubmit } = useForm<NewPasswordFormValues>({
        resolver: zodResolver(newPasswordSchema),
        defaultValues: { newPassword: "", confirmPassword: "" },
    });

    const onSubmit = async (values: NewPasswordFormValues) => {
        setIsSubmitting(true);
        try {
            const result = await changePassword({ body: values });
            if (result?.success) {
                setView("password-updated");
            } else {
                toast.error(result?.message || "Couldn't update your password. Please try again.");
            }
        } catch {
            toast.error("Couldn't update your password. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <p className="text-base font-medium text-muted-foreground">
                Choose a new password for your account.
            </p>

            <div className="flex flex-col gap-2.5">
                <FormPassword control={control} name="newPassword" label="New Password" placeholder="Enter your new password" />
                <FormPassword control={control} name="confirmPassword" label="Confirm Password" placeholder="Re-enter your new password" />
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="h-14 w-full rounded-full border-2 border-secondary-color bg-secondary-color text-xl font-bold text-white shadow-[inset_0_3px_3px_rgba(255,255,255,0.12)] transition-colors hover:bg-secondary-color/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {isSubmitting ? "Updating..." : "Reset Password"}
            </button>
        </form>
    );
}
