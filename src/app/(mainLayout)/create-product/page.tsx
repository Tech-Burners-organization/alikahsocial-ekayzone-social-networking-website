"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Package, ChevronDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageWraper from "@/components/ui/CustomUi/PageWraper";
import Container from "@/components/ui/CustomUi/Container";
import { FormInput, FormSelect, FormTextarea, FormUpload } from "@/components/ui/CustomUi/ReuseForm/Form";
import { SelectItem } from "@/components/ui/select";
import { createProductSchema, type CreateProductFormValues } from "@/schemas/create";

export default function CreateProductPage() {
    const form = useForm<CreateProductFormValues>({
        resolver: zodResolver(createProductSchema),
        defaultValues: {
            title: "",
            sellingPrice: "",
            discountPrice: "",
            description: "",
            category: "",
            stockQuantity: "",
        },
    });

    return (
        <PageWraper title="Create Product">
            <Container className="flex flex-col gap-6">
                <form className="flex flex-col gap-5">
                    <FormInput
                        control={form.control}
                        name="title"
                        label="Product Title"
                        placeholder="Enter Product Title"
                        prefix={<Package className="size-4 text-base-color/60" />}
                    />

                    <FormInput
                        control={form.control}
                        name="sellingPrice"
                        label="Selling Price"
                        placeholder="Enter Selling Price"
                        prefix={<Package className="size-4 text-base-color/60" />}
                        type="number"
                    />

                    <FormInput
                        control={form.control}
                        name="discountPrice"
                        label="Discount Price (Optional)"
                        placeholder="Enter Discount Price"
                        prefix={<Package className="size-4 text-base-color/60" />}
                        type="number"
                    />

                    <FormTextarea
                        control={form.control}
                        name="description"
                        label="Product Description"
                        placeholder="Enter product Description"
                    />

                    <div className="flex items-center gap-2 rounded-md bg-blue-500/10 border border-blue-500/20 px-2 py-1 w-fit">
                        <Sparkles className="size-4 text-blue-500" />
                        <span className="text-xs font-bold text-blue-600">Write description with AI</span>
                        <div className="flex items-center justify-center rounded bg-amber-500 px-1.5">
                            <span className="text-[8px] font-bold text-white">PRO</span>
                        </div>
                    </div>

                    <FormSelect
                        control={form.control}
                        name="category"
                        label="Category"
                        placeholder="Select Category"
                        suffix={<ChevronDown className="size-4 text-base-color/60" />}
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
                        label="Stock Quantity"
                        placeholder="Type your stock quantity"
                        prefix={<Package className="size-4 text-base-color/60" />}
                        type="number"
                    />

                    <FormUpload
                        control={form.control}
                        name="images"
                        label="Product Images"
                        maxFiles={5}
                        accept="image/*"
                    />

                    <Button
                        className="w-full rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold h-14 text-lg shadow-sm"
                    >
                        Publish Product
                    </Button>

                    <div className="flex items-center gap-2 rounded bg-amber-50 border border-amber-200 px-4 py-3">
                        <p className="text-sm font-semibold text-amber-800">
                            Your listing will be <strong>active for 60 days free</strong>. You will be notified before it expires.
                        </p>
                    </div>
                </form>
            </Container>
        </PageWraper>
    );
}
