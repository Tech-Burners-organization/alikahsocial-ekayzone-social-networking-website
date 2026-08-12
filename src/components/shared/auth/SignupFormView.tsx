"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Mail, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { FormInput } from "@/components/ui/CustomUi/ReuseForm/Form";
// TODO: re-enable once the real auth API call below is uncommented.
// import { registerUser } from "@/service/AuthService/AuthServiceAPi";
import { signupSchema, type SignupFormValues, type SignupMethod } from "@/schemas/auth";
import { useAuthModal } from "@/context/AuthModalProvider";

export default function SignupFormView() {
    const { setView, setPendingSignup } = useAuthModal();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { control, handleSubmit, reset } = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
        defaultValues: { method: "email", identifier: "" },
    });

    const method = useWatch({ control, name: "method" });

    const switchMethod = (next: SignupMethod) => {
        if (next === method) return;
        reset({ method: next, identifier: "" });
    };

    const onSubmit = async (values: SignupFormValues) => {
        setIsSubmitting(true);
        try {
            // TODO: re-enable real auth API call once ready.
            // const result = await registerUser({
            //     body: values.method === "email" ? { email: values.identifier } : { phone: values.identifier },
            // });
            console.log("[SignupFormView] signup submit", values);
            const result = { success: true, message: "" };
            if (result?.success) {
                setPendingSignup({ method: values.method, value: values.identifier });
                toast.success("Verification code sent");
                setView("signup-otp");
            } else {
                toast.error(result?.message || "Couldn't create your account. Please try again.");
            }
        } catch {
            toast.error("Couldn't create your account. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex gap-1.5 rounded-2xl border border-black/3 bg-[rgba(242,242,244,0.8)] p-1.5">
                {(["email", "phone"] as const).map((option) => (
                    <button
                        key={option}
                        type="button"
                        onClick={() => switchMethod(option)}
                        className={cn(
                            "flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-base font-bold capitalize transition-colors",
                            method === option
                                ? "border border-black/6 bg-white text-foreground shadow-sm"
                                : "text-muted-foreground"
                        )}
                    >
                        {option === "email" ? <Mail className="size-5" /> : <Phone className="size-5" />}
                        {option}
                    </button>
                ))}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4.5">
                <div className="flex flex-col gap-4">
                    <FormInput
                        key={method}
                        control={control}
                        name="identifier"
                        label={method === "email" ? "Email" : "Phone"}
                        placeholder={method === "email" ? "Enter your user email" : "Enter your phone number"}
                        type={method === "email" ? "email" : "tel"}
                    />
                </div>

                <p className="text-sm font-medium text-muted-foreground">
                    Already have an account?{" "}
                    <button type="button" onClick={() => setView("login")} className="font-bold text-secondary-color">
                        Log In
                    </button>
                </p>

                <div className="flex flex-col gap-3.5">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="h-14 w-full rounded-full border-2 border-secondary-color bg-secondary-color text-xl font-bold text-white shadow-[inset_0_3px_3px_rgba(255,255,255,0.12)] transition-colors hover:bg-secondary-color/90 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isSubmitting ? "Please wait..." : "Continue"}
                    </button>
                    <p className="text-center text-sm font-medium text-foreground">
                        By continuing, you agree to our{" "}
                        <button type="button" onClick={() => toast.info("Terms of service coming soon")} className="font-bold text-secondary-color">
                            Terms of service
                        </button>{" "}
                        &amp;{" "}
                        <button type="button" onClick={() => toast.info("Privacy policy coming soon")} className="font-bold text-secondary-color">
                            Privacy policy
                        </button>
                    </p>
                </div>
            </form>
        </div>
    );
}
