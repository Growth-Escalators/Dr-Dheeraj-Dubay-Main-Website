import { generatePageMetadata } from "@/lib/seo.config";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import Link from "next/link";
import {
  EXPERIENCE_YEARS_DISPLAY,
  SURGERY_COUNT_DISPLAY,
} from "@/lib/clinic-info";

export const revalidate = 3600;

export const metadata = generatePageMetadata({
  title: "Joint Replacement FAQs | Dr. Dheeraj Dubay Jaipur",
  description:
    "Patient questions about knee and hip replacement, robotic surgery, recovery, cost and insurance with Dr. Dheeraj Dubay at Shalby Hospital Jaipur.",
  slug: "faq",
  keywords:
    "knee replacement FAQ, hip replacement questions, joint replacement cost jaipur, knee surgery recovery time, dr dheeraj dubay FAQ",
});

const faqs = [
  {
    question: "Is knee replacement surgery painful?",
    answer:
      "Pain-control plans commonly combine anaesthesia, medicines and early rehabilitation. Some discomfort after surgery is expected, and the amount varies from patient to patient. The treating and anaesthesia teams adjust pain management according to the patient’s health, procedure and response.",
  },
  {
    question: "How long is the hospital stay for knee replacement?",
    answer:
      "Hospital stay depends on the procedure, age, medical conditions, mobility and recovery progress. Your surgeon and hospital team decide discharge when pain, wound care, walking and medical safety are appropriate for you.",
  },
  {
    question: "What is Dr. Dheeraj Dubay's experience with joint replacement?",
    answer:
      `Dr. Dheeraj Dubay has ${EXPERIENCE_YEARS_DISPLAY} years of orthopedic experience and has performed ${SURGERY_COUNT_DISPLAY} total surgeries across his career. He is Director, Robotic Joint Replacement Surgery at Shalby Hospital Jaipur. These career figures are not a guarantee of an individual surgical outcome.`,
  },
  {
    question: "How long do knee replacement implants last?",
    answer:
      "Implant longevity varies with implant design, age, body weight, activity, alignment, medical factors and complications. Your surgeon can discuss what is known about the proposed implant and what follow-up is appropriate for your case rather than promising a fixed lifespan.",
  },
  {
    question: "What is computer navigation or robotic knee replacement?",
    answer:
      "Navigation and robotic systems can provide patient-specific planning and objective measurements that assist the surgeon with alignment, balancing and bone preparation. They are tools used by the surgeon; the surgeon remains responsible for the operation and decides whether the technology is appropriate for the patient.",
  },
  {
    question: "Does insurance cover joint replacement surgery?",
    answer:
      "Coverage depends on the insurer or TPA, policy wording, waiting periods, exclusions, medical indication and the hospital’s current network. Share your policy or government-scheme details with Shalby Hospital’s insurance desk for current verification before admission.",
  },
  {
    question: "What is the cost of knee replacement in Jaipur?",
    answer:
      "The final estimate depends on the procedure, implant, one or both knees, case complexity, hospital services, room category and insurance eligibility. A current patient-specific hospital estimate is more reliable than a generic online package price.",
  },
  {
    question: "How soon can I walk after knee replacement?",
    answer:
      "Many rehabilitation pathways encourage early mobilisation when medically appropriate, but the timing and level of assistance vary. Age, strength, other medical conditions, the operation and physiotherapy progress all affect when a patient walks safely.",
  },
  {
    question: "Where can I consult Dr. Dheeraj Dubay in Jaipur?",
    answer:
      "Dr. Dubay consults at Shalby Hospital Jaipur in Vaishali Nagar and at Dr. Dubay Hip & Knee Clinic in Vidhyadhar Nagar. Check the Locations page or contact the team for current appointment availability.",
  },
  {
    question: "What is hip replacement surgery?",
    answer:
      "Hip replacement replaces damaged joint surfaces with artificial components. It may be considered for conditions such as advanced hip arthritis or avascular necrosis when symptoms and joint damage justify surgery after clinical assessment. The appropriate procedure and recovery plan are individual to the patient.",
  },
];

export default function FaqPage() {
  return (
    <>
      <FaqJsonLd faqs={faqs.map((faq) => ({ question: faq.question, answer: faq.answer }))} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://www.drdubay.in" },
          { name: "FAQ", url: "https://www.drdubay.in/faq" },
        ]}
      />
      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h1 className="mb-2 text-4xl font-bold text-gray-900 dark:text-white">
            Joint Replacement Frequently Asked Questions
          </h1>
          <p className="mb-10 text-lg leading-relaxed text-gray-600 dark:text-gray-400">
            General patient education about knee and hip replacement. Answers are not a diagnosis or personalised medical advice.
          </p>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="group overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-left font-semibold text-gray-900 transition-colors hover:bg-gray-50 dark:text-white">
                  <span className="pr-4">{faq.question}</span>
                  <svg className="h-5 w-5 shrink-0 text-gray-500 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="border-t border-gray-100 px-6 pb-5 pt-4 leading-relaxed text-gray-600 dark:border-gray-700 dark:text-gray-300">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <Link href="/procedures/knee-replacement-surgery" className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 font-semibold text-emerald-800">Knee Replacement Jaipur</Link>
            <Link href="/procedures/robotic-knee-replacement" className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 font-semibold text-emerald-800">Robotic Knee Replacement</Link>
            <Link href="/hip-replacement-jaipur" className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 font-semibold text-emerald-800">Hip Replacement Jaipur</Link>
            <Link href="/editorial-policy" className="rounded-full border border-gray-200 bg-white px-4 py-2 font-semibold text-gray-700">Medical Editorial Policy</Link>
          </div>

          <div className="mt-12 rounded-xl bg-emerald-50 p-6 text-center dark:bg-emerald-900/20">
            <p className="mb-4 text-gray-700 dark:text-gray-300">Have a patient-specific question?</p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/contact" className="inline-block rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white transition-colors hover:bg-emerald-700">Contact the team</Link>
              <a href="tel:+918955373205" className="inline-block rounded-lg border border-emerald-200 bg-white px-6 py-3 font-medium text-emerald-600">Call +91-8955373205</a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
