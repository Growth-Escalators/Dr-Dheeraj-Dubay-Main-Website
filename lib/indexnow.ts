/**
 * IndexNow — pings Bing (and any other participating engine, e.g.
 * Yandex/Seznam) the moment a URL is published or changed, instead of
 * waiting on crawl discovery. Bing's index is what feeds ChatGPT/Copilot
 * retrieval, so this is not optional for AI-surface visibility.
 *
 * Key file lives at /public/2dcc1d75803f6c857a97c1cf5959736a.txt and must
 * resolve at https://www.drdubay.in/2dcc1d75803f6c857a97c1cf5959736a.txt
 * (IndexNow verifies key ownership against that URL before accepting pings).
 *
 * This module is code prep only — nothing in the app calls it yet. WS-5
 * wires it into the blog publish/revalidate path. To use it later:
 *
 *   import { submitUrlToIndexNow } from '@/lib/indexnow'
 *   await submitUrlToIndexNow(`${defaultSEO.siteUrl}/blogs/${slug}`)
 *
 * Keep calls fire-and-forget (don't await in the hot request path) since
 * IndexNow delivery should never block a publish/revalidate response.
 */
import { defaultSEO } from '@/lib/seo.config'

const INDEXNOW_KEY = '2dcc1d75803f6c857a97c1cf5959736a'
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow'
// IndexNow caps a single submission at 10,000 URLs.
const MAX_URLS_PER_REQUEST = 10000

export interface IndexNowResult {
  ok: boolean
  status?: number
  error?: string
}

/**
 * Submit one or more absolute URLs to IndexNow. Safe to call with a single
 * URL (one blog post published) or a batch (sitemap re-generated).
 * Never throws — network/API failures are reported in the return value so
 * callers on a publish path aren't taken down by an IndexNow outage.
 */
export async function submitUrlsToIndexNow(urls: string[]): Promise<IndexNowResult> {
  const cleanUrls = urls.filter(Boolean).slice(0, MAX_URLS_PER_REQUEST)
  if (cleanUrls.length === 0) return { ok: true }

  const host = new URL(defaultSEO.siteUrl).host
  const keyLocation = `${defaultSEO.siteUrl}/${INDEXNOW_KEY}.txt`

  try {
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host,
        key: INDEXNOW_KEY,
        keyLocation,
        urlList: cleanUrls,
      }),
    })
    // IndexNow returns 200/202 on success; 400/403/422/429 on various
    // rejection cases. We surface the status rather than throw so a bad
    // key or rate limit doesn't crash the calling publish flow.
    return { ok: res.ok, status: res.status }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) }
  }
}

/** Convenience wrapper for the common case: one URL just published/updated. */
export async function submitUrlToIndexNow(url: string): Promise<IndexNowResult> {
  return submitUrlsToIndexNow([url])
}
