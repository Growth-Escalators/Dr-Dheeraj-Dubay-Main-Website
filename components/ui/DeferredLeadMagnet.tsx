'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const LeadMagnetPopup = dynamic(
  () => import('@/components/ui/LeadMagnetPopup').then((module) => module.LeadMagnetPopup),
  { ssr: false, loading: () => null },
)

export function DeferredLeadMagnet() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const win = window as typeof window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number
      cancelIdleCallback?: (id: number) => void
    }

    if (win.requestIdleCallback) {
      const id = win.requestIdleCallback(() => setReady(true), { timeout: 3000 })
      return () => win.cancelIdleCallback?.(id)
    }

    const timer = window.setTimeout(() => setReady(true), 2500)
    return () => window.clearTimeout(timer)
  }, [])

  return ready ? <LeadMagnetPopup /> : null
}
