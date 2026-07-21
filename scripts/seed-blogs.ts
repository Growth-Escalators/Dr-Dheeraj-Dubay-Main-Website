/**
 * scripts/seed-blogs.ts
 * ---------------------------------------------------------------------------
 * WS-5 bulk blog importer.
 *
 * Reads every `content/blogs/*.md` file (frontmatter + markdown body),
 * converts the body to HTML, and idempotently upserts each one into the
 * Prisma `Blogs` model (Mongo), keyed by `slug`. Every import lands with
 * `isPublished: false` — nothing goes live without Jatin + Dr. Dubay
 * sign-off (see the "Doctor Sign-Off Checklist" section carried in each
 * source file).
 *
 * Frontmatter -> Blogs field mapping (see
 * content/blogs source + the original _IMPORT_MANIFEST.md this batch was
 * drafted against):
 *   title            -> title
 *   slug             -> slug
 *   metaTitle        -> metaTitle
 *   metaDescription  -> metaDescription, and (schema requires a non-null
 *                       subtitle1) -> subtitle1 fallback
 *   tags[]           -> tags[]
 *   coverImage       -> coverImage, and (schema requires a non-null image1)
 *                       -> image1 fallback ("" until an image is set)
 *   markdown body     -> content1 (HTML). No subtitle2/content2 split — each
 *                       article is a single flowing body per the source
 *                       manifest, so those fields are left unset.
 *
 * The "Doctor Sign-Off Checklist" section at the bottom of each source file
 * (everything from the final horizontal rule onward) is editorial metadata
 * for Jatin/Dr. Dubay, NOT blog content — it is stripped before anything
 * touches content1. This script does not upsert schema.prisma's `slug`
 * field as `@unique` (it isn't, today); "keyed by slug" is implemented as
 * an explicit find-then-create/update, not a Prisma `.upsert()`, so this
 * script never requires (and never silently adds) a unique index that
 * could collide with existing production rows that have a null/duplicate
 * slug.
 *
 * Usage
 * -----
 * Dry run — parses all files, prints the mapped fields, touches NO
 * database, and works with no DATABASE_URL set at all:
 *
 *   npm run seed:blogs -- --dry-run
 *
 * Real upsert — Jatin's gated step. Requires DATABASE_URL to point at the
 * target database. NEVER run this against production without explicit
 * approval:
 *
 *   DATABASE_URL="mongodb+srv://..." npm run seed:blogs
 *
 * IndexNow: this script only pings IndexNow for a post that comes out of
 * the upsert with isPublished === true. Every post this batch seeds is
 * isPublished:false, so today that branch never fires — it's wired for the
 * day a future run (or a publish path that reuses this same upsert) flips
 * a post live. See the inline comment at the call site below.
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const CONTENT_DIR = path.join(__dirname, "..", "content", "blogs");
const DRY_RUN = process.argv.includes("--dry-run");

interface ParsedBlog {
  file: string;
  slug: string;
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  tags: string[];
  coverImage?: string;
  contentHtml: string;
  verifyCount: number;
}

/**
 * Strips the "Doctor Sign-Off Checklist" section (the final horizontal
 * rule onward) from a parsed markdown body, and counts the genuine
 * [VERIFY]/[STAT] claim tags it carried — i.e. only tags that appear on an
 * actual numbered checklist line ("1. **...** `[VERIFY]` ..."), not the
 * free-text summary sentences some files add below the list (which
 * reference "[VERIFY]"/"[STAT]" in prose while explaining the list, and
 * would otherwise double-count).
 */
function stripSignOffChecklist(body: string): { body: string; verifyCount: number } {
  const checklistMatch = body.match(/\n---\s*\n+##\s*Doctor Sign-Off Checklist[\s\S]*$/i);
  let verifyCount = 0;
  if (checklistMatch) {
    const numberedLines = checklistMatch[0]
      .split("\n")
      .filter((line) => /^\d+\.\s/.test(line.trim()));
    verifyCount = numberedLines.reduce((count, line) => {
      const tags = line.match(/\[VERIFY[^\]]*\]|\[STAT\]/gi);
      return count + (tags ? tags.length : 0);
    }, 0);
  }
  const cleanedBody = checklistMatch
    ? body.slice(0, checklistMatch.index).trimEnd()
    : body.trimEnd();
  return { body: cleanedBody, verifyCount };
}

