import { PROCEDURE_PAGES } from '@/lib/procedure-pages.current'
import {
  BreadcrumbNav,
  CTASection,
  FAQAccordion,
  RecoveryTimeline,
  TrustBadges,
} from '@/components/pages'
import { PhysicianJsonLd } from '@/components/seo/JsonLd'
import { RelatedPatientGuides } from '@/components/seo/RelatedPatientGuides'
import { TestimonialStrip } from '@/components/ui/TestimonialStrip'
import { getPublishedReviews } from '@/lib/reviews'
import {
  CLINICS,
  EXPERIENCE_YEARS_DISPLAY,
  RECORD_SURGERIES_IN_A_DAY,
  SURGERY_COUNT_DISPLAY,
} from '@/lib/clinic-info'
import { generatePageMetadata, defaultSEO } from '@/lib/seo.config'
import { getWhatsAppBookingUrl } from '@/lib/whatsapp-booking'
import Link from 'next/link'
import {
  JOINT_OWNER_URL,
  KNEE_OWNER_URL,
  ROBOTIC_KNEE_OWNER_URL,
} from '@/lib/seo-priority-pages'

const SITE_URL = defaultSEO.siteUrl
const CANDIDATE_CHECK_MESSAGE = "Hi, I'd like to know if I'm a candidate for hip replacement"
const hipProcedure = PROCEDURE_PAGES.find((p) => p.slug === 'hip-replacement-surgery')!
const shalby = CLINICS.find((c) => c.id === 'shalby-jaipur')!
const vidhyadhar = CLINICS.find((c) => c.id === 'vidhyadhar-nagar')!

export const metadata = generatePageMetadata({
  title: 'Hip Replacement Surgeon in Jaipur | Dr. Dheeraj Dubay',
  description:
    'Hip replacement surgeon in Jaipur Dr. Dheeraj Dubay has 24 years of orthopedic experience and 40,000+ total surgeries. Hip arthritis, AVN, total and revision hip replacement at Shalby Hospital Jaipur.',
  keywords:
    'hip replacement surgeon jaipur, best hip replacement surgeon jaipur, hip replacement jaipur, avascular necrosis treatment jaipur',
  slug: 'hip-replacement-jaipur',
})

const signs = hipProcedure.candidateFor.symptoms

const typesOfHipReplacement = [
  {
    title: 'Total Hip Replacement (THR)',
    description:
      'The damaged femoral head and hip socket surfaces are replaced with artificial components. Whether THR is appropriate depends on the diagnosis, X-rays, symptoms and overall health.',
  },
  {
    title: 'Revision Hip Replacement',
    description:
      'A further operation on a previously replaced hip when there is a problem such as wear, loosening, instability, fracture or infection. Revision cases require individual planning.',
  },
]

const conditionsTreated = [
  {
    text: 'Hip osteoarthritis — progressive cartilage loss that can cause groin or hip pain, stiffness and reduced walking tolerance.',
  },
  {
    text: 'Avascular necrosis (AVN) — loss of blood supply to the femoral head; treatment depends on the stage and amount of joint damage.',
    href: '/conditions/avascular-necrosis',
    linkLabel: 'Read the AVN guide',
  },
  {
    text: 'Selected hip fractures — the treatment may involve fixation or replacement depending on fracture pattern, age, bone quality and health.',
  },
  {
    text: 'Developmental or structural hip problems that have progressed to painful arthritis.',
  },
  { text: 'Inflammatory arthritis affecting the hip.' },
  { text: 'Problems affecting a previous hip replacement that may require revision assessment.' },
]

const whyDrDubay = [
  `${EXPERIENCE_YEARS_DISPLAY} years of orthopedic experience.`,
  `${SURGERY_COUNT_DISPLAY} total surgeries performed across his career.`,
  'Director, Robotic Joint Replacement Surgery at Shalby Hospital Jaipur.',
  'Practice focused on knee and hip replacement, including complex and revision cases.',
  `Recorded ${RECORD_SURGERIES_IN_A_DAY} joint replacements in one day on 9 May 2024 — 33 knee replacements and 1 hip replacement.`,
  'Consultation and surgery planning are based on symptoms, examination, imaging and individual health rather than a one-size-fits-all protocol.',
]

