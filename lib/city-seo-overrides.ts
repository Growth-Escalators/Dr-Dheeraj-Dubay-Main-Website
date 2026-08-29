type CityPage = {
  slug: string
  city: string
  procedure: string
  title: string
  description: string
  h1: string
  intro: string
  campNote: string
  distance: string
  patientNote: string
}

export function applyCitySeoOverrides<T extends CityPage>(pages: T[]): T[] {
  return pages.map((page) => {
    if (page.slug !== 'joint-replacement-surgeon-jaipur') return page

    return {
      ...page,
      title: 'Joint Replacement Surgeon in Jaipur | Dr. Dheeraj Dubay',
      description:
        'Joint replacement surgeon in Jaipur Dr. Dheeraj Dubay has 24 years of orthopedic experience and 40,000+ total surgeries. Knee, hip, robotic and revision care at Shalby Hospital Jaipur.',
      h1: 'Joint Replacement Surgeon in Jaipur',
      intro:
        'Dr. Dheeraj Dubay provides knee and hip replacement care in Jaipur as Director, Robotic Joint Replacement Surgery at Shalby Hospital Jaipur. He has 24 years of orthopedic experience and has performed 40,000+ total surgeries across his career. Treatment options include knee and hip replacement, robotic or navigation-assisted techniques where appropriate, and revision surgery for selected complex cases.',
      campNote:
        'Consultations are available at Shalby Hospital Jaipur and Dr. Dubay Hip & Knee Clinic in Vidhyadhar Nagar. Call +91-8955373205 for appointment availability.',
      patientNote:
        'The appropriate procedure is decided after clinical examination, imaging and assessment of the patient’s overall health and mobility goals.',
    }
  })
}
