// Keeps legacy/data-file copy aligned with the current, clinic-confirmed
// practice statistics without forcing every SEO data file to duplicate the
// same numbers. This is intentionally narrow: only doctor-stat phrases are
// normalised; prices, dates and unrelated numbers are never touched.

const SURGERY_DISPLAY = "40,000+";
const EXPERIENCE_DISPLAY = "24 years";

export function normalizePracticeFactText(input: string): string {
  return input
    // English surgery-count variants used across procedure, condition, cost
    // and location copy. The lookahead requires a surgery/procedure context
    // so a currency amount such as ₹35,000 can never be rewritten.
    .replace(
      /35,000\+(?=[^₹\d\n.!?]{0,80}(?:surger|operation|joint replacement|knee replacement|hip replacement))/gi,
      SURGERY_DISPLAY,
    )
    .replace(
      /\bover 35,000(?=[^₹\d\n.!?]{0,80}(?:surger|operation|joint replacement|knee replacement|hip replacement))/gi,
      "over 40,000",
    )
    // Hindi equivalents used in the Hindi SEO pages.
    .replace(
      /35,000\+(?=[^₹\d\n।.!?]{0,80}(?:ऑपरेशन|सर्जरी|प्रत्यारोपण))/g,
      SURGERY_DISPLAY,
    )
    .replace(
      /35,000 से अधिक(?=[^₹\d\n।.!?]{0,80}(?:ऑपरेशन|सर्जरी|प्रत्यारोपण))/g,
      "40,000 से अधिक",
    )
    // Experience wording. The current clinic-confirmed figure is exactly
    // 24 years, so do not preserve the old '+' qualifier.
    .replace(/\b23\+\s*years?\b/gi, EXPERIENCE_DISPLAY)
    .replace(/\bover 23 years?\b/gi, EXPERIENCE_DISPLAY)
    .replace(/\b23 years?\b/gi, EXPERIENCE_DISPLAY)
    .replace(/23\+\s*साल/g, "24 साल")
    .replace(/23\s*साल/g, "24 साल")
    .replace(/23\+\s*वर्ष/g, "24 वर्ष")
    .replace(/23\s*वर्ष/g, "24 वर्ष");
}

/**
 * Recursively normalise strings in immutable SEO data objects. Arrays and
 * plain objects are cloned; non-plain values are returned untouched.
 */
export function normalizePracticeFacts<T>(value: T): T {
  if (typeof value === "string") {
    return normalizePracticeFactText(value) as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => normalizePracticeFacts(item)) as T;
  }

  if (value && typeof value === "object") {
    const prototype = Object.getPrototypeOf(value);
    if (prototype === Object.prototype || prototype === null) {
      return Object.fromEntries(
        Object.entries(value as Record<string, unknown>).map(([key, item]) => [
          key,
          normalizePracticeFacts(item),
        ]),
      ) as T;
    }
  }

  return value;
}
