import UrlSearchBar from "@/components/shared/UrlSearchBar";
import RatingBreakdown from "./RatingBreakdown";
import ReviewCard from "./ReviewCard";
import ReviewFilterChips from "./ReviewFilterChips";
import ReviewSortSelect from "./ReviewSortSelect";
import { getRatingSummary, getShopReviews, type ReviewFilter, type ReviewSort } from "../_lib/data";

interface RatingsPanelProps {
    filter: ReviewFilter;
    sort: ReviewSort;
    search: string;
    searchParams: Record<string, string | string[] | undefined>;
}

export default function RatingsPanel({ filter, sort, search, searchParams }: RatingsPanelProps) {
    const reviews = getShopReviews({ filter, search, sort });

    return (
        <div className="flex flex-col gap-4">
            <RatingBreakdown summary={getRatingSummary()} />

            <ReviewFilterChips active={filter} searchParams={searchParams} />

            <div className="flex items-center gap-3">
                <div className="min-w-0 flex-1">
                    <UrlSearchBar defaultValue={search} placeholder="Search reviews" />
                </div>
                <ReviewSortSelect value={sort} />
            </div>

            {reviews.length > 0 ? (
                <div className="flex flex-col gap-1.5">
                    {reviews.map((review) => (
                        <ReviewCard key={review.id} review={review} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-border py-16 text-center">
                    <p className="text-sm font-medium text-foreground">No reviews found</p>
                    <p className="text-sm text-muted-foreground">
                        {search ? "Try a different search term." : "You have no reviews yet."}
                    </p>
                </div>
            )}
        </div>
    );
}
