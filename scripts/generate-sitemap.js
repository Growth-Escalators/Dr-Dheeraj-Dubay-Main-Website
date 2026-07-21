const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const baseUrl = 'https://www.drdubay.in';

const procedureSlugs = [
  'robotic-knee-replacement', 'knee-replacement-surgery', 'hip-replacement-surgery',
  'computer-navigation-surgery', 'zero-technique-knee-replacement', 'partial-knee-replacement',
  'minimally-invasive-surgery', 'revision-knee-replacement', 'bilateral-knee-replacement',
];

const conditionSlugs = [
  'knee-pain', 'osteoarthritis', 'rheumatoid-arthritis', 'hip-pain',
  'avascular-necrosis', 'knee-stiffness', 'sports-injury-knee',
];

const hindiSlugs = [
  'ghutne-ki-takleef', 'ghutne-ka-operation', 'kulhe-ka-dard',
  'robotic-ghutna-pratiyaropan', 'gathiya-ka-ilaj', 'zero-technique-hindi',
];

const citySlugs = [
  'knee-replacement-agra', 'knee-replacement-kota',
  'knee-replacement-alwar', 'knee-replacement-ajmer', 'knee-replacement-sikar',
  'hip-replacement-jaipur', 'joint-replacement-surgeon-jaipur',
];

const staticLinks = [
  // Main Pages
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/about', changefreq: 'monthly', priority: 0.8 },
  { url: '/services', changefreq: 'monthly', priority: 0.8 },
  { url: '/blogs', changefreq: 'weekly', priority: 0.7 },
  { url: '/achievements', changefreq: 'weekly', priority: 0.7 },
  { url: '/gallery', changefreq: 'monthly', priority: 0.6 },
  { url: '/youtube', changefreq: 'monthly', priority: 0.6 },
  { url: '/contact', changefreq: 'yearly', priority: 0.5 },
  { url: '/events', changefreq: 'monthly', priority: 0.6 },
  // Procedure pages
  ...procedureSlugs.map(slug => ({ url: `/procedures/${slug}`, changefreq: 'weekly', priority: 0.9 })),
  // Condition pages
  ...conditionSlugs.map(slug => ({ url: `/conditions/${slug}`, changefreq: 'weekly', priority: 0.8 })),
  // Hindi pages
  ...hindiSlugs.map(slug => ({ url: `/hindi/${slug}`, changefreq: 'weekly', priority: 0.8 })),
  // City pages
  ...citySlugs.map(slug => ({ url: `/${slug}`, changefreq: 'monthly', priority: 0.7 })),
];

function makeUrl({ url, changefreq, priority }) {
  return `
    <url>
      <loc>${baseUrl}${url}</loc>
      <changefreq>${changefreq}</changefreq>
      <priority>${priority}</priority>
    </url>`;
}

async function generateSitemap() {
  try {
    // Fetch dynamic slugs from database
    const [achievements, blogs, services] = await Promise.all([
      prisma.achievement.findMany({ select: { slug: true } }),
      prisma.blogs.findMany({
        where: { isPublished: true, slug: { not: null } },
        select: { slug: true },
      }),
      prisma.services.findMany({
        where: { slug: { not: null } },
        select: { slug: true },
      }),
    ]);

    const dynamicLinks = [
      // Achievement detail pages
      ...achievements.map(({ slug }) => ({
        url: `/achievements/${slug}`,
        changefreq: 'monthly',
        priority: 0.7,
      })),
      // Blog detail pages
      ...blogs
        .filter(({ slug }) => slug)
        .map(({ slug }) => ({
          url: `/blogs/${slug}`,
          changefreq: 'weekly',
          priority: 0.7,
        })),
      // Service detail pages
      ...services
        .filter(({ slug }) => slug)
        .map(({ slug }) => ({
          url: `/services/${slug}`,
          changefreq: 'monthly',
          priority: 0.8,
        })),
    ];

    const allLinks = [...staticLinks, ...dynamicLinks];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  ${allLinks.map(makeUrl).join('')}
</urlset>`;

    fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemap);
    console.log(`Sitemap generated with ${allLinks.length} URLs (${dynamicLinks.length} dynamic).`);
  } catch (error) {
    console.error('Sitemap generation failed (DB unavailable), generating static-only sitemap:', error.message);
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticLinks.map(makeUrl).join('')}
</urlset>`;
    fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemap);
    console.log(`Static-only sitemap generated with ${staticLinks.length} URLs.`);
  } finally {
    await prisma.$disconnect();
  }
}

generateSitemap();
