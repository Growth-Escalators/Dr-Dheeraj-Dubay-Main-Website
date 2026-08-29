import type { ReviewInput } from "./JsonLd";

// Keep the core entity schema in the existing implementation, but deliberately
// disable review/rating JSON-LD for pages owned by the physician/practice.
// Visible testimonials and Google rating copy can remain on the site; this only
// prevents self-serving AggregateRating/Review markup from being emitted.
export { PhysicianJsonLd, MedicalBusinessJsonLd } from "./JsonLd";
export type { ReviewInput } from "./JsonLd";

export function AggregateRatingJsonLd(_props: {
  ratingValue: number;
  reviewCount: number;
  itemType?: "Physician" | "MedicalBusiness" | "MedicalProcedure";
  itemId?: string;
  itemName?: string;
}) {
  return null;
}

export function ReviewListJsonLd(_props: {
  reviews: ReviewInput[];
  itemReviewedName?: string;
  itemReviewedType?: "Physician" | "MedicalProcedure" | "MedicalBusiness";
  itemReviewedId?: string;
}) {
  return null;
}
