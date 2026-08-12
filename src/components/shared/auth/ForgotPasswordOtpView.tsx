"use client";

// TODO: re-enable once the real auth API calls below are uncommented.
// import { forgetPasswordOtp, resendOtp } from "@/service/AuthService/AuthServiceAPi";
import { useAuthModal } from "@/context/AuthModalProvider";
import OtpForm from "./OtpForm";

export default function ForgotPasswordOtpView() {
    const { setView, forgotEmail } = useAuthModal();

    return (
        <OtpForm
            description={`Enter the code we have sent to ${forgotEmail || "your email"}`}
            onVerify={(code) => {
                // TODO: re-enable real auth API call once ready.
                // return forgetPasswordOtp({ body: { otp: code } });
                console.log("[ForgotPasswordOtpView] verify code", code);
                return Promise.resolve({ success: true, message: "" });
            }}
            onVerified={() => setView("new-password")}
            onResend={() => {
                // TODO: re-enable real auth API call once ready.
                // return resendOtp({ body: { purpose: "forgot" } });
                console.log("[ForgotPasswordOtpView] resend code");
                return Promise.resolve({ success: true, message: "" });
            }}
        />
    );
}
