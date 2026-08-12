import type { Product } from "../../_lib/data";
import ProductCard from "../../_components/ProductCard";

export default function RelatedProducts({ products }: { products: Product[] }) {
    if (products.length === 0) return null;

    return (
        <div className="flex flex-col gap-3">
            <h2 className="text-xl font-bold text-foreground">You may also like</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
