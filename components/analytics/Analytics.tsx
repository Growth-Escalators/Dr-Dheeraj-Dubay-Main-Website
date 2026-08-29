'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

type Gtag = (...args: unknown[]) => void
type AnalyticsWindow = Window & {
  gtag?: Gtag
  dataLayer?: unknown[]
}

const LANDING_KEY = 'drdubay_landing_page'

function ensureGtag(): Gtag {
  const w = window as AnalyticsWindow
  w.dataLayer = w.dataLayer || []

  if (typeof w.gtag !== 'function') {
    w.gtag = (...args: unknown[]) => {
      w.dataLayer?.push(args)
    }
  }

  return w.gtag
}

function getLandingPage() {
  try {
    const current = `${window.location.pathname}${window.location.search}`
    const stored = window.sessionStorage.getItem(LANDING_KEY)
    if (stored) return stored
    window.sessionStorage.setItem(LANDING_KEY, current)
    return current
  } catch {
    return window.location.pathname
  }
}

export function AnalyticsListener({ gaId }: { gaId: string }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!gaId) return
    const qs = searchParams?.toString()
    const url = qs ? `${pathname}?${qs}` : pathname
    const gtag = ensureGtag()

    gtag('config', gaId, {
      page_path: url,
      page_location: window.location.href,
      landing_page: getLandingPage(),
    })
  }, [gaId, pathname, searchParams])

  useEffect(() => {
    if (!gaId) return

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      const link = target?.closest('a') as HTMLAnchorElement | null
      if (!link) return

      const href = link.getAttribute('href') || ''
      let eventName: string | null = null
      let ctaType: string | null = null

      if (href.startsWith('tel:')) {
        eventName = 'phone_click'
        ctaType = 'phone'
      } else if (href.includes('wa.me/') || href.includes('api.whatsapp.com/')) {
        eventName = 'whatsapp_click'
        ctaType = /book appointment|appointment/i.test(link.textContent || '')
          ? 'appointment_whatsapp'
          : 'whatsapp'
      } else if (
        href.startsWith('/booking') ||
        /book appointment|appointment/i.test(link.textContent || '')
      ) {
        eventName = 'appointment_click'
        ctaType = 'booking'
      }

      if (!eventName) return
      const gtag = ensureGtag()

      gtag('event', eventName, {
        page_path: `${window.location.pathname}${window.location.search}`,
        page_location: window.location.href,
        landing_page: getLandingPage(),
        link_url: link.href,
        link_text: (link.textContent || '').trim().slice(0, 100),
        cta_type: ctaType,
      })
    }

    document.addEventListener('click', handleClick, true)
    return () => document.removeEventListener('click', handleClick, true)
  }, [gaId])

  return null
}
