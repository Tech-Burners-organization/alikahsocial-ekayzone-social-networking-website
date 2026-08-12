"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Clock } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { registerUserOtp, resendOtp } from "@/service/AuthService/AuthServiceAPi";
import { otpSchema, type OtpFormValues } from "@/schemas/auth";
import { useAuthModal } from "@/context/AuthModalProvider";

const RESEND_SECONDS = 45;

export default function SignupOtpView() {
    const { setView, pendingSignup } = useAuthModal();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);

    const { control, handleSubmit, formState } = useForm<OtpFormValues>({
        resolver: zodResolver(otpSchema),
        defaultValues: { code: "" },
    });

    useEffect(() => {
        if (secondsLeft <= 0) return;
        const timer = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
        return () => clearInterval(timer);
    }, [secondsLeft]);

    const onSubmit = async (values: OtpFormValues) => {
        setIsSubmitting(true);
        try {
            const result = await registerUserOtp({ body: { otp: values.code } });
            if (result?.success) {
                toast.success("Account created! Please log in.");
                setView("login");
            } else {
                toast.error(result?.message || "That code didn't work. Please try again.");
            }
        } catch {
            toast.error("That code didn't work. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleResend = async () => {
        if (secondsLeft > 0) return;
        try {
            const result = await resendOtp({ body: { purpose: "create" } });
            if (result?.success) {
                toast.success("A new code has been sent");
            } else {
                toast.error(result?.message || "Couldn't resend the code. Please try again.");
            }
        } catch {
            toast.error("Couldn't resend the code. Please try again.");
        } finally {
            setSecondsLeft(RESEND_SECONDS);
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <p className="text-base font-medium text-muted-foreground">
                Enter the code we have sent to {pendingSignup?.value || "your email"}
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <Controller
                    control={control}
                    name="code"
                    render={({ field }) => (
                        <InputOTP maxLength={6} value={field.value} onChange={field.onChange}>
                            <InputOTPGroup className="w-full justify-between gap-2">
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <InputOTPSlot
                                        key={index}
                                        index={index}
                                        className="h-16 w-14 rounded-lg! border! border-black/[0.06]! text-2xl! font-bold data-[active=true]:border-secondary-color!"
                                    />
                                ))}
                            </InputOTPGroup>
                        </InputOTP>
                    )}
                />
                {formState.errors.code && (
                    <p className="text-sm font-medium text-destructive">{formState.errors.code.message}</p>
                )}

                <div className="flex items-center justify-between">
                    <p className="text-base font-medium text-muted-foreground">
                        Didn&apos;t get the code?{" "}
                        <button
                            type="button"
                            onClick={handleResend}
                            disabled={secondsLeft > 0}
                            className="font-bold text-secondary-color disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Resend it
                        </button>
                    </p>
                    <div className="flex items-center gap-1 text-sm font-semibold text-muted-foreground">
                        <Clock className="size-4" />
                        {secondsLeft}s
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-14 w-full rounded-full border-2 border-secondary-color bg-secondary-color text-xl font-bold text-white shadow-[inset_0_3px_3px_rgba(255,255,255,0.12)] transition-colors hover:bg-secondary-color/90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isSubmitting ? "Verifying..." : "Verify Code"}
                </button>
            </form>
        </div>
    );
}
