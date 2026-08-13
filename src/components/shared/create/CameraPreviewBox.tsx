"use client";

import { Radio } from "lucide-react";
import { useCameraStream } from "@/hooks/useCameraStream";

export function CameraPreviewBox() {
    const { videoRef, active, error, start } = useCameraStream();

    return (
        <div className="relative h-111 w-full overflow-hidden rounded-[10px] border border-border bg-muted">
            <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className={active ? "size-full object-cover" : "hidden"}
            />

            {!active && (
                <button
                    type="button"
                    onClick={start}
                    className="flex size-full flex-col items-center justify-center gap-5"
                >
                    <div
                        className="flex size-12.75 items-center justify-center rounded-lg"
                        style={{ backgroundColor: "rgba(255,51,102,0.15)" }}
                    >
                        <Radio className="size-6" style={{ color: "#FF3366" }} />
                    </div>
                    <div className="flex flex-col items-center gap-0.5">
                        <p className="text-xl font-extrabold text-foreground">Camera Preview</p>
                        <p className="text-base text-muted-foreground">
                            {error ?? "Tap to enable Camera"}
                        </p>
                    </div>
                </button>
            )}
        </div>
    );
}
