import { ReviewInput } from "@/components/seo/JsonLd"

interface Props {
  reviews: ReviewInput[]
  heading?: string
  subheading?: string
  language?: "en" | "hi"
  // For pages that have textHi available, pass it through.
  textHi?: (id: string) => string | null | undefined
}

const Stars = ({ rating }: { rating: number }) => (
  <span aria-label={`${rating} out of 5 stars`} className="text-amber-500 text-base tracking-tight">
    {"★".repeat(rating)}
    <span className="text-gray-300">{"★".repeat(5 - rating)}</span>
  </span>
)

// 3-card testimonial strip. Renders 1, 2, or 3 cards depending on input
// length. Designed to drop into any page above the booking CTA. Pairs
// with AggregateRatingJsonLd + ReviewListJsonLd for the structured data.
export const TestimonialStrip = ({
  reviews,
  heading = "What our patients say",
  subheading,
  language = "en",
  textHi,
}: Props) => {
  if (!reviews.length) return null

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="py-12 px-4 md:px-6 bg-gray-50 border-y border-gray-200"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2
            id="testimonials-heading"
            className="text-2xl md:text-3xl font-bold text-gray-900 mb-2"
          >
            {heading}
          </h2>
          {subheading ? (
            <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
              {subheading}
            </p>
          ) : null}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reviews.slice(0, 3).map((r) => {
            const body = language === "hi" && textHi ? (textHi(r.id) || r.text) : r.text
            return (
              <article
                key={r.id}
                className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex flex-col"
              >
                <div className="flex items-center justify-between mb-3">
                  <Stars rating={r.rating} />
                  <time
                    className="text-xs text-gray-400"
                    dateTime={(typeof r.dateOfReview === "string"
                      ? new Date(r.dateOfReview)
                      : r.dateOfReview
                    ).toISOString().slice(0, 10)}
                  >
                    {(typeof r.dateOfReview === "string"
                      ? new Date(r.dateOfReview)
                      : r.dateOfReview
                    ).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </time>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-4 flex-1">
                  &ldquo;{body}&rdquo;
                </p>
                <footer className="border-t border-gray-100 pt-3">
                  <p className="text-sm font-semibold text-gray-900">
                    {r.patientName}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {[r.procedure, r.city].filter(Boolean).join(" — ")}
                  </p>
                </footer>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
