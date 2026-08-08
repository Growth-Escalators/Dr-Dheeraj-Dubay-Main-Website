import Link from "next/link";
import React from "react";
import {
  YoutubeIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  MapPinIcon,
  MailIcon,
  ChevronRightIcon,
  Link2Icon,
  StarIcon,
  UsersIcon,
  ArrowRightIcon,
  FileTextIcon,
  ShieldCheckIcon,
  StethoscopeIcon,
} from "lucide-react";
import Image from "next/image";
import { CITY_PAGES } from "@/lib/city-pages";
import { PROCEDURE_PAGES } from "@/lib/procedure-pages";
import { COST_PAGES } from "@/lib/cost-pages";
import { getWhatsAppBookingUrl } from "@/lib/whatsapp-booking";
import { SURGERY_COUNT, EXPERIENCE_YEARS } from "@/lib/clinic-info";

type Props = {};

// Column heading: icon chip + title + short accent rule underneath.
function ColumnHeading({
  icon: Icon,
  children,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-600 dark:border-emerald-800/60 dark:bg-emerald-900/30 dark:text-emerald-400">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <h3 className="text-lg font-bold text-emerald-900 dark:text-gray-100">
          {children}
        </h3>
        <span className="mt-2 block h-[3px] w-10 rounded-full bg-emerald-500/70" />
      </div>
    </div>
  );
}

