// Single source of truth for NAP (name, address, phone) — used by every
// JSON-LD schema component AND by every UI block that shows clinic
// contact info. Keeping these strings in one place guarantees Google
// sees byte-identical info across every page (a local-SEO requirement).

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
      streetAddress: "Shalby Hospital, 200 Feet Bypass Road, Vaishali Nagar",
      addressLocality: "Jaipur",
      addressRegion: "Rajasthan",
      postalCode: "302021",
      addressCountry: "IN",
      fullDisplay:
        "200 Feet Bypass Road, Vaishali Nagar, Jaipur, Rajasthan 302021",
    },
    phone: PRIMARY_PHONE,
    email: PRIMARY_EMAIL,
    hours: "Mon–Sat, 9:00 AM – 5:00 PM",
    geo: { latitude: "26.9100", longitude: "75.7280" },
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
    googlePlaceId: null, // TODO(jatin): get Place ID for second clinic
    googleReviewUrl: null, // TODO(jatin): get review URL for second clinic
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

// Hardcoded canonical aggregate rating — derived from Google Business
// Profile. Authoritative for AggregateRating schema; the DB-driven
// PatientReview content still renders as testimonial body, this just
// drives the star digits + count.
//
// TODO(jatin): confirm current GBP review count and update REVIEW_COUNT
// before the next major SEO push. Update RATING_VALUE if GBP value drifts.
export const AGGREGATE_RATING = {
  ratingValue: 4.9,
  reviewCount: 100, // PLACEHOLDER — replace with actual GBP review count
};
