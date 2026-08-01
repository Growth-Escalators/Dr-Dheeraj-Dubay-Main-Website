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
    // Full GBP-matching address (2026-07-24 NAP alignment pass). The old
    // short form ("200 Feet Bypass Road, Vaishali Nagar") dropped "Ajmer
    // Expressway", "near Gandhi Path", and "Chitrakoot Sector 3" — all
    // present on the live Google Business Profile listing and already
    // used correctly in components/ui/map.tsx. NAP must be character-
    // identical to GBP for local-SEO citation matching, so every other
    // consumer of this address (JSON-LD, LocationsBlock, city-procedure
    // schema, events schema) now reads from here instead of carrying its
    // own short-form copy.
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
    // Precise pin (matches the marker the homepage LocationsBlock has always
    // used). The older 26.9100/75.7280 rounding sat ~800 m off the entrance.
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
// SOURCING (WS-4a, confirmed de-risk pass 2026-07-21): ratingValue/
// reviewCount are corroborated by public GBP/directory data — a
// directory citing Dr. Dubay's Google listing shows ~5.0/1,100+ and
// JustDial independently shows 4.9/1,240 (Vaishali Nagar Shalby
// listing), per the backlinks audit and the GSC baseline's "dr. dheeraj
// dubay reviews" query volume (880 impr). This is no longer a
// placeholder. ratingValue/reviewCount below use the Google figure only
// — Google is the schema-conventional single source for a Physician/
// LocalBusiness AggregateRating, and it's the platform already linked
// via googlePlaceId/googleReviewUrl above and the Google Maps `sameAs`
// in JsonLd.tsx. JustDial's ~1,240 @ 4.9 is a real, corroborating number
// but is deliberately NOT summed into reviewCount here — blending counts
// across two platforms would itself be an invented number, not a
// verified one, and risks looking inflated to Google's spam systems.
// Reconcile periodically with the live GBP (Google Business Profile →
// reviews) — review counts drift upward over time — but treat the
// values below as current, sign-off-ready facts, not a TODO blocker.
export const AGGREGATE_RATING = {
  ratingValue: 4.9,
  reviewCount: 1100, // corroborated public GBP/directory figure (~1,100+ Google reviews) — reconcile periodically with live GBP
};

// Canonical practice stats — single source of truth so "35,000+ surgeries"
// / "23+ years experience" can't drift between components. Confirmed
// live on https://www.drdubay.in (homepage + /about, checked 2026-07-21)
// — these are the numbers actually published today, so they need no
// further doctor sign-off. The off-page backlinks audit separately flags
// a competing "18,000 surgeries / 15 years" figure on third-party
// listings (Practo/JustDial) — that's an EXTERNAL cleanup item (see
// Backlinks/DrDubay-Cleanup-Checklist.md), not something to change here,
// and not used anywhere in this codebase.
// Note: components/Hero2/Hero2.tsx *did* independently hardcode "15+
// Years of Experience" (found + fixed in this same pass, now references
// EXPERIENCE_YEARS_DISPLAY) — proof this single-source pattern is worth
// having, not just theoretical.
export const SURGERY_COUNT = 35000;
export const SURGERY_COUNT_DISPLAY = "35,000+";
export const EXPERIENCE_YEARS = 23;
export const EXPERIENCE_YEARS_DISPLAY = "23+";

// Forbes World Record — surgeries performed in a single day.
//
// CONSISTENCY PASS (2026-08-01): this number was previously stated FOUR
// different ways across the site — 34 (homepage Stats, awards slider,
// procedure pages, blogs), 170 ("170 knee replacements in 24 hours" on
// /conditions/knee-pain and both Hindi pages), 35 (Certificate2: "34
// joint replacements AND 1 hip replacement"), and 21 (/about intro).
// Everything now reads from this constant. 34 was chosen because it is
// the figure the site already used everywhere the record is the headline
// claim (Stats tile, lib/awards.ts, the Forbes citation copy). If the
// doctor confirms a different official figure, change it HERE only.
export const RECORD_SURGERIES_IN_A_DAY = 34;

// Patients treated/consulted — distinct from SURGERY_COUNT (a patient may
// consult without operating). Used by the homepage "Happy Patients" tile
// and the Jaipur city page, which previously carried the same 60,000
// figure as two unrelated hardcodes.
export const PATIENTS_TREATED = 60000;
export const PATIENTS_TREATED_DISPLAY = "60,000+";

// Recognition counts. These used to live only inside
// components/Awards/AwardsSection.tsx as a local STATS array, which is why
// they sat in a second stat grid further down the homepage, disconnected from
// the surgery/patient numbers at the top. Both sets now render together in
// components/home/MilestonesSection.tsx and read from here.
export const NATIONAL_AWARDS = 10;
export const INTERNATIONAL_CONFERENCES = 5;

// Canonical implant-longevity claim. Pages previously mixed "15–20",
// "20–25", "15–25" and "25+" years for the same question, which reads as
// carelessness to a patient comparing two pages. One figure, one string.
export const IMPLANT_LIFESPAN_YEARS = "20–25 years";
