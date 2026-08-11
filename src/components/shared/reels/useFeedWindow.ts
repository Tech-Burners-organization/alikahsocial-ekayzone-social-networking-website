import { useCallback, useEffect, useRef, useState } from "react";
import { fetchFeedPage } from "./feedData";
import type { FeedItem } from "./types";

// Caches fetched feed items by absolute index and fetches the next cursor page
// once a mounted window position needs an index past what's loaded. Only one
// fetch is ever in flight — navigation is rate-limited (700ms/step) upstream in
// ReelsSection, and PAGE_SIZE is sized to the mount window, so a new page is
// never needed faster than the simulated latency can resolve it. If that
// invariant were ever violated, this self-corrects on the next re-check at the
// cost of a longer loading placeholder, never a correctness bug.
export function useFeedWindow(mountedIndices: number[]) {
    const cacheRef = useRef(new Map<number, FeedItem>());
    const loadedCountRef = useRef(0);
    const nextCursorRef = useRef<string | null>(null);
    const inFlightRef = useRef(false);
    const [version, setVersion] = useState(0);

    const maxNeeded = Math.max(...mountedIndices);

    useEffect(() => {
        if (maxNeeded < loadedCountRef.current || inFlightRef.current) return;

        inFlightRef.current = true;
        fetchFeedPage(nextCursorRef.current).then((page) => {
            page.items.forEach((item, i) => {
                cacheRef.current.set(loadedCountRef.current + i, item);
            });
            loadedCountRef.current += page.items.length;
            nextCursorRef.current = page.nextCursor;
            inFlightRef.current = false;
            setVersion((v) => v + 1);
        });
    }, [maxNeeded, version]);

    const getItemAt = useCallback((index: number) => cacheRef.current.get(index), []);

    return { getItemAt };
}
