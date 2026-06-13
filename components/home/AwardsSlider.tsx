"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import { AWARDS } from "@/lib/awards";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

const AUTO_ADVANCE_MS = 4500;
const AWARD_IMAGE_FALLBACK = "/assets/images/hero.png";

// Single award carousel replacing 5 separate award components that used to
// stack on the homepage. Auto-advance is gentle (4.5s) so visitors actually
// have time to read; pauses on hover; supports swipe on mobile.
//
// Each award can carry multiple photos (ceremony shot, certificate, with
// dignitaries, etc.). The thumbnail strip below the main image lets the
// visitor flip through them. Photo index resets when the award changes.
//
// SEO note: this is image-heavy, not great for indexing. The same award
// content is rendered as crawlable text on /achievements (DB-driven).
export default function AwardsSlider() {
  const [awardIndex, setAwardIndex] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const next = useCallback(
    () => setAwardIndex((i) => (i + 1) % AWARDS.length),
    [],
  );
  const prev = useCallback(
    () => setAwardIndex((i) => (i - 1 + AWARDS.length) % AWARDS.length),
    [],
  );

  // Reset to the cover photo whenever the award changes.
  useEffect(() => {
    setPhotoIndex(0);
  }, [awardIndex]);

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

  const current = AWARDS[awardIndex];
  const activePhoto = current.images[photoIndex] ?? current.images[0];
  const hasMultiplePhotos = current.images.length > 1;

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
                key={activePhoto /* force <Image/> swap, otherwise next/image caches */}
                src={activePhoto}
                fallbackSrc={AWARD_IMAGE_FALLBACK}
                alt={`${current.name} — ${current.issuingBody}, ${current.year}`}
                fill
                sizes="(max-width: 768px) 100vw, 65vw"
                className="object-cover transition-opacity duration-300"
                unoptimized
              />

              {/* Photo counter pill — only when there's more than one */}
              {hasMultiplePhotos && (
                <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
                  <ImageIcon className="w-3 h-3" />
                  {photoIndex + 1} / {current.images.length}
                </div>
              )}
            </div>

            <div className="p-6 md:p-10 flex flex-col justify-center">
              <p className="text-xs text-emerald-700 font-semibold uppercase tracking-wide mb-2">
                {current.issuingBody} · {current.year}
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-snug">
                {current.name}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-5">{current.oneLine}</p>

              {/* Thumbnail strip — only shows when the award has 2+ photos.
                  Each slot is a clickable mini preview. Falls back through
                  ImageWithFallback so a missing /assets/awards/{id}/N.jpg
                  shows the hero fallback instead of a broken image icon. */}
              {hasMultiplePhotos && (
                <div className="mt-auto">
                  <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    More photos
                  </p>
                  <div className="flex gap-2">
                    {current.images.map((src, i) => (
                      <button
                        key={src}
                        type="button"
                        aria-label={`Photo ${i + 1} of ${current.name}`}
                        onClick={() => setPhotoIndex(i)}
                        className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                          i === photoIndex
                            ? "border-emerald-600 ring-2 ring-emerald-200"
                            : "border-gray-200 hover:border-emerald-300 opacity-70 hover:opacity-100"
                        }`}
                      >
                        <ImageWithFallback
                          src={src}
                          fallbackSrc={AWARD_IMAGE_FALLBACK}
                          alt=""
                          fill
                          sizes="64px"
                          className="object-cover"
                          unoptimized
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
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
              onClick={() => setAwardIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === awardIndex
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
