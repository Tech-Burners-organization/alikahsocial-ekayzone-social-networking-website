"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IoChevronBackOutline } from "react-icons/io5";
import Container from "@/components/ui/CustomUi/Container";
import { cn } from "@/lib/utils";
import ChooseVideoStep from "./steps/ChooseVideoStep";
import ChooseGoalStep from "./steps/ChooseGoalStep";
import DefineAudienceStep from "./steps/DefineAudienceStep";
import ChooseBudgetStep from "./steps/ChooseBudgetStep";
import ReviewPayStep from "./steps/ReviewPayStep";
import CampaignLaunchedModal from "./CampaignLaunchedModal";
import {
    DEFAULT_CUSTOM_AUDIENCE,
    PROMOTE_STEPS,
    STEP_TITLES,
    type AudienceMode,
    type CustomAudience,
    type PromoteDuration,
    type PromoteGoal,
    type PromotePaymentMethod,
    type PromoteStep,
} from "../_lib/types";
import type { MyVideo } from "../../../_lib/data";

interface PromoteWizardProps {
    videos: MyVideo[];
    initialVideoId: string;
}

export default function PromoteWizard({ videos, initialVideoId }: PromoteWizardProps) {
    const router = useRouter();

    const [step, setStep] = useState<PromoteStep>("video");
    const [selectedVideoId, setSelectedVideoId] = useState(initialVideoId);
    const [goal, setGoal] = useState<PromoteGoal>("views");
    const [audienceMode, setAudienceMode] = useState<AudienceMode>("automatic");
    const [customAudience, setCustomAudience] = useState<CustomAudience>(DEFAULT_CUSTOM_AUDIENCE);
    const [dailyBudget, setDailyBudget] = useState(100);
    const [duration, setDuration] = useState<PromoteDuration>(3);
    const [paymentMethod, setPaymentMethod] = useState<PromotePaymentMethod>("payfast");
    const [launched, setLaunched] = useState(false);

    const selectedVideo = videos.find((video) => video.id === selectedVideoId) ?? videos[0];
    const stepIndex = PROMOTE_STEPS.indexOf(step);
    const progressSteps = PROMOTE_STEPS.slice(0, -1);

    const goToStep = (next: PromoteStep) => {
        setStep(next);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleBack = () => {
        if (step === "video") {
            router.push(`/profile/video/${initialVideoId}`);
            return;
        }
        goToStep(PROMOTE_STEPS[stepIndex - 1]);
    };

    const handlePrimaryAction = () => {
        if (step === "review") {
            setLaunched(true);
            return;
        }
        goToStep(PROMOTE_STEPS[stepIndex + 1]);
    };

    const primaryLabel = step === "review" ? "Launch Campaign" : "Promote Video";

    return (
        <div>
            <Container>
                <div className="flex flex-col gap-6 py-6">
                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            onClick={handleBack}
                            aria-label="Go back"
                            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary-color text-white transition-colors hover:bg-secondary-color/90"
                        >
                            <IoChevronBackOutline className="size-4" />
                        </button>
                        <h1 className="text-2xl font-bold text-foreground">Promote</h1>
                    </div>

                    <div className="flex flex-col items-center gap-4">
                        <h2 className="text-center text-2xl font-bold text-foreground">{STEP_TITLES[step]}</h2>

                        {step !== "review" && (
                            <div className="flex w-full max-w-md gap-1">
                                {progressSteps.map((progressStep, index) => (
                                    <span
                                        key={progressStep}
                                        className={cn(
                                            "h-2 flex-1 rounded-full bg-secondary-color",
                                            index > stepIndex && "opacity-30"
                                        )}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="mx-auto w-full max-w-2xl">
                        {step === "video" && (
                            <ChooseVideoStep videos={videos} selectedId={selectedVideoId} onSelect={setSelectedVideoId} />
                        )}
                        {step === "goal" && <ChooseGoalStep goal={goal} onChange={setGoal} />}
                        {step === "audience" && (
                            <DefineAudienceStep
                                mode={audienceMode}
                                onModeChange={setAudienceMode}
                                customAudience={customAudience}
                                onCustomAudienceChange={(patch) =>
                                    setCustomAudience((prev) => ({ ...prev, ...patch }))
                                }
                            />
                        )}
                        {step === "budget" && (
                            <ChooseBudgetStep
                                dailyBudget={dailyBudget}
                                onDailyBudgetChange={setDailyBudget}
                                duration={duration}
                                onDurationChange={setDuration}
                            />
                        )}
                        {step === "review" && selectedVideo && (
                            <ReviewPayStep
                                video={selectedVideo}
                                goal={goal}
                                audienceMode={audienceMode}
                                dailyBudget={dailyBudget}
                                duration={duration}
                                paymentMethod={paymentMethod}
                                onPaymentMethodChange={setPaymentMethod}
                            />
                        )}
                    </div>
                </div>
            </Container>

            <div className="sticky bottom-0 z-10 -mx-6 mt-2 border-t border-border bg-background px-6 py-4 shadow-[0_-4px_12px_rgba(0,0,0,0.04)] md:-mx-10 md:px-10">
                <div className="mx-auto max-w-2xl">
                    <button
                        type="button"
                        onClick={handlePrimaryAction}
                        className="h-14 w-full rounded-full border-2 border-secondary-color bg-secondary-color text-xl font-bold text-white shadow-[inset_0_3px_3px_rgba(255,255,255,0.12)] transition-colors hover:bg-secondary-color/90"
                    >
                        {primaryLabel}
                    </button>
                </div>
            </div>

            <CampaignLaunchedModal
                open={launched}
                onOpenChange={(open) => {
                    setLaunched(open);
                    if (!open) router.push(`/profile/video/${selectedVideoId}`);
                }}
            />
        </div>
    );
}
