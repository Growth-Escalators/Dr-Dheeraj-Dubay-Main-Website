import type { Metadata } from 'next'
import Link from 'next/link'
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd'
import { defaultSEO, generatePageMetadata } from '@/lib/seo.config'

const SOURCE_URL = 'https://www.shalby.org/hospitals/jaipur-shalby/insurance-corporate-tpa-tie-ups/'
const VERIFIED_DATE = '29 August 2026'

const tpas = [
  'Health India Insurance TPA Services Private Limited (Non-PPN)',
  'Paramount Health Services and Insurance TPA',
]

const insurers = [
  'Aditya Birla Health Insurance',
  'Bajaj Allianz General Insurance',
  'Cholamandalam MS General Insurance',
  'Cigna TTK Health Insurance',
  'Future Generali India Insurance',
  'Go Digit General Insurance',
  'HDFC ERGO General Insurance',
  'ICICI Lombard General Insurance',
  'IFFCO Tokio General Insurance',
  'Liberty General Insurance',
  'Max Bupa Health Insurance',
  'Navi General Insurance',
  'National Insurance',
  'Park Mediclaim Insurance TPA',
  'Reliance General Insurance',
  'Royal Sundaram Health Insurance',
  'SBI General Insurance',
  'SBI Life Insurance',
  'Star Health & Allied Insurance',
  'The New India Assurance',
  'The Oriental Insurance',
  'Universal Sompo General Insurance',
  'United India Insurance',
  'VH Medcare',
]

const governmentSchemes = [
  'Bhamashah Swasthya Bima Yojna',
  'Central Ware Housing Corporation',
  'Haryana Government',
  'Maa-Yojana',
  'Rajasthan Government Health Scheme (RGHS)',
  'Rajasthan Rajya Sahakari Upbhokta Sangh (CONFED)',
  'State Government',
  'The Jaipur Central Co-Operative Bank Ltd',
]

const publicSectorTieups = [
  'Bharat Petroleum Corporation Limited',
  'Bharat Sanchar Nigam Limited (BSNL)',
  'Central Board of Secondary Education (CBSE)',
  'Food Corporation of India (FCI)',
  'GAIL (India)',
  'HUDCO',
  'Hindustan Petroleum Corporation Limited',
  'Hindustan Salts Limited',
  'MNIT',
  'NPCIL Rawatbhata Rajasthan',
  'NSIC',
  'National Seeds Corporation Limited',
  'Rajasthan Housing Board',
  'Rashtriya Ispat Nigam Limited',
  'Reserve Bank of India (RBI)',
  'State Bank of India (SBI)',
  'The Rajasthan State Co-Operative Bank Limited',
]

export const metadata: Metadata = generatePageMetadata({
  title: 'Insurance & Cashless Treatment at Shalby Hospital Jaipur | Dr. Dubay',
  description:
    'See insurance, TPA and government-scheme tie-ups published by Shalby Hospital Jaipur, including RGHS. Cashless eligibility is subject to current empanelment, policy terms and pre-authorisation.',
  keywords:
    'Shalby Hospital Jaipur insurance, cashless hospital Jaipur, RGHS Shalby Jaipur, knee replacement insurance Jaipur, hip replacement insurance Jaipur',
  slug: 'insurance-cashless-jaipur',
})

function ListCard({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm leading-relaxed text-gray-700">
            <span className="mt-1 text-emerald-600">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default function InsuranceCashlessJaipurPage() {
  const canonical = `${defaultSEO.siteUrl}/insurance-cashless-jaipur`

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: defaultSEO.siteUrl },
          { name: 'Insurance & Cashless Treatment', url: canonical },
        ]}
      />
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <nav className="mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-emerald-700">Home</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-800">Insurance & Cashless Treatment</span>
        </nav>

        <header className="max-w-3xl">
          <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            Shalby Hospital Jaipur • Source verified {VERIFIED_DATE}
          </span>
          <h1 className="mt-4 text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
            Insurance & Cashless Treatment at Shalby Hospital Jaipur
          </h1>
          <p className="mt-4 text-base leading-relaxed text-gray-700">
            Shalby Hospital Jaipur publishes a hospital-specific list of insurance companies, TPAs,
            government schemes and institutional tie-ups. The lists below reproduce the categories
            currently published by Shalby Jaipur for patient guidance.
          </p>
        </header>

        <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-relaxed text-amber-950">
          <strong>Important:</strong> a published tie-up does not guarantee cashless approval for every
          patient or procedure. Eligibility can depend on current empanelment, policy wording, waiting
          periods, exclusions, medical indication, package rules and pre-authorisation. Verify your
          policy or scheme with Shalby Hospital before admission. Some names on Shalby&apos;s source page
          use legacy brand/scheme naming; this page therefore does not reinterpret or promise coverage.
        </div>

        <div className="mt-8 grid gap-6">
          <ListCard title="TPAs published by Shalby Jaipur" items={tpas} />
          <ListCard title="Insurance companies published by Shalby Jaipur" items={insurers} />
          <ListCard title="Government / scheme tie-ups published by Shalby Jaipur" items={governmentSchemes} />
          <ListCard title="Corporate / PSU tie-ups useful to patients" items={publicSectorTieups} />
        </div>

        <section className="mt-8 rounded-2xl border border-emerald-100 bg-emerald-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">What should you send for verification?</h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-700">
            Keep your insurer/TPA or scheme name, policy/card number, patient ID, planned procedure and
            any existing pre-authorisation documents ready. Shalby&apos;s insurance desk can confirm whether
            the current plan is eligible for cashless processing and what approval is required.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href="tel:+917413885999"
              className="rounded-lg bg-emerald-700 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
            >
              Call Shalby Jaipur: +91 74138 85999
            </a>
            <a
              href={SOURCE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-emerald-300 bg-white px-5 py-3 text-sm font-semibold text-emerald-800 hover:bg-emerald-100"
            >
              View Shalby&apos;s official tie-up page ↗
            </a>
          </div>
        </section>

        <section className="mt-10 border-t border-gray-200 pt-8">
          <h2 className="text-xl font-bold text-gray-900">Related treatment cost guides</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/cost/knee-replacement-jaipur" className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              Knee Replacement Cost in Jaipur
            </Link>
            <Link href="/cost/robotic-knee-replacement-jaipur" className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              Robotic Knee Replacement Cost
            </Link>
            <Link href="/cost/hip-replacement-jaipur" className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              Hip Replacement Cost in Jaipur
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
