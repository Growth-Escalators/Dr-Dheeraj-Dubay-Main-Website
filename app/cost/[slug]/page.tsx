import { COST_PAGES as RAW_COST_PAGES } from '@/lib/cost-pages'
import { applyCostSeoOverrides } from '@/lib/cost-seo-overrides'
import { PROCEDURE_PAGES } from '@/lib/procedure-pages'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { BreadcrumbNav, CTASection, FAQAccordion, TrustBadges, CostEstimateCTA } from '@/components/pages'
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd'
import { FaqJsonLd } from '@/components/seo/FaqJsonLd'
import { defaultSEO, generatePageMetadata } from '@/lib/seo.config'
import type { Metadata } from 'next'

const COST_PAGES = applyCostSeoOverrides(RAW_COST_PAGES)
const SHALBY_INSURANCE_SOURCE =
  'https://www.shalby.org/hospitals/jaipur-shalby/insurance-corporate-tpa-tie-ups/'

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

export default function CostPage({ params }: { params: { slug: string } }) {
  const page = COST_PAGES.find((p) => p.slug === params.slug)
  if (!page) return notFound()

  const canonical = `${defaultSEO.siteUrl}/cost/${page.slug}`
  const relatedProcedure = PROCEDURE_PAGES.find((p) => p.slug === page.relatedProcedureSlug)
  const relatedCostPage = page.relatedCostSlug
    ? COST_PAGES.find((p) => p.slug === page.relatedCostSlug)
    : undefined

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

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <BreadcrumbNav crumbs={[{ label: 'Home', href: '/' }, { label: page.h1 }]} />

        <header className="mb-2">
          <span className="mb-4 inline-block rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            {page.category}
          </span>
          <h1 className="mb-4 text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
            {page.h1}
          </h1>
          <p className="text-base leading-relaxed text-gray-600">{page.intro}</p>
        </header>

        <CostEstimateCTA page={page} />

        <div className="my-8 rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center md:p-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
            Patient-specific estimate
          </p>
          <p className="mb-1 text-2xl font-bold text-gray-900 md:text-3xl">{page.costHeadline}</p>
          <p className="text-sm text-gray-600">{page.costSubtext}</p>
        </div>

        <TrustBadges />

        <section className="my-10">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">{page.whatAffectsCostHeading}</h2>
          <div className="space-y-4">
            {page.whatAffectsCost.map((factor) => (
              <div key={factor.title} className="flex gap-3">
                <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-500" />
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">{factor.title}</h3>
                  <p className="mt-0.5 text-sm leading-relaxed text-gray-600">{factor.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="my-10 rounded-2xl border border-emerald-100 bg-emerald-50 p-6 md:p-8">
          <h2 className="mb-3 text-2xl font-bold text-gray-900">Insurance &amp; Cashless Coverage</h2>
          <p className="text-sm leading-relaxed text-gray-700">
            Shalby Hospital Jaipur currently publishes a hospital-specific list of insurer, TPA,
            government-scheme and institutional tie-ups. The published government list includes
            Rajasthan Government Health Scheme (RGHS). Cashless approval is not automatic: current
            empanelment, policy terms, exclusions, medical indication and pre-authorisation must be
            verified for the planned admission.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/insurance-cashless-jaipur"
              className="rounded-lg bg-emerald-700 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
            >
              View Shalby Jaipur insurance &amp; scheme list
            </Link>
            <a
              href={SHALBY_INSURANCE_SOURCE}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-emerald-300 bg-white px-5 py-3 text-sm font-semibold text-emerald-800 hover:bg-emerald-100"
            >
              Shalby official source ↗
            </a>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-gray-600">
            Source checked 29 August 2026. Some names on Shalby&apos;s published page use legacy
            insurer/scheme branding, so patients should verify the current network before admission.
          </p>
        </section>

        <section className="my-10">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">Dr. Dheeraj Dubay — relevant experience</h2>
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
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <FAQAccordion faqs={page.faqs} />
        </section>

        <section className="my-10 flex flex-wrap gap-3">
          {relatedCostPage && (
            <Link
              href={`/cost/${relatedCostPage.slug}`}
              className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-700 hover:bg-emerald-100"
            >
              {page.relatedCostLabel} →
            </Link>
          )}
          {relatedProcedure && (
            <Link
              href={`/procedures/${relatedProcedure.slug}`}
              className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm text-blue-700 hover:bg-blue-100"
            >
              About {relatedProcedure.title} →
            </Link>
          )}
          <Link
            href="/insurance-cashless-jaipur"
            className="rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm text-amber-800 hover:bg-amber-100"
          >
            Insurance &amp; Cashless Guide →
          </Link>
        </section>

        <CTASection
          heading="Need a current hospital estimate?"
          subheading="Share the available reports and insurance or scheme details. The team can guide you to the appropriate patient-specific estimate and verification process."
        />
      </main>
    </>
  )
}
