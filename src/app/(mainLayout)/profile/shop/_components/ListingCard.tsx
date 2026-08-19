import Image from "next/image";
import Link from "next/link";
import { Eye, SquarePen, Star, Timer } from "lucide-react";
import type { ShopListing } from "../_lib/data";

export default function ListingCard({ listing }: { listing: ShopListing }) {
    return (
        <article className="flex flex-col gap-[7px] rounded-xl border border-[#e5e8ea] bg-white p-2.5">
            <div className="flex w-full flex-col items-center gap-[18px]">
                {/* Below md the card stacks: full-bleed image on top, then the listing details. */}
                <div className="flex w-full flex-col gap-4 md:flex-row md:items-end">
                    <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-lg bg-muted md:h-24.25 md:w-25">
                        <Image
                            src={listing.image}
                            alt={listing.title}
                            fill
                            sizes="(min-width: 768px) 100px, 100vw"
                            className="object-cover"
                        />
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                        <div className="flex flex-col gap-1">
                            <div className="flex flex-col gap-0.5">
                                <h2 className="truncate text-lg font-bold leading-7 text-[#0a2c07]">
                                    {listing.title}
                                </h2>
                                <p className="text-base font-bold leading-6 text-secondary-color">
                                    {listing.currency}
                                    {listing.price}
                                </p>
                            </div>

                            <div className="flex items-center gap-1">
                                <Star className="size-4 fill-[#e8943f] text-[#e8943f]" />
                                <span className="text-xs font-semibold text-[#1b1c1c]">{listing.rating}</span>
                                <span className="text-xs text-[#313233]">({listing.reviewCount})</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-[9px] text-sm font-medium text-[#5e6062]">
                            <span className="flex items-center gap-1">
                                <Eye className="size-4" />
                                {listing.views}
                            </span>
                            {listing.daysLeft !== undefined && (
                                <span className="flex items-center gap-1">
                                    <Timer className="size-4" />
                                    {listing.daysLeft}d left
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="h-px w-full bg-[#e5e8ea]" />
            </div>

            <Link
                href={`/profile/shop/listings/${listing.id}/edit`}
                className="flex h-10 w-full items-center justify-center gap-1 rounded-full border border-[#e5e8ea] bg-[#f2f2f4] text-sm font-semibold text-[#313233] shadow-[inset_0_2px_3px_rgba(255,255,255,0.09)] transition-colors hover:bg-[#e9e9ee]"
            >
                <SquarePen className="size-5" />
                Edit Product
            </Link>
        </article>
    );
}
