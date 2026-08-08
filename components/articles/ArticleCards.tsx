// Article cards shared by /articles (surgeon-authored white papers) and
// /news (press & media coverage).
//
// These lived inside app/articles/page.tsx while both kinds of item rendered
// on one page. Splitting press onto its own /news route meant either
// duplicating the markup or extracting it — extracted, so the two pages can't
// drift apart.

export interface Article {
  id: string;
  title: string;
  journalName?: string | null;
  authors?: string | null;
  abstract?: string | null;
  doi?: string | null;
  externalUrl?: string | null;
  pdfUrl?: string | null;
  publishedDate?: string | null;
  tags?: string[];
}

/** Press / media coverage — an outlet wrote about Dr. Dubay. */
export function isPress(a: Article) {
  return a.tags?.includes("press");
}

/** Surgeon-authored long-form piece. */
export function isWhitePaper(a: Article) {
  return a.tags?.includes("white-paper");
}

export function formatDate(iso?: string | null) {
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

export function PressCard({ article: a }: { article: Article }) {
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

export function WhitePaperCard({ article: a }: { article: Article }) {
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
