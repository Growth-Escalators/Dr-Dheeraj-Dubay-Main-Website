import React from "react";
import Image from "next/image";
import { getWhatsAppBookingUrl } from "@/lib/whatsapp-booking";
import {
  SURGERY_COUNT_DISPLAY,
  EXPERIENCE_YEARS_DISPLAY,
  RECORD_SURGERIES_IN_A_DAY,
} from "@/lib/clinic-info";

type Props = {};

const Card1 = (props: Props) => {
  return (
    <div>
      <section className="pt-10 overflow-hidden bg-[#F4FEFA] dark:bg-inherit py-8 md:pt-0 sm:pt-16 2xl:pt-16">
        <div className="lg:w-[85%] px-4 mx-auto sm:px-6 lg:px-8">
          <div className="grid items-center grid-cols-1 md:grid-cols-2 gap-12">
            <div data-aos="fade-right" className="space-y-6">
              <h1 className="text-3xl font-bold leading-tight bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent sm:text-5xl lg:text-6xl">
                Dr. Dheeraj Dubay — Orthopedic Surgeon in Jaipur
              </h1>
              <p className="text-xl lg:text-2xl font-medium text-emerald-600 dark:text-emerald-400">
                Director, Robotic Joint Replacement Surgery — Shalby Hospital Jaipur
              </p>
              <div className="inline-flex items-center px-4 py-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg">
                <span className="text-lg font-semibold text-emerald-700 dark:text-emerald-300">
                  MBBS, MS (Orthopedic), FJRS (Germany)
                </span>
              </div>

              <p className="text-lg lg:text-xl leading-relaxed text-gray-600 dark:text-gray-300">
                Dr. Dheeraj Dubay has{" "}
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  {EXPERIENCE_YEARS_DISPLAY} years of orthopedic experience
                </span>{" "}
                and has performed more than{" "}
                <span className="text-black font-bold dark:text-gray-200">
                  {SURGERY_COUNT_DISPLAY} surgeries
                </span>.
                His Jaipur practice focuses on knee and hip replacement, including robotic,
                computer-navigated and minimally invasive techniques, at Shalby Hospital Jaipur.
              </p>

              <div className="flex flex-wrap gap-2 text-sm font-semibold">
                <a href="/procedures/knee-replacement-surgery" className="rounded-full border border-emerald-200 bg-white px-4 py-2 text-emerald-800 hover:bg-emerald-50">
                  Knee Replacement
                </a>
                <a href="/procedures/robotic-knee-replacement" className="rounded-full border border-emerald-200 bg-white px-4 py-2 text-emerald-800 hover:bg-emerald-50">
                  Robotic Knee Replacement
                </a>
                <a href="/hip-replacement-jaipur" className="rounded-full border border-emerald-200 bg-white px-4 py-2 text-emerald-800 hover:bg-emerald-50">
                  Hip Replacement
                </a>
              </div>

              <div className="p-6 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/30 dark:to-yellow-900/30 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-amber-200/50 dark:border-amber-700/30">
                <div className="flex items-center gap-4">
                  <div className="shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-amber-500 drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold bg-gradient-to-r from-amber-600 to-yellow-500 dark:from-amber-400 dark:to-yellow-300 bg-clip-text text-transparent mb-1">
                      Recorded Surgical Milestone — {RECORD_SURGERIES_IN_A_DAY} Joint Replacements in One Day
                    </h4>
                    <p className="text-base text-amber-900 dark:text-amber-200">
                      33 knee replacements and 1 hip replacement performed on 9 May 2024
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-sm text-sm font-semibold text-gray-700 dark:text-gray-200 border border-gray-100 dark:border-gray-700">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                  {SURGERY_COUNT_DISPLAY} Total Surgeries
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-sm text-sm font-semibold text-gray-700 dark:text-gray-200 border border-gray-100 dark:border-gray-700">
                  <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                  {RECORD_SURGERIES_IN_A_DAY} Joint Replacements in One Day
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-sm text-sm font-semibold text-gray-700 dark:text-gray-200 border border-gray-100 dark:border-gray-700">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  {EXPERIENCE_YEARS_DISPLAY} Years Experience
                </span>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href={getWhatsAppBookingUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200 dark:shadow-none"
                >
                  Book Appointment
                </a>
                <a
                  href="tel:+918955373205"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-emerald-600 rounded-xl font-semibold border-2 border-emerald-600 hover:bg-emerald-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Now
                </a>
              </div>
            </div>

            <div data-aos="fade-left" className="relative">
              <Image
                width={1000}
                height={1000}
                className="relative w-full xl:max-w-lg xl:mx-auto 2xl:scale-125 rounded-2xl shadow-2xl"
                src="/assets/images/hero.png"
                alt="Dr. Dheeraj Dubay, orthopedic and joint replacement surgeon in Jaipur"
                sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1279px) 50vw, 520px"
                quality={68}
                priority
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Card1;
