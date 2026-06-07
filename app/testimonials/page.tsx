import { generatePageMetadata } from "@/lib/seo.config";
import { LazyYouTubeCard } from "@/components/Testimonials/LazyYouTubeCard";
import { AsSeenOnStrip } from "@/components/Testimonials/AsSeenOnStrip";
import FinalCTA from "@/components/home/FinalCTA";
import { db } from "@/lib/db";
import GTM from "@/utils/GTM";

export const revalidate = 3600;

export const metadata = generatePageMetadata({
  title: "Patient Testimonials | Dr. Dheeraj Dubay",
  description:
    "Watch real patient testimonials from Dr. Dheeraj Dubay's joint replacement surgeries — knee, hip, robotic, partial replacement stories from across Rajasthan.",
  slug: "testimonials",
});

function getYouTubeId(url: string): string | null {
  if (!url) return null;
  const pattern =
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
  const match = url.match(pattern);
  return match ? match[1] : null;
}

async function loadVideos() {
  try {
    const rows = await db.youTube.findMany({});
    return rows
      .map((r) => ({
        id: r.id,
        videoId: getYouTubeId(r.link || ""),
        link: r.link,
        createdAt: r.createdAt,
      }))
      .filter((v): v is { id: string; videoId: string; link: string; createdAt: Date } =>
        v.videoId !== null && typeof v.videoId === "string",
      );
  } catch {
    return [];
  }
}

const TestimonialsPage = async () => {
  const videos = await loadVideos();

  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Dr. Dheeraj Dubay Patient Testimonials",
    description:
      "Patient testimonial videos from Dr. Dheeraj Dubay, leading joint replacement surgeon in Jaipur",
    itemListElement: videos.map((v, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "VideoObject",
        name: `Dr. Dubay Patient Testimonial ${i + 1}`,
        description:
          "Patient testimonial for Dr. Dheeraj Dubay joint replacement surgery",
        thumbnailUrl: `https://img.youtube.com/vi/${v.videoId}/hqdefault.jpg`,
        uploadDate: v.createdAt.toISOString(),
        embedUrl: `https://www.youtube.com/embed/${v.videoId}`,
        url: `https://www.youtube.com/watch?v=${v.videoId}`,
        publisher: {
          "@type": "Person",
          name: "Dr. Dheeraj Dubay",
          url: "https://www.drdubay.in/about",
        },
      },
    })),
  };

  const featured = videos.slice(0, 3);
  const rest = videos.slice(3);

  return (
    <>
      <head>
        <GTM gtmId="GTM-MDF4W4JT" />
        <link rel="icon" href="/assets/images/logonew.png" />
      </head>
      {videos.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
        />
      )}

      {/* Header */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <span className="inline-block bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide mb-3 border border-emerald-200">
            Real Stories
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Patient Testimonials
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Real patient stories from Dr. Dheeraj Dubay&apos;s joint replacement
            surgeries — knee, hip, robotic, and minimally invasive procedures.
          </p>
        </div>
      </section>

      {videos.length === 0 ? (
        <section className="py-20 text-center">
          <p className="text-gray-400">Testimonials coming soon.</p>
        </section>
      ) : (
        <>
          {/* Featured row — first 2-3 in a larger grid */}
          {featured.length > 0 && (
            <section className="py-8 bg-emerald-50">
              <div className="max-w-5xl mx-auto px-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-5 text-center">
                  Featured stories
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {featured.map((v) => (
                    <LazyYouTubeCard key={v.id} videoId={v.videoId} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Rest of the videos */}
          {rest.length > 0 && (
            <section className="py-12 bg-white">
              <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
                  More patient stories
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                  {rest.map((v) => (
                    <LazyYouTubeCard key={v.id} videoId={v.videoId} />
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      <AsSeenOnStrip />

      <FinalCTA />
    </>
  );
};

export default TestimonialsPage;
