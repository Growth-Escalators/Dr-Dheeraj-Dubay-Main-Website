// Single source of truth for awards shown on the homepage AwardsSlider.
// The full canonical list lives in the DB Achievement model and renders on
// /achievements — this static array is just the curated slider order.
// To swap an image: drop a file in public/assets/awards/ and update `image`.

export interface Award {
  id: string;
  name: string;
  issuingBody: string;
  year: string;
  oneLine: string;
  image: string; // path under /public/
}

export const AWARDS: Award[] = [
  {
    id: "forbes-world-record",
    name: "Forbes World Record",
    issuingBody: "Forbes",
    year: "2024",
    oneLine: "34 joint replacement surgeries performed in a single day — a global first.",
    image: "/assets/images/hero.png", // TODO(jatin): replace with Forbes award photo
  },
  {
    id: "uk-honour",
    name: "Indo-UK Leadership Award",
    issuingBody: "UK Parliament / Indo-UK Forum",
    year: "2024",
    oneLine:
      "International recognition for excellence in robotic joint replacement surgery.",
    image: "/assets/images/uk-honour.png", // TODO(jatin): confirm path
  },
  {
    id: "et-inspiring-leaders",
    name: "ET Inspiring Leaders Award",
    issuingBody: "Economic Times",
    year: "2025",
    oneLine:
      "Honoured as one of India's most inspiring healthcare leaders.",
    image: "/assets/images/et-award.png", // TODO(jatin): confirm path
  },
  {
    id: "most-trusted-surgeon",
    name: "Most Trusted Joint Replacement Surgeon — North India",
    issuingBody: "Healthcare Achievers",
    year: "2023",
    oneLine:
      "Industry recognition based on patient outcomes and peer review.",
    image: "/assets/images/most-trusted.png", // TODO(jatin): confirm path
  },
  {
    id: "golden-warriors",
    name: "Golden Warriors Walkathon",
    issuingBody: "Dr. Dheeraj Dubay Foundation",
    year: "Annual",
    oneLine:
      "Annual walk celebrating post-surgery patients who've reclaimed mobility.",
    image: "/assets/images/golden-warriors.png", // TODO(jatin): confirm path
  },
  {
    id: "health-minister-award",
    name: "Health Minister Award",
    issuingBody: "Government of Rajasthan",
    year: "3 consecutive years",
    oneLine: "State recognition for contributions to orthopedic healthcare.",
    image: "/assets/images/health-minister.png", // TODO(jatin): confirm path
  },
];
