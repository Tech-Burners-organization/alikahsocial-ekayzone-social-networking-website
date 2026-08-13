"use client";

import { ChevronLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    FormInput,
    FormSelect,
    FormTextarea,
} from "@/components/ui/CustomUi/ReuseForm/Form";
import { SelectItem } from "@/components/ui/select";
import {
    deliveryDetailsSchema,
    type DeliveryDetailsFormValues,
} from "@/schemas/checkout";
import { SOUTH_AFRICA_PROVINCES } from "../_lib/types";
import {
    pillInputClassName,
    PillLabel,
    pillTextareaClassName,
    pillTriggerClassName,
} from "@/components/shared/create/formStyles";

interface DeliveryFormProps {
    defaultValues: DeliveryDetailsFormValues;
    onBack: () => void;
    onContinue: (values: DeliveryDetailsFormValues) => void;
}

export default function DeliveryForm({
    defaultValues,
    onBack,
    onContinue,
}: DeliveryFormProps) {
    const { control, handleSubmit } = useForm<DeliveryDetailsFormValues>({
        resolver: zodResolver(deliveryDetailsSchema),
        defaultValues,
    });

    return (
        <form onSubmit={handleSubmit(onContinue)} className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
                <button
                    type="button"
                    onClick={onBack}
                    aria-label="Go back"
                    className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary-color text-white transition-colors hover:bg-secondary-color/90"
                >
                    <ChevronLeft className="size-5" />
                </button>
                <h1 className="text-2xl font-bold text-foreground">
                    Delivery Information
                </h1>
            </div>

            <div className="flex flex-col gap-4">
                <FormInput
                    control={control}
                    name="fullName"
                    label={<PillLabel>Full Name</PillLabel>}
                    inputClassName={pillInputClassName}
                    placeholder="Enter your full name"
                />
                <FormInput
                    control={control}
                    name="phone"
                    label={<PillLabel>Phone Number</PillLabel>}
                    inputClassName={pillInputClassName}
                    placeholder="Enter your phone number"
                    type="tel"
                />
                <FormInput
                    control={control}
                    name="streetAddress1"
                    label={<PillLabel>Street Address</PillLabel>}
                    inputClassName={pillInputClassName}
                    placeholder="Enter your street address"
                />
                <FormInput
                    control={control}
                    name="streetAddress2"
                    label={<PillLabel>Street Address 2</PillLabel>}
                    inputClassName={pillInputClassName}
                    placeholder="Apartment, suite, etc. (optional)"
                />
                <FormInput
                    control={control}
                    name="city"
                    label={<PillLabel>City</PillLabel>}
                    inputClassName={pillInputClassName}
                    placeholder="Enter your city"
                />

                <div className="flex flex-col gap-4 sm:flex-row">
                    <div className="flex-1">
                        <FormSelect
                            control={control}
                            name="province"
                            label={<PillLabel>Province</PillLabel>}
                            placeholder="Select a province"
                            triggerClassName={pillTriggerClassName}
                        >
                            {SOUTH_AFRICA_PROVINCES.map((province) => (
                                <SelectItem key={province} value={province}>
                                    {province}
                                </SelectItem>
                            ))}
                        </FormSelect>
                    </div>
                    <div className="flex-1">
                        <FormInput
                            control={control}
                            name="postalCode"
                            label={<PillLabel>Postal Code</PillLabel>}
                            inputClassName={pillInputClassName}
                            placeholder="Enter your postal code"
                        />
                    </div>
                </div>

                <FormTextarea
                    control={control}
                    name="note"
                    label={<PillLabel>Note (Optional)</PillLabel>}
                    inputClassName={pillTextareaClassName}
                    placeholder="Enter any special delivery instructions here"
                />
            </div>

            <button
                type="submit"
                className="h-14 w-full rounded-full border-2 border-secondary-color bg-secondary-color text-xl font-bold text-white shadow-[inset_0_3px_3px_rgba(255,255,255,0.12)] transition-colors hover:bg-secondary-color/90"
            >
                Continue
            </button>
        </form>
    );
}
