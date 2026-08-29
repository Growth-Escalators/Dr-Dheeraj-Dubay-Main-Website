import type { ConditionPage } from './condition-pages'

const VERIFIED_AUTHORITY_POINTS = [
  '24 years of orthopedic experience.',
  '40,000+ total surgeries performed across his career.',
  'Director, Robotic Joint Replacement Surgery at Shalby Hospital Jaipur.',
  'Practice focused on knee and hip replacement, including robotic, computer-navigated and minimally invasive approaches where clinically appropriate.',
  'Recorded 34 joint replacements in one day on 9 May 2024 — 33 knee replacements and 1 hip replacement.',
]

function kneePainOverride(page: ConditionPage): ConditionPage {
  return {
    ...page,
    intro:
      'Knee pain can come from arthritis, injury, inflammation, overuse or problems in the surrounding tissues. Dr. Dheeraj Dubay evaluates knee pain in Jaipur with clinical examination and appropriate imaging or tests when needed. Treatment depends on the diagnosis and can range from activity modification and physiotherapy to surgery when there is a clear indication.',
    treatment: {
      ...page.treatment,
      surgical: [
        'Arthroscopic procedures for selected mechanical problems when clinically indicated',
        'Partial knee replacement when disease is limited to an appropriate compartment',
        'Total knee replacement for selected patients with advanced joint damage and persistent symptoms',
        'Robotic-assisted knee replacement where robotic guidance is appropriate to the surgical plan',
        'Early-recovery knee replacement protocols tailored to the individual patient',
        'Revision knee replacement when a previous implant requires reassessment or replacement',
      ],
    },
    faqs: [
      {
        q: 'When should I see a doctor for knee pain?',
        a: 'Seek medical assessment if knee pain is severe, follows a significant injury, is associated with marked swelling, redness, fever or inability to bear weight, or persists and limits normal activities. Prompt assessment can help identify conditions that may need treatment.',
      },
      {
        q: 'Can knee pain be treated without surgery?',
        a: 'Many causes of knee pain can be managed without surgery, depending on the diagnosis and severity. Options may include activity modification, physiotherapy, weight management, medicines, braces or selected injections. Surgery is considered when there is an appropriate structural indication and non-surgical care has not provided enough relief.',
      },
      {
        q: 'How long does recovery take after knee replacement?',
        a: 'Recovery varies by patient. Mobilisation may begin early when medically appropriate, while return to daily activities depends on strength, wound healing, other medical conditions and rehabilitation progress. Your surgeon and physiotherapy team should set individual milestones.',
      },
      {
        q: 'Is knee replacement painful?',
        a: 'Some pain and swelling are expected after knee replacement. Anaesthesia, medicines and rehabilitation are used to manage discomfort, and the plan is adjusted according to the patient’s health and response.',
      },
    ],
  }
}

function osteoarthritisOverride(page: ConditionPage): ConditionPage {
  return {
    ...page,
    treatment: {
      ...page.treatment,
      surgical: [
        'Arthroscopy has a limited role and may be considered for selected mechanical problems rather than routine osteoarthritis treatment',
        'Osteotomy may be considered in selected younger patients with one-sided disease and suitable alignment',
        'Partial knee replacement may be considered when arthritis is limited to an appropriate compartment',
        'Total knee replacement is an established option for selected patients with advanced arthritis and persistent symptoms',
        'Robotic assistance may be used to support planning, alignment assessment and controlled bone preparation when clinically appropriate',
      ],
    },
    faqs: [
      {
        q: 'Can osteoarthritis be reversed?',
        a: 'Established cartilage loss from osteoarthritis is not currently restored to normal by routine treatment. Management focuses on reducing symptoms, maintaining function and addressing contributing factors. Surgical treatment may be considered when joint damage and symptoms are advanced.',
      },
      {
        q: 'At what stage of osteoarthritis is knee replacement needed?',
        a: 'There is no single X-ray grade that automatically means a patient needs knee replacement. The decision combines symptoms, loss of function, examination, imaging, response to appropriate non-surgical treatment, general health and the patient’s goals.',
      },
      {
        q: 'How long do knee replacement implants last?',
        a: 'Implant longevity varies. It depends on implant design, fixation, alignment, activity, body weight, medical factors and complications. A surgeon can discuss expected implant performance for the specific implant and patient rather than promising a fixed number of years.',
      },
      {
        q: 'Is walking good for osteoarthritis?',
        a: 'Appropriate low-impact activity can help many people with knee osteoarthritis maintain strength and function, but the amount and type of exercise should match symptoms and overall health. A physiotherapist or treating clinician can help tailor the plan.',
      },
      {
        q: 'Does diet cure knee osteoarthritis?',
        a: 'No diet cures established knee osteoarthritis. A balanced diet and healthy body weight can support overall health and may reduce mechanical load on the knee. Patients with other medical conditions should follow advice appropriate to those conditions.',
      },
    ],
  }
}

