import Link from "next/link";
import { FileTextIcon, ArrowRightIcon, ExternalLinkIcon } from "lucide-react";
import { SECTION_HEADING_CLASSES, BUTTON } from "@/lib/design-tokens";

export interface HomeArticle {
  id: string;
  title: string;
  journalName: string | null;
  publishedDate: string | null; // ISO, already serialised for the client
  externalUrl: string | null;
  tags: string[];
}

// Articles picked in the CRM (/admin/articles → "Show on homepage"), in the
// order set there. Server-rendered; renders nothing at all when none are
// flagged, so the homepage never shows an empty shell.
export default function FeaturedArticles({
  articles,
}: {
  articles: HomeArticle[];
}) {
  if (!articles.length) return null;

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className={SECTION_HEADING_CLASSES.eyebrow}>
            <span className="inline-flex items-center gap-1.5">
              <FileTextIcon className="h-3.5 w-3.5" />
              Published work
            </span>
          </span>
          <h2 className={SECTION_HEADING_CLASSES.h2}>
            Research &amp; <span className="text-emerald-600">Media</span>
          </h2>
          <p className={SECTION_HEADING_CLASSES.sub}>
            Journal papers, press features and articles by Dr. Dheeraj Dubay.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => {
            const isExternal = Boolean(a.externalUrl);
            const href = a.externalUrl || "/articles";
            const year = a.publishedDate
              ? new Date(a.publishedDate).getFullYear()
              : null;

            return (
              <Link
                key={a.id}
                href={href}
                {...(isExternal
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group flex flex-col rounded-xl border border-gray-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md"
              >
                {(a.journalName || year) && (
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-emerald-700">
                    {[a.journalName, year].filter(Boolean).join(" · ")}
                  </p>
                )}

                <h3 className="font-bold leading-snug text-gray-900 transition-colors group-hover:text-emerald-700">
                  {a.title}
                </h3>

                {a.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {a.tags.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] text-gray-600"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700">
                  {isExternal ? "Read on publisher" : "Read more"}
                  {isExternal ? (
                    <ExternalLinkIcon className="h-3.5 w-3.5" />
                  ) : (
                    <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  )}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link href="/articles" className={BUTTON.outline}>
            View all articles
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
