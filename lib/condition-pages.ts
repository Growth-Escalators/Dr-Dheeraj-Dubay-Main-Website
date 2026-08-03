export interface ConditionPage {
  slug: string
  title: string
  h1: string
  metaTitle: string
  metaDescription: string
  category: string
  intro: string
  whatIsIt: {
    heading: string
    content: string
  }
  causes: {
    heading: string
    items: string[]
  }
  symptoms: {
    heading: string
    items: string[]
  }
  diagnosis: {
    heading: string
    content: string
    tests: string[]
  }
  treatment: {
    heading: string
    nonSurgical: string[]
    surgical: string[]
  }
  whyDrDubay: string[]
  faqs: { q: string; a: string }[]
  relatedConditions: string[]
  schema: {
    name: string
    description: string
    associatedAnatomy: string
    possibleTreatment: string
  }
}

export const CONDITION_PAGES: ConditionPage[] = [
  {
    slug: 'knee-pain',
    title: 'Knee Pain',
    h1: 'Knee Pain Treatment in Jaipur — Dr. Dheeraj Dubay',
    metaTitle: 'Knee Pain Treatment Jaipur | Expert Orthopaedic Surgeon — Dr. Dheeraj Dubay',
    metaDescription: 'Suffering from knee pain in Jaipur? Dr. Dheeraj Dubay offers expert diagnosis and treatment for all causes of knee pain. 35,000+ surgeries. Book consultation today.',
    category: 'Knee Condition',
    intro: 'Knee pain is one of the most common orthopaedic complaints, affecting people of all ages. At his clinics in Jaipur, Dr. Dheeraj Dubay — Forbes World Record holder and leading knee replacement surgeon — provides comprehensive evaluation and personalised treatment plans ranging from physiotherapy to advanced robotic surgery.',
    whatIsIt: {
      heading: 'Understanding Knee Pain',
      content: 'The knee is the largest and most complex joint in the body, bearing your full body weight with every step. Knee pain can originate from any of the knee structures — bones, cartilage, ligaments, tendons, or bursae. The severity ranges from mild discomfort that resolves with rest to debilitating pain that limits all daily activities. Accurate diagnosis is the foundation of effective treatment.',
    },
    causes: {
      heading: 'Common Causes of Knee Pain',
      items: [
        'Osteoarthritis — gradual wear and breakdown of cartilage, most common in adults over 50',
        'Rheumatoid arthritis — autoimmune inflammation attacking the joint lining',
        'Ligament injuries — ACL, PCL, MCL or LCL tears from sports or accidents',
        'Meniscus tears — damage to the shock-absorbing cartilage pads',
        'Patellar tendinitis — inflammation of the tendon connecting kneecap to shinbone',
        'Bursitis — swelling of fluid-filled sacs cushioning the joint',
        'Gout and pseudogout — crystal deposits causing sudden severe inflammation',
        'Bone-on-bone contact due to severe cartilage loss',
        'Post-traumatic arthritis following knee fractures or dislocations',
        'Obesity — excess weight dramatically increases joint stress',
      ],
    },
    symptoms: {
      heading: 'Symptoms That Indicate You Need Evaluation',
      items: [
        'Persistent dull ache or sharp pain in or around the knee',
        'Stiffness, especially in the morning or after sitting',
        'Swelling and warmth around the joint',
        'Reduced range of motion — difficulty bending or straightening',
        'Clicking, popping, or grinding sounds (crepitus)',
        'Knee giving way or feeling unstable',
        'Pain that worsens with stairs, squatting, or prolonged walking',
        'Visible deformity or bow-legged / knock-kneed appearance',
      ],
    },
    diagnosis: {
      heading: 'How We Diagnose Knee Pain',
      content: 'Dr. Dubay conducts a thorough clinical examination combined with appropriate investigations to identify the exact cause of your knee pain.',
      tests: [
        'X-rays to assess bone alignment, joint space narrowing, and bone spurs',
        'MRI scan for soft tissue evaluation — cartilage, ligaments, and menisci',
        'Blood tests to rule out inflammatory arthritis or infection',
        'Joint fluid analysis (arthrocentesis) when infection or gout is suspected',
        'Bone density scan (DEXA) to evaluate for osteoporosis',
        'Standing full-length leg X-rays to assess overall limb alignment',
      ],
    },
    treatment: {
      heading: 'Treatment Options',
      nonSurgical: [
        'Physiotherapy and targeted exercise programme',
        'Weight management and dietary advice',
        'Anti-inflammatory medications (NSAIDs)',
        'Corticosteroid injections for rapid inflammation relief',
        'Platelet-rich plasma (PRP) therapy',
        'Hyaluronic acid (visco-supplementation) injections',
        'Bracing and orthotics',
      ],
      surgical: [
        'Arthroscopic debridement for loose bodies and minor tears',
        'Partial knee replacement (unicompartmental) when only one area is damaged',
        'Total knee replacement — the gold-standard for severe arthritis',
        'Robotic-assisted knee replacement for precision alignment',
        'Zero-technique knee replacement with accelerated recovery',
        'Revision knee replacement for failed prior implants',
      ],
    },
    whyDrDubay: [
      'Forbes World Record holder — 34 joint replacement surgeries in a single day',
      'Over 35,000 successful knee surgeries performed',
      '23+ years of specialised orthopaedic experience in Jaipur',
      'Expert in robotic-assisted and computer-navigated surgery for optimal outcomes',
      'Practices at Shalby Hospital, Vaishali Nagar and Dr. Dubay Hip & Knee Clinic, Vidhyadhar Nagar',
      'Personalised non-surgical pathways before recommending surgery',
    ],
    faqs: [
      {
        q: 'When should I see a doctor for knee pain?',
        a: 'Seek medical evaluation if your knee pain persists beyond a few days, is severe, limits your daily activities, is accompanied by significant swelling or redness, or if your knee gives way. Early diagnosis prevents the condition from worsening.',
      },
      {
        q: 'Can knee pain be treated without surgery?',
        a: 'Yes — the majority of knee pain cases are managed successfully without surgery through physiotherapy, injections, weight loss, and medications. Surgery is considered only when conservative measures have failed and quality of life is significantly affected.',
      },
      {
        q: 'How long does recovery take after knee replacement?',
        a: 'With Dr. Dubay\'s Zero-technique approach, most patients walk the same day or next day, resume light activities within 2–4 weeks, and return to full function by 6–8 weeks. Traditional recovery is 3–6 months.',
      },
      {
        q: 'Is knee replacement painful?',
        a: 'Modern anaesthesia and pain management protocols make the surgery comfortable. Most patients report that post-surgery pain is actually less than the chronic pain they experienced before surgery.',
      },
    ],
    relatedConditions: ['osteoarthritis', 'rheumatoid-arthritis', 'hip-pain'],
    schema: {
      name: 'Knee Pain',
      description: 'Pain in or around the knee joint caused by various conditions including osteoarthritis, ligament injuries, and meniscus tears.',
      associatedAnatomy: 'Knee joint',
      possibleTreatment: 'Physiotherapy, medications, injections, partial or total knee replacement surgery',
    },
  },
  {
    slug: 'osteoarthritis',
    title: 'Osteoarthritis of the Knee',
    h1: 'Osteoarthritis Treatment in Jaipur — Dr. Dheeraj Dubay',
    metaTitle: 'Osteoarthritis Knee Treatment Jaipur | Dr. Dheeraj Dubay — Expert Surgeon',
    metaDescription: 'Expert osteoarthritis knee treatment in Jaipur by Dr. Dheeraj Dubay. From conservative management to robotic knee replacement. 35,000+ surgeries. Book today.',
    category: 'Degenerative Joint Disease',
    intro: 'Osteoarthritis (OA) is the most common form of arthritis, caused by the gradual breakdown of joint cartilage. Dr. Dheeraj Dubay offers the full spectrum of evidence-based treatments for knee osteoarthritis in Jaipur — from lifestyle modification and injections to robotic knee replacement surgery.',
    whatIsIt: {
      heading: 'What is Knee Osteoarthritis?',
      content: 'Osteoarthritis is a degenerative joint disease in which the protective cartilage that cushions the ends of the bones wears down over time. As cartilage deteriorates, the bones begin to rub against each other, causing pain, stiffness, and reduced mobility. Bone spurs (osteophytes) may form, and the joint space narrows progressively. OA can affect one or all three compartments of the knee.',
    },
    causes: {
      heading: 'Risk Factors and Causes',
      items: [
        'Age — cartilage naturally degrades as we get older, most common after 50',
        'Obesity — every kilogram of excess weight adds 4 kg of force on the knee',
        'Previous knee injuries — fractures, ligament tears, or meniscus damage',
        'Repetitive stress — occupations or sports involving kneeling, squatting, or heavy lifting',
        'Family history — genetic predisposition to cartilage breakdown',
        'Female gender — women are at higher risk, especially post-menopause',
        'Bone deformities — varus (bow-legged) or valgus (knock-kneed) alignment',
        'Weak surrounding muscles — reduced support increases joint stress',
      ],
    },
    symptoms: {
      heading: 'Symptoms of Knee Osteoarthritis',
      items: [
        'Deep, aching knee pain that worsens with activity and improves with rest',
        'Morning stiffness lasting less than 30 minutes',
        'Stiffness after prolonged sitting ("gelling")',
        'Creaking or grinding sensation (crepitus) with movement',
        'Reduced range of motion — difficulty fully bending or straightening the knee',
        'Swelling and tenderness around the joint',
        'Gradual bow-legged or knock-kneed deformity',
        'Muscle weakness and reduced ability to walk long distances',
      ],
    },
    diagnosis: {
      heading: 'Diagnosis of Osteoarthritis',
      content: 'Diagnosis combines clinical assessment with imaging. The Kellgren-Lawrence grading system (I–IV) is used to classify OA severity on X-ray.',
      tests: [
        'Weight-bearing X-rays showing joint space narrowing and bone spurs',
        'MRI for early cartilage changes not visible on X-ray',
        'Blood tests to exclude rheumatoid arthritis or other inflammatory conditions',
        'Standing full-length leg alignment X-rays (HKA angle assessment)',
      ],
    },
    treatment: {
      heading: 'Treatment for Osteoarthritis',
      nonSurgical: [
        'Weight loss — most effective non-surgical intervention',
        'Physiotherapy to strengthen quadriceps and improve biomechanics',
        'Walking aids and activity modification',
        'Paracetamol and NSAIDs for pain management',
        'Corticosteroid injections for inflammation flares',
        'Hyaluronic acid injections (viscosupplementation)',
        'PRP (platelet-rich plasma) therapy for mild-moderate OA',
        'TENS, ultrasound, and other physical modalities',
      ],
      surgical: [
        'Arthroscopic debridement — limited role, mainly for mechanical symptoms',
        'High tibial osteotomy — bone realignment for young patients with single-compartment OA',
        'Partial knee replacement — for isolated single-compartment disease',
        'Total knee replacement — definitive treatment for advanced OA',
        'Robotic-assisted total knee replacement for superior accuracy',
      ],
    },
    whyDrDubay: [
      'Pioneer of Zero-technique knee replacement — walk the same day as surgery',
      'Robotic and computer-navigated surgery expertise for precise implant positioning',
      '35,000+ knee replacement surgeries over 23+ years',
      'Comprehensive non-surgical protocols before recommending knee replacement',
      'Forbes World Record holder — 34 joint replacement surgeries in a single day',
      'Convenient clinics at Shalby Hospital Vaishali Nagar and Vidhyadhar Nagar, Jaipur',
    ],
    faqs: [
      {
        q: 'Can osteoarthritis be reversed?',
        a: 'Osteoarthritis cannot be reversed — cartilage does not regenerate on its own. However, its progression can be slowed significantly with weight management, exercise, and appropriate treatment. When the joint is severely damaged, knee replacement effectively replaces the damaged surfaces.',
      },
      {
        q: 'At what stage of osteoarthritis is knee replacement needed?',
        a: 'Knee replacement is typically recommended for Grade III–IV osteoarthritis (Kellgren-Lawrence) when conservative treatments have failed to control pain and the patient\'s quality of life is significantly impaired. Dr. Dubay always exhausts non-surgical options first.',
      },
      {
        q: 'How long do knee replacement implants last?',
        a: 'Modern knee implants typically last 20–25 years or longer. With robotic-assisted surgery and precise alignment, longevity is maximised. Lifestyle choices like maintaining healthy weight also significantly impact implant lifespan.',
      },
      {
        q: 'Is walking good for osteoarthritis?',
        a: 'Yes — low-impact walking is beneficial. It maintains muscle strength, aids weight management, and keeps the joint mobile. Avoid high-impact activities like running on hard surfaces. Swimming and cycling are excellent alternatives.',
      },
      {
        q: 'What foods should I avoid with knee osteoarthritis?',
        a: 'Reduce processed foods, refined sugars, red meat, and trans fats as these promote inflammation. A Mediterranean diet rich in omega-3 fatty acids, vegetables, and whole grains is associated with better OA outcomes.',
      },
    ],
    relatedConditions: ['knee-pain', 'rheumatoid-arthritis', 'hip-pain'],
    schema: {
      name: 'Knee Osteoarthritis',
      description: 'Degenerative joint disease causing progressive breakdown of knee cartilage, leading to pain, stiffness, and reduced function.',
      associatedAnatomy: 'Knee joint cartilage',
      possibleTreatment: 'Conservative management, injections, partial or total knee replacement',
    },
  },
  {
    slug: 'rheumatoid-arthritis',
    title: 'Rheumatoid Arthritis of the Knee',
    h1: 'Rheumatoid Arthritis Knee Treatment in Jaipur — Dr. Dheeraj Dubay',
    metaTitle: 'Rheumatoid Arthritis Knee Jaipur | Dr. Dheeraj Dubay — Orthopaedic Surgeon',
    metaDescription: 'Expert rheumatoid arthritis knee treatment in Jaipur. Dr. Dheeraj Dubay provides surgical solutions when medical management fails. Book a consultation today.',
    category: 'Inflammatory Arthritis',
    intro: 'Rheumatoid arthritis (RA) is an autoimmune condition that causes the immune system to attack joint linings, leading to inflammation, pain, and eventual joint destruction. Dr. Dheeraj Dubay works closely with rheumatologists in Jaipur to provide comprehensive care — including knee replacement surgery for patients with advanced RA joint damage.',
    whatIsIt: {
      heading: 'What is Rheumatoid Arthritis?',
      content: 'Unlike osteoarthritis which is mechanical wear-and-tear, rheumatoid arthritis is an inflammatory condition where the immune system mistakenly attacks the synovium — the lining of the joint. This causes persistent inflammation that can rapidly destroy cartilage and bone. RA often affects both knees symmetrically and may involve other joints and organs.',
    },
    causes: {
      heading: 'Causes and Risk Factors',
      items: [
        'Autoimmune dysfunction — immune system targeting healthy joint tissue',
        'Genetic predisposition — HLA-DR4 gene association',
        'Environmental triggers — smoking, infections, hormonal changes',
        'Female gender — RA affects women 3x more often than men',
        'Age — most commonly develops between 30–60 years',
        'Family history of autoimmune conditions',
      ],
    },
    symptoms: {
      heading: 'Symptoms of Rheumatoid Arthritis in the Knee',
      items: [
        'Symmetric joint involvement — both knees often affected simultaneously',
        'Morning stiffness lasting more than 30–60 minutes',
        'Warm, swollen, and tender joints',
        'Systemic symptoms — fatigue, low-grade fever, weight loss',
        'Rheumatoid nodules under the skin near pressure points',
        'Fluctuating disease activity — flares and remissions',
        'Progressive joint deformity without proper management',
      ],
    },
    diagnosis: {
      heading: 'Diagnosis of Rheumatoid Arthritis',
      content: 'RA diagnosis requires a combination of clinical, laboratory, and imaging findings. The ACR/EULAR 2010 criteria are used for classification.',
      tests: [
        'Rheumatoid factor (RF) blood test',
        'Anti-CCP (anti-cyclic citrullinated peptide) antibody — highly specific for RA',
        'ESR and CRP inflammatory markers',
        'X-rays showing erosions, joint space narrowing, and periarticular osteoporosis',
        'MRI for early synovial inflammation and erosion detection',
        'Ultrasound for synovitis assessment',
      ],
    },
    treatment: {
      heading: 'Treatment of Rheumatoid Arthritis',
      nonSurgical: [
        'DMARDs (disease-modifying drugs) — methotrexate, leflunomide',
        'Biologic agents — TNF inhibitors, IL-6 blockers, JAK inhibitors',
        'Corticosteroids for rapid disease control during flares',
        'NSAIDs for symptom relief',
        'Physiotherapy to maintain joint range and muscle strength',
        'Occupational therapy for joint protection strategies',
      ],
      surgical: [
        'Synovectomy — surgical removal of inflamed synovium (arthroscopic)',
        'Total knee replacement — when joint destruction is severe',
        'Bilateral knee replacement — staged or simultaneous if both knees are affected',
        'Revision surgery if a previous replacement has failed',
      ],
    },
    whyDrDubay: [
      'Extensive experience with inflammatory arthritis joint destruction patterns',
      'Close collaboration with rheumatologists for combined medical-surgical care',
      'Expertise in complex RA knee replacements with bone loss management',
      '35,000+ total joint surgeries with excellent outcomes in RA patients',
      'Advanced robotic techniques to optimise alignment in RA-deformed knees',
    ],
    faqs: [
      {
        q: 'Is knee replacement safe for rheumatoid arthritis patients?',
        a: 'Yes — knee replacement is highly effective for RA patients with severe joint damage. Pre-operative optimisation of disease activity with your rheumatologist reduces infection risk and improves outcomes. Dr. Dubay has extensive experience in RA knee replacements.',
      },
      {
        q: 'Should I stop my RA medications before surgery?',
        a: 'This requires careful coordination between your rheumatologist and surgeon. Some DMARDs and biologics may need to be paused around the time of surgery to reduce infection risk. Dr. Dubay works closely with rheumatology teams to create a safe perioperative plan.',
      },
      {
        q: 'Can RA affect only one knee?',
        a: 'While RA typically affects joints symmetrically, it can sometimes present asymmetrically, especially early in the disease. Involvement of a single knee is less common but does occur.',
      },
    ],
    relatedConditions: ['knee-pain', 'osteoarthritis', 'hip-pain'],
    schema: {
      name: 'Rheumatoid Arthritis of the Knee',
      description: 'Autoimmune inflammatory condition causing destruction of knee joint cartilage and bone, requiring medical and potentially surgical management.',
      associatedAnatomy: 'Knee joint synovium and cartilage',
      possibleTreatment: 'DMARDs, biologics, physiotherapy, synovectomy, total knee replacement',
    },
  },
  {
    slug: 'hip-pain',
    title: 'Hip Pain',
    h1: 'Hip Pain Treatment in Jaipur — Dr. Dheeraj Dubay',
    metaTitle: 'Hip Pain Treatment Jaipur | Dr. Dheeraj Dubay — Hip & Knee Surgeon',
    metaDescription: 'Expert hip pain diagnosis and treatment in Jaipur by Dr. Dheeraj Dubay. Comprehensive care from conservative management to total hip replacement. Book today.',
    category: 'Hip Condition',
    intro: 'Hip pain affects millions of people and can significantly limit mobility and quality of life. Dr. Dheeraj Dubay provides comprehensive evaluation and personalised treatment for all causes of hip pain at his clinics in Jaipur — from injections and physiotherapy to minimally invasive total hip replacement surgery.',
    whatIsIt: {
      heading: 'Understanding Hip Pain',
      content: 'The hip is a ball-and-socket joint where the femoral head (ball) fits into the acetabulum (socket). Hip pain can arise from the joint itself or from surrounding structures — muscles, tendons, bursae, or nerves. Pain may be felt in the groin (classic hip), outer hip (greater trochanteric), buttock, or even referred down to the thigh and knee.',
    },
    causes: {
      heading: 'Common Causes of Hip Pain',
      items: [
        'Hip osteoarthritis — the most common cause in adults over 50',
        'Avascular necrosis (AVN) — loss of blood supply to the femoral head',
        'Hip fractures — particularly in older adults with osteoporosis',
        'Greater trochanteric pain syndrome (bursitis and tendinopathy)',
        'Hip impingement (FAI) — abnormal contact between the ball and socket',
        'Labral tears — damage to the cartilage ring surrounding the hip socket',
        'Rheumatoid arthritis and inflammatory conditions',
        'Referred pain from the lumbar spine',
        'Muscle strains and tendon injuries',
        'Developmental dysplasia of the hip',
      ],
    },
    symptoms: {
      heading: 'Symptoms of Hip Problems',
      items: [
        'Groin pain that may radiate to the thigh or buttock',
        'Pain worse with weight-bearing, walking, or climbing stairs',
        'Difficulty putting on shoes and socks (restricted hip rotation)',
        'Limping or altered gait',
        'Stiffness after sitting or on waking',
        'Clicking or locking sensation in the hip',
        'Shortening of the affected leg',
        'Outer hip or buttock pain (lateral hip pain)',
      ],
    },
    diagnosis: {
      heading: 'Diagnosing Hip Pain',
      content: 'A thorough history and physical examination — including gait analysis and specific hip tests — guides appropriate investigations.',
      tests: [
        'X-rays of the hip and pelvis (AP and lateral views)',
        'MRI for soft tissue, cartilage, and AVN assessment',
        'CT scan for bone anatomy in complex cases',
        'Bone scan for stress fractures or AVN',
        'Ultrasound for bursitis and tendon assessment',
        'Diagnostic injection to confirm joint-origin pain',
      ],
    },
    treatment: {
      heading: 'Treatment Options for Hip Pain',
      nonSurgical: [
        'Activity modification and rest',
        'Physiotherapy — strengthening hip abductors and rotators',
        'Walking aids during painful episodes',
        'Anti-inflammatory medications',
        'Corticosteroid injections (ultrasound-guided)',
        'PRP therapy for tendon conditions',
        'Weight management',
      ],
      surgical: [
        'Hip arthroscopy for impingement and labral tears',
        'Core decompression for early avascular necrosis',
        'Total hip replacement — gold-standard for advanced hip arthritis',
        'Minimally invasive hip replacement with faster recovery',
        'Hemi-arthroplasty for femoral neck fractures in elderly patients',
        'Revision hip replacement for failed prior implants',
      ],
    },
    whyDrDubay: [
      'Specialist in both hip and knee replacement surgery in Jaipur',
      '23+ years of orthopaedic surgery experience',
      'Minimally invasive techniques for reduced blood loss and faster recovery',
      '35,000+ total joint replacement surgeries performed',
      'Comprehensive diagnostic workup to identify the true source of hip pain',
      'Multidisciplinary approach with physio and pain management teams',
    ],
    faqs: [
      {
        q: 'How do I know if my hip pain needs surgery?',
        a: 'Surgery is generally considered when hip pain is severe enough to limit daily activities, has not responded to 3–6 months of conservative treatment, and imaging shows significant joint damage. Dr. Dubay will thoroughly assess your case before recommending surgery.',
      },
      {
        q: 'What is the recovery time after total hip replacement?',
        a: 'Most patients walk with assistance within 24 hours. They return home within 3–5 days, drive in 4–6 weeks, and resume full activities in 3–6 months. Minimally invasive techniques shorten recovery.',
      },
      {
        q: 'Can hip pain come from my spine?',
        a: 'Yes — lumbar spine conditions like disc herniation or spinal stenosis can cause referred pain in the hip, buttock, and thigh. Distinguishing spinal from hip-origin pain is a key part of Dr. Dubay\'s diagnostic process.',
      },
    ],
    relatedConditions: ['knee-pain', 'osteoarthritis', 'avascular-necrosis'],
    schema: {
      name: 'Hip Pain',
      description: 'Pain arising from the hip joint or surrounding structures, caused by arthritis, fractures, bursitis, or other conditions.',
      associatedAnatomy: 'Hip joint',
      possibleTreatment: 'Conservative management, injections, physiotherapy, total hip replacement',
    },
  },
  {
    slug: 'avascular-necrosis',
    title: 'Avascular Necrosis (AVN) of the Hip',
    h1: 'Avascular Necrosis Treatment in Jaipur — Dr. Dheeraj Dubay',
    metaTitle: 'Avascular Necrosis AVN Hip Treatment Jaipur | Dr. Dheeraj Dubay',
    metaDescription: 'Expert avascular necrosis (AVN) hip treatment in Jaipur. Dr. Dheeraj Dubay offers early-stage and advanced AVN surgery including hip replacement. Book today.',
    category: 'Hip Condition',
    intro: 'Avascular necrosis (AVN), also called osteonecrosis, is a serious condition where the blood supply to the femoral head is disrupted, causing bone cell death and eventual collapse of the hip joint. Dr. Dheeraj Dubay offers the full range of treatments for AVN in Jaipur — from joint-preserving core decompression in early stages to total hip replacement in advanced disease.',
    whatIsIt: {
      heading: 'What is Avascular Necrosis?',
      content: 'AVN occurs when the blood supply to the femoral head (the "ball" of the hip joint) is interrupted. Without adequate blood flow, bone tissue dies and the femoral head may collapse over months to years, leading to severe arthritis. AVN is classified in stages (I–IV) based on the extent of bone death and collapse. Early-stage AVN can sometimes be treated with joint-preserving surgery; advanced stages usually require hip replacement.',
    },
    causes: {
      heading: 'Causes and Risk Factors for AVN',
      items: [
        'Corticosteroid use — the most common cause, especially high-dose or long-term use',
        'Alcohol overuse — second most common cause',
        'Hip fractures or dislocations disrupting blood vessels',
        'Sickle cell disease causing blood vessel blockage',
        'Decompression sickness (in divers)',
        'Blood clotting disorders (hypercoagulable states)',
        'Radiation therapy near the hip',
        'Autoimmune conditions like lupus',
        'Idiopathic — no identifiable cause (20–30% of cases)',
      ],
    },
    symptoms: {
      heading: 'Symptoms of AVN',
      items: [
        'Early stages may be completely asymptomatic',
        'Groin pain that may be sudden or gradual in onset',
        'Pain worsening with weight-bearing and improving with rest',
        'Limited range of hip motion',
        'Limping and difficulty walking long distances',
        'Eventual constant pain including at rest in advanced stages',
      ],
    },
    diagnosis: {
      heading: 'Diagnosing Avascular Necrosis',
      content: 'X-rays often appear normal in early AVN. MRI is the most sensitive investigation for detecting early bone marrow changes before collapse occurs.',
      tests: [
        'MRI — detects AVN in early stages before X-ray changes (high sensitivity)',
        'X-rays — shows crescents sign, collapse, and secondary arthritis in later stages',
        'CT scan for detailed assessment of femoral head collapse',
        'Bone scan (nuclear medicine) for multi-focal AVN',
        'Blood tests for underlying causes (clotting disorders, sickle cell)',
      ],
    },
    treatment: {
      heading: 'Treatment Options for AVN',
      nonSurgical: [
        'Protected weight-bearing (crutches) to prevent further collapse in early stage',
        'Bisphosphonate medications to slow bone loss',
        'Hyperbaric oxygen therapy (limited evidence)',
        'Pain management with analgesics and anti-inflammatories',
        'Addressing underlying cause (stopping steroids, alcohol cessation)',
      ],
      surgical: [
        'Core decompression — drilling to reduce pressure and stimulate new blood vessels (Stage I–II)',
        'Core decompression with bone grafting and stem cell therapy',
        'Vascularised fibular grafting — complex procedure for younger patients',
        'Partial surface replacement for limited collapse',
        'Total hip replacement — for Stage III–IV or failed previous procedures',
      ],
    },
    whyDrDubay: [
      'Early diagnosis expertise — catches AVN before collapse allows joint-preserving treatment',
      'Experienced in core decompression and joint-preserving surgery for younger patients',
      'Advanced techniques in total hip replacement for AVN with bone loss',
      '35,000+ joint surgeries with expertise in complex hip cases',
      'Staged management approach — maximising time before replacement for young patients',
    ],
    faqs: [
      {
        q: 'Can AVN be cured without surgery?',
        a: 'Very early Stage I AVN occasionally stabilises with protected weight-bearing and treating the underlying cause. However, most cases progress and require surgical intervention. Core decompression in early stages can halt progression and preserve the joint.',
      },
      {
        q: 'Who is at risk of AVN?',
        a: 'People who take high-dose corticosteroids for conditions like lupus, asthma, or after organ transplant have the highest risk. Excessive alcohol consumption is the second leading cause. Always ask your doctor about bone protection when starting long-term steroids.',
      },
      {
        q: 'How quickly does AVN progress?',
        a: 'Progression varies greatly. Some patients collapse within months; others take years. Regular MRI monitoring is recommended for at-risk patients to detect early changes before collapse occurs.',
      },
    ],
    relatedConditions: ['hip-pain', 'osteoarthritis', 'knee-pain'],
    schema: {
      name: 'Avascular Necrosis of the Hip',
      description: 'Condition where blood supply to the femoral head is disrupted, causing bone death and potential hip joint collapse.',
      associatedAnatomy: 'Femoral head, hip joint',
      possibleTreatment: 'Core decompression, bone grafting, total hip replacement',
    },
  },
  {
    slug: 'knee-stiffness',
    title: 'Knee Stiffness',
    h1: 'Knee Stiffness Treatment in Jaipur — Dr. Dheeraj Dubay',
    metaTitle: 'Knee Stiffness Treatment Jaipur | Dr. Dheeraj Dubay — Orthopaedic Surgeon',
    metaDescription: 'Struggling with stiff knees in Jaipur? Dr. Dheeraj Dubay diagnoses and treats all causes of knee stiffness. Expert care from physiotherapy to surgery. Book today.',
    category: 'Knee Condition',
    intro: 'Knee stiffness — difficulty bending or straightening the knee — is a common and debilitating problem. It may result from arthritis, post-surgical scarring, joint inflammation, or inactivity. Dr. Dheeraj Dubay provides expert evaluation and targeted treatment to restore your knee mobility and function in Jaipur.',
    whatIsIt: {
      heading: 'What Causes Knee Stiffness?',
      content: 'Knee stiffness occurs when the normal gliding surfaces of the joint are disrupted, the joint capsule becomes contracted, or surrounding muscles and tendons become tight. It can be a symptom of an underlying condition (arthritis, bursitis) or a complication following surgery or injury. The degree of stiffness ranges from mild "gelling" after rest to complete inability to flex or extend the knee.',
    },
    causes: {
      heading: 'Common Causes of Knee Stiffness',
      items: [
        'Osteoarthritis — bone spurs and cartilage loss restrict movement',
        'Rheumatoid arthritis and inflammatory joint disease',
        'Post-surgical stiffness (arthrofibrosis) after knee replacement or ACL surgery',
        'Bursitis — fluid-filled sac inflammation reducing joint movement',
        'Meniscus tears causing a mechanical block',
        'Baker\'s cyst (popliteal cyst) behind the knee',
        'Prolonged immobilisation after fracture or injury',
        'Septic arthritis — joint infection causing rapid stiffness',
      ],
    },
    symptoms: {
      heading: 'Symptoms',
      items: [
        'Morning stiffness lasting from minutes to over an hour',
        'Stiffness after sitting or inactivity ("gelling phenomenon")',
        'Reduced range of motion — unable to fully bend or straighten the knee',
        'Accompanying pain, swelling, or warmth',
        'Clicking, catching, or locking in the knee',
        'Difficulty with stairs, getting up from a chair, or walking',
      ],
    },
    diagnosis: {
      heading: 'Diagnosing the Cause of Knee Stiffness',
      content: 'Range of motion measurement, gait analysis, and targeted investigations help identify the underlying cause.',
      tests: [
        'Goniometer measurement of knee flexion and extension range',
        'X-rays for arthritis, bone spurs, and joint space narrowing',
        'MRI for meniscal tears, ligament issues, and soft tissue scarring',
        'Ultrasound for Baker\'s cyst and bursitis',
        'Blood tests for inflammatory markers in suspected RA or infection',
        'Joint aspiration if infection or crystal arthritis is suspected',
      ],
    },
    treatment: {
      heading: 'Treating Knee Stiffness',
      nonSurgical: [
        'Intensive physiotherapy — key treatment for most cases',
        'Continuous passive motion (CPM) machine use',
        'Joint manipulation under anaesthesia (MUA) for post-surgical stiffness',
        'Corticosteroid injections to reduce inflammation',
        'Hyaluronic acid for arthritic stiffness',
        'Heat therapy to relax muscles before stretching',
        'NSAIDs for underlying inflammatory conditions',
      ],
      surgical: [
        'Arthroscopic arthrolysis — removal of scar tissue and adhesions',
        'Manipulation under anaesthesia — for early post-surgical stiffness',
        'Knee replacement when arthritis is the primary cause',
        'Revision knee replacement if stiffness follows a prior replacement',
      ],
    },
    whyDrDubay: [
      'Expert in diagnosing the exact cause of knee stiffness — not a one-size-fits-all approach',
      'Skilled in arthroscopic arthrolysis for post-surgical scarring',
      'Comprehensive physiotherapy protocols to maximise range of motion recovery',
      '23+ years of orthopaedic surgery experience in Jaipur',
      '35,000+ knee surgeries — extensive experience managing all types of stiffness',
    ],
    faqs: [
      {
        q: 'Is knee stiffness normal after knee replacement?',
        a: 'Some stiffness is normal in the first weeks after knee replacement. Dedicated physiotherapy is essential to regain range of motion. If stiffness persists beyond 3 months, further intervention like manipulation under anaesthesia or arthroscopic release may be needed.',
      },
      {
        q: 'Can a stiff knee be loosened without surgery?',
        a: 'Yes — many cases of knee stiffness respond well to intensive physiotherapy, manipulation under anaesthesia (a brief procedure), and steroid injections. Surgery is reserved for cases where these measures fail.',
      },
      {
        q: 'How much knee flexion is normal?',
        a: 'Normal knee flexion is 130–140 degrees. For most daily activities, at least 90 degrees is needed. Climbing stairs requires about 100 degrees, and sitting cross-legged requires 110+ degrees. Dr. Dubay targets maximum achievable range for each patient.',
      },
    ],
    relatedConditions: ['knee-pain', 'osteoarthritis', 'rheumatoid-arthritis'],
    schema: {
      name: 'Knee Stiffness',
      description: 'Reduced range of motion of the knee joint caused by arthritis, post-surgical scarring, inflammation, or injury.',
      associatedAnatomy: 'Knee joint capsule, cartilage, and surrounding soft tissues',
      possibleTreatment: 'Physiotherapy, injections, manipulation under anaesthesia, arthroscopic release, knee replacement',
    },
  },
  {
    slug: 'sports-injury-knee',
    title: 'Sports Knee Injuries',
    h1: 'Sports Knee Injury Treatment in Jaipur — Dr. Dheeraj Dubay',
    metaTitle: 'Sports Knee Injury Treatment Jaipur | Dr. Dheeraj Dubay — Orthopaedic Surgeon',
    metaDescription: 'Expert sports knee injury treatment in Jaipur. ACL tears, meniscus injuries, and more. Dr. Dheeraj Dubay helps athletes return to sport safely. Book today.',
    category: 'Sports Orthopaedics',
    intro: 'Sports knee injuries — from ACL tears to meniscal damage — require expert orthopaedic care to return athletes to full activity safely. Dr. Dheeraj Dubay provides comprehensive sports orthopaedics care in Jaipur, from accurate diagnosis to surgical reconstruction and return-to-sport rehabilitation.',
    whatIsIt: {
      heading: 'Common Sports Knee Injuries',
      content: 'The knee is the most commonly injured joint in sports. High-energy sports like football, basketball, cricket, kabaddi, and running place enormous demands on the knee ligaments, cartilage, and tendons. Injuries can be acute (sudden trauma) or chronic (overuse). Prompt and accurate diagnosis is critical to prevent long-term damage and optimise recovery.',
    },
    causes: {
      heading: 'Types and Causes of Sports Knee Injuries',
      items: [
        'ACL (anterior cruciate ligament) tear — pivoting, landing, or sudden direction change',
        'PCL (posterior cruciate ligament) injury — direct blow to the front of the knee',
        'Meniscus tears — twisting with the foot planted',
        'Collateral ligament sprains (MCL/LCL) — side impact to the knee',
        'Patellar dislocation — sudden lateral force on the kneecap',
        'Patellar tendinitis ("jumper\'s knee") — repetitive jumping sports',
        'IT band syndrome — runners\' knee from repetitive friction',
        'Cartilage (chondral) injuries — contact or twisting forces',
        'Stress fractures — overtraining without adequate recovery',
      ],
    },
    symptoms: {
      heading: 'Symptoms of Sports Knee Injuries',
      items: [
        'Sudden "pop" heard or felt at the time of injury (ACL)',
        'Immediate swelling within hours of injury',
        'Inability to continue playing or bear weight',
        'Giving way or instability (especially with ACL injuries)',
        'Locking or catching sensation (meniscal tears)',
        'Pain on the inner or outer knee (ligament sprains)',
        'Anterior knee pain with stairs or prolonged sitting (patellofemoral)',
        'Gradual onset pain with overuse injuries',
      ],
    },
    diagnosis: {
      heading: 'Diagnosing Sports Knee Injuries',
      content: 'Accurate diagnosis requires a detailed mechanism-of-injury history, specific clinical examination tests, and targeted imaging.',
      tests: [
        'Lachman test, anterior drawer test for ACL assessment',
        'McMurray test, Thessaly test for meniscal pathology',
        'Valgus/varus stress tests for collateral ligaments',
        'MRI — gold standard for soft tissue injury assessment',
        'X-rays to exclude fractures',
        'Ultrasound for tendon assessment',
      ],
    },
    treatment: {
      heading: 'Treatment of Sports Knee Injuries',
      nonSurgical: [
        'RICE protocol — Rest, Ice, Compression, Elevation in acute phase',
        'Physiotherapy and neuromuscular rehabilitation',
        'Bracing for ligament support during recovery',
        'PRP (platelet-rich plasma) injections for partial tears',
        'Return-to-sport protocols with functional testing',
        'Gradual progressive loading for overuse conditions',
      ],
      surgical: [
        'ACL reconstruction — arthroscopic using hamstring or patella tendon graft',
        'PCL reconstruction for complete tears with instability',
        'Meniscal repair — suturing the tear to preserve the meniscus',
        'Meniscectomy — partial removal when repair is not possible',
        'Patellar stabilisation procedures for recurrent dislocation',
        'Cartilage restoration — microfracture, MACI, or autologous transplant',
      ],
    },
    whyDrDubay: [
      'Extensive experience in arthroscopic sports knee surgery',
      'Meniscal repair prioritised over removal to preserve long-term joint health',
      'Comprehensive return-to-sport rehabilitation protocols',
      'Expert in ACL reconstruction with modern graft techniques',
      '23+ years of orthopaedic expertise and 35,000+ surgeries in Jaipur',
    ],
    faqs: [
      {
        q: 'Do ACL tears always need surgery?',
        a: 'Not always. ACL injuries in older, less active patients may be managed with physiotherapy and bracing. However, active individuals — especially those who wish to return to cutting and pivoting sports — typically require ACL reconstruction to regain full stability.',
      },
      {
        q: 'Can a torn meniscus heal on its own?',
        a: 'Meniscus tears in the outer third (vascular zone) can sometimes heal with conservative management. Tears in the inner two-thirds have no blood supply and cannot heal naturally — they require surgical repair or partial removal.',
      },
      {
        q: 'When can I return to sport after ACL surgery?',
        a: 'Return to sport typically takes 9–12 months after ACL reconstruction to ensure adequate graft maturation and neuromuscular re-education. Returning too early significantly increases re-injury risk.',
      },
    ],
    relatedConditions: ['knee-pain', 'knee-stiffness', 'osteoarthritis'],
    schema: {
      name: 'Sports Knee Injuries',
      description: 'Acute or chronic knee injuries sustained during sports including ACL tears, meniscal injuries, and ligament sprains.',
      associatedAnatomy: 'Knee ligaments, menisci, cartilage, and tendons',
      possibleTreatment: 'Physiotherapy, bracing, ACL reconstruction, meniscal repair or resection, cartilage restoration',
    },
  },
]
