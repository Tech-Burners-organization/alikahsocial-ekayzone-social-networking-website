"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { CampaignSpendPoint } from "../../_lib/data";

export default function DailyCampaignSpendChart({ data }: { data: CampaignSpendPoint[] }) {
    return (
        <div className="flex flex-col gap-2">
            <h2 className="text-base font-bold text-foreground">Daily Campaign Spend</h2>
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
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                            tickFormatter={(value: number) => `R${value}`}
                        />
                        <Tooltip
                            cursor={{ fill: "var(--muted)" }}
                            formatter={(value) => [`R${value}`, "Spend"] as [string, string]}
                            contentStyle={{ borderRadius: 8, border: "1px solid var(--border)", fontSize: 12 }}
                        />
                        <Bar dataKey="spend" fill="#10b981" radius={[6, 6, 0, 0]} maxBarSize={45} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
