import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Reels } from '@/components/shared/reels/Reels';
import { getProfileForUsername, getUserReels } from '@/components/shared/reels/feedData';

export default async function UserReelsPage({ params }: PageProps<'/profile/[username]'>) {
    const { username } = await params;
    const profile = getProfileForUsername(username);
    const items = getUserReels(username);

    if (!profile || items.length === 0) {
        notFound();
    }

    return (
        <>
            <div className="pointer-events-none absolute left-4 top-20 z-40">
                <Link
                    href="/"
                    className="pointer-events-auto flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-black/70"
                >
                    <ArrowLeft className="h-4 w-4" />
                    @{profile.username}
                </Link>
            </div>
            <Reels items={items} />
        </>
    );
}
