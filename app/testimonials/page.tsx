import { generatePageMetadata } from "@/lib/seo.config";
import { LazyYouTubeCard } from "@/components/Testimonials/LazyYouTubeCard";
import { AsSeenOnStrip } from "@/components/Testimonials/AsSeenOnStrip";
import { GoogleReviewButton } from "@/components/ui/GoogleReviewButton";
import FinalCTA from "@/components/home/FinalCTA";
import { db } from "@/lib/db";
import { getYouTubeId } from "@/lib/youtube";

export const revalidate = 3600;

// Keep the page useful for review/testimonial intent without publishing a
// hard-coded Google aggregate. Rating/count can be reintroduced dynamically
// after the official owned-GBP API integration is approved.
export const metadata = generatePageMetadata({
  title: "Dr. Dheeraj Dubay Patient Reviews & Testimonials | Jaipur",
  description:
    "Watch patient testimonial videos and read about patient experiences with Dr. Dheeraj Dubay's knee, hip and joint replacement care in Jaipur.",
  slug: "testimonials",
});

async function loadVideos() {
  try {
    const rows = await db.youTube.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });
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
      "Patient testimonial videos related to Dr. Dheeraj Dubay's joint replacement practice in Jaipur",
    itemListElement: videos.map((v, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "VideoObject",
        name: `Dr. Dubay Patient Testimonial ${i + 1}`,
        description:
          "Patient testimonial related to Dr. Dheeraj Dubay's joint replacement care",
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
      {videos.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
        />
      )}

      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <span className="inline-block bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide mb-3 border border-emerald-200">
            Patient Stories
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Patient Testimonials
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto mb-3">
            Patient experiences related to knee, hip and joint replacement care with Dr. Dheeraj Dubay in Jaipur.
          </p>
          <p className="text-xs leading-relaxed text-gray-500 max-w-xl mx-auto mb-5">
            These are individual patient experiences and should not be interpreted as a guarantee of treatment outcome. Google rating and review totals are not hard-coded on this website.
          </p>
          <GoogleReviewButton />
        </div>
      </section>

      {videos.length === 0 ? (
        <section className="py-20 text-center">
          <p className="text-gray-400">Testimonials coming soon.</p>
        </section>
      ) : (
        <>
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
