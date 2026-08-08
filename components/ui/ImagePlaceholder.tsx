import { AwardIcon, CalendarIcon, FileTextIcon, ImageIcon } from "lucide-react";

// Shown where a card has no image.
//
// Images are optional in the CRM — an achievement, event, blog post or service
// can be published before its photo exists. Previously those fell back to
// /assets/images/hero.png, so a grid of six cards could show the same portrait
// of the doctor six times, which reads as broken rather than deliberate. This
// renders a tinted panel with the item's category instead: clearly a
// placeholder, and it doesn't pretend to be a photo.
const ICONS = {
  award: AwardIcon,
  event: CalendarIcon,
  article: FileTextIcon,
  generic: ImageIcon,
} as const;

export function ImagePlaceholder({
  label,
  kind = "generic",
  className = "",
}: {
  /** Usually the item's category — "Award", "Conference", "Event". */
  label?: string | null;
  kind?: keyof typeof ICONS;
  className?: string;
}) {
  const Icon = ICONS[kind];

  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/60 ${className}`}
      // Decorative: the card's own heading already names the item, so a screen
      // reader gains nothing from "placeholder image".
      aria-hidden
    >
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-emerald-100 bg-white text-emerald-500">
        <Icon className="h-5 w-5" />
      </span>
      {label && (
        <span className="px-3 text-center text-[11px] font-semibold uppercase tracking-wide text-emerald-700/70">
          {label}
        </span>
      )}
    </div>
  );
}
