"use client";

import ReusableModal from "@/components/ui/CustomUi/ReuseableModal";
import { useAuthModal, type AuthView } from "@/context/AuthModalProvider";
import LoginView from "./LoginView";
import SignupMethodView from "./SignupMethodView";
import SignupFormView from "./SignupFormView";
import SignupOtpView from "./SignupOtpView";

const TITLES: Record<AuthView, string> = {
    login: "Welcome to eKayzone",
    "signup-method": "",
    "signup-form": "Create account",
    "signup-otp": "Submit your code",
};

export default function AuthModal() {
    const { isOpen, close, view } = useAuthModal();

    return (
        <ReusableModal open={isOpen} onOpenChange={(open) => !open && close()} title={TITLES[view]} maxWidth="sm:max-w-md">
            {view === "login" && <LoginView />}
            {view === "signup-method" && <SignupMethodView />}
            {view === "signup-form" && <SignupFormView />}
            {view === "signup-otp" && <SignupOtpView />}
        </ReusableModal>
    );
}
