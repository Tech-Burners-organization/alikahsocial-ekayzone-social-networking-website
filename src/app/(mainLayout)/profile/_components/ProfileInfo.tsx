import Link from "next/link";
import { formatCompactNumber } from "@/lib/format";
import type { MyProfile } from "../_lib/data";

interface ProfileInfoProps {
    profile: MyProfile;
}

export default function ProfileInfo({ profile }: ProfileInfoProps) {
    return (
        <div className="mt-12 flex flex-col gap-3">
            <div>
                <h1 className="text-2xl font-bold text-foreground">{profile.fullName}</h1>
                <p className="text-base font-medium text-muted-foreground">@{profile.userName}</p>
            </div>

            <p className="text-base font-medium text-foreground">{profile.bio}</p>

            <div className="flex items-center gap-2">
                <Link href="/profile/following" className="flex items-center gap-1 rounded-md px-1 py-0.5 hover:bg-muted">
                    <span className="text-xl font-bold text-foreground">{profile.followingCount}</span>
                    <span className="text-sm font-medium text-muted-foreground">Following</span>
                </Link>
                <Link href="/profile/followers" className="flex items-center gap-1 rounded-md px-1 py-0.5 hover:bg-muted">
                    <span className="text-xl font-bold text-foreground">{formatCompactNumber(profile.followerCount)}</span>
                    <span className="text-sm font-medium text-muted-foreground">Followers</span>
                </Link>
                <div className="flex items-center gap-1">
                    <span className="text-xl font-bold text-foreground">{profile.rating}</span>
                    <span className="text-sm font-medium text-muted-foreground">Ratings</span>
                </div>
            </div>
        </div>
    );
}
