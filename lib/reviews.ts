import { db } from "@/lib/db"

export interface ReviewFilter {
  citySlug?: string
  procedureSlug?: string
  limit?: number
  featuredOnly?: boolean
}

export interface AggregateStats {
  ratingValue: number
  reviewCount: number
}

// Fetch published reviews. Optionally filter to a specific city + procedure
// (used on city / procedure landing pages so each page emits its own
// relevant testimonial set + AggregateRating).
//
// Returns reviews sorted: featured first, then newest. If no rows match,
// returns []; caller must handle the empty case (skip schema emission).
export async function getPublishedReviews(filter: ReviewFilter = {}) {
  try {
    return await db.patientReview.findMany({
      where: {
        isPublished: true,
        ...(filter.citySlug ? { citySlug: filter.citySlug } : {}),
        ...(filter.procedureSlug ? { procedureSlug: filter.procedureSlug } : {}),
        ...(filter.featuredOnly ? { isFeatured: true } : {}),
      },
      orderBy: [
        { isFeatured: "desc" },
        { dateOfReview: "desc" },
      ],
      take: filter.limit,
    })
  } catch {
    // DB unavailable (build-time, transient outage) — render the page
    // without reviews rather than 500. ISR will retry on next regeneration.
    return []
  }
}

// Aggregate (mean rating + count) for AggregateRating schema. Scoped the
// same way as getPublishedReviews so each page can show its own stats.
// Returns null when there are no published reviews matching the filter —
// callers must check and skip emitting AggregateRating in that case
// (Google flags AggregateRating with reviewCount=0 as invalid).
export async function getAggregateStats(
  filter: Omit<ReviewFilter, "limit" | "featuredOnly"> = {},
): Promise<AggregateStats | null> {
  const where = {
    isPublished: true,
    ...(filter.citySlug ? { citySlug: filter.citySlug } : {}),
    ...(filter.procedureSlug ? { procedureSlug: filter.procedureSlug } : {}),
  }

  try {
    const [count, reviews] = await Promise.all([
      db.patientReview.count({ where }),
      db.patientReview.findMany({ where, select: { rating: true } }),
    ])

    if (count === 0) return null

    const sum = reviews.reduce((acc, r) => acc + r.rating, 0)
    const ratingValue = Math.round((sum / count) * 10) / 10

    return { ratingValue, reviewCount: count }
  } catch {
    return null
  }
}
