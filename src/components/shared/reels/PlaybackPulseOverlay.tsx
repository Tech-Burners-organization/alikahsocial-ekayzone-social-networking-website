'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useImperativeHandle, useRef } from 'react';

gsap.registerPlugin(useGSAP);

export interface PlaybackPulseHandle {
    play: (icon: 'play' | 'pause') => void;
}

interface PlaybackPulseOverlayProps {
    ref?: React.Ref<PlaybackPulseHandle>;
}

// Renders both icon nodes permanently (opacity 0 by default) instead of driving
// visibility from React state — GSAP toggles which is shown, so there's no
// re-render racing the animation start.
export function PlaybackPulseOverlay({ ref }: PlaybackPulseOverlayProps) {
    const scopeRef = useRef<HTMLDivElement>(null);
    const playIconRef = useRef<HTMLDivElement>(null);
    const pauseIconRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    const { contextSafe } = useGSAP({ scope: scopeRef });

    // contextSafe defers this to only ever run from the click/keydown handler that
    // calls it, never during render — the sanctioned GSAP pattern for ref access
    // outside useGSAP's own synchronous setup, which this lint rule can't
    // statically verify.
    // eslint-disable-next-line react-hooks/refs
    const play = contextSafe((icon: 'play' | 'pause') => {
        const iconEl = icon === 'play' ? playIconRef.current : pauseIconRef.current;
        const otherEl = icon === 'play' ? pauseIconRef.current : playIconRef.current;
        if (!iconEl || !otherEl || !ringRef.current) return;

        timelineRef.current?.kill();
        gsap.set(otherEl, { opacity: 0 });
        gsap.set(iconEl, { opacity: 1, scale: 0.5 });
        gsap.set(ringRef.current, { opacity: 0.6, scale: 0.6 });

        timelineRef.current = gsap
            .timeline()
            .to(iconEl, { scale: 1.15, duration: 0.18, ease: 'back.out(3)' })
            .to(iconEl, { scale: 1, duration: 0.12 })
            .to(iconEl, { opacity: 0, duration: 0.25 }, '+=0.25')
            .to(ringRef.current, { scale: 1.8, opacity: 0, duration: 0.55, ease: 'power2.out' }, 0);
    });

    useImperativeHandle(ref, () => ({ play }), [play]);

    return (
        <div ref={scopeRef} className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
            <div ref={ringRef} className="absolute h-24 w-24 rounded-full border-2 border-white/70 opacity-0" />
            <div ref={playIconRef} className="absolute rounded-full bg-black/50 p-5 text-white shadow-lg backdrop-blur-sm opacity-0">
                <svg className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                </svg>
            </div>
            <div ref={pauseIconRef} className="absolute rounded-full bg-black/50 p-5 text-white shadow-lg backdrop-blur-sm opacity-0">
                <svg className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
                </svg>
            </div>
        </div>
    );
}
