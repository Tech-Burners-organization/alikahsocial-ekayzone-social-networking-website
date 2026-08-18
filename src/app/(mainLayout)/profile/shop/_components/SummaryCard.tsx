import type { ReactNode } from "react";
import type { SummaryRow } from "../_lib/data";

interface SummaryCardProps {
    title: string;
    rows: SummaryRow[];
    /** Rendered as a final, borderless row — used for the earnings disclaimer. */
    footnote?: ReactNode;
}

/** Label/value list card shared by the overview's "Quick Stats" and "Earnings Summary". */
export default function SummaryCard({ title, rows, footnote }: SummaryCardProps) {
    return (
        <section className="flex flex-col gap-2 rounded-xl border border-[#f2f2f4] bg-white p-2.5 shadow-[0_1px_0.5px_rgba(0,0,0,0.03)]">
            <h2 className="text-lg font-bold leading-7 text-[#0a2c07]">{title}</h2>

            <div className="flex flex-col">
                {rows.map((row, index) => (
                    <div
                        key={row.label}
                        className={
                            index < rows.length - 1 || footnote
                                ? "flex items-center justify-between gap-4 border-b border-[#e5e8ea] px-1.5 py-2.5"
                                : "flex items-center justify-between gap-4 px-1.5 py-2.5"
                        }
                    >
                        <p className="text-sm font-medium text-[#1b1c1c]">{row.label}</p>
                        <p className="text-base font-bold leading-6 text-[#0a2c07]">{row.value}</p>
                    </div>
                ))}

                {footnote && <div className="px-1.5 py-2.5">{footnote}</div>}
            </div>
        </section>
    );
}
