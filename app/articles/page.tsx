import { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "Articles & Press | Dr. Dheeraj Dubay",
  description:
    "Press coverage of Dr. Dheeraj Dubay (Times of India, Economic Times, India TV, Forbes) and surgeon-authored articles on robotic joint replacement, recovery and implant choice.",
};

export const revalidate = 3600;

const SITE_URL = "https://www.drdubay.in";

interface Article {
  id: string;
  title: string;
  journalName?: string | null;
  authors?: string | null;
  abstract?: string | null;
  externalUrl?: string | null;
  pdfUrl?: string | null;
  doi?: string | null;
  publishedDate?: string | null;
  tags?: string[];
  isPublished?: boolean;
}

// Query Prisma directly. We previously fetched admin.drdubay.in/api/articles
// but that endpoint is auth-gated by NextAuth middleware and silently
// returned an HTML sign-in page — yielding 0 articles on the public site.
async function getArticles(): Promise<Article[]> {
  try {
    const rows = await db.article.findMany({
      where: { isPublished: true },
      orderBy: [{ sortOrder: "asc" }, { publishedDate: "desc" }],
    });
    return rows.map((r) => ({
      id: r.id,
      title: r.title,
      journalName: r.journalName,
      authors: r.authors,
      abstract: r.abstract,
      externalUrl: r.externalUrl,
      pdfUrl: r.pdfUrl,
      doi: r.doi,
      publishedDate: r.publishedDate ? r.publishedDate.toISOString() : null,
      tags: r.tags,
      isPublished: r.isPublished,
    }));
  } catch {
    return [];
  }
}

const CATEGORIES = [
  { slug: "all", label: "All" },
  { slug: "press", label: "Press & Media" },
  { slug: "white-paper", label: "White Papers" },
] as const;

type CategorySlug = (typeof CATEGORIES)[number]["slug"];

function isPress(a: Article) {
  return a.tags?.includes("press");
}
function isWhitePaper(a: Article) {
  return a.tags?.includes("white-paper");
}

