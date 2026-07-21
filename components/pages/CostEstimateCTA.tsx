"use client"

import type { CostPage } from "@/lib/cost-pages"
import { getWhatsAppBookingUrl } from "@/lib/whatsapp-booking"
import { COST_INQUIRY_ENGAGED_KEY } from "@/components/ui/CostInquiryPopup"

// Compact inline WhatsApp CTA, not a blocking box — sits directly under
// the H1, above the fold. Uses design-tokens' emerald "secondary" accent
// (WhatsApp/contact actions), reserving primary blue for the main
// Book Appointment CTA elsewhere on the site.
export function CostEstimateCTA({ page }: { page: CostPage }) {
  const handleClick = () => {
    if (typeof window !== "undefined") {
      // Marks the funnel "used" so CostInquiryPopup's scroll trigger skips
      // this visit — the popup should never fire on top of an already-used CTA.
      localStorage.setItem(COST_INQUIRY_ENGAGED_KEY, "1")
    }
  }

  return (
    <div className="my-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 sm:flex sm:items-center sm:justify-between sm:gap-4">
      <div className="mb-3 sm:mb-0">
        <p className="text-sm font-semibold text-emerald-900">
          Get your cost estimate on WhatsApp
        </p>
        <p className="text-xs text-emerald-700 mt-0.5">{page.topCtaSubtext}</p>
      </div>
      <a
        href={getWhatsAppBookingUrl(page.whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition shadow-sm whitespace-nowrap"
      >
        Chat on WhatsApp →
      </a>
    </div>
  )
}
