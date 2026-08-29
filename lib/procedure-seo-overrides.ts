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
    whyDrDubay: VERIFIED_AUTHORITY_POINTS,
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
