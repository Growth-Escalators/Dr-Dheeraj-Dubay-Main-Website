import Link from "next/link";
import { LanguagesIcon, ArrowRightIcon } from "lucide-react";
import { HINDI_PAGES } from "@/lib/hindi-pages";
import { SECTION_HEADING_CLASSES } from "@/lib/design-tokens";
import { HorizontalScroller } from "@/components/ui/HorizontalScroller";

// हिंदी में जानकारी — scrollable rail.
//
// The heading used to lead with a 🇮🇳 flag emoji, which Windows has no glyph
// for: Chrome on Windows renders the regional-indicator pair as the bare
// letters "IN" above the heading, which is what a large share of these
// visitors actually saw. Replaced with an icon that renders everywhere.
//
// Titles come from h1 (split on the em dash) rather than `title`, matching
// what the previous grid showed.

export default function HindiSection() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className={SECTION_HEADING_CLASSES.eyebrow}>
            <span className="inline-flex items-center gap-1.5">
              <LanguagesIcon className="h-3.5 w-3.5" />
              हिंदी
            </span>
          </span>
          <h2 className={SECTION_HEADING_CLASSES.h2}>
            हिंदी में <span className="text-emerald-600">जानकारी</span>
          </h2>
          <p className={SECTION_HEADING_CLASSES.sub}>
            घुटना और कूल्हा प्रत्यारोपण की पूरी जानकारी हिंदी में — इलाज, खर्च
            और रिकवरी।
          </p>
        </div>

        <HorizontalScroller ariaLabel="हिंदी में जानकारी">
          {HINDI_PAGES.map((p) => (
            <Link
              key={p.slug}
              href={`/hindi/${p.slug}`}
              className="group flex w-[260px] shrink-0 snap-start flex-col rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-400 hover:bg-emerald-50 hover:shadow-md sm:w-[280px]"
            >
              <p className="text-[11px] font-semibold tracking-wide text-emerald-700">
                {p.category}
              </p>
              <h3 className="mt-1.5 font-bold leading-relaxed text-gray-900 transition-colors group-hover:text-emerald-700">
                {p.h1.split("—")[0].trim()}
              </h3>
              <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-600">
                {p.intro}
              </p>

              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700">
                पढ़ें
                <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </HorizontalScroller>
      </div>
    </section>
  );
}
