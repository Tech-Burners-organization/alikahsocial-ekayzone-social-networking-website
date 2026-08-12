import { Reels } from "@/components/shared/reels/Reels";
import { getHomeFeed } from "@/components/shared/reels/feedData";
import BackToPreviousPage from "@/utils/BackToPreviousPage";

export default function ExploreWatchPage() {
    const items = getHomeFeed();

    return (
        <>
            <div className="pointer-events-none absolute left-4 top-20 z-40">
                <div className="pointer-events-auto">
                    <BackToPreviousPage />
                </div>
            </div>
            <Reels items={items} />
        </>
    );
}
