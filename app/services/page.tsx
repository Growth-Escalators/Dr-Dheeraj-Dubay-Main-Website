import { generatePageMetadata } from "@/lib/seo.config";
import React from "react";
import Link from "next/link";
import { db } from "@/lib/db";
import GTM from "@/utils/GTM";

export const revalidate = 3600;

export const metadata = generatePageMetadata({
  title: "Joint Replacement Services | Dr. Dheeraj Dubay Jaipur",
  description:
    "Expert knee replacement, hip replacement, computer navigation surgery and minimally invasive joint replacement in Jaipur by Dr. Dheeraj Dubay.",
  slug: "services",
});

const FALLBACK_SERVICES = [
  {
    id: "knee",
    title: "Knee Replacement Surgery",
    subtitle: "Advanced knee replacement procedures with computer-aided navigation for precise outcomes.",
    slug: "knee-replacement-surgery",
    image: null,
  },
  {
    id: "hip",
    title: "Hip Replacement Surgery",
    subtitle: "Total and partial hip replacement with minimally invasive techniques.",
    slug: "hip-replacement-surgery",
    image: null,
  },
  {
    id: "nav",
    title: "Computer Navigation Surgery",
    subtitle: "State-of-the-art computer navigation for superior accuracy in joint replacement.",
    slug: "computer-navigation-surgery",
    image: null,
  },
  {
    id: "mis",
    title: "Minimally Invasive Surgery",
    subtitle: "Smaller incisions, faster recovery and less pain with minimally invasive techniques.",
    slug: "minimally-invasive-surgery",
    image: null,
  },
];

const Service = async () => {
  let services: any[] = [];
  try {
    services = await db.services.findMany();
  } catch {
    services = [];
  }

  const displayServices = services.length > 0 ? services : FALLBACK_SERVICES;

  return (
    <>
      <head>
        <GTM gtmId="GTM-MDF4W4JT" />
        <title>Services | Dr. Dubay</title>
        <meta
          name="description"
          content="Dr. Dheeraj Dubay, Joint and Hip Replacement Surgeon in Rajasthan"
        />
        <link rel="icon" href="/assets/images/logonew.png" />
      </head>
      <section className="flex flex-col justify-center max-w-6xl px-4 py-10 mx-auto sm:px-6">
        <div className="flex flex-wrap items-center justify-between mb-8">
          <h2 className="mr-10 text-4xl font-bold leading-none md:text-5xl">
            Our Services Dedicated to Your Vitality.
          </h2>
        </div>

        <div className="flex flex-wrap -mx-4">
          {displayServices.map((item) => (
            <div
              key={item.id}
              className="w-full max-w-full mb-8 sm:w-1/2 px-4 lg:w-1/3 flex flex-col"
            >
              <div className="relative h-48 bg-gradient-to-br from-emerald-100 to-teal-100 overflow-hidden">
                {item.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.image}
                    alt={item.title}
                    className="object-cover object-center w-full h-full"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <span className="text-5xl">🦴</span>
                  </div>
                )}
              </div>
              <div className="flex flex-grow">
                <div className="triangle"></div>
                <div className="w-full flex flex-col justify-between px-4 py-6 bg-white border border-gray-400">
                  <div>
                    <Link
                      href={`/services/${item.slug}`}
                      className="block mb-4 text-2xl font-black leading-tight hover:underline hover:text-blue-600 border-b-2 border-blue-600 dark:text-black"
                    >
                      {item.title}
                    </Link>
                    <p className="mb-4 dark:text-black">{item.subtitle}</p>
                  </div>
                  <div>
                    <Link
                      href={`/services/${item.slug}`}
                      className="inline-block pb-1 mt-2 text-base font-black text-blue-600 uppercase border-b border-transparent hover:border-blue-600"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Service;
