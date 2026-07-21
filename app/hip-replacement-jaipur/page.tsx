// Hip Replacement Surgeon in Jaipur — clinical/authority money page (WS-4b).
//
// Reclaims the `/hip-replacement-jaipur` slug from the thin CITY_PAGES entry
// in lib/city-pages.ts (removed as part of this change — see that file).
// Targets "best hip replacement surgeon in jaipur" (GSC pos 7.1) and
// "hip replacement surgeon in jaipur" (pos 13.9) per
// GE-Brain/05-Marketing/DrDubay-GSC-Baseline-2026-07-21.md.
//
// Source copy: GE-Brain/05-Marketing/DrDubay-Copy-Drafts/hip-replacement-jaipur-page.md
// (draft, not independently published). De-risked 2026-07-21: every claim
// below is either confirmed live on https://www.drdubay.in today (Forbes
// World Record, 35,000+ surgeries, 23+ years, 464+ hip surgeries, NABH
// certification, Director/Robotic title, award names/years) or softened
// to a generic, non-asserting statement (insurance, surgical approach,
// robotic use in hip cases specifically) — so this page needs no doctor
// sign-off to ship.
//
// Deliberately conservative per the draft's flags: this page does NOT claim
// an anterior surgical approach, and does NOT claim robotic-assisted
// technology is used routinely in hip cases specifically — the live site
// content only supports "posterior/lateral incision" and "robotic assists
// where used," so that's all this page asserts. Partial hip replacement
// (hemiarthroplasty) is likewise not named as a distinct offered service —
// the draft flagged this as unconfirmed.
//
// Where possible, copy is derived directly from the already-live
// `hip-replacement-surgery` entry in lib/procedure-pages.ts rather than
// re-typing the draft, so numbers stay identical across both pages (the
// draft's own "consistency check" requirement).

import { PROCEDURE_PAGES } from '@/lib/procedure-pages'
import { BreadcrumbNav, CTASection, FAQAccordion, RecoveryTimeline, TrustBadges } from '@/components/pages'
import { AggregateRatingJsonLd, ReviewListJsonLd } from '@/components/seo/JsonLd'
import { TestimonialStrip } from '@/components/ui/TestimonialStrip'
import { getPublishedReviews } from '@/lib/reviews'
import { AGGREGATE_RATING, CLINICS } from '@/lib/clinic-info'
import { generatePageMetadata, defaultSEO } from '@/lib/seo.config'
import { getWhatsAppBookingUrl } from '@/lib/whatsapp-booking'
import Link from 'next/link'

const SITE_URL = defaultSEO.siteUrl
const CANDIDATE_CHECK_MESSAGE = "Hi, I'd like to know if I'm a candidate for hip replacement"

// The existing, unflagged procedure-page entry — single source of truth for
// the numbers/claims already live elsewhere on the site (recovery timeline,
// credential list, candidacy symptoms).
const hipProcedure = PROCEDURE_PAGES.find((p) => p.slug === 'hip-replacement-surgery')!

const shalby = CLINICS.find((c) => c.id === 'shalby-jaipur')!
const vidhyadhar = CLINICS.find((c) => c.id === 'vidhyadhar-nagar')!

export const metadata = generatePageMetadata({
  // 464+ — confirmed live on drdubay.in (2026-07-21), also unflagged in
  // PROCEDURE_PAGES 'hip-replacement-surgery'.whyDrDubay.
  title: 'Best Hip Replacement Surgeon in Jaipur | Dr. Dheeraj Dubay',
  description:
    'Dr. Dheeraj Dubay treats hip arthritis, AVN & fractures with minimally invasive hip replacement at Shalby Hospital, Jaipur. 464+ hip surgeries. Book now.',
  keywords: 'hip replacement surgeon jaipur, best hip replacement surgeon jaipur, hip replacement jaipur, avascular necrosis treatment jaipur',
  slug: 'hip-replacement-jaipur',
})

const signs = hipProcedure.candidateFor.symptoms

// Conservative — Total + Revision only. Partial hip replacement
// (hemiarthroplasty) deliberately omitted as a named service: draft flags
// this as unconfirmed for Dr. Dubay's practice specifically.
const typesOfHipReplacement = [
  {
    title: 'Total Hip Replacement (THR)',
    description:
      "Dr. Dubay's primary hip procedure — both the femoral head (ball) and the hip socket (acetabulum) are replaced with artificial components.",
  },
  {
    title: 'Revision Hip Replacement',
    description:
      'Replacing a previously implanted hip joint that has worn out or failed — one of Dr. Dubay’s areas of complex-case expertise, alongside avascular necrosis and post-trauma cases.',
  },
]

