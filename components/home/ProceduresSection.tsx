import Link from "next/link";
import { BoneIcon, CpuIcon, CheckIcon, ArrowRightIcon } from "lucide-react";
import { PROCEDURE_PAGES } from "@/lib/procedure-pages";
import { SECTION_HEADING_CLASSES, BUTTON } from "@/lib/design-tokens";
import {
  HIP_OWNER_URL,
  JOINT_OWNER_URL,
  KNEE_OWNER_URL,
  ROBOTIC_KNEE_OWNER_URL,
} from "@/lib/seo-priority-pages";

const PILLARS = [
  {
    icon: BoneIcon,
    title: "Knee Replacement in Jaipur",
    description:
      "A patient-specific pathway covering total, partial, bilateral and revision knee replacement.",
    points: [
      "Assessment based on symptoms, examination and X-rays",
      "Total and partial knee replacement options",
      "Bilateral and revision surgery when clinically appropriate",
      "Recovery plan tailored to health and mobility goals",
    ],
    href: KNEE_OWNER_URL,
    cta: "Meet the knee replacement surgeon",
  },
  {
    icon: CpuIcon,
    title: "Robotic Knee Replacement",
    description:
      "Robotic guidance used as a surgeon-controlled aid for planning and intra-operative measurements.",
    points: [
      "Patient-specific surgical planning",
      "Objective alignment guidance",
      "Intra-operative balance assessment",
      "Surgeon remains in control throughout",
    ],
    href: ROBOTIC_KNEE_OWNER_URL,
    cta: "Understand robotic knee replacement",
  },
] as const;

const OTHER_JAIPUR_PATHS = [
  { href: JOINT_OWNER_URL, label: "Joint Replacement Surgeon in Jaipur" },
  { href: HIP_OWNER_URL, label: "Hip Replacement Surgeon in Jaipur" },
] as const;

export default function ProceduresSection() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <span className={SECTION_HEADING_CLASSES.eyebrow}>
            Specialisations &amp; Procedures
          </span>
          <h2 className={SECTION_HEADING_CLASSES.h2}>
            Knee &amp; Joint Replacement{" "}
            <span className="text-emerald-600">Care in Jaipur</span>
          </h2>
          <p className={SECTION_HEADING_CLASSES.sub}>
            Start with the condition and treatment pathway that matches your
            need. The final recommendation depends on examination, imaging and
            overall health.
          </p>
        </div>

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

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {OTHER_JAIPUR_PATHS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50"
            >
              {item.label}
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </Link>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-end justify-between gap-4 border-t border-gray-200 pt-8">
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              All {PROCEDURE_PAGES.length} Procedures
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Detailed patient education for the knee and hip procedures
              offered by the practice.
            </p>
          </div>
          <Link href="/services" className={BUTTON.outline}>
            Compare procedures
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
