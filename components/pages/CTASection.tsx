import { getWhatsAppBookingUrl } from '@/lib/whatsapp-booking'

export function CTASection({
  heading = 'Need an Orthopedic Consultation?',
  subheading = 'Book a consultation with Dr. Dheeraj Dubay. Appointments are available at Shalby Hospital Jaipur and Dr. Dubay Hip & Knee Clinic, Vidhyadhar Nagar.',
  showWhatsApp = true,
}: {
  heading?: string
  subheading?: string
  showWhatsApp?: boolean
}) {
  return (
    <div className="my-12 rounded-2xl bg-blue-700 p-8 text-center md:p-12">
      <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">{heading}</h2>
      <p className="mx-auto mb-8 max-w-xl leading-relaxed text-blue-100">{subheading}</p>
      <div className="flex flex-col justify-center gap-4 sm:flex-row">
        <a
          href={getWhatsAppBookingUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl bg-white px-8 py-3 text-sm font-bold text-blue-700 transition-colors hover:bg-blue-50"
        >
          Book Appointment
        </a>
        <a
          href="tel:+918955373205"
          className="rounded-xl border border-blue-500 bg-blue-600 px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-500"
        >
          Call +91-8955373205
        </a>
        {showWhatsApp && (
          <a
            href="https://wa.me/918955373205"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-green-500 px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-green-400"
          >
            WhatsApp Us
          </a>
        )}
      </div>
      <p className="mx-auto mt-5 max-w-xl text-xs leading-relaxed text-blue-100/90">
        Website information is educational. Diagnosis and treatment recommendations require an individual clinical assessment.
      </p>
    </div>
  )
}
