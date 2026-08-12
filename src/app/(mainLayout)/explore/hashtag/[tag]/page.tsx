import { notFound } from "next/navigation";
import { Hash } from "lucide-react";
import BackToPreviousPage from "@/utils/BackToPreviousPage";
import { VideoGrid } from "@/components/shared/reels/VideoGrid";
import { getHashtagByTag, getDiscoverThumbnails } from "../../_lib/data";

export default async function ExploreHashtagPage({ params }: PageProps<"/explore/hashtag/[tag]">) {
    const { tag } = await params;
    const hashtag = getHashtagByTag(tag);

    if (!hashtag) {
        notFound();
    }

    const items = getDiscoverThumbnails(hashtag.tag.length, 12);

    return (
        <div className="flex flex-col gap-6 p-10">
            <div className="flex items-center gap-4">
                <BackToPreviousPage />
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground">#{hashtag.tag}</h1>
            </div>

            <div className="flex items-center gap-3 rounded-xl bg-muted px-4 py-3 w-fit">
                <span className="flex size-9 items-center justify-center rounded-full bg-secondary-color/10 text-secondary-color">
                    <Hash className="size-5" />
                </span>
                <div>
                    <p className="font-bold text-foreground">#{hashtag.tag}</p>
                    <p className="text-sm text-muted-foreground">{hashtag.posts} posts</p>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <h2 className="text-lg font-bold text-foreground">Posts</h2>
                <VideoGrid items={items} href="/explore/watch" />
            </div>
        </div>
    );
}
