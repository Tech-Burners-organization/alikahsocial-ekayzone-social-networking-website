import StatCard from "./StatCard";
import FollowerGrowthChart from "./charts/FollowerGrowthChart";
import { getFollowerGrowth, getOverviewStats } from "../_lib/data";

export default function OverviewPanel() {
    const stats = getOverviewStats();
    const followerGrowth = getFollowerGrowth();

    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {stats.map((stat) => (
                    <StatCard key={stat.id} {...stat} />
                ))}
            </div>

            <FollowerGrowthChart data={followerGrowth} />
        </div>
    );
}
