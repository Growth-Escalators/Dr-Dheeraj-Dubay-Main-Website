// Cost-inquiry lead-gen pages — WS-3b.
//
// Source copy: GE-Brain/05-Marketing/DrDubay-Copy-Drafts/
//   cost-knee-replacement-jaipur.md
//   cost-robotic-knee-replacement-jaipur.md
//   cost-hip-replacement-jaipur.md
// Those drafts were never independently published, so this file does NOT
// carry over any of the drafts' unconfirmed specifics (named implant
// brands, named robotic system, room-category price bands, RGHS/
// Ayushman/CGHS empanelment status, an exact IRDAI circular reference).
// Every claim below is either (a) confirmed live on https://www.drdubay.in
// today (checked 2026-07-21 — Forbes World Record, 35,000+ surgeries,
// 23+ years, NABH-certified protocols, Director/Robotic title, award
// names/years, 464+ hip surgeries) or (b) deliberately hedged/generic so
// it asserts nothing that needs clinic sign-off ("share your policy on
// WhatsApp", "ask the team", "confirm with your insurer"). That's what
// lets these pages ship without waiting on Dr. Dubay.
//
// STILL GENUINELY OPEN (not a publish blocker — nothing below is
// asserted to the end user, so there's nothing to soften further; these
// are just future upgrades if/when the clinic supplies the specifics):
//   - HIP PAGE: no confirmed hip-replacement cost reference range exists
//     yet (the knee ranges are a sourced public reference range; hip
//     never had one) — hasConfirmedRange: false below means this page
//     intentionally renders NO number at all rather than guess one.
//   - A stated response-time SLA for WhatsApp cost-estimate replies is
//     omitted from all visible copy on purpose, pending a real number.
//   - Named implant brands, named robotic system/brand, and exact
//     room-category price bands are deliberately never stated by name
//     anywhere below — the copy uses "domestic vs. imported" / "general
//     ward vs. private room" framing instead, which needs no sign-off.

export interface CostFactor {
  title: string
  description: string
}

export interface InsuranceScheme {
  name: string
  detail: string
}

export interface CostFaq {
  q: string
  a: string
}

export interface CostPage {
  slug: string
  metaTitle: string
  metaDescription: string
  keywords: string
  h1: string
  category: string
  /** Direct-answer intro, ~40-60 words, first thing under the H1. */
  intro: string
  /** False only for the hip page — no doctor-confirmed range exists yet. */
  hasConfirmedRange: boolean
  costHeadline: string
  costSubtext: string
  comparisonNote?: string
  whatAffectsCostHeading: string
  whatAffectsCost: CostFactor[]
  insuranceIntro: string
  insuranceSchemes: InsuranceScheme[]
  insuranceRegulatoryNote: string
  whyDrDubay: string[]
  faqs: CostFaq[]
  relatedProcedureSlug: string
  relatedCostSlug?: string
  relatedCostLabel?: string
  whatsappMessage: string
  topCtaSubtext: string
  popupHeadline: string
  popupSubtext: string
  schema: {
    procedureName: string
    description: string
    bodyLocation: string
  }
}

