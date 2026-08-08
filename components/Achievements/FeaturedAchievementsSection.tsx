"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { SECTION_HEADING_CLASSES } from "@/lib/design-tokens";

// Featured press / awards / media features pulled from the DB Achievement
// model on the homepage. Visually distinct from AwardsShowcase (carousel)
// and the Recognition stat tiles — this one is the magazine-style press
// kit. First item gets a wide hero card; the rest sit in a smaller grid.
// Emerald palette throughout matches the rest of the site (was on
// bg-primary blue before).

type FeaturedAchievement = {
  id: string;
  title: string;
  slug: string;
  category: string;
  date: string;
  imageUrl: string;
};

interface Props {
  achievements: FeaturedAchievement[];
}

// Format an ISO date string into "Mon YYYY" deterministically — slice the
// YYYY-MM portion off the string instead of routing through `new Date()` +
// `toLocaleDateString`, which can yield different output on the server
// (UTC) vs. the client (IST) for dates near midnight, triggering a React
// hydration mismatch.
const MONTH_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
function formatDate(iso: string) {
  const [year, month] = iso.slice(0, 10).split("-");
  const monthIndex = parseInt(month, 10) - 1;
  if (isNaN(monthIndex) || monthIndex < 0 || monthIndex > 11) return year ?? "";
  return `${MONTH_SHORT[monthIndex]} ${year}`;
}

function CategoryChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block bg-emerald-50 text-emerald-700 text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider border border-emerald-200">
      {children}
    </span>
  );
}

function DatePill({ iso }: { iso: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs text-gray-500">
      <CalendarDays className="w-3.5 h-3.5" />
      {formatDate(iso)}
    </span>
  );
}

function HeroCard({ achievement }: { achievement: FeaturedAchievement }) {
  return (
    <Link
      href={`/achievements/${achievement.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg hover:border-emerald-300 transition-all"
    >
      <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr]">
        <div className="relative h-64 md:h-80 bg-gray-100 overflow-hidden">
          {/* Images are optional in the CRM. Without this, a missing photo fell
              back to the doctor's portrait, so several cards showed the same
              picture — reads as broken rather than intentional. */}
          {achievement.imageUrl ? (
            <Image
              src={achievement.imageUrl}
              alt={achievement.title}
              fill
              sizes="(max-width: 768px) 100vw, 55vw"
              className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
            />
          ) : (
            <ImagePlaceholder label={achievement.category} kind="award" />
          )}
          <div className="absolute top-4 left-4">
            <CategoryChip>{achievement.category}</CategoryChip>
          </div>
        </div>
        <div className="p-6 md:p-8 flex flex-col justify-center">
          <div className="mb-3">
            <DatePill iso={achievement.date} />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors leading-snug">
            {achievement.title}
          </h3>
          <span className="inline-flex items-center gap-1.5 mt-5 text-sm font-semibold text-emerald-700 group-hover:gap-2.5 transition-all">
            Read the story
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function SmallCard({ achievement }: { achievement: FeaturedAchievement }) {
  return (
    <Link
      href={`/achievements/${achievement.slug}`}
      className="group block bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-emerald-300 hover:shadow-md transition-all"
    >
      <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
        {achievement.imageUrl ? (
          <Image
            src={achievement.imageUrl}
            alt={achievement.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-[1.05] transition-transform duration-500"
          />
        ) : (
          <ImagePlaceholder label={achievement.category} kind="award" />
        )}
        <div className="absolute top-3 left-3">
          <CategoryChip>{achievement.category}</CategoryChip>
        </div>
      </div>
      <div className="p-5">
        <div className="mb-2">
          <DatePill iso={achievement.date} />
        </div>
        <h4 className="text-base font-bold text-gray-900 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
          {achievement.title}
        </h4>
        <span className="inline-flex items-center gap-1 mt-3 text-xs font-semibold text-emerald-700 group-hover:gap-2 transition-all">
          Read more
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  );
}

export default function FeaturedAchievementsSection({ achievements }: Props) {
  if (!achievements || achievements.length === 0) return null;

  const [hero, ...rest] = achievements;

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className={SECTION_HEADING_CLASSES.eyebrow}>
            Featured Press &amp; Media
          </span>
          <h2 className={SECTION_HEADING_CLASSES.h2}>
            Awards &amp; <span className="text-emerald-600">Achievements</span>
          </h2>
          <p className={SECTION_HEADING_CLASSES.sub}>
            Milestones, press features, and moments that reflect our commitment
            to excellence in orthopaedic care.
          </p>
        </div>

        <div className="space-y-6 md:space-y-8">
          {/* Hero card — first item gets prominent placement */}
          <HeroCard achievement={hero} />

          {/* Supporting grid — remaining items */}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((a) => (
                <SmallCard key={a.id} achievement={a} />
              ))}
            </div>
          )}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/achievements"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition shadow-sm"
          >
            View all achievements
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
