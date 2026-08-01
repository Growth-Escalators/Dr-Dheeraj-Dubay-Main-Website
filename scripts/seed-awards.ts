/**
 * scripts/seed-awards.ts
 * ---------------------------------------------------------------------------
 * Seeds the `Award` collection from the content that used to be hardcoded in
 * two places in this repo:
 *
 *   1. lib/awards.ts                       -> the homepage showcase carousel
 *   2. components/Awards/AwardsSection.tsx -> the "Recognised by India and the
 *                                             World" year-grouped timeline
 *
 * Both described the same subject in two shapes, which is why the site could
 * (and did) name one award two different ways. One row can now feed either
 * surface or both, via showInShowcase / showInTimeline.
 *
 * IDEMPOTENT. Keyed on `name` with an explicit find-then-create/update rather
 * than a Prisma `.upsert()`, because `name` is not a unique index — running
 * this twice updates the existing rows instead of duplicating them. Fields a
 * human may have edited in the CRM (highlights, imageUrl, ordering) are NOT
 * overwritten on re-run; only rows that don't exist yet are created in full.
 *
 * Usage
 * -----
 *   npm run seed:awards -- --dry-run   # parses + prints, touches no DB
 *   npm run seed:awards                # real write, needs DATABASE_URL
 */

const DRY_RUN = process.argv.includes("--dry-run");

interface SeedAward {
  name: string;
  issuingBody: string;
  year: string;
  oneLine: string;
  imageUrl?: string;
  highlights: string[];
  showInShowcase: boolean;
  showcaseOrder?: number;
  showInTimeline: boolean;
  timelineTrack: "professional" | "academic";
  timelineYear?: string;
  isHighlighted?: boolean;
}

// --- 1. The six showcase awards (was lib/awards.ts AWARDS) ------------------
// These also appear in the timeline, under their own year.
const SHOWCASE: SeedAward[] = [
  {
    name: "Forbes World Record",
    issuingBody: "Forbes",
    year: "2024",
    oneLine:
      "34 joint replacement surgeries performed in a single day — a global first.",
    highlights: ["34 in a single day", "A global first", "Forbes acknowledged"],
    showInShowcase: true,
    showcaseOrder: 1,
    showInTimeline: true,
    timelineTrack: "professional",
    timelineYear: "2024",
    isHighlighted: true,
  },
  {
    name: "UK Honour Recognition",
    issuingBody: "Indo-UK Forum",
    year: "2024",
    oneLine:
      "International recognition for excellence in robotic joint replacement surgery.",
    highlights: [
      "International recognition",
      "Robotic joint excellence",
      "Leadership in healthcare",
    ],
    showInShowcase: true,
    showcaseOrder: 2,
    showInTimeline: true,
    timelineTrack: "professional",
    timelineYear: "2024",
  },
  {
    name: "ET Inspiring Leaders Award",
    issuingBody: "Economic Times",
    year: "2025",
    oneLine: "Honoured as one of India's most inspiring healthcare leaders.",
    highlights: ["Economic Times", "National platform", "Healthcare leadership"],
    showInShowcase: true,
    showcaseOrder: 3,
    showInTimeline: true,
    timelineTrack: "professional",
    timelineYear: "2025",
  },
  {
    name: "Most Trusted Joint Replacement Surgeon of the Year",
    issuingBody: "Healthcare Achievers",
    year: "2023",
    oneLine: "Industry recognition based on patient outcomes and peer review.",
    highlights: [
      "Peer reviewed",
      "Patient outcomes",
      "Healthcare Achievers",
    ],
    showInShowcase: true,
    showcaseOrder: 4,
    showInTimeline: true,
    timelineTrack: "professional",
    timelineYear: "2023",
  },
  {
    name: "Golden Warriors Walkathon",
    issuingBody: "Dr. Dheeraj Dubay Foundation",
    year: "Annual",
    oneLine:
      "Annual walk celebrating post-surgery patients who've reclaimed mobility.",
    highlights: ["Held annually", "Post-surgery patients", "Mobility reclaimed"],
    showInShowcase: true,
    showcaseOrder: 5,
    // Not a dated award — it would sit oddly in a year-grouped timeline.
    showInTimeline: false,
    timelineTrack: "professional",
  },
  {
    name: "Health Minister Award",
    issuingBody: "Government of Rajasthan",
    year: "3 consecutive years",
    oneLine: "State recognition for contributions to orthopedic healthcare.",
    highlights: [
      "Government of Rajasthan",
      "3 consecutive years",
      "Orthopaedic healthcare",
    ],
    showInShowcase: true,
    showcaseOrder: 6,
    showInTimeline: false,
    timelineTrack: "professional",
  },
];

