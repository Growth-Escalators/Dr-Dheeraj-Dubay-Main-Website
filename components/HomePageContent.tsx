"use client";

import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Stats } from "@/components/Stats/Stats";
import Card1 from "@/components/ProfileCard/Card1";
import WhyChoose from "@/components/WhyChoose/WhyChoose";
import AwardsSlider from "@/components/home/AwardsSlider";
import LocationsBlock from "@/components/home/LocationsBlock";
import FinalCTA from "@/components/home/FinalCTA";
import LatestEvents from "@/components/home/LatestEvents";
import LatestBlogs from "@/components/home/LatestBlogs";
import LatestPodcasts from "@/components/home/LatestPodcasts";
import SpecialtiesHighlight from "@/components/home/SpecialtiesHighlight";
import FeaturedAchievementsSection from "@/components/Achievements/FeaturedAchievementsSection";
import GTM from "@/utils/GTM";
import { PROCEDURE_PAGES } from "@/lib/procedure-pages";
import { CONDITION_PAGES } from "@/lib/condition-pages";
import { HINDI_PAGES } from "@/lib/hindi-pages";

type FeaturedAchievement = {
  id: string;
  title: string;
  slug: string;
  category: string;
  date: string;
  imageUrl: string;
};

interface HomePageContentProps {
  featuredAchievements?: FeaturedAchievement[];
  services?: any[];
}

export default function HomePageContent({
  featuredAchievements = [],
}: HomePageContentProps) {
  React.useEffect(() => {
    AOS.init({ duration: 1500, once: false });
  }, []);

  return (
    <div className="overflow-hidden">
      <head>
        <GTM gtmId="GTM-MDF4W4JT" />
        <link rel="icon" href="/assets/images/logonew.png" />
      </head>

      {/* 1. Hero */}
      <Card1 />

      {/* 2. Trust strip — "34 surgeries in a day" leads */}
      <Stats />

      {/* 3. Services 9-grid (Phase 5 will swap inline JSX for ProcedureCard) */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="inline-block bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide mb-3 border border-emerald-200">
              Advanced Procedures
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Surgical Procedures We Specialise In
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              From robotic knee replacement to minimally invasive hip surgery —
              explore all procedures offered by Dr. Dheeraj Dubay.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROCEDURE_PAGES.map((p) => (
              <a
                key={p.slug}
                href={`/procedures/${p.slug}`}
                className="bg-white rounded-xl p-5 border border-gray-200 hover:border-emerald-300 hover:shadow-md transition-all group"
              >
                <p className="text-xs text-emerald-700 font-semibold uppercase tracking-wide mb-2">
                  {p.category}
                </p>
                <h3 className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors mb-2">
                  {p.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {p.intro.slice(0, 110)}...
                </p>
                <span className="text-emerald-700 text-sm font-semibold mt-3 inline-block">
                  Learn more →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Conditions We Treat */}
      <section className="py-16 bg-emerald-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="inline-block bg-white text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide mb-3 border border-emerald-200">
              Conditions
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Conditions We Treat
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Expert diagnosis and treatment for all causes of knee and hip pain.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {CONDITION_PAGES.map((p) => (
              <a
                key={p.slug}
                href={`/conditions/${p.slug}`}
                className="bg-white rounded-xl p-4 border border-gray-200 hover:border-emerald-300 hover:shadow-md transition-all text-center group"
              >
                <h3 className="font-semibold text-gray-900 text-sm group-hover:text-emerald-700 transition-colors">
                  {p.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Learn about treatment →
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Hindi info section */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <span className="text-2xl mb-2 inline-block">🇮🇳</span>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              हिंदी में जानकारी
            </h2>
            <p className="text-gray-500 text-sm">
              घुटना और कूल्हा प्रत्यारोपण की पूरी जानकारी हिंदी में
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {HINDI_PAGES.map((p) => (
              <a
                key={p.slug}
                href={`/hindi/${p.slug}`}
                className="bg-emerald-50 rounded-xl p-4 border border-emerald-200 hover:border-emerald-400 hover:bg-emerald-100 transition-all group"
              >
                <h3 className="font-semibold text-gray-900 text-sm group-hover:text-emerald-700 transition-colors leading-relaxed">
                  {p.h1.split("—")[0].trim()}
                </h3>
                <span className="text-emerald-700 text-xs mt-2 inline-block">
                  पढ़ें →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Specialties Highlight (single doctor-credentials block kept) */}
      <SpecialtiesHighlight />

      {/* 7. Why Choose Us */}
      <WhyChoose />

      {/* 8. Awards Slider (replaces 5 old award components) */}
      <AwardsSlider />

      {/* 9. Featured achievements text grid (DB-driven; crawlable companion to slider) */}
      <FeaturedAchievementsSection achievements={featuredAchievements} />

      {/* 10. Latest content (events + blogs + podcasts) */}
      <LatestEvents />
      <LatestBlogs />
      <LatestPodcasts />

      {/* 11. Locations (address-only) */}
      <LocationsBlock />

      {/* 12. Final CTA — Book + Call, no form */}
      <FinalCTA />
    </div>
  );
}
