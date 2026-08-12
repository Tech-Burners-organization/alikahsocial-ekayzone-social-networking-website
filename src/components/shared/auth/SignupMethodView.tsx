"use client";

import Image from "next/image";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { AllImages } from "../../../../public/images/AllImages";
import { useAuthModal } from "@/context/AuthModalProvider";

export default function SignupMethodView() {
    const { setView } = useAuthModal();

    return (
        <div className="flex flex-col items-center gap-10">
            <Image src={AllImages.logo} alt="eKayzone" className="h-auto w-44" priority />

            <div className="flex w-full flex-col gap-2">
                <button
                    type="button"
                    onClick={() => setView("signup-form")}
                    className="h-14 w-full rounded-full border-2 border-secondary-color bg-secondary-color text-xl font-bold text-white shadow-[inset_0_3px_3px_rgba(255,255,255,0.12)] transition-colors hover:bg-secondary-color/90"
                >
                    Continue with Email or Phone
                </button>
                <button
                    type="button"
                    onClick={() => toast.info("Google sign-in is coming soon")}
                    className="flex h-14 w-full items-center justify-center gap-2 rounded-full border-2 border-black/6 bg-muted text-xl font-bold text-foreground"
                >
                    <FcGoogle className="size-6" />
                    Continue with Google
                </button>
                <button
                    type="button"
                    onClick={() => toast.info("Apple sign-in is coming soon")}
                    className="flex h-14 w-full items-center justify-center gap-2 rounded-full border-2 border-black/6 bg-muted text-xl font-bold text-foreground"
                >
                    <FaApple className="size-6" />
                    Continue with Apple
                </button>
            </div>

            <p className="text-center text-base font-medium text-foreground">
                By continuing, you agree to our{" "}
                <button type="button" onClick={() => toast.info("Terms of service coming soon")} className="font-bold text-secondary-color">
                    Terms of service
                </button>{" "}
                &amp;{" "}
                <button type="button" onClick={() => toast.info("Privacy policy coming soon")} className="font-bold text-secondary-color">
                    Privacy policy
                </button>
            </p>
        </div>
    );
}
