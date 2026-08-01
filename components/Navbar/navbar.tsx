"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Disclosure, Popover, Transition } from "@headlessui/react";
import { ChevronDown, PhoneIcon, MenuIcon, XIcon } from "lucide-react";
import ThemeChanger from "./DarkSwitch";

const PHONE_DISPLAY = "+91 89553 73205";
const PHONE_TEL = "+918955373205";
const BOOK_URL = "/booking/jaipur";

type NavItem =
  | { label: string; href: string }
  | { label: string; children: { label: string; href: string }[] };

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  // Achievements and Events were promoted out of the "Why Dr. Dubay"
  // dropdown to top-level items. That left only About behind it, so the
  // dropdown became a plain link to /about rather than a one-item menu.
  { label: "Why Dr. Dubay", href: "/about" },
  { label: "Achievements", href: "/achievements" },
  { label: "Events", href: "/events" },
  { label: "Services", href: "/services" },
  { label: "Testimonials", href: "/testimonials" },
  {
    label: "Public Mentions",
    children: [
      { label: "Articles", href: "/articles" },
      { label: "Podcasts", href: "/podcasts" },
    ],
  },
];

function DesktopDropdown({ label, items }: { label: string; items: { label: string; href: string }[] }) {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={`inline-flex items-center gap-1 px-3 xl:px-4 py-2 text-[15px] xl:text-base font-semibold text-gray-800 rounded-md hover:text-primary focus:outline-none ${
              open ? "text-primary" : ""
            }`}
          >
            {label}
            <ChevronDown
              className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
            />
          </Popover.Button>
          <Transition
            enter="transition duration-150 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-100 ease-in"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Popover.Panel className="absolute left-0 z-50 mt-1 w-56 rounded-lg border border-gray-200 bg-white shadow-lg">
              <ul className="py-2">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-shadow ${
        scrolled
          ? "bg-white/95 backdrop-blur shadow-sm"
          : "bg-[#E2FFF5]"
      } dark:text-primary`}
    >
      <nav className="container relative flex flex-wrap items-center justify-between p-3 mx-auto lg:justify-between xl:px-0">
        <Disclosure>
          {({ open }) => (
            <>
              <div className="flex flex-wrap items-center justify-between w-full lg:w-auto">
                <Link href="/" aria-label="Dr. Dheeraj Dubay home">
                  <Image
                    src="/assets/images/logofinalbg.png"
                    alt="Dr. Dheeraj Dubay — Joint Replacement Surgeon, Jaipur"
                    width={150}
                    height={50}
                    className="w-[110px] h-auto"
                    priority
                  />
                </Link>

                <Disclosure.Button
                  aria-label="Toggle Menu"
                  className="px-2 py-1 ml-auto rounded-md lg:hidden hover:text-primary focus:outline-none"
                >
                  {open ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
                </Disclosure.Button>

                <Disclosure.Panel className="flex flex-wrap w-full my-5 lg:hidden text-black">
                  <ul className="w-full">
                    {NAV_ITEMS.map((item) =>
                      "href" in item ? (
                        <li key={item.label}>
                          <Link
                            href={item.href}
                            className="block w-full px-4 py-2 -ml-4 hover:text-primary"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ) : (
                        <li key={item.label}>
                          <p className="px-4 py-2 -ml-4 text-sm font-semibold text-gray-500 uppercase tracking-wide">
                            {item.label}
                          </p>
                          <ul className="ml-2">
                            {item.children.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  className="block px-4 py-2 -ml-4 hover:text-primary"
                                >
                                  · {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      ),
                    )}
                  </ul>
                  <Link
                    href={BOOK_URL}
                    className="mt-3 w-full inline-flex items-center justify-center gap-2 px-4 py-3 -ml-4 bg-primary text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Book Appointment
                  </Link>
                  <a
                    href={`tel:${PHONE_TEL}`}
                    className="mt-2 w-full inline-flex items-center justify-center gap-2 px-4 py-3 -ml-4 bg-emerald-600 text-white font-semibold rounded-md hover:bg-emerald-700 transition-colors"
                  >
                    <PhoneIcon className="w-4 h-4" />
                    Call {PHONE_DISPLAY}
                  </a>
                </Disclosure.Panel>
              </div>
            </>
          )}
        </Disclosure>

        {/* Desktop menu. Padding/size tighten at lg so seven top-level items
            still fit on one row after Achievements and Events were promoted
            out of the "Why Dr. Dubay" dropdown. */}
        <div className="hidden lg:flex lg:items-center lg:gap-1">
          {NAV_ITEMS.map((item) =>
            "href" in item ? (
              <Link
                key={item.label}
                href={item.href}
                className="inline-block px-3 xl:px-4 py-2 text-[15px] xl:text-base font-semibold text-gray-800 rounded-md hover:text-primary focus:outline-none whitespace-nowrap"
              >
                {item.label}
              </Link>
            ) : (
              <DesktopDropdown key={item.label} label={item.label} items={item.children} />
            ),
          )}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href={`tel:${PHONE_TEL}`}
            aria-label={`Call ${PHONE_DISPLAY}`}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold text-emerald-700 border border-emerald-200 rounded-md hover:bg-emerald-50 transition-colors"
          >
            <PhoneIcon className="w-4 h-4" />
            <span className="hidden xl:inline">{PHONE_DISPLAY}</span>
            <span className="xl:hidden">Call</span>
          </a>
          <Link
            href={BOOK_URL}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-md hover:bg-blue-700 transition-colors"
          >
            Book Appointment
          </Link>
          <ThemeChanger />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
