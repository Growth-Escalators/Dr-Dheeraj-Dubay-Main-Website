import type { ReviewInput } from "./JsonLd";
import {
  CLINICS,
  EXPERIENCE_YEARS_DISPLAY,
  SURGERY_COUNT_DISPLAY,
} from "@/lib/clinic-info";

const SITE_URL = "https://www.drdubay.in";
const SHALBY = CLINICS.find((clinic) => clinic.id === "shalby-jaipur")!;

const SOCIAL_LINKS = [
  "https://www.facebook.com/drdheerajdubay/",
  "https://www.instagram.com/dheerajdubay1/",
  "https://www.youtube.com/@dr.dheerajdubay6664",
  "https://www.linkedin.com/in/dr-dheeraj-dubay-36399599/",
  "https://www.google.com/maps?cid=18282795943180212298",
];

// Conservative Physician entity used sitewide. Keep structured data focused on
// stable identity/practice facts; awards and comparative claims belong in
// visible, sourced content rather than being repeated as machine-readable facts.
export function PhysicianJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": `${SITE_URL}/#physician`,
    name: "Dr. Dheeraj Dubay",
    alternateName: ["डॉ. धीरज दुबे", "Dr. Dheeraj Dubey"],
    honorificPrefix: "Dr.",
    description:
      `Orthopedic and joint replacement surgeon at Shalby Hospital Jaipur with ${EXPERIENCE_YEARS_DISPLAY} years of experience and ${SURGERY_COUNT_DISPLAY} surgeries performed.`,
    url: SITE_URL,
    telephone: "+91-8955373205",
    email: "connect@drdubay.in",
    image: `${SITE_URL}/assets/images/hero.png`,
    medicalSpecialty: "Orthopedic Surgery",
    hasCredential: [
      { "@type": "EducationalOccupationalCredential", credentialCategory: "MBBS" },
      { "@type": "EducationalOccupationalCredential", credentialCategory: "MS (Orthopedic)" },
      { "@type": "EducationalOccupationalCredential", credentialCategory: "FJRS (Germany)" },
    ],
    worksFor: {
      "@type": "Hospital",
      name: "Shalby Hospital Jaipur",
      address: {
        "@type": "PostalAddress",
        streetAddress: SHALBY.address.streetAddress,
        addressLocality: SHALBY.address.addressLocality,
        addressRegion: SHALBY.address.addressRegion,
        postalCode: SHALBY.address.postalCode,
        addressCountry: SHALBY.address.addressCountry,
      },
    },
    sameAs: SOCIAL_LINKS,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// The clinic/location schema remains in the existing implementation.
export { MedicalBusinessJsonLd } from "./JsonLd";
export type { ReviewInput } from "./JsonLd";

// Deliberately disabled for pages owned by the physician/practice. Visible
// testimonials and Google rating copy may remain, but self-serving review
// markup should not be emitted as structured data.
export function AggregateRatingJsonLd(_props: {
  ratingValue: number;
  reviewCount: number;
  itemType?: "Physician" | "MedicalBusiness" | "MedicalProcedure";
  itemId?: string;
  itemName?: string;
}) {
  return null;
}

export function ReviewListJsonLd(_props: {
  reviews: ReviewInput[];
  itemReviewedName?: string;
  itemReviewedType?: "Physician" | "MedicalProcedure" | "MedicalBusiness";
  itemReviewedId?: string;
}) {
  return null;
}