function parseBlogFile(filePath: string): ParsedBlog {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const { body, verifyCount } = stripSignOffChecklist(content);
  const contentHtml = marked.parse(body, { async: false }) as string;

  if (!data.slug || !data.title) {
    throw new Error(`${path.basename(filePath)}: frontmatter missing required "slug" or "title"`);
  }

  return {
    file: path.basename(filePath),
    slug: String(data.slug),
    title: String(data.title),
    metaTitle: data.metaTitle ? String(data.metaTitle) : undefined,
    metaDescription: data.metaDescription ? String(data.metaDescription) : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    coverImage: data.coverImage ? String(data.coverImage) : undefined,
    contentHtml,
    verifyCount,
  };
}

function loadAndParseAll(): ParsedBlog[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    throw new Error(`No content dir at ${CONTENT_DIR}`);
  }
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
  if (files.length === 0) {
    throw new Error(`No .md files found in ${CONTENT_DIR}`);
  }
  return files.map((f) => parseBlogFile(path.join(CONTENT_DIR, f)));
}

function printSummary(parsed: ParsedBlog[]) {
  console.log(`Parsed ${parsed.length} blog draft(s) from ${CONTENT_DIR}\n`);
  for (const p of parsed) {
    console.log(`- ${p.file}`);
    console.log(`    slug:            ${p.slug}`);
    console.log(`    title:           ${p.title}`);
    console.log(`    metaTitle:       ${p.metaTitle ?? "(none)"}`);
    console.log(`    metaDescription: ${p.metaDescription ?? "(none)"}`);
    console.log(`    tags:            [${p.tags.join(", ")}]`);
    console.log(`    coverImage:      ${p.coverImage || "(blank — needs image before publish)"}`);
    console.log(`    content1:        ${p.contentHtml.length} chars of HTML`);
    console.log(`    isPublished:     false`);
    console.log(`    [VERIFY]/[STAT] items carried from source checklist: ${p.verifyCount}`);
    console.log("");
  }
  const totalVerify = parsed.reduce((sum, p) => sum + p.verifyCount, 0);
  console.log(`Total [VERIFY]/[STAT] sign-off items across all files: ${totalVerify}`);
}

async function main() {
  const parsed = loadAndParseAll();
  printSummary(parsed);

  if (DRY_RUN) {
    console.log("\n--dry-run: parsed only, no database touched.");
    return;
  }

  if (!process.env.DATABASE_URL) {
    console.error(
      "\nDATABASE_URL is not set — refusing to run a real upsert without an explicit target database."
    );
    console.error("Re-run with --dry-run to just parse, or set DATABASE_URL to the intended target.");
    process.exit(1);
  }

  // Lazy import so --dry-run (and `tsc --noEmit`/build checks) never need a
  // live Prisma connection. @/lib/db isn't reused here on purpose: this is
  // a one-off CLI script (relative imports, run via `tsx`, no Next.js
  // module resolution), not part of the app runtime.
  const { PrismaClient } = await import("@prisma/client");
  const { submitUrlsToIndexNow } = await import("../lib/indexnow");
  const { defaultSEO } = await import("../lib/seo.config");
  const db = new PrismaClient();

  try {
    for (const p of parsed) {
      const existing = await db.blogs.findFirst({ where: { slug: p.slug } });

      const data = {
        title: p.title,
        subtitle1: p.metaDescription || p.title,
        content1: p.contentHtml,
        image1: p.coverImage || "",
        metaTitle: p.metaTitle,
        metaDescription: p.metaDescription,
        tags: p.tags,
        coverImage: p.coverImage,
      };

      const result = existing
        ? await db.blogs.update({ where: { id: existing.id }, data })
        : await db.blogs.create({ data: { ...data, slug: p.slug, isPublished: false } });

      console.log(
        `Upserted "${result.slug}" (id ${result.id}, ${existing ? "updated" : "created"}, isPublished=${result.isPublished})`
      );

      // IndexNow hook: fire-and-forget, only for posts that are actually
      // live. Every post in this batch seeds as isPublished:false, so this
      // never fires today — it's here so publishing a post through this
      // same script (or the admin app reusing this upsert path) triggers
      // the ping automatically. Deliberately not awaited — IndexNow
      // delivery should never block the import loop.
      if (result.isPublished) {
        submitUrlsToIndexNow([`${defaultSEO.siteUrl}/blogs/${result.slug}`]).then((r) => {
          if (!r.ok) {
            console.warn(`IndexNow submit failed for ${result.slug}:`, r.error ?? r.status);
          }
        });
      }
    }
  } finally {
    await db.$disconnect();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
