"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Briefcase, ChevronDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageWraper from "@/components/ui/CustomUi/PageWraper";
import Container from "@/components/ui/CustomUi/Container";
import { FormInput, FormSelect, FormTextarea, FormUpload } from "@/components/ui/CustomUi/ReuseForm/Form";
import { SelectItem } from "@/components/ui/select";
import { createServiceSchema, type CreateServiceFormValues } from "@/schemas/create";

export default function CreateServicePage() {
    const form = useForm<CreateServiceFormValues>({
        resolver: zodResolver(createServiceSchema),
        defaultValues: {
            title: "",
            price: "",
            description: "",
            category: "",
        },
    });

    return (
        <PageWraper title="Create Service">
            <Container className="flex flex-col gap-6">
                <form className="flex flex-col gap-5">
                    {/* Service Title */}
                    <FormInput
                        control={form.control}
                        name="title"
                        label="Service Title"
                        placeholder="Enter Service Title"
                        prefix={<Briefcase className="size-4 text-base-color/60" />}
                    />

                    {/* Service Price */}
                    <FormInput
                        control={form.control}
                        name="price"
                        label="Service Price"
                        placeholder="Enter Service Price"
                        prefix={<Briefcase className="size-4 text-base-color/60" />}
                        type="number"
                    />

                    {/* Description with AI chip */}
                    <FormTextarea
                        control={form.control}
                        name="description"
                        label="Service Description"
                        placeholder="Enter service Description"
                    />

                    <div className="flex items-center gap-2 rounded-md bg-blue-500/10 border border-blue-500/20 px-2 py-1 w-fit">
                        <Sparkles className="size-4 text-blue-500" />
                        <span className="text-xs font-bold text-blue-600">Write description with AI</span>
                        <div className="flex items-center justify-center rounded bg-amber-500 px-1.5">
                            <span className="text-[8px] font-bold text-white">PRO</span>
                        </div>
                    </div>

                    {/* Category */}
                    <FormSelect
                        control={form.control}
                        name="category"
                        label="Category"
                        placeholder="Select Category"
                        suffix={<ChevronDown className="size-4 text-base-color/60" />}
                    >
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="development">Development</SelectItem>
                        <SelectItem value="writing">Writing</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="consulting">Consulting</SelectItem>
                    </FormSelect>

                    {/* Service Images Upload */}
                    <FormUpload
                        control={form.control}
                        name="images"
                        label="Service Images"
                        maxFiles={5}
                        accept="image/*"
                    />

                    {/* Publish button */}
                    <Button
                        className="w-full rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold h-14 text-lg shadow-sm"
                    >
                        Publish Service
                    </Button>

                    {/* Info notice */}
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
