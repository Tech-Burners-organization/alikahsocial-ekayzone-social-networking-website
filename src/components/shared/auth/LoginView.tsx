"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { FormInput, FormPassword, FormCheckbox } from "@/components/ui/CustomUi/ReuseForm/Form";
// TODO: re-enable once the real auth API call below is uncommented.
// import { loginUser } from "@/service/AuthService/AuthServiceAPi";
import { loginSchema, type LoginFormValues } from "@/schemas/auth";
import { useAuthModal } from "@/context/AuthModalProvider";
import { pillInputClassName, PillLabel } from "../create/formStyles";

export default function LoginView() {
    const router = useRouter();
    const { close, setView } = useAuthModal();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { control, handleSubmit } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "", rememberMe: true },
    });

    const onSubmit = async (values: LoginFormValues) => {
        setIsSubmitting(true);
        try {
            // TODO: re-enable real auth API call once ready.
            // const result = await loginUser({ body: values });
            console.log("[LoginView] login submit", values);
            const result = { success: true, message: "" };
            if (result?.success) {
                toast.success("Welcome back!");
                close();
                router.refresh();
            } else {
                toast.error(result?.message || "Something went wrong. Please try again.");
            }
        } catch {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col gap-5">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <div className="flex flex-col gap-2.5">
                    <FormInput control={control} name="email" label={<PillLabel>Email</PillLabel>} inputClassName={pillInputClassName}
                        placeholder="Enter your email" type="email" />
                    <FormPassword control={control} name="password" label={<PillLabel>Password</PillLabel>} inputClassName={pillInputClassName}
                        placeholder="Enter your password" />
                </div>

                <div className="flex items-center justify-between">
                    <FormCheckbox control={control} name="rememberMe" label={<PillLabel>Remember me</PillLabel>} />
                    <button
                        type="button"
                        onClick={() => setView("forgot-password")}
                        className="shrink-0 whitespace-nowrap text-sm font-bold text-secondary-color"
                    >
                        Forgot password?
                    </button>
                </div>

                <div className="flex flex-col items-center gap-3">
                    <div className="flex w-full items-center gap-4">
                        <span className="h-px flex-1 bg-border" />
                        <span className="text-base font-bold text-foreground">or continue with</span>
                        <span className="h-px flex-1 bg-border" />
                    </div>
                    <div className="flex items-center justify-center gap-4">
                        <button
                            type="button"
                            onClick={() => toast.info("Google sign-in is coming soon")}
                            aria-label="Continue with Google"
                            className="flex items-center justify-center rounded-2xl border border-border bg-muted px-8 py-4"
                        >
                            <FcGoogle className="size-6" />
                        </button>
                        <button
                            type="button"
                            onClick={() => toast.info("Apple sign-in is coming soon")}
                            aria-label="Continue with Apple"
                            className="flex items-center justify-center rounded-2xl border border-border bg-muted px-8 py-4"
                        >
                            <FaApple className="size-6" />
                        </button>
                    </div>
                </div>

                <p className="text-center text-sm font-medium text-foreground">
                    New to eKayzone?{" "}
                    <button type="button" onClick={() => setView("signup-method")} className="font-bold text-secondary-color">
                        Create an account
                    </button>
                </p>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-14 w-full rounded-full border-2 border-secondary-color bg-secondary-color text-xl font-bold text-white shadow-[inset_0_3px_3px_rgba(255,255,255,0.12)] transition-colors hover:bg-secondary-color/90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isSubmitting ? "Signing in..." : "Sign In"}
                </button>
            </form>
        </div>
    );
}
