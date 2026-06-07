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
import { getPublishedReviews } from "@/lib/reviews";
import { AGGREGATE_RATING, SITE_URL } from "@/lib/clinic-info";

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
    imageUrl: a.imageUrl,
  }));

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
      <HomePageContent featuredAchievements={featuredAchievements} />
      {featuredReviews.length ? (
        <TestimonialStrip
          reviews={featuredReviews}
          subheading={`Rated ${AGGREGATE_RATING.ratingValue}/5 across ${AGGREGATE_RATING.reviewCount}+ Google reviews`}
        />
      ) : null}
    </>
  );
}
