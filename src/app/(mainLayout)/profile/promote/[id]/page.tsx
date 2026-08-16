import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMyVideoById, getPromotableVideos } from "../../_lib/data";
import PromoteWizard from "./_components/PromoteWizard";

export async function generateMetadata({
    params,
}: PageProps<"/profile/promote/[id]">): Promise<Metadata> {
    const { id } = await params;
    const video = getMyVideoById(id);

    if (!video) {
        return { title: "Promote | eKayzone" };
    }

    return {
        title: `Promote "${video.title}" | eKayzone`,
        description: `Promote ${video.title} to reach more people.`,
    };
}

export default async function PromoteVideoPage({ params }: PageProps<"/profile/promote/[id]">) {
    const { id } = await params;
    const video = getMyVideoById(id);

    if (!video || video.kind !== "video") {
        notFound();
    }

    const videos = getPromotableVideos();

    return <PromoteWizard videos={videos} initialVideoId={video.id} />;
}
