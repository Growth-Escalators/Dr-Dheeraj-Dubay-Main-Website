import { generatePageMetadata } from "@/lib/seo.config";
import { YoutubePlayer } from "@/components/ui/video";
import { db } from "@/lib/db";
import GTM from "@/utils/GTM";

export const revalidate = 3600;

export const metadata = generatePageMetadata({
  title: "Patient Testimonials & Videos | Dr. Dheeraj Dubay",
  description:
    "Watch patient testimonials and surgery videos by Dr. Dheeraj Dubay, Forbes World Record holder for joint replacement surgeries.",
  slug: "youtube",
});

function getYouTubeId(url: string): string | null {
  if (!url) return null
  const pattern = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
  const match = url.match(pattern)
  return match ? match[1] : null
}

const Youtube = async () => {
  let youtube: any[] = [];
  try {
    youtube = await db.youTube.findMany({});
  } catch {
    youtube = [];
  }

  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Dr. Dheeraj Dubay Patient Testimonials and Medical Videos",
    "description": "Patient testimonial videos and medical education content from Dr. Dheeraj Dubay, leading joint replacement surgeon in Jaipur",
    "itemListElement": youtube
      .filter(v => getYouTubeId(v.link || ''))
      .map((v, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "item": {
          "@type": "VideoObject",
          "name": v.title || `Dr. Dubay Patient Testimonial ${i + 1}`,
          "description": v.description || "Patient testimonial for Dr. Dheeraj Dubay joint replacement surgery",
          "thumbnailUrl": `https://img.youtube.com/vi/${getYouTubeId(v.link || '')}/maxresdefault.jpg`,
          "uploadDate": v.createdAt || new Date().toISOString(),
          "embedUrl": `https://www.youtube.com/embed/${getYouTubeId(v.link || '')}`,
          "url": `https://www.youtube.com/watch?v=${getYouTubeId(v.link || '')}`,
          "publisher": {
            "@type": "Person",
            "name": "Dr. Dheeraj Dubay",
            "url": "https://www.drdubay.in/about"
          }
        }
      }))
  }

  return (
    <>
      <head>
        <GTM gtmId="GTM-MDF4W4JT" />
        <title>Patient Testimonials | Dr. Dheeraj Dubay</title>
        <meta
          name="description"
          content="Watch patient testimonials from Dr. Dheeraj Dubay's joint replacement surgeries."
        />
        <link rel="icon" href="/assets/images/logonew.png" />
      </head>
      {youtube.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
        />
      )}

      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-3">
            Patient Testimonials
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Hear from our patients about their joint replacement journey with
            Dr. Dheeraj Dubay
          </p>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full mt-4" />
        </div>

        {youtube.length === 0 ? (
          <p className="text-center text-gray-400 py-20">
            Testimonials coming soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {youtube.map((item) => (
              <YoutubePlayer key={item.id} url={item.link} />
            ))}
          </div>
        )}
      </section>

    </>
  );
};

export default Youtube;
