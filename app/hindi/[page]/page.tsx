import { HINDI_PAGES } from '@/lib/hindi-pages.current'
import { PROCEDURE_PAGES } from '@/lib/procedure-pages.current'
import { CONDITION_PAGES } from '@/lib/condition-pages.current'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { BreadcrumbNav, CTASection, FAQAccordion, TrustBadges } from '@/components/pages'
import type { Metadata } from 'next'
import { defaultSEO } from '@/lib/seo.config'

export async function generateStaticParams() {
  return HINDI_PAGES.map(p => ({ page: p.slug }))
}

function resolveEnglishPath(englishSlug?: string): string | null {
  if (!englishSlug) return null
  if (PROCEDURE_PAGES.some((p) => p.slug === englishSlug)) {
    return `/procedures/${englishSlug}`
  }
  if (CONDITION_PAGES.some((c) => c.slug === englishSlug)) {
    return `/conditions/${englishSlug}`
  }
  return null
}

export async function generateMetadata(
  { params }: { params: { page: string } }
): Promise<Metadata> {
  const page = HINDI_PAGES.find(p => p.slug === params.page)
  if (!page) return {}
  const canonical = `${defaultSEO.siteUrl}/hindi/${page.slug}`
  const englishPath = resolveEnglishPath(page.englishSlug)
  const englishUrl = englishPath ? `${defaultSEO.siteUrl}${englishPath}` : null

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: {
      canonical,
      languages: englishUrl
        ? {
            'en-IN': englishUrl,
            'hi-IN': canonical,
            'x-default': englishUrl,
          }
        : undefined,
    },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: canonical,
      locale: 'hi_IN',
      alternateLocale: englishUrl ? ['en_IN'] : undefined,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: page.metaTitle,
      description: page.metaDescription,
      images: [`${defaultSEO.siteUrl}/assets/images/hero.png`],
    },
  }
}

export default function HindiPage({ params }: { params: { page: string } }) {
  const page = HINDI_PAGES.find(p => p.slug === params.page)
  if (!page) return notFound()
  const englishPath = resolveEnglishPath(page.englishSlug)

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'होम', item: defaultSEO.siteUrl },
      { '@type': 'ListItem', position: 2, name: 'हिंदी', item: `${defaultSEO.siteUrl}/hindi` },
      { '@type': 'ListItem', position: 3, name: page.title, item: `${defaultSEO.siteUrl}/hindi/${page.slug}` },
    ],
  }

  const faqSchema = page.faqs.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: page.faqs.map(faq => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faq.a },
        })),
      }
    : null

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <BreadcrumbNav
          crumbs={[
            { label: 'होम', href: '/' },
            { label: 'हिंदी', href: '/hindi' },
            { label: page.title },
          ]}
        />

        {englishPath && (
          <div className="mb-6 text-xs text-gray-500">
            Read in English:{' '}
            <Link href={englishPath} className="text-blue-600 hover:underline">
              English version
            </Link>
          </div>
        )}

        <header className="mb-8">
          <span className="mb-4 inline-block rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
            {page.category}
          </span>
          <h1 className="mb-4 text-3xl font-bold leading-tight text-gray-900 md:text-4xl" lang="hi">
            {page.h1}
          </h1>
          <p className="text-base leading-relaxed text-gray-600" lang="hi">{page.intro}</p>
          <p className="mt-3 text-xs leading-relaxed text-gray-500" lang="hi">
            यह जानकारी patient education के लिए है। सही diagnosis और treatment plan के लिए व्यक्तिगत orthopedic assessment जरूरी है।{' '}
            <Link href="/editorial-policy" className="font-medium text-orange-700 hover:underline">
              हमारी medical editorial policy पढ़ें।
            </Link>
          </p>
        </header>

        <TrustBadges />

        {page.sections.map((section) => (
          <section key={section.heading} className="my-10">
            <h2 className="mb-4 text-2xl font-bold text-gray-900" lang="hi">{section.heading}</h2>
            {section.content && (
              <p className="mb-4 leading-relaxed text-gray-600" lang="hi">{section.content}</p>
            )}
            {section.list && section.list.length > 0 && (
              <ul className="space-y-2">
                {section.list.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-gray-700" lang="hi">
                    <span className="mt-0.5 flex-shrink-0 text-orange-500">•</span>{item}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        {page.faqs.length > 0 && (
          <section className="my-10">
            <h2 className="mb-6 text-2xl font-bold text-gray-900" lang="hi">अक्सर पूछे जाने वाले सवाल</h2>
            <FAQAccordion faqs={page.faqs} />
          </section>
        )}

        <section className="my-10">
          <h2 className="mb-4 text-xl font-bold text-gray-900" lang="hi">और जानकारी पढ़ें</h2>
          <div className="flex flex-wrap gap-3">
            {HINDI_PAGES.filter(p => p.slug !== page.slug).map((related) => (
              <Link
                key={related.slug}
                href={`/hindi/${related.slug}`}
                className="rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm text-orange-700 hover:bg-orange-100"
                lang="hi"
              >
                {related.title}
              </Link>
            ))}
          </div>
        </section>

        <CTASection
          heading="बेहतर mobility और joint health के लिए orthopedic consultation लें"
          subheading="डॉ. धीरज दुबे से परामर्श लें। शालबी हॉस्पिटल, वैशाली नगर और डॉ. दुबे हिप एंड नी क्लीनिक, विद्याधर नगर, जयपुर में appointments उपलब्ध हैं।"
        />
      </main>
    </>
  )
}
