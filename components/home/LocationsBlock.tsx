import Link from "next/link";
import { MapPinIcon, PhoneIcon, ClockIcon } from "lucide-react";

// Address-only locations block. The interactive map embed lives only on
// /locations to protect homepage Core Web Vitals. Each card has a Get
// Directions link that opens Google Maps in a new tab using the actual
// Place ID, which matches the Google Business Profile listing.

const LOCATIONS = [
  {
    name: "Shalby Hospital Jaipur",
    address: "200 Feet Bypass Road, Vaishali Nagar, Jaipur, Rajasthan 302021",
    phone: "+91-8955373205",
    hours: "Mon–Sat, 9:00 AM – 5:00 PM",
    directionsUrl:
      "https://www.google.com/maps/place/?q=place_id:ChIJPSvAWaS0bTkRSpg1PguKuf0",
  },
  {
    name: "Dr. Dubay Hip & Knee Clinic",
    address:
      "297, Gali Number 6, Kusum Vihar, Vidhyadhar Nagar, Jaipur, Rajasthan 302017",
    phone: "+91-8955373205",
    hours: "Mon–Sat, 6:00 PM – 8:00 PM",
    directionsUrl:
      "https://www.google.com/maps/search/?api=1&query=Dr.+Dubay+Hip+%26+Knee+Clinic+Vidhyadhar+Nagar+Jaipur",
    // TODO(jatin): replace with proper Place ID when available
  },
];

export default function LocationsBlock() {
  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="inline-block bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide mb-3">
            Visit us
          </span>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Locations</h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm">
            Two clinic locations across Jaipur for your convenience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {LOCATIONS.map((loc) => (
            <article
              key={loc.name}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-3">{loc.name}</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <p className="flex items-start gap-2">
                  <MapPinIcon className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>{loc.address}</span>
                </p>
                <p className="flex items-center gap-2">
                  <PhoneIcon className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <a
                    href={`tel:${loc.phone.replace(/[^0-9+]/g, "")}`}
                    className="hover:text-emerald-700"
                  >
                    {loc.phone}
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <ClockIcon className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{loc.hours}</span>
                </p>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <a
                  href={loc.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold text-emerald-700 border border-emerald-300 rounded-md hover:bg-emerald-50 transition"
                >
                  Get Directions →
                </a>
                <Link
                  href="/locations"
                  className="inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold text-gray-700 border border-gray-200 rounded-md hover:bg-gray-50 transition"
                >
                  See on map
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
