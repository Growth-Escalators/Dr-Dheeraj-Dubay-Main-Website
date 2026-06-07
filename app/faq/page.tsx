import { generatePageMetadata } from "@/lib/seo.config";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import Link from "next/link";

export const revalidate = 3600;

export const metadata = generatePageMetadata({
  title: "FAQs | Dr. Dheeraj Dubay - Joint Replacement Surgeon Jaipur",
  description:
    "Frequently asked questions about knee replacement, hip replacement surgery, costs, recovery time, and Dr. Dheeraj Dubay's expertise at Shalby Hospital Jaipur.",
  slug: "faq",
  keywords:
    "knee replacement FAQ, hip replacement questions, joint replacement cost jaipur, knee surgery recovery time, dr dheeraj dubay FAQ",
});

const faqs = [
  {
    question: "Is knee replacement surgery painful?",
    answer:
      "Modern knee replacement uses advanced anaesthesia and pain management. Most patients experience minimal discomfort and begin walking within 24 hours of surgery with Dr. Dubay's fast-track rehabilitation protocol.",
  },
  {
    question: "How long is the hospital stay for knee replacement?",
    answer:
      "With Dr. Dubay's minimally invasive techniques, most patients stay 3-4 days for total knee replacement and can return home comfortably. Some cases qualify for same-day discharge.",
  },
  {
    question: "What is the success rate of joint replacement surgery?",
    answer:
      "Dr. Dheeraj Dubay has performed over 35,000 successful joint replacement surgeries with a very high success rate. He holds the Forbes World Record for most joint replacements in a single day.",
  },
  {
    question: "How long do knee replacement implants last?",
    answer:
      "Modern implants used by Dr. Dubay typically last 20-25 years with proper care and physiotherapy. The implant brand and patient lifestyle are key factors in longevity.",
  },
  {
    question: "What is computer navigation surgery?",
    answer:
      "Computer navigation is an advanced technique where a computer system guides the surgeon for precise implant placement. Dr. Dubay is trained in this technique which results in better alignment and longer implant life.",
  },
  {
    question: "Does insurance cover joint replacement surgery?",
    answer:
      "Most health insurance policies and government schemes cover joint replacement surgery. Dr. Dubay's clinic works with major TPA providers and government health schemes including CGHS and RGHS.",
  },
  {
    question: "What is the cost of knee replacement in Jaipur?",
    answer:
      "The cost varies based on implant type, hospital, and insurance coverage. Contact Dr. Dubay's clinic at +91-8955373205 for a detailed cost estimate and insurance guidance.",
  },
  {
    question: "How soon can I walk after knee replacement?",
    answer:
      "With Dr. Dubay's fast-track Zero technique, most patients begin walking within 24 hours of surgery. Full recovery and return to normal activities typically takes 6-8 weeks.",
  },
  {
    question: "Is Dr. Dheeraj Dubay available in Jaipur?",
    answer:
      "Yes, Dr. Dubay operates at Shalby Hospital, Vaishali Nagar, Jaipur and at Dr. Dubay Hip & Knee Clinic, Vidhyadhar Nagar, Jaipur.",
  },
  {
    question: "What is hip replacement surgery?",
    answer:
      "Hip replacement surgery replaces a damaged hip joint with an artificial implant. Dr. Dubay specialises in minimally invasive hip replacement that reduces recovery time and post-operative pain significantly.",
  },
];

export default function FaqPage() {
  return (
    <>
      <FaqJsonLd
        faqs={faqs.map((f) => ({ question: f.question, answer: f.answer }))}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://www.drdubay.in" },
          { name: "FAQ", url: "https://www.drdubay.in/faq" },
        ]}
      />
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
        <div className="max-w-3xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-10">
            Common questions about joint replacement surgery with Dr. Dheeraj
            Dubay
          </p>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer px-6 py-5 text-left font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                  <span className="pr-4">{faq.question}</span>
                  <svg
                    className="w-5 h-5 text-gray-500 shrink-0 transition-transform group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <div className="px-6 pb-5 text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-gray-700 pt-4">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>

          <div className="mt-12 p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl text-center">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Still have questions? We&apos;re here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-block px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
              >
                Contact Us
              </Link>
              <a
                href="tel:+918955373205"
                className="inline-block px-6 py-3 bg-white dark:bg-gray-800 text-emerald-600 rounded-lg font-medium border border-emerald-200 dark:border-emerald-700 hover:bg-emerald-50 transition-colors"
              >
                Call +91-8955373205
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
