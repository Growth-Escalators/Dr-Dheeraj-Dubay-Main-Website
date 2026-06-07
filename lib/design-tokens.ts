// Design system tokens — canonical visual language for the site.
// Every NEW component should reference these. Legacy components are
// being migrated incrementally; if you're touching one, swap to these.

/**
 * Section backgrounds — alternate ONLY these two. No purple, peach,
 * lavender, rose, amber-100 backgrounds. White + emerald-50 only.
 */
export const SECTION_BG = {
  light: "bg-white",
  tint: "bg-emerald-50",
} as const;

/**
 * Accent color used for badges, "Learn more" links, primary CTAs in
 * non-primary blocks. Use `bg-primary` (blue) only for the main
 * Book Appointment CTA.
 */
export const ACCENT = {
  text: "text-emerald-700",
  textStrong: "text-emerald-800",
  bg: "bg-emerald-600",
  bgHover: "hover:bg-emerald-700",
  bgLight: "bg-emerald-50",
  border: "border-emerald-200",
  borderHover: "hover:border-emerald-300",
} as const;

/**
 * Card defaults — apply to any clickable card (procedure, condition,
 * achievement, blog, etc.). Avoid one-off card styles.
 */
export const CARD = {
  base: "bg-white rounded-xl border border-gray-200 shadow-sm",
  hover: "hover:border-emerald-300 hover:shadow-md transition-all",
  padding: "p-5",
} as const;

/**
 * Button intent. Primary = the booking conversion. Secondary = WhatsApp
 * / call. Outline = supportive actions.
 */
export const BUTTON = {
  primary:
    "inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition shadow-sm",
  secondary:
    "inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition shadow-sm",
  outline:
    "inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-emerald-300 text-emerald-700 text-sm font-semibold rounded-lg hover:bg-emerald-50 transition",
} as const;

/**
 * Section heading wrapper — H2 + optional eyebrow badge + optional sub.
 * Re-use this combo across sections; it sets the rhythm of the page.
 */
export const SECTION_HEADING_CLASSES = {
  eyebrow:
    "inline-block bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide mb-3 border border-emerald-200",
  h2: "text-3xl font-bold text-gray-900 mb-3",
  sub: "text-gray-500 max-w-xl mx-auto text-sm md:text-base",
} as const;
