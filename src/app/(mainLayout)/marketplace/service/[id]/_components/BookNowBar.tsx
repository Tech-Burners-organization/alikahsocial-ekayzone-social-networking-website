"use client";

import { useState } from "react";
import BookServiceModal from "./BookServiceModal";
import type { ServiceDetail } from "../_lib/data";

export default function BookNowBar({ service }: { service: ServiceDetail }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="sticky flex justify-center px-6 bottom-0 z-10 -mx-6 mt-2 border-t border-border bg-background py-4 shadow-[0_-4px_12px_rgba(0,0,0,0.04)] md:-mx-10 md:px-10">
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="h-12 w-[90%] cursor-pointer rounded-full border-2 border-secondary-color bg-secondary-color text-xl font-bold text-white shadow-[inset_0_3px_3px_rgba(255,255,255,0.12)] transition-colors hover:bg-secondary-color/90"
                >
                    Book Now
                </button>
            </div>

            <BookServiceModal open={open} onOpenChange={setOpen} service={service} />
        </>
    );
}
