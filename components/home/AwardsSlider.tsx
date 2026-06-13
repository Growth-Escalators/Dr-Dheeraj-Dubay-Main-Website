"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AWARDS } from "@/lib/awards";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

const AUTO_ADVANCE_MS = 4500;
const AWARD_IMAGE_FALLBACK = "/assets/images/hero.png";

// Single award carousel — one image per award. Auto-advance is gentle
// (4.5s) so visitors actually have time to read; pauses on hover;
// supports swipe on mobile. Each award's image is referenced by path
// (see lib/awards.ts) and missing files fall through to the hero
// fallback, so the slider stays visually intact while real photos are
// being uploaded.
//
// SEO note: this is image-heavy, not great for indexing. The same award
// content is rendered as crawlable text on /achievements (DB-driven).
export default function AwardsSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const next = useCallback(
    () => setIndex((i) => (i + 1) % AWARDS.length),
    [],
  );
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + AWARDS.length) % AWARDS.length),
    [],
  );

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, AUTO_ADVANCE_MS);
    return () => clearInterval(t);
  }, [paused, next]);

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

  const current = AWARDS[index];

  return (
    <section
      className="py-14 bg-emerald-50"
      aria-labelledby="awards-heading"
    >
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-8">
          <span className="inline-block bg-white text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide mb-3 border border-emerald-200">
            Recognition
          </span>
          <h2
            id="awards-heading"
            className="text-3xl font-bold text-gray-900 mb-2"
          >
            Awards & Honours
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm">
            Recognised globally for advancing joint replacement surgery.
          </p>
        </div>

        <div
          className="relative bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="grid grid-cols-1 md:grid-cols-[1.85fr_1fr] items-stretch min-h-[440px] md:min-h-[520px]">
            <div className="relative h-80 md:h-full bg-gray-100">
              <ImageWithFallback
                key={current.image /* force <Image/> swap, otherwise next/image caches */}
                src={current.image}
                fallbackSrc={AWARD_IMAGE_FALLBACK}
                alt={`${current.name} — ${current.issuingBody}, ${current.year}`}
                fill
                sizes="(max-width: 768px) 100vw, 65vw"
                className="object-cover transition-opacity duration-300"
                unoptimized
              />
            </div>

            <div className="p-6 md:p-10 flex flex-col justify-center">
              <p className="text-xs text-emerald-700 font-semibold uppercase tracking-wide mb-2">
                {current.issuingBody} · {current.year}
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-snug">
                {current.name}
              </h3>
              <p className="text-gray-600 leading-relaxed">{current.oneLine}</p>
            </div>
          </div>

          <button
            type="button"
            aria-label="Previous award"
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white border border-gray-200 rounded-full p-2 shadow-sm transition"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            type="button"
            aria-label="Next award"
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white border border-gray-200 rounded-full p-2 shadow-sm transition"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-5">
          {AWARDS.map((a, i) => (
            <button
              key={a.id}
              type="button"
              aria-label={`Go to award ${i + 1}: ${a.name}`}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === index
                  ? "bg-emerald-600 w-8"
                  : "bg-emerald-200 hover:bg-emerald-300 w-2"
              }`}
            />
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/achievements"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-emerald-700 border border-emerald-300 rounded-lg hover:bg-emerald-100 transition"
          >
            View all achievements →
          </Link>
        </div>
      </div>
    </section>
  );
}
