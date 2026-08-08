import { generatePageMetadata } from "@/lib/seo.config";

// 10s on the homepage — the page people check straight after editing in the
// CRM, and the one that made a working pipeline look broken.
//
// It was 3600 (up to an hour). Dropped to 60, then to 10 here: reordering
// awards or achievements and reloading within a minute still showed the old
// order, which reads as "the CRM doesn't work" even though the write landed.
// Ten seconds is short enough that a save-then-reload feels immediate.
//
// Cost is one regeneration per 10s *only when someone requests the page*, so
// it is bounded by traffic, not by the timer. Other CRM-driven pages stay at
// 60; pages of hardcoded copy (faq, locations) stay at 3600.
//
// The instant path is still the admin POSTing /api/revalidate after each
// write, but that needs REVALIDATE_SECRET + PUBLIC_SITE_URL on both Vercel
// projects and silently no-ops without them — the site must not depend on it.
export const revalidate = 10;
import HomePageContent from "@/components/HomePageContent";
import {
  PhysicianJsonLd,
  MedicalBusinessJsonLd,
  AggregateRatingJsonLd,
  ReviewListJsonLd,
} from "@/components/seo/JsonLd";
import { TestimonialStrip } from "@/components/ui/TestimonialStrip";
import { db } from "@/lib/db";
import { getPublishedReviews } from "@/lib/reviews";
import { AGGREGATE_RATING, SITE_URL } from "@/lib/clinic-info";
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
      orderBy: { featuredOrder: "asc" },
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
    imageUrl: safeImageUrl(a.imageUrl, "/assets/images/hero.png"),
  }));

  // CRM-managed award content: the showcase carousel and both timeline
  // columns. Each accessor falls back to the static list in lib/awards.ts if
  // the DB is unreachable, so the section can't go blank.
  const [showcaseAwards, timelineProfessional, timelineAcademic] =
    await Promise.all([
      getShowcaseAwards(),
      getAwardTimeline("professional"),
      getAwardTimeline("academic"),
    ]);

  // Videos + articles flagged "show on homepage" in the CRM. Fetched here
  // rather than in the browser so the page never paints empty placeholders
  // while a request is in flight.
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

  // Patient testimonial content from DB (featured first). The aggregate
  // rating digits come from the canonical GBP source, not the DB count.
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
      <AggregateRatingJsonLd
        ratingValue={AGGREGATE_RATING.ratingValue}
        reviewCount={AGGREGATE_RATING.reviewCount}
        itemId={`${SITE_URL}/#physician`}
      />
      {featuredReviews.length ? (
        <ReviewListJsonLd
          reviews={featuredReviews}
          itemReviewedId={`${SITE_URL}/#physician`}
        />
      ) : null}
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
          subheading={`Rated ${AGGREGATE_RATING.ratingValue}/5 across ${AGGREGATE_RATING.reviewCount}+ Google reviews`}
        />
      ) : null}
    </>
  );
}
