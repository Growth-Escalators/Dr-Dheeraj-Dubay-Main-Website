import { PROCEDURE_PAGES } from '@/lib/procedure-pages'
import { HINDI_PAGES } from '@/lib/hindi-pages'
import { notFound } from 'next/navigation'
import { BreadcrumbNav, CTASection, FAQAccordion, RecoveryTimeline, TrustBadges } from '@/components/pages'
import { AggregateRatingJsonLd, ReviewListJsonLd } from '@/components/seo/JsonLd'
import { TestimonialStrip } from '@/components/ui/TestimonialStrip'
import { getPublishedReviews } from '@/lib/reviews'
import { AGGREGATE_RATING } from '@/lib/clinic-info'
import type { Metadata } from 'next'
import { defaultSEO } from '@/lib/seo.config'

export async function generateStaticParams() {
  return PROCEDURE_PAGES.map(p => ({ procedure: p.slug }))
}

export async function generateMetadata(
  { params }: { params: { procedure: string } }
): Promise<Metadata> {
  const page = PROCEDURE_PAGES.find(p => p.slug === params.procedure)
  if (!page) return {}
  const canonical = `${defaultSEO.siteUrl}/procedures/${page.slug}`
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

export default async function ProcedurePage({ params }: { params: { procedure: string } }) {
  const page = PROCEDURE_PAGES.find(p => p.slug === params.procedure)
  if (!page) return notFound()

  // Procedure-scoped testimonials from DB; aggregate rating digits come
  // from the canonical GBP source.
  const procedureReviews = await getPublishedReviews({
    procedureSlug: page.slug,
    limit: 3,
  })
  const aggregate = AGGREGATE_RATING

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.drdubay.in' },
      { '@type': 'ListItem', position: 2, name: 'Procedures', item: 'https://www.drdubay.in/procedures' },
      { '@type': 'ListItem', position: 3, name: page.title, item: `https://www.drdubay.in/procedures/${page.slug}` },
    ],
  }

  const procedureSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: page.schema.procedureName,
    description: page.schema.description,
    bodyLocation: page.schema.bodyLocation,
    followup: page.schema.followup,
    preparation: page.schema.preparation,
    howPerformed: page.schema.howPerformed,
    procedureType: { '@type': 'MedicalProcedureType', name: page.category },
    // References the site's existing Physician node by @id (defined once
    // in components/seo/JsonLd.tsx's PhysicianJsonLd) instead of a fresh
    // inline Person, per the GE SEO standard's "connected @id graph" rule.
    performer: { '@id': `${defaultSEO.siteUrl}/#physician` },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(procedureSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* AggregateRating/Review are the physician's real GBP rating, not a
          per-procedure rating we invented — attribute them to the existing
          #physician node (@id) so they join the same graph as
          PhysicianJsonLd instead of implying a fresh, unverifiable
          "MedicalProcedure has 1,100 reviews" claim. */}
      {aggregate ? (
        <AggregateRatingJsonLd
          ratingValue={aggregate.ratingValue}
          reviewCount={aggregate.reviewCount}
          itemId={`${defaultSEO.siteUrl}/#physician`}
        />
      ) : null}
      {procedureReviews.length ? (
        <ReviewListJsonLd
          reviews={procedureReviews}
          itemReviewedId={`${defaultSEO.siteUrl}/#physician`}
        />
      ) : null}

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Procedures', href: '/procedures' },
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

        {/* What is it */}
        <section className="my-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{page.whatIsIt.heading}</h2>
          <p className="text-gray-600 leading-relaxed">{page.whatIsIt.content}</p>
        </section>

        {/* How Performed */}
        <section className="my-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{page.howPerformed.heading}</h2>
          <ol className="space-y-3">
            {page.howPerformed.steps.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="text-gray-600 leading-relaxed pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Benefits */}
        <section className="my-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{page.benefits.heading}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {page.benefits.items.map((item, i) => (
              <div key={i} className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                <div className="text-2xl mb-2">{item.icon}</div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
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

        {/* Are You a Candidate? */}
        <section className="my-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{page.candidateFor.heading}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-xl p-5 border border-green-100">
              <h3 className="font-semibold text-green-800 mb-3 text-sm">You may be a good candidate if you have:</h3>
              <ul className="space-y-2">
                {page.candidateFor.symptoms.map((s, i) => (
                  <li key={i} className="text-xs text-green-700 flex gap-2">
                    <span>•</span>{s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-amber-50 rounded-xl p-5 border border-amber-100">
              <h3 className="font-semibold text-amber-800 mb-3 text-sm">This may not be ideal if you have:</h3>
              <ul className="space-y-2">
                {page.candidateFor.notIdeal.map((s, i) => (
                  <li key={i} className="text-xs text-amber-700 flex gap-2">
                    <span>•</span>{s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Recovery Timeline */}
        <section className="my-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{page.recovery.heading}</h2>
          <RecoveryTimeline steps={page.recovery.timeline} />
        </section>

        {/* FAQ */}
        <section className="my-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <FAQAccordion faqs={page.faqs} />
        </section>

        {/* Related Procedures */}
        {page.relatedProcedures.length > 0 && (
          <section className="my-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Related Procedures</h2>
            <div className="flex flex-wrap gap-3">
              {page.relatedProcedures.map((slug, i) => {
                const related = PROCEDURE_PAGES.find(p => p.slug === slug)
                if (!related) return null
                return (
                  <a
                    key={i}
                    href={`/procedures/${slug}`}
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
      {procedureReviews.length ? (
        <TestimonialStrip
          reviews={procedureReviews}
          heading={`${page.title} — patient experiences`}
          subheading={
            aggregate
              ? `${aggregate.ratingValue}/5 average across ${aggregate.reviewCount} reviews`
              : undefined
          }
        />
      ) : null}
    </>
  )
}