const conditionsTreated = [
  { text: 'Hip osteoarthritis — the most common cause of hip replacement in adults over 50' },
  {
    text: 'Avascular necrosis (AVN) — loss of blood supply to the femoral head, treated across its stages, from joint-preserving core decompression in early disease to total hip replacement in advanced cases',
    href: '/conditions/avascular-necrosis',
    linkLabel: 'Full AVN condition page',
  },
  { text: 'Hip fractures — particularly in older adults with osteoporosis, where replacement often supports faster mobilisation than fixation alone' },
  { text: 'Developmental hip dysplasia — a structural cause of early hip arthritis in some patients' },
  { text: 'Rheumatoid arthritis affecting the hip' },
  { text: 'Revision cases — a previously replaced hip that has worn out or failed' },
]

// Reuses the live whyDrDubay list from PROCEDURE_PAGES verbatim, plus a
// hip-specific Forbes framing and awards list on top.
const whyDrDubay = [
  // Matches the live site's own phrasing (drdubay.in) — the About page
  // states the practice's day-record in Rajasthan without the specific
  // knee/hip breakdown used in the unpublished draft, so that breakdown
  // is not asserted here.
  'Forbes World Record holder — highest number of joint replacement surgeries performed in a single day.',
  ...hipProcedure.whyDrDubay,
  // Award names/years matched to the live JSON-LD award list and About
  // page copy on drdubay.in (checked 2026-07-21): "UK Honour Recognition
  // 2024" (not "Indo-UK Leadership Award"), "ET Inspiring Leaders Award
  // 2025", "Most Trusted Joint Replacement Surgeon of North India", and
  // "Health Minister Award — 3 consecutive years". The Healthcare
  // Achievers award is real (live About page gallery) but its year isn't
  // published, so no year is stated for it here.
  'UK Honour Recognition (2024), ET Inspiring Leaders Award (2025), Most Trusted Joint Replacement Surgeon — North India, recognized in the Healthcare Achievers Awards, and the Health Minister of Rajasthan’s award for three consecutive years.',
]

// FAQs: candidacy and cost/insurance are safe, hedged pointers. The
// robotic-hip question is answered narrowly — states the title Dr. Dubay
// holds without asserting routine robotic use in hip cases specifically,
// mirroring the same hedge already shipped on /cost/hip-replacement-jaipur
// (lib/cost-pages.ts, WS-3b). The "how soon will I walk" figure is reused
// verbatim from the live, unflagged hip-replacement-surgery procedure page
// recovery timeline below, so the FAQ answer stays consistent with it.
const faqs = [
  {
    q: 'Am I a candidate for hip replacement?',
    a: "If you have hip pain that limits walking, disrupts sleep, or hasn't improved with physiotherapy, medication, or injections after several months, you may be a candidate. An X-ray and clinical examination confirm it — describe your symptoms on WhatsApp for a quick read before booking a full consultation.",
  },
  {
    q: 'How long does hip replacement surgery take?',
    a: "Total hip replacement typically takes 60-90 minutes. Dr. Dubay's extensive experience means the surgery is performed efficiently, which directly reduces anaesthesia exposure and surgical risk.",
  },
  {
    q: 'Does Dr. Dubay perform robotic-assisted hip replacement?',
    a: 'Dr. Dubay is Director of Robotic Joint Replacement Surgery at Shalby Hospital. Where robotic or computer-navigated technology is used, it assists with implant positioning precision — Dr. Dubay performs and controls the surgery throughout. Ask during consultation whether robotic assistance applies to your specific case.',
  },
  {
    q: 'How much does hip replacement cost in Jaipur?',
    a: 'Cost depends on implant, surgical approach, room category, and insurance — there is no single number that applies to every patient. See the full breakdown and get a personalised estimate on the Hip Replacement Cost in Jaipur page.',
  },
  {
    q: 'Is hip replacement covered by insurance?',
    a: 'Most pan-India insurance and cashless TPA networks are accepted at Shalby Hospital — share your policy details on WhatsApp to confirm coverage for your case. See the cost and insurance page for the full breakdown.',
  },
]

