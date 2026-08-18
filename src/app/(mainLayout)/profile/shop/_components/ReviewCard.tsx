import Image from "next/image";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ShopReview } from "../_lib/data";

export default function ReviewCard({ review }: { review: ShopReview }) {
    return (
        <article className="flex items-start gap-1 rounded-lg border border-[#e5e8ea] bg-white p-2.5 shadow-[0_1px_0.5px_rgba(0,0,0,0.03)]">
            <div className="relative size-[42px] shrink-0 overflow-hidden rounded-full bg-muted">
                <Image src={review.avatar} alt={review.author} fill sizes="42px" className="object-cover" />
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-[7px]">
                <div className="flex flex-col gap-1.5">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between gap-3">
                            <p className="truncate text-base font-bold leading-[1.5] text-[#313233]">
                                {review.author}
                            </p>
                            <p className="shrink-0 text-sm font-medium tracking-[-0.3px] text-[#8e8e93]">
                                {review.date}
                            </p>
                        </div>

                        <div className="flex items-center" aria-label={`${review.rating} out of 5 stars`}>
                            {Array.from({ length: 5 }, (_, index) => (
                                <Star
                                    key={index}
                                    className={cn(
                                        "size-3.5",
                                        index < review.rating
                                            ? "fill-[#e8943f] text-[#e8943f]"
                                            : "fill-[#efefef] text-[#efefef]"
                                    )}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                        <p className="truncate text-sm font-semibold text-[#313233]">{review.listingTitle}</p>
                        <span className="flex h-[22px] shrink-0 items-center justify-center rounded bg-[#203a47] px-2.5 text-xs text-white">
                            {review.listingType === "products" ? "Product" : "Service"}
                        </span>
                    </div>
                </div>

                <p className="text-sm font-medium tracking-[-0.3px] text-[#555]">{review.comment}</p>
            </div>
        </article>
    );
}
