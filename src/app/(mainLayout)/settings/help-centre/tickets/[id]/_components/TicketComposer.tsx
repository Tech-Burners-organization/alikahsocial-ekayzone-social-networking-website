"use client";

import { useState } from "react";
import { Paperclip, SendHorizontal } from "lucide-react";
import { toast } from "sonner";

/** Sticky reply box at the bottom of a ticket thread. */
export default function TicketComposer({ ticketId }: { ticketId: string }) {
    const [message, setMessage] = useState("");

    const handleSend = () => {
        const trimmed = message.trim();
        if (!trimmed) return;

        toast.success(`Reply sent on ticket #${ticketId}`);
        setMessage("");
    };

    return (
        <div className="sticky bottom-0 z-10 -mx-10 mt-2 border-t border-[#e5e8ea] bg-background px-10 py-6">
            <div className="flex flex-col gap-3 rounded-2xl border border-[#e5e8ea] bg-white p-4 shadow-[0_1px_0.5px_rgba(0,0,0,0.03)]">
                <div className="flex items-start gap-2">
                    <button
                        type="button"
                        aria-label="Attach a file"
                        onClick={() => toast.info("Attach a file")}
                        className="mt-0.5 text-secondary-color transition-opacity hover:opacity-70"
                    >
                        <Paperclip className="size-5" />
                    </button>
                    <textarea
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                        placeholder="Send a message..."
                        rows={2}
                        className="min-h-12 flex-1 resize-none bg-transparent text-base text-[#1b1c1c] outline-none placeholder:text-[#5e6062]"
                    />
                </div>

                <button
                    type="button"
                    onClick={handleSend}
                    disabled={message.trim().length === 0}
                    className="ml-auto flex h-9 items-center justify-center gap-1.5 rounded-full bg-secondary-color px-4 text-sm font-bold text-white transition-colors hover:bg-secondary-color/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Send
                    <SendHorizontal className="size-4" />
                </button>
            </div>
        </div>
    );
}
