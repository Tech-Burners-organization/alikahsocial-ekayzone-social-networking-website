"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { FormTextarea, FormUpload } from "@/components/ui/CustomUi/ReuseForm/Form";
import { feedbackSchema, type FeedbackFormValues } from "@/schemas/create";
import { PillLabel, pillTextareaClassName } from "@/components/shared/create/formStyles";
import { cn } from "@/lib/utils";
import SettingsSubmitBar from "../../../_components/SettingsSubmitBar";
import { FEEDBACK_OPTIONS } from "../../../_lib/data";

const FORM_ID = "feedback-form";

export default function FeedbackForm() {
    const router = useRouter();

    const form = useForm<FeedbackFormValues>({
        resolver: zodResolver(feedbackSchema),
        defaultValues: { sentiment: "", message: "", screenshot: [] },
    });

    const onSubmit = form.handleSubmit(() => {
        toast.success("Thanks for your feedback");
        router.push("/settings/help-centre");
    });

    return (
        <>
            <form id={FORM_ID} onSubmit={onSubmit} className="flex flex-col gap-5">
                <Controller
                    control={form.control}
                    name="sentiment"
                    render={({ field, fieldState }) => (
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-wrap items-center gap-4" role="radiogroup">
                                {FEEDBACK_OPTIONS.map((option) => {
                                    const isSelected = field.value === option.value;

                                    return (
                                        <button
                                            key={option.value}
                                            type="button"
                                            role="radio"
                                            aria-checked={isSelected}
                                            onClick={() => field.onChange(option.value)}
                                            className={cn(
                                                "flex h-[79px] w-[90px] flex-col items-center justify-center gap-1.5 rounded-xl border bg-white transition-colors",
                                                isSelected
                                                    ? "border-secondary-color ring-2 ring-secondary-color/30"
                                                    : "border-[#e5e8ea] hover:border-secondary-color/40"
                                            )}
                                        >
                                            <span className="text-[28px] leading-none">{option.emoji}</span>
                                            <span className="text-sm font-bold text-[#1b1c1c]">
                                                {option.label}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                            {fieldState.error && (
                                <p className="text-sm text-destructive">{fieldState.error.message}</p>
                            )}
                        </div>
                    )}
                />

                <FormTextarea
                    control={form.control}
                    name="message"
                    label={<PillLabel>Your Feedback</PillLabel>}
                    placeholder="Tell us what you think."
                    inputClassName={pillTextareaClassName}
                />

                <FormUpload
                    control={form.control}
                    name="screenshot"
                    label={
                        <span className="text-sm font-bold text-[#5e6062]">
                            Screenshot <span className="font-medium">(Optional)</span>
                        </span>
                    }
                    maxFiles={1}
                    accept="image/*"
                />
            </form>

            <SettingsSubmitBar
                formId={FORM_ID}
                label="Send Feedback"
                isSubmitting={form.formState.isSubmitting}
            />
        </>
    );
}
