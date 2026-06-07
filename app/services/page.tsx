import { generatePageMetadata } from "@/lib/seo.config";
import React from "react";
import { PROCEDURE_PAGES } from "@/lib/procedure-pages";
import { ProcedureCard } from "@/components/ui/ProcedureCard";
import FinalCTA from "@/components/home/FinalCTA";
import GTM from "@/utils/GTM";

export const revalidate = 3600;

export const metadata = generatePageMetadata({
  title: "Joint Replacement Services | Dr. Dheeraj Dubay Jaipur",
  description:
    "All joint replacement procedures performed by Dr. Dheeraj Dubay — robotic knee, hip replacement, partial knee, revision, bilateral, minimally invasive, and more.",
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
