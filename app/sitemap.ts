import type { MetadataRoute } from 'next'
import { db } from '@/lib/db'
import { defaultSEO } from '@/lib/seo.config'
import { CITY_PAGES } from '@/lib/city-pages'
import { HINDI_PAGES } from '@/lib/hindi-pages'
import { PROCEDURE_PAGES } from '@/lib/procedure-pages'
import { CONDITION_PAGES } from '@/lib/condition-pages'
import { COST_PAGES } from '@/lib/cost-pages'

export const revalidate = 3600

const BASE = defaultSEO.siteUrl
type Entry = MetadataRoute.Sitemap[number]

// Static routes have no real "last changed" date we can source from the DB
// or a content file, so `lastModified` is omitted entirely per the GE SEO
// standard: a fabricated/build-time date teaches Google to ignore the
// sitemap's lastmod signal altogether.
const staticEntries: Entry[] = [
  { url: `${BASE}/`, changeFrequency: 'daily', priority: 1.0 },
  { url: `${BASE}/about`, changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE}/services`, changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE}/blogs`, changeFrequency: 'weekly', priority: 0.7 },
  { url: `${BASE}/achievements`, changeFrequency: 'weekly', priority: 0.7 },
  { url: `${BASE}/gallery`, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE}/youtube`, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE}/contact`, changeFrequency: 'yearly', priority: 0.5 },
  { url: `${BASE}/events`, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE}/faq`, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE}/locations`, changeFrequency: 'monthly', priority: 0.7 },
  // Money page (WS-4b) — reclaimed from the thin CITY_PAGES entry with full
  // clinical/authority content. lastModified omitted per the sitemap
  // standard (no real content-change date to report yet at first publish).
  { url: `${BASE}/hip-replacement-jaipur`, changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE}/articles`, changeFrequency: 'weekly', priority: 0.6 },
  { url: `${BASE}/videos`, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE}/podcasts`, changeFrequency: 'monthly', priority: 0.6 },
]

// Data-file-driven pages (procedures/conditions/cities/hindi) have no real
// change-date field either — same rule applies, `lastModified` is omitted.
const procedureEntries: Entry[] = PROCEDURE_PAGES.map((p) => ({
  url: `${BASE}/procedures/${p.slug}`,
  changeFrequency: 'weekly',
  priority: 0.9,
}))

const conditionEntries: Entry[] = CONDITION_PAGES.map((c) => ({
  url: `${BASE}/conditions/${c.slug}`,
  changeFrequency: 'weekly',
  priority: 0.8,
}))

const hindiEntries: Entry[] = HINDI_PAGES.map((h) => ({
  url: `${BASE}/hindi/${h.slug}`,
  changeFrequency: 'weekly',
  priority: 0.8,
}))

const cityEntries: Entry[] = CITY_PAGES.map((c) => ({
  url: `${BASE}/${c.slug}`,
  changeFrequency: 'monthly',
  priority: 0.7,
}))

// Cost-inquiry pages (WS-3b) — same data-file rule: no lastModified, these
// are new data-file pages with no real content-change date yet; `new Date()`
// per build would be an inaccurate lastmod signal (see GE SEO standard).
const costEntries: Entry[] = COST_PAGES.map((c) => ({
  url: `${BASE}/cost/${c.slug}`,
  changeFrequency: 'monthly',
  priority: 0.9,
}))

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Dynamic DB entries — best-effort; failures must not break the build.
  const dynamicEntries: Entry[] = []
  try {
    const [blogs, services, achievements] = await Promise.all([
      db.blogs.findMany({
        where: { isPublished: true, slug: { not: null } },
        select: { slug: true, publishedAt: true },
      }),
      // Services has no date field in the schema (no createdAt/updatedAt/
      // publishedAt) — there is no real change date to source, so these
      // entries omit `lastModified` rather than fabricate one.
      db.services.findMany({
        where: { slug: { not: null } },
        select: { slug: true },
      }),
      db.achievement.findMany({
        select: { slug: true, createdAt: true },
      }),
    ])

    for (const b of blogs) {
      if (!b.slug) continue
      dynamicEntries.push({
        url: `${BASE}/blogs/${b.slug}`,
        changeFrequency: 'weekly',
        priority: 0.7,
        ...(b.publishedAt ? { lastModified: b.publishedAt } : {}),
      })
    }
    for (const s of services) {
      if (!s.slug) continue
      dynamicEntries.push({
        url: `${BASE}/services/${s.slug}`,
        changeFrequency: 'monthly',
        priority: 0.8,
      })
    }
    for (const a of achievements) {
      if (!a.slug) continue
      dynamicEntries.push({
        url: `${BASE}/achievements/${a.slug}`,
        changeFrequency: 'monthly',
        priority: 0.6,
        ...(a.createdAt ? { lastModified: a.createdAt } : {}),
      })
    }
  } catch (e) {
    console.error('[sitemap] DB fetch failed, returning static-only:', e)
  }

  return [
    ...staticEntries,
    ...procedureEntries,
    ...conditionEntries,
    ...costEntries,
    ...hindiEntries,
    ...cityEntries,
    ...dynamicEntries,
  ]
}
