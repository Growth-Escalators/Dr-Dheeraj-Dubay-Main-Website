import type { CostPage } from './cost-pages'

const VERIFIED_WHY_POINTS = [
  '24 years of orthopedic experience.',
  '40,000+ total surgeries performed across his career.',
  'Director, Robotic Joint Replacement Surgery at Shalby Hospital Jaipur.',
  'Knee and hip replacement practice including robotic, navigation-assisted and revision approaches where clinically appropriate.',
]

const INSURANCE_SCHEMES = [
  {
    name: 'Private insurance / TPA',
    detail:
      'Cashless or reimbursement eligibility depends on the patient’s insurer, TPA, policy terms, waiting periods, exclusions and medical indication. Share the policy details with Shalby Hospital’s insurance desk for current verification.',
  },
  {
    name: 'Government health schemes',
    detail:
      'Scheme participation and eligibility can change. Share the current scheme card and patient details with the hospital team so they can verify whether the planned admission is covered.',
  },
]

const REGULATORY_NOTE =
  'Insurance coverage is policy- and procedure-specific. Do not assume that conventional, robotic or navigation-assisted surgery is covered until the insurer/TPA and hospital have confirmed the current terms for your admission.'

function common(page: CostPage): CostPage {
  return {
    ...page,
    hasConfirmedRange: false,
    costHeadline: 'Patient-specific hospital estimate required',
    costSubtext:
      'The final estimate depends on procedure, implant, case complexity, hospital services, room category and insurance eligibility.',
    comparisonNote: undefined,
    insuranceIntro:
      'Insurance and cashless coverage should be verified against the patient’s current policy and the hospital’s current network before treatment.',
    insuranceSchemes: INSURANCE_SCHEMES,
    insuranceRegulatoryNote: REGULATORY_NOTE,
    whyDrDubay: VERIFIED_WHY_POINTS,
    topCtaSubtext:
      'Share your reports and policy details so the team can guide you to the appropriate hospital estimate and insurance-verification process.',
    popupSubtext:
      'Share your reports and policy details on WhatsApp to start a patient-specific estimate and insurance verification.',
  }
}

function knee(page: CostPage): CostPage {
  return {
    ...common(page),
    metaTitle: 'Knee Replacement Cost in Jaipur | Insurance & Estimate Guide',
    metaDescription:
      'Knee replacement cost in Jaipur varies by implant, procedure, case complexity, room category and insurance. Learn the cost factors and request a patient-specific Shalby Hospital estimate.',
    h1: 'Knee Replacement Cost in Jaipur: Factors, Insurance & Estimate',
    intro:
      'There is no single knee replacement price that applies to every patient. The final hospital estimate depends on the type of knee replacement, implant, one or both knees, medical complexity, room category, investigations and insurance eligibility. Use this page to understand the cost factors, then request a patient-specific estimate from the hospital team.',
    faqs: [
      {
        q: 'How much does knee replacement cost in Jaipur?',
        a: 'The amount varies by implant, type of knee replacement, one or both knees, hospital services, room category and medical complexity. A current patient-specific hospital estimate is more reliable than a generic online range.',
      },
      {
        q: 'Does insurance cover knee replacement?',
        a: 'Many policies may cover medically indicated knee replacement, but eligibility depends on the insurer or TPA, waiting periods, exclusions and policy terms. Shalby Hospital’s insurance desk should verify the current coverage for your policy before admission.',
      },
      {
        q: 'Does robotic knee replacement cost more?',
        a: 'Robotic-assisted surgery can have different technology and hospital charges. Whether it is appropriate and what it costs should be confirmed for the planned procedure rather than assumed from an online package price.',
      },
      {
        q: 'How soon can I walk after knee replacement?',
        a: 'Mobilisation and discharge timelines vary with age, health, procedure type and rehabilitation progress. Your treating team will set the recovery plan after surgery.',
      },
      {
        q: 'How do I get an accurate estimate?',
        a: 'Share the available reports and insurance or scheme details with the hospital team. They can identify the planned procedure and provide the relevant current estimate and coverage-verification steps.',
      },
    ],
    popupHeadline: 'Get a patient-specific knee replacement estimate',
  }
}

