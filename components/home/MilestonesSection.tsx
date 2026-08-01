"use client";

import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import {
  TrophyIcon,
  ActivityIcon,
  UsersIcon,
  CalendarClockIcon,
  MedalIcon,
  GlobeIcon,
} from "lucide-react";
import { SECTION_HEADING_CLASSES } from "@/lib/design-tokens";
import {
  SURGERY_COUNT,
  PATIENTS_TREATED,
  RECORD_SURGERIES_IN_A_DAY,
  EXPERIENCE_YEARS,
  NATIONAL_AWARDS,
  INTERNATIONAL_CONFERENCES,
} from "@/lib/clinic-info";

// Milestones & Recognition — one stat block for the whole homepage.
//
// There used to be two: "Milestones & Achievements" right under the hero
// (34 in a day / 35,000+ surgeries / 60,000+ patients) and a second grid
// inside the Recognition section further down (1 Forbes World Record /
// 10+ national awards / 5+ international conferences / 23+ years). Same kind
// of claim, two different card designs, several screens apart — and the
// "1 Forbes World Record" tile restated the "34 in a day — World Record" tile
// it was competing with. Merged here, with the record counted once.
//
// Two tiers: volume (what he has done) on top, recognition (what that earned)
// underneath, so six numbers still read as a hierarchy rather than a wall.

const VOLUME_STATS = [
  {
    icon: TrophyIcon,
    value: RECORD_SURGERIES_IN_A_DAY,
    suffix: "",
    label: "Surgeries in a Day",
    sub: "Forbes World Record",
    featured: true,
  },
  {
    icon: ActivityIcon,
    value: SURGERY_COUNT,
    suffix: "+",
    label: "Successful Surgeries",
    sub: "Knee & hip replacements",
    featured: false,
  },
  {
    icon: UsersIcon,
    value: PATIENTS_TREATED,
    suffix: "+",
    label: "Happy Patients",
    sub: "Treated across North India",
    featured: false,
  },
];

const RECOGNITION_STATS = [
  {
    icon: CalendarClockIcon,
    value: EXPERIENCE_YEARS,
    suffix: "+",
    label: "Years in Practice",
  },
  {
    icon: MedalIcon,
    value: NATIONAL_AWARDS,
    suffix: "+",
    label: "National Awards",
  },
  {
    icon: GlobeIcon,
    value: INTERNATIONAL_CONFERENCES,
    suffix: "+",
    label: "International Conferences",
  },
];

export function MilestonesSection() {
  // Live surgery count, same behaviour the old Stats block had: falls back to
  // the canonical constant if the API is unreachable.
  const [surgeryCount, setSurgeryCount] = useState(SURGERY_COUNT);

  useEffect(() => {
    fetch("/api/surgery-count")
      .then((r) => r.json())
      .then((d) => setSurgeryCount(d.count || SURGERY_COUNT))
      .catch((e) => console.error("[Milestones/surgery-count]", e));
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F4FEFA] to-white dark:from-gray-900/50 dark:to-gray-800/50">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid-slate-200 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/30"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="mb-12 text-center">
          <span className={SECTION_HEADING_CLASSES.eyebrow}>
            By the numbers
          </span>
          <h2 className={SECTION_HEADING_CLASSES.h2}>
            Milestones &amp; <span className="text-emerald-600">Recognition</span>
          </h2>
          <p className={SECTION_HEADING_CLASSES.sub}>
            A record set in a single day, a career measured in tens of thousands
            of joints — and the recognition that followed.
          </p>
        </div>

        {/* Tier 1 — volume */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {VOLUME_STATS.map((stat) => {
            const Icon = stat.icon;
            const value =
              stat.label === "Successful Surgeries" ? surgeryCount : stat.value;

            return (
              <div
                key={stat.label}
                className={`group relative rounded-2xl border bg-white p-7 text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg dark:bg-gray-800 ${
                  stat.featured
                    ? "border-amber-200 shadow-md ring-1 ring-amber-100 dark:border-amber-800/60"
                    : "border-gray-200 shadow-sm hover:border-emerald-300 dark:border-gray-700"
                }`}
              >
                {stat.featured && (
                  <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow">
                    <TrophyIcon className="h-3 w-3" />
                    World Record
                  </span>
                )}

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
                    end={value}
                    duration={2.2}
                    separator=","
                    suffix={stat.suffix}
                    enableScrollSpy
                    scrollSpyOnce
                  />
                </div>

                <h3 className="mt-2 font-bold text-gray-900 dark:text-gray-100">
                  {stat.label}
                </h3>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {stat.sub}
                </p>
              </div>
            );
          })}
        </div>

        {/* Tier 2 — recognition. Compact strip: same facts, less weight, so the
            volume numbers above stay the headline. */}
        <div className="mt-5 grid grid-cols-1 divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white shadow-sm sm:grid-cols-3 sm:divide-x sm:divide-y-0 dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-800">
          {RECOGNITION_STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="flex items-center justify-center gap-4 px-5 py-6"
              >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="text-left">
                  <div className="text-2xl font-extrabold tabular-nums leading-none text-emerald-700 dark:text-emerald-400">
                    <CountUp
                      end={stat.value}
                      duration={1.8}
                      suffix={stat.suffix}
                      enableScrollSpy
                      scrollSpyOnce
                    />
                  </div>
                  <p className="mt-1.5 text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
