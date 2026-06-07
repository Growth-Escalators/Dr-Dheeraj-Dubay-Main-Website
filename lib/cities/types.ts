// Rich per-city page schema. Each Tier-1 city has its own data file
// exporting a CityPage object. The [cityProcedure] route reads from
// lib/cities/index.ts which aggregates all per-city files and falls
// back to the legacy lib/city-pages.ts for un-migrated slugs.

export interface CityFAQ {
  q: string;
  a: string;
}

export interface CityLodging {
  name: string;
  notes: string; // e.g. "5 min walk from Shalby; ₹2,500/night standard room"
}

export interface CityPage {
  // Identity
  slug: string; // e.g. "knee-replacement-kota"
  city: string; // e.g. "Kota"
  procedure: string; // e.g. "Knee Replacement"
  procedureSlug: string; // e.g. "knee-replacement" — matches PROCEDURE_PAGES key

  // SEO — optional; if absent, the route derives from legacy CITY_PAGES
  title?: string;
  description?: string;
  h1?: string;

  // Distance + travel
  distance: string; // e.g. "245 km from Jaipur"
  travelGuidance: string; // 2-3 sentences on how to reach Shalby from this city

  // Body content
  intro: string; // 200-250 words unique to this city
  whyTravel: string; // 1-2 paragraphs: why patients from this city come to Jaipur for surgery

  // Pre/post-op stay options near the clinic
  lodging: CityLodging[];

  // Clinic visit
  campNote: string; // OPD camp info or "consult by appointment"

  // Trust signal
  patientNote: string; // brief social-proof line specific to this city

  // SEO long-tail
  faqs: CityFAQ[]; // 3-5 city-specific Qs

  // Hindi mirror slug, if a Hindi version of this city's page exists
  hindiSlug?: string;
}
