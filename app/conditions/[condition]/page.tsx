import { CONDITION_PAGES } from '@/lib/condition-pages'
import { HINDI_PAGES } from '@/lib/hindi-pages'
import { notFound } from 'next/navigation'
import { BreadcrumbNav, CTASection, FAQAccordion, TrustBadges } from '@/components/pages'
import { AggregateRatingJsonLd } from '@/components/seo/JsonLd'
import { AGGREGATE_RATING } from '@/lib/clinic-info'
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
  }
}

export default function ConditionPage({ params }: { params: { condition: string } }) {
  const page = CONDITION_PAGES.find(p => p.slug === params.condition)
  if (!page) return notFound()

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.drdubay.in' },
      { '@type': 'ListItem', position: 2, name: 'Conditions', item: 'https://www.drdubay.in/conditions' },
      { '@type': 'ListItem', position: 3, name: page.title, item: `https://www.drdubay.in/conditions/${page.slug}` },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(conditionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Physician's real GBP rating, joined to the existing #physician
          node — condition pages previously carried no aggregate-rating
          signal at all. */}
      <AggregateRatingJsonLd
        ratingValue={AGGREGATE_RATING.ratingValue}
        reviewCount={AGGREGATE_RATING.reviewCount}
        itemId={`${defaultSEO.siteUrl}/#physician`}
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Conditions', href: '/conditions' },
            { label: page.title },
          ]}
        />

        {/* Hero */}
        <div className="mb-8">
          <span className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            {page.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
            {page.h1}
          </h1>
          <p className="text-gray-600 text-base leading-relaxed">{page.intro}</p>
        </div>

        <TrustBadges />

        {/* What Is It */}
        <section className="my-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{page.whatIsIt.heading}</h2>
          <p className="text-gray-600 leading-relaxed">{page.whatIsIt.content}</p>
        </section>

        {/* Causes */}
        <section className="my-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{page.causes.heading}</h2>
          <ul className="space-y-2">
            {page.causes.items.map((item, i) => (
              <li key={i} className="flex gap-3 text-gray-600 text-sm">
                <span className="text-blue-500 mt-0.5 flex-shrink-0">•</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Symptoms */}
        <section className="my-10 bg-red-50 rounded-2xl p-6 border border-red-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{page.symptoms.heading}</h2>
          <ul className="space-y-2">
            {page.symptoms.items.map((item, i) => (
              <li key={i} className="flex gap-3 text-gray-700 text-sm">
                <span className="text-red-500 mt-0.5 flex-shrink-0">⚠</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Diagnosis */}
        <section className="my-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">{page.diagnosis.heading}</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">{page.diagnosis.content}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {page.diagnosis.tests.map((test, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-3 border border-gray-200 text-sm text-gray-700">
                {test}
              </div>
            ))}
          </div>
        </section>

        {/* Treatment */}
        <section className="my-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{page.treatment.heading}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-green-700 mb-3 text-sm uppercase tracking-wide">Non-Surgical Options</h3>
              <ul className="space-y-2">
                {page.treatment.nonSurgical.map((item, i) => (
                  <li key={i} className="text-sm text-gray-600 flex gap-2">
                    <span className="text-green-500 flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-blue-700 mb-3 text-sm uppercase tracking-wide">Surgical Options</h3>
              <ul className="space-y-2">
                {page.treatment.surgical.map((item, i) => (
                  <li key={i} className="text-sm text-gray-600 flex gap-2">
                    <span className="text-blue-500 flex-shrink-0">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Why Dr. Dubay */}
        <section className="my-10 bg-gray-50 rounded-2xl p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Dr. Dheeraj Dubay?</h2>
          <ul className="space-y-3">
            {page.whyDrDubay.map((point, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-blue-600 mt-0.5">✓</span>
                <span className="text-gray-700 text-sm leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <section className="my-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <FAQAccordion faqs={page.faqs} />
        </section>

        {/* Related Conditions */}
        {page.relatedConditions.length > 0 && (
          <section className="my-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Related Conditions</h2>
            <div className="flex flex-wrap gap-3">
              {page.relatedConditions.map((slug, i) => {
                const related = CONDITION_PAGES.find(p => p.slug === slug)
                if (!related) return null
                return (
                  <a
                    key={i}
                    href={`/conditions/${slug}`}
                    className="text-sm text-blue-700 bg-blue-50 border border-blue-200 px-4 py-2 rounded-full hover:bg-blue-100 transition-colors"
                  >
                    {related.title}
                  </a>
                )
              })}
            </div>
          </section>
        )}

        <CTASection />
      </main>
    </>
  )
}
