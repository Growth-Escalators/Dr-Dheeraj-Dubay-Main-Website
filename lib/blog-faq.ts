/**
 * Blog posts don't have a dedicated FAQ field in the Prisma `Blogs` model —
 * an FAQ section, when a post has one, is authored straight into the
 * markdown body (a "## Frequently Asked Questions" heading followed by
 * `**Question?**` / answer pairs) and lands in `content1` as plain HTML
 * alongside the rest of the article, same as any other section.
 *
 * This extracts that section back out of the rendered HTML so the blog
 * page can also emit it as FAQPage JSON-LD, without adding a schema
 * migration for something that's otherwise pure content. Only reads —
 * never mutates `content1`.
 */

export interface BlogFaq {
  question: string;
  answer: string;
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Extracts [{question, answer}] from a blog's rendered content1 HTML, if it
 * has a "Frequently Asked Questions" H2 section. Returns [] when the post
 * has no FAQ section (most posts in this batch don't — see
 * content/blogs/_IMPORT_MANIFEST.md at draft time).
 */
export function extractFaqsFromHtml(html: string | null | undefined): BlogFaq[] {
  if (!html) return [];

  const sectionMatch = html.match(
    /<h2[^>]*>\s*Frequently Asked Questions\s*<\/h2>([\s\S]*?)(?=<h2[^>]*>|$)/i
  );
  if (!sectionMatch) return [];

  const section = sectionMatch[1];
  const pairPattern = /<p>\s*<strong>([\s\S]*?)<\/strong>([\s\S]*?)<\/p>/gi;

  const faqs: BlogFaq[] = [];
  let match: RegExpExecArray | null;
  while ((match = pairPattern.exec(section)) !== null) {
    const question = stripHtml(match[1]);
    const answer = stripHtml(match[2]);
    if (question && answer) {
      faqs.push({ question, answer });
    }
  }
  return faqs;
}
