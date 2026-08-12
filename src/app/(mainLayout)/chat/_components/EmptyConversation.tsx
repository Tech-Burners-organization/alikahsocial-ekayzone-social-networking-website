import { MessageCircle } from "lucide-react";

export function EmptyConversation() {
    return (
        <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-emerald-50">
                <MessageCircle className="size-7 text-secondary-color" />
            </div>
            <p className="text-2xl font-bold text-foreground">Select a conversation</p>
            <p className="text-base text-slate-500">Choose a chat from the list to see your messages here.</p>
        </div>
    );
}
