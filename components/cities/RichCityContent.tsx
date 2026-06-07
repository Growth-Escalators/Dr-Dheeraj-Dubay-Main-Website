import type { CityPage } from "@/lib/cities/types";
import { MapPinIcon, BedDoubleIcon, RouteIcon } from "lucide-react";

interface Props {
  city: CityPage;
}

// Rich content sections that appear on Tier-1 city pages after the
// existing hero/intro. Each section is rendered only if the city data
// has it, so partially-filled cities still render cleanly.
export function RichCityContent({ city }: Props) {
  return (
    <section className="max-w-3xl mx-auto px-4 py-12 space-y-12">
      {/* Travel guidance */}
      {city.travelGuidance && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <RouteIcon className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl font-bold text-gray-900">
              How to reach Shalby Hospital from {city.city}
            </h2>
          </div>
          <p className="text-gray-600 leading-relaxed">{city.travelGuidance}</p>
        </div>
      )}

      {/* Why travel */}
      {city.whyTravel && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <MapPinIcon className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl font-bold text-gray-900">
              Why patients from {city.city} choose Dr. Dubay
            </h2>
          </div>
          <p className="text-gray-600 leading-relaxed whitespace-pre-line">
            {city.whyTravel}
          </p>
        </div>
      )}

      {/* Lodging */}
      {city.lodging && city.lodging.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <BedDoubleIcon className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl font-bold text-gray-900">
              Where to stay during your visit
            </h2>
          </div>
          <ul className="space-y-3">
            {city.lodging.map((l) => (
              <li
                key={l.name}
                className="bg-emerald-50 border border-emerald-100 rounded-lg p-4"
              >
                <p className="font-semibold text-gray-900">{l.name}</p>
                <p className="text-sm text-gray-600 mt-1">{l.notes}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* FAQ */}
      {city.faqs && city.faqs.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            FAQs for {city.city} patients
          </h2>
          <div className="space-y-4">
            {city.faqs.map((faq, i) => (
              <details
                key={i}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden group"
              >
                <summary className="cursor-pointer px-4 py-3 font-semibold text-gray-900 hover:bg-gray-50 list-none flex items-center justify-between">
                  <span>{faq.q}</span>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">
                    ▾
                  </span>
                </summary>
                <div className="px-4 py-3 border-t border-gray-100 text-gray-600 text-sm leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>

          {/* FAQPage schema */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: city.faqs.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: f.a,
                  },
                })),
              }),
            }}
          />
        </div>
      )}
    </section>
  );
}
