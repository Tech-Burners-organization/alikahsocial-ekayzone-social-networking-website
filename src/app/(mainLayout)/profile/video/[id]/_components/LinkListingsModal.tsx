"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import ReusableModal from "@/components/ui/CustomUi/ReuseableModal";
import { Input } from "@/components/ui/input";
import { getFilteredProducts, type Product } from "@/app/(mainLayout)/marketplace/_lib/data";
import type { LinkedListing } from "../../../_lib/data";

interface LinkListingsModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSelect: (listing: LinkedListing) => void;
    /** Product ids already linked elsewhere on this video — hidden so the same listing can't be added twice. */
    excludeIds?: string[];
}

export default function LinkListingsModal({ open, onOpenChange, onSelect, excludeIds = [] }: LinkListingsModalProps) {
    const [query, setQuery] = useState("");

    const products = useMemo(
        () =>
            getFilteredProducts({ search: query, category: "all", sort: "relevance" }).filter(
                (product) => !excludeIds.includes(product.id)
            ),
        [query, excludeIds]
    );

    const handleSelect = (product: Product) => {
        onSelect({
            id: product.id,
            name: product.title,
            price: product.price,
            currency: product.currency,
            image: product.image,
        });
        onOpenChange(false);
        setQuery("");
    };

    return (
        <ReusableModal open={open} onOpenChange={onOpenChange} title="Link Listings" maxWidth="sm:max-w-lg">
            <div className="flex flex-col gap-4">
                <div className="relative">
                    <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Search products"
                        className="h-12 rounded-full border-none bg-muted pl-10 text-sm"
                    />
                </div>

                <div className="flex flex-col divide-y divide-border">
                    {products.map((product) => (
                        <div key={product.id} className="flex items-center gap-3 py-3">
                            <div className="relative size-14.75 shrink-0 overflow-hidden rounded-lg bg-muted">
                                <Image src={product.image} alt={product.title} fill sizes="59px" className="object-cover" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-lg font-bold text-foreground">{product.title}</p>
                                <p className="text-base font-semibold text-secondary-color">
                                    {product.currency}
                                    {product.price}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => handleSelect(product)}
                                className="h-10 shrink-0 rounded-full border border-secondary-color px-4 text-sm font-bold text-secondary-color transition-colors hover:bg-secondary-color/10"
                            >
                                Select
                            </button>
                        </div>
                    ))}

                    {products.length === 0 && (
                        <p className="py-8 text-center text-sm text-muted-foreground">No products found</p>
                    )}
                </div>
            </div>
        </ReusableModal>
    );
}
