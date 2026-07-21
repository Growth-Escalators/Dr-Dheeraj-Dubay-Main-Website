// Cost-inquiry lead-gen pages — WS-3b.
//
// Source copy: GE-Brain/05-Marketing/DrDubay-Copy-Drafts/
//   cost-knee-replacement-jaipur.md
//   cost-robotic-knee-replacement-jaipur.md
//   cost-hip-replacement-jaipur.md
// Those drafts are NOT published; every [VERIFY]/[STAT] item below is
// carried over as a code comment next to the value it applies to so it
// stays traceable for Dr. Dubay / clinic sign-off. Nothing marked
// [VERIFY] is asserted to the end user as settled fact — copy is
// deliberately hedged ("ask the team", "confirm with your insurer")
// until sign-off replaces the hedge with a stated fact.
//
// MASTER SIGN-OFF CHECKLIST (mirrors the three drafts' own checklists —
// use this as the single list to clear before removing any hedge):
//   - Confirm current verified surgery count (35,000+ seen vs. 18,000+
//     elsewhere in backlinks audit — pick one number, state it everywhere).
//   - Confirm years of experience (seen as both 15 and 23 across listings).
//   - Confirm RGHS / Ayushman / CGHS empanelment status at Shalby Vaishali
//     Nagar — name only what's actually live.
//   - Confirm/word the IRDAI robotic-insurance note precisely (circular
//     reference + date) before stating it as fact instead of "ask your
//     insurer."
//   - Confirm response-time SLA for WhatsApp cost-estimate replies before
//     advertising a number (currently omitted from all visible copy).
//   - Confirm current Google/JustDial review count — pulled dynamically
//     from lib/clinic-info.ts AGGREGATE_RATING, which already carries its
//     own placeholder-count TODO.
//   - HIP PAGE ONLY, PRIORITY: supply a real hip-replacement cost
//     reference range — the knee ranges were sourced from public
//     reference data, the hip range was not, so this page ships with NO
//     hard number at all (see hasConfirmedRange: false below).
//   - HIP PAGE ONLY: confirm which surgical approaches (anterior /
//     posterior / robotic / computer-navigated) are actually offered
//     before naming any of them in copy.
//   - ROBOTIC PAGE ONLY: confirm the robotic system/brand used at Shalby
//     Vaishali Nagar, if it should be named.
//   - ROBOTIC PAGE ONLY: soften/confirm the "greater precision" outcome
//     claim in Dr. Dubay's own words.

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
    // [STAT]: ₹80K–₹4.5L standard / ₹2.5L–₹5.5L robotic — from the approved
    // draft's sourced public reference range. Re-confirm before next
    // publish cycle; ranges drift year to year.
    metaDescription:
      'Knee replacement in Jaipur costs ₹80K–₹4.5L depending on implant, hospital room & insurance. See what changes your price + get a free WhatsApp estimate.',
    keywords: 'knee replacement cost jaipur, knee surgery price jaipur, TKR cost jaipur, knee replacement price india',
    h1: "Knee Replacement Cost in Jaipur: What You'll Actually Pay",
    category: 'Cost & Insurance Guide',
    // [STAT]: both ranges below — same source range as metaDescription.
    intro:
      "Knee replacement in Jaipur typically costs ₹80,000–₹4,50,000 for a standard procedure, and ₹2,50,000–₹5,50,000 nationally for robotic-assisted knee replacement — the exact number depends on your implant, hospital room category, and insurance cover. There's no single \"correct\" price online; the only way to know your number is a personalised estimate from your surgeon's team.",
    hasConfirmedRange: true,
    // [STAT]: sourced public reference range from the approved draft.
    costHeadline: '₹80,000 – ₹4,50,000',
    costSubtext: 'Standard knee replacement in Jaipur (self-pay range)',
    // [STAT]: robotic comparison figure, same source range.
    comparisonNote:
      'Robotic-assisted knee replacement runs ₹2,50,000–₹5,50,000 nationally.',
    whatAffectsCostHeading: 'What affects your cost',
    whatAffectsCost: [
      {
        title: 'Implant type and brand',
        // [VERIFY]: which implant brands (domestic vs. imported) Dr. Dubay's practice uses.
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
        // [VERIFY]: actual room-category price bands at Shalby Multispecialty Hospital, Vaishali Nagar.
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
      "Most knee replacement patients in Jaipur don't pay the full bill out of pocket. Dr. Dubay's practice at Shalby Multispecialty Hospital, Vaishali Nagar works with the following routes:",
    insuranceSchemes: [
      {
        name: 'RGHS (Rajasthan Government Health Scheme)',
        // [VERIFY]: cashless empanelment status + any knee-specific package-rate caps.
        detail:
          'For Rajasthan state government employees and pensioners. Ask the team to confirm current cashless empanelment and any package-rate caps for knee replacement.',
      },
      {
        name: 'Ayushman Bharat (PM-JAY)',
        // [VERIFY]: empanelment + which knee-replacement package codes are covered.
        detail:
          "For eligible beneficiary families under India's national health protection scheme. Confirm which package codes apply to knee replacement before your visit.",
      },
      {
        name: 'CGHS (Central Government Health Scheme)',
        // [VERIFY]: empanelment status.
        detail:
          'For central government employees and pensioners. Confirm current empanelment status with the clinic team.',
      },
      {
        name: 'Private insurance (cashless network)',
        // [VERIFY]: current TPA / insurer list to publish by name.
        detail:
          'Most major insurers offer cashless claims for joint replacement where the hospital is in-network. Send your policy details on WhatsApp and the team will check your specific eligibility.',
      },
    ],
    // [VERIFY]: IRDAI's 2024 circular on robotic/minimally-invasive surgery
    // coverage — exact wording/date needs confirming with the team before
    // this is stated as settled fact rather than "ask your insurer."
    insuranceRegulatoryNote:
      "Insurance regulation has moved toward requiring insurers to evaluate claims on medical necessity rather than rejecting them purely because a procedure is minimally invasive or technically classified as \"day care.\" If robotic or computer-navigated surgery is part of your plan, ask your insurer or the clinic team whether this affects your specific policy.",
    whyDrDubay: [
      // [VERIFY]: Forbes World Record wording/date — reconcile with other listings.
      'Forbes World Record holder — 34 joint replacement surgeries (33 knee + 1 hip) in a single day, 2024.',
      // [VERIFY]: surgery count — 35,000+ vs. 18,000+ inconsistency flagged in backlinks audit; pick one number.
      '35,000+ successful surgeries performed to date.',
      // [VERIFY]: title/role wording.
      'Director, Robotic Joint Replacement Surgery, Shalby Multispecialty Hospital, Vaishali Nagar, Jaipur.',
      // [VERIFY]: award name/date.
      "ET Inspiring Leaders Award and recognition as one of North India's most trusted joint replacement surgeons (2024).",
      // [VERIFY]: NABH certification status/wording.
      'NABH-certified protocols at every step of surgery and recovery.',
    ],
    faqs: [
      {
        q: 'How much does knee replacement cost in Jaipur?',
        // [STAT]: both ranges, same source as intro.
        a: 'Standard knee replacement typically ranges ₹80,000–₹4,50,000 in Jaipur; robotic-assisted knee replacement runs ₹2,50,000–₹5,50,000 nationally. Your exact cost depends on implant, hospital room, and insurance — get a personalised estimate on WhatsApp rather than relying on a generic number.',
      },
      {
        q: 'Does insurance or RGHS/Ayushman/CGHS cover knee replacement?',
        // [VERIFY]: empanelment status — see insuranceSchemes above.
        a: 'In many cases, yes — cashless claims are common for knee replacement through private insurance and government schemes where the hospital is empanelled. Confirm your specific policy or scheme coverage with the clinic before your consultation.',
      },
      {
        q: 'Is robotic knee replacement worth the extra cost?',
        // [VERIFY]: medical claim, needs Dr. Dubay's own words before publish.
        a: "It depends on your case. Robotic-assisted surgery is designed to improve precision in implant alignment for suitable candidates, but not every patient needs it. Dr. Dubay will tell you honestly whether your case benefits from robotic assistance or whether conventional surgery is the right call.",
      },
      {
        q: 'How soon can I walk after knee replacement?',
        // [VERIFY]: medical claim — recovery timeline framing kept generic on purpose.
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
    // SLA line intentionally omitted — draft's "usually within [VERIFY: stated
    // response time]" is not stated to end users until the clinic confirms one.
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
    // [STAT]: ₹2.5L–₹5.5L — same sourced range as the standard knee page.
    // [VERIFY]: "updated IRDAI guidance" kept generic — see insuranceRegulatoryNote.
    metaDescription:
      'Robotic knee replacement in Jaipur costs ₹2.5L–₹5.5L, often insurance-covered under updated IRDAI guidance. See the real cost breakdown + free WhatsApp estimate.',
    keywords: 'robotic knee replacement cost jaipur, robotic knee surgery price, robotic TKR cost india',
    h1: 'Robotic Knee Replacement Cost in Jaipur: The Real Price Breakdown',
    category: 'Cost & Insurance Guide',
    // [STAT]: both ranges, sourced public reference range from the approved draft.
    // [VERIFY]: IRDAI claim kept generic ("insurers are increasingly unable to
    // reject...") pending exact circular reference/date.
    intro:
      "Robotic-assisted knee replacement costs ₹2,50,000–₹5,50,000 nationally — more than conventional knee replacement's ₹80,000–₹4,50,000 range in Jaipur — because of the technology and implant-precision premium. Insurers are increasingly unable to reject robotic-surgery claims purely for being minimally invasive, so more of that premium may be covered than patients assume. Get your case-specific number before deciding.",
    hasConfirmedRange: true,
    // [STAT]: sourced public reference range from the approved draft.
    costHeadline: '₹2,50,000 – ₹5,50,000',
    costSubtext: 'Robotic-assisted knee replacement (national range)',
    // [STAT]: conventional comparison figure, same source range.
    comparisonNote: 'Conventional knee replacement runs ₹80,000–₹4,50,000 in Jaipur.',
    whatAffectsCostHeading: 'What affects your cost',
    whatAffectsCost: [
      {
        title: 'Robotic system and OT time',
        // [VERIFY]: confirm which robotic system is used at Shalby Vaishali Nagar; name it if it's a genuine differentiator.
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
        title: 'Insurance / cashless, including the robotic-specific rule',
        // [VERIFY]: how RGHS/Ayushman/CGHS/private insurers currently treat the robotic-technology fee specifically.
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
        name: 'RGHS (Rajasthan Government Health Scheme)',
        // [VERIFY]: whether RGHS covers robotic-assisted procedures at package rate, or only the conventional-surgery rate with the technology fee billed separately.
        detail:
          'Confirm whether robotic-assisted procedures are covered under RGHS package rates or only the conventional-surgery rate.',
      },
      {
        name: 'Ayushman Bharat (PM-JAY)',
        // [VERIFY]: PM-JAY package codes historically cover the surgery, not always the robotic-technology add-on — confirm current status.
        detail:
          'Package coverage for the robotic-technology add-on specifically needs confirming — the base surgery is more commonly covered than the technology fee.',
      },
      {
        name: 'CGHS (Central Government Health Scheme)',
        // [VERIFY]: empanelment status.
        detail: 'Confirm current empanelment status with the clinic team.',
      },
      {
        name: 'Private insurance (cashless network)',
        // [VERIFY]: which insurers currently treat robotic knee replacement as fully cashless vs. reimbursement-only.
        detail:
          'Some insurers treat robotic knee replacement as fully cashless; others treat the technology fee as reimbursement-only. Send your policy details on WhatsApp and the team will check.',
      },
    ],
    // [VERIFY]: IRDAI's 2024 circular — the single most useful thing to get
    // exactly right on this page. Kept generic pending the precise
    // reference/date from the team.
    insuranceRegulatoryNote:
      'Insurers can no longer reject a claim purely because a procedure is robotic-assisted or technically "day care" — medical necessity is what matters. If you assumed robotic surgery wasn\'t covered, it may be worth checking again with your insurer or asking the clinic team to check for you.',
    whyDrDubay: [
      // [VERIFY]: Forbes World Record wording/date.
      'Forbes World Record holder — 34 joint replacement surgeries (33 knee + 1 hip) in a single day, 2024, performed with robotic and conventional techniques.',
      // [VERIFY]: title/role wording.
      'Director, Robotic Joint Replacement Surgery, Shalby Multispecialty Hospital, Vaishali Nagar, Jaipur.',
      // [VERIFY]: surgery count — 35,000+ vs. 18,000+ inconsistency flagged in backlinks audit.
      '35,000+ successful surgeries, including robotic-assisted procedures.',
      // [VERIFY]: award name/date.
      "ET Inspiring Leaders Award and recognition as one of North India's most trusted joint replacement surgeons (2024).",
      // [VERIFY — medical claim, needs doctor's own words before publish.
      'Robotic-assisted surgery is designed to improve precision in implant alignment for suitable candidates.',
    ],
    faqs: [
      {
        q: 'How much does robotic knee replacement cost in Jaipur?',
        // [STAT]: both ranges, same source as intro.
        a: 'Nationally, robotic knee replacement typically costs ₹2,50,000–₹5,50,000, against ₹80,000–₹4,50,000 for conventional knee replacement in Jaipur. The gap is the technology premium — get a personalised estimate to see your real number.',
      },
      {
        q: 'Is robotic knee replacement covered by insurance?',
        // [VERIFY]: IRDAI circular wording — kept generic.
        a: "Increasingly, yes. Insurers can't reject a robotic-surgery claim purely because it's minimally invasive — but coverage still depends on your specific policy. Confirm with your insurer or ask the clinic to check for you.",
      },
      {
        q: 'Is robotic knee replacement better than conventional surgery?',
        // [VERIFY]: medical claim, needs doctor's own words.
        a: "It depends on the case. Robotic assistance helps with implant-alignment precision for suitable patients; it isn't automatically the right choice for everyone. Dr. Dubay will tell you honestly which approach fits your knee.",
      },
      {
        q: "What's included in the robotic knee replacement price?",
        // [VERIFY]: confirm what's bundled (implant, OT/robotic fee, hospital stay, physio) vs. billed separately.
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
    // [VERIFY — PRIORITY]: this page has NO confirmed cost range. The knee
    // pages used a sourced public reference range; hip replacement did not
    // have one in the brief. Do not add a number here until the clinic
    // supplies a real reference range — see hasConfirmedRange below.
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
        // [VERIFY]: confirm which approaches (anterior / posterior / robotic / computer-navigated) are actually offered before naming any by name.
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
        // [VERIFY]: actual room-category price bands at Shalby Multispecialty Hospital, Vaishali Nagar.
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
        name: 'RGHS (Rajasthan Government Health Scheme)',
        // [VERIFY]: cashless empanelment status + any hip-specific package-rate caps.
        detail:
          'For Rajasthan state government employees and pensioners. Confirm current cashless empanelment and any package-rate caps for hip replacement.',
      },
      {
        name: 'Ayushman Bharat (PM-JAY)',
        // [VERIFY]: empanelment + which hip-replacement package codes are covered.
        detail:
          "For eligible beneficiary families. Confirm which package codes apply to hip replacement before your visit.",
      },
      {
        name: 'CGHS (Central Government Health Scheme)',
        // [VERIFY]: empanelment status.
        detail: 'Confirm current empanelment status with the clinic team.',
      },
      {
        name: 'Private insurance (cashless network)',
        // [VERIFY]: which insurers/TPAs to name.
        detail:
          'Most major insurers offer cashless claims for joint replacement where the hospital is in-network. Send your policy details on WhatsApp and the team will check.',
      },
    ],
    // [VERIFY]: only applicable if a robotic/computer-navigated hip approach
    // is confirmed as offered — see whatAffectsCost "Surgical approach" note.
    insuranceRegulatoryNote:
      "If a robotic or computer-navigated approach applies to your case, the same principle applies as with robotic knee replacement — insurers can't reject a claim purely because a procedure is minimally invasive. Confirm with your insurer or ask the clinic team to check for you.",
    whyDrDubay: [
      // [VERIFY]: Forbes World Record wording/date — worth stating explicitly that the record includes a hip case.
      'Forbes World Record holder — 34 joint replacement surgeries (33 knee + 1 hip) in a single day, 2024.',
      // [VERIFY]: surgery count — 35,000+ vs. 18,000+ inconsistency flagged in backlinks audit.
      '35,000+ successful surgeries, spanning knee and hip replacement.',
      // [VERIFY]: title/role wording.
      'Director, Robotic Joint Replacement Surgery, Shalby Multispecialty Hospital, Vaishali Nagar, Jaipur.',
      // [VERIFY]: award name/date.
      "ET Inspiring Leaders Award and recognition as one of North India's most trusted joint replacement surgeons (2024).",
      // [VERIFY]: NABH certification status/wording.
      'NABH-certified protocols at every step.',
    ],
    faqs: [
      {
        q: 'How much does hip replacement cost in Jaipur?',
        // [VERIFY — PRIORITY]: no confirmed range exists yet; answer deliberately carries no number.
        a: 'Cost depends on implant, surgical approach, hospital room category, and insurance — get a personalised estimate on WhatsApp rather than relying on a generic figure.',
      },
      {
        q: 'Does insurance or RGHS/Ayushman/CGHS cover hip replacement?',
        // [VERIFY]: empanelment status — see insuranceSchemes above.
        a: 'In many cases, yes — cashless claims are common where the clinic is empanelled. Confirm your specific policy or scheme coverage with the clinic before your consultation.',
      },
      {
        q: "What's the difference between standard and robotic/computer-navigated hip replacement?",
        // [VERIFY]: confirm which approaches are actually offered before this answer names any of them.
        a: "Dr. Dubay will confirm during your consultation which surgical approach best fits your case, and explain the difference in plain terms — this isn't something to guess from a generic online description.",
      },
      {
        q: 'How soon can I walk after hip replacement?',
        // [VERIFY]: medical claim — recovery timeline framing kept generic on purpose.
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
