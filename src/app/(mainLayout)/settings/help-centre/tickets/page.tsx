import type { Metadata } from "next";
import Link from "next/link";
import PageWraper from "@/components/ui/CustomUi/PageWraper";
import { TICKET_STATUS_BADGE, getSupportTickets } from "../../_lib/data";

export const metadata: Metadata = {
    title: "My Tickets | eKayzone",
};

export default function MyTicketsPage() {
    const tickets = getSupportTickets();

    return (
        <PageWraper title="My Tickets" backToPreviousPage>
            {tickets.length > 0 ? (
                <div className="flex flex-col gap-1">
                    {tickets.map((ticket) => {
                        const badge = TICKET_STATUS_BADGE[ticket.status];

                        return (
                            <Link
                                key={ticket.id}
                                href={`/settings/help-centre/tickets/${ticket.id}`}
                                className="flex flex-col gap-2 rounded-[10px] border border-[#e5e8ea] bg-white p-2.5 transition-colors hover:border-secondary-color/40"
                            >
                                <span
                                    className={`flex w-fit items-center justify-center rounded-xl p-1.5 text-xs font-bold text-white ${badge.className}`}
                                >
                                    {badge.label}
                                </span>

                                <div className="flex flex-col gap-2">
                                    <p className="text-base font-bold leading-6 text-[#1b1c1c]">
                                        {ticket.subject}
                                    </p>
                                    <p className="text-sm text-[#313233]">{ticket.preview}</p>
                                    <p className="text-xs font-medium text-[#5e6062]">{ticket.timeLabel}</p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-border py-16 text-center">
                    <p className="text-sm font-medium text-foreground">No tickets yet</p>
                    <p className="text-sm text-muted-foreground">
                        Contact support and your tickets will show up here.
                    </p>
                </div>
            )}
        </PageWraper>
    );
}
