import 'server-only'

import { getGoogleAccessToken } from '@/lib/google-oauth'

export type SearchConsoleSite = {
  siteUrl: string
  permissionLevel: string
}

type SearchConsoleSitesResponse = {
  siteEntry?: SearchConsoleSite[]
}

/**
 * Read-only Search Console helper using the webmasters.readonly scope.
 */
export async function listSearchConsoleSites(): Promise<SearchConsoleSite[]> {
  const accessToken = await getGoogleAccessToken()
  const response = await fetch('https://www.googleapis.com/webmasters/v3/sites', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error(`Search Console sites.list failed with HTTP ${response.status}`)
  }

  const payload = (await response.json()) as SearchConsoleSitesResponse
  return payload.siteEntry ?? []
}
