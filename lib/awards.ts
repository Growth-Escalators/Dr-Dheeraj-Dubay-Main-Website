// Single source of truth for awards shown on the homepage AwardsSlider.
// The full canonical list lives in the DB Achievement model and renders on
// /achievements — this static array is just the curated slider order.
//
// Each award holds an array of photos so we can show ceremony shots,
// dignitaries, certificate, etc. as a thumbnail strip on the slider.
// Drop files in /public/assets/awards/{id}/1.jpg, 2.jpg, 3.jpg — paths
// that don't exist on disk fall back to /assets/images/hero.png
// (handled by ImageWithFallback), so it's safe to ship the placeholder
// paths now and add the real photos later.

export interface Award {
  id: string;
  name: string;
  issuingBody: string;
  year: string;
  oneLine: string;
  images: string[]; // first entry is the cover; rest are extra photos for the gallery strip
}

// Build 3-slot placeholder array for awards that don't have real photos yet.
const placeholders = (id: string) => [
  `/assets/awards/${id}/1.jpg`,
  `/assets/awards/${id}/2.jpg`,
  `/assets/awards/${id}/3.jpg`,
];

export const AWARDS: Award[] = [
  {
    id: "forbes-world-record",
    name: "Forbes World Record",
    issuingBody: "Forbes",
    year: "2024",
    oneLine: "34 joint replacement surgeries performed in a single day — a global first.",
    images: placeholders("forbes-world-record"),
  },
  {
    id: "uk-honour",
    name: "Indo-UK Leadership Award",
    issuingBody: "UK Parliament / Indo-UK Forum",
    year: "2024",
    oneLine:
      "International recognition for excellence in robotic joint replacement surgery.",
    images: placeholders("uk-honour"),
  },
  {
    id: "et-inspiring-leaders",
    name: "ET Inspiring Leaders Award",
    issuingBody: "Economic Times",
    year: "2025",
    oneLine:
      "Honoured as one of India's most inspiring healthcare leaders.",
    images: placeholders("et-inspiring-leaders"),
  },
  {
    id: "most-trusted-surgeon",
    name: "Most Trusted Joint Replacement Surgeon — North India",
    issuingBody: "Healthcare Achievers",
    year: "2023",
    oneLine:
      "Industry recognition based on patient outcomes and peer review.",
    images: placeholders("most-trusted-surgeon"),
  },
  {
    id: "golden-warriors",
    name: "Golden Warriors Walkathon",
    issuingBody: "Dr. Dheeraj Dubay Foundation",
    year: "Annual",
    oneLine:
      "Annual walk celebrating post-surgery patients who've reclaimed mobility.",
    images: placeholders("golden-warriors"),
  },
  {
    id: "health-minister-award",
    name: "Health Minister Award",
    issuingBody: "Government of Rajasthan",
    year: "3 consecutive years",
    oneLine: "State recognition for contributions to orthopedic healthcare.",
    images: placeholders("health-minister-award"),
  },
];
