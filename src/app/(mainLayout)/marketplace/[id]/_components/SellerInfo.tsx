import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import type { ProductDetail } from "../_lib/data";

export default function SellerInfo({ product }: { product: ProductDetail }) {
    return (
        <div className="flex flex-col gap-2.5">
            <h2 className="text-xl font-bold text-foreground">Seller Information</h2>
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <div className="relative size-13.75 shrink-0 overflow-hidden rounded-full bg-muted">
                        <Image
                            src={product.sellerAvatar}
                            alt={product.seller}
                            fill
                            sizes="55px"
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <p className="text-lg font-semibold text-foreground">{product.seller}</p>
                        <p className="text-base text-muted-foreground">{product.sellerHandle}</p>
                    </div>
                </div>
                <Link
                    href="/chat"
                    className="flex items-center gap-1 rounded-sm bg-secondary-color px-2.5 py-1.5 text-xs font-bold text-white transition-colors hover:bg-secondary-color/90"
                >
                    <MessageCircle className="size-4" />
                    Message
                </Link>
            </div>
        </div>
    );
}
