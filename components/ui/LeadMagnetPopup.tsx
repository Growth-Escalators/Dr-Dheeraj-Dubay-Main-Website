"use client"

import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { CITY_PAGES } from "@/lib/city-pages"

// Trigger: 20 seconds after first page load, ONCE per browser session.
// sessionStorage flag survives in-tab navigation but is cleared when the
// tab closes — so a returning visitor in a new tab gets the popup again.
const SESSION_FLAG = "lead_magnet_shown"
const DELAY_MS = 20_000

// De-duplicated city list pulled from city-pages.ts — keeps the dropdown
// in lock-step with whichever cities we have landing pages for.
const CITIES = Array.from(
  new Set(CITY_PAGES.map((p) => p.city)),
).sort()

type Status = "idle" | "submitting" | "success" | "error"

export function LeadMagnetPopup() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [city, setCity] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [errorMsg, setErrorMsg] = useState("")

  useEffect(() => {
    if (typeof window === "undefined") return
    if (sessionStorage.getItem(SESSION_FLAG)) return

    const t = setTimeout(() => {
      // Re-check the flag in case the user navigated to a page that already
      // showed it during the 20s delay.
      if (!sessionStorage.getItem(SESSION_FLAG)) {
        sessionStorage.setItem(SESSION_FLAG, "1")
        setOpen(true)
      }
    }, DELAY_MS)

    return () => clearTimeout(t)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("submitting")
    setErrorMsg("")

    try {
      const res = await fetch("/api/lead-magnet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, city }),
      })
      const data = await res.json()
      if (!res.ok) {
        setStatus("error")
        setErrorMsg(data.error || "Something went wrong. Please try again.")
        return
      }
      setStatus("success")
      // Auto-download the PDF
      if (data.pdfUrl) {
        const a = document.createElement("a")
        a.href = data.pdfUrl
        a.download = "ghutne-ke-dard-se-rahat.pdf"
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      }
    } catch (e) {
      setStatus("error")
      setErrorMsg("Network error. Please check your connection.")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        {status === "success" ? (
          <div className="text-center py-4">
            <div className="text-5xl mb-3">✅</div>
            <DialogTitle className="text-2xl font-bold text-gray-900 mb-2">
              धन्यवाद!
            </DialogTitle>
            <p className="text-gray-600 mb-2">
              आपकी PDF डाउनलोड हो रही है।
            </p>
            <p className="text-sm text-gray-500">
              हमारी टीम जल्द ही WhatsApp पर आपसे संपर्क करेगी।
            </p>
            <button
              onClick={() => setOpen(false)}
              className="mt-5 px-5 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-900">
                घुटने के दर्द से राहत
              </DialogTitle>
              <DialogDescription className="text-base text-gray-600 mt-2">
                <strong className="text-blue-700">मुफ्त PDF गाइड:</strong> Dr. Dheeraj
                Dubay (35,000+ surgeries) के अनुभव से 10 आसान घरेलू उपाय जो
                आज ही शुरू कर सकते हैं।
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-3 mt-3">
              <div>
                <label htmlFor="lm-name" className="block text-sm font-medium text-gray-700 mb-1">
                  आपका नाम / Your name
                </label>
                <input
                  id="lm-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="राजेश शर्मा"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="lm-phone" className="block text-sm font-medium text-gray-700 mb-1">
                  मोबाइल नंबर / Phone (WhatsApp)
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-gray-600 text-sm">
                    +91
                  </span>
                  <input
                    id="lm-phone"
                    type="tel"
                    required
                    inputMode="numeric"
                    pattern="[0-9]{10}"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    placeholder="9XXXXXXXXX"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="lm-city" className="block text-sm font-medium text-gray-700 mb-1">
                  आपका शहर / Your city
                </label>
                <select
                  id="lm-city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- Select --</option>
                  {CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                  <option value="Other">Other</option>
                </select>
              </div>

              {status === "error" && (
                <p className="text-sm text-red-600">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition disabled:opacity-60"
              >
                {status === "submitting" ? "Sending..." : "PDF डाउनलोड करें"}
              </button>

              <p className="text-xs text-gray-500 text-center">
                We&apos;ll only contact you about Dr. Dubay&apos;s knee treatment.
                No spam.
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
