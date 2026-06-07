import Link from "next/link";
import { PhoneIcon } from "lucide-react";

const PHONE_TEL = "+918955373205";
const PHONE_DISPLAY = "+91 89553 73205";
const BOOK_URL = "/booking/jaipur";

export default function FinalCTA() {
  return (
    <section className="py-16 bg-emerald-50">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Book your appointment today
        </h2>
        <p className="text-gray-600 mb-8 text-base md:text-lg">
          Quick consultation with Dr. Dheeraj Dubay at Shalby Hospital Jaipur
          &mdash; let&apos;s get you back to a pain-free life.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href={BOOK_URL}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white text-base font-semibold rounded-lg hover:bg-blue-700 transition shadow-sm"
          >
            Book Appointment
          </Link>
          <a
            href={`tel:${PHONE_TEL}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white text-base font-semibold rounded-lg hover:bg-emerald-700 transition shadow-sm"
            aria-label={`Call ${PHONE_DISPLAY}`}
          >
            <PhoneIcon className="w-5 h-5" />
            Call {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </section>
  );
}
