'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

type Gtag = (...args: unknown[]) => void

function getGtag(): Gtag | undefined {
  const w = window as unknown as { gtag?: Gtag }
  return typeof w.gtag === 'function' ? w.gtag : undefined
}

export function AnalyticsListener({ gaId }: { gaId: string }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!gaId) return
    const gtag = getGtag()
    if (!gtag) return

    const qs = searchParams?.toString()
    const url = qs ? `${pathname}?${qs}` : pathname
    gtag('config', gaId, { page_path: url })
  }, [gaId, pathname, searchParams])

  useEffect(() => {
    if (!gaId) return

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      const link = target?.closest('a') as HTMLAnchorElement | null
      if (!link) return

      const href = link.getAttribute('href') || ''
      let eventName: string | null = null

      if (href.startsWith('tel:')) {
        eventName = 'phone_click'
      } else if (href.includes('wa.me/') || href.includes('api.whatsapp.com/')) {
        eventName = 'whatsapp_click'
      } else if (
        href.startsWith('/booking') ||
        /book appointment|appointment/i.test(link.textContent || '')
      ) {
        eventName = 'appointment_click'
      }

      if (!eventName) return
      const gtag = getGtag()
      if (!gtag) return

      gtag('event', eventName, {
        page_path: window.location.pathname,
        link_url: link.href,
        link_text: (link.textContent || '').trim().slice(0, 100),
      })
    }

    document.addEventListener('click', handleClick, true)
    return () => document.removeEventListener('click', handleClick, true)
  }, [gaId])

  return null
}
