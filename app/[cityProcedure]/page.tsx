import { CITY_PAGES } from '@/lib/city-pages'
import { isRichCity, RICH_CITIES } from '@/lib/cities'
import { RichCityContent } from '@/components/cities/RichCityContent'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { BreadcrumbNav } from '@/components/pages'
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd'
import { TestimonialStrip } from '@/components/ui/TestimonialStrip'
import { defaultSEO } from '@/lib/seo.config'
import { getPublishedReviews } from '@/lib/reviews'
import {
  EXPERIENCE_YEARS_DISPLAY,
  SURGERY_COUNT_DISPLAY,
} from '@/lib/clinic-info'
import {
  HIP_OWNER_URL,
  KNEE_OWNER_URL,
  ROBOTIC_KNEE_OWNER_URL,
} from '@/lib/seo-priority-pages'

function toSlug(s: string) {
  return s.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
}

export async function generateStaticParams() {
  return CITY_PAGES.map((p) => ({ cityProcedure: p.slug }))
}

export async function generateMetadata(
  { params }: { params: { cityProcedure: string } },
) {
  const page = CITY_PAGES.find((p) => p.slug === params.cityProcedure)
  if (!page) return {}
  const url = `${defaultSEO.siteUrl}/${page.slug}`
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: url },
    openGraph: {
      title: page.title,
      description: page.description,
      url,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
    },
  }
}

export default async function CityPage(
  { params }: { params: { cityProcedure: string } },
) {
  const page = CITY_PAGES.find((p) => p.slug === params.cityProcedure)
  if (!page) return notFound()

  const breadcrumbs = [
    { name: 'Home', url: defaultSEO.siteUrl },
    { name: `${page.procedure} in ${page.city}`, url: `${defaultSEO.siteUrl}/${page.slug}` },
  ]

  const citySlug = toSlug(page.city)
  const procedureSlug = toSlug(page.procedure)
  let cityReviews = await getPublishedReviews({ citySlug, procedureSlug, limit: 3 })
  if (cityReviews.length < 3) {
    const extra = await getPublishedReviews({ citySlug, limit: 3 - cityReviews.length })
    const ids = new Set(cityReviews.map((r) => r.id))
    cityReviews = [...cityReviews, ...extra.filter((r) => !ids.has(r.id))].slice(0, 3)
  }
  if (cityReviews.length < 3) {
    const extra = await getPublishedReviews({ procedureSlug, limit: 3 - cityReviews.length })
    const ids = new Set(cityReviews.map((r) => r.id))
    cityReviews = [...cityReviews, ...extra.filter((r) => !ids.has(r.id))].slice(0, 3)
  }

  const localServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: `Dr. Dheeraj Dubay — ${page.procedure} for ${page.city} Patients`,
    description: page.description,
    url: `${defaultSEO.siteUrl}/${page.slug}`,
    telephone: '+91-8955373205',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Ajmer Expressway 200 Feet Bypass Road, near Gandhi Path, Chitrakoot Sector 3, Vaishali Nagar',
      addressLocality: 'Jaipur',
      addressRegion: 'Rajasthan',
      postalCode: '302021',
      addressCountry: 'IN',
    },
    areaServed: [
      { '@type': 'City', name: page.city },
      { '@type': 'City', name: 'Jaipur' },
    ],
    medicalSpecialty: 'Orthopedic Surgery',
    physician: { '@id': `${defaultSEO.siteUrl}/#physician` },
  }

  const trustItems = [
    { icon: '🩺', label: `${EXPERIENCE_YEARS_DISPLAY} Years`, sub: 'Orthopedic experience' },
    { icon: '⚕️', label: `${SURGERY_COUNT_DISPLAY} Surgeries`, sub: 'Total surgeries performed' },
    { icon: '🏥', label: 'Director', sub: 'Robotic Joint Replacement Surgery' },
    { icon: '📍', label: 'Shalby Hospital', sub: 'Jaipur' },
  ]

  const isJaipurJointPage = page.slug === 'joint-replacement-surgeon-jaipur'

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localServiceSchema) }}
      />

      <main className="mx-auto max-w-4xl px-6 py-10">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: `${page.procedure} in ${page.city}` },
          ]}
        />

        <div className="mb-4 inline-block rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
          {page.procedure} · {page.city}
        </div>

        <h1 className="mb-5 text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
          {page.h1}
        </h1>
        <p className="mb-8 text-base leading-8 text-slate-600">{page.intro}</p>

        <div className="mb-8 rounded-xl border border-green-200 bg-green-50 p-5">
          <p className="font-semibold text-green-700">📍 {page.distance}</p>
          <p className="mt-1 text-sm leading-6 text-green-800">{page.campNote}</p>
        </div>

        <div className="mb-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <p className="text-sm leading-6 text-blue-900">{page.patientNote}</p>
        </div>

        <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {trustItems.map((item) => (
            <div key={item.label + item.sub} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <span className="text-2xl" aria-hidden="true">{item.icon}</span>
              <p className="mt-2 text-sm font-bold text-slate-800">{item.label}</p>
              <p className="text-xs text-slate-500">{item.sub}</p>
            </div>
          ))}
        </div>

        {isJaipurJointPage ? (
          <section className="mb-10 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6">
            <h2 className="text-xl font-bold text-slate-900">Choose the relevant Jaipur treatment pathway</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Joint replacement is an umbrella term. These pages provide the more specific knee, robotic-knee and hip information without creating competing Jaipur landing pages.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <Link href={KNEE_OWNER_URL} className="rounded-lg bg-white p-4 text-sm font-semibold text-emerald-800 shadow-sm hover:underline">
                Knee Replacement Surgeon in Jaipur
              </Link>
              <Link href={ROBOTIC_KNEE_OWNER_URL} className="rounded-lg bg-white p-4 text-sm font-semibold text-emerald-800 shadow-sm hover:underline">
                Robotic Knee Replacement in Jaipur
              </Link>
              <Link href={HIP_OWNER_URL} className="rounded-lg bg-white p-4 text-sm font-semibold text-emerald-800 shadow-sm hover:underline">
                Hip Replacement Surgeon in Jaipur
              </Link>
            </div>
          </section>
        ) : null}

        <div className="flex flex-wrap gap-3">
          <Link href="/booking/jaipur" className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700">
            Book Appointment
          </Link>
          <a href="tel:+918955373205" className="rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700">
            Call Now
          </a>
        </div>
      </main>

      {isRichCity(page.slug) && (
        <RichCityContent city={RICH_CITIES.find((c) => c.slug === page.slug)!} />
      )}

      {cityReviews.length ? (
        <TestimonialStrip
          reviews={cityReviews}
          heading={`What ${page.city} patients say`}
          subheading="Selected patient experiences published on this website. Individual outcomes vary."
        />
      ) : null}
    </>
  )
}
