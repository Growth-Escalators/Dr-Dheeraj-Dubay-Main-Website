import { Star } from "lucide-react";
import { CLINICS } from "@/lib/clinic-info";

interface Props {
  clinicId?: string; // defaults to primary (shalby)
  label?: string;
}

// "Leave a Google Review" CTA — opens the GBP review-write URL.
// Drop on Testimonials, Locations, and any thank-you / post-OPD pages.
// Uses CLINICS data so it stays in sync with NAP source.
export function GoogleReviewButton({ clinicId = "shalby-jaipur", label }: Props) {
  const clinic = CLINICS.find((c) => c.id === clinicId);
  if (!clinic?.googleReviewUrl) return null;

  return (
    <a
      href={clinic.googleReviewUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-amber-300 text-amber-700 text-sm font-semibold rounded-lg hover:bg-amber-50 transition shadow-sm"
    >
      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
      {label || "Leave a Google Review"}
    </a>
  );
}
