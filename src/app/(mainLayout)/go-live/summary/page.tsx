"use client";

import PageWraper from "@/components/ui/CustomUi/PageWraper";
import Container from "@/components/ui/CustomUi/Container";
import { Button } from "@/components/ui/button";
import {
    CheckCircle2,
    Clock,
    Eye,
    Users,
    Heart,
    MessageCircle,
    Share2,
    Play,
} from "lucide-react";

export default function StreamSummaryPage() {
    const summary = {
        duration: "1h 04m",
        peakViewers: 134,
        totalViewers: 421,
        likes: 23,
        comments: 198,
        shares: 31,
    };

    return (
        <PageWraper title="Stream Summary">
            <Container className="flex flex-col gap-6">
                {/* Success header */}
                <div className="flex flex-col items-center gap-5 text-center">
                    <div className="rounded-full bg-emerald-100/60 p-8">
                        <CheckCircle2 className="size-14 text-emerald-600" />
                    </div>
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold text-[#0a2c07]">Stream Summary</h1>
                        <p className="text-sm text-base-color/60">
                            Your stream has been saved and is available for replay
                        </p>
                    </div>
                </div>

                {/* Replay preview */}
                <div className="relative rounded-lg bg-base-color/50 border border-base-color/30 overflow-hidden" style={{ height: "350px" }}>
                    <div className="absolute inset-0 flex items-center justify-center bg-base-color/20">
                        <div className="flex flex-col items-center gap-3">
                            <div className="rounded-full bg-emerald-500 p-6 shadow-lg cursor-pointer hover:bg-emerald-600 transition-colors">
                                <Play className="size-10 text-white fill-white" />
                            </div>
                            <p className="text-sm font-medium text-base-color/60">Watch Replay</p>
                        </div>
                    </div>
                </div>

                {/* Stats grid */}
                <div className="flex flex-col gap-3 rounded-lg border border-base-color/30 bg-white overflow-hidden">
                    {[
                        { icon: <Clock className="size-5" />, label: "Duration", value: summary.duration },
                        { icon: <Eye className="size-5" />, label: "Peak Viewers", value: summary.peakViewers.toString() },
                        { icon: <Users className="size-5" />, label: "Total Viewers", value: summary.totalViewers.toString() },
                        { icon: <Heart className="size-5" />, label: "Likes", value: summary.likes.toString() },
                        { icon: <MessageCircle className="size-5" />, label: "Comments", value: summary.comments.toString() },
                        { icon: <Share2 className="size-5" />, label: "Shares", value: summary.shares.toString() },
                    ].map((stat, i) => (
                        <div
                            key={stat.label}
                            className="flex items-center justify-between px-4 py-3 border-b border-base-color/30 last:border-0"
                        >
                            <div className="flex items-center gap-2.5 text-base-color/60">
                                {stat.icon}
                                <span className="text-sm">{stat.label}</span>
                            </div>
                            <span className="text-sm font-bold text-[#0a2c07]">
                                {stat.label === "Duration" ? stat.value : Number(stat.value).toLocaleString()}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        className="flex-1 rounded-full font-semibold"
                    >
                        Share
                    </Button>
                    <Button className="flex-1 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold">
                        Edit Video
                    </Button>
                </div>
            </Container>
        </PageWraper>
    );
}
