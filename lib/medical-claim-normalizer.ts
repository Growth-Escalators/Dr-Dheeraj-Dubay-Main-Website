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
    .replace(/Walk in 24 Hours/gi, "Early Mobilisation Protocol")
    .replace(
      /allows patients to walk within 24 hours/gi,
      "is designed to support supervised early mobilisation, which may begin within 24 hours for suitable patients",
    )
    .replace(
      /gets patients walking within 24 hours/gi,
      "supports supervised early mobilisation, which may begin within 24 hours for suitable patients",
    )
    .replace(
      /patients who walk on day one, go home in 3 days/gi,
      "suitable patients who may begin walking on day one and may be discharged within several days",
    )
    .replace(
      /walking within 24 hours of surgery/gi,
      "supervised early mobilisation that may begin within 24 hours for suitable patients",
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
      /dramatically accelerate recovery without compromising safety/gi,
      "support earlier recovery while following clinical safety criteria",
    )
    .replace(/outstanding safety record/gi, "established clinical experience")
    .replace(/excellent safety record/gi, "established clinical experience")
    .replace(
      /ensures pain is well controlled/gi,
      "uses multimodal pain-management strategies; individual pain experience varies",
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
    )
    .replace(
      /Decades of research confirm/gi,
      "Clinical research and practice suggest",
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
