"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { AgeBucket } from "../../_lib/data";

export default function AgeRangeChart({ data }: { data: AgeBucket[] }) {
    return (
        <div className="rounded-xl border border-border bg-background p-2.5 shadow-[0px_1px_0.5px_rgba(0,0,0,0.03)]">
            <h2 className="mb-2 text-base font-bold text-foreground">Age Range</h2>
            <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
                        <CartesianGrid vertical={false} stroke="var(--border)" />
                        <XAxis
                            dataKey="label"
                            tickLine={false}
                            axisLine={false}
                            tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                        />
                        <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
                        <Tooltip
                            cursor={{ fill: "var(--muted)" }}
                            contentStyle={{ borderRadius: 8, border: "1px solid var(--border)", fontSize: 12 }}
                        />
                        <Bar dataKey="percent" fill="#10b981" radius={[6, 6, 0, 0]} maxBarSize={45} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
