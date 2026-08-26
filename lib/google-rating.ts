import { AGGREGATE_RATING } from '@/lib/clinic-info'

export type GoogleAggregateRating = {
  ratingValue: number
  reviewCount: number
  source: 'google' | 'fallback'
}

const FALLBACK_RATING: GoogleAggregateRating = {
  ratingValue: AGGREGATE_RATING.ratingValue,
  reviewCount: AGGREGATE_RATING.reviewCount,
  source: 'fallback',
}

/**
 * Returns the current Google Places aggregate rating when the production
 * project has both GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID configured.
 *
 * We intentionally do not hard-code a Place ID here: the doctor has more than
 * one listing visible around Jaipur, and publishing the wrong listing's review
 * count would be worse than temporarily using the verified fallback.
 *
 * Places API (New) requires an explicit field mask. The fetch is cached for 24
 * hours so the site does not pay for a Places request on every page view.
 */
export async function getGoogleAggregateRating(): Promise<GoogleAggregateRating> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY?.trim()
  const placeId = process.env.GOOGLE_PLACE_ID?.trim()

  if (!apiKey || !placeId) return FALLBACK_RATING

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,
      {
        headers: {
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': 'rating,userRatingCount',
        },
        next: { revalidate: 86400 },
      },
    )

    if (!response.ok) return FALLBACK_RATING

    const data = (await response.json()) as {
      rating?: unknown
      userRatingCount?: unknown
    }

    if (
      typeof data.rating !== 'number' ||
      !Number.isFinite(data.rating) ||
      typeof data.userRatingCount !== 'number' ||
      !Number.isFinite(data.userRatingCount) ||
      data.userRatingCount < 1
    ) {
      return FALLBACK_RATING
    }

    return {
      ratingValue: data.rating,
      reviewCount: Math.floor(data.userRatingCount),
      source: 'google',
    }
  } catch {
    return FALLBACK_RATING
  }
}
