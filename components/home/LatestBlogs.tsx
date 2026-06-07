"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Blog {
  id: string;
  title: string;
  slug: string | null;
  subtitle1: string;
  image1: string;
  coverImage?: string | null;
  publishedAt?: string | null;
}

export default function LatestBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    fetch("/api/blogs")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setBlogs(data.slice(0, 3));
      })
      .catch(e => console.error('[LatestBlogs/fetch]', e));
  }, []);

  if (blogs.length === 0) return null;

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Health Articles
          </h2>
          <p className="text-gray-500">
            Expert insights on joint replacement and orthopedic health
          </p>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full mt-3" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/blogs/${blog.slug || blog.id}`}
              className="group bg-white rounded-xl shadow hover:shadow-lg transition-shadow overflow-hidden border border-gray-100"
            >
              <div className="h-48 bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden relative">
                {(blog.coverImage || blog.image1) && (
                  <Image
                    src={blog.coverImage || blog.image1}
                    alt={blog.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                )}
                {!(blog.coverImage || blog.image1) && (
                  <div className="flex items-center justify-center h-full">
                    <span className="text-4xl">📰</span>
                  </div>
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
                <h3 className="text-lg font-bold text-gray-800 group-hover:text-primary transition-colors line-clamp-2 mb-2">
                  {blog.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {blog.subtitle1?.slice(0, 100)}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/blogs"
            className="inline-block px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            Read All Articles
          </Link>
        </div>
      </div>
    </section>
  );
}
