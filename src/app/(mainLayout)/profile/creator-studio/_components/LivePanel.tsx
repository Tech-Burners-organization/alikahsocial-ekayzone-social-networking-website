import StatCard from "./StatCard";
import PastStreamsList from "./PastStreamsList";
import { getLiveStreamStats, getPastStreams } from "../_lib/data";

export default function LivePanel() {
    const stats = getLiveStreamStats();
    const streams = getPastStreams("");

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
                <h2 className="text-xl font-bold text-foreground">Live Stream Analysis</h2>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                    {stats.map((stat) => (
                        <StatCard key={stat.id} {...stat} />
                    ))}
                </div>
            </div>

            <PastStreamsList streams={streams} />
        </div>
    );
}
