"use client";

import Image from "next/image";
import { useAuthModal } from "@/context/AuthModalProvider";

export default function PasswordUpdatedView() {
    const { setView, close } = useAuthModal();

    return (
        <div className="flex flex-col items-center gap-6 py-4 text-center">
            <Image src="/images/marketplace/order-placed-check.svg" alt="" width={111} height={111} />
            <div className="flex flex-col gap-1">
                <p className="text-3xl font-bold text-foreground">Password Updated</p>
                <p className="text-base font-medium text-muted-foreground">
                    Your password has been changed successfully.
                </p>
            </div>

            <button
                type="button"
                onClick={() => {
                    setView("login");
                    close();
                }}
                className="h-14 w-full rounded-full border-2 border-secondary-color bg-secondary-color text-xl font-bold text-white shadow-[inset_0_3px_3px_rgba(255,255,255,0.12)] transition-colors hover:bg-secondary-color/90"
            >
                Back to Log In
            </button>
        </div>
    );
}
