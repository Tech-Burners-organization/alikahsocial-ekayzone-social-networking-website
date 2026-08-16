import GenderDonutChart from "./charts/GenderDonutChart";
import AgeRangeChart from "./charts/AgeRangeChart";
import TopLocationsChart from "./charts/TopLocationsChart";
import { getAgeRangeAnalytics, getGenderAnalytics, getTopLocations } from "../_lib/data";

export default function AudiencePanel() {
    const gender = getGenderAnalytics();
    const ageRange = getAgeRangeAnalytics();
    const locations = getTopLocations();

    return (
        <div className="flex flex-col gap-4">
            <div className="rounded-xl border border-border bg-background p-2.5 shadow-[0px_1px_0.5px_rgba(0,0,0,0.03)]">
                <h2 className="mb-4 text-lg font-bold text-foreground">Gender Analytics</h2>
                <GenderDonutChart data={gender} />
            </div>

            <AgeRangeChart data={ageRange} />

            <div className="rounded-xl border border-border bg-background p-2.5 shadow-[0px_1px_0.5px_rgba(0,0,0,0.03)]">
                <h2 className="mb-2 text-base font-bold text-foreground">Top Locations</h2>
                <TopLocationsChart data={locations} />
            </div>
        </div>
    );
}
