import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BackToPreviousPage from "@/utils/BackToPreviousPage";
import { getProductDetail, getRelatedProducts } from "./_lib/data";
import ProductGallery from "./_components/ProductGallery";
import ProductInfo from "./_components/ProductInfo";
import ProductDescription from "./_components/ProductDescription";
import SellerInfo from "./_components/SellerInfo";
import ReviewsSection from "./_components/ReviewsSection";
import RelatedProducts from "./_components/RelatedProducts";
import BuyNowBar from "./_components/BuyNowBar";
import Container from "@/components/ui/CustomUi/Container";

export async function generateMetadata({
    params,
}: PageProps<'/marketplace/[id]'>): Promise<Metadata> {
    const { id } = await params;
    const product = getProductDetail(id);

    if (!product) {
        return { title: "Product not found | eKayzone Marketplace" };
    }

    return {
        title: `${product.title} | eKayzone Marketplace`,
        description: product.description,
        openGraph: {
            title: product.title,
            description: product.description,
            images: [product.images[0]],
        },
    };
}

export default async function ProductDetailsPage({ params }: PageProps<'/marketplace/[id]'>) {
    const { id } = await params;
    const product = getProductDetail(id);

    if (!product) {
        notFound();
    }

    const relatedProducts = getRelatedProducts(product);

    return (
        <div>
            <Container>
                <div className="flex flex-col py-6 gap-6">
                    <BackToPreviousPage className="w-fit" />

                    <ProductGallery images={product.images} title={product.title} />

                    <div className="flex flex-col gap-8">
                        <ProductInfo product={product} />
                        <ProductDescription description={product.description} specs={product.specs} />
                        <SellerInfo product={product} />
                        <ReviewsSection
                            rating={product.rating}
                            reviewCount={product.reviewCount}
                            reviews={product.reviews}
                        />
                        <RelatedProducts products={relatedProducts} />
                    </div>
                </div>
            </Container>
            <BuyNowBar productId={product.id} />
        </div>
    );
}
