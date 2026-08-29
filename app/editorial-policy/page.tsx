import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Medical Editorial Policy | Dr. Dheeraj Dubay',
  description:
    'How medical and orthopedic information on drdubay.in is written, sourced, updated and corrected.',
  alternates: { canonical: 'https://www.drdubay.in/editorial-policy' },
}

const principles = [
  {
    title: 'Purpose of the content',
    text: 'The website provides patient education about orthopedic conditions, joint replacement procedures, recovery, costs and appointment pathways. It is not a substitute for diagnosis, an examination or a personalised treatment plan.',
  },
  {
    title: 'Clinical claims',
    text: 'Procedure outcomes, recovery time and suitability vary by patient. Content should avoid guarantees and unsupported absolute claims. Treatment recommendations require clinical assessment, relevant imaging and review of the patient’s overall health.',
  },
  {
    title: 'Doctor and practice facts',
    text: 'Career statistics, qualifications, current hospital role and practice locations are kept in shared site data so the same facts are used consistently across pages. Claims that cannot be adequately supported are removed or qualified.',
  },
  {
    title: 'External sources',
    text: 'Where useful, patient-education pages link to established orthopedic sources such as the American Academy of Orthopaedic Surgeons. External sources provide general context and do not imply endorsement of an individual treatment plan.',
  },
  {
    title: 'Updates and review',
    text: 'A “content updated” date is shown only when a substantive edit has actually been made. The site does not label content “medically reviewed” unless a documented medical-review workflow has taken place.',
  },
  {
    title: 'Corrections',
    text: 'If a factual or medical-information error is identified, the page should be corrected promptly. Patients should contact the clinical team directly for questions about their own treatment or records.',
  },
]

export default function EditorialPolicyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Transparency</p>
      <h1 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">Medical Editorial Policy</h1>
      <p className="mt-4 text-base leading-8 text-gray-600">
        This policy explains how medical information on Dr. Dheeraj Dubay&apos;s website is handled. The aim is to keep orthopedic content useful, understandable, consistent and appropriately cautious for patients making healthcare decisions.
      </p>

      <div className="mt-10 space-y-6">
        {principles.map((principle) => (
          <section key={principle.title} className="rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-xl font-bold text-gray-900">{principle.title}</h2>
            <p className="mt-2 leading-7 text-gray-600">{principle.text}</p>
          </section>
        ))}
      </div>

      <section className="mt-10 rounded-2xl bg-emerald-50 p-6">
        <h2 className="text-xl font-bold text-gray-900">Clinical contact</h2>
        <p className="mt-2 leading-7 text-gray-700">
          For a patient-specific question, appointment or treatment discussion, contact Dr. Dubay&apos;s team rather than relying on website content alone.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/contact" className="rounded-lg bg-emerald-700 px-5 py-3 text-sm font-semibold text-white">Contact the team</Link>
          <Link href="/about" className="rounded-lg border border-emerald-700 px-5 py-3 text-sm font-semibold text-emerald-800">About Dr. Dubay</Link>
        </div>
      </section>

      <p className="mt-8 text-xs text-gray-400">Policy updated 29 August 2026.</p>
    </main>
  )
}
