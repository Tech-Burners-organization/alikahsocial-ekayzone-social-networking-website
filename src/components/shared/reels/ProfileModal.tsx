'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BadgeCheck, EllipsisVertical, Play, Radio } from 'lucide-react';
import { toast } from 'sonner';
import ReusableModal from '@/components/ui/CustomUi/ReuseableModal';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatCompactNumber } from '@/lib/format';
import { FollowButton } from '../FollowButton';
import { ReportModal } from './ReportModal';
import { BlockUserConfirmModal } from './BlockUserConfirmModal';
import type { CreatorProfile, ProfileThumbnail } from './types';

interface ProfileModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    profile: CreatorProfile;
}

function ThumbnailGrid({ items, username }: { items: ProfileThumbnail[]; username: string }) {
    return (
        <div className="grid grid-cols-3 gap-1">
            {items.map((item) => (
                <Link
                    key={item.id}
                    href={`/profile/${username}`}
                    className="relative aspect-9/16 overflow-hidden rounded-md bg-zinc-200"
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.thumbnailUrl} alt="" className="h-full w-full object-cover" />
                    {item.isLive && (
                        <span className="absolute left-1 top-1 flex items-center gap-0.5 rounded bg-rose-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                            <Radio className="h-2.5 w-2.5" />
                            LIVE
                        </span>
                    )}
                    <span className="absolute bottom-1 left-1 flex items-center gap-0.5 text-[10px] font-semibold text-white drop-shadow-md">
                        <Play className="h-2.5 w-2.5 fill-white" />
                        {formatCompactNumber(item.views)}
                    </span>
                </Link>
            ))}
        </div>
    );
}

export function ProfileModal({ open, onOpenChange, profile }: ProfileModalProps) {
    const [activeTab, setActiveTab] = useState<'videos' | 'liked'>('videos');
    const [activeAction, setActiveAction] = useState<'report' | 'block' | null>(null);

    return (
        <ReusableModal open={open} onOpenChange={onOpenChange} title={profile.displayName}>
            <div className='relative'>
                <DropdownMenu>
                    <DropdownMenuTrigger
                        render={
                            <button
                                type="button"
                                aria-label="Profile options"
                                className="absolute right-0 -top-2 flex size-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted"
                            />
                        }
                    >
                        <EllipsisVertical className="size-6" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem className="cursor-pointer" onClick={() => setActiveAction('report')}>
                            Report Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem variant="destructive" className="cursor-pointer" onClick={() => setActiveAction('block')}>
                            Block User
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <div className="flex flex-col items-center gap-3 text-center">
                    <Avatar size="lg" className="size-20">
                        <AvatarImage src={profile.avatarUrl} alt={profile.displayName} />
                        <AvatarFallback>{profile.displayName[0]}</AvatarFallback>
                    </Avatar>

                    <span className="flex items-center gap-1 text-sm text-lighter-color">
                        @{profile.username}
                        {profile.isVerified && <BadgeCheck className="h-4 w-4 fill-secondary-color text-white" />}
                    </span>

                    <div className="flex items-center gap-6 text-sm">
                        <div>
                            <span className="font-bold text-base-color">{formatCompactNumber(profile.followingCount)}</span>{' '}
                            <span className="text-lighter-color">Following</span>
                        </div>
                        <div>
                            <span className="font-bold text-base-color">{formatCompactNumber(profile.followerCount)}</span>{' '}
                            <span className="text-lighter-color">Followers</span>
                        </div>
                    </div>

                    <p className="max-w-sm text-sm text-base-color">{profile.bio}</p>

                    <div className="flex items-center gap-3">
                        <FollowButton />
                        <button
                            type="button"
                            onClick={() => toast.info('Messaging is coming soon')}
                            className="rounded-full border border-input px-4 py-1.5 text-xs font-semibold text-base-color transition-colors hover:bg-input-color"
                        >
                            Send Message
                        </button>
                    </div>
                </div>

                <div className="mt-5 flex items-center justify-center gap-6 border-b border-slate-100">
                    {(['videos', 'liked'] as const).map((tab) => (
                        <button
                            key={tab}
                            type="button"
                            onClick={() => setActiveTab(tab)}
                            className={`pb-2 text-sm font-semibold capitalize transition-colors ${activeTab === tab ? 'border-b-2 border-secondary-color text-base-color' : 'text-lighter-color'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="pt-4">
                    <ThumbnailGrid items={activeTab === 'videos' ? profile.videos : profile.likedVideos} username={profile.username} />
                </div>
            </div>

            <ReportModal
                open={activeAction === 'report'}
                onOpenChange={(next) => setActiveAction(next ? 'report' : null)}
                target="profile"
                targetUsername={profile.username}
            />
            <BlockUserConfirmModal
                open={activeAction === 'block'}
                onOpenChange={(next) => setActiveAction(next ? 'block' : null)}
                targetUsername={profile.username}
            />
        </ReusableModal>
    );
}
