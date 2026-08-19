"use client";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState, useTransition } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type Tab<T extends string> = {
  label: string;
  value: T;
  disabled?: boolean;
  content: React.ReactNode;
};

type ReusableTabsProps<T extends string> = {
  tabs: Tab<T>[];
  activeTab: T;
  align?: "left" | "center" | "right";
  resetPage?: boolean;
  /** Query params to drop when switching tabs — e.g. a `search` or filter that only makes sense on the tab it was set from. */
  resetParams?: string[];
  tabContentStyle?: string;
  tabName?: string;
  variant?: "default" | "bordered";
};

const ReusableTabs = <T extends string>({
  tabs,
  activeTab,
  align = "center",
  resetPage = false,
  resetParams,
  tabContentStyle = "",
  tabName = "tab",
  variant = "default",
}: ReusableTabsProps<T>) => {
  const tabRowRef = useRef<HTMLDivElement | null>(null);
  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ offset: 0, width: 0 });
  // Per-tab clip-path inset (in px, from that tab's own left/right edges) describing
  // exactly how much of its white text overlay is hidden. Only the slice the pill is
  // currently over is left visible — so the wipe follows the pill pixel-for-pixel
  // instead of the whole label flipping white the moment any overlap starts.
  const [textClips, setTextClips] = useState<Record<string, { left: number; right: number }>>({});
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPending, startTransition] = useTransition(); // 2. Initialize transition

  // The pill spans the active tab's whole button — offsetLeft/offsetWidth are already
  // measured against the row's padding box, which is exactly the indicator's containing
  // block (the row is `relative`, the indicator is `absolute left-0`). So they need no
  // compensation for the row's border, padding, or scrollLeft the way rect math would.
  const updateIndicator = (target: HTMLElement) => {
    setIndicatorStyle({ offset: target.offsetLeft, width: target.offsetWidth });
  };

  // Runs on every animation frame while the pill slides — computes, per tab, exactly
  // how much of its label the pill's current bounds overlap, live.
  const handleIndicatorUpdate = (pillLeft: number, pillWidth: number) => {
    const row = tabRowRef.current;
    if (!row) return;

    const pillRight = pillLeft + pillWidth;

    const next: Record<string, { left: number; right: number }> = {};
    row.querySelectorAll<HTMLElement>("[tab-value]").forEach((el) => {
      // Same padding-box origin as the pill's x (see updateIndicator), so the two
      // are directly comparable without a scroll or border term.
      const tabLeft = el.offsetLeft;
      const tabRight = tabLeft + el.offsetWidth;
      const value = el.getAttribute("tab-value") ?? "";

      const overlapLeft = Math.max(tabLeft, pillLeft);
      const overlapRight = Math.min(tabRight, pillRight);

      next[value] = overlapRight > overlapLeft
        ? { left: overlapLeft - tabLeft, right: tabRight - overlapRight } // visible slice
        : { left: el.offsetWidth, right: 0 }; // no overlap — fully hidden
    });

    setTextClips(next);
  };

  useEffect(() => {
    const measureActiveTab = () => {
      // Scoped to this row, so a second ReusableTabs on the same page can't be measured instead.
      const activeTabElement = tabRowRef.current?.querySelector<HTMLElement>(
        `[data-tab-button="${activeTab}"]`
      );
      if (activeTabElement) {
        updateIndicator(activeTabElement);
      }
    };

    measureActiveTab();

    // Local web fonts (Graphik/Cagliari) can swap in after this first paint —
    // re-measure once they're actually loaded so the button width is accurate.
    document.fonts?.ready?.then(measureActiveTab);

    window.addEventListener('resize', measureActiveTab);

    return () => {
      window.removeEventListener('resize', measureActiveTab);
    };
  }, [activeTab]);

  // Mirrors framer-motion's `initial={false}`: the very first placement of the
  // pill is instant (no slide-in from 0), only subsequent moves are tweened.
  const didPlaceIndicatorRef = useRef(false);

  useGSAP(() => {
    const indicator = indicatorRef.current;
    if (!indicator) return;

    const targetX = indicatorStyle.offset;
    const targetWidth = indicatorStyle.width;

    if (!didPlaceIndicatorRef.current) {
      didPlaceIndicatorRef.current = true;
      gsap.set(indicator, { x: targetX, width: targetWidth });
      handleIndicatorUpdate(targetX, targetWidth);
      return;
    }

    gsap.to(indicator, {
      x: targetX,
      width: targetWidth,
      duration: 1,
      ease: "power2.inOut",
      onUpdate: () => {
        handleIndicatorUpdate(
          gsap.getProperty(indicator, "x") as number,
          gsap.getProperty(indicator, "width") as number
        );
      },
    });
  }, { dependencies: [indicatorStyle], scope: tabRowRef });

  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const { replace } = router;

  const justifyClass =
    align === "left"
      ? "justify-start"
      : align === "right"
        ? "justify-end"
        : "justify-center";

  // Only pushes the new URL — the pill itself only ever moves in response to the
  // `activeTab` prop actually changing (see the effect above), so it never shows
  // a tab that isn't truly confirmed active yet.
  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(tabName, value);
      if (resetPage) {
        params.set("page", "1");
        params.delete("search");
      }
      resetParams?.forEach((key) => params.delete(key));
    } else {
      params.delete(tabName);
    }

    startTransition(() => {
      replace(`${pathName}?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div className="w-full h-fit pt-2 overflow-hidden">
      <div className={`w-full flex ${justifyClass}`}>
        <div
          ref={tabRowRef}
          className={`scrollbar-thin scrollbar-thumb-[#10b981] scrollbar-track-gray-200 hover:scrollbar-thumb-[#10b98155] w-full ${variant === "bordered" ? " p-1 rounded-xl flex gap-2 relative overflow-x-auto"
            : "bg-[#ffffff]  p-1 rounded-xl flex gap-2 relative overflow-x-auto  border border-base-color/10"}`}
        >
          {tabs.map((tab) => {
            const clip = textClips[tab.value];

            return (
              <button
                key={tab.value}
                data-tab-button={tab.value}
                disabled={tab.disabled || false}
                onClick={() => handleTabChange(tab.value)}
                className="w-full px-4 z-10 py-1.5 rounded-md bg-transparent font-medium text-sm sm:text-base transition-all disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer text-nowrap"
              >
                {/* data-tab-button (on the button) is what the pill measures, so it spans the
                    tab's full width. tab-value stays on the text itself — it's only used to
                    measure the label for the white-text wipe as the pill slides across it. */}
                {variant === "bordered" ? (
                  <span
                    tab-value={tab.value}
                    className={activeTab === tab.value ? "text-secondary-color" : "text-[#707070]"}
                  >
                    {tab.label}
                  </span>
                ) : (
                  <span tab-value={tab.value} className="relative inline-block">
                    {/* Base layer — always the plain label */}
                    <span className="text-secondary-color">{tab.label}</span>
                    {/* Overlay — white copy, clipped to only the slice the pill currently covers */}
                    <span
                      className="absolute inset-0 text-white pointer-events-none"
                      style={{
                        clipPath: clip
                          ? `inset(0 ${clip.right}px 0 ${clip.left}px)`
                          : "inset(0 100% 0 0)",
                      }}
                    >
                      {tab.label}
                    </span>
                  </span>
                )}
              </button>
            );
          })}
          <div
            ref={indicatorRef}
            className={`${variant === "bordered" ? "indicator absolute left-0 bottom-1 top-1 border-b-2 border-secondary-color z-0" : "indicator absolute left-0 bottom-1 top-1 rounded-md bg-secondary-color z-0"} `}
          />
        </div>
      </div>

      <div className={cn("mt-10", tabContentStyle)}>
        {tabs.find((tab) => tab.value === activeTab)?.content}
      </div>
    </div>
  );
};

export default ReusableTabs;
