"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, Trash2 } from "lucide-react";
import { toast } from "sonner";
import ConfirmActionModal from "@/components/shared/ConfirmActionModal";

export default function DeleteAccountRow() {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="flex w-full items-center justify-between px-0.5 py-1.5 text-[#d93f3f] transition-opacity hover:opacity-80"
            >
                <span className="flex items-center gap-2">
                    <Trash2 className="size-[18px] shrink-0" />
                    <span className="text-lg font-semibold leading-7">Delete Account</span>
                </span>
                <ChevronRight className="size-5 shrink-0" />
            </button>

            <ConfirmActionModal
                open={open}
                onOpenChange={setOpen}
                message="Are you sure you want to delete your account? This action cannot be undone, and all your listings, orders and content will be permanently removed."
                confirmLabel="Delete Account"
                cancelLabel="Cancel"
                tone="danger"
                confirmFirst
                onConfirm={() => {
                    toast.success("Account deletion requested");
                    router.push("/");
                }}
            />
        </>
    );
}
