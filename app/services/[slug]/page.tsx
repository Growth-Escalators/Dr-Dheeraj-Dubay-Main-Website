import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { defaultSEO } from "@/lib/seo.config";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { db } from "@/lib/db";
import { SURGERY_COUNT_DISPLAY, EXPERIENCE_YEARS_DISPLAY } from "@/lib/clinic-info";

export const revalidate = 60;

async function getServiceBySlug(slug: string) {
  try {
    return await db.services.findFirst({ where: { slug } });
  } catch {
    return null;
  }
}

async function getAllServices() {
  try {
    return await db.services.findMany();
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const service = await getServiceBySlug(params.slug);

  if (!service) {
    return { title: "Service Not Found" };
  }

  const title = service.metaTitle || service.title;
  const description = service.metaDescription || service.subtitle;

  return {
    title,
    description,
    alternates: {
      canonical: `${defaultSEO.siteUrl}/services/${service.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${defaultSEO.siteUrl}/services/${service.slug}`,
      siteName: defaultSEO.siteName,
      images: [
        {
          url: service.image || `${defaultSEO.siteUrl}/assets/images/hero.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        service.image || `${defaultSEO.siteUrl}/assets/images/hero.png`,
      ],
    },
  };
}

const ServiceJsonLd = ({ service }: { service: any }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: service.title,
    description: service.metaDescription || service.subtitle,
    url: `${defaultSEO.siteUrl}/services/${service.slug}`,
    about: {
      "@type": "MedicalCondition",
      name: service.title,
    },
    author: {
      "@type": "Physician",
      name: "Dr. Dheeraj Dubay",
      url: defaultSEO.siteUrl,
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

function getServiceFAQs(title: string) {
  return [
    {
      question: `What is ${title}?`,
      answer: `${title} is a specialized orthopedic procedure performed by Dr. Dheeraj Dubay at Shalby Hospital Jaipur with over ${EXPERIENCE_YEARS_DISPLAY} years of experience and ${SURGERY_COUNT_DISPLAY} successful surgeries.`,
    },
    {
      question: `How long does ${title} take?`,
      // Operating time standardised to the figure the procedure pages use
      // (lib/procedure-pages.ts: "60-90 minutes per knee"). This FAQ
      // previously answered the same question with "45-90 minutes" AND
      // "10-15 minutes" in one breath, while /about said "15-20 minutes".
      answer: `The procedure typically takes 60-90 minutes per joint, depending on the complexity. Dr. Dubay's fast-track Zero technique focuses on getting patients walking within 24 hours of surgery rather than on shortening operating time.`,
    },
    {
      question: `What is the recovery time after ${title}?`,
      answer: `Most patients begin walking within 24 hours. Full recovery typically takes 6-12 weeks with physiotherapy. Dr. Dubay's fast-track rehabilitation program helps patients recover faster.`,
    },
    {
      question: `Is ${title} available in Jaipur?`,
      answer: `Yes, Dr. Dheeraj Dubay performs ${title} at Shalby Hospital, Vaishali Nagar, Jaipur and at Dr. Dubay Hip & Knee Clinic, Vidhyadhar Nagar, Jaipur.`,
    },
    {
      question: `What is the cost of ${title} in Jaipur?`,
      answer: `The cost varies based on the type of implant and insurance coverage. Dr. Dubay offers transparent pricing and works with TPA/insurance providers. Contact us for a detailed quote.`,
    },
    {
      question: `Why choose Dr. Dheeraj Dubay for ${title}?`,
      answer: `Dr. Dubay holds the Forbes World Record for most joint replacements in a single day, has performed ${SURGERY_COUNT_DISPLAY} surgeries over ${EXPERIENCE_YEARS_DISPLAY} years, and is recognized as one of North India's leading orthopedic surgeons. He uses computer-assisted navigation for superior precision.`,
    },
  ];
}

export default async function ServiceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const [service, allServices] = await Promise.all([
    getServiceBySlug(params.slug),
    getAllServices(),
  ]);

  if (!service) {
    notFound();
  }

  const faqs = getServiceFAQs(service.title);

  return (
    <>
      <ServiceJsonLd service={service} />
      <FaqJsonLd faqs={faqs} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "https://www.drdubay.in" },
        { name: "Services", url: "https://www.drdubay.in/services" },
        { name: service.title, url: `https://www.drdubay.in/services/${service.slug}` },
      ]} />
      <div className="container mx-auto px-4">
        <main className="mt-12 mb-16">
          {/* Breadcrumb */}
          <div className="mb-6 text-sm text-gray-500">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            {" / "}
            <Link href="/services" className="hover:text-primary">
              Services
            </Link>
            {" / "}
            <span className="text-gray-700">{service.title}</span>
          </div>

          <div className="flex flex-col md:flex-row space-x-0 md:space-x-8">
            {/* Main content */}
            <div className="w-full md:w-4/6">
              {service.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={service.image}
                  alt={service.title}
                  className="rounded-md object-cover w-full max-h-[480px] mb-6"
                />
              )}

              <span className="text-green-700 text-sm block mb-2">
                Dr. Dheeraj Dubay
              </span>

              <h1 className="text-gray-800 text-3xl md:text-4xl font-bold mb-4 leading-tight">
                {service.title}
              </h1>

              <p className="text-gray-600 text-lg font-medium mb-6">
                {service.subtitle}
              </p>

              {/* blog field — rendered as HTML from Quill */}
              <div
                className="text-gray-700 text-base leading-relaxed"
                dangerouslySetInnerHTML={{ __html: service.blog }}
              />

              {/* FAQ Section */}
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {faqs.map((faq, i) => (
                    <details
                      key={i}
                      className="group border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <summary className="flex items-center justify-between p-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors font-semibold text-gray-800">
                        {faq.question}
                        <span className="ml-4 flex-shrink-0 text-primary group-open:rotate-45 transition-transform">
                          +
                        </span>
                      </summary>
                      <div className="p-4 text-gray-600 text-sm leading-relaxed">
                        {faq.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </div>

              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:underline mt-10"
              >
                ← Back to all services
              </Link>
            </div>

            {/* Sidebar — other services */}
            <div className="w-full md:w-2/6 mt-10 md:mt-0">
              <div className="md:sticky md:top-8">
                {/* Book Appointment CTA */}
                <div className="bg-primary text-white rounded-xl p-6 mb-6">
                  <h3 className="text-lg font-bold mb-2">
                    Book a Consultation
                  </h3>
                  <p className="text-sm opacity-90 mb-4">
                    Get expert advice from Dr. Dheeraj Dubay for{" "}
                    {service.title}.
                  </p>
                  <Link
                    href="/booking/jaipur"
                    className="block text-center bg-white text-primary font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Book Appointment
                  </Link>
                  <a
                    href="tel:+918955373205"
                    className="block text-center mt-2 text-sm underline opacity-80 hover:opacity-100"
                  >
                    Call: +91 8955373205
                  </a>
                </div>

                <p className="text-[#EE8A27] font-semibold text-xl mb-4">
                  Other Services
                </p>
                <div className="flex flex-col gap-4">
                  {allServices
                    .filter((s) => s.slug !== service.slug)
                    .map((item) => (
                      <Link
                        key={item.id}
                        href={`/services/${item.slug}`}
                        className="flex gap-3 group"
                      >
                        {item.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-20 h-16 object-cover rounded-md flex-shrink-0"
                          />
                        ) : null}
                        <div>
                          <p className="text-gray-800 font-semibold text-sm group-hover:text-primary transition-colors line-clamp-2">
                            {item.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                            {item.subtitle}
                          </p>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
