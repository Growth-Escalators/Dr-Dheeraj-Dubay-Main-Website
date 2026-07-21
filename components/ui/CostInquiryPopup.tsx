"use client"

import { useEffect, useState } from "react"
import type { CostPage } from "@/lib/cost-pages"
import { getWhatsAppBookingUrl } from "@/lib/whatsapp-booking"

// Shared with components/pages/CostEstimateCTA.tsx — both surfaces write
// to the SAME keys so "the user already used the top form" (task
// requirement) is enforced across the whole cost-inquiry funnel, not just
// within a single page. localStorage (not sessionStorage) is deliberate:
// once someone has engaged or dismissed once, we don't want a *return*
// visit re-triggering the same interruption on a different cost page.
export const COST_INQUIRY_ENGAGED_KEY = "cost_inquiry_engaged"
export const COST_INQUIRY_POPUP_SHOWN_KEY = "cost_inquiry_popup_shown"

const SCROLL_TRIGGER_FRACTION = 0.3

type Status = "idle" | "submitting" | "success"

export function CostInquiryPopup({ page }: { page: CostPage }) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [status, setStatus] = useState<Status>("idle")

  useEffect(() => {
    if (typeof window === "undefined") return
    const alreadyEngaged = () =>
      localStorage.getItem(COST_INQUIRY_ENGAGED_KEY) ||
      localStorage.getItem(COST_INQUIRY_POPUP_SHOWN_KEY)

    if (alreadyEngaged()) return

    const onScroll = () => {
      if (alreadyEngaged()) {
        window.removeEventListener("scroll", onScroll)
        return
      }
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const fraction = scrollable > 0 ? window.scrollY / scrollable : 1
      if (fraction >= SCROLL_TRIGGER_FRACTION) {
        localStorage.setItem(COST_INQUIRY_POPUP_SHOWN_KEY, "1")
        setOpen(true)
        window.removeEventListener("scroll", onScroll)
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const close = () => setOpen(false)

  const openWhatsApp = () => {
    if (typeof window === "undefined") return
    window.open(getWhatsAppBookingUrl(page.whatsappMessage), "_blank", "noopener,noreferrer")
  }

  // Best-effort lead capture: we try to log the inquiry (source:
  // "cost-inquiry") so admin staff see it, but the actual conversion is
  // the WhatsApp chat — a DB hiccup must never block that. So this never
  // surfaces a submission error to the patient; it always proceeds to
  // WhatsApp once they've entered name + phone.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("submitting")

    try {
      await fetch("/api/lead-magnet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          source: "cost-inquiry",
          remark: `Cost-inquiry popup — ${page.schema.procedureName} (${page.slug})`,
        }),
      })
    } catch {
      // Network error capturing the lead — still let them through to WhatsApp.
    } finally {
      localStorage.setItem(COST_INQUIRY_ENGAGED_KEY, "1")
      setStatus("success")
      openWhatsApp()
    }
  }

  if (!open) return null

  return (
    <>
      {/* Backdrop — desktop only. On mobile there is deliberately NO
          full-screen overlay: the sheet is a bottom sheet that leaves the
          page visible/scrollable behind it, so this never reads as a
          Google-penalised intrusive mobile interstitial. */}
      <div
        className="hidden md:block fixed inset-0 z-50 bg-black/40"
        onClick={close}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cost-inquiry-popup-heading"
        className="
          fixed z-50 bg-white shadow-2xl
          left-0 right-0 bottom-0 rounded-t-2xl border-t border-gray-200 p-5
          max-h-[75vh] overflow-y-auto
          animate-in slide-in-from-bottom duration-300
          md:left-1/2 md:top-1/2 md:bottom-auto md:right-auto
          md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-md
          md:rounded-2xl md:border md:zoom-in-95 md:max-h-[85vh]
        "
      >
        <button
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 text-xl leading-none"
        >
          &times;
        </button>

        {/* Mobile drag-handle affordance signalling "sheet", not "modal". */}
        <div className="md:hidden mx-auto mb-3 h-1 w-10 rounded-full bg-gray-200" />

        {status === "success" ? (
          <div className="text-center py-2">
            <div className="text-4xl mb-3">✅</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Opening WhatsApp…</h2>
            <p className="text-sm text-gray-600 mb-4">
              If it didn&apos;t open automatically, tap below.
            </p>
            <a
              href={getWhatsAppBookingUrl(page.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition"
            >
              Open WhatsApp
            </a>
          </div>
        ) : (
          <>
            <h2 id="cost-inquiry-popup-heading" className="text-xl font-bold text-gray-900 pr-6 mb-1">
              {page.popupHeadline}
            </h2>
            <p className="text-sm text-gray-600 mb-4">{page.popupSubtext}</p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label htmlFor="ci-name" className="sr-only">
                  Your name
                </label>
                <input
                  id="ci-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>
              <div>
                <label htmlFor="ci-phone" className="sr-only">
                  Phone (WhatsApp)
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-gray-600 text-sm">
                    +91
                  </span>
                  <input
                    id="ci-phone"
                    type="tel"
                    required
                    inputMode="numeric"
                    pattern="[0-9]{10}"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    placeholder="WhatsApp number"
                    className="flex-1 px-3 py-2.5 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition disabled:opacity-60 text-sm"
              >
                {status === "submitting" ? "Sending…" : "Chat on WhatsApp"}
              </button>
              <p className="text-xs text-gray-500 text-center">
                We&apos;ll only contact you about your cost estimate. No spam.
              </p>
            </form>
          </>
        )}
      </div>
    </>
  )
}
