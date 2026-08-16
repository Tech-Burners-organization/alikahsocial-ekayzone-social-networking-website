import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BackToPreviousPage from "@/utils/BackToPreviousPage";
import Container from "@/components/ui/CustomUi/Container";
import { getMyVideoById } from "../../_lib/data";
import VideoHero from "./_components/VideoHero";
import VideoStatCards from "./_components/VideoStatCards";
import StatRowsCard from "./_components/StatRowsCard";
import LinkedListingCard from "./_components/LinkedListingCard";
import ViewerTrendChart from "./_components/ViewerTrendChart";
import VideoCommentsSection from "./_components/VideoCommentsSection";
import PromoteVideoBar from "./_components/PromoteVideoBar";

export async function generateMetadata({
    params,
}: PageProps<"/profile/video/[id]">): Promise<Metadata> {
    const { id } = await params;
    const video = getMyVideoById(id);

    if (!video) {
        return { title: "Video not found | eKayzone" };
    }

    return {
        title: `${video.title} | eKayzone`,
        description: video.title,
    };
}

export default async function VideoDetailsPage({ params }: PageProps<"/profile/video/[id]">) {
    const { id } = await params;
    const video = getMyVideoById(id);

    if (!video) {
        notFound();
    }

    const isStream = video.kind === "stream";

    return (
        <div>
            <Container>
                <div className="flex flex-col gap-6 py-6">
                    <BackToPreviousPage className="w-fit" />

                    <VideoHero video={video} />

                    {isStream ? (
                        <>
                            <ViewerTrendChart data={video.viewerTrend ?? []} />
                            <StatRowsCard
                                title="Live Stats"
                                rows={[
                                    { label: "Peak Viewer", value: video.peakViewers ?? 0 },
                                    { label: "Likes", value: video.likes },
                                    { label: "Comments", value: video.commentsCount },
                                    { label: "Shares", value: video.shares },
                                ]}
                            />
                        </>
                    ) : (
                        <>
                            <VideoStatCards video={video} />
                            <StatRowsCard
                                title="Video Stats"
                                rows={[
                                    { label: "Likes", value: video.likes },
                                    { label: "Comments", value: video.commentsCount },
                                    { label: "Shares", value: video.shares },
                                    { label: "Saves", value: video.saves ?? 0 },
                                ]}
                            />
                            <LinkedListingCard initialListing={video.linkedListing} />
                        </>
                    )}

                    <VideoCommentsSection comments={video.comments} />
                </div>
            </Container>

            {!isStream && <PromoteVideoBar videoId={video.id} />}
        </div>
    );
}
