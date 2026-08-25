import { generatePageMetadata } from "@/lib/seo.config";
import React from "react";
import { PROCEDURE_PAGES } from "@/lib/procedure-pages";
import { ProcedureCard } from "@/components/ui/ProcedureCard";
import FinalCTA from "@/components/home/FinalCTA";
import { SITE_URL } from "@/lib/clinic-info";

export const revalidate = 3600;

// GSC refresh (2026-08-25): /services has 7,330 impressions at position 2.8
// but only 0.6% CTR, and much of its visibility overlaps branded/homepage
// queries. Keep this hub focused on treatment comparison while the homepage
// owns broad "orthopedic doctor in Jaipur" intent.
export const metadata = generatePageMetadata({
  title: "Knee, Hip & Robotic Surgery in Jaipur | Dr. Dheeraj Dubay",
  description:
    "Compare knee replacement, hip replacement, robotic surgery and revision procedures in Jaipur. See suitability, recovery and consultation information.",
  slug: "services",
});

// Server-rendered JSON-LD (GE SEO standard: must be in the raw HTML, not
// client-injected) for the 9 procedures actually listed on this page as
// ProcedureCards below — name/description/url are pulled straight from
// PROCEDURE_PAGES, so this can never list something not visible on the
// page. `provider` reuses the existing MedicalClinic node's @id
// (defined once in components/seo/JsonLd.tsx's MedicalBusinessJsonLd,
// rendered on the homepage) instead of redeclaring name/address/phone
// here — the same connected-@id-graph pattern already used in
// app/[cityProcedure]/page.tsx for the physician reference.
const proceduresListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Joint Replacement Procedures Offered by Dr. Dheeraj Dubay",
  url: `${SITE_URL}/services`,
  numberOfItems: PROCEDURE_PAGES.length,
  itemListElement: PROCEDURE_PAGES.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "MedicalProcedure",
      name: p.title,
      description: p.intro,
      url: `${SITE_URL}/procedures/${p.slug}`,
    },
  })),
  provider: { "@id": `${SITE_URL}/#clinic-shalby` },
};

const ServicesPage = () => {
  return (
    <>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(proceduresListSchema) }}
      />

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="inline-block bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide mb-3 border border-emerald-200">
              All Procedures
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Orthopedic & Joint Replacement Services in Jaipur
            </h1>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Compare knee, hip, robotic and revision procedures offered by
              Dr. Dheeraj Dubay in Jaipur. Each guide explains suitability,
              recovery expectations and consultation options.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROCEDURE_PAGES.map((p) => (
              <ProcedureCard
                key={p.slug}
                slug={p.slug}
                title={p.title}
                category={p.category}
                intro={p.intro}
              />
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
};

export default ServicesPage;
