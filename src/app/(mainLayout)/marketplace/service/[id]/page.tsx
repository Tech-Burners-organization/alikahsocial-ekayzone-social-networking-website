import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import BackToPreviousPage from "@/utils/BackToPreviousPage";
import Container from "@/components/ui/CustomUi/Container";
import SellerInfo from "../../_components/SellerInfo";
import ReviewsSection from "../../_components/ReviewsSection";
import { getServiceDetail } from "./_lib/data";
import ServiceInfo from "./_components/ServiceInfo";
import ServiceDescription from "./_components/ServiceDescription";
import ServicePricingList from "./_components/ServicePricingList";
import BookNowBar from "./_components/BookNowBar";

export async function generateMetadata({
    params,
}: PageProps<'/marketplace/service/[id]'>): Promise<Metadata> {
    const { id } = await params;
    const service = getServiceDetail(id);

    if (!service) {
        return { title: "Service not found | eKayzone Marketplace" };
    }

    return {
        title: `${service.title} | eKayzone Marketplace`,
        description: service.description,
        openGraph: {
            title: service.title,
            description: service.description,
            images: [service.image],
        },
    };
}

export default async function ServiceDetailsPage({ params }: PageProps<'/marketplace/service/[id]'>) {
    const { id } = await params;
    const service = getServiceDetail(id);

    if (!service) {
        notFound();
    }

    return (
        <div>
            <Container>
                <div className="flex flex-col py-6 gap-6">
                    <BackToPreviousPage className="w-fit" />

                    <div className="relative aspect-779/403 w-full overflow-hidden rounded-2xl bg-muted">
                        <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            priority
                            sizes="(max-width: 1024px) 100vw, 848px"
                            className="object-cover"
                        />
                    </div>

                    <div className="flex flex-col gap-8">
                        <ServiceInfo service={service} />
                        <ServiceDescription description={service.description} />
                        <SellerInfo name={service.seller} handle={service.sellerHandle} avatar={service.sellerAvatar} />
                        <ServicePricingList pricing={service.pricing} currency={service.currency} />
                        <ReviewsSection
                            rating={service.rating}
                            reviewCount={service.reviewCount}
                            reviews={service.reviews}
                        />
                    </div>
                </div>
            </Container>

            <BookNowBar service={service} />
        </div>
    );
}
