import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { defaultSEO } from "@/lib/seo.config";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { db } from "@/lib/db";

export const revalidate = 3600;

const ACHIEVEMENT_IMAGE_FALLBACK = "/assets/images/hero.png";

async function getAchievementBySlug(slug: string) {
  try {
    return await db.achievement.findUnique({ where: { slug } });
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const achievement = await getAchievementBySlug(params.slug);

  if (!achievement) {
    return { title: "Achievement Not Found" };
  }

  const title = achievement.metaTitle || achievement.title;
  const description =
    achievement.metaDescription ||
    achievement.description.slice(0, 160);

  return {
    title,
    description,
    alternates: {
      canonical: `${defaultSEO.siteUrl}/achievements/${achievement.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${defaultSEO.siteUrl}/achievements/${achievement.slug}`,
      siteName: defaultSEO.siteName,
      images: [
        {
          url: achievement.imageUrl || `${defaultSEO.siteUrl}/assets/images/hero.png`,
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
      images: [achievement.imageUrl || `${defaultSEO.siteUrl}/assets/images/hero.png`],
    },
  };
}

const AchievementArticleJsonLd = ({ achievement }: { achievement: any }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: achievement.title,
    description: achievement.description,
    image: achievement.imageUrl,
    datePublished: achievement.date,
    dateModified: achievement.createdAt,
    author: {
      "@type": "Person",
      name: "Dr. Dheeraj Dubay",
      url: defaultSEO.siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: defaultSEO.siteName,
      url: defaultSEO.siteUrl,
    },
    url: `${defaultSEO.siteUrl}/achievements/${achievement.slug}`,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default async function AchievementDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const achievement = await getAchievementBySlug(params.slug);

  if (!achievement) {
    notFound();
  }

  return (
    <>
      <AchievementArticleJsonLd achievement={achievement} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "https://www.drdubay.in" },
        { name: "Achievements", url: "https://www.drdubay.in/achievements" },
        { name: achievement.title, url: `https://www.drdubay.in/achievements/${achievement.slug}` },
      ]} />
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          {" / "}
          <Link href="/achievements" className="hover:text-primary">
            Achievements
          </Link>
          {" / "}
          <span className="text-gray-700">{achievement.title}</span>
        </div>

        {/* Image */}
        <div className="relative w-full aspect-[16/9] max-h-[480px] rounded-xl overflow-hidden mb-8 shadow-md bg-gray-100">
          <ImageWithFallback
            src={achievement.imageUrl || ACHIEVEMENT_IMAGE_FALLBACK}
            fallbackSrc={ACHIEVEMENT_IMAGE_FALLBACK}
            alt={achievement.title}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
            priority
            unoptimized
          />
        </div>

        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-700">
              {achievement.category}
            </span>
            {achievement.isFeatured && (
              <span className="px-3 py-1 rounded-full text-sm font-bold bg-yellow-100 text-yellow-700">
                Featured
              </span>
            )}
            <span className="text-sm text-gray-400">
              {new Date(achievement.date).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">
            {achievement.title}
          </h1>
        </div>

        {/* Description */}
        <div className="prose max-w-none text-gray-700 text-base leading-relaxed mb-10">
          <p>{achievement.description}</p>
        </div>

        {/* Back link */}
        <Link
          href="/achievements"
          className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
        >
          ← Back to all achievements
        </Link>
      </div>
    </>
  );
}
