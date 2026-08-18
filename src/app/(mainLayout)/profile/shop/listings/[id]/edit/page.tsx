import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageWraper from "@/components/ui/CustomUi/PageWraper";
import { getShopListingById } from "../../../_lib/data";
import EditProductForm from "./_components/EditProductForm";
import ListingActionMenu from "./_components/ListingActionMenu";

export const metadata: Metadata = {
    title: "Edit Product | eKayzone",
};

export default async function EditListingPage({
    params,
}: PageProps<"/profile/shop/listings/[id]/edit">) {
    const { id } = await params;
    const listing = getShopListingById(id);

    if (!listing) notFound();

    return (
        <PageWraper
            title={listing.title}
            backToPreviousPage
            headerAction={<ListingActionMenu listingId={listing.id} />}
        >
            <EditProductForm listing={listing} />
        </PageWraper>
    );
}
