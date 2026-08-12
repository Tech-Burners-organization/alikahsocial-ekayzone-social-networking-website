"use client";

import { useEffect, useRef, useState } from "react";
import { ConversationHeader } from "./ConversationHeader";
import { MessageBubble } from "./MessageBubble";
import { MessageComposer } from "./MessageComposer";
import type { ChatMessage, Conversation, MessageGroup } from "../_lib/data";

function formatTime(date: Date) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function ConversationPanel({
    conversation,
    initialGroups,
}: {
    conversation: Conversation;
    initialGroups: MessageGroup[];
}) {
    // The parent remounts this component (via `key={conversation.id}`) whenever
    // the selected conversation changes, so local state naturally resets to
    // that contact's history instead of carrying over a stale thread.
    const [groups, setGroups] = useState(initialGroups);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
    }, [groups]);

    const handleSend = (text: string) => {
        // TODO: wire to the real messaging API once it exists — this only
        // simulates the send optimistically in local state.
        console.log("[ConversationPanel] send message", { conversationId: conversation.id, text });

        const message: ChatMessage = {
            id: `local-${Date.now()}`,
            kind: "text",
            sender: "me",
            time: formatTime(new Date()),
            status: "sent",
            text,
        };

        setGroups((prev) => {
            const last = prev[prev.length - 1];
            if (last?.date === "Today") {
                return [...prev.slice(0, -1), { date: "Today", messages: [...last.messages, message] }];
            }
            return [...prev, { date: "Today", messages: [message] }];
        });
    };

    return (
        <div className="flex h-full min-h-0 flex-col">
            <ConversationHeader conversation={conversation} />

            <div ref={scrollRef} className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto scrollbar-none px-4 py-6 sm:px-6">
                {groups.map((group) => (
                    <div key={group.date} className="flex flex-col gap-3">
                        <p className="text-center text-sm font-medium text-slate-500">{group.date}</p>
                        <div className="flex flex-col gap-3">
                            {group.messages.map((message) => (
                                <MessageBubble key={message.id} message={message} />
                            ))}
                        </div>
                    </div>
                ))}

                <div
                    className="flex w-fit items-center gap-1 self-start rounded-2xl border border-slate-200 bg-white px-4 py-3"
                    aria-label={`${conversation.name} is typing`}
                >
                    <span className="size-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.3s]" />
                    <span className="size-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.15s]" />
                    <span className="size-2 animate-bounce rounded-full bg-slate-400" />
                </div>
            </div>

            <div className="px-4 pb-4 sm:px-6">
                <MessageComposer onSend={handleSend} />
            </div>
        </div>
    );
}
