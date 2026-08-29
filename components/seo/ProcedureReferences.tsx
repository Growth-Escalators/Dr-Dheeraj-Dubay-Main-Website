type Reference = {
  label: string
  href: string
}

const KNEE_REFERENCES: Reference[] = [
  {
    label: 'AAOS — Management of Osteoarthritis of the Knee (Plain Language Summary)',
    href: 'https://orthoinfo.aaos.org/globalassets/pdfs/the-management-of-osteoarthritis-of-the-knee-pls_final.pdf',
  },
  {
    label: 'AAOS American Joint Replacement Registry — Patient Guide to Joint Replacement',
    href: 'https://orthoinfo.aaos.org/globalassets/pdfs/ajrr-patient-facing-interim-report.pdf',
  },
]

const REFERENCE_MAP: Record<string, Reference[]> = {
  'knee-replacement-surgery': KNEE_REFERENCES,
  'robotic-knee-replacement': KNEE_REFERENCES,
  'partial-knee-replacement': KNEE_REFERENCES,
  'bilateral-knee-replacement': KNEE_REFERENCES,
  'revision-knee-replacement': KNEE_REFERENCES,
}

export function ProcedureReferences({ procedureSlug }: { procedureSlug: string }) {
  const references = REFERENCE_MAP[procedureSlug]
  if (!references?.length) return null

  return (
    <section className="my-10 border-t border-gray-200 pt-8" aria-labelledby="medical-references-heading">
      <h2 id="medical-references-heading" className="text-lg font-bold text-gray-900">
        Patient education references
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">
        Independent orthopedic references for general background. They do not replace a clinical examination or an individual treatment plan.
      </p>
      <ul className="mt-4 space-y-2 text-sm">
        {references.map((reference) => (
          <li key={reference.href}>
            <a
              href={reference.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-700 hover:underline"
            >
              {reference.label} ↗
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
