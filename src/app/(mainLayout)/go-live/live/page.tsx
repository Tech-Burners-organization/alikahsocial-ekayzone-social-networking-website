"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PageWraper from "@/components/ui/CustomUi/PageWraper";
import Container from "@/components/ui/CustomUi/Container";
import { LiveVideoStage } from "@/components/shared/create/LiveVideoStage";
import { LiveChatPanel } from "@/components/shared/create/LiveChatPanel";
import CreationModal from "@/components/shared/create/CreationModal";
import StreamSummaryModal from "@/components/shared/create/StreamSummaryModal";
import { useCameraStream } from "@/hooks/useCameraStream";

const MOCK_VIEWERS = "7.4K";

function formatElapsed(totalSeconds: number): string {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return [hours, minutes, seconds].map((value) => value.toString().padStart(2, "0")).join(":");
}

function formatDuration(totalSeconds: number): string {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${minutes.toString().padStart(2, "0")}m`;
    return `${minutes}m ${(totalSeconds % 60).toString().padStart(2, "0")}s`;
}

export default function LiveStreamPage() {
    const router = useRouter();
    const camera = useCameraStream();
    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const [endStreamOpen, setEndStreamOpen] = useState(false);
    const [summaryOpen, setSummaryOpen] = useState(false);

    useEffect(() => {
        camera.start();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const interval = setInterval(() => setElapsedSeconds((prev) => prev + 1), 1000);
        return () => clearInterval(interval);
    }, []);

    const handleConfirmEndStream = () => {
        camera.stop();
        setSummaryOpen(true);
    };

    const handleSummaryOpenChange = (open: boolean) => {
        setSummaryOpen(open);
        if (!open) {
            router.push("/");
        }
    };

    return (
        <PageWraper title="Go Live" backToPreviousPage>
            <Container className="flex flex-col gap-6 lg:flex-row">
                <LiveVideoStage
                    videoRef={camera.videoRef}
                    active={camera.active}
                    error={camera.error}
                    videoEnabled={camera.videoEnabled}
                    audioEnabled={camera.audioEnabled}
                    elapsedLabel={formatElapsed(elapsedSeconds)}
                    viewerLabel={MOCK_VIEWERS}
                    onToggleVideo={camera.toggleVideo}
                    onToggleAudio={camera.toggleAudio}
                    onEndStream={() => setEndStreamOpen(true)}
                />
                <LiveChatPanel />
            </Container>

            <CreationModal
                open={endStreamOpen}
                onOpenChange={setEndStreamOpen}
                type="end-stream"
                onConfirm={handleConfirmEndStream}
            />

            <StreamSummaryModal
                open={summaryOpen}
                onOpenChange={handleSummaryOpenChange}
                stats={{
                    duration: formatDuration(elapsedSeconds),
                    peakViewers: 134,
                    totalViewers: 421,
                    likes: 23,
                    comments: 198,
                    shares: 31,
                }}
            />
        </PageWraper>
    );
}
