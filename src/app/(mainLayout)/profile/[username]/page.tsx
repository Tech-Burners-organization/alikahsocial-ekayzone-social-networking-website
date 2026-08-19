import { notFound } from 'next/navigation';
import PageWraper from '@/components/ui/CustomUi/PageWraper';
import { getProfileForUsername } from '@/components/shared/reels/feedData';
import ProfilePageContent from './ProfilePageContent';
import ProfileOptionsMenu from './ProfileOptionsMenu';

export default async function ProfilePage({ params }: PageProps<'/profile/[username]'>) {
    const { username } = await params;
    const profile = getProfileForUsername(username);

    if (!profile) {
        notFound();
    }

    return (
        <PageWraper
            title="Profile"
            backToPreviousPage
            headerAction={<ProfileOptionsMenu username={profile.userName} />}
        >
            <ProfilePageContent profile={profile} />
        </PageWraper>
    );
}