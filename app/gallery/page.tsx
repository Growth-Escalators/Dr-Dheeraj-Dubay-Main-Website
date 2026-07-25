import { generatePageMetadata } from "@/lib/seo.config";

export const revalidate = 3600;

export const metadata = generatePageMetadata({
  title: "Achievements & Awards Gallery | Dr. Dheeraj Dubay",
  description: "View Dr. Dheeraj Dubay's awards, achievements and recognitions including Forbes World Record, ET Inspiring Leaders 2025 and UK Honour Recognition.",
  slug: "gallery",
});

import Gallery from "@/components/Gallery4/NewGallery";
import { db } from "@/lib/db";
import GTM from "@/utils/GTM";
import React from "react";

type Props = {};

const page = async (props: Props) => {
  let images: any[] = [];
  try {
    images = await db.image.findMany();
  } catch {
    images = [];
  }
  return (
    <>
      <head>
        <GTM gtmId="GTM-MDF4W4JT" />

        {/* No <title>/<meta description> here: the metadata export above
            already sets both via Next's Metadata API. This block used to
            hardcode a competing <title>Dr. Dubay</title> + a weaker,
            generic description, producing two conflicting <title> tags
            in the rendered HTML (invalid; crawlers pick one unpredictably)
            and silently overriding the real SEO copy above. */}
        <link rel="icon" href="/assets/images/logonew.png" />
      </head>
      <Gallery images={images} />
    </>
  );
};

export default page;
