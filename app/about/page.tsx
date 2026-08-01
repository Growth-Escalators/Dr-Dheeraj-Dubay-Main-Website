import { generatePageMetadata } from "@/lib/seo.config";
import Section1 from "@/components/AboutUs/Section1";
import { PhysicianJsonLd } from "@/components/seo/JsonLd";
import { SURGERY_COUNT_DISPLAY, EXPERIENCE_YEARS_DISPLAY } from "@/lib/clinic-info";

export const revalidate = 3600;

export const metadata = generatePageMetadata({
  title: "About Dr. Dheeraj Dubay | Joint Replacement Specialist Jaipur",
  description: `Learn about Dr. Dheeraj Dubay - MBBS, MS Orthopedic, FJRS Germany. ${EXPERIENCE_YEARS_DISPLAY} years experience, ${SURGERY_COUNT_DISPLAY} surgeries, Forbes World Record holder.`,
  slug: "about",
});
import Section2 from "@/components/AboutUs/Section2";

import Gallery from "@/components/Gallery4/NewGallery";
import { db } from "@/lib/db";
import React from "react";

type Props = {};

const page = async (props: Props) => {
  let newimages: any[] = [];
  try {
    newimages = await db.image.findMany({
      orderBy: [{ sortOrder: "asc" }],
    });
  } catch {
    newimages = [];
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <PhysicianJsonLd />
      {/* No in-body <head> here. It rendered a <head> element inside a <div>,
          which React rejects as invalid nesting (console error on every
          visit), and everything it carried is handled properly elsewhere:
          <title>/description by the metadata export above, the favicon by
          `icons` in app/layout.tsx, and GTM globally in the root layout. */}
      <Section2 />
      <Section1 />
      <div className="py-12">
        <Gallery images={newimages} />
      </div>
    </div>
  );
};

export default page;
