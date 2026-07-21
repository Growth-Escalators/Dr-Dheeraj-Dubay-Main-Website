"use client";

const testimonials = [
  {
    name: "Rajendra Savita",
    city: "Jaipur",
    surgery: "Knee Replacement",
    rating: 5,
    text: "Dr Dheeraj Dubay is the best doctor for knee replacement. His team's work is excellent. My mother did not face any problem during her stay. The doctor and his team are simply the best.",
  },
  {
    name: "Sakshi Jain",
    city: "Agra",
    surgery: "Knee Replacement",
    rating: 5,
    text: "I went to Dr Dheeraj Dubay for my father's knee replacement surgery. Amazing and very polite doctor. My father is completely fine now and walking properly.",
  },
  {
    name: "RamChandra Chaudhry",
    city: "Jaipur",
    surgery: "Knee Replacement",
    rating: 5,
    text: "Dr Dheeraj Dubay is an amazing doctor with great work. Best knee and hip replacement surgeon in Shalby Hospital Jaipur.",
  },
  {
    name: "Shashi Sharma",
    city: "Jaipur",
    surgery: "Hip Replacement",
    rating: 5,
    text: "Dr Dheeraj best knee and hip surgeon in Shalby Hospital. My mother is completely fine now and is able to walk properly without any pain.",
  },
  {
    name: "Meena Agarwal",
    city: "Bikaner",
    surgery: "Knee Replacement",
    rating: 5,
    text: "After years of knee pain I finally got relief after surgery by Dr Dubay. The procedure was quick and recovery was faster than I expected. Highly recommended.",
  },
  {
    name: "Suresh Kumar",
    city: "Alwar",
    surgery: "Total Knee Replacement",
    rating: 5,
    text: "Dr Dubay's zero technique is remarkable. I was walking the same day after surgery. His entire team is professional and caring throughout the process.",
  },
];

export default function WrittenTestimonials() {
  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-2">
          Patient <span className="text-emerald-600">Reviews</span>
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-10">
          Hear from patients who trusted Dr. Dubay with their care
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-amber-400 text-lg tracking-wide">
                    {"★".repeat(t.rating)}
                  </div>
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-2.5 py-1 rounded-full">
                    Verified Patient
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>
              <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
                <p className="font-semibold text-gray-900 dark:text-white">
                  {t.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {t.surgery} &middot; {t.city}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
