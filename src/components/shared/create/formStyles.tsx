import type { ReactNode } from "react";

/** Rounded "pill" chrome shared by the Create Product / Create Service / Go Live forms. */
export const pillInputClassName =
    "rounded-full! border! border-black/5! bg-input-color! h-14! px-4! shadow-none! focus:border-black/15!";

export const pillTriggerClassName =
    "rounded-full! border! border-black/5! bg-input-color! h-14! px-4! shadow-none! focus:border-black/15!";

export const pillTextareaClassName =
    "rounded-xl! border! border-black/5! bg-input-color! min-h-24! px-3! py-2.5! shadow-none! focus:border-black/15!";

export function PillLabel({ children }: { children: ReactNode }) {
    return <span className="text-xs font-medium text-muted-foreground">{children}</span>;
}
