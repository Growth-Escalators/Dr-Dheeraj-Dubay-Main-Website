import Link from "next/link";
import { PlayCircleIcon, ArrowRightIcon } from "lucide-react";
import { LazyYouTubeCard } from "@/components/Testimonials/LazyYouTubeCard";
import { SECTION_HEADING_CLASSES, BUTTON } from "@/lib/design-tokens";

export interface HomeVideo {
  id: string;
  videoId: string;
  title: string | null;
}

// Videos picked in the CRM (/admin/youtube → "Show on homepage"), in the order
// set there.
//
// Server-rendered on purpose. The block this replaces fetched /api/youtube from
// the browser and painted grey "Video" placeholder boxes while the request was
// in flight — which is what made it look broken. Rendering on the server means
// the markup either has real videos or the section doesn't exist at all.
export default function FeaturedVideos({ videos }: { videos: HomeVideo[] }) {
  if (!videos.length) return null;

  return (
    <section className="py-16 md:py-20 bg-emerald-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="inline-block bg-white text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide mb-3 border border-emerald-200">
            <span className="inline-flex items-center gap-1.5">
              <PlayCircleIcon className="h-3.5 w-3.5" />
              Watch
            </span>
          </span>
          <h2 className={SECTION_HEADING_CLASSES.h2}>
            Videos from <span className="text-emerald-600">Dr. Dubay</span>
          </h2>
          <p className={SECTION_HEADING_CLASSES.sub}>
            Procedure explainers, patient stories and press appearances.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((v) => (
            <LazyYouTubeCard
              key={v.id}
              videoId={v.videoId}
              title={v.title ?? undefined}
            />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/podcasts" className={BUTTON.outline}>
            View all videos
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
