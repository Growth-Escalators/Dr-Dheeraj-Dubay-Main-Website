// Single source of truth for NAP (name, address, phone) and stable practice facts.
// Keep public pages aligned with clinic-confirmed information and avoid stale
// review aggregates or outcome claims in shared data.
// Post-migration SEO freeze baseline: 30 August 2026.

export const PRIMARY_PHONE = "+91-8955373205";
export const PRIMARY_PHONE_TEL = "+918955373205";
export const PRIMARY_PHONE_DISPLAY = "+91 89553 73205";
export const PRIMARY_EMAIL = "connect@drdubay.in";
export const SITE_URL = "https://www.drdubay.in";

export interface Clinic {
  id: string;
  name: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
    fullDisplay: string;
  };
  phone: string;
  email: string;
  hours: string;
  geo: { latitude: string; longitude: string };
  googlePlaceId: string | null;
  googleReviewUrl: string | null;
  directionsUrl: string;
}

export const CLINICS: Clinic[] = [
  {
    id: "shalby-jaipur",
    name: "Dr. Dheeraj Dubay — Shalby Hospital Jaipur",
    address: {
      streetAddress:
        "Ajmer Expressway 200 Feet Bypass Road, near Gandhi Path, Chitrakoot Sector 3, Vaishali Nagar",
      addressLocality: "Jaipur",
      addressRegion: "Rajasthan",
      postalCode: "302021",
      addressCountry: "IN",
      fullDisplay:
        "Ajmer Expressway 200 Feet Bypass Road, near Gandhi Path, Chitrakoot Sector 3, Vaishali Nagar, Jaipur, Rajasthan 302021",
    },
    phone: PRIMARY_PHONE,
    email: PRIMARY_EMAIL,
    hours: "Mon–Sat, 9:00 AM – 5:00 PM",
    geo: { latitude: "26.903488", longitude: "75.729218" },
    googlePlaceId: "ChIJPSvAWaS0bTkRSpg1PguKuf0",
    googleReviewUrl: "https://g.page/r/CUqYNT4Lirn9EBM/review",
    directionsUrl:
      "https://www.google.com/maps/place/?q=place_id:ChIJPSvAWaS0bTkRSpg1PguKuf0",
  },
  {
    id: "vidhyadhar-nagar",
    name: "Dr. Dubay Hip & Knee Clinic — Vidhyadhar Nagar",
    address: {
      streetAddress: "297, Gali Number 6, Kusum Vihar, Vidhyadhar Nagar",
      addressLocality: "Jaipur",
      addressRegion: "Rajasthan",
      postalCode: "302017",
      addressCountry: "IN",
      fullDisplay:
        "297, Gali Number 6, Kusum Vihar, Vidhyadhar Nagar, Jaipur, Rajasthan 302017",
    },
    phone: PRIMARY_PHONE,
    email: PRIMARY_EMAIL,
    hours: "Mon–Sat, 6:00 PM – 8:00 PM",
    geo: { latitude: "26.9633", longitude: "75.7693" },
    googlePlaceId: null,
    googleReviewUrl: null,
    directionsUrl:
      "https://www.google.com/maps/search/?api=1&query=Dr.+Dubay+Hip+%26+Knee+Clinic+Vidhyadhar+Nagar+Jaipur",
  },
];

export const SOCIAL_LINKS = [
  "https://www.facebook.com/drdheerajdubay/",
  "https://www.instagram.com/dheerajdubay1/",
  "https://www.youtube.com/@dr.dheerajdubay6664",
  "https://www.linkedin.com/in/dr-dheeraj-dubay-36399599/",
];

// Google rating/review count intentionally has no static source-of-truth here.
// It will be supplied dynamically from the owned GBP only after official API
// approval, so the website cannot silently publish a stale aggregate.

// Clinic-confirmed current practice statistics — August 2026.
// SURGERY_COUNT is the career-wide total surgery figure, not a knee-only or
// joint-replacement-only count.
export const SURGERY_COUNT = 40000;
export const SURGERY_COUNT_DISPLAY = "40,000+";
export const EXPERIENCE_YEARS = 24;
export const EXPERIENCE_YEARS_DISPLAY = "24";

// Verified single-day record used across the current site:
// 34 joint replacements in total on 9 May 2024 = 33 knee + 1 hip.
export const RECORD_SURGERIES_IN_A_DAY = 34;
export const RECORD_KNEE_REPLACEMENTS_IN_A_DAY = 33;
export const RECORD_HIP_REPLACEMENTS_IN_A_DAY = 1;
export const RECORD_TOTAL_REPLACEMENTS_IN_A_DAY = 34;

// Legacy compatibility exports. These figures are not used as public homepage
// proof points until their source inventory is complete.
export const PATIENTS_TREATED = 60000;
export const PATIENTS_TREATED_DISPLAY = "60,000+";
export const NATIONAL_AWARDS = 10;
export const INTERNATIONAL_CONFERENCES = 5;

// Implant longevity depends on implant, patient factors, activity and follow-up.
// Keep this compatibility export out of outcome promises in current page copy.
export const IMPLANT_LIFESPAN_YEARS = "20–25 years";
