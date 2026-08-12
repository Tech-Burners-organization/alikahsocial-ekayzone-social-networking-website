"use client";

import { useRouter } from "next/navigation";

export default function BuyNowBar({ productId }: { productId: string }) {
    const router = useRouter();

    return (
        <div className="sticky px-6 bottom-0 z-10 -mx-6 mt-2 border-t border-border bg-background py-4 shadow-[0_-4px_12px_rgba(0,0,0,0.04)] md:-mx-10 md:px-10">
            <button
                type="button"
                onClick={() => router.push(`/marketplace/${productId}/checkout`)}
                className="h-14 w-full rounded-full border-2 border-secondary-color bg-secondary-color text-xl font-bold text-white shadow-[inset_0_3px_3px_rgba(255,255,255,0.12)] transition-colors hover:bg-secondary-color/90"
            >
                Buy Now
            </button>
        </div>
    );
}
