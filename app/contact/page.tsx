import { generatePageMetadata } from "@/lib/seo.config";
import LocationsBlock from "@/components/home/LocationsBlock";
import FinalCTA from "@/components/home/FinalCTA";
import { PhoneIcon, MailIcon, MessageCircle } from "lucide-react";
import GTM from "@/utils/GTM";
import React from "react";

export const metadata = generatePageMetadata({
  title: "Contact Dr. Dheeraj Dubay | Book Appointment Jaipur",
  description:
    "Contact Dr. Dheeraj Dubay at Shalby Hospital Jaipur or Dr. Dubay Hip & Knee Clinic. Call, WhatsApp, or visit either clinic location.",
  slug: "contact",
});

// Organization + multi-ContactPoint schema. Renders the appointments and
// general-info numbers so Google can surface the right one per query.
const contactOrgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.drdubay.in/#organization",
  name: "Dr. Dheeraj Dubay — Joint Replacement Clinic",
  url: "https://www.drdubay.in",
  logo: "https://www.drdubay.in/assets/images/logonew.png",
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+91-8955373205",
      contactType: "appointments",
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
    {
      "@type": "ContactPoint",
      telephone: "+91-8955373205",
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
  ],
  email: "connect@drdubay.in",
  sameAs: [
    "https://www.facebook.com/drdheerajdubay/",
    "https://www.instagram.com/dheerajdubay1/",
    "https://www.youtube.com/@dr.dheerajdubay6664",
    "https://www.linkedin.com/in/dr-dheeraj-dubay-36399599/",
  ],
};

const PHONE_TEL = "+918955373205";
const PHONE_DISPLAY = "+91 89553 73205";
const WHATSAPP_URL = "https://wa.me/918955373205?text=Hello%20Dr.%20Dubay%20clinic";
const EMAIL = "connect@drdubay.in";

const ContactPage = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactOrgSchema) }}
      />
      <head>
        <GTM gtmId="GTM-MDF4W4JT" />
        <link rel="icon" href="/assets/images/logonew.png" />
      </head>

      {/* Header */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Get in touch with Dr. Dheeraj Dubay
          </h1>
          <p className="text-gray-600 text-base md:text-lg">
            Call, WhatsApp, or visit either clinic — we&apos;ll help you book a
            consultation and answer any pre-surgery questions.
          </p>
        </div>
      </section>

      {/* Primary contact methods */}
      <section className="py-10 bg-emerald-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <a
              href={`tel:${PHONE_TEL}`}
              className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-md transition group"
            >
              <PhoneIcon className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Call us</h3>
              <p className="text-gray-600 text-sm">{PHONE_DISPLAY}</p>
              <span className="inline-block mt-3 px-4 py-1.5 text-xs font-semibold text-emerald-700 border border-emerald-300 rounded-md group-hover:bg-emerald-50">
                Call Now
              </span>
            </a>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-md transition group"
            >
              <MessageCircle className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">WhatsApp</h3>
              <p className="text-gray-600 text-sm">Chat with our team</p>
              <span className="inline-block mt-3 px-4 py-1.5 text-xs font-semibold text-emerald-700 border border-emerald-300 rounded-md group-hover:bg-emerald-50">
                Open WhatsApp →
              </span>
            </a>

            <a
              href={`mailto:${EMAIL}`}
              className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-md transition group"
            >
              <MailIcon className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
              <p className="text-gray-600 text-sm">{EMAIL}</p>
              <span className="inline-block mt-3 px-4 py-1.5 text-xs font-semibold text-emerald-700 border border-emerald-300 rounded-md group-hover:bg-emerald-50">
                Send email
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Locations with Get Directions (no embedded map) */}
      <LocationsBlock />

      {/* Final CTA */}
      <FinalCTA />
    </>
  );
};

export default ContactPage;
