"use client";

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { MonthlyPoint } from "../../_lib/data";

export default function FollowerGrowthChart({ data }: { data: MonthlyPoint[] }) {
    return (
        <div className="rounded-xl border border-border bg-background p-2.5 shadow-[0px_1px_0.5px_rgba(0,0,0,0.03)]">
            <h2 className="mb-2 text-base font-bold text-foreground">Follower Growth</h2>
            <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
                        <CartesianGrid vertical={false} stroke="var(--border)" />
                        <XAxis
                            dataKey="label"
                            tickLine={false}
                            axisLine={false}
                            tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                            tickFormatter={(value: number) => (value >= 1000 ? `${value / 1000}K` : `${value}`)}
                        />
                        <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid var(--border)", fontSize: 12 }} />
                        <Line
                            type="monotone"
                            dataKey="followers"
                            stroke="#10b981"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
