"use client";

import { useState } from "react";
import Image from "next/image";
import { Link2 } from "lucide-react";
import LinkListingsModal from "./LinkListingsModal";
import type { LinkedListing } from "../../../_lib/data";

export default function LinkedListingCard({ initialListing }: { initialListing: LinkedListing | null }) {
    const [listing, setListing] = useState(initialListing);
    const [open, setOpen] = useState(false);

    return (
        <div className="rounded-xl border border-border bg-background p-2.5 shadow-[0px_1px_0.5px_rgba(0,0,0,0.03)]">
            <h2 className="px-1.5 py-2 text-lg font-bold text-foreground">Linked Listing</h2>

            {listing ? (
                <div className="flex items-center gap-2.5 px-1.5 py-2">
                    <div className="relative size-18.25 shrink-0 overflow-hidden rounded-lg bg-muted">
                        <Image src={listing.image} alt={listing.name} fill sizes="73px" className="object-cover" />
                    </div>
                    <div className="flex flex-1 items-center justify-between gap-3">
                        <div>
                            <p className="text-lg font-bold text-foreground">{listing.name}</p>
                            <p className="text-base font-semibold text-secondary-color">
                                {listing.currency}
                                {listing.price}
                            </p>
                        </div>
                        <div className="flex flex-col items-end gap-2.5 text-sm font-bold">
                            <button type="button" onClick={() => setOpen(true)} className="text-secondary-color hover:underline">
                                Change
                            </button>
                            <button
                                type="button"
                                onClick={() => setListing(null)}
                                className="text-muted-foreground hover:underline"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center gap-3 px-1.5 py-3 text-center">
                    <p className="text-sm font-medium text-foreground">Add a marketplace listings to this video</p>
                    <button
                        type="button"
                        onClick={() => setOpen(true)}
                        className="flex h-10 items-center justify-center gap-1.5 rounded-full border border-secondary-color px-3.5 text-sm font-bold text-secondary-color shadow-[0px_2px_1.5px_-0.5px_rgba(0,0,0,0.03)] transition-colors hover:bg-secondary-color/10"
                    >
                        <Link2 className="size-4" />
                        Link Listings
                    </button>
                </div>
            )}

            <LinkListingsModal
                open={open}
                onOpenChange={setOpen}
                onSelect={setListing}
                excludeIds={listing ? [listing.id] : []}
            />
        </div>
    );
}
