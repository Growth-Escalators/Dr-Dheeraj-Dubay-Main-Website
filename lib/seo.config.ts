export const defaultSEO = {
  siteName: "Dr. Dheeraj Dubay",
  siteUrl: "https://www.drdubay.in",
  defaultTitle: "Dr. Dheeraj Dubay | Best Joint Replacement Surgeon in Jaipur",
  defaultDescription:
    "Dr. Dheeraj Dubay - Director, Robotic Joint Replacement Surgery at Shalby Hospital Jaipur. 35,000+ successful surgeries, Forbes World Record holder, 23+ years experience.",
  defaultKeywords:
    "joint replacement surgeon jaipur, knee replacement jaipur, hip replacement jaipur, best orthopedic surgeon rajasthan, dr dheeraj dubay",
  twitterHandle: "@drdheerajdubay",
  locale: "en_IN",
}

interface PageMetadataInput {
  title?: string
  description?: string
  keywords?: string
  /** Slug used for canonical URL — same path used for OG/Twitter URLs. */
  slug?: string
  image?: string
  /**
   * Optional English ↔ Hindi alternates. Provide either `englishSlug` (on a
   * Hindi page) or `hindiSlug` (on an English page) and the helper will emit
   * the right hreflang `<link>` tags so Google can serve the right language
   * variant by region.
   */
  englishSlug?: string
  hindiSlug?: string
}

export const generatePageMetadata = ({
  title,
  description,
  keywords,
  slug,
  image,
  englishSlug,
  hindiSlug,
}: PageMetadataInput) => {
  const canonical = slug
    ? `${defaultSEO.siteUrl}/${slug.replace(/^\//, '')}`
    : defaultSEO.siteUrl

  // hreflang alternates: emit when we know the twin slug in the other language.
  // Convention here:
  //  - Hindi pages live at /hindi/<slug>. Pass `englishSlug` to point at the
  //    English equivalent (which may live at /procedures/<slug>,
  //    /conditions/<slug>, or another root path — handled by the caller).
  //  - English pages pass `hindiSlug` (the Hindi slug under /hindi/).
  const isOnHindiRoute = !!slug && slug.startsWith('hindi/')
  let languageAlternates:
    | Record<'en-IN' | 'hi-IN' | 'x-default', string>
    | undefined

  if (englishSlug && isOnHindiRoute) {
    const en = `${defaultSEO.siteUrl}/${englishSlug.replace(/^\//, '')}`
    languageAlternates = {
      'en-IN': en,
      'hi-IN': canonical,
      'x-default': en,
    }
  } else if (hindiSlug && !isOnHindiRoute) {
    const hi = `${defaultSEO.siteUrl}/hindi/${hindiSlug.replace(/^\/?hindi\//, '').replace(/^\//, '')}`
    languageAlternates = {
      'en-IN': canonical,
      'hi-IN': hi,
      'x-default': canonical,
    }
  }

  return {
    title: title ?? defaultSEO.defaultTitle,
    description: description ?? defaultSEO.defaultDescription,
    keywords: keywords ?? defaultSEO.defaultKeywords,
    alternates: {
      canonical,
      ...(languageAlternates ? { languages: languageAlternates } : {}),
    },
    openGraph: {
      title: title ?? defaultSEO.defaultTitle,
      description: description ?? defaultSEO.defaultDescription,
      url: canonical,
      siteName: defaultSEO.siteName,
      locale: isOnHindiRoute ? 'hi_IN' : defaultSEO.locale,
      type: "website" as const,
      images: [
        {
          url: image ?? `${defaultSEO.siteUrl}/assets/images/hero.png`,
          width: 1200,
          height: 630,
          alt: title ?? defaultSEO.defaultTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: title ?? defaultSEO.defaultTitle,
      description: description ?? defaultSEO.defaultDescription,
      images: [image ?? `${defaultSEO.siteUrl}/assets/images/hero.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large" as const,
        "max-snippet": -1,
      },
    },
    // GSC verification meta — set NEXT_PUBLIC_GSC_VERIFICATION on Vercel
    // with the value from "Verify ownership → HTML tag". Survives DNS
    // changes that would invalidate TXT-record verification.
    ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION
      ? {
          verification: {
            google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
          },
        }
      : {}),
  }
}
