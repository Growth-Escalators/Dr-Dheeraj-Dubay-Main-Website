import Link from "next/link";
import { BoneIcon, CpuIcon, CheckIcon, ArrowRightIcon } from "lucide-react";
import { PROCEDURE_PAGES } from "@/lib/procedure-pages";
import { SECTION_HEADING_CLASSES, BUTTON } from "@/lib/design-tokens";

// Procedures + specialisations, merged.
//
// The homepage used to run two consecutive blocks that said the same thing:
// "Advanced Joint Replacement Expertise" (two specialisation cards, one of
// which — Robotic Hip & Knee — is also a procedure page) followed by
// "Surgical Procedures We Specialise In" (the nine procedure cards, which
// include Robotic Knee Replacement and Revision Knee Replacement). A visitor
// scrolled past robotic knee replacement twice, in two different visual
// languages, with two different "Learn more" destinations.
//
// One section now, two tiers: the two flagship capabilities carry their proof
// points up top, then every procedure sits in a single grid beneath them. The
// old block's framer-motion entrance animations are gone — this renders as a
// server component (no client JS) and uses CSS transitions for hover.

const PILLARS = [
  {
    icon: BoneIcon,
    title: "Complex Hip & Knee Replacement",
    description:
      "Advanced surgical solutions for the most challenging joint cases.",
    points: [
      "Revision surgeries for failed implants",
      "Deformity correction & bone loss management",
      "Complex fractures around joint replacements",
      "Post-infection joint reconstruction",
    ],
    // Was /services — a generic index. Points at the procedure page that
    // actually covers this work.
    href: "/procedures/revision-knee-replacement",
    cta: "Explore revision surgery",
  },
  {
    icon: CpuIcon,
    title: "Robotic Hip & Knee Replacement",
    description:
      "Precision surgery with computer-assisted robotic technology.",
    points: [
      "Sub-millimetre accuracy in implant placement",
      "3D pre-operative planning for every patient",
      "Faster recovery with minimally invasive approach",
      "Longer implant life with perfect alignment",
    ],
    href: "/procedures/robotic-knee-replacement",
    cta: "Explore robotic surgery",
  },
] as const;

export default function ProceduresSection() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <span className={SECTION_HEADING_CLASSES.eyebrow}>
            Specialisations &amp; Procedures
          </span>
          <h2 className={SECTION_HEADING_CLASSES.h2}>
            Advanced Joint Replacement{" "}
            <span className="text-emerald-600">Expertise</span>
          </h2>
          <p className={SECTION_HEADING_CLASSES.sub}>
            From robotic knee replacement to complex revision surgery — what
            Dr. Dheeraj Dubay operates on, and what each approach changes for
            you.
          </p>
        </div>

        {/* Tier 1 — the two flagship capabilities */}
        <div className="grid gap-5 md:grid-cols-2">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="group relative overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50/70 via-white to-white p-7 transition-all duration-200 hover:border-emerald-300 hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-emerald-100 bg-white text-emerald-600 shadow-sm transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                    <Icon className="h-7 w-7" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-xl font-bold text-gray-900">
                      {pillar.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {pillar.description}
                    </p>
                  </div>
                </div>

                <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                  {pillar.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                        <CheckIcon className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <span className="text-sm leading-snug text-gray-600">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={pillar.href}
                  className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition-colors hover:text-emerald-800"
                >
                  {pillar.cta}
                  <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Tier 2 — every procedure, one grid */}
        <div className="mt-14 flex flex-wrap items-end justify-between gap-4 border-t border-gray-200 pt-8">
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              All {PROCEDURE_PAGES.length} Procedures
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Every knee and hip procedure performed by Dr. Dubay, explained in
              full.
            </p>
          </div>
          <Link href="/services" className={BUTTON.outline}>
            Compare all procedures
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PROCEDURE_PAGES.map((p) => (
            <Link
              key={p.slug}
              href={`/procedures/${p.slug}`}
              className="group flex flex-col rounded-xl border border-gray-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md"
            >
              <span className="mb-3 inline-flex w-fit rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-700">
                {p.category}
              </span>
              <h4 className="font-bold text-gray-900 transition-colors group-hover:text-emerald-700">
                {p.title}
              </h4>
              <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-gray-500">
                {p.intro}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700">
                Learn more
                <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
