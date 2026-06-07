import { generatePageMetadata } from "@/lib/seo.config";
import Navbar from "@/components/Navbar/navbar";
import Footer from "@/components/Footer/Footer";
import Link from "next/link";
import Image from "next/image";

export const revalidate = 3600;

export const metadata = generatePageMetadata({
  title: "Achievements & Awards | Dr. Dheeraj Dubay",
  description: "Explore all achievements, awards, conferences and records of Dr. Dheeraj Dubay, Forbes World Record holder and Best Joint Replacement Surgeon in Jaipur.",
  slug: "achievements",
});

const CATEGORIES = ["All", "Award", "Conference", "Record", "Media"];

interface Achievement {
  id: string;
  title: string;
  slug: string;
  category: string;
  date: string;
  description: string;
  imageUrl: string;
  isFeatured: boolean;
  featuredOrder?: number | null;
}

async function getAchievements(): Promise<Achievement[]> {
  try {
    const { db } = await import("@/lib/db");
    const achievements = await db.achievement.findMany({
      orderBy: [
        { isFeatured: "desc" },
        { featuredOrder: "asc" },
        { createdAt: "desc" },
      ],
    });
    return achievements.map((a) => ({ ...a, date: a.date.toISOString() })) as Achievement[];
  } catch {
    return [];
  }
}

export default async function AchievementsPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const achievements = await getAchievements();
  const activeCategory = searchParams.category || "All";

  const filtered =
    activeCategory === "All"
      ? achievements
      : achievements.filter((a) => a.category === activeCategory);

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-3">
            Achievements & Awards
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Recognitions, records and milestones in Dr. Dheeraj Dubay&apos;s journey of excellence in joint replacement surgery.
          </p>
        </div>

        {/* Category filter tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={cat === "All" ? "/achievements" : `/achievements?category=${cat}`}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                activeCategory === cat
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-gray-600 border-gray-300 hover:border-primary hover:text-primary"
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>

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
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.518-4.674z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No achievements found</h3>
            <p className="text-gray-400 max-w-md">
              There are no achievements in this category yet. Please check back later or browse a different category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((achievement) => (
              <Link
                key={achievement.id}
                href={`/achievements/${achievement.slug}`}
                className="group block bg-white rounded-xl shadow hover:shadow-lg transition-shadow overflow-hidden border border-gray-100"
              >
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  {achievement.imageUrl && (
                    <Image
                      src={achievement.imageUrl}
                      alt={achievement.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      unoptimized
                    />
                  )}
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-blue-700 shadow">
                    {achievement.category}
                  </span>
                  {achievement.isFeatured && (
                    <span className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-bold bg-yellow-400 text-yellow-900">
                      Featured
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <p className="text-xs text-gray-400 mb-1">
                    {new Date(achievement.date).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                    })}
                  </p>
                  <h2 className="text-lg font-bold text-gray-800 group-hover:text-primary transition-colors line-clamp-2">
                    {achievement.title}
                  </h2>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                    {achievement.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
