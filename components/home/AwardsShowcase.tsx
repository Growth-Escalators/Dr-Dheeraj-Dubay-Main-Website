"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  AwardIcon,
  TrophyIcon,
} from "lucide-react";
import type { Award } from "@/lib/awards";
import { EXPERIENCE_YEARS_DISPLAY } from "@/lib/clinic-info";

const AUTO_ADVANCE_MS = 4500;

// Awards & Honours — the credibility centrepiece of the homepage.
//
// The portrait is FIXED; only the card on the right changes as you move
// through the six awards. That isn't just a design choice: no award photos
// have ever been uploaded to public/assets/awards/ (README only), so the old
// carousel already showed the same fallback image on every slide — it just
// looked accidental. `Award.image` is deliberately not rendered here.
//
// The figure is /assets/images/hero.png — a 2048px cut-out with a transparent
// background, so it sits directly on the decorative field with no card around
// it. Same file the hero uses, so it's already in cache by the time a visitor
// scrolls this far.

// Facts for the credential panel, all published elsewhere on the site
// (lib/clinic-info.ts, the AwardsSection timeline, /about). Nothing new is
// asserted here, and nothing is presented as a quote from the doctor.
const CREDENTIALS = [
  "Forbes World Record holder",
  "Health Minister of Rajasthan — 3 years running",
  `${EXPERIENCE_YEARS_DISPLAY} years in joint replacement`,
];

