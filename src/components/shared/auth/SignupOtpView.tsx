"use client";

import { toast } from "sonner";
import { registerUserOtp, resendOtp } from "@/service/AuthService/AuthServiceAPi";
import { useAuthModal } from "@/context/AuthModalProvider";
import OtpForm from "./OtpForm";

export default function SignupOtpView() {
    const { setView, pendingSignup } = useAuthModal();

    return (
        <OtpForm
            description={`Enter the code we have sent to ${pendingSignup?.value || "your email"}`}
            onVerify={(code) => registerUserOtp({ body: { otp: code } })}
            onVerified={() => {
                toast.success("Account created! Please log in.");
                setView("login");
            }}
            onResend={() => resendOtp({ body: { purpose: "create" } })}
        />
    );
}
