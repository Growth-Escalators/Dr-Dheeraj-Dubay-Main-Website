"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";
import {
  MapPinIcon,
  PhoneIcon,
  ClockIcon,
  NavigationIcon,
} from "lucide-react";
import { ACCENT, SECTION_HEADING_CLASSES } from "@/lib/design-tokens";
import { getWhatsAppBookingUrl } from "@/lib/whatsapp-booking";

// Address + map locations block. Adds a single shared Google Map preview
// at the top so visitors recognise the area before reading addresses; cards
// below hold the same contact info as before plus a live open/closed
// indicator computed from current IST time. The interactive iframe approach
// (one map per clinic) was rejected for hurting Core Web Vitals — this uses
// the vis.gl Google Maps React wrapper which is lighter and lazy-loads.

const LOCATIONS = [
  {
    name: "Shalby Hospital Jaipur",
    type: "Hospital OPD",
    // Full GBP-matching address (2026-07-24 NAP alignment pass) — see
    // lib/clinic-info.ts for the canonical source and why the short form
    // was wrong.
    address:
      "Ajmer Expressway 200 Feet Bypass Road, near Gandhi Path, Chitrakoot Sector 3, Vaishali Nagar, Jaipur, Rajasthan 302021",
    phone: "+91-8955373205",
    hours: "Mon–Sat, 9:00 AM – 5:00 PM",
    openHour: 9,
    closeHour: 17,
    position: { lat: 26.903488202765963, lng: 75.72921788230423 },
    directionsUrl:
      "https://www.google.com/maps/place/?q=place_id:ChIJPSvAWaS0bTkRSpg1PguKuf0",
  },
  {
    name: "Dr. Dubay Hip & Knee Clinic",
    type: "Evening Clinic",
    address:
      "297, Gali Number 6, Kusum Vihar, Vidhyadhar Nagar, Jaipur, Rajasthan 302017",
    phone: "+91-8955373205",
    hours: "Mon–Sat, 6:00 PM – 8:00 PM",
    openHour: 18,
    closeHour: 20,
    position: { lat: 26.82723369883703, lng: 75.85228368196005 },
    directionsUrl:
      "https://www.google.com/maps/search/?api=1&query=Dr.+Dubay+Hip+%26+Knee+Clinic+Vidhyadhar+Nagar+Jaipur",
  },
];

// Shared view centred between the two clinics so both pins fit. zoom=11 is
// enough that both areas read as "north & east Jaipur".
const MAP_CENTER = { lat: 26.866, lng: 75.79 };

// Compute open/closed live for each location, recomputed every minute.
// "now" is normalised to IST so the badge doesn't lie about open status
// when a patient is browsing from outside India.
function useIsOpenNow(openHour: number, closeHour: number) {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const check = () => {
      const istNow = new Date(
        new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
      );
      const day = istNow.getDay();
      const hour = istNow.getHours();
      setIsOpen(day >= 1 && day <= 6 && hour >= openHour && hour < closeHour);
    };
    check();
    const id = setInterval(check, 60_000);
    return () => clearInterval(id);
  }, [openHour, closeHour]);
  return isOpen;
}

function LocationCard({ loc }: { loc: (typeof LOCATIONS)[number] }) {
  const isOpen = useIsOpenNow(loc.openHour, loc.closeHour);
  return (
    <article className="bg-white border border-gray-200 rounded-xl p-6 hover:border-emerald-300 hover:shadow-md transition flex flex-col">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <span className="inline-block bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-emerald-200 mb-2">
            {loc.type}
          </span>
          <h3 className="text-lg font-bold text-gray-900">{loc.name}</h3>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap bg-white border border-gray-200">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isOpen ? "bg-emerald-500 animate-pulse" : "bg-gray-400"
            }`}
          />
          {isOpen ? "Open now" : "Closed"}
        </span>
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
            Two Jaipur clinics — pick the one closest to you, or tap a pin on
            the map to see the area before you set out.
          </p>
        </div>

        <APIProvider apiKey="AIzaSyBAi8dE58UCX0blqwVUKRv8z7Yw0zGPYDs">
          {/* Shared map preview at the top — both pins visible at once.
              Reduced height vs a full-page map so it doesn't dominate; the
              cards below are the action surface. */}
          <div className="relative h-64 md:h-80 mb-8 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            <Map
              zoom={11}
              center={MAP_CENTER}
              mapId="2356584220fb1eb7"
              gestureHandling="cooperative"
              disableDefaultUI={true}
              zoomControl={true}
            >
              {LOCATIONS.map((loc) => (
                <AdvancedMarker key={loc.name} position={loc.position}>
                  <Pin
                    background="#10b981"
                    borderColor="#ffffff"
                    glyphColor="#ffffff"
                  />
                </AdvancedMarker>
              ))}
            </Map>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {LOCATIONS.map((loc) => (
              <LocationCard key={loc.name} loc={loc} />
            ))}
          </div>
        </APIProvider>
      </div>
    </section>
  );
}
