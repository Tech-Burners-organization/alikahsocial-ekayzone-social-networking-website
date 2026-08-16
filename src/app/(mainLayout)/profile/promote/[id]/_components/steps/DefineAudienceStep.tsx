"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { formatCompactNumber } from "@/lib/format";
import { estimateAudienceSize } from "../../_lib/estimate";
import {
    LOCATION_SUGGESTIONS,
    type AudienceGender,
    type AudienceMode,
    type CustomAudience,
} from "../../_lib/types";

const GENDER_OPTIONS: { value: AudienceGender; label: string }[] = [
    { value: "all", label: "All Genders" },
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
];

interface DefineAudienceStepProps {
    mode: AudienceMode;
    onModeChange: (mode: AudienceMode) => void;
    customAudience: CustomAudience;
    onCustomAudienceChange: (patch: Partial<CustomAudience>) => void;
}

export default function DefineAudienceStep({
    mode,
    onModeChange,
    customAudience,
    onCustomAudienceChange,
}: DefineAudienceStepProps) {
    const [locationQuery, setLocationQuery] = useState("");

    const suggestions = useMemo(() => {
        const q = locationQuery.trim().toLowerCase();
        return LOCATION_SUGGESTIONS.filter(
            (place) => !customAudience.locations.includes(place) && (!q || place.toLowerCase().includes(q))
        );
    }, [locationQuery, customAudience.locations]);

    const [audienceMin, audienceMax] = estimateAudienceSize(
        mode === "custom" ? customAudience.gender : "all",
        mode === "custom" ? customAudience.locations.length : 0
    );

    const addLocation = (place: string) => {
        onCustomAudienceChange({ locations: [...customAudience.locations, place] });
        setLocationQuery("");
    };

    const removeLocation = (place: string) => {
        onCustomAudienceChange({ locations: customAudience.locations.filter((item) => item !== place) });
    };

    return (
        <div className="flex flex-col gap-2.5">
            <button
                type="button"
                onClick={() => onModeChange("automatic")}
                className={cn(
                    "flex flex-col items-start gap-1 rounded-xl border bg-background p-2.5 text-left transition-colors",
                    mode === "automatic" ? "border-2 border-secondary-color" : "border border-border"
                )}
            >
                <span className="flex items-center gap-1.5">
                    <span className="text-lg font-bold text-foreground">Automatic Audience</span>
                    <span className="rounded-xl bg-[#f59e0b] px-1.5 py-0.5 text-xs font-bold text-white">Recommended</span>
                </span>
                <span className="text-sm text-muted-foreground">
                    Our AI will find the best audience for your video based on its content and your goal. No setup needed.
                </span>
            </button>

            <button
                type="button"
                onClick={() => onModeChange("custom")}
                className={cn(
                    "flex flex-col items-start gap-1 rounded-xl border bg-background p-2.5 text-left transition-colors",
                    mode === "custom" ? "border-2 border-secondary-color" : "border border-border"
                )}
            >
                <span className="text-lg font-bold text-foreground">Custom Audience</span>
                <span className="text-sm text-muted-foreground">Choose exactly who sees your video.</span>
            </button>

            {mode === "custom" && (
                <div className="flex flex-col gap-4 rounded-xl border border-border bg-background p-2.5">
                    <div className="flex flex-col gap-3">
                        <span className="text-sm font-semibold text-muted-foreground">Age Range</span>
                        <Slider
                            value={customAudience.ageRange}
                            onValueChange={(next) => onCustomAudienceChange({ ageRange: next as [number, number] })}
                            min={13}
                            max={65}
                            minStepsBetweenValues={1}
                        />
                        <div className="flex items-center justify-between text-sm font-medium text-foreground">
                            <span>{customAudience.ageRange[0]}</span>
                            <span>{customAudience.ageRange[1]}</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <span className="text-sm font-semibold text-muted-foreground">Gender</span>
                        <div className="flex flex-wrap gap-1.5">
                            {GENDER_OPTIONS.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => onCustomAudienceChange({ gender: option.value })}
                                    className={cn(
                                        "h-10 rounded-full border px-4 text-sm font-bold transition-colors",
                                        customAudience.gender === option.value
                                            ? "border-black/10 bg-secondary-color text-white shadow-sm"
                                            : "border-black/5 bg-white text-muted-foreground hover:bg-muted/50"
                                    )}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <span className="text-sm font-semibold text-muted-foreground">Location</span>

                        {customAudience.locations.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                                {customAudience.locations.map((place) => (
                                    <span
                                        key={place}
                                        className="flex items-center gap-1 rounded-xl border border-secondary-color/40 bg-secondary-color/10 px-1.5 py-1 text-xs font-bold text-secondary-color"
                                    >
                                        {place}
                                        <button type="button" onClick={() => removeLocation(place)} aria-label={`Remove ${place}`}>
                                            <X className="size-3" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}

                        <div className="relative">
                            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                value={locationQuery}
                                onChange={(event) => setLocationQuery(event.target.value)}
                                placeholder="Search Locations"
                                className="h-12 rounded-full border-none bg-muted pl-10 text-sm"
                            />
                        </div>

                        {locationQuery && suggestions.length > 0 && (
                            <div className="flex flex-col divide-y divide-border rounded-xl border border-border">
                                {suggestions.map((place) => (
                                    <button
                                        key={place}
                                        type="button"
                                        onClick={() => addLocation(place)}
                                        className="px-3 py-2 text-left text-sm font-medium text-foreground hover:bg-muted"
                                    >
                                        {place}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className="flex flex-col gap-1 rounded-xl border border-border bg-background px-2.5 py-4">
                <span className="text-sm text-muted-foreground">Estimated audience size</span>
                <span className="text-lg font-bold text-foreground">
                    {formatCompactNumber(audienceMin)} – {formatCompactNumber(audienceMax)} people
                </span>
            </div>
        </div>
    );
}
