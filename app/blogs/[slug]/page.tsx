import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { defaultSEO } from "@/lib/seo.config";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { extractFaqsFromHtml } from "@/lib/blog-faq";
import { db } from "@/lib/db";

// IndexNow (WS-1: lib/indexnow.ts) belongs on the *publish* path, not on
// every page render. This repo's public API routes under app/api/blogs are
// read-only (GET) — posts are published through the separate admin app
// (see the Article model's comment in prisma/schema.prisma for the same
// pattern), so there is no publish/update route here to hook into. The
// actual ping fires from scripts/seed-blogs.ts's upsert loop, which is the
// one place in this repo that flips isPublished today. If a publish
// endpoint is ever added to this repo (e.g. a PATCH on
// app/api/blogs/[slug]/route.ts), call
// `submitUrlsToIndexNow([\`${defaultSEO.siteUrl}/blogs/${slug}\`])`
// (fire-and-forget, don't await) right after that write succeeds.

export const revalidate = 60;

async function getBlogBySlug(slug: string) {
  try {
    return await db.blogs.findFirst({
      where: { slug, isPublished: true },
    });
  } catch {
    return null;
  }
}

async function getRecentBlogs() {
  try {
    return await db.blogs.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: "desc" },
      take: 5,
    });
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const blog = await getBlogBySlug(params.slug);

  if (!blog) {
    return { title: "Blog Not Found" };
  }

  const title = blog.metaTitle || blog.title;
  const description =
    blog.metaDescription || blog.subtitle1?.slice(0, 160) || "";

  return {
    title,
    description,
    alternates: {
      canonical: `${defaultSEO.siteUrl}/blogs/${blog.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${defaultSEO.siteUrl}/blogs/${blog.slug}`,
      siteName: defaultSEO.siteName,
      images: [
        {
          url:
            (blog as any).coverImage ||
            blog.image1 ||
            `${defaultSEO.siteUrl}/assets/images/hero.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        (blog as any).coverImage ||
          blog.image1 ||
          `${defaultSEO.siteUrl}/assets/images/hero.png`,
      ],
    },
  };
}

const BlogArticleJsonLd = ({ blog }: { blog: any }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    description: blog.metaDescription || blog.subtitle1,
    image: blog.coverImage || blog.image1,
    datePublished: blog.publishedAt,
    dateModified: blog.publishedAt,
    // Reference, not a re-declared entity — resolves against the full
    // Physician node emitted by <PhysicianJsonLd /> on the homepage/about
    // page (components/seo/JsonLd.tsx), same @id convention used across
    // this site (see app/articles/page.tsx, app/testimonials/page.tsx).
    author: {
      "@id": `${defaultSEO.siteUrl}/#physician`,
    },
    publisher: {
      "@type": "Organization",
      name: defaultSEO.siteName,
      url: defaultSEO.siteUrl,
    },
    url: `${defaultSEO.siteUrl}/blogs/${blog.slug}`,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default async function BlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const [blog, recentBlogs] = await Promise.all([
    getBlogBySlug(params.slug),
    getRecentBlogs(),
  ]);

  if (!blog) {
    notFound();
  }

  const faqs = extractFaqsFromHtml(blog.content1);

  return (
    <>
      <BlogArticleJsonLd blog={blog} />
      {faqs.length > 0 && <FaqJsonLd faqs={faqs} />}
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "https://www.drdubay.in" },
        { name: "Blog", url: "https://www.drdubay.in/blogs" },
        { name: blog.title, url: `https://www.drdubay.in/blogs/${blog.slug}` },
      ]} />
      <div className="container mx-auto px-4">
        <main className="mt-12 mb-16">
          {/* Breadcrumb */}
          <div className="mb-6 text-sm text-gray-500">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            {" / "}
            <Link href="/blogs" className="hover:text-primary">
              Blog
            </Link>
            {" / "}
            <span className="text-gray-700">{blog.title}</span>
          </div>

          <div className="flex flex-col md:flex-row space-x-0 md:space-x-8">
            {/* Main content */}
            <div className="w-full md:w-4/6">
              <h1 className="text-gray-800 text-3xl md:text-4xl font-bold mb-4 leading-tight">
                {blog.title}
              </h1>

              {blog.publishedAt && (
                <p className="text-sm text-gray-400 mb-6">
                  Published{" "}
                  {new Date(blog.publishedAt).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  {" · "}
                  <span className="text-green-700">Dr. Dheeraj Dubay</span>
                </p>
              )}

              {/* Cover / primary image */}
              {((blog as any).coverImage || blog.image1) && (
                <div className="relative w-full aspect-[16/9] max-h-[480px] mb-6 overflow-hidden rounded-md">
                  <Image
                    src={(blog as any).coverImage || blog.image1}
                    alt={blog.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 800px"
                    className="object-cover"
                    priority
                    unoptimized
                  />
                </div>
              )}

              {/* Tags */}
              {(blog as any).tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {(blog as any).tags.map((tag: string) => (
                    <Link
                      key={tag}
                      href={`/blogs?tag=${encodeURIComponent(tag)}`}
                      className="px-3 py-1 rounded-full text-xs bg-blue-50 text-blue-600 hover:bg-blue-100"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              )}

              {/* Subtitle1 */}
              <h2 className="text-gray-700 text-xl font-semibold mb-3">
                {blog.subtitle1}
              </h2>

              {/* Content1 — rendered as HTML from Quill */}
              <div
                className="text-gray-700 text-base leading-relaxed mb-8"
                dangerouslySetInnerHTML={{ __html: blog.content1 }}
              />

              {/* Image1 (secondary) */}
              {blog.image1 && (blog as any).coverImage && (
                <div className="relative w-full aspect-[16/9] max-h-[400px] mb-8 overflow-hidden rounded-md">
                  <Image
                    src={blog.image1}
                    alt={blog.subtitle1}
                    fill
                    sizes="(max-width: 768px) 100vw, 800px"
                    className="object-cover"
                    unoptimized
                  />
                </div>
              )}

              {/* Section 2 */}
              {blog.subtitle2 && (
                <h2 className="text-gray-700 text-xl font-semibold mb-3 mt-8">
                  {blog.subtitle2}
                </h2>
              )}

              {blog.image2 && (
                <div className="relative w-full aspect-[16/9] max-h-[400px] mb-6 overflow-hidden rounded-md">
                  <Image
                    src={blog.image2}
                    alt={blog.subtitle2 || ""}
                    fill
                    sizes="(max-width: 768px) 100vw, 800px"
                    className="object-cover"
                    unoptimized
                  />
                </div>
              )}

              {blog.content2 && (
                <div
                  className="text-gray-700 text-base leading-relaxed mb-8"
                  dangerouslySetInnerHTML={{ __html: blog.content2 }}
                />
              )}

              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
              >
                ← Back to all posts
              </Link>
            </div>

            {/* Sidebar — recent posts */}
            <div className="w-full md:w-2/6 mt-10 md:mt-0">
              <div className="md:sticky md:top-8">
                <p className="text-[#EE8A27] font-semibold text-xl mb-4">
                  Recent Posts
                </p>
                <div className="flex flex-col gap-4">
                  {recentBlogs.map((item) => (
                    <Link
                      key={item.id}
                      href={`/blogs/${item.slug}`}
                      className="flex gap-3 group"
                    >
                      {(item as any).coverImage || item.image1 ? (
                        <div className="relative w-20 h-16 flex-shrink-0 overflow-hidden rounded-md">
                          <Image
                            src={(item as any).coverImage || item.image1}
                            alt={item.title}
                            fill
                            sizes="80px"
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                      ) : null}
                      <div>
                        <p className="text-gray-800 font-semibold text-sm group-hover:text-primary transition-colors line-clamp-2">
                          {item.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                          {item.subtitle1}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
