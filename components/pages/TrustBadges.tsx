import { EXPERIENCE_YEARS_DISPLAY, SURGERY_COUNT_DISPLAY } from '@/lib/clinic-info'

const badges = [
  { icon: '🩺', value: `${EXPERIENCE_YEARS_DISPLAY} Years`, label: 'Orthopedic experience' },
  { icon: '⚕️', value: `${SURGERY_COUNT_DISPLAY} Surgeries`, label: 'Total surgeries performed' },
  { icon: '🏥', value: 'Director', label: 'Robotic Joint Replacement Surgery, Shalby Hospital Jaipur' },
]

export function TrustBadges() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {badges.map((badge) => (
          <div
            key={badge.label}
            className="rounded-xl border border-gray-200 bg-white p-5 text-center shadow-sm"
          >
            <div className="text-2xl" aria-hidden="true">{badge.icon}</div>
            <p className="mt-2 text-lg font-bold text-gray-900">{badge.value}</p>
            <p className="mt-1 text-sm text-gray-600">{badge.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
