import Link from "next/link";
import { ChevronRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SettingsNavRowProps {
    label: string;
    icon: LucideIcon;
    href?: string;
    /** Renders a muted, non-interactive row without a chevron (e.g. "Version 1.0.0"). */
    isStatic?: boolean;
    tone?: "default" | "danger";
    /** Unread count shown as a red pill before the chevron. */
    badge?: number;
}

export default function SettingsNavRow({
    label,
    icon: Icon,
    href,
    isStatic,
    tone = "default",
    badge,
}: SettingsNavRowProps) {
    const content = (
        <>
            <span className="flex items-center gap-2">
                <Icon className="size-[18px] shrink-0" />
                <span className="text-lg font-semibold leading-7">{label}</span>
            </span>
            <span className="flex items-center gap-1.5">
                {badge !== undefined && (
                    <span className="flex size-[22px] items-center justify-center rounded-full bg-[#d93f3f] text-xs font-bold text-white">
                        {badge}
                    </span>
                )}
                {!isStatic && <ChevronRight className="size-5 shrink-0" />}
            </span>
        </>
    );

    const className = cn(
        "flex items-center justify-between px-0.5 py-1.5",
        tone === "danger" ? "text-[#d93f3f]" : "text-[#313233]",
        isStatic && "font-medium text-[#5e6062]",
        !isStatic && "rounded-lg transition-colors hover:text-secondary-color"
    );

    if (isStatic || !href) {
        return (
            <div className={cn(className, isStatic && "[&_span]:font-medium")}>{content}</div>
        );
    }

    return (
        <Link href={href} className={className}>
            {content}
        </Link>
    );
}
