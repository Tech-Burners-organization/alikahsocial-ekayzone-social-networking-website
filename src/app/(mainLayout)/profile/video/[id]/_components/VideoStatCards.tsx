import { Clock, Eye, History, TrendingUp } from "lucide-react";
import { formatCompactNumber } from "@/lib/format";
import type { MyVideo } from "../../../_lib/data";

export default function VideoStatCards({ video }: { video: MyVideo }) {
    const cards = [
        { icon: Eye, value: formatCompactNumber(video.views), label: "Views" },
        { icon: Clock, value: video.avgWatchDuration ?? "—", label: "Avg Watch Duration" },
        { icon: TrendingUp, value: `${video.completionRate ?? 0}%`, label: "Completion Rate" },
        { icon: History, value: `${video.totalWatchTimeHours ?? 0}h`, label: "Total Watch Time" },
    ];

    return (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {cards.map(({ icon: Icon, value, label }) => (
                <div
                    key={label}
                    className="flex flex-col gap-1.5 rounded-xl border border-border bg-background px-3 py-2.5"
                >
                    <Icon className="size-5 text-foreground" />
                    <div className="flex flex-col">
                        <span className="text-lg font-bold text-foreground">{value}</span>
                        <span className="text-xs text-muted-foreground">{label}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}
