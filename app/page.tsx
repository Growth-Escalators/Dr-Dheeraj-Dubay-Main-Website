import { generatePageMetadata } from "@/lib/seo.config";

// One-hour fallback only. CRM writes use the authenticated /api/revalidate
// path to invalidate the exact affected public pages immediately. Keeping a
// 3600s ISR fallback means the site still self-heals if that cross-project
// revalidation ever fails, without repeatedly rebuilding this DB-heavy page
// every 10 seconds when no content changed.
export const revalidate = 3600;
import HomePageContent from "@/components/HomePageContent";
import {
  PhysicianJsonLd,
  MedicalBusinessJsonLd,
} from "@/components/seo/JsonLd";
import { TestimonialStrip } from "@/components/ui/TestimonialStrip";
import { db } from "@/lib/db";
import { getPublishedReviews } from "@/lib/reviews";
import { safeImageUrl } from "@/lib/image-url";
import { getShowcaseAwards, getAwardTimeline } from "@/lib/awards";
import { getYouTubeId } from "@/lib/youtube";
import type { HomeArticle } from "@/components/home/FeaturedArticles";

export const metadata = generatePageMetadata({});

export default async function CardWithForm() {
  let achievements: any[] = [];

  try {
    achievements = await db.achievement.findMany({
      where: { isFeatured: true },
      orderBy: [{ featuredOrder: "asc" }, { date: "desc" }],
      take: 6,
    });
  } catch {
    achievements = [];
  }

  const featuredAchievements = achievements.map((a) => ({
    id: a.id,
    title: a.title,
    slug: a.slug,
    category: a.category,
    date: a.date.toISOString(),
    imageUrl: safeImageUrl(a.imageUrl, ""),
  }));

  const [showcaseAwards, timelineProfessional, timelineAcademic] =
    await Promise.all([
      getShowcaseAwards(),
      getAwardTimeline("professional"),
      getAwardTimeline("academic"),
    ]);

  let homeVideos: { id: string; videoId: string; title: string | null }[] = [];
  try {
    const rows = await db.youTube.findMany({
      where: { isFeatured: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      take: 3,
    });
    homeVideos = rows
      .map((r) => ({
        id: r.id,
        videoId: getYouTubeId(r.link || ""),
        title: r.title,
      }))
      .filter((v): v is { id: string; videoId: string; title: string | null } =>
        Boolean(v.videoId),
      );
  } catch {
    homeVideos = [];
  }

  let homeArticles: HomeArticle[] = [];
  try {
    const rows = await db.article.findMany({
      where: { isFeatured: true, isPublished: true },
      orderBy: [{ sortOrder: "asc" }, { publishedDate: "desc" }],
      take: 3,
    });
    homeArticles = rows.map((a) => ({
      id: a.id,
      title: a.title,
      journalName: a.journalName,
      publishedDate: a.publishedDate ? a.publishedDate.toISOString() : null,
      externalUrl: a.externalUrl,
      tags: a.tags,
    }));
  } catch {
    homeArticles = [];
  }

  // Keep patient experiences visible, but do not hard-code a Google rating or
  // review count. The aggregate will be reintroduced only from the official
  // GBP API after approval, so visible figures cannot silently become stale.
  let featuredReviews: Awaited<ReturnType<typeof getPublishedReviews>> = [];
  try {
    featuredReviews = await getPublishedReviews({ featuredOnly: true, limit: 3 });
    if (featuredReviews.length < 3) {
      const fill = await getPublishedReviews({ limit: 3 - featuredReviews.length });
      featuredReviews = [...featuredReviews, ...fill].slice(0, 3);
    }
  } catch {
    featuredReviews = [];
  }

  return (
    <>
      <PhysicianJsonLd />
      <MedicalBusinessJsonLd />
      <HomePageContent
        featuredAchievements={featuredAchievements}
        showcaseAwards={showcaseAwards}
        timelineProfessional={timelineProfessional}
        timelineAcademic={timelineAcademic}
        homeVideos={homeVideos}
        homeArticles={homeArticles}
      />
      {featuredReviews.length ? (
        <TestimonialStrip
          reviews={featuredReviews}
          subheading="Selected patient experiences published on this website. Individual outcomes vary."
        />
      ) : null}
    </>
  );
}
