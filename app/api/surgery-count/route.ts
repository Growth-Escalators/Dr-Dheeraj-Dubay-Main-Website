import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { SURGERY_COUNT } from '@/lib/clinic-info'

export const revalidate = 3600

export async function GET() {
  try {
    const count = await db.lead.count({
      where: { patientStatus: 'IPD' }
    })
    const total = Math.max(SURGERY_COUNT, count)
    return NextResponse.json({ count: total })
  } catch {
    return NextResponse.json({ count: SURGERY_COUNT })
  }
}
