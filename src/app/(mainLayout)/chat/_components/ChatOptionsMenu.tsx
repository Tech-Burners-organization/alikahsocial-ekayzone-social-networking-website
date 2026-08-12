"use client";

import { useState } from "react";
import { EllipsisVertical, Flag, ShieldOff, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BlockUserConfirmModal } from "@/components/shared/reels/BlockUserConfirmModal";
import { ReportModal } from "@/components/shared/reels/ReportModal";

export function ChatOptionsMenu({ contactName, contactHandle }: { contactName: string; contactHandle: string }) {
    const [blockOpen, setBlockOpen] = useState(false);
    const [reportOpen, setReportOpen] = useState(false);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger
                    className="flex size-10 shrink-0 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                    aria-label="Conversation options"
                >
                    <EllipsisVertical className="size-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => toast.success(`Chat with ${contactName} cleared`)}>
                        <Trash2 />
                        Clear chat
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setReportOpen(true)}>
                        <Flag />
                        Report
                    </DropdownMenuItem>
                    <DropdownMenuItem variant="destructive" onClick={() => setBlockOpen(true)}>
                        <ShieldOff />
                        Block user
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <BlockUserConfirmModal
                open={blockOpen}
                onOpenChange={setBlockOpen}
                targetUsername={contactHandle.replace(/^@/, "")}
            />
            <ReportModal
                open={reportOpen}
                onOpenChange={setReportOpen}
                targetUsername={contactHandle.replace(/^@/, "")}
                target="chat"
            />
        </>
    );
}
