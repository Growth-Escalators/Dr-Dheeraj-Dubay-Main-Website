import { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import {
  WhitePaperCard,
  isWhitePaper,
  type Article,
} from "@/components/articles/ArticleCards";

// Surgeon-authored articles only.
//
// This page used to carry press coverage as well, behind filter chips
// (All / Press & Media / White Papers). Press moved to its own /news route —
// "what he has written" and "who has written about him" are different
// questions, and the mixed list made both harder to scan. The card markup is
// shared via components/articles/ArticleCards.tsx so the two pages stay
// consistent.
export const metadata: Metadata = {
  title: "Articles & White Papers | Dr. Dheeraj Dubay",
  description:
    "Surgeon-authored articles by Dr. Dheeraj Dubay on robotic joint replacement, Zero-technique recovery, implant choice and what patients should realistically expect.",
};

export const revalidate = 3600;

const SITE_URL = "https://www.drdubay.in";

async function getArticles(): Promise<Article[]> {
  try {
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
        externalUrl: r.externalUrl,
        pdfUrl: r.pdfUrl,
        doi: r.doi,
        publishedDate: r.publishedDate ? r.publishedDate.toISOString() : null,
        tags: r.tags,
      }))
      .filter(isWhitePaper);
  } catch {
    return [];
  }
}

export default async function ArticlesPage() {
  const articles = await getArticles();

  const itemListSchema =
    articles.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Articles by Dr. Dheeraj Dubay",
          itemListElement: articles.map((a, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
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
        name: "Articles",
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
            Articles
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Articles &amp; White Papers
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Written by Dr. Dheeraj Dubay — robotic joint replacement, recovery
            expectations, and how implant choice affects the result.
          </p>
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Articles coming soon
            </h2>
            <p className="text-gray-500 text-sm">
              Dr. Dubay&apos;s articles will appear here once published.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {articles.map((a) => (
              <WhitePaperCard key={a.id} article={a} />
            ))}
          </div>
        )}

        <p className="mt-12 text-center text-sm text-gray-500">
          Looking for press coverage?{" "}
          <Link
            href="/news"
            className="font-semibold text-emerald-700 hover:underline"
          >
            News &amp; media features →
          </Link>
        </p>
      </div>
    </div>
  );
}