// --- 2. Timeline-only rows (was AwardsSection.tsx) --------------------------
// Rows already covered by SHOWCASE above are deliberately not repeated.
const TIMELINE_ONLY: SeedAward[] = [
  {
    name: "Most Trusted Joint Replacement Surgeon of North India",
    issuingBody: "Central Ministers S.P. Bhagel & Athawale, Delhi",
    year: "2024",
    oneLine:
      "Felicitated in Delhi as the most trusted joint replacement surgeon of North India.",
    highlights: [],
    showInShowcase: false,
    showInTimeline: true,
    timelineTrack: "professional",
    timelineYear: "2024",
  },
  {
    name: "UP Ratan Samman Award",
    issuingBody: "Central Minister Giriraj Singh",
    year: "2024",
    oneLine: "State honour presented by Central Minister Giriraj Singh.",
    highlights: [],
    showInShowcase: false,
    showInTimeline: true,
    timelineTrack: "professional",
    timelineYear: "2024",
  },
  {
    name: "ET Leadership Excellence Award",
    issuingBody: "Times of India, presented by the Governor of Rajasthan",
    year: "2023",
    oneLine:
      "Leadership excellence in healthcare, presented by the Governor of Rajasthan.",
    highlights: [],
    showInShowcase: false,
    showInTimeline: true,
    timelineTrack: "professional",
    timelineYear: "2023",
  },
  {
    name: "Big FM Excellence Award — Hip & Knee Replacement, Rajasthan",
    issuingBody: "Big FM",
    year: "2023",
    oneLine: "Regional excellence award for hip and knee replacement surgery.",
    highlights: [],
    showInShowcase: false,
    showInTimeline: true,
    timelineTrack: "professional",
    timelineYear: "2023",
  },
  {
    name: "International Business Award",
    issuingBody: "Presented by Sonu Sood, Delhi",
    year: "2023",
    oneLine: "International business award presented in Delhi.",
    highlights: [],
    showInShowcase: false,
    showInTimeline: true,
    timelineTrack: "professional",
    timelineYear: "2023",
  },
  {
    name: "Dainik Bhaskar Healthcare Award — Best Joint Replacement Surgeon of Rajasthan",
    issuingBody: "Dainik Bhaskar",
    year: "2022",
    oneLine: "Named best joint replacement surgeon of Rajasthan.",
    highlights: [],
    showInShowcase: false,
    showInTimeline: true,
    timelineTrack: "professional",
    timelineYear: "2022",
  },
  // Academic track
  {
    name: "International Conference on Joint Replacement Surgery — London",
    issuingBody: "Faculty role",
    year: "2024",
    oneLine: "Faculty at the International Conference on Joint Replacement Surgery.",
    highlights: [],
    showInShowcase: false,
    showInTimeline: true,
    timelineTrack: "academic",
    timelineYear: "2024",
  },
  {
    name: "European Orthopedic Society Annual Meeting — Berlin",
    issuingBody: "Faculty role",
    year: "2023",
    oneLine: "Faculty at the European Orthopedic Society annual meeting.",
    highlights: [],
    showInShowcase: false,
    showInTimeline: true,
    timelineTrack: "academic",
    timelineYear: "2023",
  },
  {
    name: "Asia Pacific Joint Replacement Summit — Singapore",
    issuingBody: "Faculty role",
    year: "2023",
    oneLine: "Faculty at the Asia Pacific Joint Replacement Summit.",
    highlights: [],
    showInShowcase: false,
    showInTimeline: true,
    timelineTrack: "academic",
    timelineYear: "2023",
  },
  {
    name: "Indian Orthopedic Association National Conference — Mumbai",
    issuingBody: "Faculty role",
    year: "2022",
    oneLine: "Faculty at the Indian Orthopedic Association national conference.",
    highlights: [],
    showInShowcase: false,
    showInTimeline: true,
    timelineTrack: "academic",
    timelineYear: "2022",
  },
  {
    name: "World Congress on Orthopedic Surgery — Dubai",
    issuingBody: "Faculty role",
    year: "2022",
    oneLine: "Faculty at the World Congress on Orthopedic Surgery.",
    highlights: [],
    showInShowcase: false,
    showInTimeline: true,
    timelineTrack: "academic",
    timelineYear: "2022",
  },
];

const ALL: SeedAward[] = [...SHOWCASE, ...TIMELINE_ONLY];

async function main() {
  console.log(`\nAwards seed — ${ALL.length} rows`);
  console.log(
    `  ${SHOWCASE.length} showcase + ${TIMELINE_ONLY.length} timeline-only\n`,
  );

  if (DRY_RUN) {
    for (const a of ALL) {
      const surfaces = [
        a.showInShowcase ? `showcase#${a.showcaseOrder ?? "-"}` : null,
        a.showInTimeline ? `timeline/${a.timelineTrack}/${a.timelineYear}` : null,
      ]
        .filter(Boolean)
        .join(" + ");
      console.log(`  • ${a.name}\n      ${a.issuingBody} · ${a.year} — ${surfaces}`);
    }
    console.log("\nDry run — nothing written.\n");
    return;
  }

  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set. Use --dry-run to parse only.");
  }

  const { PrismaClient } = await import("@prisma/client");
  const db = new PrismaClient();

  let created = 0;
  let updated = 0;

  try {
    for (const a of ALL) {
      const existing = await db.award.findFirst({ where: { name: a.name } });

      if (!existing) {
        await db.award.create({
          data: {
            name: a.name,
            issuingBody: a.issuingBody,
            year: a.year,
            oneLine: a.oneLine,
            imageUrl: a.imageUrl ?? null,
            highlights: a.highlights,
            showInShowcase: a.showInShowcase,
            showcaseOrder: a.showcaseOrder ?? null,
            showInTimeline: a.showInTimeline,
            timelineTrack: a.timelineTrack,
            timelineYear: a.timelineYear ?? null,
            isHighlighted: a.isHighlighted ?? false,
          },
        });
        created++;
        console.log(`  + created  ${a.name}`);
        continue;
      }

      // Re-run: refresh only the descriptive copy. Ordering, images and
      // highlights may have been curated in the CRM since the first seed —
      // clobbering those would make this script destructive to run twice.
      await db.award.update({
        where: { id: existing.id },
        data: {
          issuingBody: a.issuingBody,
          year: a.year,
          oneLine: a.oneLine,
        },
      });
      updated++;
      console.log(`  ~ updated  ${a.name} (copy only; ordering/image kept)`);
    }

    console.log(`\nDone. ${created} created, ${updated} updated.\n`);
  } finally {
    await db.$disconnect();
  }
}

main().catch((e) => {
  console.error("\nSeed failed:", e);
  process.exit(1);
});