const faqs = [
  {
    q: 'Am I a candidate for hip replacement?',
    a: "Hip replacement may be considered when hip pain and stiffness substantially limit daily activity and appropriate non-surgical treatment has not provided enough relief. The decision requires a clinical examination and imaging, and also considers your general health and goals.",
  },
  {
    q: 'How should I choose a hip replacement surgeon in Jaipur?',
    a: 'Compare relevant hip-replacement experience, hospital facilities, how the surgeon explains alternatives and risks, whether the plan is tailored to your diagnosis, and the follow-up and rehabilitation pathway. A consultation should help you understand why surgery is or is not appropriate for your case.',
  },
  {
    q: 'How long does hip replacement surgery take?',
    a: 'A primary total hip replacement often takes roughly 60–90 minutes, but operating time varies with anatomy, complexity, previous surgery and the chosen technique. Your surgeon and anaesthesia team can give a more specific estimate after assessment.',
  },
  {
    q: 'Does Dr. Dubay perform robotic-assisted hip replacement?',
    a: 'Dr. Dubay is Director, Robotic Joint Replacement Surgery at Shalby Hospital Jaipur. Whether robotic or computer-navigated assistance is useful for a particular hip case depends on the planned procedure and available technology. The surgeon remains in control of the operation.',
  },
  {
    q: 'How much does hip replacement cost in Jaipur?',
    a: 'Cost varies with implant choice, case complexity, room category, investigations and insurance. Use the dedicated Hip Replacement Cost in Jaipur page for the factors involved and request a patient-specific estimate from the hospital team.',
  },
  {
    q: 'Is hip replacement covered by insurance?',
    a: 'Coverage depends on the specific policy, waiting periods, exclusions, medical indication and the insurer or TPA. Shalby Hospital’s insurance desk can verify the current cashless or reimbursement pathway for your policy before treatment.',
  },
]

const references = [
  {
    label: 'AAOS — Management of Osteoarthritis of the Hip (Plain Language Summary, 2024)',
    href: 'https://orthoinfo.aaos.org/globalassets/pdfs/plain-language-summary_oa-of-the-hip-2024.pdf',
  },
  {
    label: 'AAOS American Joint Replacement Registry — Patient Guide to Hip Replacement',
    href: 'https://orthoinfo.aaos.org/globalassets/pdfs/ajrr-patient-facing-interim-report.pdf',
  },
]

