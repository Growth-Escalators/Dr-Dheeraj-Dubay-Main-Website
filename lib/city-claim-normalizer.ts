// City landing pages were originally written with several unsourced local
// patient counts and absolute comparative claims. Keep the local relevance and
// useful travel/OPD information while removing claims we cannot independently
// substantiate from the page data itself.

export function normalizeCityClaimText(input: string): string {
  return input
    .replace(
      /is the preferred choice for knee and hip replacement surgery for patients from/gi,
      "consults patients from",
    )
    .replace(
      /His Zero technique ensures patients are walking within 24 hours of surgery\./gi,
      "His Zero Technique protocol is designed to support early mobilisation; recovery timelines vary by patient.",
    )
    .replace(
      /is the top choice for knee replacement surgery for patients from/gi,
      "provides knee replacement care for patients from",
    )
    .replace(
      /make him the most trusted orthopaedic surgeon in the region\./gi,
      "are part of his experience in joint replacement care.",
    )
    .replace(
      /is Jaipur's most experienced joint replacement surgeon/gi,
      "provides joint replacement care in Jaipur",
    )
    .replace(
      /Jaipur's top joint replacement surgeon\./gi,
      "Joint replacement surgeon in Jaipur.",
    )
    .replace(
      /Over [\d,]+ patients from ([A-Za-z ]+) have been successfully treated\./gi,
      "Patients from $1 consult Dr. Dheeraj Dubay for joint replacement care in Jaipur.",
    )
    .replace(
      /Hundreds of patients from the Shekhawati region have been successfully treated\./gi,
      "Patients from the Shekhawati region consult Dr. Dheeraj Dubay for joint replacement care in Jaipur.",
    )
    .replace(
      /Over 60,000 patients from Jaipur and across North India have been successfully treated\./gi,
      "Patients from Jaipur and across North India consult Dr. Dheeraj Dubay for joint replacement care.",
    );
}

export function normalizeCityClaims<T>(value: T): T {
  if (typeof value === "string") {
    return normalizeCityClaimText(value) as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => normalizeCityClaims(item)) as T;
  }

  if (value && typeof value === "object") {
    const prototype = Object.getPrototypeOf(value);
    if (prototype === Object.prototype || prototype === null) {
      return Object.fromEntries(
        Object.entries(value as Record<string, unknown>).map(([key, item]) => [
          key,
          normalizeCityClaims(item),
        ]),
      ) as T;
    }
  }

  return value;
}
