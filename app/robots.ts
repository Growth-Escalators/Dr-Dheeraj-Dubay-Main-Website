import type { MetadataRoute } from 'next'
import { defaultSEO } from '@/lib/seo.config'

const DISALLOW = ['/api/', '/booking/', '/admin/', '/sign-in', '/sign-up']

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/_next/static/', '/_next/image/'],
        disallow: DISALLOW,
      },
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