function rheumatoidOverride(page: ConditionPage): ConditionPage {
  return {
    ...page,
    faqs: page.faqs.map((faq) =>
      faq.q === 'Is knee replacement safe for rheumatoid arthritis patients?'
        ? {
            ...faq,
            a: 'Knee replacement can be considered for people with rheumatoid arthritis when joint damage and symptoms are severe despite appropriate medical management. Infection risk, medicines, bone quality and overall health require coordinated planning between the orthopedic, rheumatology and anaesthesia teams.',
          }
        : faq,
    ),
  }
}

function hipPainOverride(page: ConditionPage): ConditionPage {
  return {
    ...page,
    treatment: {
      ...page.treatment,
      surgical: [
        'Hip arthroscopy for selected impingement or labral problems when clinically indicated',
        'Core decompression for selected early-stage avascular necrosis',
        'Total hip replacement as an established option for selected patients with advanced hip-joint damage',
        'Minimally invasive approaches may be considered according to anatomy, diagnosis and the surgical plan',
        'Hemiarthroplasty for selected femoral-neck fractures',
        'Revision hip replacement when a previous implant requires reassessment or replacement',
      ],
    },
    faqs: page.faqs.map((faq) => {
      if (faq.q === 'How do I know if my hip pain needs surgery?') {
        return {
          ...faq,
          a: 'Surgery is considered when the diagnosis shows a problem that can benefit from an operation and symptoms remain significant despite appropriate non-surgical care, or when the condition itself requires earlier surgery. The decision depends on examination, imaging, overall health and the patient’s goals.',
        }
      }
      if (faq.q === 'What is the recovery time after total hip replacement?') {
        return {
          ...faq,
          a: 'Recovery after hip replacement varies with age, health, surgical approach and rehabilitation. Mobilisation may begin early when medically appropriate, while discharge, driving and return to activities are decided individually by the treating team.',
        }
      }
      return faq
    }),
  }
}

function avnOverride(page: ConditionPage): ConditionPage {
  return {
    ...page,
    faqs: page.faqs.map((faq) => {
      if (faq.q === 'Can AVN be cured without surgery?') {
        return {
          ...faq,
          a: 'Management depends on the stage, symptoms, size and location of the affected area and the underlying cause. Some early cases may be monitored or treated with protected weight-bearing and medical management, while selected patients may be offered joint-preserving surgery. Advanced collapse often changes the surgical options.',
        }
      }
      if (faq.q === 'How quickly does AVN progress?') {
        return {
          ...faq,
          a: 'Progression varies substantially between patients and depends on the cause and extent of bone involvement. Follow-up imaging may be recommended when clinically appropriate so treatment can be adjusted if the femoral head changes.',
        }
      }
      return faq
    }),
  }
}

function kneeStiffnessOverride(page: ConditionPage): ConditionPage {
  return {
    ...page,
    intro:
      'Knee stiffness means reduced ability to bend or straighten the knee and can occur with arthritis, inflammation, injury, prolonged inactivity or scar formation after surgery. Evaluation focuses on identifying the cause and measuring functional limitation so treatment can be tailored to the individual patient.',
    faqs: page.faqs.map((faq) =>
      faq.q === 'Is knee stiffness normal after knee replacement?'
        ? {
            ...faq,
            a: 'Some stiffness is common early after knee replacement. Range of motion can change over time with swelling control, pain management and rehabilitation. Persistent or severe stiffness should be assessed to identify causes such as scar formation, infection, implant issues or other medical factors before considering additional treatment.',
          }
        : faq,
    ),
  }
}

function sportsInjuryOverride(page: ConditionPage): ConditionPage {
  return {
    ...page,
    intro:
      'Sports-related knee pain and injury can involve ligaments, menisci, cartilage, tendons or bone. Assessment begins with the injury mechanism, examination and appropriate imaging. Treatment may range from rehabilitation and bracing to surgery for selected structural injuries, with return-to-activity decisions based on healing, strength and functional testing.',
    faqs: page.faqs.map((faq) =>
      faq.q === 'When can I return to sport after ACL surgery?'
        ? {
            ...faq,
            a: 'Return to sport after ACL reconstruction is individual and should be based on graft healing, strength, movement quality, confidence and functional testing rather than a calendar date alone. The treating surgical and rehabilitation teams should clear progression back to pivoting sport.',
          }
        : faq,
    ),
  }
}

export function applyConditionSeoOverrides(pages: ConditionPage[]): ConditionPage[] {
  return pages.map((original) => {
    let page: ConditionPage = { ...original, whyDrDubay: VERIFIED_AUTHORITY_POINTS }

    if (page.slug === 'knee-pain') page = kneePainOverride(page)
    if (page.slug === 'osteoarthritis') page = osteoarthritisOverride(page)
    if (page.slug === 'rheumatoid-arthritis') page = rheumatoidOverride(page)
    if (page.slug === 'hip-pain') page = hipPainOverride(page)
    if (page.slug === 'avascular-necrosis') page = avnOverride(page)
    if (page.slug === 'knee-stiffness') page = kneeStiffnessOverride(page)
    if (page.slug === 'sports-injury-knee') page = sportsInjuryOverride(page)

    return page
  })
}
