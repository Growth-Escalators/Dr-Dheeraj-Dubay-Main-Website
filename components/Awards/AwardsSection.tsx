"use client";

import React from "react";
import Link from "next/link";
import { SECTION_HEADING_CLASSES, BUTTON } from "@/lib/design-tokens";

// Recognition & Excellence. The homepage already has AwardsShowcase
// (carousel) and FeaturedAchievementsSection (image card grid) above this
// one, so listing every individual award again here was redundant — read
// like "more of the same, but boring."
//
// This section is now purely the year-grouped timeline: clean, scannable
// text, not 15 cards to scroll past. Its former stat tiles live in
// components/home/MilestonesSection.tsx alongside the surgery/patient counts.
//
// The timeline content is CRM-managed (`Award` rows with showInTimeline, at
// /admin/awards). It arrives as props from app/page.tsx; the two arrays below
// are the fallback used when the DB is unreachable or no rows are flagged.

interface TimelineItem {
  text: string;
  highlight?: boolean;
}

interface TimelineYear {
  year: string;
  items: TimelineItem[];
}

const FALLBACK_PROFESSIONAL: TimelineYear[] = [
  {
    // The ET Inspiring Leaders Award is asserted by both the awards slider
    // (lib/awards.ts) and the Physician JSON-LD, but was missing from this
    // timeline — so the homepage listed a 2025 award above and a timeline
    // that stopped at 2024 below it.
    year: "2025",
    items: [
      {
        text:
          "ET Inspiring Leaders Award — Economic Times, for leadership in healthcare",
      },
    ],
  },
  {
    year: "2024",
    items: [
      {
        text:
          "Forbes-acknowledged World Record Holder — highest joint replacement surgeries in a single day",
        highlight: true,
      },
      {
        text:
          "Most Trusted Joint Replacement Surgeon of North India — Central Ministers S.P. Bhagel & Athawale, Delhi",
      },
      {
        text:
          "UP Ratan Samman Award — Central Minister Giriraj Singh",
      },
    ],
  },
  {
    year: "2023",
    items: [
      {
        text:
          "ET Leadership Excellence Award (Times of India), presented by Governor of Rajasthan",
      },
      { text: "Healthcare Achievers Award — Most Trusted Joint Replacement Surgeon of the Year" },
      { text: "Big FM Excellence Award — Hip & Knee Replacement, Rajasthan" },
      { text: "International Business Award — presented by Sonu Sood, Delhi" },
    ],
  },
  {
    year: "2022",
    items: [
      {
        text:
          "Dainik Bhaskar Healthcare Award — Best Joint Replacement Surgeon of Rajasthan",
      },
    ],
  },
];

const FALLBACK_ACADEMIC: TimelineYear[] = [
  {
    year: "2024",
    items: [{ text: "International Conference on Joint Replacement Surgery — London" }],
  },
  {
    year: "2023",
    items: [
      { text: "European Orthopedic Society Annual Meeting — Berlin" },
      { text: "Asia Pacific Joint Replacement Summit — Singapore" },
    ],
  },
  {
    year: "2022",
    items: [
      { text: "Indian Orthopedic Association National Conference — Mumbai" },
      { text: "World Congress on Orthopedic Surgery — Dubai" },
    ],
  },
];

function TimelineColumn({
  heading,
  data,
}: {
  heading: string;
  data: TimelineYear[];
}) {
  return (
    <div>
      <h3 className="text-base font-bold text-emerald-700 uppercase tracking-wider mb-5 pb-2 border-b border-emerald-200">
        {heading}
      </h3>
      <div className="space-y-6">
        {data.map((y) => (
          <div key={y.year} className="flex gap-5">
            {/* Year anchor */}
            <div className="flex-shrink-0 w-16 pt-0.5">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                {y.year}
              </div>
            </div>
            {/* Items list */}
            <div className="flex-1 space-y-3 border-l-2 border-emerald-100 pl-5 -ml-px">
              {y.items.map((item, i) => (
                <p
                  key={i}
                  className={`text-sm leading-relaxed relative ${
                    item.highlight
                      ? "text-gray-900 font-semibold"
                      : "text-gray-600"
                  }`}
                >
                  {/* Dot on the timeline */}
                  <span className="absolute -left-[1.45rem] top-2 w-2 h-2 rounded-full bg-emerald-500" />
                  {item.text}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const AwardsSection = ({
  professional,
  academic,
}: {
  professional?: TimelineYear[] | null;
  academic?: TimelineYear[] | null;
} = {}) => {
  const professionalRows = professional?.length
    ? professional
    : FALLBACK_PROFESSIONAL;
  const academicRows = academic?.length ? academic : FALLBACK_ACADEMIC;

  return (
    <section className="py-16 md:py-20 bg-emerald-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className={SECTION_HEADING_CLASSES.eyebrow}>
            Recognition & Excellence
          </span>
          <h2 className={SECTION_HEADING_CLASSES.h2}>
            Recognised by <span className="text-emerald-600">India and the World</span>
          </h2>
          <p className={SECTION_HEADING_CLASSES.sub}>
            From a Forbes World Record to international conference faculty
            roles — here is the work that built the practice you can trust.
          </p>
        </div>

        {/* The four stat tiles that used to sit here (1 Forbes World Record /
            10+ national awards / 5+ international conferences / 23+ years)
            moved into components/home/MilestonesSection.tsx, which merges them
            with the surgery and patient counts from the old "Milestones &
            Achievements" block near the top of the page. One stat block per
            homepage; this section is the timeline now. */}

        {/* Year-grouped timeline — two columns on desktop, stacked on mobile */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-10 shadow-sm">
          <div className="grid md:grid-cols-2 gap-10 md:gap-12">
            <TimelineColumn heading="Professional Recognition" data={professionalRows} />
            <TimelineColumn heading="Academic & International" data={academicRows} />
          </div>

          <div className="text-center mt-10 pt-8 border-t border-gray-100">
            <Link href="/achievements" className={BUTTON.outline}>
              View full achievements timeline
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;
