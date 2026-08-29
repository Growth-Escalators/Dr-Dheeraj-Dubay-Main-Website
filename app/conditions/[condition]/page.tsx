import { CONDITION_PAGES } from '@/lib/condition-pages.current'
import { HINDI_PAGES } from '@/lib/hindi-pages'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { BreadcrumbNav, CTASection, FAQAccordion, TrustBadges } from '@/components/pages'
import type { Metadata } from 'next'
import { defaultSEO } from '@/lib/seo.config'

export async function generateStaticParams() {
  return CONDITION_PAGES.map(p => ({ condition: p.slug }))
}

export async function generateMetadata(
  { params }: { params: { condition: string } }
): Promise<Metadata> {
  const page = CONDITION_PAGES.find(p => p.slug === params.condition)
  if (!page) return {}
  const canonical = `${defaultSEO.siteUrl}/conditions/${page.slug}`
  const hindiTwin = HINDI_PAGES.find(h => h.englishSlug === page.slug)
  const hindiUrl = hindiTwin ? `${defaultSEO.siteUrl}/hindi/${hindiTwin.slug}` : null

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: {
      canonical,
      languages: hindiUrl
        ? {
            'en-IN': canonical,
            'hi-IN': hindiUrl,
            'x-default': canonical,
          }
        : undefined,
    },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: canonical,
      locale: 'en_IN',
      alternateLocale: hindiUrl ? ['hi_IN'] : undefined,
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

export default function ConditionPage({ params }: { params: { condition: string } }) {
  const page = CONDITION_PAGES.find(p => p.slug === params.condition)
  if (!page) return notFound()

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: defaultSEO.siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Conditions', item: `${defaultSEO.siteUrl}/conditions` },
      { '@type': 'ListItem', position: 3, name: page.title, item: `${defaultSEO.siteUrl}/conditions/${page.slug}` },
    ],
  }

  const conditionSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalCondition',
    name: page.schema.name,
    description: page.schema.description,
    associatedAnatomy: { '@type': 'AnatomicalStructure', name: page.schema.associatedAnatomy },
    possibleTreatment: { '@type': 'MedicalTherapy', name: page.schema.possibleTreatment },
    relevantSpecialty: { '@type': 'MedicalSpecialty', name: 'Orthopedic Surgery' },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(conditionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Conditions', href: '/conditions' },
            { label: page.title },
          ]}
        />

        <header className="mb-8">
          <span className="mb-4 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            {page.category}
          </span>
          <h1 className="mb-4 text-3xl font-bold leading-tight text-gray-900 md:text-4xl">{page.h1}</h1>
          <p className="text-base leading-relaxed text-gray-600">{page.intro}</p>
          <p className="mt-3 text-xs leading-relaxed text-gray-500">
            Educational information only. Diagnosis and treatment require an individual orthopedic assessment.{' '}
            <Link href="/editorial-policy" className="font-medium text-blue-700 hover:underline">
              Read our medical editorial policy.
            </Link>
          </p>
        </header>

        <TrustBadges />

        <section className="my-10">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">{page.whatIsIt.heading}</h2>
          <p className="leading-relaxed text-gray-600">{page.whatIsIt.content}</p>
        </section>

        <section className="my-10">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">{page.causes.heading}</h2>
          <ul className="space-y-2">
            {page.causes.items.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-gray-600">
                <span className="mt-0.5 flex-shrink-0 text-blue-500">•</span>{item}
              </li>
            ))}
          </ul>
        </section>

        <section className="my-10 rounded-2xl border border-red-100 bg-red-50 p-6">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">{page.symptoms.heading}</h2>
          <ul className="space-y-2">
            {page.symptoms.items.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-gray-700">
                <span className="mt-0.5 flex-shrink-0 text-red-500">⚠</span>{item}
              </li>
            ))}
          </ul>
        </section>

        <section className="my-10">
          <h2 className="mb-3 text-2xl font-bold text-gray-900">{page.diagnosis.heading}</h2>
          <p className="mb-4 text-sm leading-relaxed text-gray-600">{page.diagnosis.content}</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {page.diagnosis.tests.map((test) => (
              <div key={test} className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700">{test}</div>
            ))}
          </div>
        </section>

        <section className="my-10">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">{page.treatment.heading}</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-green-700">Non-Surgical Options</h3>
              <ul className="space-y-2">
                {page.treatment.nonSurgical.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-gray-600"><span className="flex-shrink-0 text-green-500">✓</span>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-700">Surgical Options</h3>
              <ul className="space-y-2">
                {page.treatment.surgical.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-gray-600"><span className="flex-shrink-0 text-blue-500">→</span>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="my-10 rounded-2xl bg-gray-50 p-6 md:p-8">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">Dr. Dheeraj Dubay — relevant experience</h2>
          <ul className="space-y-3">
            {page.whyDrDubay.map((point) => (
              <li key={point} className="flex gap-3">
                <span className="mt-0.5 text-blue-600">✓</span>
                <span className="text-sm leading-relaxed text-gray-700">{point}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="my-10">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <FAQAccordion faqs={page.faqs} />
        </section>

        {page.relatedConditions.length > 0 && (
          <section className="my-10">
            <h2 className="mb-4 text-xl font-bold text-gray-900">Related Conditions</h2>
            <div className="flex flex-wrap gap-3">
              {page.relatedConditions.map((slug) => {
                const related = CONDITION_PAGES.find(p => p.slug === slug)
                if (!related) return null
                return (
                  <Link
                    key={slug}
                    href={`/conditions/${slug}`}
                    className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm text-blue-700 hover:bg-blue-100"
                  >
                    {related.title}
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        <CTASection heading="Need an Orthopedic Assessment?" />
      </main>
    </>
  )
}