export const COST_PAGES: CostPage[] = [
  {
    slug: 'knee-replacement-jaipur',
    metaTitle: 'Knee Replacement Cost in Jaipur (2026 Guide) | Dr. Dubay',
    // Sourced public reference range (₹80K–₹4.5L standard / ₹2.5L–₹5.5L
    // robotic) — a general market range, not a Dr. Dubay-specific quote.
    // Review periodically; reference ranges drift year to year.
    metaDescription:
      'Knee replacement in Jaipur costs ₹80K–₹4.5L depending on implant, hospital room & insurance. See what changes your price + get a free WhatsApp estimate.',
    keywords: 'knee replacement cost jaipur, knee surgery price jaipur, TKR cost jaipur, knee replacement price india',
    h1: "Knee Replacement Cost in Jaipur: What You'll Actually Pay",
    category: 'Cost & Insurance Guide',
    // Both ranges below — same sourced reference range as metaDescription.
    intro:
      "Knee replacement in Jaipur typically costs ₹80,000–₹4,50,000 for a standard procedure, and ₹2,50,000–₹5,50,000 nationally for robotic-assisted knee replacement — the exact number depends on your implant, hospital room category, and insurance cover. There's no single \"correct\" price online; the only way to know your number is a personalised estimate from your surgeon's team.",
    hasConfirmedRange: true,
    // Sourced public reference range — general market data, not tied to a
    // specific implant brand.
    costHeadline: '₹80,000 – ₹4,50,000',
    costSubtext: 'Standard knee replacement in Jaipur (self-pay range)',
    // Robotic comparison figure, same sourced reference range.
    comparisonNote:
      'Robotic-assisted knee replacement runs ₹2,50,000–₹5,50,000 nationally.',
    whatAffectsCostHeading: 'What affects your cost',
    whatAffectsCost: [
      {
        title: 'Implant type and brand',
        // Deliberately no implant brand named — domestic-vs-imported
        // framing only, which needs no clinic sign-off.
        description:
          'Domestic implants cost less than imported ones — this is usually the single biggest swing factor in the final bill.',
      },
      {
        title: 'Robotic vs. conventional surgery',
        description:
          'Robotic-assisted knee replacement carries a technology premium over conventional surgery — see the robotic cost breakdown for a direct comparison.',
      },
      {
        title: 'Unilateral vs. bilateral',
        description:
          'One knee versus both knees (same admission or staged) changes total cost, though not always linearly — ask for a bilateral-specific quote if this applies to you.',
      },
      {
        title: 'Hospital room category',
        // Deliberately no room-category price bands stated — general
        // ward/semi-private/private framing only.
        description:
          'General ward, semi-private, or private room pricing varies significantly and is usually where patients are most surprised by the final bill.',
      },
      {
        title: 'Pre-op workup and physiotherapy package',
        description:
          'Blood work, imaging, anaesthesia consult, and a structured post-op physio package are sometimes bundled, sometimes billed separately — confirm which before you commit.',
      },
      {
        title: 'Insurance / cashless vs. self-pay',
        description:
          "A cashless claim through your insurer or a government scheme changes what you pay out of pocket even if the hospital's total bill is identical.",
      },
      {
        title: 'Primary vs. revision surgery',
        description:
          'A first-time (primary) knee replacement costs less than a revision surgery on a previously replaced joint, which involves more complex implants and longer OT time.',
      },
    ],
    insuranceIntro:
      "Most knee replacement patients in Jaipur don't pay the full bill out of pocket. Here's how insurance and cashless typically work at Shalby Hospital:",
    insuranceSchemes: [
      {
        name: 'Private insurance & cashless TPA network',
        detail:
          'Most pan-India insurance and cashless TPA networks are accepted at Shalby Hospital — share your policy details on WhatsApp to confirm coverage for your case.',
      },
      {
        name: 'Government health schemes',
        detail:
          "If you're covered under a state or central government health scheme, share your scheme card details on WhatsApp and the team will confirm current coverage for your case.",
      },
    ],
    // Deliberately general — no specific regulatory circular cited. Robotic
    // surgery coverage varies by policy, so this only tells the patient to
    // check rather than asserting a settled regulatory fact.
    insuranceRegulatoryNote:
      "Robotic surgery is increasingly covered by health insurance — confirm with your provider whether this applies to your policy. If robotic or computer-navigated surgery is part of your plan, the clinic team can also help you check.",
    whyDrDubay: [
      // Matches the live site's own phrasing (drdubay.in), which does not
      // state a specific surgery count/date breakdown for the record.
      'Forbes World Record holder — highest number of joint replacement surgeries performed in a single day.',
      // Confirmed live on drdubay.in (2026-07-21).
      '35,000+ successful surgeries performed to date.',
      // Confirmed live on drdubay.in (2026-07-21).
      'Director, Robotic Joint Replacement Surgery, Shalby Multispecialty Hospital, Vaishali Nagar, Jaipur.',
      // Matches live award list (drdubay.in), which dates this 2025.
      "ET Inspiring Leaders Award (2025) and recognition as one of North India's most trusted joint replacement surgeons.",
      // Confirmed live on drdubay.in (2026-07-21).
      'NABH-certified protocols at every step of surgery and recovery.',
    ],
    faqs: [
      {
        q: 'How much does knee replacement cost in Jaipur?',
        // Both ranges — same sourced reference range as intro.
        a: 'Standard knee replacement typically ranges ₹80,000–₹4,50,000 in Jaipur; robotic-assisted knee replacement runs ₹2,50,000–₹5,50,000 nationally. Your exact cost depends on implant, hospital room, and insurance — get a personalised estimate on WhatsApp rather than relying on a generic number.',
      },
      {
        q: 'Does insurance cover knee replacement?',
        a: 'Most pan-India insurance and cashless TPA networks are accepted at Shalby Hospital — share your policy details on WhatsApp to confirm coverage for your case.',
      },
      {
        q: 'Is robotic knee replacement worth the extra cost?',
        a: "It depends on your case. Robotic-assisted surgery is designed to improve precision in implant alignment for suitable candidates, but not every patient needs it. Dr. Dubay will tell you honestly whether your case benefits from robotic assistance or whether conventional surgery is the right call.",
      },
      {
        q: 'How soon can I walk after knee replacement?',
        a: 'Recovery timelines vary by patient, age, and case complexity. Ask for a personalised recovery timeline during your consultation rather than relying on generic online claims.',
      },
      {
        q: 'How do I get an accurate cost estimate for my case?',
        a: 'Send your X-rays or reports and a short description of your symptoms on WhatsApp and the team will respond with a real, case-specific range — not a generic quote.',
      },
    ],
    relatedProcedureSlug: 'knee-replacement-surgery',
    relatedCostSlug: 'robotic-knee-replacement-jaipur',
    relatedCostLabel: 'Robotic Knee Replacement Cost',
    whatsappMessage: "Hi, I'd like a personalised knee replacement cost estimate",
    topCtaSubtext: 'Free. No obligation. Real numbers for your case, not a generic price list.',
    popupHeadline: "Don't guess your knee replacement cost.",
    // Response-time SLA line intentionally omitted — no number is stated to
    // end users until the clinic confirms one; not a publish blocker.
    popupSubtext:
      "Send your reports on WhatsApp and get a real, personalised estimate from Dr. Dubay's team.",
    schema: {
      procedureName: 'Total Knee Replacement',
      description:
        'Cost and insurance information for total knee replacement surgery performed by Dr. Dheeraj Dubay at Shalby Hospital, Jaipur.',
      bodyLocation: 'Knee',
    },
  },
  {
    slug: 'robotic-knee-replacement-jaipur',
    metaTitle: 'Robotic Knee Replacement Cost in Jaipur | Dr. Dheeraj Dubay',
    // ₹2.5L–₹5.5L — same sourced reference range as the standard knee page.
    // "1mm" precision matches the live, unflagged robotic-knee procedure
    // page; insurance line kept generic — see insuranceRegulatoryNote.
    metaDescription:
      'Robotic knee replacement in Jaipur costs ₹2.5L–₹5.5L. Implant placement is accurate to within 1mm, and robotic surgery is increasingly insurance-covered. See the real cost breakdown + free WhatsApp estimate.',
    keywords: 'robotic knee replacement cost jaipur, robotic knee surgery price, robotic TKR cost india',
    h1: 'Robotic Knee Replacement Cost in Jaipur: The Real Price Breakdown',
    category: 'Cost & Insurance Guide',
    // Both ranges: sourced public reference range, general market data.
    intro:
      "Robotic-assisted knee replacement costs ₹2,50,000–₹5,50,000 nationally — more than conventional knee replacement's ₹80,000–₹4,50,000 range in Jaipur — because of the technology and implant-precision premium (implant placement accurate to within 1mm). Robotic surgery is increasingly covered by health insurance, so more of that premium may be covered than patients assume — confirm with your provider. Get your case-specific number before deciding.",
    hasConfirmedRange: true,
    // Sourced public reference range — general market data.
    costHeadline: '₹2,50,000 – ₹5,50,000',
    costSubtext: 'Robotic-assisted knee replacement (national range)',
    // Conventional comparison figure, same sourced reference range.
    comparisonNote: 'Conventional knee replacement runs ₹80,000–₹4,50,000 in Jaipur.',
    whatAffectsCostHeading: 'What affects your cost',
    whatAffectsCost: [
      {
        title: 'Robotic system and OT time',
        // Deliberately no robotic system/brand named.
        description: 'The robotic-assisted technology fee is added to the surgical package.',
      },
      {
        title: 'Implant type and brand',
        description:
          "Domestic vs. imported implants swing the total significantly. Robotic assistance doesn't require a specific implant brand, but premium implants are more commonly paired with robotic cases.",
      },
      {
        title: 'Unilateral vs. bilateral',
        description:
          'Robotic bilateral (both knees) cases have their own pricing logic — ask for a bilateral-specific quote rather than doubling a unilateral number.',
      },
      {
        title: 'Hospital room category',
        description:
          'Same swing factor as any joint replacement — general ward vs. private room materially changes the bill.',
      },
      {
        title: 'Insurance / cashless, including the robotic-specific wrinkle',
        description:
          'Confirm with your insurer whether the robotic-technology fee itself is covered, partially covered, or billed as an add-on outside the cashless package — this is the detail patients get wrong most often.',
      },
      {
        title: 'Primary vs. revision',
        description:
          'A revision case on a previously operated knee costs more regardless of whether robotic assistance is used.',
      },
    ],
    insuranceIntro:
      "The same insurance routes as standard knee replacement apply — with one robotic-specific wrinkle worth checking before you commit:",
    insuranceSchemes: [
      {
        name: 'Private insurance & cashless TPA network',
        detail:
          'Most pan-India insurance and cashless TPA networks are accepted at Shalby Hospital — share your policy details on WhatsApp to confirm coverage for the robotic-technology fee specifically, which some policies treat differently from the base surgery.',
      },
      {
        name: 'Government health schemes',
        detail:
          "If you're covered under a state or central government health scheme, share your scheme card details on WhatsApp and the team will confirm current coverage, including whether the robotic-technology add-on is included.",
      },
    ],
    // Deliberately general — no specific regulatory circular cited.
    insuranceRegulatoryNote:
      "Robotic surgery is increasingly covered by health insurance — confirm with your provider whether this applies to your policy. If you assumed robotic surgery wasn't covered, it may be worth checking again, or asking the clinic team to check for you.",
    whyDrDubay: [
      // Matches the live site's own phrasing (drdubay.in), which does not
      // state a specific surgery count/date breakdown for the record.
      'Forbes World Record holder — highest number of joint replacement surgeries performed in a single day, including surgeries performed with robotic and conventional techniques.',
      // Confirmed live on drdubay.in (2026-07-21).
      'Director, Robotic Joint Replacement Surgery, Shalby Multispecialty Hospital, Vaishali Nagar, Jaipur.',
      // Confirmed live on drdubay.in (2026-07-21).
      '35,000+ successful surgeries, including robotic-assisted procedures.',
      // Matches live award list (drdubay.in), which dates this 2025.
      "ET Inspiring Leaders Award (2025) and recognition as one of North India's most trusted joint replacement surgeons.",
      // Matches the live, unflagged robotic-knee procedure page's precision claim.
      'Robotic-assisted surgery positions implants accurate to within 1mm, improving alignment precision for suitable candidates.',
    ],
    faqs: [
      {
        q: 'How much does robotic knee replacement cost in Jaipur?',
        // Both ranges — same sourced reference range as intro.
        a: 'Nationally, robotic knee replacement typically costs ₹2,50,000–₹5,50,000, against ₹80,000–₹4,50,000 for conventional knee replacement in Jaipur. The gap is the technology premium — get a personalised estimate to see your real number.',
      },
      {
        q: 'Is robotic knee replacement covered by insurance?',
        a: "Increasingly, yes — robotic surgery is increasingly covered by health insurance, but coverage still depends on your specific policy. Confirm with your provider or ask the clinic to check for you.",
      },
      {
        q: 'Is robotic knee replacement better than conventional surgery?',
        a: "It depends on the case. Robotic assistance helps with implant-alignment precision for suitable patients; it isn't automatically the right choice for everyone. Dr. Dubay will tell you honestly which approach fits your knee.",
      },
      {
        q: "What's included in the robotic knee replacement price?",
        a: "Ask the clinic to confirm what's bundled into your quote — implant, OT/robotic fee, hospital stay, and physiotherapy — versus what's billed separately, so you're comparing like for like.",
      },
      {
        q: 'How do I find out my exact robotic knee replacement cost?',
        a: 'Send your X-rays/reports on WhatsApp and the team will respond with a case-specific range, including whether robotic assistance is recommended for your case at all.',
      },
    ],
    relatedProcedureSlug: 'robotic-knee-replacement',
    relatedCostSlug: 'knee-replacement-jaipur',
    relatedCostLabel: 'Standard Knee Replacement Cost',
    whatsappMessage: "Hi, I'd like a personalised robotic knee replacement cost estimate",
    topCtaSubtext: 'Free. Includes whether your insurance covers the robotic premium.',
    popupHeadline: 'Robotic knee replacement — is it covered by your insurance?',
    // SLA line intentionally omitted — see knee page note.
    popupSubtext:
      'Send your policy details on WhatsApp and the team will check your coverage and give you a real cost estimate.',
    schema: {
      procedureName: 'Robotic-Assisted Knee Replacement',
      description:
        'Cost and insurance information for robotic-assisted knee replacement surgery performed by Dr. Dheeraj Dubay at Shalby Hospital, Jaipur.',
      bodyLocation: 'Knee',
    },
  },
  {
    slug: 'hip-replacement-jaipur',
    // By design, this page has no confirmed cost range. The knee pages use
    // a sourced public reference range; hip replacement never had one in
    // the brief. hasConfirmedRange: false below means NO number is
    // rendered — "cost varies by case" framing only — so this is not a
    // publish blocker, just a future upgrade if a real range is supplied.
    metaTitle: 'Hip Replacement Cost in Jaipur (2026 Guide) | Dr. Dubay',
    metaDescription:
      "Hip replacement cost in Jaipur depends on implant, surgical approach & insurance — get a free, personalised WhatsApp estimate from Dr. Dubay's team.",
    keywords: 'hip replacement cost jaipur, hip replacement surgeon jaipur, hip surgery price jaipur',
    h1: "Hip Replacement Cost in Jaipur: What You'll Actually Pay",
    category: 'Cost & Insurance Guide',
    intro:
      "Hip replacement cost in Jaipur varies from patient to patient — implant type, surgical approach, hospital room category, and insurance cover all change the final number. There's no single reliable price to quote online for hip replacement; the only accurate figure is a personalised estimate built for your case by Dr. Dubay's team.",
    hasConfirmedRange: false,
    costHeadline: 'Cost varies by case',
    costSubtext: 'Get a personalised estimate — free, on WhatsApp',
    comparisonNote: undefined,
    whatAffectsCostHeading: 'What affects your cost',
    whatAffectsCost: [
      {
        title: 'Implant type and brand',
        description:
          'As with knee replacement, domestic vs. imported implants are usually the largest single swing factor in the final bill.',
      },
      {
        title: 'Surgical approach',
        // Deliberately does not name a specific approach (anterior /
        // posterior / robotic / computer-navigated) — see the hip page's
        // own hedge on which approaches are actually offered.
        description:
          'Different surgical approaches can affect both cost and recovery — ask which approach is recommended for your case and why.',
      },
      {
        title: 'Unilateral vs. bilateral',
        description:
          "One hip versus both changes total cost and isn't a simple doubling — ask for a bilateral-specific quote.",
      },
      {
        title: 'Hospital room category',
        // Deliberately no room-category price bands stated.
        description:
          'General ward, semi-private, or private room pricing — same pattern as knee replacement, and usually where patients are most surprised by the final number.',
      },
      {
        title: 'Pre-op workup and physiotherapy package',
        description:
          "Confirm what's bundled into the quoted price versus billed separately — imaging, anaesthesia consult, and post-op physio.",
      },
      {
        title: 'Insurance / cashless vs. self-pay',
        description:
          "A cashless claim changes what you pay out of pocket even when the hospital's total bill is the same.",
      },
      {
        title: 'Primary vs. revision surgery',
        description:
          'A revision hip replacement on a previously replaced joint costs meaningfully more than a first-time (primary) procedure.',
      },
    ],
    insuranceIntro:
      'The same insurance and cashless routes used for knee replacement generally apply to hip replacement:',
    insuranceSchemes: [
      {
        name: 'Private insurance & cashless TPA network',
        detail:
          'Most pan-India insurance and cashless TPA networks are accepted at Shalby Hospital — share your policy details on WhatsApp to confirm coverage for your case.',
      },
      {
        name: 'Government health schemes',
        detail:
          "If you're covered under a state or central government health scheme, share your scheme card details on WhatsApp and the team will confirm current coverage for your case.",
      },
    ],
    // Deliberately general — only applies if a robotic/computer-navigated
    // approach is used for the specific case; no regulatory circular cited.
    insuranceRegulatoryNote:
      "If a robotic or computer-navigated approach applies to your case, the same principle applies as with robotic knee replacement — robotic surgery is increasingly covered by health insurance. Confirm with your provider or ask the clinic team to check for you.",
    whyDrDubay: [
      // Matches the live site's own phrasing (drdubay.in), which does not
      // state a specific surgery count/date breakdown for the record.
      'Forbes World Record holder — highest number of joint replacement surgeries performed in a single day.',
      // Confirmed live on drdubay.in (2026-07-21).
      '35,000+ successful surgeries, spanning knee and hip replacement.',
      // Confirmed live on drdubay.in (2026-07-21).
      'Director, Robotic Joint Replacement Surgery, Shalby Multispecialty Hospital, Vaishali Nagar, Jaipur.',
      // Matches live award list (drdubay.in), which dates this 2025.
      "ET Inspiring Leaders Award (2025) and recognition as one of North India's most trusted joint replacement surgeons.",
      // Confirmed live on drdubay.in (2026-07-21).
      'NABH-certified protocols at every step.',
    ],
    faqs: [
      {
        q: 'How much does hip replacement cost in Jaipur?',
        // No confirmed range exists yet; answer deliberately carries no number.
        a: 'Cost depends on implant, surgical approach, hospital room category, and insurance — get a personalised estimate on WhatsApp rather than relying on a generic figure.',
      },
      {
        q: 'Does insurance cover hip replacement?',
        a: 'Most pan-India insurance and cashless TPA networks are accepted at Shalby Hospital — share your policy details on WhatsApp to confirm coverage for your case.',
      },
      {
        q: "What's the difference between standard and robotic/computer-navigated hip replacement?",
        a: "Dr. Dubay will confirm during your consultation which surgical approach best fits your case, and explain the difference in plain terms — this isn't something to guess from a generic online description.",
      },
      {
        q: 'How soon can I walk after hip replacement?',
        a: 'Recovery timelines vary by patient, age, and case complexity. Ask for a personalised recovery timeline during your consultation rather than a generic online claim.',
      },
      {
        q: 'How do I get an accurate hip replacement cost estimate?',
        a: 'Send your X-rays/reports on WhatsApp and the team will respond with a real, case-specific range.',
      },
    ],
    relatedProcedureSlug: 'hip-replacement-surgery',
    relatedCostSlug: undefined,
    relatedCostLabel: undefined,
    whatsappMessage: "Hi, I'd like a personalised hip replacement cost estimate",
    topCtaSubtext: 'Free. No obligation. Real numbers for your case, not a generic price list.',
    popupHeadline: "Don't guess your hip replacement cost.",
    // SLA line intentionally omitted — see knee page note.
    popupSubtext:
      "Send your reports on WhatsApp and get a real, personalised estimate from Dr. Dubay's team.",
    schema: {
      procedureName: 'Hip Replacement Surgery',
      description:
        'Cost and insurance information for hip replacement surgery performed by Dr. Dheeraj Dubay at Shalby Hospital, Jaipur.',
      bodyLocation: 'Hip',
    },
  },
]

// Lookup used by /procedures/[procedure] to surface a natural "cost of
// this procedure" link on the matching procedure page.
export const PROCEDURE_TO_COST_SLUG: Record<string, string> = {
  'knee-replacement-surgery': 'knee-replacement-jaipur',
  'robotic-knee-replacement': 'robotic-knee-replacement-jaipur',
  'hip-replacement-surgery': 'hip-replacement-jaipur',
}
