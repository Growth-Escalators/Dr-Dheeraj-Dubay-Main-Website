"use client";
import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { SURGERY_COUNT } from "@/lib/clinic-info";

export const Stats = () => {
  const [surgeryCount, setSurgeryCount] = useState(SURGERY_COUNT);

  useEffect(() => {
    fetch('/api/surgery-count')
      .then(r => r.json())
      .then(d => setSurgeryCount(d.count || SURGERY_COUNT))
      .catch(e => console.error('[Stats/surgery-count]', e));
  }, []);

  const stats = [
    {
      title: "Surgeries in a Day",
      count: 34,
      color: "bg-blue-500",
      suffix: "",
      isRecord: true,
    },
    {
      title: "Successful Surgeries",
      count: surgeryCount,
      color: "bg-green-500",
      suffix: "+",
      isRecord: false,
    },
    {
      title: "Happy Patients",
      count: 60000,
      color: "bg-purple-500",
      suffix: "+",
      isRecord: false,
    },
  ];

  return (
    <div className="relative mt-8 bg-gradient-to-b from-[#F4FEFA] to-white dark:from-gray-900/50 dark:to-gray-800/50 overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-grid-slate-200 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/30"></div>

      <div className="relative max-w-[85rem] px-4 py-12 sm:px-6 lg:px-8 lg:py-16 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent md:text-5xl">
            Milestones & Achievements
          </h2>
          <div className="mt-4 flex justify-center">
            <div className="h-1.5 w-32 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.03 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative h-full p-8 bg-white dark:bg-gray-800 rounded-2xl border border-emerald-100 dark:border-emerald-800 shadow-lg group-hover:shadow-2xl transition-all duration-300">
                <div className="flex flex-col items-center">
                  {stat.isRecord && (
                    <div className="mb-6 relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-300/50 to-transparent animate-shine"></div>
                      <span className="relative inline-flex items-center px-4 py-2 rounded-full text-base font-semibold bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-md transform hover:scale-105 transition-transform duration-300">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-5 w-5 mr-2 animate-pulse" 
                          viewBox="0 0 24 24" 
                          fill="currentColor"
                        >
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                        </svg>
                        World Record
                      </span>
                    </div>
                  )}
                  
                  <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent mb-4">
                    <CountUp
                      end={stat.count}
                      duration={2.5}
                      separator=","
                      suffix={stat.suffix}
                      enableScrollSpy
                      scrollSpyOnce
                    />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 text-center">
                    {stat.title}
                  </h3>
                  
                  {stat.isRecord}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Add this to your global CSS file or style tag
const styles = `
@keyframes shine {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

.animate-shine {
  animation: shine 2s infinite;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.5),
    transparent
  );
}
`;
