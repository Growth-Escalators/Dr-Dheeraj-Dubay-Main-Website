export const defaultSEO = {
  siteName: "Dr. Dheeraj Dubay",
  siteUrl: "https://www.drdubay.in",
  // GSC refresh (2026-08-25): the homepage owns broad doctor intent, with
  // 1,121 impressions for "best orthopedic doctor in jaipur" and another
  // 1,297 across the two main "orthopedic doctor ... jaipur" variants.
  // Lead with that query in a concise title; keep procedure intent on the
  // dedicated /services and /procedures pages to reduce cannibalisation.
  defaultTitle: "Orthopedic Doctor in Jaipur | Dr. Dheeraj Dubay",
  defaultDescription:
    "Consult Dr. Dheeraj Dubay, orthopedic doctor and knee and hip replacement surgeon at Shalby Hospital, Vaishali Nagar, Jaipur. View treatments and appointments.",
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
