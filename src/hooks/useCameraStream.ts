"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Requests the device camera/mic and exposes independent video/audio mute toggles.
 * Browser-only (getUserMedia) — must only be invoked from event handlers/effects, never at render/module scope.
 */
export function useCameraStream() {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const [active, setActive] = useState(false);
    const [videoEnabled, setVideoEnabled] = useState(true);
    const [audioEnabled, setAudioEnabled] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const start = useCallback(async () => {
        if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
            setError("Camera is not supported in this browser.");
            return;
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            streamRef.current = stream;
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            setActive(true);
            setVideoEnabled(true);
            setAudioEnabled(true);
            setError(null);
        } catch {
            setError("Camera access was denied. Check your browser permissions.");
        }
    }, []);

    const stop = useCallback(() => {
        streamRef.current?.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
        setActive(false);
    }, []);

    const toggleVideo = useCallback(() => {
        const track = streamRef.current?.getVideoTracks()[0];
        if (!track) return;
        track.enabled = !track.enabled;
        setVideoEnabled(track.enabled);
    }, []);

    const toggleAudio = useCallback(() => {
        const track = streamRef.current?.getAudioTracks()[0];
        if (!track) return;
        track.enabled = !track.enabled;
        setAudioEnabled(track.enabled);
    }, []);

    useEffect(() => {
        return () => {
            streamRef.current?.getTracks().forEach((track) => track.stop());
        };
    }, []);

    return { videoRef, active, videoEnabled, audioEnabled, error, start, stop, toggleVideo, toggleAudio };
}