function formatDate(iso?: string | null) {
  if (!iso) return null;
  try {
    return new Date(iso).toLocaleDateString("en-IN", {
      month: "long",
      year: "numeric",
    });
  } catch {
    return null;
  }
}

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const articles = await getArticles();
  const active: CategorySlug =
    (CATEGORIES.find((c) => c.slug === searchParams.category)?.slug as CategorySlug) ||
    "all";

  const filtered = articles.filter((a) => {
    if (active === "all") return true;
    if (active === "press") return isPress(a);
    if (active === "white-paper") return isWhitePaper(a);
    return true;
  });

  const counts = {
    all: articles.length,
    press: articles.filter(isPress).length,
    "white-paper": articles.filter(isWhitePaper).length,
  };

  // JSON-LD ItemList wrapping all published articles, with per-item type
  // NewsArticle (press) or MedicalScholarlyArticle (white papers).
  const itemListSchema =
    articles.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Articles and press coverage of Dr. Dheeraj Dubay",
          itemListElement: articles.map((a, i) => {
            const isPaper = isWhitePaper(a);
            return {
              "@type": "ListItem",
              position: i + 1,
              item: isPaper
                ? {
                    "@type": "MedicalScholarlyArticle",
                    headline: a.title,
                    author: {
                      "@type": "Physician",
                      "@id": `${SITE_URL}/#physician`,
                      name: a.authors || "Dr. Dheeraj Dubay",
                    },
                    datePublished: a.publishedDate || undefined,
                    abstract: a.abstract || undefined,
                    url: `${SITE_URL}/articles`,
                  }
                : {
                    "@type": "NewsArticle",
                    headline: a.title.replace(/^\[SAMPLE\]\s*/, ""),
                    publisher: a.journalName
                      ? { "@type": "Organization", name: a.journalName }
                      : undefined,
                    datePublished: a.publishedDate || undefined,
                    url: a.externalUrl || undefined,
                    about: {
                      "@type": "Physician",
                      "@id": `${SITE_URL}/#physician`,
                    },
                  },
            };
          }),
        }
      : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Articles & Press",
        item: `${SITE_URL}/articles`,
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
            Articles & Press
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Articles & Publications
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Press coverage of Dr. Dheeraj Dubay and surgeon-authored articles on
            robotic joint replacement, recovery and implant choice.
          </p>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {CATEGORIES.map((cat) => {
            const isActive = active === cat.slug;
            const href = cat.slug === "all" ? "/articles" : `/articles?category=${cat.slug}`;
            const count = counts[cat.slug];
            return (
              <Link
                key={cat.slug}
                href={href}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                  isActive
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-gray-600 border-gray-300 hover:border-primary hover:text-primary"
                }`}
              >
                {cat.label}
                <span className={`ml-2 text-xs ${isActive ? "opacity-90" : "text-gray-400"}`}>
                  {count}
                </span>
              </Link>
            );
          })}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-emerald-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {active === "press"
                ? "Press features coming soon"
                : active === "white-paper"
                  ? "White papers coming soon"
                  : "Publications coming soon"}
            </h3>
            <p className="text-gray-500 text-sm">
              Dr. Dubay&apos;s articles will appear here once published.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {filtered.map((a) =>
              isWhitePaper(a) ? (
                <WhitePaperCard key={a.id} article={a} />
              ) : (
                <PressCard key={a.id} article={a} />
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function PressCard({ article: a }: { article: Article }) {
  const date = formatDate(a.publishedDate);
  return (
    <article className="bg-white rounded-xl border border-gray-200 hover:border-emerald-300 hover:shadow-md transition-all overflow-hidden">
      <div className="border-t-[3px] border-emerald-500" aria-hidden />
      <div className="p-6">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          {a.journalName && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-emerald-50 text-emerald-700 border border-emerald-200">
              {a.journalName}
            </span>
          )}
          <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase text-gray-500 bg-gray-100 rounded">
            Press
          </span>
          {date && <span className="text-xs text-gray-400">{date}</span>}
        </div>
        <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3 leading-snug">
          {a.title}
        </h2>
        {a.abstract && (
          <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">
            {a.abstract}
          </p>
        )}
        {a.externalUrl && (
          <a
            href={a.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
          >
            Read on {a.journalName || "source"}
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        )}
      </div>
    </article>
  );
}

function WhitePaperCard({ article: a }: { article: Article }) {
  const date = formatDate(a.publishedDate);
  // Split abstract into paragraphs on \n\n so the long-form body renders cleanly.
  const paragraphs = (a.abstract || "").split(/\n\n+/).filter(Boolean);
  const teaser = paragraphs[0] || "";
  const rest = paragraphs.slice(1);
  const hasMore = rest.length > 0;

  return (
    <article className="bg-emerald-50 rounded-xl border border-emerald-100 hover:shadow-md transition-shadow overflow-hidden">
      <div className="p-6 md:p-7">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase text-emerald-800 bg-white border border-emerald-200 rounded">
            White Paper
          </span>
          {date && <span className="text-xs text-gray-500">{date}</span>}
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 leading-snug">
          {a.title}
        </h2>
        {a.authors && (
          <p className="text-sm text-gray-600 mb-4">By {a.authors}</p>
        )}

        <p className="text-[15px] text-gray-700 leading-relaxed mb-3 whitespace-pre-line">
          {teaser}
        </p>

        {hasMore && (
          <details className="group mt-2">
            <summary className="cursor-pointer text-sm font-semibold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1.5 list-none">
              <span className="group-open:hidden">Read more</span>
              <span className="hidden group-open:inline">Show less</span>
              <svg
                className="w-4 h-4 transition-transform group-open:rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="mt-4 space-y-4 text-[15px] text-gray-700 leading-relaxed whitespace-pre-line">
              {rest.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </details>
        )}

        {(a.tags?.filter((t) => t !== "white-paper") ?? []).length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-emerald-100">
            {a.tags!
              .filter((t) => t !== "white-paper")
              .map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-medium text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200"
                >
                  {tag}
                </span>
              ))}
          </div>
        )}

        {a.pdfUrl && (
          <a
            href={a.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-blue-700 hover:text-blue-800"
          >
            Download PDF
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"
              />
            </svg>
          </a>
        )}
      </div>
    </article>
  );
}
