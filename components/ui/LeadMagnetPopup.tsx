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
import { SURGERY_COUNT_DISPLAY } from "@/lib/clinic-info"

const SESSION_FLAG = "lead_magnet_shown"
const DELAY_MS = 20_000

const CITIES = Array.from(new Set(CITY_PAGES.map((p) => p.city))).sort()

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

    const timer = setTimeout(() => {
      if (!sessionStorage.getItem(SESSION_FLAG)) {
        sessionStorage.setItem(SESSION_FLAG, "1")
        setOpen(true)
      }
    }, DELAY_MS)

    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setStatus("submitting")
    setErrorMsg("")

    try {
      const response = await fetch("/api/lead-magnet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, city }),
      })
      const data = await response.json()
      if (!response.ok) {
        setStatus("error")
        setErrorMsg(data.error || "Something went wrong. Please try again.")
        return
      }
      setStatus("success")
      if (data.pdfUrl) {
        const anchor = document.createElement("a")
        anchor.href = data.pdfUrl
        anchor.download = "ghutne-ke-dard-se-rahat.pdf"
        document.body.appendChild(anchor)
        anchor.click()
        document.body.removeChild(anchor)
      }
    } catch {
      setStatus("error")
      setErrorMsg("Network error. Please check your connection.")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        {status === "success" ? (
          <div className="py-4 text-center">
            <div className="mb-3 text-5xl">✅</div>
            <DialogTitle className="mb-2 text-2xl font-bold text-gray-900">
              धन्यवाद!
            </DialogTitle>
            <p className="mb-2 text-gray-600">आपकी PDF डाउनलोड हो रही है।</p>
            <p className="text-sm text-gray-500">
              हमारी टीम जल्द ही WhatsApp पर आपसे संपर्क करेगी।
            </p>
            <button
              onClick={() => setOpen(false)}
              className="mt-5 rounded-lg bg-blue-600 px-5 py-2 text-sm text-white hover:bg-blue-700"
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
              <DialogDescription className="mt-2 text-base text-gray-600">
                <strong className="text-blue-700">मुफ्त PDF गाइड:</strong> Dr. Dheeraj Dubay ({SURGERY_COUNT_DISPLAY} total surgeries) की टीम से घुटने के दर्द और mobility के बारे में practical patient-education tips.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="mt-3 space-y-3">
              <div>
                <label htmlFor="lm-name" className="mb-1 block text-sm font-medium text-gray-700">
                  आपका नाम / Your name
                </label>
                <input
                  id="lm-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="राजेश शर्मा"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="lm-phone" className="mb-1 block text-sm font-medium text-gray-700">
                  मोबाइल नंबर / Phone (WhatsApp)
                </label>
                <div className="flex">
                  <span className="inline-flex items-center rounded-l-lg border border-r-0 border-gray-300 bg-gray-100 px-3 text-sm text-gray-600">+91</span>
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
                    className="flex-1 rounded-r-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="lm-city" className="mb-1 block text-sm font-medium text-gray-700">
                  आपका शहर / Your city
                </label>
                <select
                  id="lm-city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- Select --</option>
                  {CITIES.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                  <option value="Other">Other</option>
                </select>
              </div>

              {status === "error" && <p className="text-sm text-red-600">{errorMsg}</p>}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
              >
                {status === "submitting" ? "Sending..." : "PDF डाउनलोड करें"}
              </button>

              <p className="text-center text-xs text-gray-500">
                Educational information only. We&apos;ll contact you about Dr. Dubay&apos;s orthopedic services; no spam.
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
