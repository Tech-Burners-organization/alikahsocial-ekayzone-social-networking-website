import Image from "next/image";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReviewsSummary } from "../_lib/reviews";

function RatingBar({ star, count, max }: { star: number; count: number; max: number }) {
    const width = max === 0 ? 0 : Math.round((count / max) * 100);

    return (
        <div className="flex items-center gap-3">
            <span className="flex w-7 shrink-0 items-center gap-0.5 text-xs font-bold text-warning-color">
                {star}
                <Star className="size-2.5 fill-warning-color text-warning-color" />
            </span>
            <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-warning-color" style={{ width: `${width}%` }} />
            </div>
            <span className="w-8 shrink-0 text-xs text-muted-foreground">({count})</span>
        </div>
    );
}

export default function ReviewsSection({
    rating,
    reviewCount,
    reviews,
}: {
    rating: number;
    reviewCount: number;
    reviews: ReviewsSummary;
}) {
    const max = Math.max(...Object.values(reviews.breakdown), 1);

    return (
        <div className="flex flex-col gap-3">
            <h2 className="text-xl font-bold text-foreground">Reviews</h2>
            <p className="text-base font-semibold text-foreground/80">
                {rating} ({reviewCount} Reviews)
            </p>

            <div className="flex flex-col gap-2">
                {([5, 4, 3, 2, 1] as const).map((star) => (
                    <RatingBar key={star} star={star} count={reviews.breakdown[star]} max={max} />
                ))}
            </div>

            <div className="h-px bg-border" />

            <div className="flex flex-col gap-4">
                {reviews.items.map((review, index) => (
                    <div key={review.id} className="flex flex-col gap-4">
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                                <div className="relative size-10.5 shrink-0 overflow-hidden rounded-full bg-muted">
                                    <Image
                                        src={review.avatar}
                                        alt={review.name}
                                        fill
                                        sizes="42px"
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="text-base font-bold text-foreground">{review.name}</p>
                                    <p className="text-sm text-muted-foreground">{review.date}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-0.5">
                                {Array.from({ length: 5 }, (_, starIndex) => (
                                    <Star
                                        key={starIndex}
                                        className={cn(
                                            "size-4",
                                            starIndex < review.rating
                                                ? "fill-amber-400 text-amber-400"
                                                : "fill-muted text-muted"
                                        )}
                                    />
                                ))}
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{review.comment}</p>
                        {index < reviews.items.length - 1 && <div className="h-px bg-border" />}
                    </div>
                ))}
            </div>

            <button
                type="button"
                className="flex h-10 w-fit items-center justify-center rounded-[10px] bg-secondary-color px-4 text-sm font-semibold text-white transition-colors hover:bg-secondary-color/90"
            >
                See All {reviewCount} Reviews
            </button>
        </div>
    );
}
