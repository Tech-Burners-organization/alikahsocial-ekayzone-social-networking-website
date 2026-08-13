"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ChevronDown } from "lucide-react";
import PageWraper from "@/components/ui/CustomUi/PageWraper";
import Container from "@/components/ui/CustomUi/Container";
import { FormInput, FormSelect, FormTextarea, FormUpload } from "@/components/ui/CustomUi/ReuseForm/Form";
import { SelectItem } from "@/components/ui/select";
import { createProductSchema, type CreateProductFormValues } from "@/schemas/create";
import { AiDescriptionChip } from "@/components/shared/create/AiDescriptionChip";
import { ListingNoticeBanner } from "@/components/shared/create/ListingNoticeBanner";
import { CreateSubmitBar } from "@/components/shared/create/CreateSubmitBar";
import CreationModal from "@/components/shared/create/CreationModal";
import { pillInputClassName, pillTextareaClassName, pillTriggerClassName, PillLabel } from "@/components/shared/create/formStyles";

const FORM_ID = "create-product-form";

export default function CreateProductPage() {
    const [launched, setLaunched] = useState(false);

    const form = useForm<CreateProductFormValues>({
        resolver: zodResolver(createProductSchema),
        defaultValues: {
            title: "",
            sellingPrice: "",
            discountPrice: "",
            description: "",
            category: "",
            stockQuantity: "",
            images: [],
        },
    });

    const onSubmit = form.handleSubmit(() => {
        setLaunched(true);
    });

    return (
        <PageWraper title="Create Product" backToPreviousPage>
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

                    <ListingNoticeBanner />
                </form>
            </Container>

            <CreateSubmitBar formId={FORM_ID} label="Publish Product" isSubmitting={form.formState.isSubmitting} />

            <CreationModal open={launched} onOpenChange={setLaunched} type="product-launched" />
        </PageWraper>
    );
}
