import { generatePageMetadata } from "@/lib/seo.config";
import React from "react";
import { PROCEDURE_PAGES } from "@/lib/procedure-pages";
import { ProcedureCard } from "@/components/ui/ProcedureCard";
import FinalCTA from "@/components/home/FinalCTA";
import GTM from "@/utils/GTM";
import { SURGERY_COUNT_DISPLAY, EXPERIENCE_YEARS_DISPLAY } from "@/lib/clinic-info";

export const revalidate = 3600;

// CTR fix (2026-07-23, from GSC baseline 2026-07-21 + GSC Page Indexing):
// /services ranks pos ~2.76 with 2,558 impressions but only 0.6% CTR — a
// generic "all procedures" directory title gives searchers no reason to
// click over a specific-procedure result. New copy leads with the real,
// verifiable count (9 procedures in lib/procedure-pages.ts) and the
// site's existing verified stats (SURGERY_COUNT_DISPLAY /
// EXPERIENCE_YEARS_DISPLAY, lib/clinic-info.ts) instead of a bare list
// promise. Also see app/layout.tsx for the sitewide title-template fix
// that was silently doubling every page's brand suffix.
export const metadata = generatePageMetadata({
  title: "9 Joint Replacement Procedures in Jaipur | Dr. Dheeraj Dubay",
  description: `Compare all 9 knee & hip replacement procedures by Dr. Dheeraj Dubay — robotic, minimally invasive, revision & more. ${SURGERY_COUNT_DISPLAY} surgeries, ${EXPERIENCE_YEARS_DISPLAY} years experience.`,
  slug: "services",
});

const ServicesPage = () => {
  return (
    <>
      <head>
        <GTM gtmId="GTM-MDF4W4JT" />
        <link rel="icon" href="/assets/images/logonew.png" />
      </head>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="inline-block bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide mb-3 border border-emerald-200">
              All Procedures
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Joint Replacement Procedures by Dr. Dheeraj Dubay
            </h1>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Every joint replacement procedure we perform — robotic and
              conventional. Click any procedure for a detailed page with
              outcomes, recovery, and FAQs.
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
