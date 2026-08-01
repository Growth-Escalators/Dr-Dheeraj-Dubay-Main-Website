import { generatePageMetadata } from "@/lib/seo.config";
import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/db";

export const revalidate = 60;

export const metadata = generatePageMetadata({
  title: "Orthopedic Health Blog | Dr. Dheeraj Dubay",
  description:
    "Expert articles on joint replacement, knee surgery, hip surgery recovery and orthopedic health by Dr. Dheeraj Dubay, Jaipur.",
  slug: "blogs",
});

interface Blog {
  id: string;
  title: string;
  slug: string | null;
  subtitle1: string;
  image1: string;
  coverImage?: string | null;
  tags: string[];
  publishedAt?: string | null;
}

async function getPublishedBlogs(): Promise<Blog[]> {
  try {
    const blogs = await db.blogs.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: "desc" },
    });
    return blogs as Blog[];
  } catch {
    return [];
  }
}

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: { tag?: string };
}) {
  const blogs = await getPublishedBlogs();
  const activeTag = searchParams.tag || "";

  const allTags = Array.from(
    new Set(blogs.flatMap((b) => b.tags ?? []))
  ).filter(Boolean);

  const filtered = activeTag
    ? blogs.filter((b) => b.tags?.includes(activeTag))
    : blogs;

  return (
    <>
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-3">
            Orthopedic Health Blog
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Expert insights on joint replacement, recovery tips, and orthopedic
            health by Dr. Dheeraj Dubay.
          </p>
        </div>

        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            <Link
              href="/blogs"
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                !activeTag
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-gray-600 border-gray-300 hover:border-primary hover:text-primary"
              }`}
            >
              All
            </Link>
            {allTags.map((tag) => (
              <Link
                key={tag}
                href={`/blogs?tag=${encodeURIComponent(tag)}`}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                  activeTag === tag
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-gray-600 border-gray-300 hover:border-primary hover:text-primary"
                }`}
              >
                {tag}
              </Link>
            ))}
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-gray-300 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No blog posts found</h3>
            <p className="text-gray-400 max-w-md">
              There are no blog posts matching your filter yet. Check back soon for new articles on orthopedic health.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((blog) => (
              <Link
                key={blog.id}
                href={`/blogs/${blog.slug}`}
                className="group block bg-white rounded-xl shadow hover:shadow-lg transition-shadow overflow-hidden border border-gray-100"
              >
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                  {(blog.coverImage || blog.image1) ? (
                    <Image
                      src={blog.coverImage || blog.image1}
                      alt={blog.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      unoptimized
                    />
                  ) : (
                    <span className="text-5xl">📰</span>
                  )}
                </div>
                <div className="p-5">
                  {blog.publishedAt && (
                    <p className="text-xs text-gray-400 mb-1">
                      {new Date(blog.publishedAt).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  )}
                  <h2 className="text-lg font-bold text-gray-800 group-hover:text-primary transition-colors line-clamp-2 mb-2">
                    {blog.title}
                  </h2>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {blog.subtitle1?.slice(0, 150)}
                  </p>
                  {blog.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {blog.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full text-xs bg-blue-50 text-blue-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
