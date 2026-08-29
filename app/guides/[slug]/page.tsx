import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd'
import { defaultSEO, generatePageMetadata } from '@/lib/seo.config'
import { PATIENT_GUIDES, PATIENT_GUIDE_MAP } from '@/lib/patient-guides'

export function generateStaticParams() {
  return PATIENT_GUIDES.map((guide) => ({ slug: guide.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const guide = PATIENT_GUIDE_MAP.get(params.slug)
  if (!guide) return {}

  return generatePageMetadata({
    title: guide.metaTitle,
    description: guide.metaDescription,
    slug: `guides/${guide.slug}`,
  })
}

export default function PatientGuidePage({ params }: { params: { slug: string } }) {
  const guide = PATIENT_GUIDE_MAP.get(params.slug)
  if (!guide) notFound()

  const canonical = `${defaultSEO.siteUrl}/guides/${guide.slug}`

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: guide.title,
    description: guide.metaDescription,
    url: canonical,
    inLanguage: 'en-IN',
    about: guide.category,
    dateModified: '2026-08-30',
    publisher: {
      '@type': 'Organization',
      name: 'Dr. Dheeraj Dubay — Patient Education Website',
      url: defaultSEO.siteUrl,
    },
  }

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: defaultSEO.siteUrl },
          { name: 'Patient Guides', url: `${defaultSEO.siteUrl}/guides` },
          { name: guide.title, url: canonical },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-emerald-700">Home</Link>
          <span>›</span>
          <Link href="/guides" className="hover:text-emerald-700">Patient Guides</Link>
          <span>›</span>
          <span className="text-gray-800">{guide.category}</span>
        </nav>

        <header className="border-b border-gray-200 pb-8">
          <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            {guide.category} • Patient education
          </span>
          <h1 className="mt-4 text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
            {guide.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-gray-700">{guide.summary}</p>
          <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm leading-relaxed text-blue-950">
            This guide is for education and shared decision-making. It does not determine whether an operation is appropriate for an individual patient. Diagnosis, imaging, medical fitness and a clinical examination are required for personalised advice.
          </div>
          <p className="mt-4 text-xs text-gray-500">
            Updated for medical-claim safety and source consistency on 30 August 2026.{' '}
            <Link href="/editorial-policy" className="font-semibold text-emerald-700 hover:underline">
              Medical editorial policy
            </Link>
          </p>
        </header>

        <article className="py-4">
          {guide.sections.map((section) => (
            <section key={section.heading} className="my-9">
              <h2 className="text-2xl font-bold text-gray-900">{section.heading}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="mt-4 leading-7 text-gray-700">{paragraph}</p>
              ))}
              {section.bullets?.length ? (
                <ul className="mt-4 space-y-3">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 leading-7 text-gray-700">
                      <span className="mt-1 text-emerald-600">✓</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          <section className="my-10 rounded-2xl border border-gray-200 bg-gray-50 p-6">
            <h2 className="text-2xl font-bold text-gray-900">Frequently asked questions</h2>
            <div className="mt-5 space-y-5">
              {guide.faqs.map((faq) => (
                <div key={faq.q}>
                  <h3 className="font-semibold text-gray-900">{faq.q}</h3>
                  <p className="mt-2 leading-7 text-gray-700">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="my-10">
            <h2 className="text-xl font-bold text-gray-900">Independent patient-information sources</h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              These sources are provided so patients can read the underlying independent guidance. External guidance is general and does not replace advice from the treating team.
            </p>
            <ul className="mt-4 space-y-3">
              {guide.sources.map((source) => (
                <li key={source.url}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-blue-700 hover:underline"
                  >
                    {source.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section className="my-10 border-t border-gray-200 pt-8">
            <h2 className="text-xl font-bold text-gray-900">Continue your research</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {guide.related.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4 font-semibold text-emerald-900 hover:border-emerald-300 hover:bg-emerald-50"
                >
                  {item.label} →
                </Link>
              ))}
            </div>
          </section>
        </article>

        <aside className="rounded-2xl bg-emerald-800 p-7 text-white">
          <h2 className="text-2xl font-bold">Need advice for your own X-rays and symptoms?</h2>
          <p className="mt-3 leading-relaxed text-emerald-50">
            Book an orthopedic assessment with Dr. Dheeraj Dubay at Shalby Hospital Jaipur. The appropriate treatment depends on the individual diagnosis rather than an online checklist alone.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/booking/jaipur" className="rounded-lg bg-white px-5 py-3 text-sm font-bold text-emerald-800">
              Book Appointment
            </Link>
            <a href="tel:+918955373205" className="rounded-lg border border-emerald-300 px-5 py-3 text-sm font-bold text-white">
              Call +91 89553 73205
            </a>
          </div>
        </aside>
      </main>
    </>
  )
}
