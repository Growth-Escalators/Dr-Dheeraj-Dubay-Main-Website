import { COST_PAGES } from '@/lib/cost-pages'
import { PROCEDURE_PAGES } from '@/lib/procedure-pages'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { BreadcrumbNav, CTASection, FAQAccordion, TrustBadges, CostEstimateCTA } from '@/components/pages'
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd'
import { FaqJsonLd } from '@/components/seo/FaqJsonLd'
import { AggregateRatingJsonLd, ReviewListJsonLd } from '@/components/seo/JsonLd'
import { TestimonialStrip } from '@/components/ui/TestimonialStrip'
import { CostInquiryPopup } from '@/components/ui/CostInquiryPopup'
import { getPublishedReviews } from '@/lib/reviews'
import { AGGREGATE_RATING } from '@/lib/clinic-info'
import { defaultSEO, generatePageMetadata } from '@/lib/seo.config'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return COST_PAGES.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const page = COST_PAGES.find((p) => p.slug === params.slug)
  if (!page) return {}
  return generatePageMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.keywords,
    slug: `cost/${page.slug}`,
  })
}

export default async function CostPage({ params }: { params: { slug: string } }) {
  const page = COST_PAGES.find((p) => p.slug === params.slug)
  if (!page) return notFound()

  const canonical = `${defaultSEO.siteUrl}/cost/${page.slug}`
  const relatedProcedure = PROCEDURE_PAGES.find((p) => p.slug === page.relatedProcedureSlug)
  const relatedCostPage = page.relatedCostSlug
    ? COST_PAGES.find((p) => p.slug === page.relatedCostSlug)
    : undefined

  // Reuse whatever review pool already exists for the matching procedure
  // page — same PatientReview rows, same aggregate, so cost pages don't
  // start from zero social proof and never contradict the procedure page.
  const reviews = await getPublishedReviews({ procedureSlug: page.relatedProcedureSlug, limit: 3 })
  const aggregate = AGGREGATE_RATING

  // MedicalProcedure schema — references the site's existing Physician
  // node by @id (defined once in components/seo/JsonLd.tsx's
  // PhysicianJsonLd, which PhysicianJsonLd/MedicalBusinessJsonLd already
  // render on other pages) instead of a fresh inline Person, per the GE
  // SEO standard's "connected @id graph" rule.
  const procedureSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    '@id': `${canonical}#procedure`,
    name: page.schema.procedureName,
    description: page.schema.description,
    bodyLocation: page.schema.bodyLocation,
    procedureType: { '@type': 'MedicalProcedureType', name: page.category },
    performer: { '@id': `${defaultSEO.siteUrl}/#physician` },
    url: canonical,
  }

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: defaultSEO.siteUrl },
          { name: page.h1, url: canonical },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(procedureSchema) }}
      />
      <FaqJsonLd faqs={page.faqs.map((f) => ({ question: f.q, answer: f.a }))} />
      {aggregate ? (
        <AggregateRatingJsonLd
          ratingValue={aggregate.ratingValue}
          reviewCount={aggregate.reviewCount}
          itemType="MedicalProcedure"
          itemId={`${canonical}#procedure`}
          itemName={page.schema.procedureName}
        />
      ) : null}
      {reviews.length ? (
        <ReviewListJsonLd
          reviews={reviews}
          itemReviewedType="MedicalProcedure"
          itemReviewedId={`${canonical}#procedure`}
          itemReviewedName={page.schema.procedureName}
        />
      ) : null}

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <BreadcrumbNav crumbs={[{ label: 'Home', href: '/' }, { label: page.h1 }]} />

        {/* Hero + direct-answer intro — one H1, answer in the first ~55 words. */}
        <div className="mb-2">
          <span className="inline-block bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 border border-emerald-200">
            {page.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
            {page.h1}
          </h1>
          <p className="text-gray-600 text-base leading-relaxed">{page.intro}</p>
        </div>

        {/* Top inline CTA — compact, non-blocking, sits above the fold. */}
        <CostEstimateCTA page={page} />

        {/* Cost headline box. hasConfirmedRange=false (hip page today) means
            NO number is rendered at all — "cost varies" framing only. */}
        <div className="my-8 rounded-2xl border border-gray-200 bg-gray-50 p-6 md:p-8 text-center">
          <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-2">
            {page.hasConfirmedRange ? 'Typical price range' : 'Your estimate'}
          </p>
          <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">{page.costHeadline}</p>
          <p className="text-sm text-gray-600">{page.costSubtext}</p>
          {page.comparisonNote && (
            <p className="text-xs text-gray-500 mt-3">{page.comparisonNote}</p>
          )}
        </div>

        <TrustBadges />

        {/* What affects your cost */}
        <section className="my-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{page.whatAffectsCostHeading}</h2>
          <div className="space-y-4">
            {page.whatAffectsCost.map((factor, i) => (
              <div key={i} className="flex gap-3">
                <span className="flex-shrink-0 w-2 h-2 rounded-full bg-emerald-500 mt-2" />
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{factor.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mt-0.5">{factor.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Insurance & cashless. Every empanelment / regulatory claim in
            page.insuranceSchemes / insuranceRegulatoryNote is deliberately
            hedged ("confirm with the team") — see the [VERIFY] comments
            next to each value in lib/cost-pages.ts. Nothing here is
            asserted as settled fact pending clinic sign-off. */}
        <section className="my-10 bg-emerald-50 rounded-2xl p-6 md:p-8 border border-emerald-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Insurance &amp; cashless (RGHS / Ayushman / CGHS)
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed mb-5">{page.insuranceIntro}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            {page.insuranceSchemes.map((scheme, i) => (
              <div key={i} className="bg-white rounded-xl p-4 border border-emerald-100">
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{scheme.name}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{scheme.detail}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-600 leading-relaxed italic">{page.insuranceRegulatoryNote}</p>
        </section>

        {/* Why choose Dr. Dubay — every bullet here carries a [VERIFY]
            comment in lib/cost-pages.ts (surgery count, award wording,
            NABH status, etc.) per the doctor sign-off checklist. The
            rating/review-count line is pulled live from the canonical
            AGGREGATE_RATING constant (lib/clinic-info.ts), which already
            carries its own placeholder-count TODO — not a new one. */}
        <section className="my-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why patients choose Dr. Dubay</h2>
          <ul className="space-y-3">
            {page.whyDrDubay.map((point, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-emerald-600 mt-0.5">✓</span>
                <span className="text-gray-700 text-sm leading-relaxed">{point}</span>
              </li>
            ))}
            {aggregate && (
              <li className="flex gap-3">
                <span className="text-emerald-600 mt-0.5">✓</span>
                <span className="text-gray-700 text-sm leading-relaxed">
                  Rated {aggregate.ratingValue.toFixed(1)}/5 across {aggregate.reviewCount}+ verified
                  patient reviews on Google and JustDial.
                </span>
              </li>
            )}
          </ul>
        </section>

        {/* FAQ */}
        <section className="my-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <FAQAccordion faqs={page.faqs} />
        </section>

        {/* Related links — cost twin (knee ↔ robotic knee) + the matching
            /procedures page, so crawl depth stays shallow both ways. */}
        <section className="my-10 flex flex-wrap gap-3">
          {relatedCostPage && (
            <Link
              href={`/cost/${relatedCostPage.slug}`}
              className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-full hover:bg-emerald-100 transition-colors"
            >
              {page.relatedCostLabel} →
            </Link>
          )}
          {relatedProcedure && (
            <Link
              href={`/procedures/${relatedProcedure.slug}`}
              className="text-sm text-blue-700 bg-blue-50 border border-blue-200 px-4 py-2 rounded-full hover:bg-blue-100 transition-colors"
            >
              About {relatedProcedure.title} →
            </Link>
          )}
        </section>

        <CTASection
          heading="Ready for a real number?"
          subheading="Send your reports on WhatsApp and Dr. Dubay's team will reply with a personalised estimate — not a generic price list."
        />
      </main>

      {reviews.length ? (
        <TestimonialStrip
          reviews={reviews}
          heading={`${page.schema.procedureName} — patient experiences`}
          subheading={
            aggregate
              ? `${aggregate.ratingValue}/5 average across ${aggregate.reviewCount} reviews`
              : undefined
          }
        />
      ) : null}

      {/* Scroll-triggered lead capture. Fires once per visit at ~30% scroll,
          skips entirely if the top CostEstimateCTA was already used — see
          components/ui/CostInquiryPopup.tsx for the shared flag logic and
          the mobile bottom-sheet / desktop modal split. */}
      <CostInquiryPopup page={page} />
    </>
  )
}
