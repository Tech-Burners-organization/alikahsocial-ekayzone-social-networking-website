"use client";

import { useState } from "react";
import { BadgeCheck, Heart, Images, MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FollowButton } from "@/components/shared/FollowButton";
import { VideoGrid } from "@/components/shared/reels/VideoGrid";
import { formatCompactNumber } from "@/lib/format";
import type { CreatorProfile } from "@/components/shared/reels/types";

interface ProfilePageContentProps {
    profile: CreatorProfile;
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
            <div className="relative z-10  mb-6 flex flex-col items-center px-4">
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
            <VideoGrid
                items={activeTab === "videos" ? profile.videos : profile.likedVideos}
                href={`/profile/${profile.userName}/watch`}
                columnsClassName="grid-cols-2 md:grid-cols-3"
            />
        </div>
    );
}