import Link from 'next/link'
import { PATIENT_GUIDES } from '@/lib/patient-guides'

export function RelatedPatientGuides({ currentPath }: { currentPath: string }) {
  const guides = PATIENT_GUIDES.filter((guide) =>
    guide.related.some((item) => item.href === currentPath),
  )

  if (!guides.length) return null

  return (
    <section className="my-10 rounded-2xl border border-emerald-100 bg-emerald-50/40 p-6">
      <h2 className="text-xl font-bold text-gray-900">Patient guides related to this treatment</h2>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">
        Use these decision-stage guides to understand trade-offs, risks and questions to discuss during an orthopedic consultation.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="rounded-xl border border-emerald-100 bg-white p-4 text-sm font-semibold leading-snug text-emerald-900 hover:border-emerald-300"
          >
            {guide.title} →
          </Link>
        ))}
      </div>
    </section>
  )
}
