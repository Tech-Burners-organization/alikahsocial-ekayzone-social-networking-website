import { cn } from "@/lib/utils";
import { ConversationListPanel } from "./_components/ConversationListPanel";
import { ConversationPanel } from "./_components/ConversationPanel";
import { EmptyConversation } from "./_components/EmptyConversation";
import { getConversationById, getConversations, getFilteredConversations, getMessageGroups } from "./_lib/data";

function firstValue(value: string | string[] | undefined): string | undefined {
    return Array.isArray(value) ? value[0] : value;
}

export default async function ChatPage({ searchParams }: PageProps<'/chat'>) {
    const params = await searchParams;
    const search = firstValue(params.search) ?? "";
    const requestedId = firstValue(params.c);

    const conversations = getFilteredConversations(search);
    const selected = (requestedId ? getConversationById(requestedId) : undefined) ?? getConversations()[0];

    // The list defaults to the first conversation on desktop (matching the
    // design), but on mobile only an *explicit* selection should switch the
    // single visible column away from the list.
    const explicitMobileSelection = Boolean(requestedId);

    return (
        <div className="flex h-full min-h-0">
            <div
                className={cn(
                    "flex w-full shrink-0 flex-col border-r border-slate-200 lg:w-92",
                    explicitMobileSelection && "hidden lg:flex"
                )}
            >
                <ConversationListPanel conversations={conversations} search={search} selectedId={selected?.id} />
            </div>

            <div
                className={cn(
                    "flex min-w-0 flex-1 flex-col bg-slate-50",
                    !explicitMobileSelection && "hidden lg:flex"
                )}
            >
                {selected ? (
                    <ConversationPanel key={selected.id} conversation={selected} initialGroups={getMessageGroups()} />
                ) : (
                    <EmptyConversation />
                )}
            </div>
        </div>
    );
}
