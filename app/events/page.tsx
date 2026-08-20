import { generatePageMetadata } from "@/lib/seo.config";
import { db } from "@/lib/db";

export const revalidate = 3600;
import EventsClient from "./EventsClient";

export const metadata = generatePageMetadata({
  title: "Events & Activities | Dr. Dheeraj Dubay",
  description: "Latest events, health camps and activities by Dr. Dheeraj Dubay including Golden Warriors Walkathon and orthopedic awareness programs.",
  slug: "events",
});

// The Event model doesn't carry a structured start/end date — only
// createdAt — so we emit Event schema with createdAt as startDate and the
// clinic as the default location. Limited completeness but enough for
// Google to surface them as events in the knowledge panel.
async function buildEventSchema() {
  try {
    const events = await db.event.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      take: 20,
    });
    if (!events.length) return null;

    return events.map((e) => ({
      "@context": "https://schema.org",
      "@type": "Event",
      name: e.title,
      description: e.description,
      startDate: e.createdAt.toISOString(),
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      ...(e.imageUrl ? { image: e.imageUrl } : {}),
      location: {
        "@type": "Place",
        name: "Shalby Hospital Jaipur",
        // Full GBP-matching address (2026-07-24 NAP alignment pass) — see
        // lib/clinic-info.ts for the canonical source.
        address: {
          "@type": "PostalAddress",
          streetAddress: "Ajmer Expressway 200 Feet Bypass Road, near Gandhi Path, Chitrakoot Sector 3, Vaishali Nagar",
          addressLocality: "Jaipur",
          addressRegion: "Rajasthan",
          postalCode: "302021",
          addressCountry: "IN",
        },
      },
      organizer: {
        "@type": "Person",
        name: "Dr. Dheeraj Dubay",
        url: "https://www.drdubay.in",
      },
    }));
  } catch {
    return null;
  }
}

export default async function EventsPage() {
  const eventSchema = await buildEventSchema();
  return (
    <>
      {eventSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
        />
      ) : null}
      <EventsClient />
    </>
  );
}
