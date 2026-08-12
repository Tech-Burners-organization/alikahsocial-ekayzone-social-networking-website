import { notFound } from 'next/navigation';
import PageWraper from '@/components/ui/CustomUi/PageWraper';
import { ProfileOverview } from '@/components/shared/reels/ProfileOverview';
import { getProfileForUsername } from '@/components/shared/reels/feedData';

export default async function ProfilePage({ params }: PageProps<'/profile/[username]'>) {
    const { username } = await params;
    const profile = getProfileForUsername(username);

    if (!profile) {
        notFound();
    }

    return (
        <PageWraper title="Profile" backToPreviousPage>
            <ProfileOverview profile={profile} />
        </PageWraper>
    );
}
