"use client";

import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { MilestonesSection } from "@/components/home/MilestonesSection";
import Card1 from "@/components/ProfileCard/Card1";
import WhyChoose from "@/components/WhyChoose/WhyChoose";
import AwardsShowcase from "@/components/home/AwardsShowcase";
import FeaturedVideos, { type HomeVideo } from "@/components/home/FeaturedVideos";
import FeaturedArticles, { type HomeArticle } from "@/components/home/FeaturedArticles";
import type { Award } from "@/lib/awards";
import LocationsBlock from "@/components/home/LocationsBlock";
import FinalCTA from "@/components/home/FinalCTA";
import LatestEvents from "@/components/home/LatestEvents";
import LatestBlogs from "@/components/home/LatestBlogs";
import ProceduresSection from "@/components/home/ProceduresSection";
import ConditionsSection from "@/components/home/ConditionsSection";
import HindiSection from "@/components/home/HindiSection";
import FeaturedAchievementsSection from "@/components/Achievements/FeaturedAchievementsSection";

type FeaturedAchievement = {
  id: string;
  title: string;
  slug: string;
  category: string;
  date: string;
  imageUrl: string;
};

type TimelineRows =
  | { year: string; items: { text: string; highlight?: boolean }[] }[]
  | null;

interface HomePageContentProps {
  featuredAchievements?: FeaturedAchievement[];
  // All CRM-managed, fetched in app/page.tsx and passed down so nothing on
  // this page has to fetch from the browser.
  showcaseAwards?: Award[];
  timelineProfessional?: TimelineRows;
  timelineAcademic?: TimelineRows;
  homeVideos?: HomeVideo[];
  homeArticles?: HomeArticle[];
  services?: any[];
}

export default function HomePageContent({
  featuredAchievements = [],
  showcaseAwards = [],
  timelineProfessional = null,
  timelineAcademic = null,
  homeVideos = [],
  homeArticles = [],
}: HomePageContentProps) {
  React.useEffect(() => {
    AOS.init({ duration: 1500, once: false });
  }, []);

  return (
    <div className="overflow-hidden">
      {/* 1. Hero */}
      <Card1 />

      {/* 2. Trust strip — every practice stat on the page, in one block */}
      <MilestonesSection />

      {/* 3. Procedures + specialisations (merged — see ProceduresSection for
             why these were one duplicated pair of blocks before) */}
      <ProceduresSection />

      {/* Internal-link hub (2026-07-24, rebased 2026-08-03 onto the
          post-CRM-refactor homepage): /hip-replacement-jaipur is a
          dedicated surgeon-intent money page, not a PROCEDURE_PAGES
          entry, so it doesn't appear in ProceduresSection's grid above —
          link it explicitly with a descriptive anchor. */}
      <p className="text-center text-sm text-gray-500 -mt-8 mb-8">
        Looking for hip replacement specifically?{' '}
        <a href="/hip-replacement-jaipur" className="text-emerald-700 font-semibold hover:underline">
          Hip Replacement Surgeon in Jaipur →
        </a>
      </p>

      {/* 4. Conditions We Treat (scrollable rail) */}
      <ConditionsSection />

      {/* 5. Hindi info section (scrollable rail) */}
      <HindiSection />

      {/* 6. Why Choose Us (nests the CRM-managed recognition timeline) */}
      <WhyChoose
        timelineProfessional={timelineProfessional}
        timelineAcademic={timelineAcademic}
      />

      {/* 7. Awards & Honours — fixed portrait, card cycles through awards */}
      <AwardsShowcase awards={showcaseAwards} />

      {/* 8. Featured achievements text grid (DB-driven; crawlable companion to slider) */}
      <FeaturedAchievementsSection achievements={featuredAchievements} />

      {/* 9. Videos + published work — both CRM-managed ("show on homepage"),
             server-rendered, and absent entirely when nothing is flagged. */}
      <FeaturedVideos videos={homeVideos} />
      <FeaturedArticles articles={homeArticles} />

      {/* 10. Latest content (events + blogs) */}
      <LatestEvents />
      <LatestBlogs />

      {/* 11. Locations (address-only) */}
      <LocationsBlock />

      {/* 12. Final CTA — Book + Call, no form */}
      <FinalCTA />
    </div>
  );
}
