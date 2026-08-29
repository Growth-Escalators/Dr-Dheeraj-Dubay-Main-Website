import type { ProcedurePage } from './procedure-pages'
import {
  HIP_OWNER_URL,
  JOINT_OWNER_URL,
  KNEE_OWNER_URL,
  ROBOTIC_KNEE_OWNER_URL,
} from './seo-priority-pages'

const VERIFIED_AUTHORITY_POINTS = [
  '24 years of orthopedic experience.',
  '40,000+ total surgeries performed across his career.',
  'Director, Robotic Joint Replacement Surgery at Shalby Hospital Jaipur.',
  'Practice focused on knee and hip replacement, including robotic, computer-navigated and minimally invasive approaches where clinically appropriate.',
  'Recorded 34 joint replacements in one day on 9 May 2024 — 33 knee replacements and 1 hip replacement.',
]

const KNEE_RECOVERY: ProcedurePage['recovery'] = {
  heading: 'Recovery After Knee Replacement',
  timeline: [
    {
      period: 'Hospital phase',
      title: 'Pain control & mobilisation',
      description:
        'The clinical and physiotherapy teams begin mobilisation when it is medically appropriate. The amount of assistance, walking distance and hospital stay vary with the patient’s health and early recovery.',
    },
    {
      period: 'Early weeks',
      title: 'Home exercises & wound care',
      description:
        'Patients usually continue prescribed exercises, walking practice and wound care. Swelling, strength and range of motion improve at different rates, so progress is reviewed individually.',
    },
    {
      period: 'Following weeks',
      title: 'Strength & daily activity',
      description:
        'Walking aids may be reduced as balance and strength improve. Return to driving, work and stairs depends on the operated side, strength, medicines, safety and the treating team’s advice.',
    },
    {
      period: 'Following months',
      title: 'Functional recovery',
      description:
        'Mobility and confidence can continue improving for several months. Rehabilitation goals are adjusted to the patient’s age, pre-operative function, other medical conditions and progress.',
    },
    {
      period: 'Long term',
      title: 'Follow-up & implant care',
      description:
        'Long-term implant performance varies with implant design, alignment, activity, body weight, medical factors and complications. Follow-up is advised according to the surgeon’s plan.',
    },
  ],
}

function replaceOrAppendCrossLinks(
  current: ProcedurePage['crossLinks'],
  links: NonNullable<ProcedurePage['crossLinks']>,
) {
  const byHref = new Map((current ?? []).map((link) => [link.href, link]))
  links.forEach((link) => byHref.set(link.href, link))
  return Array.from(byHref.values())
}

