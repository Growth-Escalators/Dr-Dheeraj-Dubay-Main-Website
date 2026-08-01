import { generatePageMetadata } from "@/lib/seo.config";

export const revalidate = 3600;

export const metadata = generatePageMetadata({
  title: "Achievements & Awards Gallery | Dr. Dheeraj Dubay",
  description: "View Dr. Dheeraj Dubay's awards, achievements and recognitions including Forbes World Record, ET Inspiring Leaders 2025 and UK Honour Recognition.",
  slug: "gallery",
});

import Gallery from "@/components/Gallery4/NewGallery";
import { db } from "@/lib/db";
import React from "react";

type Props = {};

const page = async (props: Props) => {
  let images: any[] = [];
  try {
    images = await db.image.findMany({
      // CRM drag order first; unordered rows fall in behind them.
      orderBy: [{ sortOrder: "asc" }],
    });
  } catch {
    images = [];
  }
  return (
    <Gallery images={images} />
  );
};

export default page;
