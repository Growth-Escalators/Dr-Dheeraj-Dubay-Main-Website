import { generatePageMetadata } from "@/lib/seo.config";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { LazyMapEmbed } from "@/components/ui/LazyMapEmbed";

export const revalidate = 3600;

export const metadata = generatePageMetadata({
  title: "Clinic Locations | Dr. Dheeraj Dubay - Joint Replacement Jaipur",
  description:
    "Visit Dr. Dheeraj Dubay at Shalby Hospital Vaishali Nagar or Dr. Dubay Hip & Knee Clinic Vidhyadhar Nagar, Jaipur. Get directions, timings & contact info.",
  slug: "locations",
  keywords:
    "dr dheeraj dubay clinic, shalby hospital jaipur, joint replacement clinic jaipur, knee replacement surgeon near me, hip replacement jaipur location",
});

const locations = [
  {
    name: "Shalby Hospital",
    type: "Hospital",
    address: "Plot No. 4 & 5, Sector 2, Vidhyadhar Nagar, Jaipur, Rajasthan 302039",
    phone: "+91-8955373205",
    timing: "Mon-Sat: 9:00 AM - 5:00 PM",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3556.7!2d75.78!3d26.95!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db3cb2f0311eb%3A0x6d8e4e6a5c8f1b7a!2sShalby%20Multi-Speciality%20Hospital!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  },
  {
    name: "Dr. Dubay Hip & Knee Clinic",
    type: "Private Clinic",
    address: "Near Murlipura Police Station, Vidhyadhar Nagar, Jaipur, Rajasthan 302039",
    phone: "+91-8955373205",
    timing: "Mon-Sat: 6:00 PM - 8:00 PM",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3556.7!2d75.78!3d26.95!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db3cb2f0311eb%3A0x6d8e4e6a5c8f1b7a!2sDr.%20Dubay%20Hip%20%26%20Knee%20Clinic!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  },
];

function LocalBusinessJsonLd({ loc }: { loc: typeof locations[0] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: loc.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: loc.address,
      addressLocality: "Jaipur",
      addressRegion: "Rajasthan",
      postalCode: "302039",
      addressCountry: "IN",
    },
    telephone: loc.phone,
    openingHours: "Mo-Sa 09:00-18:00",
    medicalSpecialty: "Orthopedic Surgery",
    physician: {
      "@type": "Physician",
      name: "Dr. Dheeraj Dubay",
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function LocationsPage() {
  return (
    <>
      {locations.map((loc, i) => (
        <LocalBusinessJsonLd key={i} loc={loc} />
      ))}
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://www.drdubay.in" },
          { name: "Locations", url: "https://www.drdubay.in/locations" },
        ]}
      />
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Our Locations
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-10">
            Visit Dr. Dheeraj Dubay at either of our two Jaipur locations
          </p>

          <div className="space-y-10">
            {locations.map((loc, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm"
              >
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full mb-2">
                        {loc.type}
                      </span>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {loc.name}
                      </h2>
                    </div>
                    <a
                      href={`tel:${loc.phone}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors shrink-0"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Call Now
                    </a>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-gray-600 dark:text-gray-300">{loc.address}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-600 dark:text-gray-300">{loc.timing}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="text-gray-600 dark:text-gray-300">{loc.phone}</span>
                    </div>
                  </div>
                </div>
                <div className="h-64 md:h-80">
                  <LazyMapEmbed
                    src={loc.mapSrc}
                    title={loc.name}
                    height={320}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
