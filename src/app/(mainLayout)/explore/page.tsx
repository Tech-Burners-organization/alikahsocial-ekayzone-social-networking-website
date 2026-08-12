import { VideoGrid } from "@/components/shared/reels/VideoGrid";
import { getDiscoverThumbnails } from "./_lib/data";
import CategoryGrid from "./_components/CategoryGrid";
import TrendingList from "./_components/TrendingList";

export default function ExplorePage() {
    const discoverItems = getDiscoverThumbnails(0);

    return (
        <div className="flex flex-col gap-6 p-10">
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Explore</h1>

            <CategoryGrid />
            <TrendingList />

            <div className="flex flex-col gap-3">
                <h2 className="text-2xl font-bold text-[#0a2c07]">Discover</h2>
                <VideoGrid items={discoverItems} href="/explore/watch" />
            </div>
        </div>
    );
}
