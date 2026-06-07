import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export const dynamic = "force-dynamic"

// Accepts the Hindi PDF popup form (name + phone + city) and creates a
// Lead row tagged with source='lead-magnet' so admin staff can identify
// which patients came from organic SEO traffic vs the booking form.
// Returns the public PDF path the client uses to trigger auto-download.

function normalizePhone(raw: string): string | null {
  const digits = (raw || "").replace(/\D/g, "").replace(/^0/, "")
  if (digits.length === 10) return digits
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2)
  return null
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, phone, city } = body

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

    await db.lead.create({
      data: {
        name: name.trim(),
        phone: normalized,
        cities: city || null,
        source: "lead-magnet",
        remark: "Hindi knee-pain relief PDF lead",
        patientStatus: "NEW",
      },
    })

    return NextResponse.json({
      success: true,
      pdfUrl: "/downloads/ghutne-ke-dard-se-rahat.pdf",
    })
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error"
    console.error("[LEAD_MAGNET]", e)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
