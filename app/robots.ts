import type { MetadataRoute } from 'next'
import { defaultSEO } from '@/lib/seo.config'

const DISALLOW = ['/api/', '/booking/', '/admin/', '/sign-in', '/sign-up', '/_next/']

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: DISALLOW,
      },
      // Explicit allows for retrieval/AI crawlers so engines that read
      // (rather than train on) the site can fetch it. These crawlers don't
      // execute JavaScript, so critical content must also exist in raw
      // HTML — verified separately via `curl -A "<agent>" <url>`.
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
        disallow: DISALLOW,
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        disallow: DISALLOW,
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: DISALLOW,
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: DISALLOW,
      },
    ],
    sitemap: `${defaultSEO.siteUrl}/sitemap.xml`,
  }
}
