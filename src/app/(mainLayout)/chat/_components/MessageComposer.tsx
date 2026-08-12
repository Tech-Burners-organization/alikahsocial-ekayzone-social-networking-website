"use client";

import { useState } from "react";
import { Paperclip, SendHorizontal } from "lucide-react";

export function MessageComposer({ onSend }: { onSend: (text: string) => void }) {
    const [value, setValue] = useState("");

    const handleSend = () => {
        const trimmed = value.trim();
        if (!trimmed) return;
        onSend(trimmed);
        setValue("");
    };

    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08),0px_4px_6px_-2px_rgba(16,24,40,0.03)]">
            <div className="flex items-center gap-2">
                <button
                    type="button"
                    aria-label="Attach a file"
                    onClick={() => console.log("[MessageComposer] attach file (not wired)")}
                    className="flex size-6 shrink-0 items-center justify-center text-slate-500 transition-colors hover:text-secondary-color"
                >
                    <Paperclip className="size-5" />
                </button>
                <input
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            event.preventDefault();
                            handleSend();
                        }
                    }}
                    placeholder="Send a message..."
                    className="flex-1 bg-transparent text-base font-medium text-slate-800 outline-none placeholder:text-slate-500"
                />
            </div>
            <div className="mt-3 flex justify-end">
                <button
                    type="button"
                    onClick={handleSend}
                    disabled={!value.trim()}
                    className="flex items-center gap-2 rounded-full bg-secondary-color px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-secondary-color/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Send
                    <SendHorizontal className="size-5" />
                </button>
            </div>
        </div>
    );
}
