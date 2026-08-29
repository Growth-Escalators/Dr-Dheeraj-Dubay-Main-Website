import Image from "next/image";
import { getWhatsAppBookingUrl } from "@/lib/whatsapp-booking";

const carePrinciples = [
  {
    title: 'Diagnosis before procedure',
    description: 'Treatment planning starts with symptoms, clinical examination, imaging and overall health rather than a predetermined operation.',
  },
  {
    title: 'Patient-specific surgical plan',
    description: 'Total, partial, robotic, navigation-assisted or revision approaches are considered according to the condition and anatomy.',
  },
  {
    title: 'Early mobilisation when appropriate',
    description: 'Rehabilitation may begin early for suitable patients, but walking, stairs and discharge timelines vary from person to person.',
  },
  {
    title: 'Recovery focused on function',
    description: 'Physiotherapy, pain management and follow-up are adapted to the patient’s progress, health and mobility goals.',
  },
]

export default function Section1() {
  return (
    <section className="bg-gray-50 py-16 font-poppins dark:bg-inherit md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-4">
            {[
              { src: '/assets/images/main.JPG', alt: 'Dr. Dheeraj Dubay during orthopedic clinical work' },
              { src: '/assets/images/dubay/p4.webp', alt: 'Dr. Dheeraj Dubay at a professional orthopedic event' },
            ].map((image) => (
              <div key={image.src} className="overflow-hidden rounded-2xl bg-gray-100">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={700}
                  height={700}
                  sizes="(max-width: 1023px) 50vw, 25vw"
                  quality={70}
                  className="aspect-square h-auto w-full object-cover"
                />
              </div>
            ))}
          </div>

          <div>
            <span className="text-lg font-semibold text-primary dark:text-blue-400">
              Approach to joint replacement care
            </span>
            <h2 className="mb-5 mt-2 text-2xl font-bold text-gray-800 dark:text-gray-200 md:text-3xl">
              Clear diagnosis, appropriate technology and structured rehabilitation
            </h2>
            <p className="mb-6 text-base leading-8 text-gray-600 dark:text-gray-300">
              Dr. Dheeraj Dubay&apos;s practice at Shalby Hospital Jaipur focuses on helping patients understand the diagnosis, alternatives to surgery, the proposed procedure and the recovery plan before a treatment decision is made.
            </p>

            <div className="space-y-4">
              {carePrinciples.map((item, index) => (
                <div key={item.title} className="flex gap-4 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href={getWhatsAppBookingUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-block rounded-xl bg-primary px-7 py-3 font-bold text-white hover:bg-cyan-700"
            >
              Book Appointment
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
