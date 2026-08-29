import { PROCEDURE_PAGES } from '@/lib/procedure-pages.current'
import { HINDI_PAGES } from '@/lib/hindi-pages.current'
import { PROCEDURE_TO_COST_SLUG } from '@/lib/cost-pages.current'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { BreadcrumbNav, CTASection, FAQAccordion, RecoveryTimeline, TrustBadges } from '@/components/pages'
import { PhysicianJsonLd } from '@/components/seo/JsonLd'
import { ProcedureReferences } from '@/components/seo/ProcedureReferences'
import { RelatedPatientGuides } from '@/components/seo/RelatedPatientGuides'
import { TestimonialStrip } from '@/components/ui/TestimonialStrip'
import { getPublishedReviews } from '@/lib/reviews'
import type { Metadata } from 'next'
import { defaultSEO } from '@/lib/seo.config'

export async function generateStaticParams() {
  return PROCEDURE_PAGES.map((page) => ({ procedure: page.slug }))
}

export async function generateMetadata(
  { params }: { params: { procedure: string } },
): Promise<Metadata> {
  const page = PROCEDURE_PAGES.find((item) => item.slug === params.procedure)
  if (!page) return {}

  const canonical = `${defaultSEO.siteUrl}/procedures/${page.slug}`
  const hindiTwin = HINDI_PAGES.find((item) => item.englishSlug === page.slug)
  const hindiUrl = hindiTwin ? `${defaultSEO.siteUrl}/hindi/${hindiTwin.slug}` : null

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: {
      canonical,
      languages: hindiUrl
        ? { 'en-IN': canonical, 'hi-IN': hindiUrl, 'x-default': canonical }
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

export default async function ProcedurePage({ params }: { params: { procedure: string } }) {
  const page = PROCEDURE_PAGES.find((item) => item.slug === params.procedure)
  if (!page) return notFound()

  const costSlug = PROCEDURE_TO_COST_SLUG[page.slug]
  const procedureReviews = await getPublishedReviews({ procedureSlug: page.slug, limit: 3 })

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: defaultSEO.siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${defaultSEO.siteUrl}/services` },
      { '@type': 'ListItem', position: 3, name: page.title, item: `${defaultSEO.siteUrl}/procedures/${page.slug}` },
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
    performer: { '@id': `${defaultSEO.siteUrl}/#physician` },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    ...(page.schema.dateModified ? { dateModified: page.schema.dateModified } : {}),
    mainEntity: page.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(procedureSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PhysicianJsonLd />

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services' },
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
            General patient education only. Suitability, risks and recovery differ by patient and require an individual clinical assessment.{' '}
            <Link href="/editorial-policy" className="font-medium text-blue-700 hover:underline">
              Medical editorial policy.
            </Link>
          </p>
          {page.schema.dateModified && (
            <p className="mt-3 text-xs text-gray-400">
              Content updated{' '}
              {new Date(page.schema.dateModified).toLocaleDateString('en-IN', {
                year: 'numeric', month: 'long', day: 'numeric',
              })}
            </p>
          )}
          {costSlug && (
            <Link
              href={`/cost/${costSlug}`}
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
            >
              See cost &amp; insurance details for this procedure →
            </Link>
          )}
        </header>

        <TrustBadges />

        <section className="my-10">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">{page.whatIsIt.heading}</h2>
          <p className="leading-relaxed text-gray-600">{page.whatIsIt.content}</p>
        </section>

        <section className="my-10">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">{page.howPerformed.heading}</h2>
          <ol className="space-y-3">
            {page.howPerformed.steps.map((step, index) => (
              <li key={step} className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">{index + 1}</span>
                <span className="pt-0.5 leading-relaxed text-gray-600">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="my-10">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">{page.benefits.heading}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {page.benefits.items.map((item) => (
              <div key={item.title} className="rounded-xl border border-blue-100 bg-blue-50 p-5">
                <div className="mb-2 text-2xl">{item.icon}</div>
                <h3 className="mb-1 text-sm font-semibold text-gray-900">{item.title}</h3>
                <p className="text-xs leading-relaxed text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="my-10 rounded-2xl bg-gray-50 p-6 md:p-8">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">Dr. Dheeraj Dubay — Relevant Experience</h2>
          <ul className="space-y-3">
            {page.whyDrDubay.map((point) => (
              <li key={point} className="flex gap-3">
                <span className="mt-0.5 text-emerald-600">✓</span>
                <span className="text-sm leading-relaxed text-gray-700">{point}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="my-10">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">{page.candidateFor.heading}</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-green-100 bg-green-50 p-5">
              <h3 className="mb-3 text-sm font-semibold text-green-800">You may need an orthopedic assessment if you have:</h3>
              <ul className="space-y-2">
                {page.candidateFor.symptoms.map((symptom) => (
                  <li key={symptom} className="flex gap-2 text-xs text-green-700"><span>•</span>{symptom}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-amber-100 bg-amber-50 p-5">
              <h3 className="mb-3 text-sm font-semibold text-amber-800">Factors that may change or delay the plan include:</h3>
              <ul className="space-y-2">
                {page.candidateFor.notIdeal.map((factor) => (
                  <li key={factor} className="flex gap-2 text-xs text-amber-700"><span>•</span>{factor}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="my-10">
          <h2 className="mb-2 text-2xl font-bold text-gray-900">{page.recovery.heading}</h2>
          <p className="mb-4 text-sm leading-relaxed text-gray-600">
            Recovery is patient-dependent. The timeline below is general education and may differ with age, diagnosis, other medical conditions, surgery type and rehabilitation progress.
          </p>
          <RecoveryTimeline steps={page.recovery.timeline} />
        </section>

        <section className="my-10">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <FAQAccordion faqs={page.faqs} />
        </section>

        <ProcedureReferences procedureSlug={page.slug} />
        <RelatedPatientGuides currentPath={`/procedures/${page.slug}`} />

        {(page.relatedProcedures.length > 0 || page.crossLinks?.length) && (
          <section className="my-10">
            <h2 className="mb-4 text-xl font-bold text-gray-900">Related treatment information</h2>
            <div className="flex flex-wrap gap-3">
              {page.relatedProcedures.map((slug) => {
                const related = PROCEDURE_PAGES.find((item) => item.slug === slug)
                if (!related) return null
                return (
                  <Link key={slug} href={`/procedures/${slug}`} className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm text-blue-700 hover:bg-blue-100">
                    {related.title}
                  </Link>
                )
              })}
              {page.crossLinks?.map((link) => (
                <Link key={link.href} href={link.href} className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-700 hover:bg-emerald-100">
                  {link.label}
                </Link>
              ))}
            </div>
          </section>
        )}

        <CTASection heading="Need an Orthopedic Consultation?" />
      </main>

      {procedureReviews.length ? (
        <TestimonialStrip
          reviews={procedureReviews}
          heading={`${page.title} — patient experiences`}
          subheading="Selected patient experiences published on this website. Individual outcomes vary."
        />
      ) : null}
    </>
  )
}
