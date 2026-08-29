// Conservative YMYL copy guard for legacy procedure-page data.
// This does not change procedure names or clinical facts. It only softens
// absolute/promissory outcome wording that should not be presented without a
// page-specific, verifiable source and medical-review workflow.

export function normalizeMedicalClaimText(input: string): string {
  return input
    .replace(
      /Zero Pain, Zero Blood Loss, 48-Hour Discharge/gi,
      "Pain-Management & Blood-Conservation Protocol with Early Recovery",
    )
    .replace(
      /designed to eliminate post-operative pain and minimize blood loss/gi,
      "designed to reduce post-operative pain and blood loss",
    )
    .replace(
      /Most patients require zero pain medication after discharge\.?/gi,
      "Pain medication needs vary by patient and are guided by the treating team after discharge.",
    )
    .replace(
      /95%\+\s*success rates?/gi,
      "outcomes that depend on diagnosis, implant choice, rehabilitation and individual health",
    )
    .replace(
      /guarantees a smoother, faster recovery/gi,
      "supports a smoother, safer recovery",
    )
    .replace(
      /guarantees? the best possible outcome/gi,
      "supports a safe, functional recovery",
    )
    .replace(
      /best possible outcome/gi,
      "safe, functional recovery",
    );
}

export function normalizeMedicalClaims<T>(value: T): T {
  if (typeof value === "string") {
    return normalizeMedicalClaimText(value) as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => normalizeMedicalClaims(item)) as T;
  }

  if (value && typeof value === "object") {
    const prototype = Object.getPrototypeOf(value);
    if (prototype === Object.prototype || prototype === null) {
      return Object.fromEntries(
        Object.entries(value as Record<string, unknown>).map(([key, item]) => [
          key,
          normalizeMedicalClaims(item),
        ]),
      ) as T;
    }
  }

  return value;
}
