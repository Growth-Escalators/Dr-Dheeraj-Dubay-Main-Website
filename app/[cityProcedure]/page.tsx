import { CITY_PAGES } from '@/lib/city-pages'
import { isRichCity, RICH_CITIES } from '@/lib/cities'
import { RichCityContent } from '@/components/cities/RichCityContent'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { BreadcrumbNav } from '@/components/pages'
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd'
import { AggregateRatingJsonLd, ReviewListJsonLd } from '@/components/seo/JsonLd'
import { TestimonialStrip } from '@/components/ui/TestimonialStrip'
import { defaultSEO } from '@/lib/seo.config'
import { getPublishedReviews } from '@/lib/reviews'
import { AGGREGATE_RATING, SURGERY_COUNT_DISPLAY } from '@/lib/clinic-info'

function toSlug(s: string) {
  return s.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
}

export async function generateStaticParams() {
  return CITY_PAGES.map(p => ({
    cityProcedure: p.slug
  }))
}

export async function generateMetadata(
  { params }: { params: { cityProcedure: string } }
) {
  const page = CITY_PAGES.find(p => p.slug === params.cityProcedure)
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
  { params }: { params: { cityProcedure: string } }
) {
  const page = CITY_PAGES.find(p => p.slug === params.cityProcedure)
  if (!page) return notFound()

  const breadcrumbs = [
    { name: 'Home', url: defaultSEO.siteUrl },
    { name: `${page.procedure} in ${page.city}`, url: `${defaultSEO.siteUrl}/${page.slug}` },
  ]

  // Reviews scoped to this city + procedure. Fall back to city-only if
  // no procedure-specific reviews exist yet, then to procedure-only,
  // then global — so the page always shows something credible.
  const citySlug = toSlug(page.city)
  const procedureSlug = toSlug(page.procedure)
  let cityReviews = await getPublishedReviews({ citySlug, procedureSlug, limit: 3 })
  if (cityReviews.length < 3) {
    const extra = await getPublishedReviews({ citySlug, limit: 3 - cityReviews.length })
    const ids = new Set(cityReviews.map(r => r.id))
    cityReviews = [...cityReviews, ...extra.filter(r => !ids.has(r.id))].slice(0, 3)
  }
  if (cityReviews.length < 3) {
    const extra = await getPublishedReviews({ procedureSlug, limit: 3 - cityReviews.length })
    const ids = new Set(cityReviews.map(r => r.id))
    cityReviews = [...cityReviews, ...extra.filter(r => !ids.has(r.id))].slice(0, 3)
  }
  const aggregate = AGGREGATE_RATING

  // MedicalBusiness + Service schema — Jaipur surgeon serving this city.
  // The local-pack signal: tie the doctor + procedure + service-area together.
  const localServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: `Dr. Dheeraj Dubay — ${page.procedure} for ${page.city} Patients`,
    description: page.description,
    url: `${defaultSEO.siteUrl}/${page.slug}`,
    telephone: '+91-8955373205',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '200 Feet Bypass Road, Vaishali Nagar',
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
    // References the site's existing Physician node by @id (defined once
    // in components/seo/JsonLd.tsx's PhysicianJsonLd) instead of a fresh
    // inline Person, per the GE SEO standard's "connected @id graph" rule.
    physician: { '@id': `${defaultSEO.siteUrl}/#physician` },
  }

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localServiceSchema) }}
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
      {cityReviews.length ? (
        <ReviewListJsonLd
          reviews={cityReviews}
          itemReviewedId={`${defaultSEO.siteUrl}/#physician`}
        />
      ) : null}
      <main style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '40px 24px',
    }}>
      <BreadcrumbNav
        crumbs={[
          { label: 'Home', href: '/' },
          { label: `${page.procedure} in ${page.city}` },
        ]}
      />
      <div style={{
        display: 'inline-block',
        backgroundColor: '#eff6ff',
        color: '#1d4ed8',
        fontSize: '13px',
        fontWeight: '500',
        padding: '4px 12px',
        borderRadius: '99px',
        marginBottom: '16px',
      }}>
        {page.procedure} · {page.city}
      </div>

      <h1 style={{
        fontSize: '32px',
        fontWeight: '700',
        color: '#0f172a',
        lineHeight: 1.3,
        marginBottom: '20px',
      }}>
        {page.h1}
      </h1>

      <p style={{
        fontSize: '16px',
        color: '#475569',
        lineHeight: 1.8,
        marginBottom: '32px',
      }}>
        {page.intro}
      </p>

      <div style={{
        backgroundColor: '#f0fdf4',
        border: '1px solid #bbf7d0',
        borderRadius: '12px',
        padding: '20px 24px',
        marginBottom: '32px',
      }}>
        <p style={{
          fontSize: '14px',
          fontWeight: '600',
          color: '#15803d',
          marginBottom: '6px',
        }}>
          📍 {page.distance}
        </p>
        <p style={{ fontSize: '14px', color: '#166534' }}>
          {page.campNote}
        </p>
      </div>

      <div style={{
        backgroundColor: '#eff6ff',
        border: '1px solid #bfdbfe',
        borderRadius: '12px',
        padding: '20px 24px',
        marginBottom: '32px',
      }}>
        <p style={{ fontSize: '14px', color: '#1e40af' }}>
          ✅ {page.patientNote}
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
        marginBottom: '40px',
      }}>
        {[
          { icon: '🏆', label: 'Forbes World Record', sub: 'Most surgeries in a day' },
          { icon: '⚕️', label: `${SURGERY_COUNT_DISPLAY} Surgeries`, sub: 'Successful joint replacements' },
          { icon: '⚡', label: 'Zero Technique', sub: 'Walking within 24 hours' },
          { icon: '🎖️', label: 'Health Minister Award', sub: '3 consecutive years' },
        ].map(item => (
          <div key={item.label} style={{
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            padding: '16px',
          }}>
            <span style={{ fontSize: '24px' }}>{item.icon}</span>
            <p style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#1e293b',
              marginTop: '8px',
            }}>
              {item.label}
            </p>
            <p style={{ fontSize: '12px', color: '#64748b' }}>{item.sub}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Link href="/booking/jaipur" style={{
          backgroundColor: '#2563eb',
          color: 'white',
          padding: '14px 28px',
          borderRadius: '10px',
          textDecoration: 'none',
          fontSize: '15px',
          fontWeight: '600',
        }}>
          Book Appointment
        </Link>
        <a href="tel:+918955373205" style={{
          backgroundColor: '#25D366',
          color: 'white',
          padding: '14px 28px',
          borderRadius: '10px',
          textDecoration: 'none',
          fontSize: '15px',
          fontWeight: '600',
        }}>
          Call Now
        </a>
      </div>
    </main>
    {/* Tier-1 unique sections (travel, why-travel, lodging, FAQs) — only
        renders for cities migrated to the rich data architecture. */}
    {isRichCity(page.slug) && (
      <RichCityContent
        city={RICH_CITIES.find((c) => c.slug === page.slug)!}
      />
    )}
    {cityReviews.length ? (
      <TestimonialStrip
        reviews={cityReviews}
        heading={`What ${page.city} patients say`}
        subheading={`${aggregate.ratingValue}/5 average across ${aggregate.reviewCount}+ Google reviews`}
      />
    ) : null}
    </>
  )
}
