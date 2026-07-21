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
  { url: `${BASE}/articles`, changeFrequency: 'weekly', priority: 0.6 },
  { url: `${BASE}/videos`, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE}/podcasts`, changeFrequency: 'monthly', priority: 0.6 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const procedureEntries: Entry[] = PROCEDURE_PAGES.map((p) => ({
    url: `${BASE}/procedures/${p.slug}`,
    changeFrequency: 'weekly',
    priority: 0.9,
    lastModified: now,
  }))

  const conditionEntries: Entry[] = CONDITION_PAGES.map((c) => ({
    url: `${BASE}/conditions/${c.slug}`,
    changeFrequency: 'weekly',
    priority: 0.8,
    lastModified: now,
  }))

  // Cost-inquiry pages (WS-3b). No lastModified — these are new data-file
  // pages with no real content-change date yet; `new Date()` per build
  // would be an inaccurate lastmod signal (see GE SEO standard).
  const costEntries: Entry[] = COST_PAGES.map((c) => ({
    url: `${BASE}/cost/${c.slug}`,
    changeFrequency: 'monthly',
    priority: 0.9,
  }))

  const hindiEntries: Entry[] = HINDI_PAGES.map((h) => ({
    url: `${BASE}/hindi/${h.slug}`,
    changeFrequency: 'weekly',
    priority: 0.8,
    lastModified: now,
  }))

  const cityEntries: Entry[] = CITY_PAGES.map((c) => ({
    url: `${BASE}/${c.slug}`,
    changeFrequency: 'monthly',
    priority: 0.7,
    lastModified: now,
  }))

  // Dynamic DB entries — best-effort; failures must not break the build.
  const dynamicEntries: Entry[] = []
  try {
    const [blogs, services, achievements] = await Promise.all([
      db.blogs.findMany({
        where: { isPublished: true, slug: { not: null } },
        select: { slug: true },
      }),
      db.services.findMany({
        where: { slug: { not: null } },
        select: { slug: true },
      }),
      db.achievement.findMany({
        select: { slug: true },
      }),
    ])

    for (const b of blogs) {
      if (!b.slug) continue
      dynamicEntries.push({
        url: `${BASE}/blogs/${b.slug}`,
        changeFrequency: 'weekly',
        priority: 0.7,
        lastModified: now,
      })
    }
    for (const s of services) {
      if (!s.slug) continue
      dynamicEntries.push({
        url: `${BASE}/services/${s.slug}`,
        changeFrequency: 'monthly',
        priority: 0.8,
        lastModified: now,
      })
    }
    for (const a of achievements) {
      if (!a.slug) continue
      dynamicEntries.push({
        url: `${BASE}/achievements/${a.slug}`,
        changeFrequency: 'monthly',
        priority: 0.6,
        lastModified: now,
      })
    }
  } catch (e) {
    console.error('[sitemap] DB fetch failed, returning static-only:', e)
  }

  return [
    ...staticEntries.map((e) => ({ ...e, lastModified: now })),
    ...procedureEntries,
    ...conditionEntries,
    ...costEntries,
    ...hindiEntries,
    ...cityEntries,
    ...dynamicEntries,
  ]
}
