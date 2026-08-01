import { Suspense } from "react";
import { v4 as uuidv4 } from "uuid";
import Appointment from "@/components/ui/appointment-form";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

// Title/description used to live in an in-body <head> element, which React
// rejects as invalid nesting. Moved to the Metadata API — same strings, now
// actually emitted into the document head.
export const metadata: Metadata = {
  title: "Book Appointment | Dr. Dubay",
  description:
    "Book an appointment with Dr. Dheeraj Dubay, Joint Replacement Surgeon in Jaipur.",
};

const BillboardPage = async () => {
  const userId = uuidv4();
  return (
    <>
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          {/* Appointment reads the date/time/city query params via
              useSearchParams, which Next requires inside a Suspense boundary. */}
          <Suspense
            fallback={
              <div className="py-20 text-center text-gray-500">
                Loading booking form…
              </div>
            }
          >
            <Appointment name="" email="" userId={userId} />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default BillboardPage;