function robotic(page: CostPage): CostPage {
  return {
    ...common(page),
    metaTitle: 'Robotic Knee Replacement Cost in Jaipur | Dr. Dheeraj Dubay',
    metaDescription:
      'Robotic knee replacement cost in Jaipur depends on the surgical plan, implant, hospital charges, room category and insurance. See the factors and request a current patient-specific estimate.',
    h1: 'Robotic Knee Replacement Cost in Jaipur: What Changes the Estimate',
    intro:
      'Robotic knee replacement does not have one universal package price. The estimate depends on the technology used for the planned case, implant, whether one or both knees are treated, medical complexity, hospital services, room category and insurance eligibility. Robotic assistance is a surgeon-controlled tool and should be chosen for clinical reasons, not from a generic price comparison alone.',
    faqs: [
      {
        q: 'How much does robotic knee replacement cost in Jaipur?',
        a: 'The estimate varies by surgical plan, implant, hospital charges, case complexity and room category. Ask for a current patient-specific estimate for the exact planned admission.',
      },
      {
        q: 'Is robotic knee replacement covered by insurance?',
        a: 'Coverage varies by insurer, TPA and policy terms. The hospital and insurer should confirm whether the planned robotic-assisted procedure is eligible before admission.',
      },
      {
        q: 'Is robotic knee replacement better for every patient?',
        a: 'No. Robotic assistance can support planning and intra-operative measurements, but the appropriate technique depends on diagnosis, anatomy, health and the surgeon’s plan.',
      },
      {
        q: 'What does the robotic system do?',
        a: 'It can provide patient-specific planning and objective measurements to assist the surgeon with alignment, balance and controlled bone preparation. The surgeon remains in control throughout the operation.',
      },
      {
        q: 'How do I compare conventional and robotic cost?',
        a: 'Ask for both options only after the surgeon has assessed whether each is clinically appropriate. Compare the full hospital estimate, implant, included services and insurance eligibility rather than a headline package number.',
      },
    ],
    popupHeadline: 'Request a robotic knee replacement estimate',
  }
}

function hip(page: CostPage): CostPage {
  return {
    ...common(page),
    metaTitle: 'Hip Replacement Cost in Jaipur | Insurance & Estimate Guide',
    metaDescription:
      'Hip replacement cost in Jaipur varies by implant, procedure, complexity, room category and insurance. Learn the factors and request a current patient-specific hospital estimate.',
    h1: 'Hip Replacement Cost in Jaipur: Factors, Insurance & Estimate',
    intro:
      'Hip replacement cost varies from case to case. Implant choice, primary versus revision surgery, medical complexity, investigations, hospital services, room category and insurance eligibility all affect the final estimate. The hospital team should provide a current patient-specific estimate after the planned procedure is clear.',
    faqs: [
      {
        q: 'How much does hip replacement cost in Jaipur?',
        a: 'There is no single amount that applies to every patient. Implant, primary or revision surgery, complexity, room category and hospital services change the estimate.',
      },
      {
        q: 'Does insurance cover hip replacement?',
        a: 'Coverage depends on medical indication and the terms of the individual policy or scheme. The current insurer/TPA and hospital network should be verified before admission.',
      },
      {
        q: 'Does implant choice affect the cost?',
        a: 'Yes. Implant type is one of several factors that can change the hospital estimate. The choice should be based on clinical suitability as well as cost considerations.',
      },
      {
        q: 'Is revision hip replacement more expensive?',
        a: 'Revision cases can require different implants, investigations and operating resources, so the estimate may differ substantially from a primary hip replacement.',
      },
      {
        q: 'How can I get a current estimate?',
        a: 'Share the available reports and insurance details with the team so the planned procedure and current hospital estimate can be verified.',
      },
    ],
    popupHeadline: 'Get a patient-specific hip replacement estimate',
  }
}

export function applyCostSeoOverrides(pages: CostPage[]): CostPage[] {
  return pages.map((page) => {
    if (page.slug === 'knee-replacement-jaipur') return knee(page)
    if (page.slug === 'robotic-knee-replacement-jaipur') return robotic(page)
    if (page.slug === 'hip-replacement-jaipur') return hip(page)
    return common(page)
  })
}
