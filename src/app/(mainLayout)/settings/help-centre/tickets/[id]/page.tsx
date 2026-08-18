import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageWraper from "@/components/ui/CustomUi/PageWraper";
import { getSupportTicketById } from "../../../_lib/data";
import TicketComposer from "./_components/TicketComposer";

export const metadata: Metadata = {
    title: "Ticket | eKayzone",
};

export default async function TicketDetailPage({
    params,
}: PageProps<"/settings/help-centre/tickets/[id]">) {
    const { id } = await params;
    const ticket = getSupportTicketById(id);

    if (!ticket) notFound();

    return (
        <PageWraper title={`Ticket#${ticket.id}`} backToPreviousPage>
            <div className="flex flex-col gap-4">
                {ticket.messages.map((message) => {
                    const isUser = message.author === "user";

                    return (
                        <div
                            key={message.id}
                            className={`flex flex-col gap-1.5 ${isUser ? "items-end" : "items-start"}`}
                        >
                            <div
                                className={`max-w-[min(420px,80%)] rounded-2xl px-4 py-3 text-base leading-6 ${
                                    isUser
                                        ? "bg-secondary-color text-white"
                                        : "border border-[#e5e8ea] bg-white text-[#1b1c1c]"
                                }`}
                            >
                                {message.body}
                            </div>

                            {message.timeLabel && (
                                <p className="text-xs font-medium text-secondary-color">
                                    {message.timeLabel}
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>

            <TicketComposer ticketId={ticket.id} />
        </PageWraper>
    );
}
