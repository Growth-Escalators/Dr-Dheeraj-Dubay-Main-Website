import Link from "next/link";
import { BoneIcon, PersonStandingIcon, ArrowRightIcon } from "lucide-react";
import { CONDITION_PAGES } from "@/lib/condition-pages";
import { SECTION_HEADING_CLASSES } from "@/lib/design-tokens";
import { HorizontalScroller } from "@/components/ui/HorizontalScroller";

// Conditions We Treat — a scrollable rail instead of a 4-across grid that
// wrapped into a ragged second row (4 + 3). Each card now carries the
// condition's category and the first line of its intro, so the choice is
// informed rather than a bare title.

export default function ConditionsSection() {
  return (
    <section className="py-16 md:py-20 bg-emerald-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="inline-block bg-white text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide mb-3 border border-emerald-200">
            Conditions
          </span>
          <h2 className={SECTION_HEADING_CLASSES.h2}>
            Conditions We <span className="text-emerald-600">Treat</span>
          </h2>
          <p className={SECTION_HEADING_CLASSES.sub}>
            Expert diagnosis and treatment for all causes of knee and hip pain.
          </p>
        </div>

        <HorizontalScroller ariaLabel="Conditions we treat" surface="tint">
          {CONDITION_PAGES.map((c) => {
            const isHip = c.category.toLowerCase().includes("hip");
            const Icon = isHip ? PersonStandingIcon : BoneIcon;
            return (
              <Link
                key={c.slug}
                href={`/conditions/${c.slug}`}
                className="group flex w-[260px] shrink-0 snap-start flex-col rounded-2xl border border-emerald-100 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md sm:w-[280px]"
              >
                <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </span>

                <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-700">
                  {c.category}
                </p>
                <h3 className="mt-1 font-bold leading-snug text-gray-900 transition-colors group-hover:text-emerald-700">
                  {c.title}
                </h3>
                <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-500">
                  {c.intro}
                </p>

                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700">
                  Learn about treatment
                  <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </HorizontalScroller>
      </div>
    </section>
  );
}
