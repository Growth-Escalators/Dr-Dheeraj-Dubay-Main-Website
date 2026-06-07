// "As Seen On" media strip — news outlets that have featured Dr. Dubay.
// Static list for now; can pull from the DB later if you tag YouTube
// entries by source. Logos go in /public/assets/media-logos/.

interface MediaOutlet {
  name: string;
  logoUrl?: string;
}

const OUTLETS: MediaOutlet[] = [
  { name: "Forbes" },
  { name: "Economic Times" },
  { name: "India TV" },
  { name: "Times of India" },
  { name: "Dainik Bhaskar" },
  // TODO(jatin): swap names for logo images once available; drop to
  //   /public/assets/media-logos/{slug}.png and set logoUrl above.
];

export function AsSeenOnStrip() {
  if (OUTLETS.length === 0) return null;
  return (
    <section className="py-10 bg-white border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-4">
        <p className="text-center text-xs font-semibold text-gray-500 uppercase tracking-widest mb-5">
          As seen on
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {OUTLETS.map((o) => (
            <div
              key={o.name}
              className="text-gray-400 text-sm md:text-base font-medium grayscale opacity-80 hover:opacity-100 transition"
            >
              {o.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
