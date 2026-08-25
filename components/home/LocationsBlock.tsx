import Link from "next/link";
import {
  MapPinIcon,
  PhoneIcon,
  ClockIcon,
  NavigationIcon,
} from "lucide-react";
import { SECTION_HEADING_CLASSES } from "@/lib/design-tokens";
import { CLINICS } from "@/lib/clinic-info";
import { getWhatsAppBookingUrl } from "@/lib/whatsapp-booking";

// Keep the homepage location block server-rendered and lightweight. The
// previous version hydrated a Google Maps SDK and a minute-by-minute status
// timer far below the fold. That added a sizeable client bundle to every
// homepage visit despite both cards already linking to Google Directions.
// The dedicated /locations page retains lazy maps for visitors who need them.
const LOCATIONS = CLINICS.map((clinic, index) => ({
  name: index === 0 ? "Shalby Hospital Jaipur" : "Dr. Dubay Hip & Knee Clinic",
  type: index === 0 ? "Hospital OPD" : "Evening Clinic",
  address: clinic.address.fullDisplay,
  phone: clinic.phone,
  hours: clinic.hours,
  directionsUrl: clinic.directionsUrl,
}));

function LocationCard({ loc }: { loc: (typeof LOCATIONS)[number] }) {
  return (
    <article className="bg-white border border-gray-200 rounded-xl p-6 hover:border-emerald-300 hover:shadow-md transition flex flex-col">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <span className="inline-block bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-emerald-200 mb-2">
            {loc.type}
          </span>
          <h3 className="text-lg font-bold text-gray-900">{loc.name}</h3>
        </div>
      </div>

      <div className="space-y-2.5 text-sm text-gray-600 flex-1">
        <p className="flex items-start gap-2">
          <MapPinIcon className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
          <span className="leading-relaxed">{loc.address}</span>
        </p>
        <p className="flex items-center gap-2">
          <ClockIcon className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{loc.hours}</span>
        </p>
        <a
          href={`tel:${loc.phone.replace(/[^0-9+]/g, "")}`}
          className="flex items-center gap-2 hover:text-emerald-700"
        >
          <PhoneIcon className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span className="font-semibold">{loc.phone}</span>
        </a>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <a
          href={loc.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-md transition"
        >
          <NavigationIcon className="w-3.5 h-3.5" />
          Get Directions
        </a>
        <a
          href={getWhatsAppBookingUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold text-emerald-700 border border-emerald-300 rounded-md hover:bg-emerald-50 transition"
        >
          WhatsApp
        </a>
        <Link
          href="/locations"
          className="inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold text-gray-700 border border-gray-200 rounded-md hover:bg-gray-50 transition"
        >
          More info
        </Link>
      </div>
    </article>
  );
}

export default function LocationsBlock() {
  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className={SECTION_HEADING_CLASSES.eyebrow}>Visit us</span>
          <h2 className={SECTION_HEADING_CLASSES.h2}>Our Locations</h2>
          <p className={SECTION_HEADING_CLASSES.sub}>
            Orthopedic and joint-replacement consultations in Vaishali Nagar
            and Vidhyadhar Nagar, Jaipur. Choose a clinic for directions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {LOCATIONS.map((loc) => (
            <LocationCard key={loc.name} loc={loc} />
          ))}
        </div>
      </div>
    </section>
  );
}
