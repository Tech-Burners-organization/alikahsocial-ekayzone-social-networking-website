import { cn } from "@/lib/utils";
import { formatCompactNumber } from "@/lib/format";

interface StatRow {
    label: string;
    value: number;
}

interface StatRowsCardProps {
    title: string;
    rows: StatRow[];
}

export default function StatRowsCard({ title, rows }: StatRowsCardProps) {
    return (
        <div className="rounded-xl border border-border bg-background p-2.5 shadow-[0px_1px_0.5px_rgba(0,0,0,0.03)]">
            <h2 className="px-1.5 py-2 text-lg font-bold text-foreground">{title}</h2>
            <div className="flex flex-col">
                {rows.map((row, index) => (
                    <div
                        key={row.label}
                        className={cn(
                            "flex items-center justify-between px-1.5 py-2.5",
                            index < rows.length - 1 && "border-b border-border"
                        )}
                    >
                        <span className="text-sm font-medium text-foreground">{row.label}</span>
                        <span className="text-base font-bold text-secondary-color">{formatCompactNumber(row.value)}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
