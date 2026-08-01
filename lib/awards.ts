// Awards shown on the homepage AwardsShowcase and the AwardsSection timeline.
//
// SOURCE OF TRUTH IS NOW THE DATABASE (`Award` model, edited at /admin/awards
// in the CRM). The arrays below are the FALLBACK: if the DB is unreachable or
// the table is empty, the site renders exactly what it rendered before the CMS
// existed instead of a blank section. Read via getAwards()/getTimeline() at the
// bottom of this file — don't import AWARDS directly into a component.
//
// NOTE on `image`: the homepage showcase no longer renders per-award photos.
// It keeps ONE fixed portrait of the doctor while the card cycles through the
// awards, so these paths are currently unused (nothing was ever uploaded to
// /public/assets/awards/ either). The field is kept because /achievements-side
// work may want it; see public/assets/awards/README.md.

export interface Award {
  id: string;
  name: string;
  issuingBody: string;
  year: string;
  oneLine: string;
  image: string; // path under /public/ — see note above
  // Three short proof chips shown on the homepage AwardsShowcase card.
  // Every one restates something already published elsewhere on this site
  // (lib/clinic-info.ts stats, the AwardsSection timeline, the procedure
  // pages) — nothing here is a new claim.
  highlights: [string, string, string];
}

export const AWARDS: Award[] = [
  {
    id: "forbes-world-record",
    name: "Forbes World Record",
    issuingBody: "Forbes",
    year: "2024",
    oneLine: "34 joint replacement surgeries performed in a single day — a global first.",
    image: "/assets/awards/forbes-world-record.jpg",
    highlights: ["34 in a single day", "A global first", "Forbes acknowledged"],
  },
  {
    id: "uk-honour",
    // Named to match the Physician JSON-LD award list in
    // components/seo/JsonLd.tsx ("UK Honour Recognition 2024"), which is the
    // name the live site publishes. The slider previously called the same
    // award "Indo-UK Leadership Award" — schema and visible copy naming one
    // award two different things is exactly what confuses Google.
    name: "UK Honour Recognition",
    issuingBody: "Indo-UK Forum",
    year: "2024",
    oneLine:
      "International recognition for excellence in robotic joint replacement surgery.",
    image: "/assets/awards/uk-honour.jpg",
    highlights: [
      "International recognition",
      "Robotic joint excellence",
      "Leadership in healthcare",
    ],
  },
  {
    id: "et-inspiring-leaders",
    name: "ET Inspiring Leaders Award",
    issuingBody: "Economic Times",
    year: "2025",
    oneLine:
      "Honoured as one of India's most inspiring healthcare leaders.",
    image: "/assets/awards/et-inspiring-leaders.jpg",
    highlights: ["Economic Times", "National platform", "Healthcare leadership"],
  },
  {
    id: "most-trusted-surgeon",
    // Named to match the 2023 entry in the AwardsSection timeline. The
    // separate 2024 "Most Trusted Joint Replacement Surgeon of North India"
    // (presented by Central Ministers Bhagel & Athawale) is a different
    // award — the two were previously conflated here, so the slider said
    // 2023 while the timeline and the Why-Choose card said 2024.
    name: "Most Trusted Joint Replacement Surgeon of the Year",
    issuingBody: "Healthcare Achievers",
    year: "2023",
    oneLine:
      "Industry recognition based on patient outcomes and peer review.",
    image: "/assets/awards/most-trusted-surgeon.jpg",
    highlights: ["Patient outcomes", "Peer reviewed", "North India"],
  },
  {
    id: "golden-warriors",
    name: "Golden Warriors Walkathon",
    issuingBody: "Dr. Dheeraj Dubay Foundation",
    year: "Annual",
    oneLine:
      "Annual walk celebrating post-surgery patients who've reclaimed mobility.",
    image: "/assets/awards/golden-warriors.jpg",
    highlights: ["Held annually", "Post-surgery patients", "Mobility reclaimed"],
  },
  {
    id: "health-minister-award",
    name: "Health Minister Award",
    issuingBody: "Government of Rajasthan",
    year: "3 consecutive years",
    oneLine: "State recognition for contributions to orthopedic healthcare.",
    image: "/assets/awards/health-minister-award.jpg",
    highlights: [
      "Government of Rajasthan",
      "3 consecutive years",
      "Orthopaedic healthcare",
    ],
  },
];

// ---------------------------------------------------------------------------
// DB-backed accessors
// ---------------------------------------------------------------------------

import { db } from "@/lib/db";

export interface TimelineEntry {
  year: string;
  items: { text: string; highlight: boolean }[];
}

/**
 * Awards for the homepage showcase carousel, in the order set in the CRM.
 * Falls back to the static AWARDS array when the table is empty or the DB
 * is unreachable — the section degrades to yesterday's content, never blank.
 */
export async function getShowcaseAwards(): Promise<Award[]> {
  try {
    const rows = await db.award.findMany({
      where: { showInShowcase: true },
      orderBy: [{ showcaseOrder: "asc" }, { createdAt: "asc" }],
    });
    if (!rows.length) return AWARDS;

    return rows.map((r) => ({
      id: r.id,
      name: r.name,
      issuingBody: r.issuingBody,
      year: r.year,
      oneLine: r.oneLine,
      image: r.imageUrl ?? "",
      // The card renders exactly three chips; pad so a half-filled CRM row
      // can't collapse the layout.
      highlights: [
        r.highlights[0] ?? "",
        r.highlights[1] ?? "",
        r.highlights[2] ?? "",
      ] as [string, string, string],
    }));
  } catch (e) {
    console.error("[awards/getShowcaseAwards]", e);
    return AWARDS;
  }
}

/**
 * Timeline rows for AwardsSection, grouped by year, newest year first.
 * `track` selects the column: "professional" or "academic".
 */
export async function getAwardTimeline(
  track: "professional" | "academic",
): Promise<TimelineEntry[] | null> {
  try {
    const rows = await db.award.findMany({
      where: { showInTimeline: true, timelineTrack: track },
      orderBy: [{ timelineYear: "desc" }, { showcaseOrder: "asc" }],
    });
    if (!rows.length) return null; // caller falls back to its static list

    const byYear = new Map<string, TimelineEntry>();
    for (const r of rows) {
      const year = r.timelineYear || r.year;
      if (!byYear.has(year)) byYear.set(year, { year, items: [] });
      byYear.get(year)!.items.push({
        // "Award name — issuing body" is how the hardcoded timeline read.
        text: r.issuingBody ? `${r.name} — ${r.issuingBody}` : r.name,
        highlight: r.isHighlighted,
      });
    }

    // Array.from rather than spreading the iterator — this project's tsconfig
    // targets es5 without downlevelIteration.
    return Array.from(byYear.values()).sort((a, b) =>
      b.year.localeCompare(a.year),
    );
  } catch (e) {
    console.error("[awards/getAwardTimeline]", e);
    return null;
  }
}
