'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Heart } from 'lucide-react';
import { useImperativeHandle, useRef } from 'react';

gsap.registerPlugin(useGSAP);

export interface LikeBurstHandle {
    play: () => void;
}

interface LikeBurstOverlayProps {
    ref?: React.Ref<LikeBurstHandle>;
}

const PARTICLE_COUNT = 8;

// Center-screen heart burst shown when a video is liked (not on unlike): a soft
// glow pulse, a semi-transparent main heart, and a ring of small particle hearts
// flying outward — glassier and more dynamic than a single flat solid icon.
export function LikeBurstOverlay({ ref }: LikeBurstOverlayProps) {
    const scopeRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);
    const heartRef = useRef<HTMLDivElement>(null);
    const particleRefs = useRef<(HTMLDivElement | null)[]>([]);

    const { contextSafe } = useGSAP({ scope: scopeRef });

    // contextSafe defers this to only ever run from the click handler below, never
    // during render — the sanctioned GSAP pattern for ref access outside useGSAP's
    // own synchronous setup, which this lint rule can't statically verify.
    // eslint-disable-next-line react-hooks/refs
    const play = contextSafe(() => {
        const heart = heartRef.current;
        const glow = glowRef.current;
        if (!heart || !glow) return;

        gsap.killTweensOf([heart, glow, ...particleRefs.current]);

        // Soft radial glow pulse behind everything
        gsap.fromTo(glow, { opacity: 0, scale: 0.4 }, { opacity: 0.55, scale: 1.7, duration: 0.6, ease: 'power2.out' });
        gsap.to(glow, { opacity: 0, duration: 0.45, delay: 0.3 });

        // Main heart — semi-transparent, glassy, with a glow shadow instead of a flat fill
        gsap.fromTo(
            heart,
            { opacity: 0, scale: 0.3, rotate: -8 },
            {
                opacity: 0.92,
                scale: 1.25,
                rotate: 0,
                duration: 0.3,
                ease: 'back.out(4)',
                onComplete: () => {
                    gsap.to(heart, { opacity: 0, scale: 1, duration: 0.45, delay: 0.3 });
                },
            }
        );

        // A ring of small hearts bursts outward and fades
        particleRefs.current.forEach((particle, index) => {
            if (!particle) return;
            const angle = (index / PARTICLE_COUNT) * Math.PI * 2;
            const distance = 70 + (index % 3) * 22;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;

            gsap.fromTo(
                particle,
                { opacity: 0, scale: 0, x: 0, y: 0, rotate: 0 },
                {
                    opacity: 0.85,
                    scale: 0.7 + (index % 3) * 0.15,
                    x,
                    y,
                    rotate: (index % 2 === 0 ? 1 : -1) * 45,
                    duration: 0.6,
                    ease: 'power2.out',
                    delay: index * 0.02,
                    onComplete: () => {
                        gsap.to(particle, { opacity: 0, duration: 0.3 });
                    },
                }
            );
        });
    });

    useImperativeHandle(ref, () => ({ play }), [play]);

    return (
        <div ref={scopeRef} className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center overflow-hidden">
            <div ref={glowRef} className="absolute h-40 w-40 rounded-full bg-rose-500/40 blur-2xl opacity-0" />

            {Array.from({ length: PARTICLE_COUNT }).map((_, index) => (
                <div
                    key={index}
                    ref={(el) => {
                        particleRefs.current[index] = el;
                    }}
                    className="absolute opacity-0"
                >
                    <Heart className="h-4 w-4 fill-rose-400/80 text-rose-200/80" />
                </div>
            ))}

            <div ref={heartRef} className="absolute opacity-0 drop-shadow-[0_0_20px_rgba(244,63,94,0.55)]">
                <Heart className="h-28 w-28 fill-rose-500/75 text-rose-100/90" strokeWidth={1.5} />
            </div>
        </div>
    );
}
