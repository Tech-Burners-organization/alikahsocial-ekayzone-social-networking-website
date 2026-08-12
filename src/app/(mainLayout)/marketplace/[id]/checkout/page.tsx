import { notFound } from "next/navigation";
import { getProductDetail } from "../_lib/data";
import CheckoutFlow from "./_components/CheckoutFlow";

export default async function CheckoutPage({ params }: PageProps<'/marketplace/[id]/checkout'>) {
    const { id } = await params;
    const product = getProductDetail(id);

    if (!product) {
        notFound();
    }

    return <CheckoutFlow product={product} />;
}
