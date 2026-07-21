import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export const dynamic = "force-dynamic"

// Accepts a lightweight lead form (name + phone [+ city]) and creates a
// Lead row. Two callers share this endpoint today:
//   - components/ui/LeadMagnetPopup.tsx (Hindi PDF popup) — omits
//     `source`/`remark`, so it falls back to the original "lead-magnet"
//     tagging below and gets a pdfUrl back to trigger the PDF download.
//   - components/ui/CostInquiryPopup.tsx (cost-inquiry pages) — passes
//     `source: "cost-inquiry"` and a page-specific `remark` so admin staff
//     can tell WS-3b traffic apart from the Hindi PDF funnel; it ignores
//     pdfUrl and opens WhatsApp instead.
// Keeping one endpoint (vs. a second route) means one Lead-shaped
// validation path and one place to fix bugs in.

function normalizePhone(raw: string): string | null {
  const digits = (raw || "").replace(/\D/g, "").replace(/^0/, "")
  if (digits.length === 10) return digits
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2)
  return null
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, phone, city, source, remark } = body

    if (!name?.trim() || !phone) {
      return NextResponse.json(
        { error: "Name and phone are required" },
        { status: 400 },
      )
    }

    const normalized = normalizePhone(String(phone))
    if (!normalized) {
      return NextResponse.json(
        { error: "Please enter a valid 10-digit Indian mobile number" },
        { status: 400 },
      )
    }

    // Default preserves the original Hindi-popup behaviour exactly when a
    // caller doesn't pass source/remark. Only known sources are accepted
    // so this endpoint can't be used to write an arbitrary tag into Lead.
    const resolvedSource =
      typeof source === "string" && source === "cost-inquiry"
        ? "cost-inquiry"
        : "lead-magnet"
    const resolvedRemark =
      resolvedSource === "cost-inquiry" && typeof remark === "string" && remark.trim()
        ? remark.trim()
        : "Hindi knee-pain relief PDF lead"

    await db.lead.create({
      data: {
        name: name.trim(),
        phone: normalized,
        cities: city || null,
        source: resolvedSource,
        remark: resolvedRemark,
        patientStatus: "NEW",
      },
    })

    return NextResponse.json({
      success: true,
      // Only meaningful for the lead-magnet caller; cost-inquiry callers
      // ignore this and open WhatsApp instead.
      pdfUrl: "/downloads/ghutne-ke-dard-se-rahat.pdf",
    })
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error"
    console.error("[LEAD_MAGNET]", e)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
