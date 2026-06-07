import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Suspense } from "react";
import "./globals.css";
import { ThemeProvider } from "@/components/Provider/ThemeProvider";
import { ModalProvider } from "@/components/providers/modal-provider";
import { ToastProvider } from "@/components/providers/toast-provider";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import MobileBookingCTA from "@/components/ui/MobileBookingCTA";
import EmergencyBanner from "@/components/ui/EmergencyBanner";
import { LeadMagnetPopup } from "@/components/ui/LeadMagnetPopup";
import Navbar from "@/components/Navbar/navbar";
import Footer from "@/components/Footer/Footer";
import { AnalyticsListener } from "@/components/analytics/Analytics";
import { defaultSEO } from "@/lib/seo.config";

const GA4_ID = "G-TW8MWN7YW9";
const GTM_ID = "GTM-MDF4W4JT";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(defaultSEO.siteUrl),
  title: {
    default: defaultSEO.defaultTitle,
    template: `%s | ${defaultSEO.siteName}`,
  },
  description: defaultSEO.defaultDescription,
  keywords: defaultSEO.defaultKeywords,
  applicationName: defaultSEO.siteName,
  authors: [{ name: defaultSEO.siteName, url: defaultSEO.siteUrl }],
  creator: defaultSEO.siteName,
  publisher: defaultSEO.siteName,
  alternates: {
    canonical: defaultSEO.siteUrl,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/assets/images/logonew.png", type: "image/png" },
    ],
    apple: "/assets/images/logonew.png",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: defaultSEO.locale,
    url: defaultSEO.siteUrl,
    siteName: defaultSEO.siteName,
    title: defaultSEO.defaultTitle,
    description: defaultSEO.defaultDescription,
    images: [
      {
        url: "/assets/images/hero.png",
        width: 1200,
        height: 630,
        alt: defaultSEO.defaultTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: defaultSEO.twitterHandle,
    creator: defaultSEO.twitterHandle,
    title: defaultSEO.defaultTitle,
    description: defaultSEO.defaultDescription,
    images: ["/assets/images/hero.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "health",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager — head */}
        <Script
          id="gtm-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
        {/* GA4 gtag.js */}
        <Script
          id="ga4-src"
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
        />
        <Script
          id="ga4-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${GA4_ID}', { send_page_view: false });`,
          }}
        />
      </head>
      <body className={inter.className}>
        {/* Google Tag Manager (noscript fallback) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Suspense fallback={null}>
          <AnalyticsListener gaId={GA4_ID} />
        </Suspense>
        <ThemeProvider attribute="class" defaultTheme="light">
          <ToastProvider />
          <ModalProvider />
          <EmergencyBanner />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <MobileBookingCTA />
          <WhatsAppFloat />
          <LeadMagnetPopup />
        </ThemeProvider>
      </body>
    </html>
  );
}