export default async function HipReplacementJaipurPage() {
  const reviews = await getPublishedReviews({
    procedureSlug: 'hip-replacement-surgery',
    limit: 3,
  })

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Hip Replacement Surgeon in Jaipur',
        item: `${SITE_URL}/hip-replacement-jaipur`,
      },
    ],
  }

  const procedureSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    '@id': `${SITE_URL}/hip-replacement-jaipur#procedure`,
    name: 'Hip Replacement Surgery',
    description:
      'Patient-specific hip replacement assessment and surgery at Shalby Hospital Jaipur for conditions including advanced hip arthritis and avascular necrosis.',
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(procedureSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PhysicianJsonLd />

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Hip Replacement Surgeon in Jaipur' },
          ]}
        />

        <div className="mb-8">
          <span className="mb-4 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            Hip Replacement · Jaipur
          </span>
          <h1 className="mb-4 text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
            Hip Replacement Surgeon in Jaipur
          </h1>
          <p className="mb-5 text-base leading-relaxed text-gray-600">
            Dr. Dheeraj Dubay provides hip replacement care at Shalby Hospital Jaipur for patients with conditions such as advanced hip arthritis, avascular necrosis and selected hip fractures. He has {EXPERIENCE_YEARS_DISPLAY} years of orthopedic experience and has performed {SURGERY_COUNT_DISPLAY} total surgeries across his career. A consultation is used to decide whether hip replacement, another procedure or continued non-surgical treatment is appropriate.
          </p>
          <a
            href={getWhatsAppBookingUrl(CANDIDATE_CHECK_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-700"
          >
            Ask about a hip consultation on WhatsApp →
          </a>
          <p className="mt-2 text-xs text-gray-500">
            You can share symptoms or available reports with the team; a clinical examination is still required for diagnosis and treatment decisions.
          </p>
        </div>

        <TrustBadges />

        <section className="my-10">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">When Hip Replacement May Be Considered</h2>
          <p className="mb-4 leading-relaxed text-gray-600">
            Surgery is not automatically the first treatment for hip pain. Depending on the diagnosis, appropriate options may include activity modification, physiotherapy, medicines or other treatments before replacement is considered. Hip replacement may become relevant when symptoms and joint damage substantially affect daily life.
          </p>
          <div className="rounded-xl border border-green-100 bg-green-50 p-5">
            <ul className="space-y-2">
              {signs.map((sign, index) => (
                <li key={index} className="flex gap-2 text-sm text-green-800">
                  <span>•</span><span>{sign}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="my-10">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Hip Replacement Procedures</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {typesOfHipReplacement.map((item) => (
              <div key={item.title} className="rounded-xl border border-blue-100 bg-blue-50 p-5">
                <h3 className="mb-1 text-sm font-semibold text-gray-900">{item.title}</h3>
                <p className="text-xs leading-relaxed text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="my-10">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">Conditions That Can Lead to Hip Surgery</h2>
          <ul className="space-y-3">
            {conditionsTreated.map((condition, index) => (
              <li key={index} className="flex gap-3">
                <span className="mt-0.5 text-blue-600">✓</span>
                <span className="text-sm leading-relaxed text-gray-700">
                  {condition.text}{' '}
                  {condition.href ? (
                    <Link href={condition.href} className="font-medium text-blue-700 hover:underline">
                      {condition.linkLabel} →
                    </Link>
                  ) : null}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="my-10 rounded-2xl bg-gray-50 p-6 md:p-8">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">Dr. Dheeraj Dubay — Hip & Joint Replacement Experience</h2>
          <ul className="mb-6 space-y-3">
            {whyDrDubay.map((point) => (
              <li key={point} className="flex gap-3">
                <span className="mt-0.5 text-emerald-600">✓</span>
                <span className="text-sm leading-relaxed text-gray-700">{point}</span>
              </li>
            ))}
          </ul>
          <div className="grid gap-4 sm:grid-cols-2">
            {[shalby, vidhyadhar].map((clinic) => (
              <div key={clinic.id} className="rounded-xl border border-gray-200 bg-white p-4">
                <p className="text-sm font-semibold text-gray-900">{clinic.name}</p>
                <p className="mt-1 text-xs text-gray-600">{clinic.address.fullDisplay}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="my-10">
          <h2 className="mb-2 text-2xl font-bold text-gray-900">Recovery After Hip Replacement</h2>
          <p className="mb-4 text-sm leading-relaxed text-gray-600">
            Recovery varies with age, pre-operative mobility, diagnosis, other medical conditions and rehabilitation. The timeline below is general patient education, not a promise for an individual patient.
          </p>
          <RecoveryTimeline steps={hipProcedure.recovery.timeline} />
        </section>

        <section className="my-10 rounded-2xl border border-emerald-100 bg-emerald-50/40 p-6">
          <h2 className="mb-3 text-2xl font-bold text-gray-900">Hip Replacement Cost & Insurance in Jaipur</h2>
          <p className="leading-relaxed text-gray-600">
            Cost depends on implant choice, complexity, hospital services, room category and the patient’s insurance policy. Cashless eligibility is policy- and TPA-specific, so the hospital team should verify the current coverage before treatment.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/cost/hip-replacement-jaipur"
              className="inline-block rounded-xl bg-blue-700 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-800"
            >
              Hip Replacement Cost & Insurance →
            </Link>
            <Link
              href="/insurance-cashless-jaipur"
              className="inline-block rounded-xl border border-emerald-300 bg-white px-6 py-3 text-sm font-bold text-emerald-800 transition-colors hover:bg-emerald-100"
            >
              Shalby Jaipur Insurance List →
            </Link>
          </div>
        </section>

        <section className="my-10">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <FAQAccordion faqs={faqs} />
        </section>

        <RelatedPatientGuides currentPath="/hip-replacement-jaipur" />

        <section className="my-10">
          <h2 className="mb-4 text-xl font-bold text-gray-900">Related Jaipur Care</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { href: '/procedures/hip-replacement-surgery', label: 'Hip Replacement — Procedure Guide' },
              { href: JOINT_OWNER_URL, label: 'Joint Replacement Surgeon in Jaipur' },
              { href: KNEE_OWNER_URL, label: 'Knee Replacement Surgeon in Jaipur' },
              { href: ROBOTIC_KNEE_OWNER_URL, label: 'Robotic Knee Replacement in Jaipur' },
              { href: '/conditions/hip-pain', label: 'Hip Pain' },
              { href: '/conditions/avascular-necrosis', label: 'Avascular Necrosis (AVN)' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm text-blue-700 transition-colors hover:bg-blue-100"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </section>

        <section className="my-10 border-t border-gray-200 pt-8">
          <h2 className="text-lg font-bold text-gray-900">Patient education references</h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-600">
            These independent orthopedic references provide general background on hip osteoarthritis and joint replacement. They do not replace Dr. Dubay’s examination or a patient-specific treatment plan.
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {references.map((reference) => (
              <li key={reference.href}>
                <a href={reference.href} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-700 hover:underline">
                  {reference.label} ↗
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-gray-400">Content updated 30 August 2026.</p>
        </section>

        <CTASection
          heading="Book a Hip Replacement Consultation in Jaipur"
          subheading="Share your symptoms or available reports with the team and arrange an appropriate consultation."
        />
      </main>

      {reviews.length ? (
        <TestimonialStrip
          reviews={reviews}
          heading="Hip replacement — patient experiences"
          subheading="Selected patient experiences published on this website. Individual outcomes vary."
        />
      ) : null}
    </>
  )
}
