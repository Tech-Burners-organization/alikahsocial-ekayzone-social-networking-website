"use client";

import ReusableModal from "@/components/ui/CustomUi/ReuseableModal";
import {
    Video,
    Upload,
    Radio,
    Package,
    Briefcase,
    X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CreateOption =
    | "video"
    | "upload"
    | "go-live"
    | "product"
    | "service";

interface CreateModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSelect: (option: CreateOption) => void;
}

const createOptions: {
    id: CreateOption;
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    bg: string;
}[] = [
    {
        id: "video",
        title: "Record Video",
        subtitle: "Film directly with your camera",
        icon: <Video className="size-6 text-emerald-600" />,
        bg: "bg-emerald-50",
    },
    {
        id: "upload",
        title: "Upload Video",
        subtitle: "Choose a video from your device",
        icon: <Upload className="size-6 text-sky-600" />,
        bg: "bg-sky-100/60",
    },
    {
        id: "go-live",
        title: "Go Live",
        subtitle: "Start streaming to your audience now",
        icon: <Radio className="size-6 text-rose-500" />,
        bg: "bg-rose-100/60",
    },
    {
        id: "product",
        title: "Create Product",
        subtitle: "List a physical item for sale",
        icon: <Package className="size-6 text-amber-600" />,
        bg: "bg-amber-100/60",
    },
    {
        id: "service",
        title: "Create Service",
        subtitle: "Offer your skills and get booked",
        icon: <Briefcase className="size-6 text-violet-600" />,
        bg: "bg-violet-100/60",
    },
];

export default function CreateModal({
    open,
    onOpenChange,
    onSelect,
}: CreateModalProps) {
    return (
        <ReusableModal
            open={open}
            onOpenChange={onOpenChange}
            title="Create"
            description="Share your skills with the world"
            maxWidth="sm:max-w-[500px]"
            footer={
                <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => onOpenChange(false)}
                >
                    Cancel
                </Button>
            }
        >
            <div className="flex flex-col gap-3">
                {createOptions.map((option) => (
                    <button
                        key={option.id}
                        type="button"
                        onClick={() => onSelect(option.id)}
                        className={cn(
                            "flex items-center gap-3 rounded-lg border border-base-color/30 bg-white p-3 transition-all hover:bg-base-color/5",
                            "text-left"
                        )}
                    >
                        <div
                            className={cn(
                                "flex size-11 shrink-0 items-center justify-center rounded-md",
                                option.bg
                            )}
                        >
                            {option.icon}
                        </div>
                        <div className="flex flex-1 flex-col gap-0.5">
                            <span className="text-base font-semibold text-[#313233]">
                                {option.title}
                            </span>
                            <span className="text-sm text-base-color/60">
                                {option.subtitle}
                            </span>
                        </div>
                        <X className="size-4 text-base-color/30" />
                    </button>
                ))}
            </div>
        </ReusableModal>
    );
}
