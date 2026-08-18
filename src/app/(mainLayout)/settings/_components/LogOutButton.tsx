"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ConfirmActionModal from "@/components/shared/ConfirmActionModal";

export default function LogOutButton() {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="mx-auto flex h-14 w-full max-w-[406px] items-center justify-center rounded-full border-2 border-[#e5e8ea] bg-[#f9fafb] text-xl font-bold text-[#d93f3f] shadow-[inset_0_3px_3px_rgba(255,255,255,0.12)] transition-colors hover:bg-[#f2f2f4]"
            >
                Log Out
            </button>

            <ConfirmActionModal
                open={open}
                onOpenChange={setOpen}
                message="Are you sure you want to log out?"
                confirmLabel="Log Out"
                cancelLabel="Cancel"
                tone="danger"
                confirmFirst
                onConfirm={() => {
                    toast.success("Logged out");
                    router.push("/");
                }}
            />
        </>
    );
}
