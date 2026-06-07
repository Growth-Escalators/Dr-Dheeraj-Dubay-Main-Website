import Link from "next/link";

export interface ProcedureCardProps {
  slug: string;
  title: string;
  category: string;
  intro: string;
}

// Single procedure card used by both the homepage Services grid and the
// Services page. Replaces the inline JSX block in HomePageContent.tsx and
// the old Services.tsx that consumed the DB Services model.
export function ProcedureCard({ slug, title, category, intro }: ProcedureCardProps) {
  return (
    <Link
      href={`/procedures/${slug}`}
      className="bg-white rounded-xl p-5 border border-gray-200 hover:border-emerald-300 hover:shadow-md transition-all group block"
    >
      <p className="text-xs text-emerald-700 font-semibold uppercase tracking-wide mb-2">
        {category}
      </p>
      <h3 className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors mb-2">
        {title}
      </h3>
      <p className="text-sm text-gray-500 line-clamp-2">
        {intro.length > 110 ? `${intro.slice(0, 110)}...` : intro}
      </p>
      <span className="text-emerald-700 text-sm font-semibold mt-3 inline-block">
        Learn more →
      </span>
    </Link>
  );
}
