import Image from "next/image";
import {
  EXPERIENCE_YEARS_DISPLAY,
  RECORD_SURGERIES_IN_A_DAY,
  SURGERY_COUNT_DISPLAY,
} from "@/lib/clinic-info";

export default function Section2() {
  return (
    <section className="flex items-center bg-stone-100 font-poppins dark:bg-inherit">
      <div className="mx-auto max-w-[90%] flex-1 justify-center py-8 md:px-6 lg:py-12">
        <div className="flex flex-wrap items-center gap-y-8">
          <div className="mx-auto w-full px-4 lg:w-[48%]">
            <span className="text-lg font-semibold uppercase text-primary">
              About Dr. Dheeraj Dubay
            </span>
            <h1 className="mb-6 mt-2 text-3xl font-bold text-gray-900 dark:text-gray-100 md:text-4xl">
              Orthopedic &amp; Joint Replacement Surgeon in Jaipur
            </h1>
            <p className="mt-3 text-xl leading-relaxed text-gray-700 dark:text-gray-200">
              Director, Robotic Joint Replacement Surgery — Shalby Hospital Jaipur
            </p>
            <p className="my-4 text-lg font-semibold text-gray-700 dark:text-gray-200">
              MBBS, MS (Orthopedic), FJRS (Germany)
            </p>
            <p className="mt-5 max-w-4xl text-base leading-8 text-gray-600 dark:text-gray-300">
              Dr. Dheeraj Dubay has {EXPERIENCE_YEARS_DISPLAY} years of orthopedic experience and has performed {SURGERY_COUNT_DISPLAY} total surgeries across his career. His current practice at Shalby Hospital Jaipur focuses on knee and hip replacement, including robotic, computer-navigated, minimally invasive and revision approaches where clinically appropriate.
            </p>
            <p className="mt-4 max-w-4xl text-base leading-8 text-gray-600 dark:text-gray-300">
              On 9 May 2024, he recorded {RECORD_SURGERIES_IN_A_DAY} joint replacements in one day — 33 knee replacements and 1 hip replacement. Treatment recommendations on this website are presented as patient education; the appropriate treatment for an individual patient is decided after examination, imaging and assessment of overall health.
            </p>
            <p className="mt-4 text-sm leading-6 text-gray-500 dark:text-gray-400">
              Dr. Dheeraj Dubay&apos;s surname is also commonly searched and listed as “Dubey”; both spellings refer to the same doctor.
            </p>
          </div>

          <div className="mb-10 w-full px-4 md:my-8 lg:mb-0 lg:w-1/2">
            <div className="relative">
              <Image
                width={900}
                height={900}
                src="/assets/images/hero2.JPG"
                alt="Dr. Dheeraj Dubay, orthopedic and joint replacement surgeon at Shalby Hospital Jaipur"
                sizes="(max-width: 1023px) 100vw, 50vw"
                quality={72}
                className="relative z-10 h-auto w-full rounded-xl object-cover"
              />
              <div className="absolute bottom-0 right-0 z-10 rounded-tl-xl bg-white p-4 shadow sm:p-6 dark:bg-gray-800 dark:text-gray-200">
                <p className="text-base font-semibold">
                  {EXPERIENCE_YEARS_DISPLAY} Years Orthopedic Experience
                </p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {SURGERY_COUNT_DISPLAY} Total Surgeries
                </p>
              </div>
              <div className="absolute -bottom-5 left-5 hidden h-full w-full rounded-xl bg-primary lg:block" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
