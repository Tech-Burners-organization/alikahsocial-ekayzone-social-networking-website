"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { GenderSlice } from "../../_lib/data";

export default function GenderDonutChart({ data }: { data: GenderSlice[] }) {
    return (
        <div className="flex items-center gap-6">
            <div className="size-43.25 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="percent"
                            nameKey="label"
                            innerRadius="60%"
                            outerRadius="100%"
                            paddingAngle={2}
                            stroke="none"
                        >
                            {data.map((slice) => (
                                <Cell key={slice.label} fill={slice.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value, name) => [`${value}%`, name] as [string, string]}
                            contentStyle={{ borderRadius: 8, border: "1px solid var(--border)", fontSize: 12 }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-2">
                {data.map((slice) => (
                    <div key={slice.label} className="flex items-center gap-1.5">
                        <span className="size-4 shrink-0 rounded-md" style={{ backgroundColor: slice.color }} />
                        <p className="text-foreground">
                            <span className="text-sm font-semibold">{slice.label}</span>{" "}
                            <span className="text-lg font-bold">{slice.percent}%</span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
