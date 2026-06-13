"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Award,
  GraduationCap,
  Globe2,
  Trophy,
  Stethoscope,
} from "lucide-react";
import { SECTION_HEADING_CLASSES } from "@/lib/design-tokens";

// Recognition & Excellence section. Was two side-by-side <ul> lists of plain
// strings — read like a CV dump and built no real trust. Reworked into a
// year-tagged card grid with an icon per recognition type so visitors can
// scan rather than read top-to-bottom. Same content, more credible
// presentation. Keeps the section under <WhyChoose> on the homepage.
//
// Each item has:
//   - type → drives icon + colour (kept emerald-only per design tokens)
//   - year → extracted into a chip so dates are visible at a glance
//   - title → the line that used to be the full <li>

type AchievementType = "award" | "conference" | "international" | "record" | "clinical";

interface Achievement {
  type: AchievementType;
  year: string;
  title: string;
}

const ICONS: Record<AchievementType, React.ComponentType<{ className?: string }>> = {
  award: Award,
  conference: GraduationCap,
  international: Globe2,
  record: Trophy,
  clinical: Stethoscope,
};

const PROFESSIONAL: Achievement[] = [
  {
    type: "record",
    year: "2024",
    title:
      "Forbes-acknowledged World Record Holder for highest number of joint replacement surgeries in a single day (also recognised by IBR and Golden Book of World Records).",
  },
  {
    type: "award",
    year: "2024",
    title:
      "Most Trusted Joint Replacement Surgeon of North India, by Central Ministers S.P. Bhagel and Athawale ji in Delhi.",
  },
  {
    type: "award",
    year: "2024",
    title:
      "UP Ratan Samman Award for excellent work in joint replacement, by Central Minister Giriraj Singh ji.",
  },
  {
    type: "award",
    year: "2023",
    title:
      "ET Leadership Excellence Award (Times of India) in joint replacement, presented by the Governor of Rajasthan and Miss Universe.",
  },
  {
    type: "award",
    year: "2023",
    title:
      "Healthcare Achievers Award for Most Trusted Joint Replacement Surgeon of the Year.",
  },
  {
    type: "award",
    year: "2023",
    title:
      "Big FM Excellence Award in Hip and Knee Replacement, Rajasthan.",
  },
  {
    type: "international",
    year: "2023",
    title:
      "International Business Award presented by Sonu Sood, Delhi.",
  },
  {
    type: "award",
    year: "2022",
    title:
      "Dainik Bhaskar Healthcare Award for Best Joint Replacement Surgeon of Rajasthan.",
  },
  {
    type: "clinical",
    year: "ongoing",
    title:
      "Highest monthly volume of knee and hip replacements among North India's joint replacement surgeons.",
  },
  {
    type: "clinical",
    year: "ongoing",
    title:
      "Among India's fastest joint replacement surgeons — Zero Technique knee replacement in 10-15 minutes with fast-track rehab.",
  },
];

const ACADEMIC: Achievement[] = [
  {
    type: "international",
    year: "2024",
    title: "International Conference on Joint Replacement Surgery — London, UK",
  },
  {
    type: "international",
    year: "2023",
    title: "European Orthopedic Society Annual Meeting — Berlin, Germany",
  },
  {
    type: "international",
    year: "2023",
    title: "Asia Pacific Joint Replacement Summit — Singapore",
  },
  {
    type: "conference",
    year: "2022",
    title: "Indian Orthopedic Association National Conference — Mumbai",
  },
  {
    type: "international",
    year: "2022",
    title: "World Congress on Orthopedic Surgery — Dubai",
  },
];

function AchievementCard({ item, index }: { item: Achievement; index: number }) {
  const Icon = ICONS[item.type];
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.4) }}
      className="bg-white border border-gray-200 rounded-xl p-5 hover:border-emerald-300 hover:shadow-md transition-all flex gap-4"
    >
      <div className="flex-shrink-0">
        <div className="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-emerald-50 text-emerald-600">
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <span className="inline-block bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-emerald-200 mb-2">
          {item.year}
        </span>
        <p className="text-sm text-gray-700 leading-relaxed">{item.title}</p>
      </div>
    </motion.div>
  );
}

function Column({
  title,
  badge,
  items,
}: {
  title: string;
  badge: string;
  items: Achievement[];
}) {
  return (
    <div>
      <div className="flex items-baseline gap-3 mb-5">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900">{title}</h3>
        <span className="text-xs text-gray-500">
          {items.length} {badge}
        </span>
      </div>
      <div className="space-y-3">
        {items.map((item, i) => (
          <AchievementCard key={item.title} item={item} index={i} />
        ))}
      </div>
    </div>
  );
}

const AwardsSection = () => {
  return (
    <section className="py-16 md:py-20 bg-emerald-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className={SECTION_HEADING_CLASSES.eyebrow}>
            Recognition & Excellence
          </span>
          <h2 className={SECTION_HEADING_CLASSES.h2}>
            Achievements That <span className="text-emerald-600">Build Trust</span>
          </h2>
          <p className={SECTION_HEADING_CLASSES.sub}>
            Year by year, the awards, conferences, and clinical milestones that
            have shaped Dr. Dubay&apos;s practice. Every line below is verifiable.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-10">
          <Column
            title="Professional Recognition"
            badge="awards & milestones"
            items={PROFESSIONAL}
          />
          <Column
            title="Academic & Conferences"
            badge="international engagements"
            items={ACADEMIC}
          />
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;
