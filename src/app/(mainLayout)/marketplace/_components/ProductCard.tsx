"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "../_lib/data";
import Image from "next/image";

export default function ProductCard({ product }: { product: Product }) {
    const [liked, setLiked] = useState(false);

    return (
        <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-lg hover:border-foreground/15">
            {/* Image */}
            <div className="relative aspect-4/3 overflow-hidden bg-muted">
                <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {product.discount && (
                    <div className="absolute top-2.5 left-2.5 rounded-md bg-error-color px-2 py-0.5 text-[10px] font-bold text-white">
                        -{product.discount}%
                    </div>
                )}
                <button
                    onClick={() => setLiked(!liked)}
                    className={cn(
                        'absolute top-2.5 right-2.5 rounded-full p-1.5 transition-all',
                        'bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 hover:bg-background'
                    )}
                >
                    <Heart
                        className={cn(
                            'size-4 transition-colors',
                            liked
                                ? 'fill-error-color text-error-color'
                                : 'text-muted-foreground'
                        )}
                    />
                </button>
            </div>

            {/* Info */}
            <div className="flex flex-1 flex-col gap-1.5 p-3">
                <h3 className="text-sm font-semibold text-foreground line-clamp-2 leading-snug">
                    {product.title}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1">
                    <svg
                        className="size-3.5 fill-amber-400 text-amber-400 shrink-0"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span className="text-xs font-medium text-[#E65100]">
                        {product.rating} ({product.reviewCount})
                    </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 pt-0.5">
                    <span className="text-base font-bold text-[#00A86B]">
                        {product.currency}
                        {product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                        <span className="text-xs text-muted-foreground line-through">
                            {product.currency}
                            {product.originalPrice.toLocaleString()}
                        </span>
                    )}
                </div>

                {/* Seller */}
                <p className="text-[11px] text-muted-foreground pt-1">{product.seller}</p>
            </div>
        </div>
    );
}
