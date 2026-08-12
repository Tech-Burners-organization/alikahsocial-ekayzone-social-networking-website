"use client";

import { forgetPasswordOtp, resendOtp } from "@/service/AuthService/AuthServiceAPi";
import { useAuthModal } from "@/context/AuthModalProvider";
import OtpForm from "./OtpForm";

export default function ForgotPasswordOtpView() {
    const { setView, forgotEmail } = useAuthModal();

    return (
        <OtpForm
            description={`Enter the code we have sent to ${forgotEmail || "your email"}`}
            onVerify={(code) => forgetPasswordOtp({ body: { otp: code } })}
            onVerified={() => setView("new-password")}
            onResend={() => resendOtp({ body: { purpose: "forgot" } })}
        />
    );
}
