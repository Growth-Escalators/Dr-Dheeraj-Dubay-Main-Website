"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

// Snap-scrolling card rail. Cards keep a fixed width and peek past the right
// edge, which is what tells a visitor there's more to swipe; the arrow buttons
// are the desktop equivalent and disable themselves at each end.
//
// Used by the Conditions and Hindi blocks, which previously rendered every
// item as a static grid — 7 and 6 stacked tiles that pushed the rest of the
// homepage down for no benefit.
export function HorizontalScroller({
  ariaLabel,
  // Edge fades have to blend into whatever the section sits on, so the
  // caller names its background rather than the rail assuming white.
  surface = "white",
  children,
}: {
  ariaLabel: string;
  surface?: "white" | "tint";
  children: React.ReactNode;
}) {
  const fadeLeft =
    surface === "tint" ? "from-emerald-50" : "from-white";
  const fadeRight =
    surface === "tint" ? "from-emerald-50" : "from-white";
  const railRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const sync = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    // 4px tolerance — sub-pixel widths make the exact comparison flaky.
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    sync();
    const el = railRef.current;
    if (!el) return;
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [sync]);

  const scrollByPage = (direction: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    // Leave a card's worth of overlap so nothing is skipped over.
    el.scrollBy({ left: direction * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Edge fades — only while there is more content that way. */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r ${fadeLeft} to-transparent transition-opacity duration-200 ${
          canScrollLeft ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l ${fadeRight} to-transparent transition-opacity duration-200 ${
          canScrollRight ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        ref={railRef}
        onScroll={sync}
        role="region"
        aria-label={ariaLabel}
        tabIndex={0}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
      >
        {children}
      </div>

      {/* Arrows sit under the rail, right-aligned — floating them over the
          first/last card would cover content on narrow screens. */}
      <div className="mt-5 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => scrollByPage(-1)}
          disabled={!canScrollLeft}
          aria-label={`Scroll ${ariaLabel} left`}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-emerald-200 bg-white text-emerald-700 transition-all hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => scrollByPage(1)}
          disabled={!canScrollRight}
          aria-label={`Scroll ${ariaLabel} right`}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-emerald-200 bg-white text-emerald-700 transition-all hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
