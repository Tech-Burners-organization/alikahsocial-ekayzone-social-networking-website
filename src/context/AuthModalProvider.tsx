"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import AuthModal from "@/components/shared/auth/AuthModal";

export type AuthView =
    | "login"
    | "signup-method"
    | "signup-form"
    | "signup-otp"
    | "forgot-password"
    | "forgot-password-otp"
    | "new-password"
    | "password-updated";

export interface PendingSignup {
    method: "email" | "phone";
    value: string;
}

interface AuthModalContextValue {
    isOpen: boolean;
    view: AuthView;
    open: (view?: AuthView) => void;
    close: () => void;
    setView: (view: AuthView) => void;
    pendingSignup: PendingSignup | null;
    setPendingSignup: (pending: PendingSignup | null) => void;
    forgotEmail: string | null;
    setForgotEmail: (email: string | null) => void;
}

const AuthModalContext = createContext<AuthModalContextValue | null>(null);

export function AuthModalProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [view, setView] = useState<AuthView>("login");
    const [pendingSignup, setPendingSignup] = useState<PendingSignup | null>(null);
    const [forgotEmail, setForgotEmail] = useState<string | null>(null);

    const open = useCallback((nextView: AuthView = "login") => {
        setView(nextView);
        setIsOpen(true);
    }, []);

    const close = useCallback(() => setIsOpen(false), []);

    const value = useMemo(
        () => ({
            isOpen,
            view,
            open,
            close,
            setView,
            pendingSignup,
            setPendingSignup,
            forgotEmail,
            setForgotEmail,
        }),
        [isOpen, view, open, close, pendingSignup, forgotEmail]
    );

    return (
        <AuthModalContext.Provider value={value}>
            {children}
            <AuthModal />
        </AuthModalContext.Provider>
    );
}

export function useAuthModal() {
    const ctx = useContext(AuthModalContext);
    if (!ctx) throw new Error("useAuthModal must be used within an AuthModalProvider");
    return ctx;
}
