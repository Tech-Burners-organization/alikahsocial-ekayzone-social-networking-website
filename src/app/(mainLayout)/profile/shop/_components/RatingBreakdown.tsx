import { Star } from "lucide-react";
import type { RatingSummary } from "../_lib/data";

const STARS = [5, 4, 3, 2, 1] as const;

export default function RatingBreakdown({ summary }: { summary: RatingSummary }) {
    const max = Math.max(...Object.values(summary.breakdown), 1);

    return (
        <section className="flex flex-col gap-1.5 rounded-[10px] border border-[#e5e8ea] bg-white p-2.5">
            <h2 className="text-xl font-bold leading-[30px] text-[#313233]">
                {summary.average} ( {summary.total} Reviews)
            </h2>

            <div className="flex flex-col gap-2.5 py-2.5 pl-1 pr-3">
                {STARS.map((star) => {
                    const count = summary.breakdown[star];

                    return (
                        <div key={star} className="flex items-center gap-3">
                            <span className="flex shrink-0 items-center justify-center text-xs font-bold text-[#e8943f]">
                                {star}
                                <Star className="size-2.5 fill-[#e8943f] text-[#e8943f]" />
                            </span>
                            <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-[#efefef]">
                                <div
                                    className="h-full rounded-full bg-[#e8943f]"
                                    style={{ width: `${Math.round((count / max) * 100)}%` }}
                                />
                            </div>
                            <span className="w-6 shrink-0 text-right text-xs font-medium text-[#060709]">
                                ({count})
                            </span>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
