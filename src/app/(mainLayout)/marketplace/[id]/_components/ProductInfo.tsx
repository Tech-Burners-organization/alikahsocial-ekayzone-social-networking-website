import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { CATEGORY_PILLS } from "../../_lib/data";
import type { ProductDetail } from "../_lib/data";

export default function ProductInfo({ product }: { product: ProductDetail }) {
    const inStock = product.stock === "in-stock";
    const categoryLabel =
        CATEGORY_PILLS.find((pill) => pill.id === product.category)?.label ?? product.category;

    return (
        <div className="flex flex-col gap-3">
            <span className="w-fit rounded-sm border border-border bg-muted px-3 py-1 text-sm font-extrabold text-foreground">
                {categoryLabel}
            </span>

            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">{product.title}</h1>

            <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-2xl font-bold text-secondary-color">
                    {product.currency}
                    {product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                    <span className="text-base text-muted-foreground line-through">
                        {product.currency}
                        {product.originalPrice.toLocaleString()}
                    </span>
                )}
                {!!product.discount && (
                    <span className="rounded-sm bg-error-color px-2.5 py-1 text-sm font-extrabold text-white">
                        -{product.discount}%
                    </span>
                )}
            </div>

            <div className="flex items-center gap-1">
                {Array.from({ length: 5 }, (_, index) => (
                    <Star
                        key={index}
                        className={cn(
                            "size-5",
                            index < Math.round(product.rating)
                                ? "fill-amber-400 text-amber-400"
                                : "fill-muted text-muted"
                        )}
                    />
                ))}
                <span className="ml-1 text-base font-semibold text-foreground">{product.rating}</span>
                <span className="text-base text-muted-foreground">({product.reviewCount})</span>
            </div>

            <div className="flex items-center gap-1.5">
                <span className={cn("size-2 rounded-full", inStock ? "bg-success-color" : "bg-error-color")} />
                <span className={cn("text-base font-bold", inStock ? "text-success-color" : "text-error-color")}>
                    {inStock ? "In Stock" : "Out of Stock"}
                </span>
            </div>
        </div>
    );
}
