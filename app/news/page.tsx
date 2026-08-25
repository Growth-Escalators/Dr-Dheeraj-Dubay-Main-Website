import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo.config";
import { defaultSEO } from "@/lib/seo.config";
import {
  PressCard,
  isPress,
  type Article,
} from "@/components/articles/ArticleCards";
import { LazyYouTubeCard } from "@/components/Testimonials/LazyYouTubeCard";
import { getYouTubeId } from "@/lib/youtube";

export const revalidate = 3600;

const SITE_URL = defaultSEO.siteUrl;

// News & media coverage — where an outlet wrote about Dr. Dubay.
//
// Press items used to sit behind a filter chip on /articles alongside the
// surgeon-authored white papers. They are a different thing to a reader ("who
// has covered him" vs "what has he written"), and they deserve their own URL
// for search. /articles now carries the authored pieces only.
//
// Classification is the `press` tag on the Article model, which the CRM sets
// with a checkbox (admin → Articles → "News / press mention").
export const metadata = generatePageMetadata({
  title: "Podcasts & News Mentions | Dr. Dheeraj Dubay",
  description:
    "Press coverage and podcast appearances by Dr. Dheeraj Dubay — Forbes World Record, Times of India, Economic Times features and video conversations on joint replacement surgery.",
  slug: "news",
  keywords:
    "dr dheeraj dubay news, dr dubay press coverage, dr dheeraj dubay podcast, forbes world record surgeon jaipur",
});

const PODCASTS_ON_PAGE = 6;

async function getPodcasts() {
  try {
    const { db } = await import("@/lib/db");
    const rows = await db.youTube.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      take: PODCASTS_ON_PAGE,
    });
    return rows
      .map((r) => ({
        id: r.id,
        videoId: getYouTubeId(r.link || ""),
        title: r.title,
      }))
      .filter(
        (v): v is { id: string; videoId: string; title: string | null } =>
          Boolean(v.videoId),
      );
  } catch {
    return [];
  }
}

async function getPressArticles(): Promise<Article[]> {
  try {
    const { db } = await import("@/lib/db");
    const rows = await db.article.findMany({
      where: { isPublished: true },
      orderBy: [{ sortOrder: "asc" }, { publishedDate: "desc" }],
    });
    return rows
      .map((r) => ({
        id: r.id,
        title: r.title,
        journalName: r.journalName,
        authors: r.authors,
        abstract: r.abstract,
        doi: r.doi,
        externalUrl: r.externalUrl,
        pdfUrl: r.pdfUrl,
        publishedDate: r.publishedDate ? r.publishedDate.toISOString() : null,
        tags: r.tags,
      }))
      .filter(isPress)
      // Seed/demo records must never appear in public HTML or structured data.
      .filter((article) => !article.title.trim().startsWith("[SAMPLE]"));
  } catch {
    return [];
  }
}

export default async function NewsPage() {
  const [articles, podcasts] = await Promise.all([
    getPressArticles(),
    getPodcasts(),
  ]);

  const itemListSchema =
    articles.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "News and media coverage of Dr. Dheeraj Dubay",
          itemListElement: articles.map((a, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "NewsArticle",
              // Sample rows carry a [SAMPLE] prefix for the editor's benefit;
              // it must not leak into structured data.
              headline: a.title.replace(/^\[SAMPLE\]\s*/, ""),
              publisher: a.journalName
                ? { "@type": "Organization", name: a.journalName }
                : undefined,
              datePublished: a.publishedDate || undefined,
              url: a.externalUrl || undefined,
              about: { "@type": "Physician", "@id": `${SITE_URL}/#physician` },
            },
          })),
        }
      : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "News & Media",
        item: `${SITE_URL}/news`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      {itemListSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-wider text-emerald-700 bg-emerald-50 rounded-full uppercase">
            Podcasts &amp; News
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Dr. Dubay in the Media
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Press features and podcast conversations on Dr. Dheeraj
            Dubay&apos;s work in robotic and complex joint replacement surgery.
          </p>
        </div>

        {/* Podcasts first — a video is the more inviting thing to land on, and
            press cards read well beneath it. */}
        {podcasts.length > 0 && (
          <section className="mb-14">
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              Podcasts &amp; video conversations
            </h2>
            <p className="text-sm text-gray-500 mb-5">
              Dr. Dubay on joint replacement, recovery and robotic surgery.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {podcasts.map((v) => (
                <LazyYouTubeCard
                  key={v.id}
                  videoId={v.videoId}
                  title={v.title ?? undefined}
                />
              ))}
            </div>
            <div className="mt-5 text-center">
              <Link
                href="/podcasts"
                className="text-sm font-semibold text-emerald-700 hover:underline"
              >
                View all episodes →
              </Link>
            </div>
          </section>
        )}

        {articles.length > 0 && (
          <h2 className="text-xl font-bold text-gray-900 mb-5">
            Press &amp; media coverage
          </h2>
        )}

        {/* Only an empty page when BOTH halves are empty — with podcasts
            present, "press features coming soon" alone would read as though
            the whole page had failed. */}
        {articles.length === 0 && podcasts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Coming soon
            </h2>
            <p className="text-gray-500 text-sm">
              Press coverage and podcast appearances will appear here as they
              are published.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {articles.map((a) => (
              <PressCard key={a.id} article={a} />
            ))}
          </div>
        )}

        <p className="mt-12 text-center text-sm text-gray-500">
          Looking for Dr. Dubay&apos;s own writing?{" "}
          <Link
            href="/articles"
            className="font-semibold text-emerald-700 hover:underline"
          >
            Articles &amp; white papers →
          </Link>
        </p>
      </div>
    </div>
  );
}
