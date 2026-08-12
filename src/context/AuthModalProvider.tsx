"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import AuthModal from "@/components/shared/auth/AuthModal";

export type AuthView = "login" | "signup-method" | "signup-form" | "signup-otp";

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
}

const AuthModalContext = createContext<AuthModalContextValue | null>(null);

export function AuthModalProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [view, setView] = useState<AuthView>("login");
    const [pendingSignup, setPendingSignup] = useState<PendingSignup | null>(null);

    const open = useCallback((nextView: AuthView = "login") => {
        setView(nextView);
        setIsOpen(true);
    }, []);

    const close = useCallback(() => setIsOpen(false), []);

    const value = useMemo(
        () => ({ isOpen, view, open, close, setView, pendingSignup, setPendingSignup }),
        [isOpen, view, open, close, pendingSignup]
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
