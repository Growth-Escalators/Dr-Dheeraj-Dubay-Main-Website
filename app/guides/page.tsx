import type { Metadata } from 'next'
import Link from 'next/link'
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd'
import { defaultSEO, generatePageMetadata } from '@/lib/seo.config'
import { PATIENT_GUIDES } from '@/lib/patient-guides'

export const metadata: Metadata = generatePageMetadata({
  title: 'Knee & Hip Replacement Patient Guides | Dr. Dheeraj Dubay',
  description:
    'Evidence-informed patient guides on knee replacement, robotic surgery, partial versus total replacement, complications, AVN and hip replacement decisions.',
  slug: 'guides',
})

export default function PatientGuidesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: defaultSEO.siteUrl },
          { name: 'Patient Guides', url: `${defaultSEO.siteUrl}/guides` },
        ]}
      />
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <header className="max-w-3xl">
          <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            Evidence-informed patient education
          </span>
          <h1 className="mt-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Knee & Hip Replacement Patient Guides
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-gray-700">
            Practical decision-stage guides for patients researching knee and hip replacement. These pages explain trade-offs, risks and questions to discuss with an orthopedic surgeon without promising a particular outcome.
          </p>
        </header>

        <div className="mt-9 grid gap-5 md:grid-cols-2">
          {PATIENT_GUIDES.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-emerald-300 hover:shadow-md"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                {guide.category}
              </span>
              <h2 className="mt-2 text-xl font-bold text-gray-900 group-hover:text-emerald-800">
                {guide.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-gray-600">{guide.summary}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-emerald-700">Read guide →</span>
            </Link>
          ))}
        </div>

        <section className="mt-12 rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">Looking for procedure-specific information?</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/procedures/knee-replacement-surgery" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-blue-800">Knee Replacement</Link>
            <Link href="/procedures/robotic-knee-replacement" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-blue-800">Robotic Knee Replacement</Link>
            <Link href="/joint-replacement-surgeon-jaipur" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-blue-800">Joint Replacement</Link>
            <Link href="/hip-replacement-jaipur" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-blue-800">Hip Replacement</Link>
            <Link href="/insurance-cashless-jaipur" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-blue-800">Insurance & Cashless</Link>
          </div>
        </section>
      </main>
    </>
  )
}
