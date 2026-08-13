"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ChevronDown, Radio } from "lucide-react";
import PageWraper from "@/components/ui/CustomUi/PageWraper";
import Container from "@/components/ui/CustomUi/Container";
import { FormInput, FormSelect } from "@/components/ui/CustomUi/ReuseForm/Form";
import { SelectItem } from "@/components/ui/select";
import { goLiveSchema, type GoLiveFormValues } from "@/schemas/create";
import { CameraPreviewBox } from "@/components/shared/create/CameraPreviewBox";
import { CreateSubmitBar } from "@/components/shared/create/CreateSubmitBar";
import { cn } from "@/lib/utils";
import { pillInputClassName, pillTriggerClassName, PillLabel } from "@/components/shared/create/formStyles";

const FORM_ID = "go-live-form";

export default function GoLivePage() {
    const router = useRouter();
    const form = useForm<GoLiveFormValues>({
        resolver: zodResolver(goLiveSchema),
        defaultValues: {
            streamTitle: "",
            category: "",
            promoteListing: "",
            privacy: "public",
        },
    });

    const privacy = form.watch("privacy");

    const onSubmit = form.handleSubmit(() => {
        router.push("/go-live/live");
    });

    return (
        <PageWraper title="Go Live" backToPreviousPage>
            <Container className="flex flex-col gap-6">
                <form id={FORM_ID} onSubmit={onSubmit} className="flex flex-col gap-4">
                    <FormInput
                        control={form.control}
                        name="streamTitle"
                        label={<PillLabel>Stream title</PillLabel>}
                        placeholder="Enter Subject"
                        inputClassName={pillInputClassName}
                    />

                    <FormSelect
                        control={form.control}
                        name="category"
                        label={<PillLabel>Category</PillLabel>}
                        placeholder="Select Category"
                        triggerClassName={pillTriggerClassName}
                        suffix={<ChevronDown className="size-4 text-muted-foreground" />}
                    >
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="entertainment">Entertainment</SelectItem>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="lifestyle">Lifestyle</SelectItem>
                        <SelectItem value="sports">Sports</SelectItem>
                    </FormSelect>

                    <FormSelect
                        control={form.control}
                        name="promoteListing"
                        label={<PillLabel>Promote a Listing (Optional)</PillLabel>}
                        placeholder="Select a listing to promote"
                        triggerClassName={pillTriggerClassName}
                        suffix={<ChevronDown className="size-4 text-muted-foreground" />}
                    >
                        <SelectItem value="none">No listing to promote</SelectItem>
                    </FormSelect>

                    <div className="flex flex-col gap-2.5">
                        <span className="text-sm font-semibold text-muted-foreground">Privacy</span>
                        <div className="flex gap-5">
                            <button
                                type="button"
                                onClick={() => form.setValue("privacy", "public", { shouldDirty: true })}
                                className={cn(
                                    "h-10 w-[191px] rounded-full border text-sm font-bold transition-colors",
                                    privacy === "public"
                                        ? "border-black/10 bg-secondary-color text-white shadow-sm"
                                        : "border-black/5 bg-white text-muted-foreground hover:bg-muted/50"
                                )}
                            >
                                Public
                            </button>
                            <button
                                type="button"
                                onClick={() => form.setValue("privacy", "followers-only", { shouldDirty: true })}
                                className={cn(
                                    "h-10 w-[191px] rounded-full border text-sm font-bold transition-colors",
                                    privacy === "followers-only"
                                        ? "border-black/10 bg-secondary-color text-white shadow-sm"
                                        : "border-black/5 bg-white text-muted-foreground hover:bg-muted/50"
                                )}
                            >
                                Followers Only
                            </button>
                        </div>
                    </div>

                    <CameraPreviewBox />
                </form>
            </Container>

            <CreateSubmitBar
                formId={FORM_ID}
                label="Go Live"
                variant="live"
                icon={<Radio className="size-5" />}
                isSubmitting={form.formState.isSubmitting}
            />
        </PageWraper>
    );
}
