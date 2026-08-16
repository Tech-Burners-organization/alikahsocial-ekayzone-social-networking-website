import Image from "next/image";
import { formatCompactNumber } from "@/lib/format";
import VideoPerformanceSort from "./VideoPerformanceSort";
import { getVideoPerformance, type VideoSort } from "../_lib/data";

export default function ContentPanel({ sort }: { sort: VideoSort }) {
    const videos = getVideoPerformance(sort);

    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-foreground">Video Performance</h2>
                <VideoPerformanceSort value={sort} />
            </div>

            <div className="flex flex-col gap-2.5">
                {videos.map((video) => (
                    <div
                        key={video.id}
                        className="flex items-center gap-2.5 rounded-xl border border-border bg-background p-2.5 shadow-[0px_1px_0.5px_rgba(0,0,0,0.03)]"
                    >
                        <div className="relative h-29.75 w-26.5 shrink-0 overflow-hidden rounded-lg bg-muted">
                            <Image src={video.thumbnailUrl} alt={video.title} fill sizes="106px" className="object-cover" />
                            <div className="absolute inset-0 bg-black/20" />
                        </div>
                        <div className="flex flex-1 flex-col gap-4">
                            <p className="text-xl font-bold text-foreground">{video.title}</p>
                            <div className="flex items-center gap-6">
                                <div className="flex flex-col items-center gap-0.5">
                                    <span className="text-sm font-medium text-muted-foreground">Views</span>
                                    <span className="text-lg font-bold text-foreground">
                                        {formatCompactNumber(video.views)}
                                    </span>
                                </div>
                                <div className="flex flex-col items-center gap-0.5">
                                    <span className="text-sm font-medium text-muted-foreground">Reach</span>
                                    <span className="text-lg font-bold text-foreground">
                                        {formatCompactNumber(video.reach)}
                                    </span>
                                </div>
                                <div className="flex flex-col items-center gap-0.5">
                                    <span className="text-sm font-medium text-muted-foreground">Likes</span>
                                    <span className="text-lg font-bold text-foreground">
                                        {formatCompactNumber(video.likes)}
                                    </span>
                                </div>
                                <div className="flex flex-col items-center gap-0.5">
                                    <span className="text-sm font-medium text-muted-foreground">Shares</span>
                                    <span className="text-lg font-bold text-foreground">
                                        {formatCompactNumber(video.shares)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
