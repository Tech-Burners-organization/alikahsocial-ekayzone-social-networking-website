"use client";

import { toast } from "sonner";
// TODO: re-enable once the real auth API calls below are uncommented.
// import { registerUserOtp, resendOtp } from "@/service/AuthService/AuthServiceAPi";
import { useAuthModal } from "@/context/AuthModalProvider";
import OtpForm from "./OtpForm";

export default function SignupOtpView() {
    const { setView, pendingSignup } = useAuthModal();

    return (
        <OtpForm
            description={`Enter the code we have sent to ${pendingSignup?.value || "your email"}`}
            onVerify={(code) => {
                // TODO: re-enable real auth API call once ready.
                // return registerUserOtp({ body: { otp: code } });
                console.log("[SignupOtpView] verify code", code);
                return Promise.resolve({ success: true, message: "" });
            }}
            onVerified={() => {
                toast.success("Account created! Please log in.");
                setView("login");
            }}
            onResend={() => {
                // TODO: re-enable real auth API call once ready.
                // return resendOtp({ body: { purpose: "create" } });
                console.log("[SignupOtpView] resend code");
                return Promise.resolve({ success: true, message: "" });
            }}
        />
    );
}
