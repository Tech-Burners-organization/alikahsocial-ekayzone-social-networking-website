"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { FormInput } from "@/components/ui/CustomUi/ReuseForm/Form";
// TODO: re-enable once the real auth API call below is uncommented.
// import { forgetPassword } from "@/service/AuthService/AuthServiceAPi";
import { forgotPasswordSchema, type ForgotPasswordFormValues } from "@/schemas/auth";
import { useAuthModal } from "@/context/AuthModalProvider";

export default function ForgotPasswordView() {
    const { setView, setForgotEmail } = useAuthModal();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { control, handleSubmit } = useForm<ForgotPasswordFormValues>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: { email: "" },
    });

    const onSubmit = async (values: ForgotPasswordFormValues) => {
        setIsSubmitting(true);
        try {
            // TODO: re-enable real auth API call once ready.
            // const result = await forgetPassword({ body: { email: values.email } });
            console.log("[ForgotPasswordView] forgot password submit", values);
            const result = { success: true, message: "" };
            if (result?.success) {
                setForgotEmail(values.email);
                toast.success("Verification code sent");
                setView("forgot-password-otp");
            } else {
                toast.error(result?.message || "Couldn't send a reset code. Please try again.");
            }
        } catch {
            toast.error("Couldn't send a reset code. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <p className="text-base font-medium text-muted-foreground">
                Enter the email associated with your account and we&apos;ll send a code to reset your password.
            </p>

            <FormInput control={control} name="email" label="Email" placeholder="Enter your email" type="email" />

            <p className="text-center text-sm font-medium text-foreground">
                Remembered your password?{" "}
                <button type="button" onClick={() => setView("login")} className="font-bold text-secondary-color">
                    Log In
                </button>
            </p>

            <button
                type="submit"
                disabled={isSubmitting}
                className="h-14 w-full rounded-full border-2 border-secondary-color bg-secondary-color text-xl font-bold text-white shadow-[inset_0_3px_3px_rgba(255,255,255,0.12)] transition-colors hover:bg-secondary-color/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {isSubmitting ? "Please wait..." : "Continue"}
            </button>
        </form>
    );
}
