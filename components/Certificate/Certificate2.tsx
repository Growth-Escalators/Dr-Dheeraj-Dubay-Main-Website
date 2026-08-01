import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const Certificate2 = (props: Props) => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Image Section */}
            <div className="relative">
              <Image
                width={1200}
                height={900}
                className="w-full h-[400px] object-cover rounded-lg"
                src="/assets/images/award.jpeg"
                alt="Dr. Dubay Award Image"
              />
              <div className="absolute inset-0 -z-[1] bg-gradient-to-tr from-gray-200 via-white/0 to-white/0 w-full h-full rounded-md mt-4 -mb-4 mr-4 -ml-4 lg:mt-6 lg:-mb-6 lg:mr-6 lg:-ml-6 dark:from-slate-800 dark:via-slate-900/0 dark:to-slate-900/0"></div>
            </div>

            {/* Content Section */}
            <div className="flex flex-col justify-center space-y-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white leading-tight">
                Dr. Dubay Breaks
                <span className="text-primary"> Forbes World Record </span>
                for Highest Number of joint replacement surgeries in a single day.
              </h2>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-400">
                Dr. Dubay from Rajasthan, India, made history by performing{" "}
                <b>34 joint replacement surgeries</b> in a single day, earning a
                spot in the Forbes World Record.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  className="inline-flex justify-center items-center px-8 py-3 bg-primary hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-200 text-lg"
                  href={"/booking/jaipur"}
                >
                  Book an appointment
                </Link>

                <Link
                  href={"/contact"}
                  className="inline-flex justify-center items-center px-8 py-3 border border-gray-300 hover:border-gray-400 text-gray-700 font-medium rounded-md transition-colors duration-200 dark:border-gray-700 dark:text-white text-lg"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate2;
