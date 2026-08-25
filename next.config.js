/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "uploadthing.com",
      },
      {
        // Vercel Blob — where the CRM now stores uploaded images. UploadThing
        // stopped accepting uploads (the admin app is on uploadthing v7, which
        // wants UPLOADTHING_TOKEN, while the deployment still had v6's
        // UPLOADTHING_SECRET), so admin uploads moved to Blob, which was
        // already provisioned. Existing utfs.io URLs above still resolve.
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "aba57f763df38f62713ad7584ba232dc.r2.cloudflarestorage.com",
        pathname: '/drdubey-events-media/**',
      },
      {
        protocol: 'https',
        hostname: '*.r2.cloudflarestorage.com',
      },
      {
        protocol: 'https',
        hostname: 'pub-*.r2.dev',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
      },
      {
        protocol: 'https',
        hostname: 'cdn.tuk.dev',
      },
    ],
    domains: ['placehold.co'],
  },
  async redirects() {
    return [
      // Phase 6: /youtube page renamed to /testimonials. Permanent 301
      // preserves any backlinks + GSC indexing already accrued.
      { source: '/youtube', destination: '/testimonials', permanent: true },
      { source: '/profile', destination: '/about', permanent: true },
      { source: '/procedures', destination: '/services', permanent: true },
      { source: '/conditions/knee-replacement-surgery', destination: '/procedures/knee-replacement-surgery', permanent: true },
      { source: '/conditions/robotic-knee-replacement', destination: '/procedures/robotic-knee-replacement', permanent: true },
      { source: '/services/total-knee-replacement.', destination: '/procedures/knee-replacement-surgery', permanent: true },
      // WS-3a: 13 zero-impression thin city pages pruned (0 impressions /
      // 6 months in GSC, no city-level search demand). Permanent redirect
      // to /locations consolidates any residual link equity + crawl paths.
      { source: '/knee-replacement-bikaner', destination: '/locations', permanent: true },
      { source: '/knee-replacement-bharatpur', destination: '/locations', permanent: true },
      { source: '/knee-replacement-jhunjhunu', destination: '/locations', permanent: true },
      { source: '/knee-replacement-churu', destination: '/locations', permanent: true },
      { source: '/knee-replacement-mathura', destination: '/locations', permanent: true },
      { source: '/knee-replacement-sawai-madhopur', destination: '/locations', permanent: true },
      { source: '/knee-replacement-tonk', destination: '/locations', permanent: true },
      { source: '/knee-replacement-dausa', destination: '/locations', permanent: true },
      { source: '/knee-replacement-nagaur', destination: '/locations', permanent: true },
      { source: '/knee-replacement-hanumangarh', destination: '/locations', permanent: true },
      { source: '/knee-replacement-pali', destination: '/locations', permanent: true },
      { source: '/knee-replacement-dholpur', destination: '/locations', permanent: true },
      { source: '/knee-replacement-bundi', destination: '/locations', permanent: true },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self)',
          },
        ],
      },
    ]
  },
};

module.exports = nextConfig;
