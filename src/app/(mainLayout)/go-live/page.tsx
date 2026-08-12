"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Camera, ChevronDown, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageWraper from "@/components/ui/CustomUi/PageWraper";
import Container from "@/components/ui/CustomUi/Container";
import { FormInput, FormSelect } from "@/components/ui/CustomUi/ReuseForm/Form";
import {
    SelectItem,
} from "@/components/ui/select";
import { goLiveSchema, type GoLiveFormValues } from "@/schemas/create";

export default function GoLivePage() {
    const form = useForm<GoLiveFormValues>({
        resolver: zodResolver(goLiveSchema),
        defaultValues: {
            streamTitle: "",
            category: "",
            promoteListing: "",
            privacy: "public",
        },
    });

    return (
        <PageWraper title="Go Live">
            <Container className="flex flex-col gap-6">
                <form className="flex flex-col gap-5">
                    <FormInput
                        control={form.control}
                        name="streamTitle"
                        label="Stream Title"
                        placeholder="Enter Subject"
                        prefix={<Camera className="size-4 text-base-color/60" />}
                    />

                    <FormSelect
                        control={form.control}
                        name="category"
                        label="Category"
                        placeholder="Select Category"
                        suffix={<ChevronDown className="size-4 text-base-color/60" />}
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
                        label="Promote a Listing (Optional)"
                        placeholder="Select a listing to promote"
                        suffix={<ChevronDown className="size-4 text-base-color/60" />}
                    >
                        <SelectItem value="none">No listing to promote</SelectItem>
                    </FormSelect>

                    {/* Privacy */}
                    <div className="flex flex-col gap-3">
                        <span className="text-sm font-semibold text-base-color/60">Privacy</span>
                        <div className="flex gap-5">
                            <button
                                type="button"
                                className="flex items-center gap-2 rounded-full px-4 py-2 bg-emerald-500 border border-emerald-500 text-white shadow-sm"
                            >
                                <span className="text-sm font-semibold">Public</span>
                            </button>
                            <button
                                type="button"
                                className="flex items-center gap-2 rounded-full px-4 py-2 bg-white border border-base-color/30 text-base-color/60 hover:bg-base-color/5"
                            >
                                <span className="text-sm font-semibold">Followers Only</span>
                            </button>
                        </div>
                    </div>

                    {/* Camera Preview */}
                    <div className="rounded-lg bg-base-color/50 border border-base-color/30 flex items-center justify-center" style={{ height: "300px" }}>
                        <div className="flex flex-col items-center gap-3">
                            <div className="rounded-lg bg-rose-100/60 p-6">
                                <Camera className="size-8 text-rose-500" />
                            </div>
                            <div className="text-center">
                                <p className="text-lg font-bold text-[#0c0c0c]">Camera Preview</p>
                                <p className="text-sm text-base-color/60">Tap to enable Camera</p>
                            </div>
                        </div>
                    </div>

                    <Button
                        className="w-full rounded-full bg-rose-500 hover:bg-rose-600 text-white font-bold h-14 text-lg shadow-sm"
                    >
                        <Radio className="size-5 mr-2" />
                        Go Live
                    </Button>
                </form>
            </Container>
        </PageWraper>
    );
}
