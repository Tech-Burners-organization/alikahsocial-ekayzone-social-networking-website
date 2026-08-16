"use client";

import { Bar, BarChart, Cell, ResponsiveContainer, XAxis, YAxis } from "recharts";
import type { LocationShare } from "../../_lib/data";

export default function TopLocationsChart({ data }: { data: LocationShare[] }) {
    return (
        <div className="h-55 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    layout="vertical"
                    margin={{ top: 4, right: 24, left: 0, bottom: 0 }}
                    barCategoryGap={10}
                >
                    <XAxis type="number" hide domain={[0, 100]} />
                    <YAxis type="category" dataKey="label" hide />
                    <Bar dataKey="percent" radius={[0, 6, 6, 0]} maxBarSize={29} label={<LocationBarLabel data={data} />}>
                        {data.map((entry) => (
                            <Cell key={entry.label} fill="#10b981" />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

interface RechartsLabelProps {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    index?: number;
}

function LocationBarLabel({ data, ...props }: RechartsLabelProps & { data: LocationShare[] }) {
    const { x = 0, y = 0, width = 0, height = 0, index = 0 } = props;
    const entry = data[index];
    if (!entry) return null;

    return (
        <g>
            <text x={x + 8} y={y + height / 2} dy={4} fill="white" fontSize={12} fontWeight={700}>
                {entry.label}
            </text>
            <text x={x + width + 8} y={y + height / 2} dy={4} fill="var(--foreground)" fontSize={12} fontWeight={500}>
                {entry.percent}%
            </text>
        </g>
    );
}
