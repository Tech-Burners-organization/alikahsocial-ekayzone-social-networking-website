"use client";

import { useId, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export interface RadioOption {
    value: string;
    label: string;
    description?: string;
}

interface SettingsRadioCardProps {
    options: RadioOption[];
    defaultValue: string;
    name: string;
}

export default function SettingsRadioCard({ options, defaultValue, name }: SettingsRadioCardProps) {
    const [value, setValue] = useState(defaultValue);
    const groupId = useId();

    return (
        <RadioGroup
            name={name}
            value={value}
            onValueChange={(next) => setValue(next as string)}
            className="gap-0"
        >
            {options.map((option) => (
                <label
                    key={option.value}
                    htmlFor={`${groupId}-${option.value}`}
                    className="flex min-h-[71px] cursor-pointer items-center gap-1.5 border-b border-[#e5e8ea] p-1.5 last:border-b-0"
                >
                    <RadioGroupItem id={`${groupId}-${option.value}`} value={option.value} />
                    <span className="flex flex-col">
                        <span className="text-lg font-bold leading-7 text-[#1b1c1c]">{option.label}</span>
                        {option.description && (
                            <span className="text-sm font-medium text-[#5e6062]">{option.description}</span>
                        )}
                    </span>
                </label>
            ))}
        </RadioGroup>
    );
}
