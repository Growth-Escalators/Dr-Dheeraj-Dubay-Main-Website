import { NextResponse } from 'next/server'
import { getGoogleAggregateRating } from '@/lib/google-rating'

export const revalidate = 86400

export async function GET() {
  const rating = await getGoogleAggregateRating()

  return NextResponse.json(rating, {
    headers: {
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  })
}
