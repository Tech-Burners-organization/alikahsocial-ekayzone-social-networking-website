import { Reels } from '../shared/reels/Reels';
import { FeedTabs } from '../shared/reels/FeedTabs';
import { getHomeFeed } from '../shared/reels/feedData';

// Home page composes the generic Reels feed with its own chrome (tabs) and a
// fixed batch of dummy data — Reels itself doesn't know or care where the data
// came from.
export default function ReelsSection() {
    const items = getHomeFeed();

    return (
        <>
            <FeedTabs />
            <Reels items={items} />
        </>
    );
}