// Nav row: chevron + label, chevron nudges right on hover.
function NavItem({
  href,
  external,
  children,
}: {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  const className =
    "group inline-flex items-center gap-2 text-[15px] text-gray-600 transition-colors hover:text-emerald-700 dark:text-gray-300 dark:hover:text-emerald-400";
  const inner = (
    <>
      <ChevronRightIcon className="h-4 w-4 shrink-0 text-emerald-500 transition-transform duration-200 group-hover:translate-x-0.5" />
      <span>{children}</span>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {inner}
    </Link>
  );
}

// One card in the SEO internal-linking band.
function LinkCard({
  icon: Icon,
  title,
  blurb,
  children,
}: {
  icon: React.ElementType;
  title: string;
  blurb: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-6 dark:border-emerald-900/40 dark:bg-gray-800/40">
      <div className="flex items-start gap-4">
        <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-emerald-200 bg-white text-emerald-600 dark:border-emerald-800 dark:bg-gray-900 dark:text-emerald-400">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <h3 className="text-lg font-bold text-emerald-900 dark:text-gray-100">
            {title}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            {blurb}
          </p>
        </div>
      </div>
      <div className="mt-5 border-t border-emerald-100 pt-5 dark:border-emerald-900/40">
        {children}
      </div>
    </div>
  );
}

// Pill link used inside LinkCard. `icon` is optional — service-area pills
// carry a map pin, procedure pills are text-only, cost rows use a document
// icon and run full width.
function PillLink({
  href,
  icon: Icon,
  children,
}: {
  href: string;
  icon?: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-2 rounded-lg border border-emerald-100 bg-white px-3 py-2 text-[13px] leading-snug text-gray-700 transition-all hover:border-emerald-300 hover:text-emerald-700 hover:shadow-sm dark:border-gray-700 dark:bg-gray-900/60 dark:text-gray-300 dark:hover:border-emerald-700 dark:hover:text-emerald-400"
    >
      {Icon && <Icon className="h-3.5 w-3.5 shrink-0 text-emerald-500" />}
      <span className="min-w-0 flex-1">{children}</span>
      <ChevronRightIcon className="h-3.5 w-3.5 shrink-0 text-gray-300 transition-all group-hover:translate-x-0.5 group-hover:text-emerald-500 dark:text-gray-600" />
    </Link>
  );
}

const Footer = (props: Props) => {
  const socialLinks = [
    {
      name: "Facebook",
      href: "https://www.facebook.com/drdheerajdubay/",
      icon: FacebookIcon,
      colorClass: "text-[#1877F2]",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/dheerajdubay1/",
      icon: InstagramIcon,
      colorClass: "text-[#E1306C]",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/dr-dheeraj-dubay-36399599/",
      icon: LinkedinIcon,
      colorClass: "text-[#0A66C2]",
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/@dr.dheerajdubay6664",
      icon: YoutubeIcon,
      colorClass: "text-[#FF0000]",
    },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-white via-[#F4FCF8] to-[#E6F8F0] dark:from-gray-900 dark:to-gray-800">
      {/* Decorative grid wash */}
      <div className="pointer-events-none absolute inset-0 bg-grid-slate-200 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/30" />

      <div className="relative">
        {/* ---------------------------------------------------------------
            1. Brand + navigation + connect. Four columns, split by hairline
            dividers on desktop, stacked on mobile.
        --------------------------------------------------------------- */}
        <div className="container mx-auto px-4 py-14 md:py-16">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-emerald-100 dark:lg:divide-gray-700/60">
            {/* Brand */}
            <div className="text-center lg:pr-10">
              <Link href="/" className="mx-auto block w-44">
                <Image
                  height={600}
                  width={600}
                  src={"/assets/images/logofinalbg.png"}
                  alt={"Dr. Dheeraj Dubay"}
                  className="transition-transform duration-300 hover:scale-105"
                />
              </Link>

              {/* Divider flourish under the wordmark */}
              <div className="my-4 flex items-center justify-center gap-3">
                <span className="h-px w-12 bg-emerald-200" />
                <StethoscopeIcon className="h-4 w-4 text-emerald-500" />
                <span className="h-px w-12 bg-emerald-200" />
              </div>

              <p className="mx-auto max-w-xs text-[15px] leading-relaxed text-gray-600 dark:text-gray-300">
                Dr. Dheeraj is one of the leading joint replacement surgeons in
                North India, with over {EXPERIENCE_YEARS} years of experience and
                more than {SURGERY_COUNT.toLocaleString()} successful surgeries.
              </p>

              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white/70 px-4 py-2 text-sm font-medium text-gray-700 backdrop-blur dark:border-emerald-900/50 dark:bg-gray-800/60 dark:text-gray-200">
                <MapPinIcon className="h-4 w-4 text-emerald-500" />
                Shalby Hospital, Jaipur
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:px-10">
              <ColumnHeading icon={Link2Icon}>Quick Links</ColumnHeading>
              <ul className="mt-7 space-y-4">
                <li>
                  <NavItem href={getWhatsAppBookingUrl()} external>
                    Book Appointment
                  </NavItem>
                </li>
                {/* Routes are explicit: the previous version derived them from
                    the label ("About Us" -> /about-us, "Contact Us" ->
                    /contact-us), and neither route exists — both links 404'd. */}
                <li>
                  <NavItem href="/about">About Us</NavItem>
                </li>
                <li>
                  <NavItem href="/contact">Contact Us</NavItem>
                </li>
              </ul>
            </div>

            {/* More Links */}
            <div className="lg:px-10">
              <ColumnHeading icon={StarIcon}>More Links</ColumnHeading>
              <ul className="mt-7 space-y-4">
                {[
                  { label: "Services", href: "/services" },
                  { label: "Podcasts & News", href: "/news" },
                  { label: "Articles", href: "/articles" },
                  { label: "Podcasts", href: "/podcasts" },
                  { label: "Testimonials", href: "/testimonials" },
                ].map((item) => (
                  <li key={item.label}>
                    <NavItem href={item.href}>{item.label}</NavItem>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div className="lg:pl-10">
              <ColumnHeading icon={UsersIcon}>Connect With Us</ColumnHeading>

              <div className="mt-7 flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    target="_blank"
                    href={social.href}
                    className="group inline-flex h-12 w-12 items-center justify-center rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                  >
                    <social.icon
                      className={`h-6 w-6 ${social.colorClass} transition-transform duration-300 group-hover:scale-110`}
                    />
                    <span className="sr-only">{social.name}</span>
                  </Link>
                ))}
              </div>

              {/* Newsletter */}
              <div className="mt-6 rounded-2xl border border-emerald-100 bg-white/70 p-5 shadow-sm backdrop-blur-sm dark:border-emerald-900/50 dark:bg-gray-800/60">
                <div className="flex items-start gap-3">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
                    <MailIcon className="h-5 w-5" />
                  </span>
                  <div>
                    <h4 className="font-bold text-emerald-800 dark:text-emerald-400">
                      Subscribe to Newsletter
                    </h4>
                    <p className="mt-1 text-sm leading-snug text-gray-500 dark:text-gray-400">
                      Stay updated with health tips, expert insights &amp; the
                      latest updates.
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="relative">
                    <MailIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      aria-label="Email address"
                      className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-100"
                    />
                  </div>
                  <button
                    type="button"
                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-3 font-semibold text-white transition-all duration-300 hover:from-emerald-700 hover:to-teal-700"
                  >
                    Subscribe
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                      <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------------------
            2. Internal-linking band (SEO). Same three link sets as before —
            one link from every page on the site to each city, procedure and
            cost page — now grouped into cards instead of three stacked
            wrap-lists, so the section scans in a glance.
        --------------------------------------------------------------- */}
        <div className="border-t border-emerald-100 bg-white dark:border-gray-700/50 dark:bg-gray-900">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <LinkCard
                icon={MapPinIcon}
                title="Service Areas"
                blurb="Dr. Dheeraj Dubay serves joint replacement patients across Rajasthan and beyond."
              >
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {/* Hardcoded — hip-replacement-jaipur was removed from
                      CITY_PAGES (WS-4b, now a dedicated money page) so it no
                      longer appears via the map below. Kept as an explicit
                      link so every page still carries this internal-linking
                      signal. */}
                  <PillLink href="/hip-replacement-jaipur" icon={MapPinIcon}>
                    Hip Replacement Surgeon in Jaipur
                  </PillLink>
                  {CITY_PAGES.map((c) => (
                    <PillLink
                      key={c.slug}
                      href={`/${c.slug}`}
                      icon={MapPinIcon}
                    >
                      {c.procedure} in {c.city}
                    </PillLink>
                  ))}
                </div>
              </LinkCard>

              <LinkCard
                icon={StethoscopeIcon}
                title="Procedures"
                blurb="Full range of joint replacement and orthopedic procedures performed by Dr. Dubay."
              >
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {PROCEDURE_PAGES.map((p) => (
                    <PillLink key={p.slug} href={`/procedures/${p.slug}`}>
                      {p.title}
                    </PillLink>
                  ))}
                </div>
              </LinkCard>

              <LinkCard
                icon={ShieldCheckIcon}
                title="Cost & Insurance"
                blurb="What surgery actually costs, and how insurance and cashless coverage apply."
              >
                <div className="space-y-2">
                  {COST_PAGES.map((c) => (
                    <PillLink
                      key={c.slug}
                      href={`/cost/${c.slug}`}
                      icon={FileTextIcon}
                    >
                      {c.h1}
                    </PillLink>
                  ))}
                </div>
              </LinkCard>
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------------------
            3. Bottom bar — promise line, copyright, utility links.
        --------------------------------------------------------------- */}
        <div className="border-t border-emerald-100 bg-[#F1FBF6] dark:border-gray-700/50 dark:bg-gray-800/40">
          <div className="container mx-auto grid grid-cols-1 items-center gap-5 px-4 py-6 md:grid-cols-3">
            <div className="flex items-center justify-center gap-3 md:justify-start">
              <ShieldCheckIcon className="h-8 w-8 shrink-0 text-emerald-600" />
              <div>
                <p className="text-sm font-bold text-emerald-800 dark:text-emerald-400">
                  Dedicated to Restoring Mobility. Committed to Enhancing Lives.
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Expert care. Advanced technology. Compassionate outcomes.
                </p>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                &copy; {new Date().getFullYear()} Dr. Dheeraj Dubay. All Rights
                Reserved.
              </p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                Marketing partner:{" "}
                <a
                  href="https://www.growthescalators.com"
                  target="_blank"
                  rel="noopener"
                  className="underline underline-offset-2 transition-colors hover:text-emerald-600"
                >
                  Growth Escalators
                </a>{" "}
                &middot; CRM &amp; Tech partner:{" "}
                <a
                  href="https://www.wizmatchenterprises.com"
                  target="_blank"
                  rel="noopener"
                  className="underline underline-offset-2 transition-colors hover:text-emerald-600"
                >
                  WizMatch
                </a>
              </p>
            </div>

            {/* Utility links. Only routes that actually exist are listed —
                Privacy Policy / Terms / Refund pages have not been built yet
                (see app/), and linking to 404s from every page is an SEO
                liability. Add them here once those pages ship. */}
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-gray-600 dark:text-gray-400 md:justify-end">
              {[
                { label: "FAQ", href: "/faq" },
                { label: "Locations", href: "/locations" },
                { label: "Contact", href: "/contact" },
                { label: "Sitemap", href: "/sitemap.xml" },
              ].map((item, i, arr) => (
                <React.Fragment key={item.label}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-emerald-700 dark:hover:text-emerald-400"
                  >
                    {item.label}
                  </Link>
                  {i < arr.length - 1 && (
                    <span className="text-gray-300 dark:text-gray-600">|</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
