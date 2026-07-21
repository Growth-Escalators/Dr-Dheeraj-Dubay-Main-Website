"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const AchievementCollage = () => {
  return (
    <section className="pt-10 overflow-hidden bg-[#F4FEFA] dark:bg-inherit py-8 md:pt-0 sm:pt-16 2xl:pt-16">
      <div className="lg:w-[85%] px-4 mx-auto sm:px-6 lg:px-8">
        <div className="grid items-center grid-cols-1 md:grid-cols-2 gap-12">
          <div data-aos="fade-right" className="space-y-6">
            <h2 className="text-3xl font-bold leading-tight bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent sm:text-4xl lg:text-5xl">
              Golden Warriors Walkathon 2025
            </h2>
            <p className="text-xl lg:text-2xl font-medium text-emerald-600 dark:text-emerald-400">
              A New Era in Orthopedic Care
            </p>
            <div className="inline-flex items-center px-4 py-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg">
              <span className="text-lg font-semibold text-emerald-700 dark:text-emerald-300">
                Transforming Lives Through Innovation
              </span>
            </div>
            
            <p className="text-lg lg:text-xl leading-relaxed text-gray-600 dark:text-gray-300">
              Dr. Dheeraj Dubay&apos;s Golden Warriors Walkathon 2025 marked a significant
              step toward transforming lives in the field of orthopedics. This landmark 
              event brought together individuals to promote mobility, resilience, and 
              a pain-free future. Together, we are redefining possibilities in joint 
              health and active living!
            </p>

            <div className="p-6 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/30 dark:to-yellow-900/30 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-amber-200/50 dark:border-amber-700/30">
              <div className="flex items-center gap-4">
                <div className="shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-amber-500 drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold bg-gradient-to-r from-amber-600 to-yellow-500 dark:from-amber-400 dark:to-yellow-300 bg-clip-text text-transparent mb-1">
                    Milestone Achievement
                  </h4>
                  <p className="text-base text-amber-900 dark:text-amber-200">
                    Leading the way in orthopedic innovation and patient care
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div data-aos="fade-left" className="relative">
            <Image
              width={1400}
              height={1400}
              className="relative w-full xl:max-w-lg xl:mx-auto 2xl:scale-125 rounded-2xl shadow-2xl"
              src="/assets/images/HomePagePic.jpeg"
              alt="Golden Warriors Walkathon 2025"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementCollage; 