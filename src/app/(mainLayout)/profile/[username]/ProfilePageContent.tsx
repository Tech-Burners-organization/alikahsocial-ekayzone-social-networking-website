"use client";

import { useState } from "react";
import Link from "next/link";
import { BadgeCheck, Heart, Images, MessageCircle, Play, Radio } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FollowButton } from "@/components/shared/FollowButton";
import { formatCompactNumber } from "@/lib/format";
import type { CreatorProfile, ProfileThumbnail } from "@/components/shared/reels/types";
import { AllImages } from "@/../public/images/AllImages";
import Image from "next/image";

interface ProfilePageContentProps {
    profile: CreatorProfile;
}

function ThumbnailGrid({ items, userName }: { items: ProfileThumbnail[]; userName: string }) {
    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-muted">
                    <Play className="size-6 text-muted-foreground/50" />
                </div>
                <p className="text-sm font-medium text-muted-foreground">No posts yet</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-3 gap-1">
            {items.map((item) => (
                <Link
                    key={item.id}
                    href={`/profile/${userName}/watch`}
                    className="relative overflow-hidden bg-muted group aspect-9/12 rounded-md"
                >
                    <Image
                        src={item.thumbnailUrl}
                        alt=""
                        width={1000}
                        height={1000}
                        className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {item.isLive && (
                        <span className="absolute left-1.5 top-1.5 flex items-center gap-0.5 rounded bg-rose-500 px-1.5 py-0.5 text-[10px] font-bold text-white leading-none">
                            <Radio className="size-2.5" />
                            LIVE
                        </span>
                    )}
                    <span className="absolute bottom-1.5 right-1.5 flex items-center gap-0.5 text-[10px] font-semibold text-white drop-shadow-md bg-black/30 rounded px-1 py-0.5 backdrop-blur-sm">
                        <Play className="size-2.5 fill-white" />
                        {formatCompactNumber(item.views)}
                    </span>
                </Link>
            ))}
        </div>
    );
}

export default function ProfilePageContent({ profile }: ProfilePageContentProps) {
    const [activeTab, setActiveTab] = useState<"videos" | "liked">("videos");

    const tabs = [
        { id: "videos" as const, label: "Posts", icon: Images },
        { id: "liked" as const, label: "Liked", icon: Heart },
    ];

    return (
        <div>
            {/* ─── Profile Info ─────────────────────────── */}
            <div className="relative z-10 -mt-16 mb-6 flex flex-col items-center px-4">
                {/* Avatar */}
                <Avatar className="size-32 ring-4 ring-background shadow-lg mb-4">
                    <AvatarImage src={profile.avatarUrl} alt={profile.fullName} />
                    <AvatarFallback className="text-2xl font-bold">
                        {profile.fullName.charAt(0)}
                    </AvatarFallback>
                </Avatar>

                {/* Name & Username */}
                <div className="text-center mb-3">
                    <div className="flex items-center justify-center gap-1.5">
                        <h1 className="text-xl font-bold text-foreground">
                            {profile.fullName}
                        </h1>
                        {profile.isVerified && (
                            <BadgeCheck className="size-5 fill-secondary-color text-white" />
                        )}
                    </div>
                    <p className="text-sm text-muted-foreground">@{profile.userName}</p>
                </div>

                {/* Bio */}
                {profile.bio && (
                    <p className="text-sm text-center text-foreground max-w-md mb-4 leading-relaxed">
                        {profile.bio}
                    </p>
                )}

                {/* Stats */}
                <div className="flex items-center gap-8 mb-5">
                    <div className="text-center">
                        <span className="block text-base font-bold text-foreground">
                            {formatCompactNumber(profile.followingCount)}
                        </span>
                        <span className="text-xs text-muted-foreground">Following</span>
                    </div>
                    <div className="text-center">
                        <span className="block text-base font-bold text-foreground">
                            {formatCompactNumber(profile.followerCount)}
                        </span>
                        <span className="text-xs text-muted-foreground">Followers</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                    <FollowButton />
                    <button className="flex items-center gap-1.5 rounded-full border border-border px-5 py-1.5 text-sm font-semibold text-foreground transition-all hover:bg-muted">
                        <MessageCircle className="size-4" />
                        Message
                    </button>
                </div>
            </div>

            {/* ─── Tabs ─────────────────────────────────── */}
            <div className="border-b border-border mb-4">
                <div className="flex items-center justify-center gap-0">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all border-b-2 -mb-[1px] ${isActive
                                    ? "border-secondary-color text-foreground"
                                    : "border-transparent text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                <Icon className="size-4" />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* ─── Content Grid ─────────────────────────── */}
            <ThumbnailGrid
                items={activeTab === "videos" ? profile.videos : profile.likedVideos}
                userName={profile.userName}
            />
        </div>
    );
}