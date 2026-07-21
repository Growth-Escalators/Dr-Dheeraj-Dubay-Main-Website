import { SURGERY_COUNT_DISPLAY, EXPERIENCE_YEARS_DISPLAY } from '@/lib/clinic-info'

export function TrustBadges() {
  const badges = [
    {
      icon: '🏆',
      label: 'Forbes World Record',
      sub: 'Most surgeries in a single day',
    },
    {
      icon: '⚕️',
      label: `${SURGERY_COUNT_DISPLAY} Surgeries`,
      sub: 'Successful joint replacements',
    },
    {
      icon: '⭐',
      label: `${EXPERIENCE_YEARS_DISPLAY} Years Experience`,
      sub: 'Expert orthopaedic care',
    },
    {
      icon: '🎖️',
      label: 'Health Minister Award',
      sub: '3 consecutive years',
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-10">
      {badges.map(b => (
        <div
          key={b.label}
          className="bg-blue-50 rounded-xl p-4 text-center border border-blue-100"
        >
          <div className="text-3xl mb-2">{b.icon}</div>
          <p className="text-sm font-bold text-blue-900">{b.label}</p>
          <p className="text-xs text-blue-600 mt-1">{b.sub}</p>
        </div>
      ))}
    </div>
  )
}
