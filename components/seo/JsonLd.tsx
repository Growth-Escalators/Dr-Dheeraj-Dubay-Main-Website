// JSON-LD for the doctor + clinic locations.
//
// Clinic NAP and coordinates come from the shared clinic-info source so the
// visible locations and structured data cannot drift apart.

import { SURGERY_COUNT_DISPLAY, EXPERIENCE_YEARS_DISPLAY, CLINICS } from "@/lib/clinic-info"

const SITE_URL = "https://www.drdubay.in"
const PHONE = "+91-8955373205"
const EMAIL = "connect@drdubay.in"
const HERO_IMAGE = `${SITE_URL}/assets/images/hero.png`

const SHALBY = CLINICS.find((c) => c.id === "shalby-jaipur")!
const VIDHYADHAR_NAGAR = CLINICS.find((c) => c.id === "vidhyadhar-nagar")!

const SOCIAL_LINKS = [
  "https://www.facebook.com/drdheerajdubay/",
  "https://www.instagram.com/dheerajdubay1/",
  "https://www.youtube.com/@dr.dheerajdubay6664",
  "https://www.linkedin.com/in/dr-dheeraj-dubay-36399599/",
]

const GBP_MAPS_URL = "https://www.google.com/maps?cid=18282795943180212298"

const AREA_SERVED = [
  "Jaipur", "Bikaner", "Kota", "Udaipur", "Ajmer", "Sikar", "Alwar",
  "Jodhpur", "Bharatpur", "Jhunjhunu", "Churu", "Sawai Madhopur", "Tonk",
  "Dausa", "Nagaur", "Hanumangarh", "Pali", "Dholpur", "Bundi",
  "Agra", "Mathura",
]

const PROCEDURES_OFFERED = [
  "Robotic Knee Replacement",
  "Zero-Technique Knee Replacement",
  "Total Knee Replacement",
  "Partial Knee Replacement",
  "Bilateral Knee Replacement",
  "Revision Knee Replacement",
  "Hip Replacement Surgery",
  "Computer Navigation Surgery",
  "Minimally Invasive Joint Surgery",
]

// Keep the machine-readable Physician entity focused on stable identity and
// practice facts. Awards, comparative claims and outcome claims should live in
// visible pages with supporting evidence rather than be repeated as entity facts.
export const PhysicianJsonLd = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": `${SITE_URL}/#physician`,
    "name": "Dr. Dheeraj Dubay",
    "alternateName": ["डॉ. धीरज दुबे", "Dr. Dheeraj Dubey"],
    "honorificPrefix": "Dr.",
    "description":
      `Orthopedic and joint replacement surgeon at Shalby Hospital Jaipur with ${EXPERIENCE_YEARS_DISPLAY} years of experience and ${SURGERY_COUNT_DISPLAY} surgeries performed.`,
    "url": SITE_URL,
    "telephone": PHONE,
    "email": EMAIL,
    "image": HERO_IMAGE,
    "hasCredential": [
      { "@type": "EducationalOccupationalCredential", "credentialCategory": "MBBS" },
      { "@type": "EducationalOccupationalCredential", "credentialCategory": "MS (Orthopedic)" },
      { "@type": "EducationalOccupationalCredential", "credentialCategory": "FJRS (Germany)" },
    ],
    "medicalSpecialty": "Orthopedic Surgery",
    "knowsAbout": PROCEDURES_OFFERED,
    "areaServed": AREA_SERVED.map((name) => ({ "@type": "City", name })),
    "worksFor": {
      "@type": "Hospital",
      "name": "Shalby Hospital Jaipur",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": SHALBY.address.streetAddress,
        "addressLocality": SHALBY.address.addressLocality,
        "addressRegion": SHALBY.address.addressRegion,
        "postalCode": SHALBY.address.postalCode,
        "addressCountry": SHALBY.address.addressCountry,
      },
    },
    "sameAs": [...SOCIAL_LINKS, GBP_MAPS_URL],
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export const MedicalBusinessJsonLd = () => {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["MedicalClinic", "LocalBusiness"],
        "@id": `${SITE_URL}/#clinic-shalby`,
        "name": "Dr. Dheeraj Dubay — Shalby Hospital Jaipur",
        "url": `${SITE_URL}/locations`,
        "telephone": PHONE,
        "email": EMAIL,
        "image": HERO_IMAGE,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": SHALBY.address.streetAddress,
          "addressLocality": SHALBY.address.addressLocality,
          "addressRegion": SHALBY.address.addressRegion,
          "postalCode": SHALBY.address.postalCode,
          "addressCountry": SHALBY.address.addressCountry,
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": SHALBY.geo.latitude,
          "longitude": SHALBY.geo.longitude,
        },
        "medicalSpecialty": "Orthopedic Surgery",
        "availableService": PROCEDURES_OFFERED.map((name) => ({
          "@type": "MedicalProcedure",
          "name": name,
        })),
        "areaServed": AREA_SERVED.map((name) => ({ "@type": "City", name })),
        "physician": { "@id": `${SITE_URL}/#physician` },
        "sameAs": [
          "https://www.google.com/maps/place/?q=place_id:ChIJPSvAWaS0bTkRSpg1PguKuf0",
          ...SOCIAL_LINKS,
        ],
      },
      {
        "@type": ["MedicalClinic", "LocalBusiness"],
        "@id": `${SITE_URL}/#clinic-vidhyadhar-nagar`,
        "name": "Dr. Dubay Hip & Knee Clinic — Vidhyadhar Nagar",
        "url": `${SITE_URL}/locations`,
        "telephone": PHONE,
        "email": EMAIL,
        "image": HERO_IMAGE,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": VIDHYADHAR_NAGAR.address.streetAddress,
          "addressLocality": VIDHYADHAR_NAGAR.address.addressLocality,
          "addressRegion": VIDHYADHAR_NAGAR.address.addressRegion,
          "postalCode": VIDHYADHAR_NAGAR.address.postalCode,
          "addressCountry": VIDHYADHAR_NAGAR.address.addressCountry,
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": VIDHYADHAR_NAGAR.geo.latitude,
          "longitude": VIDHYADHAR_NAGAR.geo.longitude,
        },
        "medicalSpecialty": "Orthopedic Surgery",
        "physician": { "@id": `${SITE_URL}/#physician` },
        "sameAs": SOCIAL_LINKS,
      },
    ],
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Visible Google ratings/reviews may be shown to users, but the practice's own
// pages must not emit self-serving AggregateRating/Review rich-result markup.
export const AggregateRatingJsonLd = (_props: {
  ratingValue: number
  reviewCount: number
  itemType?: "Physician" | "MedicalBusiness" | "MedicalProcedure"
  itemId?: string
  itemName?: string
}) => null

export interface ReviewInput {
  id: string
  patientName: string
  city: string
  procedure: string
  rating: number
  text: string
  dateOfReview: Date | string
}

export const ReviewListJsonLd = (_props: {
  reviews: ReviewInput[]
  itemReviewedName?: string
  itemReviewedType?: "Physician" | "MedicalProcedure" | "MedicalBusiness"
  itemReviewedId?: string
}) => null
