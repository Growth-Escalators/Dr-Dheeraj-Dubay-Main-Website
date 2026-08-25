import type { Metadata } from 'next'
import Link from 'next/link'
import { CONDITION_PAGES } from '@/lib/condition-pages'
import { defaultSEO } from '@/lib/seo.config'

export const metadata: Metadata = {
  title: 'Knee & Hip Conditions | Dr. Dheeraj Dubay, Jaipur',
  description:
    'Understand common knee and hip conditions, symptoms and treatment options with educational guidance from Dr. Dheeraj Dubay in Jaipur.',
  alternates: {
    canonical: `${defaultSEO.siteUrl}/conditions`,
  },
}

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Knee and hip conditions',
  numberOfItems: CONDITION_PAGES.length,
  itemListElement: CONDITION_PAGES.map((condition, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: condition.title,
    url: `${defaultSEO.siteUrl}/conditions/${condition.slug}`,
  })),
}

export default function ConditionsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <section className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-14 text-center">
          <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
            Patient education
          </span>
          <h1 className="mt-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Knee &amp; Hip Conditions
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Learn about common causes of knee and hip pain, warning signs and
            the treatment options a specialist may discuss after evaluation.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CONDITION_PAGES.map((condition) => (
            <Link
              key={condition.slug}
              href={`/conditions/${condition.slug}`}
              className="rounded-2xl border border-gray-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
            >
              <h2 className="text-lg font-semibold text-gray-900">
                {condition.title}
              </h2>
              <p className="mt-3 text-sm font-medium text-blue-700">
                Symptoms, diagnosis and treatment options →
              </p>
            </Link>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          This information is educational and does not replace a personal
          medical consultation.
        </p>
      </section>
    </main>
  )
}
