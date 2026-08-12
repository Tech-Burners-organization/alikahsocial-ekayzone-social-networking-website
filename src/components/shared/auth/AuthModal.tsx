"use client";

import ReusableModal from "@/components/ui/CustomUi/ReuseableModal";
import { useAuthModal, type AuthView } from "@/context/AuthModalProvider";
import LoginView from "./LoginView";
import SignupMethodView from "./SignupMethodView";
import SignupFormView from "./SignupFormView";
import SignupOtpView from "./SignupOtpView";
import ForgotPasswordView from "./ForgotPasswordView";
import ForgotPasswordOtpView from "./ForgotPasswordOtpView";
import NewPasswordView from "./NewPasswordView";
import PasswordUpdatedView from "./PasswordUpdatedView";

const TITLES: Record<AuthView, string> = {
    login: "Welcome to eKayzone",
    "signup-method": "",
    "signup-form": "Create account",
    "signup-otp": "Submit your code",
    "forgot-password": "Forgot Password",
    "forgot-password-otp": "Submit your code",
    "new-password": "New Password",
    "password-updated": "",
};

export default function AuthModal() {
    const { isOpen, close, view } = useAuthModal();

    return (
        <ReusableModal open={isOpen} onOpenChange={(open) => !open && close()} title={TITLES[view]} maxWidth="sm:max-w-lg">
            {view === "login" && <LoginView />}
            {view === "signup-method" && <SignupMethodView />}
            {view === "signup-form" && <SignupFormView />}
            {view === "signup-otp" && <SignupOtpView />}
            {view === "forgot-password" && <ForgotPasswordView />}
            {view === "forgot-password-otp" && <ForgotPasswordOtpView />}
            {view === "new-password" && <NewPasswordView />}
            {view === "password-updated" && <PasswordUpdatedView />}
        </ReusableModal>
    );
}
