import Image from "next/image";
import { Check, CheckCheck, FileText, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ChatMessage, MessageStatus } from "../_lib/data";

const STATUS_LABEL: Record<MessageStatus, string> = {
    sent: "Sent",
    delivered: "Delivered",
    read: "Read",
};

function StatusRow({ status }: { status: MessageStatus }) {
    const Icon = status === "sent" ? Check : CheckCheck;
    return (
        <div className={cn("flex items-center gap-1 text-xs font-semibold", status === "read" ? "text-secondary-color" : "text-slate-500")}>
            <Icon className="size-4" />
            {STATUS_LABEL[status]}
        </div>
    );
}

export function MessageBubble({ message }: { message: ChatMessage }) {
    const isMine = message.sender === "me";

    return (
        <div className={cn("flex flex-col gap-1", isMine ? "items-end" : "items-start")}>
            {message.kind === "text" && (
                <div
                    className={cn(
                        "flex max-w-[460px] flex-col gap-1 rounded-2xl border p-3",
                        isMine ? "border-secondary-color bg-secondary-color text-white" : "border-slate-200 bg-white text-slate-800"
                    )}
                >
                    <p className="text-sm font-medium leading-5 whitespace-pre-wrap">{message.text}</p>
                    <span className={cn("self-end text-xs font-medium", isMine ? "text-white/80" : "text-slate-500")}>
                        {message.time}
                    </span>
                </div>
            )}

            {message.kind === "file" && (
                <div className="flex max-w-[460px] flex-col gap-1 rounded-2xl border border-slate-200 bg-white p-1">
                    <div className="flex w-full items-start gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3">
                        <FileText className="size-8 shrink-0 text-secondary-color" />
                        <div className="flex min-w-0 flex-1 flex-col gap-1">
                            <p className="truncate text-[16px] font-bold text-slate-800">{message.fileName}</p>
                            <p className="text-xs font-medium text-slate-500">
                                {message.fileSize} &bull; {message.fileExtension}
                            </p>
                        </div>
                    </div>
                    <span className="self-end px-2 pb-1 text-xs font-medium text-slate-500">{message.time}</span>
                </div>
            )}

            {message.kind === "audio" && (
                <div
                    className={cn(
                        "flex w-[280px] flex-col gap-2 rounded-2xl border p-3",
                        isMine ? "border-secondary-color bg-secondary-color text-white" : "border-slate-200 bg-white text-slate-800"
                    )}
                >
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            aria-label="Play audio message"
                            className={cn(
                                "flex size-8 shrink-0 items-center justify-center rounded-full",
                                isMine ? "bg-white text-secondary-color" : "bg-secondary-color text-white"
                            )}
                        >
                            <Play className="size-4 fill-current" />
                        </button>
                        <div className={cn("h-6 flex-1 rounded-full", isMine ? "bg-white/25" : "bg-slate-100")} aria-hidden />
                    </div>
                    <div className="flex items-center justify-between text-xs font-bold">
                        <span>{message.duration}</span>
                        <span className={cn("font-medium", isMine ? "text-white/80" : "text-slate-500")}>
                            {message.playedDuration}
                        </span>
                    </div>
                </div>
            )}

            {message.kind === "video" && (
                <div className="flex max-w-[460px] flex-col gap-1 rounded-2xl border border-slate-200 bg-white p-1">
                    <button
                        type="button"
                        aria-label="Play video message"
                        className="group relative h-[220px] w-full overflow-hidden rounded-xl border border-slate-200"
                    >
                        <Image
                            src={message.thumbnailUrl}
                            alt="Video message thumbnail"
                            fill
                            sizes="460px"
                            className="object-cover"
                        />
                        <span className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors group-hover:bg-black/20">
                            <span className="flex size-16 items-center justify-center rounded-full border border-white/30 bg-black/30 backdrop-blur-sm">
                                <Play className="size-8 fill-white text-white" />
                            </span>
                        </span>
                    </button>
                    <span className="self-end px-2 pb-1 text-xs font-medium text-slate-500">{message.time}</span>
                </div>
            )}

            {isMine && message.status && <StatusRow status={message.status} />}
        </div>
    );
}
