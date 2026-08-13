"use client";

import ReusableModal from "@/components/ui/CustomUi/ReuseableModal";
import {
    Video,
    Upload,
    Radio,
    ShoppingBasket,
    HandPlatter,
    ChevronRight,
    X,
} from "lucide-react";
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
        icon: <Video className="size-6" style={{ color: "#10B981" }} />,
        bg: "#f0fdf4",
    },
    {
        id: "upload",
        title: "Upload Video",
        subtitle: "Choose a video from your device",
        icon: <Upload className="size-6" style={{ color: "#3DABE2" }} />,
        bg: "rgba(61,171,226,0.15)",
    },
    {
        id: "go-live",
        title: "Go Live",
        subtitle: "Start streaming to your audience now",
        icon: <Radio className="size-6" style={{ color: "#FF3366" }} />,
        bg: "rgba(255,51,102,0.15)",
    },
    {
        id: "product",
        title: "Create Product",
        subtitle: "List a physical item for sale",
        icon: <ShoppingBasket className="size-6" style={{ color: "#F59E0B" }} />,
        bg: "rgba(245,158,11,0.15)",
    },
    {
        id: "service",
        title: "Create Service",
        subtitle: "Offer your skills and get booked",
        icon: <HandPlatter className="size-6" style={{ color: "#663375" }} />,
        bg: "rgba(102,51,117,0.15)",
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
            title=""
            description=""
            maxWidth="sm:max-w-[447px]"
            footer={null}
            hideDefaultCloseButton
        >
            <div className="relative flex flex-col items-center gap-8 pt-1">
                <button
                    type="button"
                    onClick={() => onOpenChange(false)}
                    aria-label="Close"
                    className="absolute -top-3 right-0 flex size-10 items-center justify-center rounded-full border border-black/5 bg-secondary-color/10 shadow-sm transition-colors hover:bg-secondary-color/20"
                >
                    <X className="size-5 text-foreground" />
                </button>

                <div className="flex flex-col items-center gap-0.5 text-center">
                    <h2 className="text-xl font-extrabold text-foreground">Create</h2>
                    <p className="text-base text-muted-foreground">
                        Share your skills with the world
                    </p>
                </div>

                <div className="flex w-full flex-col gap-3">
                    {createOptions.map((option) => (
                        <button
                            key={option.id}
                            type="button"
                            onClick={() => onSelect(option.id)}
                            className={cn(
                                "flex items-center justify-between rounded-2xl border border-border bg-white p-3 text-left shadow-sm transition-colors hover:bg-muted/50"
                            )}
                        >
                            <div className="flex items-center gap-1.5">
                                <div
                                    className="flex size-12.75 shrink-0 items-center justify-center rounded-lg"
                                    style={{ backgroundColor: option.bg }}
                                >
                                    {option.icon}
                                </div>
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-lg font-bold text-foreground/80">
                                        {option.title}
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                        {option.subtitle}
                                    </span>
                                </div>
                            </div>
                            <ChevronRight className="size-6 shrink-0 text-foreground" />
                        </button>
                    ))}
                </div>
            </div>
        </ReusableModal>
    );
}
