"use client";

import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Camera, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import {
    FormDatePicker,
    FormInput,
    FormSelect,
    FormTextarea,
} from "@/components/ui/CustomUi/ReuseForm/Form";
import { SelectItem } from "@/components/ui/select";
import { editProfileSchema, type EditProfileFormValues } from "@/schemas/create";
import {
    PillLabel,
    pillInputClassName,
    pillTextareaClassName,
    pillTriggerClassName,
} from "@/components/shared/create/formStyles";
import SettingsSubmitBar from "../../_components/SettingsSubmitBar";

interface EditProfileFormProps {
    fullName: string;
    userName: string;
    bio: string;
    avatarUrl: string;
}

const FORM_ID = "edit-profile-form";

/** Takes discrete fields rather than the profile object — email and phone never cross the boundary. */
export default function EditProfileForm({
    fullName,
    userName,
    bio,
    avatarUrl,
}: EditProfileFormProps) {
    const form = useForm<EditProfileFormValues>({
        resolver: zodResolver(editProfileSchema),
        defaultValues: {
            displayName: fullName,
            userName: `@${userName}`,
            dateOfBirth: new Date(1996, 10, 11),
            gender: "male",
            bio,
        },
    });

    const onSubmit = form.handleSubmit(() => {
        toast.success("Profile updated");
    });

    return (
        <>
            <div className="flex flex-col gap-6">
                <button
                    type="button"
                    onClick={() => toast.info("Choose a new profile photo")}
                    className="group relative size-30 shrink-0 overflow-hidden rounded-full bg-muted"
                    aria-label="Change profile photo"
                >
                    <Image
                        src={avatarUrl}
                        alt={fullName}
                        fill
                        sizes="120px"
                        className="object-cover"
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                        <Camera className="size-6 text-white" />
                    </span>
                </button>

                <form id={FORM_ID} onSubmit={onSubmit} className="flex flex-col gap-4">
                    <FormInput
                        control={form.control}
                        name="displayName"
                        label={<PillLabel>Display Name</PillLabel>}
                        placeholder="Enter your display name"
                        inputClassName={pillInputClassName}
                    />

                    <FormInput
                        control={form.control}
                        name="userName"
                        label={<PillLabel>Username</PillLabel>}
                        placeholder="Enter your username"
                        inputClassName={pillInputClassName}
                    />

                    <FormDatePicker
                        control={form.control}
                        name="dateOfBirth"
                        label={<PillLabel>Date of Birth</PillLabel>}
                        placeholder="Select your date of birth"
                        formatString="dd/MM/yy"
                    />

                    <FormSelect
                        control={form.control}
                        name="gender"
                        label={<PillLabel>Gender</PillLabel>}
                        placeholder="Select Gender"
                        triggerClassName={pillTriggerClassName}
                        suffix={<ChevronDown className="size-4 text-muted-foreground" />}
                    >
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </FormSelect>

                    <FormTextarea
                        control={form.control}
                        name="bio"
                        label={<PillLabel>Bio</PillLabel>}
                        placeholder="Tell people about yourself"
                        inputClassName={pillTextareaClassName}
                    />
                </form>
            </div>

            <SettingsSubmitBar
                formId={FORM_ID}
                label="Save Changes"
                isSubmitting={form.formState.isSubmitting}
            />
        </>
    );
}
