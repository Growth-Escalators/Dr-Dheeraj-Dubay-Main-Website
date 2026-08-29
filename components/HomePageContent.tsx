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
import PatientGuidesSection from "@/components/home/PatientGuidesSection";
import AuthorityTransparencySection from "@/components/home/AuthorityTransparencySection";
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
  return (
    <div className="overflow-hidden">
      <Card1 />
      <MilestonesSection />
      <ProceduresSection />

      <p className="text-center text-sm text-gray-500 -mt-8 mb-8">
        Looking for hip replacement specifically?{' '}
        <a href="/hip-replacement-jaipur" className="text-emerald-700 font-semibold hover:underline">
          Hip Replacement Surgeon in Jaipur →
        </a>
      </p>

      <ConditionsSection />
      <PatientGuidesSection />
      <AuthorityTransparencySection />
      <HindiSection />

      <WhyChoose
        timelineProfessional={timelineProfessional}
        timelineAcademic={timelineAcademic}
      />

      <AwardsShowcase awards={showcaseAwards} />
      <FeaturedAchievementsSection achievements={featuredAchievements} />
      <FeaturedVideos videos={homeVideos} />
      <FeaturedArticles articles={homeArticles} />
      <LatestEvents />
      <LatestBlogs />
      <LocationsBlock />
      <FinalCTA />
    </div>
  );
}
