import { notFound } from "next/navigation";
import BackToPreviousPage from "@/utils/BackToPreviousPage";
import { VideoGrid } from "@/components/shared/reels/VideoGrid";
import { getCategoryById, getDiscoverThumbnails } from "../../_lib/data";

export default async function ExploreCategoryPage({ params }: PageProps<"/explore/category/[category]">) {
    const { category: categoryId } = await params;
    const category = getCategoryById(categoryId);

    if (!category) {
        notFound();
    }

    const items = getDiscoverThumbnails(category.id.length + category.label.length, 12);

    return (
        <div className="flex flex-col gap-6 p-10">
            <div className="flex items-center gap-4">
                <BackToPreviousPage />
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{category.label}</h1>
            </div>

            <VideoGrid items={items} href="/explore/watch" />
        </div>
    );
}