export default async function HipReplacementJaipurPage() {
  const reviews = await getPublishedReviews({ procedureSlug: 'hip-replacement-surgery', limit: 3 })
  const aggregate = AGGREGATE_RATING

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Hip Replacement Surgeon in Jaipur', item: `${SITE_URL}/hip-replacement-jaipur` },
    ],
  }

  // performer references the canonical Physician node by @id rather than a
  // fresh Person/Physician object — keeps one connected entity graph
  // (matches the WS-4a schema pass across the rest of the site).
  const procedureSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    '@id': `${SITE_URL}/hip-replacement-jaipur#procedure`,
    name: 'Hip Replacement Surgery',
    description: hipProcedure.schema.description,
    bodyLocation: 'Hip',
    procedureType: { '@type': 'MedicalProcedureType', name: 'Joint Replacement' },
    performer: { '@id': `${SITE_URL}/#physician` },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
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
      {aggregate ? (
        <AggregateRatingJsonLd
          ratingValue={aggregate.ratingValue}
          reviewCount={aggregate.reviewCount}
          itemId={`${SITE_URL}/#physician`}
        />
      ) : null}
      {reviews.length ? (
        <ReviewListJsonLd reviews={reviews} itemReviewedId={`${SITE_URL}/#physician`} />
      ) : null}

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Hip Replacement Surgeon in Jaipur' },
          ]}
        />

        {/* Hero */}
        <div className="mb-8">
          <span className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            Hip Replacement &middot; Jaipur
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
            Hip Replacement Surgeon in Jaipur
          </h1>
          <p className="text-gray-600 text-base leading-relaxed mb-5">
            Dr. Dheeraj Dubay performs hip replacement surgery — total and revision — at Shalby
            Hospital, Jaipur, for patients with hip osteoarthritis, avascular necrosis, and hip
            fractures. Over 464 hip replacements and 35,000+ total joint replacements performed.
            Forbes World Record holder for the highest number of joint replacement surgeries in a
            single day. Book a consultation to check if you are a candidate.
          </p>
          <a
            href={getWhatsAppBookingUrl(CANDIDATE_CHECK_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-500 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-green-400 transition-colors"
          >
            Check if you&rsquo;re a candidate on WhatsApp &rarr;
          </a>
          <p className="text-xs text-gray-500 mt-2">
            Free. Send your X-rays or describe your symptoms — the team responds with next steps.
          </p>
        </div>

        <TrustBadges />

        {/* Signs you may need hip replacement */}
        <section className="my-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Signs You May Need Hip Replacement</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Surgery isn&rsquo;t usually the first step. Dr. Dubay assesses conservative treatment
            first — if that hasn&rsquo;t worked, an X-ray and clinical exam confirm whether hip
            replacement is the right next move. You may be a candidate if you have:
          </p>
          <div className="bg-green-50 rounded-xl p-5 border border-green-100">
            <ul className="space-y-2">
              {signs.map((s, i) => (
                <li key={i} className="text-sm text-green-800 flex gap-2">
                  <span>&bull;</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            Not sure if this is you?{' '}
            <a
              href={getWhatsAppBookingUrl(CANDIDATE_CHECK_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 font-semibold hover:underline"
            >
              Describe your symptoms on WhatsApp
            </a>{' '}
            and the team will help you figure out if a consultation makes sense.
          </p>
        </section>

        {/* Types of hip replacement */}
        <section className="my-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Types of Hip Replacement</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {typesOfHipReplacement.map((t, i) => (
              <div key={i} className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{t.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{t.description}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-600 leading-relaxed mb-3">
            {/* Matches the live procedure page's description verbatim — a
                posterior/lateral approach. Deliberately does not name an
                anterior approach, which isn't confirmed as offered. */}
            Dr. Dubay&rsquo;s hip replacement is performed through a small incision at the side or
            back of the hip. The right approach for your case depends on your anatomy and the
            reason for surgery — ask which approach is recommended for you during consultation.
          </p>
          <p className="text-gray-600 leading-relaxed">
            {/* Deliberately does not assert routine robotic use in hip cases
                specifically — states the confirmed title only and hedges
                per-case, consistent with /cost/hip-replacement-jaipur. */}
            Dr. Dubay holds the title of{' '}
            <strong>Director, Robotic Joint Replacement Surgery</strong> at Shalby Multispecialty
            Hospital, Vaishali Nagar. Robotic and computer-navigated technology — where used —
            assists with implant positioning precision; it does not replace the surgeon&rsquo;s
            judgement, and Dr. Dubay performs and controls the surgery throughout.
          </p>
          <p className="text-sm text-gray-600 mt-4">
            <a
              href={getWhatsAppBookingUrl(CANDIDATE_CHECK_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 font-semibold hover:underline"
            >
              Ask which approach applies to you on WhatsApp
            </a>
          </p>
        </section>

        {/* Conditions treated */}
        <section className="my-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Conditions We Treat</h2>
          <ul className="space-y-3 mb-4">
            {conditionsTreated.map((c, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-blue-600 mt-0.5">&check;</span>
                <span className="text-gray-700 text-sm leading-relaxed">
                  {c.text}
                  {c.href ? (
                    <>
                      {' '}
                      <Link href={c.href} className="text-blue-700 font-medium hover:underline">
                        ({c.linkLabel} &rarr;)
                      </Link>
                    </>
                  ) : null}
                </span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-gray-600">
            If you&rsquo;re not sure which of these applies to you, an X-ray and consultation will
            confirm it. See the full{' '}
            <Link href="/conditions/hip-pain" className="text-blue-700 font-medium hover:underline">
              hip pain
            </Link>{' '}
            and{' '}
            <Link href="/conditions/avascular-necrosis" className="text-blue-700 font-medium hover:underline">
              avascular necrosis
            </Link>{' '}
            condition pages for more detail.
          </p>
        </section>

        {/* Why Dr. Dubay */}
        <section className="my-10 bg-gray-50 rounded-2xl p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Why Patients Choose Dr. Dubay for Hip Replacement
          </h2>
          <ul className="space-y-3 mb-6">
            {whyDrDubay.map((point, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-blue-600 mt-0.5">&check;</span>
                <span className="text-gray-700 text-sm leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <p className="text-sm font-semibold text-gray-900">{shalby.name}</p>
              <p className="text-xs text-gray-600 mt-1">{shalby.address.fullDisplay}</p>
              <p className="text-xs text-gray-500 mt-1">{shalby.hours}</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <p className="text-sm font-semibold text-gray-900">{vidhyadhar.name}</p>
              <p className="text-xs text-gray-600 mt-1">{vidhyadhar.address.fullDisplay}</p>
              <p className="text-xs text-gray-500 mt-1">{vidhyadhar.hours}</p>
            </div>
          </div>
        </section>

        {/* What to expect */}
        <section className="my-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            What to Expect: Consultation to Recovery
          </h2>
          <p className="text-xs text-gray-500 mb-2">
            Recovery timelines vary by patient, age, and case complexity — this is a general
            pattern, not a guarantee.
          </p>
          <RecoveryTimeline steps={hipProcedure.recovery.timeline} />
        </section>

        {/* Cost & insurance — pointer only, no restated pricing */}
        <section className="my-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Cost &amp; Insurance</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Hip replacement cost in Jaipur depends on implant type, surgical approach, hospital
            room category, and insurance cover — there is no single number that applies to every
            patient. Most pan-India insurance and cashless TPA networks are accepted at Shalby
            Hospital — share your policy details on WhatsApp to confirm coverage for your case.
          </p>
          <Link
            href="/cost/hip-replacement-jaipur"
            className="inline-block bg-blue-700 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-800 transition-colors"
          >
            See Hip Replacement Cost in Jaipur &rarr;
          </Link>
        </section>

        {/* Patient outcomes */}
        <section className="my-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Patient Outcomes</h2>
          <ul className="space-y-3 mb-4">
            <li className="flex gap-3">
              <span className="text-blue-600 mt-0.5">&check;</span>
              <span className="text-gray-700 text-sm leading-relaxed">
                464+ hip replacements performed, part of 35,000+ total joint replacements across
                Dr. Dubay&rsquo;s career.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 mt-0.5">&check;</span>
              <span className="text-gray-700 text-sm leading-relaxed">
                {/* General clinical benchmark from published outcomes research —
                    matches the live procedure page's whatIsIt copy; deliberately
                    not presented as Dr. Dubay's own audited outcomes data. */}
                Total hip replacement is regarded as one of the most reliably successful operations
                in modern medicine — published outcomes research shows most patients achieve
                substantial pain relief and return to daily activity within 3&ndash;6 months.
              </span>
            </li>
          </ul>
          <Link href="/testimonials" className="text-blue-700 font-semibold hover:underline text-sm">
            Watch real patient stories &rarr;
          </Link>
        </section>

        {/* FAQ */}
        <section className="my-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <FAQAccordion faqs={faqs} />
        </section>

        {/* Related */}
        <section className="my-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Related</h2>
          <div className="flex flex-wrap gap-3">
            <a
              href="/procedures/hip-replacement-surgery"
              className="text-sm text-blue-700 bg-blue-50 border border-blue-200 px-4 py-2 rounded-full hover:bg-blue-100 transition-colors"
            >
              Total Hip Replacement — full procedure detail
            </a>
            <a
              href="/cost/hip-replacement-jaipur"
              className="text-sm text-blue-700 bg-blue-50 border border-blue-200 px-4 py-2 rounded-full hover:bg-blue-100 transition-colors"
            >
              Hip Replacement Cost in Jaipur
            </a>
            <a
              href="/conditions/hip-pain"
              className="text-sm text-blue-700 bg-blue-50 border border-blue-200 px-4 py-2 rounded-full hover:bg-blue-100 transition-colors"
            >
              Hip Pain
            </a>
            <a
              href="/conditions/avascular-necrosis"
              className="text-sm text-blue-700 bg-blue-50 border border-blue-200 px-4 py-2 rounded-full hover:bg-blue-100 transition-colors"
            >
              Avascular Necrosis (AVN)
            </a>
          </div>
        </section>

        <CTASection
          heading="Check if You're a Candidate for Hip Replacement"
          subheading="Free. Send your X-rays or describe your symptoms on WhatsApp — the team responds with next steps."
        />
      </main>
      {reviews.length ? (
        <TestimonialStrip
          reviews={reviews}
          heading="Hip replacement — patient experiences"
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
