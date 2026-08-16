import Image from "next/image";
import { Play } from "lucide-react";
import type { MyVideo } from "../../../_lib/data";

export default function VideoHero({ video }: { video: MyVideo }) {
    const isStream = video.kind === "stream";

    return (
        <div className="flex flex-col gap-3">
            <div className="relative aspect-[779/403] w-full overflow-hidden rounded-2xl bg-muted">
                <Image
                    src={video.thumbnailUrl}
                    alt={video.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 848px"
                    className="object-cover"
                />

                {isStream && (
                    <>
                        <span className="absolute left-4 top-4 rounded-full bg-rose-500 px-3.5 py-1.5 text-sm font-bold text-white">
                            Live Replay
                        </span>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="flex size-14 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm">
                                <Play className="size-6 fill-white" />
                            </span>
                        </div>
                    </>
                )}
            </div>

            {isStream ? (
                <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium text-muted-foreground">{video.publishedAt}</p>
                    <h1 className="text-xl font-bold text-foreground">{video.title}</h1>
                    <p className="text-base text-muted-foreground">{video.durationLabel}</p>
                </div>
            ) : (
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <span className="rounded bg-[#d1fae5] px-2.5 py-1 text-xs font-bold text-secondary-color">
                            Published
                        </span>
                        <span className="text-xs font-medium text-muted-foreground">{video.publishedAt}</span>
                    </div>
                    <h1 className="text-xl font-bold text-foreground">{video.title}</h1>
                </div>
            )}
        </div>
    );
}
