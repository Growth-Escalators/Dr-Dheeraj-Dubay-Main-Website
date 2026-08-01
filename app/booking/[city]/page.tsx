import { db } from "@/lib/db";
import React from "react";
import { Booking } from "@/components/ui/booking";
import type { Metadata } from "next";

// Was an in-body <head> carrying a bare "Dr. Dubay" title on every city.
// Now a real per-city title via the Metadata API.
export async function generateMetadata({
  params,
}: {
  params: { city: string };
}): Promise<Metadata> {
  const city = params.city
    ? params.city.charAt(0).toUpperCase() + params.city.slice(1)
    : "";
  return {
    title: city
      ? `Book Appointment in ${city} | Dr. Dheeraj Dubay`
      : "Book Appointment | Dr. Dheeraj Dubay",
    description:
      "Dr. Dheeraj Dubay, Joint and Hip Replacement Surgeon in Rajasthan.",
  };
}

const AppointmentPage = async ({ params }: { params: { city: string } }) => {
  let city = null;
  try {
    city = await db.cities.findUnique({
      where: {
        name: params.city,
      },
      include: {
        closeddays: true,
        days: true,
      },
    });
  } catch (error) {
    console.error("[BOOKING_CITY_GET]", error);
  }

  if (!city) {
    return <div>City not Availiable we will be coming soon to ur city</div>;
  }

  return (
    <Booking
      closedDays={city.closeddays}
      days={city.days}
      city={params.city}
    />
  );
};

export default AppointmentPage;
