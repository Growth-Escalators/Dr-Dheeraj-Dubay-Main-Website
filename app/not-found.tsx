import Link from "next/link"
import type { Metadata } from "next"
import { CITY_PAGES } from "@/lib/city-pages"
import { PROCEDURE_PAGES } from "@/lib/procedure-pages"

export const metadata: Metadata = {
  title: "Page not found — Dr. Dheeraj Dubay",
  description:
    "The page you're looking for doesn't exist. Browse popular procedures and city locations or contact the clinic directly.",
  robots: { index: false, follow: true },
}

const TOP_CITIES = ["jaipur", "bikaner", "kota", "ajmer", "sikar", "churu"]
const TOP_PROCEDURES = [
  "knee-replacement-surgery",
  "robotic-knee-replacement",
  "hip-replacement-surgery",
  "partial-knee-replacement",
  "revision-knee-replacement",
]

export default function NotFound() {
  const cities = CITY_PAGES.filter((p) =>
    TOP_CITIES.some((c) => p.slug.includes(c)),
  ).slice(0, 6)
  const procedures = PROCEDURE_PAGES.filter((p) =>
    TOP_PROCEDURES.includes(p.slug),
  )

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16 md:py-24">
      <div className="text-center mb-12">
        <p className="text-sm font-semibold tracking-wide text-blue-600 uppercase mb-3">
          404 — Page not found
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          We couldn&apos;t find that page
        </h1>
        <p className="text-gray-600 text-base md:text-lg max-w-xl mx-auto">
          The link may be outdated or mistyped. Here are some pages most patients are
          looking for.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <Link
            href="/"
            className="inline-flex items-center px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Go to homepage
          </Link>
          <a
            href="https://wa.me/918955373205?text=Hello%20Dr.%20Dubay%20clinic"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-5 py-2.5 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition"
          >
            WhatsApp clinic
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Top procedures</h2>
          <ul className="space-y-2">
            {procedures.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/procedures/${p.slug}`}
                  className="text-blue-700 hover:underline text-sm"
                >
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Service areas</h2>
          <ul className="space-y-2">
            {cities.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/${c.slug}`}
                  className="text-blue-700 hover:underline text-sm"
                >
                  {c.procedure} in {c.city}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
        Need an appointment urgently? Call{" "}
        <a href="tel:+918955373205" className="text-blue-700 font-semibold hover:underline">
          +91-89553-73205
        </a>
        .
      </div>
    </main>
  )
}
