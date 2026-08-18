"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ChevronDown } from "lucide-react";
import { toast } from "sonner";
import Container from "@/components/ui/CustomUi/Container";
import {
    FormInput,
    FormSelect,
    FormTextarea,
    FormUpload,
} from "@/components/ui/CustomUi/ReuseForm/Form";
import { SelectItem } from "@/components/ui/select";
import { createProductSchema, type CreateProductFormValues } from "@/schemas/create";
import { AiDescriptionChip } from "@/components/shared/create/AiDescriptionChip";
import {
    PillLabel,
    pillInputClassName,
    pillTextareaClassName,
    pillTriggerClassName,
} from "@/components/shared/create/formStyles";
import type { ShopListing } from "../../../../_lib/data";

const FORM_ID = "edit-product-form";

export default function EditProductForm({ listing }: { listing: ShopListing }) {
    const router = useRouter();

    const form = useForm<CreateProductFormValues>({
        resolver: zodResolver(createProductSchema),
        defaultValues: {
            title: listing.title,
            sellingPrice: String(listing.price),
            discountPrice: listing.discountPrice ? String(listing.discountPrice) : "",
            description: listing.description,
            category: listing.category,
            stockQuantity: String(listing.stockQuantity),
            images: [],
        },
    });

    const onSubmit = form.handleSubmit(() => {
        toast.success("Product updated");
        router.push("/profile/shop?tab=listings");
    });

    return (
        <>
            <Container className="flex flex-col gap-6">
                <form id={FORM_ID} onSubmit={onSubmit} className="flex flex-col gap-4">
                    <FormInput
                        control={form.control}
                        name="title"
                        label={<PillLabel>Product Title</PillLabel>}
                        placeholder="Enter Product Title"
                        inputClassName={pillInputClassName}
                    />

                    <FormInput
                        control={form.control}
                        name="sellingPrice"
                        label={<PillLabel>Selling Price</PillLabel>}
                        placeholder="Enter Selling Price"
                        type="number"
                        inputClassName={pillInputClassName}
                    />

                    <FormInput
                        control={form.control}
                        name="discountPrice"
                        label={<PillLabel>Discount Price (Optional)</PillLabel>}
                        placeholder="Enter Discount Price"
                        type="number"
                        inputClassName={pillInputClassName}
                    />

                    <div className="flex flex-col gap-2">
                        <FormTextarea
                            control={form.control}
                            name="description"
                            label={<PillLabel>Product Description</PillLabel>}
                            placeholder="Enter product Description"
                            inputClassName={pillTextareaClassName}
                        />
                        <AiDescriptionChip />
                    </div>

                    <FormSelect
                        control={form.control}
                        name="category"
                        label={<PillLabel>Category</PillLabel>}
                        placeholder="Select Category"
                        triggerClassName={pillTriggerClassName}
                        suffix={<ChevronDown className="size-4 text-muted-foreground" />}
                    >
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="fashion">Fashion</SelectItem>
                        <SelectItem value="home">Home & Garden</SelectItem>
                        <SelectItem value="sports">Sports</SelectItem>
                        <SelectItem value="books">Books</SelectItem>
                    </FormSelect>

                    <FormInput
                        control={form.control}
                        name="stockQuantity"
                        label={<PillLabel>Stock Quantity</PillLabel>}
                        placeholder="Type your stock quantity"
                        type="number"
                        inputClassName={pillInputClassName}
                    />

                    <FormUpload
                        control={form.control}
                        name="images"
                        label={<PillLabel>Product Images</PillLabel>}
                        maxFiles={5}
                        accept="image/*"
                    />
                </form>
            </Container>

            <div className="sticky bottom-0 z-10 -mx-10 mt-2 border-y border-[#e5e8ea] bg-white px-10 py-8 shadow-[0_1px_1px_-0.5px_rgba(0,0,0,0.03),0_3px_3px_-1.5px_rgba(0,0,0,0.03),0_20px_20px_-12px_rgba(0,0,0,0.03)]">
                <div className="flex items-center gap-1.5">
                    <button
                        type="submit"
                        form={FORM_ID}
                        disabled={form.formState.isSubmitting}
                        className="flex h-14 flex-1 items-center justify-center rounded-full border-2 border-secondary-color bg-secondary-color text-xl font-bold text-white shadow-[inset_0_3px_3px_rgba(255,255,255,0.12)] transition-colors hover:bg-secondary-color/90 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {form.formState.isSubmitting ? "Updating..." : "Update Product"}
                    </button>
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="flex h-14 flex-1 items-center justify-center rounded-full border-2 border-[#e5e8ea] bg-[#f9fafb] text-xl font-bold text-[#d93f3f] shadow-[inset_0_3px_3px_rgba(255,255,255,0.12)] transition-colors hover:bg-[#f2f2f4]"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </>
    );
}
