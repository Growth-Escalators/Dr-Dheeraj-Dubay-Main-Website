import { generatePageMetadata } from "@/lib/seo.config";
import GTM from "@/utils/GTM";

export const revalidate = 3600;

export const metadata = generatePageMetadata({
  title: "Surgery & Educational Videos | Dr. Dheeraj Dubay",
  description: "Watch educational videos about knee replacement, hip replacement and minimally invasive surgery techniques by Dr. Dheeraj Dubay.",
  slug: "videos",
});

const Videos = async () => {
  return (
    <>
      <head>
        <GTM gtmId="GTM-MDF4W4JT" />

        {/* No <title>/<meta description> here: the metadata export above
            already sets both via Next's Metadata API. This block used to
            hardcode a competing <title>Featured Videos - Dr. Dubay</title>
            + a weaker, generic description, producing two conflicting
            <title> tags in the rendered HTML (invalid; crawlers pick one
            unpredictably) and silently overriding the real SEO copy above. */}
        <link rel="icon" href="/assets/images/logonew.png" />
      </head>
      <div className="p-4 min-h-screen bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4">
              Featured Videos
            </h1>
            <p className="text-lg md:text-xl text-gray-600">
              Watch our featured videos showcasing excellence in joint replacement surgery
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative overflow-hidden rounded-lg shadow-lg" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/nVuZYsJ8Ok8?si=rxG0_5ZudpFYaJBD"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
            <div className="relative overflow-hidden rounded-lg shadow-lg" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/nVuZYsJ8Ok8?si=DG-YqVH7kHIM9Z31"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Videos;

