import { redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

// Was an in-body <head> (invalid nesting). Same copy, via the Metadata API.
export const metadata: Metadata = {
  title: "Booking Successful | Dr. Dubay",
  description:
    "Dr. Dheeraj Dubay, Joint and Hip Replacement Surgeon in Rajasthan",
};

const BookingSuccess = async () => {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
            Booking Successful!
          </h2>
          <p className="text-center text-lg text-gray-700 mb-6">
            Thank you for booking with us. Your appointment has been confirmed.
          </p>
          <div className="flex justify-center">
            <Link href="/">
              <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded">
                Back to Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingSuccess;
