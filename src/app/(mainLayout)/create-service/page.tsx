"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { ChevronDown, X } from "lucide-react";
import PageWraper from "@/components/ui/CustomUi/PageWraper";
import Container from "@/components/ui/CustomUi/Container";
import { FormInput, FormSelect, FormTextarea, FormUpload } from "@/components/ui/CustomUi/ReuseForm/Form";
import { SelectItem } from "@/components/ui/select";
import { createServiceSchema, type CreateServiceFormValues } from "@/schemas/create";
import { AiDescriptionChip } from "@/components/shared/create/AiDescriptionChip";
import { ListingNoticeBanner } from "@/components/shared/create/ListingNoticeBanner";
import { CreateSubmitBar } from "@/components/shared/create/CreateSubmitBar";
import CreationModal from "@/components/shared/create/CreationModal";
import { pillInputClassName, pillTextareaClassName, pillTriggerClassName, PillLabel } from "@/components/shared/create/formStyles";

const FORM_ID = "create-service-form";
const MAX_ADDITIONAL_PRICES = 3;

export default function CreateServicePage() {
    const [launched, setLaunched] = useState(false);

    const form = useForm<CreateServiceFormValues>({
        resolver: zodResolver(createServiceSchema),
        defaultValues: {
            title: "",
            price: "",
            additionalPrices: [],
            description: "",
            category: "",
            images: [],
        },
    });

    const additionalPrices = useFieldArray({
        control: form.control,
        name: "additionalPrices",
    });

    const onSubmit = form.handleSubmit(() => {
        setLaunched(true);
    });

    return (
        <PageWraper title="Create Service" backToPreviousPage>
            <Container className="flex flex-col gap-6">
                <form id={FORM_ID} onSubmit={onSubmit} className="flex flex-col gap-4">
                    <FormInput
                        control={form.control}
                        name="title"
                        label={<PillLabel>Service Title</PillLabel>}
                        placeholder="Enter Service Title"
                        inputClassName={pillInputClassName}
                    />

                    <div className="flex flex-col gap-2">
                        <FormInput
                            control={form.control}
                            name="price"
                            label={<PillLabel>Service Price</PillLabel>}
                            placeholder="Enter Service Price"
                            type="number"
                            inputClassName={pillInputClassName}
                        />

                        {additionalPrices.fields.map((field, index) => (
                            <div key={field.id} className="flex items-center gap-2">
                                <div className="flex-1">
                                    <FormInput
                                        control={form.control}
                                        name={`additionalPrices.${index}.value`}
                                        label={<PillLabel>Additional Price {index + 2}</PillLabel>}
                                        placeholder="Enter Price"
                                        type="number"
                                        inputClassName={pillInputClassName}
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => additionalPrices.remove(index)}
                                    aria-label="Remove price"
                                    className="flex size-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                                >
                                    <X className="size-4" />
                                </button>
                            </div>
                        ))}

                        {additionalPrices.fields.length < MAX_ADDITIONAL_PRICES && (
                            <button
                                type="button"
                                onClick={() => additionalPrices.append({ value: "" })}
                                className="flex h-6 w-fit items-center justify-center rounded-md bg-secondary-color px-1.5 text-xs font-bold text-white shadow-[0_0_0_3px_rgba(16,185,129,0.2)] transition-colors hover:bg-secondary-color/90"
                            >
                                Add More Price
                            </button>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <FormTextarea
                            control={form.control}
                            name="description"
                            label={<PillLabel>Service Description</PillLabel>}
                            placeholder="Enter service Description"
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
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="development">Development</SelectItem>
                        <SelectItem value="writing">Writing</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="consulting">Consulting</SelectItem>
                    </FormSelect>

                    <FormUpload
                        control={form.control}
                        name="images"
                        label={<PillLabel>Service Images</PillLabel>}
                        maxFiles={5}
                        accept="image/*"
                    />

                    <ListingNoticeBanner />
                </form>
            </Container>

            <CreateSubmitBar formId={FORM_ID} label="Publish Service" isSubmitting={form.formState.isSubmitting} />

            <CreationModal open={launched} onOpenChange={setLaunched} type="service-launched" />
        </PageWraper>
    );
}