function applyKneeOwner(page: ProcedurePage): ProcedurePage {
  return {
    ...page,
    title: 'Knee Replacement Surgeon in Jaipur',
    h1: 'Knee Replacement Surgeon in Jaipur',
    metaTitle: 'Knee Replacement Surgeon in Jaipur | Dr. Dheeraj Dubay',
    metaDescription:
      'Knee replacement surgeon in Jaipur Dr. Dheeraj Dubay has 24 years of orthopedic experience and 40,000+ total surgeries. Total, robotic, partial, bilateral and revision knee replacement at Shalby Hospital Jaipur.',
    intro:
      'Dr. Dheeraj Dubay is a knee replacement surgeon in Jaipur and Director, Robotic Joint Replacement Surgery at Shalby Hospital Jaipur. With 24 years of orthopedic experience and 40,000+ total surgeries performed across his career, his practice includes total, robotic, partial, bilateral and revision knee replacement. The appropriate procedure depends on examination, X-rays, overall health and the pattern of arthritis in each knee.',
    whatIsIt: {
      heading: 'What Is Total Knee Replacement?',
      content:
        'Total knee replacement (total knee arthroplasty) is an operation for a severely damaged knee joint. The surgeon removes damaged joint surfaces and replaces them with implant components designed to create a stable, low-friction articulation. Surgery is considered when symptoms, examination and imaging show advanced joint disease and appropriate non-surgical treatment has not provided enough relief. Implant choice, expected function and long-term follow-up should be discussed for the individual patient rather than treated as a fixed guarantee.',
    },
    howPerformed: {
      heading: 'How Total Knee Replacement Is Performed',
      steps: [
        'The anaesthesia team assesses the patient and selects an appropriate anaesthesia and pain-control plan.',
        'The knee is exposed through a surgical approach selected for the patient and planned procedure.',
        'Damaged cartilage and a controlled amount of underlying bone are prepared for the implant components.',
        'Trial components and measurements are used to assess alignment, stability, balance and range of motion.',
        'The definitive femoral and tibial components are implanted, with patellar treatment when clinically indicated.',
        'The surgeon checks stability, movement and component position before closing the wound.',
        'Post-operative care includes pain control, clot-prevention measures when indicated, wound care and physiotherapy.',
        'Mobilisation begins when the medical and rehabilitation teams consider it safe for that patient.',
      ],
    },
    benefits: {
      heading: 'Potential Goals of Knee Replacement',
      items: [
        {
          icon: '🦵',
          title: 'Reduce Arthritis-Related Pain',
          description: 'The operation is intended to reduce pain caused by severely damaged joint surfaces; the degree of relief varies between patients.',
        },
        {
          icon: '🚶',
          title: 'Improve Everyday Mobility',
          description: 'Many patients seek surgery because walking, stairs or routine activities have become limited. Functional recovery depends on rehabilitation and individual factors.',
        },
        {
          icon: '📐',
          title: 'Restore a Stable Joint',
          description: 'Implant positioning and soft-tissue balance are planned to create a stable knee appropriate to the patient’s anatomy.',
        },
        {
          icon: '🧭',
          title: 'Individual Surgical Planning',
          description: 'Total, partial, robotic, navigation-assisted or revision options are considered according to diagnosis and anatomy rather than a one-size-fits-all approach.',
        },
        {
          icon: '🏃',
          title: 'Support Functional Goals',
          description: 'The rehabilitation plan focuses on safe mobility, strength and activities that are appropriate for the individual patient.',
        },
        {
          icon: '📝',
          title: 'Long-Term Follow-Up',
          description: 'Implant performance varies over time, so follow-up and activity advice are tailored to the implant, patient and clinical course.',
        },
      ],
    },
    whyDrDubay: VERIFIED_AUTHORITY_POINTS,
    recovery: KNEE_RECOVERY,
    faqs: [
      {
        q: 'At what age should I consider knee replacement?',
        a: 'There is no single age cut-off. The decision is based on pain, loss of function, examination and imaging, response to non-surgical treatment, overall health and the patient’s goals. Medical fitness can matter more than calendar age.',
      },
      {
        q: 'How long will I be in hospital after knee replacement?',
        a: 'Hospital stay varies with the operation, medical conditions, pain control, mobility, wound status and home support. The team decides discharge when it is medically and functionally safe rather than using one fixed timeline for every patient.',
      },
      {
        q: 'Is knee replacement surgery painful?',
        a: 'Some post-operative pain and swelling are expected. Anaesthesia, medicines and rehabilitation are used to manage discomfort, and the plan is adjusted according to the patient’s health and response.',
      },
      {
        q: 'Can both knees be replaced at the same time?',
        a: 'Bilateral knee replacement can be considered for selected patients, but it is not suitable for everyone. The decision requires assessment of the severity in both knees, general health, anaesthesia risk and rehabilitation support.',
      },
      {
        q: 'How successful is knee replacement surgery?',
        a: 'Knee replacement is an established treatment for advanced knee arthritis, but an individual outcome cannot be guaranteed. Pain relief, function, complications and satisfaction vary with diagnosis, health, surgical factors and rehabilitation. Ask the surgeon about the benefits and risks that apply to your case.',
      },
      {
        q: 'When can I drive after knee replacement?',
        a: 'Return to driving depends on which knee was operated on, strength, reaction time, use of sedating medicines and the ability to control the vehicle safely. Follow the treating team’s advice and applicable driving guidance.',
      },
      {
        q: 'Will the knee feel completely natural after surgery?',
        a: 'A knee replacement is an artificial joint and may not feel identical to a natural knee. The aim is to reduce arthritis-related pain and improve useful function; some patients continue to notice stiffness, numbness, clicking or other differences.',
      },
      {
        q: 'Is knee replacement covered by insurance?',
        a: 'Coverage depends on the insurer or TPA, policy wording, waiting periods, exclusions, medical indication and the hospital’s current network. Share the current policy or government-scheme details with Shalby Hospital’s insurance desk for verification before admission.',
      },
    ],
    crossLinks: replaceOrAppendCrossLinks(page.crossLinks, [
      { href: ROBOTIC_KNEE_OWNER_URL, label: 'Robotic Knee Replacement in Jaipur' },
      { href: JOINT_OWNER_URL, label: 'Joint Replacement Surgeon in Jaipur' },
      { href: HIP_OWNER_URL, label: 'Hip Replacement Surgeon in Jaipur' },
      { href: '/cost/knee-replacement-jaipur', label: 'Knee Replacement Cost & Insurance in Jaipur' },
    ]),
    schema: {
      ...page.schema,
      description:
        'Knee replacement surgery performed by Dr. Dheeraj Dubay at Shalby Hospital Jaipur, including total knee replacement and patient-specific use of robotic or navigation-assisted techniques.',
      followup:
        'Follow-up and physiotherapy are planned according to wound healing, mobility, strength, symptoms and the patient’s clinical course.',
      preparation:
        'Pre-operative assessment may include imaging, blood tests, anaesthesia review, medication review and medical optimisation according to the patient’s health.',
      howPerformed:
        'Damaged knee joint surfaces are prepared and replaced with implant components. Alignment, stability and soft-tissue balance are assessed before closure. The exact technique is patient-specific.',
      dateModified: '2026-08-29',
    },
  }
}

