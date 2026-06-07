import { generatePageMetadata } from "@/lib/seo.config";

export const revalidate = 3600;
import HomePageContent from "@/components/HomePageContent";
import {
  PhysicianJsonLd,
  MedicalBusinessJsonLd,
  AggregateRatingJsonLd,
  ReviewListJsonLd,
} from "@/components/seo/JsonLd";
import { TestimonialStrip } from "@/components/ui/TestimonialStrip";
import { db } from "@/lib/db";
import { getAggregateStats, getPublishedReviews } from "@/lib/reviews";

export const metadata = generatePageMetadata({});

const SITE_URL = "https://www.drdubay.in";

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
    imageUrl: a.imageUrl,
  }));

  // Reviews: featured first, then any published. Filtered to homepage =
  // no city/procedure filter so we pull the global aggregate.
  let aggregate: Awaited<ReturnType<typeof getAggregateStats>> = null;
  let featuredReviews: Awaited<ReturnType<typeof getPublishedReviews>> = [];
  try {
    [aggregate, featuredReviews] = await Promise.all([
      getAggregateStats(),
      getPublishedReviews({ featuredOnly: true, limit: 3 }),
    ]);
    if (featuredReviews.length < 3) {
      const fill = await getPublishedReviews({ limit: 3 - featuredReviews.length });
      featuredReviews = [...featuredReviews, ...fill].slice(0, 3);
    }
  } catch {
    aggregate = null;
    featuredReviews = [];
  }

  return (
    <>
      <PhysicianJsonLd />
      <MedicalBusinessJsonLd />
      {aggregate ? (
        <AggregateRatingJsonLd
          ratingValue={aggregate.ratingValue}
          reviewCount={aggregate.reviewCount}
          itemId={`${SITE_URL}/#physician`}
        />
      ) : null}
      {featuredReviews.length ? (
        <ReviewListJsonLd
          reviews={featuredReviews}
          itemReviewedId={`${SITE_URL}/#physician`}
        />
      ) : null}
      <HomePageContent featuredAchievements={featuredAchievements} />
      {featuredReviews.length ? (
        <TestimonialStrip
          reviews={featuredReviews}
          subheading={
            aggregate
              ? `Rated ${aggregate.ratingValue}/5 across ${aggregate.reviewCount} patient reviews`
              : undefined
          }
        />
      ) : null}
    </>
  );
}
