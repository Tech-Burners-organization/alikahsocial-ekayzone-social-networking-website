"use client";

import { cn } from "@/lib/utils";
import { GOAL_OPTIONS, type PromoteGoal } from "../../_lib/types";

interface ChooseGoalStepProps {
    goal: PromoteGoal;
    onChange: (goal: PromoteGoal) => void;
}

export default function ChooseGoalStep({ goal, onChange }: ChooseGoalStepProps) {
    return (
        <div className="flex flex-col gap-2.5">
            {GOAL_OPTIONS.map((option) => {
                const selected = option.value === goal;
                const Icon = option.icon;

                return (
                    <button
                        key={option.value}
                        type="button"
                        onClick={() => onChange(option.value)}
                        className={cn(
                            "flex flex-col items-start gap-2 rounded-xl border bg-background p-2.5 text-left transition-colors",
                            selected ? "border-2 border-secondary-color" : "border border-border"
                        )}
                    >
                        <span className="flex size-8 items-center justify-center rounded-full bg-secondary-color text-white">
                            <Icon className="size-4" />
                        </span>
                        <span className="flex flex-col gap-0.5">
                            <span className="text-lg font-bold text-foreground">{option.title}</span>
                            <span className="text-sm font-semibold text-foreground">{option.subtitle}</span>
                        </span>
                        <span className="text-xs text-muted-foreground">{option.description}</span>
                    </button>
                );
            })}
        </div>
    );
}