function applyRoboticKneeOwner(page: ProcedurePage): ProcedurePage {
  return {
    ...page,
    title: 'Robotic Knee Replacement in Jaipur',
    h1: 'Robotic Knee Replacement in Jaipur',
    metaTitle: 'Robotic Knee Replacement in Jaipur | Dr. Dheeraj Dubay',
    metaDescription:
      'Robotic knee replacement in Jaipur with Dr. Dheeraj Dubay, Director of Robotic Joint Replacement Surgery at Shalby Hospital. Learn planning, candidacy, recovery and cost considerations.',
    intro:
      'Robotic knee replacement in Jaipur is offered by Dr. Dheeraj Dubay, Director, Robotic Joint Replacement Surgery at Shalby Hospital Jaipur. Robotic assistance can help the surgeon plan bone cuts, assess alignment and balance the knee using patient-specific measurements; the surgeon remains in control throughout. Whether robotic assistance is appropriate depends on the patient’s knee anatomy, diagnosis and overall surgical plan.',
    whatIsIt: {
      heading: 'What Is Robotic-Assisted Knee Replacement?',
      content:
        'Robotic-assisted knee replacement uses a computerised planning and guidance system as a surgical tool. Depending on the platform, the system can use imaging or intra-operative measurements to help the surgeon assess anatomy, alignment, component position and planned bone preparation. The robot does not diagnose the patient or perform the operation independently: the surgeon remains responsible for the plan, bone preparation, implant selection and final clinical decisions.',
    },
    howPerformed: {
      heading: 'How Robotic Assistance Is Used During Knee Replacement',
      steps: [
        'The patient is assessed to confirm whether knee replacement and robotic assistance are clinically appropriate.',
        'Patient-specific anatomical data are captured using the imaging or registration process required by the robotic platform.',
        'The surgeon reviews a proposed implant plan and adjusts it according to anatomy, alignment and soft-tissue considerations.',
        'During surgery, trackers or sensors provide measurements to the system according to the platform being used.',
        'Robotic guidance helps the surgeon perform planned bone preparation within defined boundaries.',
        'Trial components are used to assess alignment, balance, stability and range of motion.',
        'The surgeon makes any required adjustments and implants the definitive components.',
        'Post-operative pain management and rehabilitation are planned according to the individual patient’s condition and progress.',
      ],
    },
    benefits: {
      heading: 'What Robotic Assistance Can Add to Knee Replacement',
      items: [
        { icon: '🧭', title: 'Patient-Specific Planning', description: 'Pre-operative or intra-operative data can be used to plan implant position around the patient’s anatomy.' },
        { icon: '📐', title: 'Alignment Guidance', description: 'The system provides objective measurements that help the surgeon assess alignment during the operation.' },
        { icon: '⚖️', title: 'Balance Assessment', description: 'Intra-operative information can help assess soft-tissue balance through the planned range of motion.' },
        { icon: '🦴', title: 'Controlled Bone Preparation', description: 'Robotic guidance can help keep planned bone preparation within defined surgical boundaries.' },
        { icon: '👨‍⚕️', title: 'Surgeon Controlled', description: 'The robotic system is an assisting tool; Dr. Dubay makes the clinical and surgical decisions.' },
        { icon: '📝', title: 'Individual Treatment Plan', description: 'Technology is used as part of a broader plan based on diagnosis, imaging, health and rehabilitation needs.' },
      ],
    },
    whyDrDubay: VERIFIED_AUTHORITY_POINTS,
    recovery: KNEE_RECOVERY,
    faqs: [
      {
        q: 'Is robotic knee replacement better than traditional knee replacement?',
        a: 'Robotic assistance can add patient-specific planning and objective intra-operative measurements, but it is not automatically the best option for every patient. The appropriate technique depends on diagnosis, anatomy, available technology, the surgical plan and the surgeon’s judgement.',
      },
      {
        q: 'Does the robot perform my surgery?',
        a: 'No. The robotic system is an assisting tool. Dr. Dubay remains responsible for the surgical plan and makes the clinical decisions throughout the procedure.',
      },
      {
        q: 'How long does robotic knee replacement surgery take?',
        a: 'Operating time varies with the robotic platform, anatomy, one or both knees, complexity and the surgical plan. A patient-specific estimate is more appropriate than a fixed duration.',
      },
      {
        q: 'When can I walk after robotic knee replacement?',
        a: 'Rehabilitation may include early mobilisation when medically appropriate, but the timing and level of assistance vary with health, strength, pain control and post-operative progress. Robotic technology does not guarantee a particular walking timeline.',
      },
      {
        q: 'Is robotic knee replacement covered by insurance?',
        a: 'Coverage varies by insurer, TPA and policy terms. The hospital and insurer should verify whether the planned robotic-assisted procedure and associated charges are eligible before admission.',
      },
      {
        q: 'Does robotic assistance make the implant last longer?',
        a: 'Robotic systems can help the surgeon execute a planned component position, but long-term implant survival depends on many factors and a longer lifespan cannot be guaranteed for an individual patient.',
      },
      {
        q: 'What is the difference between robotic and computer navigation?',
        a: 'Both technologies can provide intra-operative measurements and guidance. Their hardware and workflow differ by system. Neither replaces surgical judgement, and the appropriate option depends on the planned operation and available platform.',
      },
      {
        q: 'Can both knees be replaced robotically at the same time?',
        a: 'Bilateral robotic-assisted knee replacement may be considered for selected patients, but suitability requires assessment of both knees, medical fitness, anaesthesia risk and rehabilitation needs.',
      },
    ],
    crossLinks: replaceOrAppendCrossLinks(page.crossLinks, [
      { href: KNEE_OWNER_URL, label: 'Knee Replacement Surgeon in Jaipur' },
      { href: JOINT_OWNER_URL, label: 'Joint Replacement Surgeon in Jaipur' },
      { href: HIP_OWNER_URL, label: 'Hip Replacement Surgeon in Jaipur' },
      { href: '/cost/robotic-knee-replacement-jaipur', label: 'Robotic Knee Replacement Cost & Insurance' },
    ]),
    schema: {
      ...page.schema,
      description:
        'Robotic-assisted knee replacement performed by Dr. Dheeraj Dubay at Shalby Hospital Jaipur, using robotic guidance as a surgeon-controlled aid for planning, alignment and bone preparation where clinically appropriate.',
      followup:
        'Follow-up and physiotherapy are planned according to wound healing, mobility, strength, symptoms and the patient’s clinical course.',
      preparation:
        'Pre-operative assessment may include the imaging or registration required by the robotic platform, blood tests, anaesthesia review and medical optimisation.',
      howPerformed:
        'A robotic guidance system assists the surgeon with patient-specific planning, measurements and controlled bone preparation. The surgeon remains in control of the operation and implant decisions.',
      dateModified: '2026-08-29',
    },
  }
}

export function applyProcedureSeoOverrides(pages: ProcedurePage[]): ProcedurePage[] {
  return pages.map((page) => {
    if (page.slug === 'knee-replacement-surgery') return applyKneeOwner(page)
    if (page.slug === 'robotic-knee-replacement') return applyRoboticKneeOwner(page)
    return page
  })
}
