// Conservative YMYL copy guard for legacy public medical content.
// It softens absolute/promissory outcome wording and stale authority facts
// that should not be presented without page-specific, verifiable support.

export function normalizeMedicalClaimText(input: string): string {
  return input
    .replace(
      /Forbes World Record holder and leading knee replacement surgeon/gi,
      "orthopedic and joint replacement surgeon",
    )
    .replace(
      /Forbes World Record holder\s*[—-]\s*34 joint replacement surgeries in a single day/gi,
      "Recorded 34 joint replacement surgeries in one day on 9 May 2024 — 33 knee and 1 hip",
    )
    .replace(
      /(?:over\s+)?40,000\+?\s+(?:successful\s+)?(?:knee|joint replacement|joint)\s+surger(?:y|ies)(?:\s+performed)?(?:\s+with excellent outcomes in RA patients)?/gi,
      "40,000+ total surgeries performed across his career",
    )
    .replace(
      /Zero Pain, Zero Blood Loss, 48-Hour Discharge/gi,
      "Pain-Management & Blood-Conservation Protocol with Early Recovery",
    )
    .replace(/Walk in 24 Hours/gi, "Early Mobilisation Protocol")
    .replace(
      /walk the same day as surgery/gi,
      "uses an early-mobilisation protocol where clinically appropriate",
    )
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
      /Most patients walk the same day or next day, resume light activities within 2[–-]4 weeks, and return to full function by 6[–-]8 weeks\. Traditional recovery is 3[–-]6 months\.?/gi,
      "Recovery varies by patient. Mobilisation may begin early when medically appropriate, while return to daily activities depends on strength, wound healing, medical conditions and rehabilitation progress.",
    )
    .replace(
      /Most patients walk with assistance within 24 hours\. They return home within 3[–-]5 days, drive in 4[–-]6 weeks, and resume full activities in 3[–-]6 months\. Minimally invasive techniques shorten recovery\.?/gi,
      "Recovery after hip replacement varies with age, health, surgical approach and rehabilitation. Mobilisation may begin early when medically appropriate, while discharge, driving and return to activities are decided individually.",
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
      /Modern anaesthesia and pain management protocols make the surgery comfortable\. Most patients report that post-surgery pain is actually less than the chronic pain they experienced before surgery\.?/gi,
      "Anaesthesia and multimodal pain-management strategies are used to manage post-operative discomfort. Pain experience and medication needs vary between patients.",
    )
    .replace(
      /the majority of knee pain cases are managed successfully without surgery/gi,
      "many causes of knee pain can be managed without surgery, depending on the diagnosis and severity",
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
    .replace(/for optimal outcomes/gi, "where clinically appropriate")
    .replace(/for superior accuracy/gi, "to assist alignment and surgical planning")
    .replace(/gold[- ]standard for/gi, "an established surgical option for")
    .replace(/gold[- ]standard/gi, "an established surgical option")
    .replace(/with accelerated recovery/gi, "with an early-recovery protocol")
    .replace(
      /for reduced blood loss and faster recovery/gi,
      "with blood-conservation and early-recovery techniques where clinically appropriate",
    )
    .replace(
      /Minimally invasive techniques shorten recovery/gi,
      "Recovery varies and depends on the individual patient and surgical plan",
    )
    .replace(
      /Early diagnosis prevents the condition from worsening/gi,
      "Prompt assessment can help identify conditions that may need treatment",
    )
    .replace(
      /identify the exact cause/gi,
      "identify the likely cause",
    )
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
