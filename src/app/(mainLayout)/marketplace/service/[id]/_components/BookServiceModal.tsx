"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import ReusableModal from "@/components/ui/CustomUi/ReuseableModal";
import { FormSelect, FormDatePicker, FormTimePicker } from "@/components/ui/CustomUi/ReuseForm/Form";
import { SelectItem } from "@/components/ui/select";
import { bookServiceSchema, type BookServiceFormValues } from "@/schemas/marketplace";
import type { ServiceDetail } from "../_lib/data";

interface BookServiceModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    service: ServiceDetail;
}

export default function BookServiceModal({ open, onOpenChange, service }: BookServiceModalProps) {
    const form = useForm<BookServiceFormValues>({
        resolver: zodResolver(bookServiceSchema),
        defaultValues: {
            pricingLabel: service.pricing[0]?.label ?? "",
        },
    });

    const onSubmit = form.handleSubmit((values) => {
        toast.success(`Booked "${values.pricingLabel}" with ${service.seller}`, {
            description: `${values.date.toLocaleDateString()} at ${values.time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`,
        });
        form.reset();
        onOpenChange(false);
    });

    return (
        <ReusableModal
            open={open}
            onOpenChange={onOpenChange}
            title="Book Service"
            description={service.title}
            maxWidth="sm:max-w-md"
            footer={
                <button
                    type="submit"
                    form="book-service-form"
                    className="h-12 w-full rounded-full bg-secondary-color text-base font-bold text-white transition-colors hover:bg-secondary-color/90"
                >
                    Confirm Booking
                </button>
            }
        >
            <form id="book-service-form" onSubmit={onSubmit} className="flex flex-col gap-4">
                <FormSelect control={form.control} name="pricingLabel" label="Service" placeholder="Select a service">
                    {service.pricing.map((tier) => (
                        <SelectItem key={tier.label} value={tier.label}>
                            {tier.label} — {service.currency}
                            {tier.price}
                        </SelectItem>
                    ))}
                </FormSelect>

                <FormDatePicker control={form.control} name="date" label="Preferred Date" disablePast />

                <FormTimePicker control={form.control} name="time" label="Preferred Time" />
            </form>
        </ReusableModal>
    );
}
