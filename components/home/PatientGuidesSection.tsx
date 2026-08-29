import Link from 'next/link'
import { PATIENT_GUIDES } from '@/lib/patient-guides'

export default function PatientGuidesSection() {
  return (
    <section className="bg-white px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Patient education</span>
          <h2 className="mt-2 text-2xl font-bold text-gray-900 md:text-3xl">Before You Decide on Joint Replacement</h2>
          <p className="mt-3 leading-relaxed text-gray-600">
            Read balanced guides on the decisions patients commonly face before knee or hip replacement. Each guide links to independent patient-information sources and the relevant treatment page.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PATIENT_GUIDES.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group rounded-2xl border border-gray-200 bg-gray-50 p-5 transition hover:border-emerald-300 hover:bg-emerald-50/50"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{guide.category}</span>
              <h3 className="mt-2 font-bold leading-snug text-gray-900 group-hover:text-emerald-800">{guide.title}</h3>
              <span className="mt-3 inline-block text-sm font-semibold text-emerald-700">Read guide →</span>
            </Link>
          ))}
        </div>

        <div className="mt-7 text-center">
          <Link href="/guides" className="inline-flex rounded-lg border border-emerald-300 px-5 py-3 text-sm font-semibold text-emerald-800 hover:bg-emerald-50">
            View all knee & hip patient guides
          </Link>
        </div>
      </div>
    </section>
  )
}
