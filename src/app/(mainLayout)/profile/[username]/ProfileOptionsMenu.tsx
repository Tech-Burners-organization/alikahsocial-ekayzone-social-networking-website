"use client";

import { useState } from "react";
import { Flag, MoreVertical, ShieldOff } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BlockUserConfirmModal } from "@/components/shared/reels/BlockUserConfirmModal";
import { ReportModal } from "@/components/shared/reels/ReportModal";

export default function ProfileOptionsMenu({ username }: { username: string }) {
    const [reportOpen, setReportOpen] = useState(false);
    const [blockOpen, setBlockOpen] = useState(false);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger
                    className="flex size-10 items-center justify-center rounded-full bg-secondary-color/10 text-foreground transition-colors hover:bg-secondary-color/15"
                    aria-label="Profile options"
                >
                    <MoreVertical className="size-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                    <DropdownMenuItem onClick={() => setReportOpen(true)}>
                        <Flag />
                        Report Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem variant="destructive" onClick={() => setBlockOpen(true)}>
                        <ShieldOff />
                        Block User
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <ReportModal
                open={reportOpen}
                onOpenChange={setReportOpen}
                targetUsername={username}
                target="profile"
            />
            <BlockUserConfirmModal
                open={blockOpen}
                onOpenChange={setBlockOpen}
                targetUsername={username}
            />
        </>
    );
}
