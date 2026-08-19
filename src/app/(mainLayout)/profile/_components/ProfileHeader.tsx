import Image from "next/image";
import type { MyProfile } from "../_lib/data";

interface ProfileHeaderProps {
    profile: MyProfile;
}

export default function ProfileHeader({ profile }: ProfileHeaderProps) {
    return (
        <div className="relative">
            <div className="relative aspect-video md:aspect-[600/264] w-full overflow-hidden rounded-[26px] bg-muted">
                <Image
                    src={profile.coverUrl}
                    alt=""
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 850px"
                    className="object-cover"
                />
            </div>

            <div className="absolute -bottom-10 left-6">
                <div className="relative size-[99px] overflow-hidden rounded-full bg-muted ring-4 ring-secondary-color">
                    <Image src={profile.avatarUrl} alt={profile.fullName} fill sizes="99px" className="object-cover" />
                </div>
                {profile.isPro && (
                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 rounded-[3px] border-2 border-background bg-secondary-color px-2.5 py-0.5 text-sm font-bold leading-none text-white">
                        Pro
                    </span>
                )}
            </div>
        </div>
    );
}
