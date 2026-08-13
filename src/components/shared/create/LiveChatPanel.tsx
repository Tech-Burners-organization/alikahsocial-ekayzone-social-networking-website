"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";

interface ChatMessage {
    id: string;
    text: string;
}

const INITIAL_MESSAGES: ChatMessage[] = [
    { id: "sys-1", text: "mike_r joined" },
    { id: "sys-2", text: "mike_r joined" },
];

export function LiveChatPanel() {
    const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
    const [draft, setDraft] = useState("");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const trimmed = draft.trim();
        if (!trimmed) return;

        setMessages((prev) => [...prev, { id: crypto.randomUUID(), text: trimmed }]);
        setDraft("");
    };

    return (
        <div className="flex w-full flex-col rounded-3xl border border-border bg-white shadow-sm lg:w-74">
            <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-4">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className="flex h-12.25 w-fit items-center rounded-2xl bg-muted px-2.5 text-sm font-semibold text-foreground/80"
                    >
                        {message.text}
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="border-t border-border p-3">
                <div className="flex items-center gap-2 rounded-3xl border border-border bg-white p-4 shadow-sm">
                    <input
                        value={draft}
                        onChange={(event) => setDraft(event.target.value)}
                        placeholder="Add Comment..."
                        className="flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
                    />
                    <button
                        type="submit"
                        disabled={!draft.trim()}
                        aria-label="Send comment"
                        className="text-secondary-color disabled:opacity-40"
                    >
                        <Send className="size-5" />
                    </button>
                </div>
            </form>
        </div>
    );
}
