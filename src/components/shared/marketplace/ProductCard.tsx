import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import type { Product } from "@/app/(mainLayout)/marketplace/_lib/data";

export default function ProductCard({ product }: { product: Product }) {
    return (
        <Link
            href={`/marketplace/${product.id}`}
            className="flex w-full flex-col gap-1.5 rounded-xl border border-border bg-card p-2.5 shadow-[0px_1px_0.5px_rgba(0,0,0,0.03)] transition-shadow hover:shadow-md"
        >
            <div className="relative h-33 w-full overflow-hidden rounded-lg bg-muted">
                <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover"
                />
                {!!product.discount && (
                    <span className="absolute left-1.5 top-2.5 rounded bg-rose-500 px-2 py-1 text-xs font-extrabold text-white">
                        -{product.discount}%
                    </span>
                )}
            </div>
            <div className="flex flex-col gap-1">
                <p className="line-clamp-1 text-lg font-bold text-foreground">{product.title}</p>
                <div className="flex items-center gap-1">
                    <Star className="size-5 fill-amber-400 text-amber-400" />
                    <span className="text-base font-semibold text-foreground">{product.rating}</span>
                    <span className="text-base text-muted-foreground">({product.reviewCount})</span>
                </div>
                <div className="flex items-center gap-1">
                    <span className="text-base font-bold text-secondary-color">
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
                <p className="truncate text-sm font-semibold text-muted-foreground">{product.seller}</p>
            </div>
        </Link>
    );
}
