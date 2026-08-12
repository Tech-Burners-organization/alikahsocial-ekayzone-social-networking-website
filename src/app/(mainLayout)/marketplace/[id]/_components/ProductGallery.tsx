"use client";

import { useRef, useState } from "react";
import { EllipsisVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { ShareModal } from "@/components/shared/reels/ShareModal";
import { ImagePreview } from "@/components/ui/CustomUi/ReuseImagePreview";

// Fraction of the container's width a drag must cross before it commits to
// the next/previous slide on release; short of that, it snaps back.
const SWIPE_THRESHOLD_RATIO = 0.15;
// Pixels of movement before a pointer gesture counts as a drag rather than a tap.
const DRAG_START_TOLERANCE = 6;

export default function ProductGallery({ images, title }: { images: string[]; title: string }) {
    const [active, setActive] = useState(0);
    const [shareOpen, setShareOpen] = useState(false);
    const [dragOffset, setDragOffset] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const dragStartXRef = useRef(0);
    const pointerIdRef = useRef<number | null>(null);

    const clampIndex = (index: number) => Math.min(Math.max(index, 0), images.length - 1);

    const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
        if (images.length < 2) return;

        // Deliberately don't capture the pointer yet — only once real movement
        // (below) confirms this is a drag. Capturing on every tap would redirect
        // the resulting click to this container instead of whatever was actually
        // tapped, silently breaking the Share button and the image's own
        // click-to-zoom.
        dragStartXRef.current = event.clientX;
        pointerIdRef.current = event.pointerId;
    };

    const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
        if (pointerIdRef.current !== event.pointerId) return;

        const width = containerRef.current?.offsetWidth || 1;
        let delta = event.clientX - dragStartXRef.current;

        if (!isDragging) {
            if (Math.abs(delta) < DRAG_START_TOLERANCE) return;
            setIsDragging(true);
            event.currentTarget.setPointerCapture(event.pointerId);
        }

        // Rubber-band: resist dragging past the first/last image instead of a hard stop.
        if ((active === 0 && delta > 0) || (active === images.length - 1 && delta < 0)) {
            delta *= 0.35;
        }

        setDragOffset((delta / width) * 100);
    };

    const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
        if (pointerIdRef.current !== event.pointerId) return;
        pointerIdRef.current = null;

        if (!isDragging) return; // plain tap — let the click reach its real target normally

        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }

        setIsDragging(false);
        if (Math.abs(dragOffset) > SWIPE_THRESHOLD_RATIO * 100) {
            setActive((current) => clampIndex(current + (dragOffset < 0 ? 1 : -1)));
        }
        setDragOffset(0);
    };

    const translatePercent = -active * 100 + dragOffset;

    return (
        <div
            ref={containerRef}
            className="relative aspect-779/403 w-full touch-pan-y select-none overflow-hidden rounded-2xl bg-muted"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
        >
            <div
                className={cn("flex h-full", !isDragging && "transition-transform duration-300 ease-out")}
                style={{ transform: `translateX(${translatePercent}%)` }}
            >
                {images.map((image) => (
                    <div key={image} className="h-full w-full shrink-0">
                        <ImagePreview src={image} alt={title} title={title} className="h-full w-full rounded-none" />
                    </div>
                ))}
            </div>

            <button
                type="button"
                onClick={() => setShareOpen(true)}
                aria-label="Share this product"
                className="absolute top-3 right-3 flex size-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-colors hover:bg-white/30"
            >
                <EllipsisVertical className="size-5" />
            </button>

            {images.length > 0 && (
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
                    {images.map((image, index) => (
                        <button
                            key={image}
                            type="button"
                            aria-label={`Show image ${index + 1}`}
                            onClick={() => setActive(index)}
                            className={cn(
                                "h-2.5 rounded-full bg-white transition-all",
                                index === active ? "w-7 opacity-100" : "w-2.5 opacity-40"
                            )}
                        />
                    ))}
                </div>
            )}

            <ShareModal
                open={shareOpen}
                onOpenChange={setShareOpen}
                shareUrl={typeof window !== "undefined" ? window.location.href : ""}
                shareTitle={title}
            />
        </div>
    );
}
