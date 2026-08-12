import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { formatCompactNumber } from "@/lib/format";
import ChatSearchInput from "./ChatSearchInput";
import type { Conversation, PresenceStatus } from "../_lib/data";

const PRESENCE_DOT: Record<PresenceStatus, string> = {
    online: "bg-emerald-500",
    busy: "bg-rose-500",
    offline: "bg-slate-300",
};

function conversationHref(id: string, search: string) {
    const params = new URLSearchParams();
    params.set("c", id);
    if (search) params.set("search", search);
    return `/chat?${params.toString()}`;
}

export function ConversationListPanel({
    conversations,
    search,
    selectedId,
}: {
    conversations: Conversation[];
    search: string;
    selectedId?: string;
}) {
    return (
        <div className="flex h-full min-h-0 flex-col">
            <div className="flex flex-col gap-6 px-4 pb-4 pt-6">
                <h1 className="text-[28px] font-bold text-foreground">Message</h1>
                <ChatSearchInput defaultValue={search} />
            </div>

            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto scrollbar-none">
                {conversations.length === 0 ? (
                    <p className="px-4 py-8 text-center text-sm text-slate-500">
                        No conversations match &ldquo;{search}&rdquo;
                    </p>
                ) : (
                    conversations.map((conversation) => {
                        const isActive = conversation.id === selectedId;
                        return (
                            <Link
                                key={conversation.id}
                                href={conversationHref(conversation.id, search)}
                                scroll={false}
                                className={cn(
                                    "flex items-start gap-3 border-b border-t border-slate-200 p-4 transition-colors first:border-t-0 hover:bg-slate-50",
                                    isActive && "bg-emerald-50 hover:bg-emerald-50"
                                )}
                            >
                                <div className="relative size-12 shrink-0">
                                    <Image
                                        src={conversation.avatarUrl}
                                        alt={conversation.name}
                                        fill
                                        sizes="48px"
                                        className="rounded-full object-cover"
                                    />
                                    <span
                                        className={cn(
                                            "absolute bottom-0 right-0 size-3 rounded-full border-[1.5px] border-white",
                                            PRESENCE_DOT[conversation.presence]
                                        )}
                                    />
                                </div>

                                <div className="flex min-w-0 flex-1 flex-col gap-1">
                                    <div className="flex items-center gap-1">
                                        <p className="min-w-0 flex-1 truncate text-[16px] font-bold text-slate-800">
                                            {conversation.name}
                                        </p>
                                        <span className="shrink-0 text-sm font-medium text-slate-400">
                                            {conversation.lastMessageTime}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <p className="min-w-0 flex-1 truncate text-sm font-medium text-slate-600">
                                            {conversation.lastMessagePreview}
                                        </p>
                                        {conversation.unreadCount ? (
                                            <span className="flex shrink-0 items-center justify-center rounded-full bg-secondary-color px-1.5 py-0.5 text-[11px] font-bold leading-none text-white">
                                                {formatCompactNumber(conversation.unreadCount)}
                                            </span>
                                        ) : null}
                                    </div>
                                </div>
                            </Link>
                        );
                    })
                )}
            </div>
        </div>
    );
}
