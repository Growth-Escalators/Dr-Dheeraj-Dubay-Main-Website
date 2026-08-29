"use client";

import React from "react";
import CountUp from "react-countup";
import { TrophyIcon, ActivityIcon, CalendarClockIcon } from "lucide-react";
import { SECTION_HEADING_CLASSES } from "@/lib/design-tokens";
import {
  SURGERY_COUNT,
  RECORD_SURGERIES_IN_A_DAY,
  EXPERIENCE_YEARS,
} from "@/lib/clinic-info";

// Keep the homepage milestone block limited to the clinic-confirmed facts that
// have a clear meaning. Patient counts, award totals and conference totals are
// deliberately excluded until their evidence inventory is complete.
const VERIFIED_STATS = [
  {
    icon: ActivityIcon,
    value: SURGERY_COUNT,
    suffix: "+",
    label: "Total Surgeries",
    sub: "Career-wide surgical experience",
    featured: false,
  },
  {
    icon: CalendarClockIcon,
    value: EXPERIENCE_YEARS,
    suffix: "",
    label: "Years of Experience",
    sub: "Orthopedic practice",
    featured: false,
  },
  {
    icon: TrophyIcon,
    value: RECORD_SURGERIES_IN_A_DAY,
    suffix: "",
    label: "Joint Replacements in One Day",
    sub: "33 knee + 1 hip · 9 May 2024",
    featured: true,
  },
] as const;

export function MilestonesSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F4FEFA] to-white dark:from-gray-900/50 dark:to-gray-800/50">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid-slate-200 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/30"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="mb-12 text-center">
          <span className={SECTION_HEADING_CLASSES.eyebrow}>Practice facts</span>
          <h2 className={SECTION_HEADING_CLASSES.h2}>
            Experience &amp; <span className="text-emerald-600">Surgical Milestones</span>
          </h2>
          <p className={SECTION_HEADING_CLASSES.sub}>
            Current clinic-confirmed practice figures presented without outcome guarantees.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {VERIFIED_STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`group relative rounded-2xl border bg-white p-7 text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg dark:bg-gray-800 ${
                  stat.featured
                    ? "border-amber-200 shadow-md ring-1 ring-amber-100 dark:border-amber-800/60"
                    : "border-gray-200 shadow-sm hover:border-emerald-300 dark:border-gray-700"
                }`}
              >
                {stat.featured ? (
                  <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow">
                    <TrophyIcon className="h-3 w-3" />
                    Single-day milestone
                  </span>
                ) : null}

                <span
                  className={`mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${
                    stat.featured
                      ? "bg-amber-50 text-amber-600 dark:bg-amber-900/30"
                      : "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white dark:bg-emerald-900/30"
                  }`}
                >
                  <Icon className="h-6 w-6" />
                </span>

                <div className="text-4xl font-extrabold tabular-nums text-emerald-700 md:text-5xl dark:text-emerald-400">
                  <CountUp
                    end={stat.value}
                    duration={2}
                    separator=","
                    suffix={stat.suffix}
                    enableScrollSpy
                    scrollSpyOnce
                  />
                </div>
                <h3 className="mt-2 font-bold text-gray-900 dark:text-gray-100">{stat.label}</h3>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{stat.sub}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