// `awards` comes from the DB via getShowcaseAwards() in app/page.tsx, which
// falls back to the static list — so this component never has to handle an
// empty array beyond the guard below.
export default function AwardsShowcase({ awards }: { awards: Award[] }) {
  const AWARDS = awards;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const count = AWARDS.length;
  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + count) % count),
    [count],
  );

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    // Auto-advance stops while hovered, while focus is inside the section, and
    // entirely for visitors who ask for reduced motion.
    if (paused || reducedMotion) return;
    const timer = setInterval(next, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [paused, reducedMotion, next]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dx > 50) prev();
    else if (dx < -50) next();
    touchStartX.current = null;
  };

  // Belt and braces: getShowcaseAwards() already falls back to the static
  // list, but an all-unpublished table shouldn't crash the homepage.
  const current = AWARDS[index];
  if (!current) return null;

  return (
    <section
      aria-labelledby="awards-heading"
      className="relative overflow-hidden bg-gradient-to-br from-[#EAF7F0] via-[#F4FBF7] to-[#E3F4EC]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Decorative field: soft wave ribbons + an oversized laurel watermark.
          Inline SVG rather than image assets — nothing extra to download, and
          it scales cleanly at any width. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1440 700"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          <path
            d="M0 470C240 380 420 560 720 470S1200 300 1440 380V700H0Z"
            fill="#0F766E"
            fillOpacity="0.05"
          />
          <path
            d="M0 560C260 470 480 640 760 560S1220 420 1440 480V700H0Z"
            fill="#0F766E"
            fillOpacity="0.06"
          />
          <path
            d="M980 0C1120 90 1240 60 1440 130V0H980Z"
            fill="#0F766E"
            fillOpacity="0.04"
          />
        </svg>

        <TrophyIcon
          className="absolute -left-10 top-16 h-[420px] w-[420px] text-emerald-700/[0.04] lg:left-4"
          strokeWidth={1}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-6">
          {/* ---------- Left: lockup + fixed portrait ---------- */}
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-emerald-800 backdrop-blur">
              <AwardIcon className="h-4 w-4 text-emerald-600" />
              Recognition
            </span>

            <h2
              id="awards-heading"
              className="font-display mt-5 text-4xl font-bold leading-[1.05] text-gray-900 sm:text-5xl lg:text-6xl"
            >
              Awards &amp;{" "}
              <span className="text-emerald-700">Honours</span>
            </h2>

            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-gray-600">
              Recognised globally for advancing joint replacement surgery.
            </p>
            <span className="mt-5 block h-[3px] w-16 rounded-full bg-emerald-500/70" />

            {/* Portrait + credential panel. The portrait is bottom-anchored so
                the crop never lands on the face as the column narrows. */}
            <div className="relative mt-8 lg:mt-10">
              <div className="relative mx-auto h-[340px] w-full max-w-md sm:h-[420px] lg:h-[480px] lg:max-w-none">
                <Image
                  src="/assets/images/hero.png"
                  alt="Dr. Dheeraj Dubay"
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 60vw, 45vw"
                  className="object-contain object-bottom"
                />
              </div>

              <div className="relative z-10 -mt-10 w-fit rounded-2xl bg-emerald-900 px-6 py-5 text-white shadow-xl sm:-mt-14 lg:absolute lg:bottom-0 lg:left-0 lg:mt-0 lg:max-w-[15rem]">
                <TrophyIcon className="mb-3 h-6 w-6 text-amber-300" />
                <ul className="space-y-2 text-[13px] leading-snug text-emerald-50">
                  {CREDENTIALS.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* ---------- Right: the part that moves ---------- */}
          <div className="relative">
            {/* Arrows flank the card on desktop; on mobile they move below the
                dots, where a thumb can actually reach them. */}
            <button
              type="button"
              onClick={prev}
              aria-label="Previous award"
              className="absolute -left-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-gray-700 shadow-md transition hover:bg-emerald-50 hover:text-emerald-700 lg:inline-flex"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next award"
              className="absolute -right-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-gray-700 shadow-md transition hover:bg-emerald-50 hover:text-emerald-700 lg:inline-flex"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>

            <div
              aria-live="polite"
              className="rounded-[28px] border border-white/70 bg-white/70 p-7 text-center shadow-[0_18px_50px_-20px_rgba(6,78,59,0.35)] backdrop-blur-md sm:p-9"
            >
              {/* `key` restarts the fade/drift transition on every change —
                  cheaper than pulling framer-motion in for one component. */}
              <div
                key={current.id}
                className={
                  reducedMotion ? "" : "motion-safe:animate-[awardIn_400ms_ease-out]"
                }
              >
                <span className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-700 to-emerald-900 text-amber-300 shadow-lg ring-4 ring-emerald-100/70">
                  <AwardIcon className="h-8 w-8" />
                </span>

                <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
                  {current.issuingBody}
                </p>

                <div className="my-3 flex items-center justify-center gap-3">
                  <span className="h-px w-8 bg-amber-300" />
                  <span className="text-sm font-semibold text-gray-500">
                    {current.year}
                  </span>
                  <span className="h-px w-8 bg-amber-300" />
                </div>

                <h3 className="font-display text-2xl font-bold leading-snug text-gray-900 sm:text-3xl">
                  {current.name}
                </h3>

                <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-gray-600">
                  {current.oneLine}
                </p>

                <div className="mt-7 grid grid-cols-3 divide-x divide-emerald-100 rounded-2xl border border-emerald-100 bg-white/80 py-4">
                  {current.highlights.map((h) => (
                    <div key={h} className="px-2">
                      <AwardIcon className="mx-auto mb-2 h-5 w-5 text-emerald-600" />
                      <p className="text-[11px] font-medium leading-tight text-gray-600">
                        {h}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Dots */}
            <div className="mt-6 flex justify-center gap-2">
              {AWARDS.map((a, i) => (
                <button
                  key={a.id}
                  type="button"
                  aria-label={`Go to award ${i + 1}: ${a.name}`}
                  aria-current={i === index}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === index
                      ? "w-8 bg-emerald-700"
                      : "w-2 bg-emerald-300 hover:bg-emerald-400"
                  }`}
                />
              ))}
            </div>

            {/* Mobile arrows */}
            <div className="mt-5 flex justify-center gap-3 lg:hidden">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous award"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-gray-700 shadow-md transition hover:bg-emerald-50"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next award"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-gray-700 shadow-md transition hover:bg-emerald-50"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/achievements"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-800 px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-emerald-900"
              >
                <TrophyIcon className="h-4 w-4 text-amber-300" />
                View all achievements
                <ChevronRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
