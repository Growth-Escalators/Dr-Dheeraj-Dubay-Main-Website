import Link from 'next/link'
import {
  EXPERIENCE_YEARS_DISPLAY,
  SURGERY_COUNT_DISPLAY,
  RECORD_SURGERIES_IN_A_DAY,
} from '@/lib/clinic-info'

const resources = [
  {
    label: 'Doctor profile & qualifications',
    href: '/about',
    description: 'Training, current role, experience and clinical focus.',
  },
  {
    label: 'Medical editorial policy',
    href: '/editorial-policy',
    description: 'How patient information, claims, sources and corrections are handled.',
  },
  {
    label: 'Knee & hip patient guides',
    href: '/guides',
    description: 'Decision-stage education with independent patient-information sources.',
  },
  {
    label: 'Insurance & cashless information',
    href: '/insurance-cashless-jaipur',
    description: 'Tie-ups published by Shalby Jaipur, with current-eligibility guidance.',
  },
  {
    label: 'Published work',
    href: '/articles',
    description: 'Articles and professional material listed on this website.',
  },
  {
    label: 'Jaipur consultation locations',
    href: '/locations',
    description: 'Practice locations and appointment information.',
  },
]

export default function AuthorityTransparencySection() {
  return (
    <section className="bg-[#F7FBF9] px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
              Practice facts & transparency
            </span>
            <h2 className="mt-2 text-2xl font-bold text-gray-900 md:text-3xl">
              Clear information patients can verify and use
            </h2>
            <p className="mt-4 leading-relaxed text-gray-700">
              This website separates confirmed practice facts from patient education and avoids presenting individual outcomes as guarantees. Medical decisions require a clinical assessment.
            </p>

            <dl className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-emerald-100 bg-white p-4">
                <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">Experience</dt>
                <dd className="mt-1 font-bold text-gray-900">{EXPERIENCE_YEARS_DISPLAY} years</dd>
              </div>
              <div className="rounded-xl border border-emerald-100 bg-white p-4">
                <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">Surgical experience</dt>
                <dd className="mt-1 font-bold text-gray-900">{SURGERY_COUNT_DISPLAY} total surgeries</dd>
              </div>
              <div className="rounded-xl border border-emerald-100 bg-white p-4 sm:col-span-2">
                <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">Current role</dt>
                <dd className="mt-1 font-bold text-gray-900">Director, Robotic Joint Replacement Surgery — Shalby Hospital Jaipur</dd>
              </div>
              <div className="rounded-xl border border-emerald-100 bg-white p-4 sm:col-span-2">
                <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">Recorded single-day surgical milestone</dt>
                <dd className="mt-1 font-bold text-gray-900">{RECORD_SURGERIES_IN_A_DAY} joint replacements on 9 May 2024 — 33 knee and 1 hip</dd>
              </div>
            </dl>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {resources.map((resource) => (
              <Link
                key={resource.href}
                href={resource.href}
                className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-emerald-300 hover:shadow-md"
              >
                <h3 className="font-bold text-gray-900 group-hover:text-emerald-800">{resource.label}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">{resource.description}</p>
                <span className="mt-3 inline-block text-sm font-semibold text-emerald-700">Open →</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
