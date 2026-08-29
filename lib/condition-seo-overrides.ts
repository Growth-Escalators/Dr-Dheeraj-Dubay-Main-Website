import type { ConditionPage } from './condition-pages'

const VERIFIED_AUTHORITY_POINTS = [
  '24 years of orthopedic experience.',
  '40,000+ total surgeries performed across his career.',
  'Director, Robotic Joint Replacement Surgery at Shalby Hospital Jaipur.',
  'Practice focused on knee and hip replacement, including robotic, computer-navigated and minimally invasive approaches where clinically appropriate.',
  'Recorded 34 joint replacements in one day on 9 May 2024 — 33 knee replacements and 1 hip replacement.',
]

export function applyConditionSeoOverrides(pages: ConditionPage[]): ConditionPage[] {
  return pages.map((page) => ({
    ...page,
    whyDrDubay: VERIFIED_AUTHORITY_POINTS,
  }))
}
