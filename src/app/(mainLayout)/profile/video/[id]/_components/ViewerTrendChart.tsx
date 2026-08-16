"use client";

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { ViewerTrendPoint } from "../../../_lib/data";

export default function ViewerTrendChart({ data }: { data: ViewerTrendPoint[] }) {
    return (
        <div className="rounded-xl border border-border bg-background p-4 shadow-[0px_1px_0.5px_rgba(0,0,0,0.03)]">
            <h2 className="mb-4 text-lg font-bold text-foreground">Viewer Trend</h2>
            <div className="h-[240px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
                        <CartesianGrid vertical={false} stroke="var(--border)" />
                        <XAxis
                            dataKey="label"
                            tickLine={false}
                            axisLine={false}
                            tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                        />
                        <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
                        <Tooltip
                            contentStyle={{
                                borderRadius: 8,
                                border: "1px solid var(--border)",
                                fontSize: 12,
                            }}
                        />
                        <Line type="monotone" dataKey="viewers" stroke="#10b981" strokeWidth={2} dot={{ r: 4, fill: "#10b981" }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
