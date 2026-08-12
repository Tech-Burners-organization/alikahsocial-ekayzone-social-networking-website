import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ChatOptionsMenu } from "./ChatOptionsMenu";
import type { Conversation } from "../_lib/data";

export function ConversationHeader({ conversation }: { conversation: Conversation }) {
    return (
        <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-4 sm:px-6">
            <Link
                href="/chat"
                aria-label="Back to conversations"
                className="flex size-8 shrink-0 items-center justify-center text-slate-500 lg:hidden"
            >
                <ChevronLeft className="size-5" />
            </Link>

            <div className="flex min-w-0 flex-1 items-center gap-3">
                <div className="relative size-12 shrink-0">
                    <Image
                        src={conversation.avatarUrl}
                        alt={conversation.name}
                        fill
                        sizes="48px"
                        className="rounded-full object-cover"
                    />
                </div>
                <div className="min-w-0 flex-1">
                    <p className="truncate text-[16px] font-bold text-slate-800">{conversation.name}</p>
                    <p className="truncate text-sm font-medium text-slate-600">{conversation.handle}</p>
                </div>
            </div>

            <ChatOptionsMenu contactName={conversation.name} contactHandle={conversation.handle} />
        </div>
    );
}
