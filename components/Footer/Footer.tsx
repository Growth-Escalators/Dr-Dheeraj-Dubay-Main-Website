import Link from "next/link";
import React from "react";
import {
  YoutubeIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  MapPinIcon,
  ChevronRightIcon,
  Link2Icon,
  StarIcon,
  UsersIcon,
  ShieldCheckIcon,
  StethoscopeIcon,
} from "lucide-react";
import Image from "next/image";
import { getWhatsAppBookingUrl } from "@/lib/whatsapp-booking";
import {
  EXPERIENCE_YEARS_DISPLAY,
  SURGERY_COUNT_DISPLAY,
} from "@/lib/clinic-info";
import { PRIORITY_JAIPUR_PAGES } from "@/lib/seo-priority-pages";

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
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
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
] as const;

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-white via-[#F4FCF8] to-[#E6F8F0] dark:from-gray-900 dark:to-gray-800">
      <div className="relative">
        <div className="container mx-auto px-4 py-14 md:py-16">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-emerald-100 dark:lg:divide-gray-700/60">
            <div className="text-center lg:pr-10">
              <Link href="/" className="mx-auto block w-44">
                <Image
                  height={300}
                  width={300}
                  src="/assets/images/logofinalbg.png"
                  alt="Dr. Dheeraj Dubay"
                  sizes="176px"
                  className="h-auto w-full transition-transform duration-300 hover:scale-105"
                />
              </Link>

              <div className="my-4 flex items-center justify-center gap-3">
                <span className="h-px w-12 bg-emerald-200" />
                <StethoscopeIcon className="h-4 w-4 text-emerald-500" />
                <span className="h-px w-12 bg-emerald-200" />
              </div>

              <p className="mx-auto max-w-xs text-[15px] leading-relaxed text-gray-600 dark:text-gray-300">
                Dr. Dheeraj Dubay is Director, Robotic Joint Replacement Surgery at Shalby Hospital Jaipur, with {EXPERIENCE_YEARS_DISPLAY} years of orthopedic experience and {SURGERY_COUNT_DISPLAY} total surgeries performed.
              </p>

              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white/70 px-4 py-2 text-sm font-medium text-gray-700 dark:border-emerald-900/50 dark:bg-gray-800/60 dark:text-gray-200">
                <MapPinIcon className="h-4 w-4 text-emerald-500" />
                Shalby Hospital, Jaipur
              </div>
            </div>

            <div className="lg:px-10">
              <ColumnHeading icon={Link2Icon}>Quick Links</ColumnHeading>
              <ul className="mt-7 space-y-4">
                <li><NavItem href={getWhatsAppBookingUrl()} external>Book Appointment</NavItem></li>
                <li><NavItem href="/about">About Dr. Dubay</NavItem></li>
                <li><NavItem href="/locations">Jaipur Locations</NavItem></li>
                <li><NavItem href="/contact">Contact</NavItem></li>
              </ul>
            </div>

            <div className="lg:px-10">
              <ColumnHeading icon={StarIcon}>Priority Care</ColumnHeading>
              <ul className="mt-7 space-y-4">
                {PRIORITY_JAIPUR_PAGES.slice(0, 6).map((item) => (
                  <li key={item.href}>
                    <NavItem href={item.href}>{item.label}</NavItem>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:pl-10">
              <ColumnHeading icon={UsersIcon}>Connect With Us</ColumnHeading>
              <div className="mt-7 flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    target="_blank"
                    rel="noopener noreferrer"
                    href={social.href}
                    className="group inline-flex h-12 w-12 items-center justify-center rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                  >
                    <social.icon className={`h-6 w-6 ${social.colorClass} transition-transform duration-300 group-hover:scale-110`} />
                    <span className="sr-only">{social.name}</span>
                  </a>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-emerald-100 bg-white/70 p-5 text-sm leading-relaxed text-gray-600 shadow-sm dark:border-emerald-900/50 dark:bg-gray-800/60 dark:text-gray-300">
                Medical information on this website is educational and does not replace an in-person examination or personalised treatment plan.
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-emerald-100 bg-white dark:border-gray-700/50 dark:bg-gray-900">
          <div className="container mx-auto px-4 py-10">
            <div className="mx-auto max-w-5xl">
              <div className="flex items-center gap-3">
                <ShieldCheckIcon className="h-6 w-6 shrink-0 text-emerald-600" />
                <div>
                  <h2 className="text-lg font-bold text-emerald-900 dark:text-gray-100">Joint replacement care in Jaipur</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Clear pathways for knee, robotic knee, joint and hip replacement — with separate cost and insurance information.</p>
                </div>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {PRIORITY_JAIPUR_PAGES.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group rounded-xl border border-emerald-100 bg-emerald-50/40 p-4 transition hover:border-emerald-300 hover:bg-emerald-50"
                  >
                    <span className="font-semibold text-gray-900 group-hover:text-emerald-800">{item.label}</span>
                    <span className="mt-1 block text-xs leading-relaxed text-gray-600">{item.description}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-emerald-100 bg-[#F1FBF6] dark:border-gray-700/50 dark:bg-gray-800/40">
          <div className="container mx-auto grid grid-cols-1 items-center gap-5 px-4 py-6 md:grid-cols-3">
            <p className="text-center text-sm font-semibold text-emerald-800 md:text-left dark:text-emerald-400">
              Evidence-informed orthopedic care focused on mobility and function.
            </p>

            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                &copy; {new Date().getFullYear()} Dr. Dheeraj Dubay. All Rights Reserved.
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Marketing partner: <a href="https://www.growthescalators.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-emerald-700">Growth Escalators</a>
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-gray-600 md:justify-end dark:text-gray-400">
              {[{ label: "FAQ", href: "/faq" }, { label: "Locations", href: "/locations" }, { label: "Contact", href: "/contact" }, { label: "Sitemap", href: "/sitemap.xml" }].map((item, i, arr) => (
                <React.Fragment key={item.label}>
                  <Link href={item.href} className="transition-colors hover:text-emerald-700 dark:hover:text-emerald-400">{item.label}</Link>
                  {i < arr.length - 1 && <span className="text-gray-300 dark:text-gray-600">|</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
