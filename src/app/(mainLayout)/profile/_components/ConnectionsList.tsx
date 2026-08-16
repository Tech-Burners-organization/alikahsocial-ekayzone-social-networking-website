import Image from "next/image";
import ConnectionActionButton from "./ConnectionActionButton";
import type { Connection } from "../_lib/connections";

interface ConnectionsListProps {
    connections: Connection[];
    actionLabel: string;
    toggledLabel: string;
    emptyMessage: string;
}

export default function ConnectionsList({
    connections,
    actionLabel,
    toggledLabel,
    emptyMessage,
}: ConnectionsListProps) {
    if (connections.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-border py-16 text-center">
                <p className="text-sm font-medium text-foreground">{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col divide-y divide-border rounded-xl border border-border">
            {connections.map((connection) => (
                <div key={connection.id} className="flex items-center justify-between gap-4 px-3 py-3.5">
                    <div className="flex items-center gap-3">
                        <div className="relative size-[54px] shrink-0 overflow-hidden rounded-full bg-muted">
                            <Image src={connection.avatarUrl} alt={connection.name} fill sizes="54px" className="object-cover" />
                        </div>
                        <div>
                            <p className="text-lg font-bold leading-tight text-foreground">{connection.name}</p>
                            <p className="text-sm text-muted-foreground">{connection.handle}</p>
                        </div>
                    </div>

                    <ConnectionActionButton actionLabel={actionLabel} toggledLabel={toggledLabel} />
                </div>
            ))}
        </div>
    );
}
