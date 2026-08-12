import Link from "next/link";
import { ChevronRight, TrendingUp } from "lucide-react";
import { TRENDING_HASHTAGS } from "../_lib/data";

export default function TrendingList() {
    return (
        <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-1">
                <TrendingUp className="size-6 text-[#0a2c07]" />
                <h2 className="text-2xl font-bold text-[#0a2c07]">Trending</h2>
            </div>
            <div className="flex flex-col rounded-[10px] border border-border overflow-hidden">
                {TRENDING_HASHTAGS.map((hashtag, index) => (
                    <Link
                        key={hashtag.tag}
                        href={`/explore/hashtag/${hashtag.tag}`}
                        className="flex items-center justify-between border-b border-border bg-card px-4 py-5 last:border-b-0 hover:bg-muted/50"
                    >
                        <div className="flex items-center gap-5">
                            <span className="text-base font-bold text-secondary-color">{index + 1}</span>
                            <div className="flex flex-col gap-1">
                                <p className="text-base font-bold text-foreground">#{hashtag.tag}</p>
                                <p className="text-sm text-muted-foreground">{hashtag.videoCount} videos</p>
                            </div>
                        </div>
                        <ChevronRight className="size-6 text-muted-foreground" />
                    </Link>
                ))}
            </div>
        </div>
    );
}
