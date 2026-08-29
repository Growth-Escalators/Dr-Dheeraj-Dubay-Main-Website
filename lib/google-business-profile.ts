import 'server-only'

import { getGoogleAccessToken } from '@/lib/google-oauth'

export type BusinessProfileAccount = {
  name: string
  accountName?: string
  type?: string
  role?: string
  verificationState?: string
  permissionLevel?: string
}

export type BusinessProfileLocation = {
  name: string
  title?: string
  websiteUri?: string
  storefrontAddress?: {
    regionCode?: string
    languageCode?: string
    postalCode?: string
    administrativeArea?: string
    locality?: string
    addressLines?: string[]
  }
  phoneNumbers?: {
    primaryPhone?: string
    additionalPhones?: string[]
  }
  metadata?: Record<string, unknown>
}

export type BusinessProfileReviewSummary = {
  averageRating: number | null
  totalReviewCount: number
}

type AccountsListResponse = {
  accounts?: BusinessProfileAccount[]
  nextPageToken?: string
}

type LocationsListResponse = {
  locations?: BusinessProfileLocation[]
  nextPageToken?: string
  totalSize?: number
}

type ReviewsListResponse = {
  averageRating?: number
  totalReviewCount?: number
}

async function googleGet<T>(url: string): Promise<T> {
  const accessToken = await getGoogleAccessToken()
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error(`Google Business Profile request failed with HTTP ${response.status}`)
  }

  return (await response.json()) as T
}

/**
 * Lists Business Profile accounts visible to the authenticated Workspace user.
 * Google may return quota errors until the GBP API access case is approved.
 */
export async function listBusinessProfileAccounts(): Promise<BusinessProfileAccount[]> {
  const payload = await googleGet<AccountsListResponse>(
    'https://mybusinessaccountmanagement.googleapis.com/v1/accounts?pageSize=20',
  )
  return payload.accounts ?? []
}

/**
 * Lists locations for one GBP account. Pass an account resource such as
 * "accounts/123456789". The special "accounts/-" resource can be used to
 * include indirectly managed listings when Google permits it.
 */
export async function listBusinessProfileLocations(
  accountResourceName: string,
): Promise<BusinessProfileLocation[]> {
  if (!/^accounts\/(?:-|[^/]+)$/.test(accountResourceName)) {
    throw new Error('Invalid Google Business Profile account resource name')
  }

  const accountId = accountResourceName.slice('accounts/'.length)
  const readMask = [
    'name',
    'title',
    'websiteUri',
    'storefrontAddress',
    'phoneNumbers',
    'metadata',
  ].join(',')

  const url = new URL(
    `https://mybusinessbusinessinformation.googleapis.com/v1/accounts/${encodeURIComponent(accountId)}/locations`,
  )
  url.searchParams.set('readMask', readMask)
  url.searchParams.set('pageSize', '100')

  const payload = await googleGet<LocationsListResponse>(url.toString())
  return payload.locations ?? []
}

/**
 * Reads Google's own aggregate rating and total review count for a location.
 * This is intentionally read-only and returns the values unchanged.
 *
 * Keep this dormant until the GBP API case is approved and the exact account
 * and location IDs have been verified against the managed Jaipur listing.
 */
export async function getBusinessProfileReviewSummary(
  accountId: string,
  locationId: string,
): Promise<BusinessProfileReviewSummary> {
  if (!/^[A-Za-z0-9_-]+$/.test(accountId) || !/^[A-Za-z0-9_-]+$/.test(locationId)) {
    throw new Error('Invalid Google Business Profile account/location ID')
  }

  const url = new URL(
    `https://mybusiness.googleapis.com/v4/accounts/${encodeURIComponent(accountId)}/locations/${encodeURIComponent(locationId)}/reviews`,
  )
  // A single review is enough to obtain aggregate fields from ListReviewsResponse.
  url.searchParams.set('pageSize', '1')

  const payload = await googleGet<ReviewsListResponse>(url.toString())
  return {
    averageRating:
      typeof payload.averageRating === 'number' ? payload.averageRating : null,
    totalReviewCount:
      typeof payload.totalReviewCount === 'number' ? payload.totalReviewCount : 0,
  }
}
