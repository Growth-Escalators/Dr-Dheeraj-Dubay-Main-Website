import type { MetadataRoute } from 'next'
import { db } from '@/lib/db'
import { defaultSEO } from '@/lib/seo.config'
import { CITY_PAGES } from '@/lib/city-pages.current'
import { HINDI_PAGES } from '@/lib/hindi-pages.current'
import { PROCEDURE_PAGES } from '@/lib/procedure-pages.current'
import { CONDITION_PAGES } from '@/lib/condition-pages.current'
import { COST_PAGES } from '@/lib/cost-pages.current'

export const revalidate = 3600

const BASE = defaultSEO.siteUrl
type Entry = MetadataRoute.Sitemap[number]

function cleanSlug(slug: string) {
  return slug.trim().replace(/^\/+|\/+$/g, '')
}

const EXCLUDED_BLOG_SLUGS = new Set(['joint-replacement-surgery-jaipur-india'])
const PRIORITY_PROCEDURES = new Set(['knee-replacement-surgery', 'robotic-knee-replacement'])
const PRIORITY_CITY_PAGES = new Set(['joint-replacement-surgeon-jaipur'])
const PRIORITY_COST_PAGES = new Set([
  'knee-replacement-jaipur',
  'robotic-knee-replacement-jaipur',
  'hip-replacement-jaipur',
])

const staticEntries: Entry[] = [
  { url: `${BASE}/`, changeFrequency: 'daily', priority: 1.0 },
  { url: `${BASE}/about`, changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE}/services`, changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE}/blogs`, changeFrequency: 'weekly', priority: 0.7 },
  { url: `${BASE}/achievements`, changeFrequency: 'weekly', priority: 0.6 },
  { url: `${BASE}/gallery`, changeFrequency: 'monthly', priority: 0.5 },
  { url: `${BASE}/testimonials`, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE}/contact`, changeFrequency: 'yearly', priority: 0.5 },
  { url: `${BASE}/events`, changeFrequency: 'monthly', priority: 0.5 },
  { url: `${BASE}/faq`, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE}/locations`, changeFrequency: 'monthly', priority: 0.75 },
  { url: `${BASE}/hip-replacement-jaipur`, changeFrequency: 'weekly', priority: 0.95 },
  { url: `${BASE}/insurance-cashless-jaipur`, changeFrequency: 'monthly', priority: 0.85, lastModified: '2026-08-29' },
  { url: `${BASE}/editorial-policy`, changeFrequency: 'monthly', priority: 0.5 },
  { url: `${BASE}/articles`, changeFrequency: 'weekly', priority: 0.6 },
  { url: `${BASE}/news`, changeFrequency: 'weekly', priority: 0.5 },
  { url: `${BASE}/videos`, changeFrequency: 'monthly', priority: 0.5 },
  { url: `${BASE}/podcasts`, changeFrequency: 'monthly', priority: 0.5 },
]

const procedureEntries: Entry[] = PROCEDURE_PAGES.map((page) => ({
  url: `${BASE}/procedures/${page.slug}`,
  changeFrequency: 'weekly',
  priority: PRIORITY_PROCEDURES.has(page.slug) ? 0.95 : 0.8,
  ...(page.schema.dateModified ? { lastModified: page.schema.dateModified } : {}),
}))

const conditionEntries: Entry[] = CONDITION_PAGES.map((page) => ({
  url: `${BASE}/conditions/${page.slug}`,
  changeFrequency: 'weekly',
  priority: 0.75,
}))

const hindiEntries: Entry[] = HINDI_PAGES.map((page) => ({
  url: `${BASE}/hindi/${page.slug}`,
  changeFrequency: 'weekly',
  priority: 0.75,
}))

const cityEntries: Entry[] = CITY_PAGES.map((page) => ({
  url: `${BASE}/${page.slug}`,
  changeFrequency: 'monthly',
  priority: PRIORITY_CITY_PAGES.has(page.slug) ? 0.95 : 0.65,
}))

const costEntries: Entry[] = COST_PAGES.map((page) => ({
  url: `${BASE}/cost/${page.slug}`,
  changeFrequency: 'monthly',
  priority: PRIORITY_COST_PAGES.has(page.slug) ? 0.9 : 0.75,
}))

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const dynamicEntries: Entry[] = []

  try {
    const [blogs, services, achievements] = await Promise.all([
      db.blogs.findMany({
        where: { isPublished: true, slug: { not: null } },
        select: { slug: true, publishedAt: true },
      }),
      db.services.findMany({
        where: { slug: { not: null } },
        select: { slug: true },
      }),
      db.achievement.findMany({
        select: { slug: true, createdAt: true },
      }),
    ])

    for (const blog of blogs) {
      if (!blog.slug) continue
      const slug = cleanSlug(blog.slug)
      if (!slug || EXCLUDED_BLOG_SLUGS.has(slug)) continue
      dynamicEntries.push({
        url: `${BASE}/blogs/${slug}`,
        changeFrequency: 'weekly',
        priority: 0.65,
        ...(blog.publishedAt ? { lastModified: blog.publishedAt } : {}),
      })
    }

    for (const service of services) {
      if (!service.slug) continue
      const slug = cleanSlug(service.slug)
      if (!slug) continue
      dynamicEntries.push({
        url: `${BASE}/services/${slug}`,
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    }

    for (const achievement of achievements) {
      if (!achievement.slug) continue
      const slug = cleanSlug(achievement.slug)
      if (!slug) continue
      dynamicEntries.push({
        url: `${BASE}/achievements/${slug}`,
        changeFrequency: 'monthly',
        priority: 0.5,
        ...(achievement.createdAt ? { lastModified: achievement.createdAt } : {}),
      })
    }
  } catch (error) {
    console.error('[sitemap] DB fetch failed, returning static-only:', error)
  }

  const entries = [
    ...staticEntries,
    ...procedureEntries,
    ...conditionEntries,
    ...costEntries,
    ...hindiEntries,
    ...cityEntries,
    ...dynamicEntries,
  ]

  return Array.from(new Map(entries.map((entry) => [entry.url, entry])).values())
}
