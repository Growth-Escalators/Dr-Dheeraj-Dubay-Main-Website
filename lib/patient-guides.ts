export type PatientGuideSection = {
  heading: string
  paragraphs?: string[]
  bullets?: string[]
}

export type PatientGuide = {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  category: 'Knee Replacement' | 'Hip Replacement'
  summary: string
  sections: PatientGuideSection[]
  faqs: { q: string; a: string }[]
  sources: { label: string; url: string }[]
  related: { label: string; href: string }[]
}

export const PATIENT_GUIDES: PatientGuide[] = [
  {
    slug: 'robotic-vs-conventional-knee-replacement',
    title: 'Robotic vs Conventional Knee Replacement: What Actually Changes?',
    metaTitle: 'Robotic vs Conventional Knee Replacement | Jaipur Patient Guide',
    metaDescription:
      'Compare robotic-assisted and conventional knee replacement: what the technology does, what it does not do, who may be suitable, and what to ask your surgeon.',
    category: 'Knee Replacement',
    summary:
      'Robotic assistance changes how the surgeon can plan, measure and execute parts of knee replacement, but the surgeon remains in control. It is not automatically the better choice for every patient, and the decision should be based on anatomy, diagnosis, implant plan, surgeon experience and individual goals.',
    sections: [
      {
        heading: 'What is the same in both operations?',
        paragraphs: [
          'Both conventional and robotic-assisted total knee replacement remove damaged joint surfaces and replace them with prosthetic components. Both require anaesthesia, infection prevention, pain management, rehabilitation and follow-up. The long-term result depends on more than the tool used in the operating room.',
        ],
      },
      {
        heading: 'What does robotic assistance add?',
        paragraphs: [
          'Depending on the system, robotic or computer-assisted technology can help the surgeon collect measurements, create a patient-specific plan, assess alignment and soft-tissue balance, and guide controlled bone preparation. The device does not independently decide or perform the operation.',
        ],
        bullets: [
          'Patient-specific planning and intra-operative measurements',
          'Assistance with component position and limb alignment targets',
          'Objective information about joint balance during surgery',
          'Surgeon-controlled execution throughout the procedure',
        ],
      },
      {
        heading: 'Does robotic surgery guarantee a better result?',
        paragraphs: [
          'No. Accuracy of measurements is only one part of knee replacement. Diagnosis, implant selection, surgical judgement, medical fitness, rehabilitation and patient expectations also matter. AAOS patient guidance notes that robotic technology has not shown a significant short-term patient-reported benefit and that long-term benefit remains unproven, so the technology should be discussed without guarantees.',
        ],
      },
      {
        heading: 'Who should discuss robotic assistance?',
        paragraphs: [
          'Patients considering knee replacement can ask whether robotic or navigation-assisted planning adds useful information for their anatomy and planned procedure. The answer may differ for straightforward primary replacement, deformity, prior surgery, bilateral treatment or revision cases.',
        ],
      },
      {
        heading: 'Questions to ask before choosing',
        bullets: [
          'Why are you recommending robotic-assisted or conventional surgery for my knee?',
          'Which parts of the operation are changed by the technology?',
          'Does the technology affect implant choice or hospital cost?',
          'What are the risks and expected rehabilitation for my specific case?',
          'How much experience does the surgical team have with the selected system?',
        ],
      },
    ],
    faqs: [
      {
        q: 'Does the robot perform knee replacement by itself?',
        a: 'No. Robotic-assisted systems are surgeon-controlled tools. They can support planning, measurements and controlled execution, while the surgeon remains responsible for the operation.',
      },
      {
        q: 'Is robotic knee replacement right for every patient?',
        a: 'No. Suitability depends on diagnosis, anatomy, the planned procedure, available system and the surgeon’s clinical judgement.',
      },
      {
        q: 'Is recovery always faster after robotic knee replacement?',
        a: 'Recovery varies by patient and cannot be guaranteed from the use of robotic assistance alone. Pain control, health, rehabilitation and the overall surgical plan also affect recovery.',
      },
    ],
    sources: [
      {
        label: 'AAOS — Management of Osteoarthritis of the Knee, patient summary',
        url: 'https://orthoinfo.aaos.org/globalassets/pdfs/the-management-of-osteoarthritis-of-the-knee-pls_final.pdf',
      },
      {
        label: 'FDA — Computer-Assisted Surgical Systems',
        url: 'https://www.fda.gov/medical-devices/surgery-devices/computer-assisted-surgical-systems',
      },
    ],
    related: [
      { label: 'Robotic Knee Replacement in Jaipur', href: '/procedures/robotic-knee-replacement' },
      { label: 'Knee Replacement Surgeon in Jaipur', href: '/procedures/knee-replacement-surgery' },
      { label: 'Robotic Knee Replacement Cost', href: '/cost/robotic-knee-replacement-jaipur' },
    ],
  },
  {
    slug: 'total-vs-partial-knee-replacement',
    title: 'Total vs Partial Knee Replacement: How the Decision Is Made',
    metaTitle: 'Total vs Partial Knee Replacement | Jaipur Patient Guide',
    metaDescription:
      'Understand total versus partial knee replacement, including how much of the knee is replaced, typical candidacy factors, recovery differences and questions to ask.',
    category: 'Knee Replacement',
    summary:
      'A partial knee replacement treats only the damaged compartment of the knee, while a total knee replacement resurfaces the main joint surfaces more broadly. The choice depends on where arthritis is located, ligament function, deformity, symptoms and imaging—not simply on age.',
    sections: [
      {
        heading: 'What is a total knee replacement?',
        paragraphs: [
          'In total knee replacement, damaged surfaces at the ends of the thighbone and shinbone are removed and replaced with prosthetic components. It is generally considered when arthritis or joint damage is advanced and involves more than one part of the knee.',
        ],
      },
      {
        heading: 'What is a partial knee replacement?',
        paragraphs: [
          'A partial or unicompartmental knee replacement treats only the affected part of the knee. NHS guidance describes it as an option when arthritis is limited to one half of the knee. Because less of the joint is replaced, the incision can be smaller and recovery may be shorter for suitable patients.',
        ],
      },
      {
        heading: 'What determines eligibility for a partial replacement?',
        bullets: [
          'Arthritis is sufficiently limited to one compartment',
          'The remaining compartments are suitable for preservation',
          'Ligament stability and knee mechanics are appropriate',
          'Deformity and range of motion are compatible with the procedure',
          'Symptoms and imaging match the compartment being treated',
        ],
      },
      {
        heading: 'Why not choose partial replacement simply because it is smaller?',
        paragraphs: [
          'A smaller operation is useful only when it treats the actual disease. If arthritis is widespread, preserving other damaged compartments can leave symptoms behind or lead to further surgery. The decision should follow standing X-rays, examination and discussion of the patient’s activity goals.',
        ],
      },
      {
        heading: 'What should patients compare?',
        bullets: [
          'Which compartments of my knee are damaged?',
          'Are my ligaments and alignment suitable for partial replacement?',
          'What is the chance that another compartment may need treatment later?',
          'How will rehabilitation differ in my case?',
          'Would a total replacement better match the extent of my arthritis?',
        ],
      },
    ],
    faqs: [
      {
        q: 'Is partial knee replacement always better because it preserves more bone?',
        a: 'No. Preserving more of the knee can be valuable in a properly selected patient, but partial replacement is not appropriate when disease is too widespread or the knee does not meet the required mechanical criteria.',
      },
      {
        q: 'Can a partial knee replacement later be converted to a total replacement?',
        a: 'Revision to a total knee replacement can be considered if disease progresses or the partial replacement fails, but the complexity depends on the individual situation.',
      },
    ],
    sources: [
      {
        label: 'NHS — How a knee replacement is done',
        url: 'https://www.nhs.uk/tests-and-treatments/knee-replacement/how-its-done/',
      },
      {
        label: 'Royal National Orthopaedic Hospital — Hip and knee joint replacement guide',
        url: 'https://www.rnoh.nhs.uk/patients-and-visitors/patient-information-guides/patients-guide-hip-and-knee-joint-replacement-surgery',
      },
    ],
    related: [
      { label: 'Partial Knee Replacement', href: '/procedures/partial-knee-replacement' },
      { label: 'Total Knee Replacement', href: '/procedures/knee-replacement-surgery' },
      { label: 'Knee Replacement Cost & Insurance', href: '/cost/knee-replacement-jaipur' },
    ],
  },
  {
    slug: 'knee-replacement-risks-complications',
    title: 'Knee Replacement Risks and Complications: A Patient Checklist',
    metaTitle: 'Knee Replacement Risks & Complications | Patient Guide',
    metaDescription:
      'Learn the important risks of knee replacement, warning signs after surgery, and how pre-operative assessment and rehabilitation help reduce avoidable problems.',
    category: 'Knee Replacement',
    summary:
      'Knee replacement is commonly performed, but it is still major surgery. Risks include blood clots, infection, bleeding, stiffness, persistent pain, instability and injury to nearby tissues. Individual risk depends on age, medical conditions and the complexity of surgery.',
    sections: [
      {
        heading: 'Important complications to understand',
        bullets: [
          'Blood clots in the leg (DVT) and, less commonly, pulmonary embolism',
          'Wound or deep joint infection',
          'Bleeding and anaesthesia-related complications',
          'Persistent pain, stiffness or reduced range of motion',
          'Instability or problems with implant function',
          'Injury to nearby nerves, blood vessels or soft tissues',
          'Need for further surgery or revision in some patients',
        ],
      },
      {
        heading: 'How risk is reduced before surgery',
        paragraphs: [
          'Pre-operative assessment identifies factors that may increase complications. The treating team may review diabetes control, weight, smoking, medicines, anaemia, infection risk, heart or lung disease and other conditions before deciding whether surgery should proceed.',
        ],
      },
      {
        heading: 'What happens after surgery to reduce risk?',
        bullets: [
          'Early supervised mobilisation when medically appropriate',
          'Blood-clot prevention based on individual risk',
          'Wound care and infection precautions',
          'Pain-management plan that allows safe movement and physiotherapy',
          'Rehabilitation focused on strength, movement and function',
        ],
      },
      {
        heading: 'Warning signs that need prompt medical attention',
        paragraphs: [
          'Patients should follow their own discharge instructions. Increasing wound redness, pus or drainage, fever, worsening leg swelling, severe calf pain, chest pain or difficulty breathing can require urgent assessment. Emergency symptoms should not wait for an online reply or routine appointment.',
        ],
      },
      {
        heading: 'The right way to discuss risk',
        paragraphs: [
          'A useful consent discussion is individual. Ask about your own medical risk, the planned implant and technique, expected rehabilitation, warning signs, and what would happen if a complication occurred. Online percentages cannot replace that conversation.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Can knee replacement complications be completely prevented?',
        a: 'No. Teams use evidence-based steps to reduce risk, but no operation is risk-free. Your individual medical history and procedure influence the risk profile.',
      },
      {
        q: 'What symptoms after knee replacement are urgent?',
        a: 'Follow your discharge instructions. Worsening wound infection signs, marked calf swelling or pain, chest pain or difficulty breathing require prompt medical assessment; chest pain or breathing difficulty can be an emergency.',
      },
    ],
    sources: [
      {
        label: 'NHS — Complications of a knee replacement',
        url: 'https://www.nhs.uk/tests-and-treatments/knee-replacement/complications/',
      },
      {
        label: 'NHS — Recovering from a knee replacement',
        url: 'https://www.nhs.uk/tests-and-treatments/knee-replacement/recovery/',
      },
    ],
    related: [
      { label: 'Knee Replacement Surgery', href: '/procedures/knee-replacement-surgery' },
      { label: 'How to Prepare for Knee Replacement', href: '/blogs/how-to-prepare-for-knee-replacement-surgery' },
      { label: 'Joint Replacement Recovery Tips', href: '/blogs/joint-replacement-recovery-tips' },
    ],
  },
  {
    slug: 'avn-vs-hip-arthritis',
    title: 'AVN vs Hip Arthritis: Why the Diagnosis Changes the Treatment',
    metaTitle: 'AVN vs Hip Arthritis | Hip Pain Patient Guide Jaipur',
    metaDescription:
      'Compare avascular necrosis (osteonecrosis) and hip osteoarthritis: causes, imaging, symptoms, joint-preserving options and when hip replacement may be considered.',
    category: 'Hip Replacement',
    summary:
      'AVN (osteonecrosis) and hip osteoarthritis can both cause groin pain and loss of movement, but they are different diseases. AVN begins with loss of blood supply to bone, while osteoarthritis is primarily degeneration of the joint cartilage and related joint changes. Imaging and disease stage influence treatment.',
    sections: [
      {
        heading: 'What is hip osteoarthritis?',
        paragraphs: [
          'Hip osteoarthritis involves progressive damage to the cartilage and other structures of the hip joint. Symptoms commonly include groin pain, stiffness and difficulty with weight-bearing activities. X-rays can show joint-space loss and other arthritic changes.',
        ],
      },
      {
        heading: 'What is AVN or osteonecrosis?',
        paragraphs: [
          'Avascular necrosis occurs when blood supply to part of the bone is reduced or interrupted. In the hip, the femoral head can weaken and eventually collapse. Causes and risk factors can include trauma, corticosteroid exposure, alcohol use and some medical conditions, although not every case has an identifiable cause.',
        ],
      },
      {
        heading: 'Why MRI may matter in suspected AVN',
        paragraphs: [
          'Early AVN can be difficult to see on a plain X-ray. When symptoms and risk factors raise concern, MRI may identify changes before collapse is obvious on X-ray. Treatment options differ substantially before and after structural collapse.',
        ],
      },
      {
        heading: 'How treatment differs',
        bullets: [
          'Early hip osteoarthritis is often managed with activity modification, exercise or physiotherapy, medicines and selected injections.',
          'Early AVN may prompt discussion of joint-preserving procedures in selected patients, depending on stage and lesion characteristics.',
          'Advanced arthritis or a collapsed, painful femoral head may lead to discussion of total hip replacement when symptoms and imaging justify it.',
        ],
      },
      {
        heading: 'Why younger patients need careful staging',
        paragraphs: [
          'AVN often affects people who are younger than the typical hip-arthritis population. Preserving the natural joint can be important when it is realistically possible, but delaying replacement is not automatically beneficial if the joint has already collapsed and function is severely limited. The stage of disease should drive the discussion.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Can AVN and arthritis look similar?',
        a: 'Yes. Both can cause groin pain, stiffness and reduced walking tolerance. Examination and imaging help distinguish the underlying process and stage.',
      },
      {
        q: 'Does every AVN patient need a hip replacement?',
        a: 'No. Treatment depends on stage, symptoms and extent of damage. Joint-preserving options may be considered in selected earlier-stage cases, while advanced collapse may require replacement.',
      },
    ],
    sources: [
      {
        label: 'AAOS — Management of Osteoarthritis of the Hip, plain-language summary',
        url: 'https://orthoinfo.aaos.org/globalassets/pdfs/plain-language-summary_oa-of-the-hip-2024.pdf',
      },
      {
        label: 'Mayo Clinic — Hip replacement: why it is done',
        url: 'https://www.mayoclinic.org/tests-procedures/hip-replacement/about/pac-20385042',
      },
    ],
    related: [
      { label: 'Avascular Necrosis Treatment in Jaipur', href: '/conditions/avascular-necrosis' },
      { label: 'Hip Pain Treatment in Jaipur', href: '/conditions/hip-pain' },
      { label: 'Hip Replacement Surgeon in Jaipur', href: '/hip-replacement-jaipur' },
    ],
  },
  {
    slug: 'hip-replacement-younger-patients',
    title: 'Hip Replacement in Younger Adults: What Should Be Considered?',
    metaTitle: 'Hip Replacement for Younger Adults | Patient Guide Jaipur',
    metaDescription:
      'A balanced guide to hip replacement in younger adults: diagnosis, joint-preserving options, implant longevity, activity goals and revision planning.',
    category: 'Hip Replacement',
    summary:
      'Age alone does not decide whether someone needs hip replacement. In a younger adult, the diagnosis, severity of joint damage, failed non-surgical treatment, work and activity goals, implant longevity and the possibility of future revision surgery all deserve careful discussion.',
    sections: [
      {
        heading: 'Why younger patients are different',
        paragraphs: [
          'A younger patient may live with an implant for many decades and may place higher activity demands on it. That makes accurate diagnosis and discussion of alternatives especially important before a first replacement.',
        ],
      },
      {
        heading: 'What conditions can lead to replacement at a younger age?',
        bullets: [
          'Avascular necrosis or osteonecrosis with structural collapse',
          'Advanced osteoarthritis from previous injury or structural hip disease',
          'Inflammatory arthritis with severe joint damage',
          'Previous hip surgery followed by progressive degeneration',
          'Other conditions where pain and loss of function are substantial and durable alternatives are no longer appropriate',
        ],
      },
      {
        heading: 'Should joint-preserving options be considered first?',
        paragraphs: [
          'When the diagnosis and stage allow it, a surgeon may discuss non-surgical treatment or joint-preserving procedures. These options are not interchangeable with hip replacement, and they should not be used simply to postpone replacement when the joint is already severely damaged.',
        ],
      },
      {
        heading: 'Implant longevity and future revision',
        paragraphs: [
          'Modern hip replacements are designed for long-term use, but no implant lasts forever. NHS guidance notes that modern hip replacements are designed to last at least 15 years, while actual longevity varies with implant, patient factors, activity and time. A younger patient should understand that revision surgery may be needed later in life.',
        ],
      },
      {
        heading: 'Questions worth discussing before surgery',
        bullets: [
          'What is the exact diagnosis causing my hip damage?',
          'Are there realistic joint-preserving options at this stage?',
          'Which implant bearing and fixation strategy are being considered, and why?',
          'What activities should I expect to return to, and which may need modification?',
          'How does my age affect the lifetime chance of revision surgery?',
        ],
      },
    ],
    faqs: [
      {
        q: 'Am I too young for hip replacement?',
        a: 'There is no single age cutoff. The decision is based on diagnosis, severity, symptoms, function, alternatives and the implications of living with an implant for a long time.',
      },
      {
        q: 'Will a hip replacement last for the rest of my life?',
        a: 'It may last many years, but no surgeon can promise lifetime durability. Younger patients should specifically discuss implant longevity and the possibility of future revision.',
      },
    ],
    sources: [
      {
        label: 'NHS — Complications of a hip replacement',
        url: 'https://www.nhs.uk/tests-and-treatments/hip-replacement/complications-of-a-hip-replacement/',
      },
      {
        label: 'AAOS American Joint Replacement Registry — patient-facing hip arthroplasty report',
        url: 'https://orthoinfo.aaos.org/globalassets/pdfs/ajrr-patient-facing-interim-report.pdf',
      },
    ],
    related: [
      { label: 'Hip Replacement Surgeon in Jaipur', href: '/hip-replacement-jaipur' },
      { label: 'Avascular Necrosis', href: '/conditions/avascular-necrosis' },
      { label: 'Hip Replacement Cost & Insurance', href: '/cost/hip-replacement-jaipur' },
    ],
  },
]

export const PATIENT_GUIDE_MAP = new Map(PATIENT_GUIDES.map((guide) => [guide.slug, guide]))
