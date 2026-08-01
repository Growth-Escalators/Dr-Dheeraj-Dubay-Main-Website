export interface ProcedurePage {
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
  howPerformed: {
    heading: string
    steps: string[]
  }
  benefits: {
    heading: string
    items: { icon: string; title: string; description: string }[]
  }
  whyDrDubay: string[]
  candidateFor: {
    heading: string
    symptoms: string[]
    notIdeal: string[]
  }
  recovery: {
    heading: string
    timeline: {
      period: string
      title: string
      description: string
    }[]
  }
  faqs: { q: string; a: string }[]
  relatedProcedures: string[]
  schema: {
    procedureName: string
    description: string
    bodyLocation: string
    followup: string
    preparation: string
    howPerformed: string
  }
}

export const PROCEDURE_PAGES: ProcedurePage[] = [
  {
    slug: 'robotic-knee-replacement',
    title: 'Robotic Knee Replacement',
    h1: 'Robotic Knee Replacement Surgery in Jaipur',
    metaTitle: 'Robotic Knee Replacement Surgery Jaipur — Dr. Dheeraj Dubay',
    metaDescription: 'Expert robotic-assisted knee replacement surgery in Jaipur by Dr. Dheeraj Dubay. Forbes World Record holder. 35,000+ successful surgeries. Book consultation today.',
    category: 'Advanced Procedure',
    intro: 'Dr. Dheeraj Dubay offers robotic-assisted knee replacement surgery at Shalby Hospital, Jaipur — one of the most advanced orthopaedic procedures available in Rajasthan. Robotic technology allows precise, personalised implant placement that was impossible with traditional techniques, resulting in better outcomes and faster recovery.',
    whatIsIt: {
      heading: 'What is Robotic Knee Replacement Surgery?',
      content: "Robotic knee replacement is a cutting-edge surgical technique where a robotic arm assists the surgeon in performing the procedure with extraordinary precision. Before the surgery, a detailed 3D model of the patient's knee is created using CT scan data. The robotic system uses this model to create a personalised surgical plan specific to that patient's anatomy. During surgery, the robotic arm guides Dr. Dubay's movements to within a fraction of a millimetre, ensuring the implant is positioned exactly as planned. This level of precision is simply not achievable by hand alone, no matter how experienced the surgeon. The robot does not perform the surgery independently — Dr. Dubay is in complete control throughout. The robotic system acts as an intelligent assistant that prevents any movement outside the pre-planned boundaries, protecting the surrounding healthy tissue and ligaments from unnecessary damage. This results in a knee that feels more natural, lasts longer, and allows patients to return to activity faster than with traditional surgery.",
    },
    howPerformed: {
      heading: 'How Dr. Dubay Performs Robotic Knee Replacement',
      steps: [
        'Pre-operative CT scan is taken to create a precise 3D model of your knee joint',
        'Dr. Dubay creates a personalised surgical plan using specialised software based on your anatomy',
        'On surgery day, you receive anaesthesia and the knee is prepared',
        'Small bone trackers are attached to guide the robotic system during surgery',
        'The robotic arm assists Dr. Dubay in removing damaged bone and cartilage with millimetre precision',
        'The implant components are positioned exactly as planned — the robot ensures no deviation',
        "Dr. Dubay checks the knee's movement, balance, and stability before closing",
        "You begin physiotherapy within 24 hours using Dr. Dubay's Zero technique for fast-track recovery",
      ],
    },
    benefits: {
      heading: 'Benefits of Robotic Knee Replacement',
      items: [
        { icon: '🎯', title: 'Unmatched Precision', description: "Implant placement accurate to within 1mm — significantly better than traditional surgery" },
        { icon: '🦴', title: 'Bone Preservation', description: "Only the minimum necessary bone is removed, preserving more of the patient's natural structure" },
        { icon: '⚡', title: 'Faster Recovery', description: 'Patients typically walk within 24 hours and leave hospital in 3 days' },
        { icon: '😌', title: 'Less Post-Op Pain', description: 'Precise cuts mean less trauma to surrounding tissue, resulting in significantly less pain' },
        { icon: '🏃', title: 'More Natural Feeling Knee', description: 'Better alignment means the replaced knee feels and moves more like a natural knee' },
        { icon: '📅', title: 'Longer Implant Life', description: 'Correctly aligned implants wear more evenly, potentially lasting 20-25 years or more' },
      ],
    },
    whyDrDubay: [
      'Forbes World Record holder for most joint replacement surgeries in a single day',
      'Over 35,000 successful knee and hip replacement surgeries performed',
      "Pioneer of the Zero technique — patients walking within 24 hours of surgery",
      'Advanced training in computer navigation and robotic surgery techniques',
      'Awarded for Excellence in Joint Replacement by the Health Minister of Rajasthan for 3 consecutive years',
      'Recognised as Most Trusted Joint Replacement Surgeon of North India by the Central Health Minister',
      'UK Honour Recognition for outstanding contributions to orthopaedic surgery',
      "Operating at Shalby Hospital — one of India's premier orthopaedic facilities",
    ],
    candidateFor: {
      heading: 'Are You a Candidate for Robotic Knee Replacement?',
      symptoms: [
        'Severe knee pain that prevents daily activities like walking, climbing stairs, or getting up from a chair',
        'Knee pain that persists even while resting or at night',
        'Knee stiffness that makes it difficult to bend or straighten the leg',
        'Significant swelling around the knee that does not respond to medication',
        'Knee deformity — the knee bowing inward or outward',
        'Failed response to non-surgical treatments including physiotherapy, medication, and injections',
        'Knee arthritis confirmed on X-ray showing severe joint space narrowing',
      ],
      notIdeal: [
        'Active infection in or around the knee',
        'Severe osteoporosis making bone too weak to anchor implants',
        'Significant health conditions making surgery high risk',
      ],
    },
    recovery: {
      heading: 'Recovery Timeline After Robotic Knee Replacement',
      timeline: [
        { period: 'Day 1', title: 'Standing and Walking', description: "With Dr. Dubay's Zero technique, most patients stand and take their first steps with support within 24 hours of surgery. Pain is managed effectively with modern protocols." },
        { period: 'Days 2-4', title: 'Hospital Stay', description: 'Physiotherapy begins in earnest. Patients practice walking with a frame, climbing a few stairs, and basic knee exercises. Most are discharged by day 3-4.' },
        { period: 'Weeks 1-3', title: 'Home Recovery', description: 'Continue physiotherapy at home. Walking distances increase daily. Pain reduces significantly. Most patients stop needing strong pain medication by end of week 2.' },
        { period: 'Month 1-2', title: 'Increasing Independence', description: 'Most patients can walk without a frame, manage household activities, and sit comfortably. Driving is typically possible by 6 weeks.' },
        { period: 'Month 3', title: 'Near Normal Activity', description: 'Most patients report 80-90% improvement. Walking on uneven ground, light climbing, and most daily activities are comfortable.' },
        { period: 'Month 6+', title: 'Full Recovery', description: 'Complete recovery achieved for most patients. Walking, climbing, travel, and most physical activities are comfortable. The robotic implant is designed to last 20-25 years.' },
      ],
    },
    faqs: [
      { q: 'Is robotic knee replacement better than traditional surgery?', a: "Robotic surgery offers significantly higher precision in implant placement compared to traditional techniques. Studies show that robotic-assisted surgery results in more accurate alignment, less blood loss, less soft tissue damage, and faster recovery. However, the outcome also depends greatly on the surgeon's experience. Dr. Dubay combines advanced robotic technology with over 35,000 surgeries of experience for the best possible outcome." },
      { q: 'Is the robot doing my surgery or is Dr. Dubay?', a: "Dr. Dubay is performing your surgery throughout. The robotic system is an advanced tool that assists him — similar to how GPS assists a skilled driver. The robot cannot operate independently. Dr. Dubay makes all surgical decisions; the robot helps execute them with extraordinary precision." },
      { q: 'How long does robotic knee replacement surgery take?', a: 'Robotic knee replacement typically takes 60-90 minutes per knee. The robotic planning adds a small amount of preparation time but significantly improves the precision of the actual surgery.' },
      { q: 'When can I walk after robotic knee replacement?', a: "With Dr. Dubay's Zero technique fast-track rehabilitation protocol, most patients stand and walk with support within 24 hours of surgery. By day 3-4, most patients are walking the hospital corridor independently with a frame." },
      { q: 'Is robotic knee replacement covered by insurance?', a: "Most health insurance policies cover knee replacement surgery. Whether robotic specifically is covered depends on your individual policy. Dr. Dubay's team assists with all insurance paperwork and TPA pre-authorisation. Call +91-8955373205 for insurance-related queries." },
      { q: 'How long does a robotic knee implant last?', a: 'Robotic knee implants, being more precisely placed, experience more even wear over time. Modern implants placed with robotic assistance are designed to last 20-25 years or more with appropriate care and physiotherapy.' },
      { q: 'What is the difference between robotic and computer navigation surgery?', a: 'Computer navigation uses sensors and a computer to guide the surgeon but does not involve a robotic arm. Robotic surgery uses an actual robotic arm that physically assists and constrains movement within planned boundaries. Both are superior to traditional surgery; robotic surgery is generally considered more advanced.' },
      { q: 'Can both knees be replaced robotically at the same time?', a: "Yes, bilateral robotic knee replacement (both knees at once) is possible for suitable patients. Dr. Dubay evaluates each patient's overall health, cardiac function, and fitness before recommending bilateral surgery. It has the advantage of a single recovery period." },
    ],
    relatedProcedures: ['computer-navigation-surgery', 'knee-replacement-surgery', 'zero-technique-knee-replacement', 'minimally-invasive-surgery'],
    schema: {
      procedureName: 'Robotic Knee Replacement Surgery',
      description: 'Robotic-assisted total knee replacement surgery performed by Dr. Dheeraj Dubay at Shalby Hospital Jaipur using advanced robotic technology for precise implant placement.',
      bodyLocation: 'Knee',
      followup: 'Physiotherapy begins day 1. Follow-up at 2 weeks, 6 weeks, 3 months, 6 months, and annually thereafter.',
      preparation: 'Pre-operative CT scan, blood tests, anaesthesia assessment, cessation of blood thinners if applicable.',
      howPerformed: 'Robotic-arm assisted surgery with CT-based 3D planning. General or spinal anaesthesia. Hospital stay 3-4 days.',
    },
  },
  {
    slug: 'knee-replacement-surgery',
    title: 'Total Knee Replacement',
    h1: 'Total Knee Replacement Surgery in Jaipur',
    metaTitle: 'Total Knee Replacement Surgery Jaipur — Dr. Dheeraj Dubay | 35,000+ Surgeries',
    metaDescription: 'Expert total knee replacement surgery in Jaipur by Dr. Dheeraj Dubay. Forbes World Record holder with 35,000+ successful surgeries. Walk within 24 hours. Book today.',
    category: 'Joint Replacement',
    intro: 'Total knee replacement is one of the most successful surgical procedures in modern medicine, with over 95% of patients reporting significant pain relief and improved mobility. Dr. Dheeraj Dubay has performed over 35,000 knee replacement surgeries at Shalby Hospital Jaipur, making him one of the highest-volume knee replacement surgeons in India. His pioneering Zero technique allows most patients to walk within 24 hours of surgery.',
    whatIsIt: {
      heading: 'What is Total Knee Replacement Surgery?',
      content: "Total knee replacement, also called total knee arthroplasty, is a surgical procedure where the damaged surfaces of the knee joint are removed and replaced with artificial components made of metal alloy, high-grade plastic, and sometimes ceramic. The surgery addresses the three compartments of the knee — the inner side (medial), outer side (lateral), and the kneecap (patella). The artificial components replicate the natural curves and movements of the knee, eliminating the bone-on-bone contact that causes severe pain in advanced arthritis. Modern knee implants are engineered to last 20-25 years and allow patients to resume activities including walking, swimming, cycling, and travel. The procedure has been performed for over 40 years and is considered one of the most reliable and predictable surgeries in all of medicine.",
    },
    howPerformed: {
      heading: 'How Dr. Dubay Performs Total Knee Replacement',
      steps: [
        "General or spinal anaesthesia is administered — Dr. Dubay's team recommends the safest option for each patient",
        'A small incision is made at the front of the knee to access the joint',
        'Damaged cartilage and bone surfaces are precisely removed using specialised instruments',
        'Metal components are fitted to the end of the thigh bone (femur) and top of the shin bone (tibia)',
        'A plastic spacer is inserted between the metal components to create a smooth gliding surface',
        'The kneecap surface is resurfaced if needed to reduce friction',
        'Dr. Dubay tests the knee through its full range of motion to verify stability and alignment',
        'The incision is closed and a dressing applied — no drains in most cases',
        'Physiotherapy begins within hours using the Zero technique fast-track protocol',
      ],
    },
    benefits: {
      heading: 'Benefits of Total Knee Replacement',
      items: [
        { icon: '😌', title: 'Complete Pain Relief', description: 'Over 95% of patients report dramatic pain reduction — many describe it as life-changing' },
        { icon: '🚶', title: 'Restored Mobility', description: 'Walk freely, climb stairs, and resume daily activities that arthritis had made impossible' },
        { icon: '😴', title: 'Sleep Without Pain', description: 'Night pain — one of the most debilitating aspects of arthritis — resolves completely' },
        { icon: '💊', title: 'End Medication Dependency', description: 'Stop relying on painkillers, anti-inflammatories, and injections that only mask symptoms' },
        { icon: '📅', title: '20-25 Year Implant Life', description: 'Modern implants are designed to last decades with appropriate care' },
        { icon: '🧠', title: 'Better Mental Health', description: 'Freedom from chronic pain dramatically improves quality of life, mood, and independence' },
      ],
    },
    whyDrDubay: [
      'Forbes World Record — most joint replacement surgeries performed in a single day (34 surgeries)',
      '35,000+ successful knee replacement surgeries — among the highest volumes in India',
      'Pioneer of the Zero technique — fast-track rehabilitation getting patients walking in 24 hours',
      'Expertise in computer navigation and robotic-assisted surgery for superior precision',
      'Training in Germany (FJRS fellowship) in advanced joint replacement techniques',
      'Awarded by Health Minister of Rajasthan for Excellence in Joint Replacement — 3 consecutive years',
      'Recognised as Most Trusted Joint Replacement Surgeon of North India',
      'UK Honour Recognition for outstanding contributions to orthopaedic surgery',
    ],
    candidateFor: {
      heading: 'Who Needs Total Knee Replacement?',
      symptoms: [
        'Severe knee pain that limits daily activities — walking, climbing stairs, sitting and standing',
        'Knee pain that continues at rest or wakes you at night',
        'Chronic knee swelling that does not respond to medication',
        'Knee stiffness making it impossible to fully bend or straighten the leg',
        'Knee deformity — bowing inward or outward',
        'Failed non-surgical treatment including physiotherapy, medication, and cortisone injections',
        'Significant reduction in quality of life due to knee pain',
      ],
      notIdeal: [
        'Active infection in the knee or body',
        'Insufficient bone quality to support the implant',
        'Serious cardiovascular or respiratory conditions making surgery high risk',
      ],
    },
    recovery: {
      heading: 'Recovery After Total Knee Replacement',
      timeline: [
        { period: 'Day 1', title: 'First Steps', description: 'Zero technique protocol begins immediately. Most patients sit at the edge of the bed and take first steps within 12-24 hours. Pain management ensures comfort throughout.' },
        { period: 'Days 2-4', title: 'Active Physiotherapy', description: 'Walking with a frame, stair practice, and knee exercises. Swelling is managed with ice and elevation. Most patients discharge on day 3 or 4.' },
        { period: 'Weeks 2-4', title: 'Growing Strength', description: 'Walking distances increase daily. Physiotherapy continues at home or outpatient clinic. Most patients reduce pain medication significantly by week 3.' },
        { period: 'Month 6', title: 'Back to Normal', description: 'Driving (6 weeks), walking freely (8 weeks), climbing stairs (6 weeks), light physical activity (3 months), near-complete recovery by month 6.' },
        { period: 'Year 1', title: 'Full Recovery', description: 'Complete recovery for the vast majority of patients. Walking, travel, social activities, and most physical pursuits are comfortable and pain-free.' },
        { period: 'Years 20+', title: 'Long-Term Success', description: 'With appropriate care and physiotherapy, modern knee implants function effectively for 20-25 years or more. Regular annual reviews with Dr. Dubay ensure long-term success.' },
      ],
    },
    faqs: [
      { q: 'At what age should I consider knee replacement?', a: 'Knee replacement is recommended based on symptoms and quality of life, not age. Most patients are between 55-80 years old, but Dr. Dubay has successfully performed the procedure on patients from 40 to 90 years old. The key criteria is severity of pain and its impact on daily life, not a specific age threshold.' },
      { q: 'How long will I be in hospital after knee replacement?', a: "With Dr. Dubay's Zero technique fast-track protocol, most patients are discharged within 3-4 days of surgery. Some patients with straightforward cases and strong home support may be discharged in 2 days. The short stay does not mean you are rushed — it reflects the advanced recovery protocols used." },
      { q: 'Is knee replacement surgery painful?', a: 'Modern pain management means most patients experience much less discomfort than expected. A combination of nerve blocks, spinal anaesthesia, oral medications, and physiotherapy techniques keeps pain well controlled. Most patients describe the experience as far more comfortable than they anticipated.' },
      { q: 'Can I have both knees replaced at the same time?', a: "Yes, bilateral knee replacement (both knees in one operation) is possible for suitable patients. Dr. Dubay evaluates each patient's overall health before recommending this approach. The advantage is one recovery period instead of two. For patients who are medically fit, it is a safe and efficient option." },
      { q: 'How successful is knee replacement surgery?', a: "Total knee replacement has one of the highest success rates of any surgical procedure. Over 95% of patients report significant pain relief and improved function. Dr. Dubay's personal success rate across 35,000+ surgeries reflects a lifetime of specialisation in this single procedure." },
      { q: 'When can I drive after knee replacement?', a: "Most patients can drive again approximately 6 weeks after surgery, once they have sufficient muscle strength and reflexes to operate the vehicle safely. Dr. Dubay's team will advise based on your individual recovery progress." },
      { q: 'Will the knee feel completely natural after surgery?', a: 'Most patients describe the replaced knee as feeling very comfortable and allowing normal movement. Some patients notice a slight difference from a natural knee, particularly in very deep bending. However, the dramatic reduction in pain means the vast majority consider the outcome excellent or very good.' },
      { q: 'Is knee replacement covered by insurance?', a: "Yes, knee replacement surgery is covered by most health insurance policies in India. Dr. Dubay's team handles all TPA paperwork and pre-authorisation. Government employees under CGHS, RGHS, and ESI are also covered. Contact +91-8955373205 for insurance guidance." },
    ],
    relatedProcedures: ['robotic-knee-replacement', 'computer-navigation-surgery', 'zero-technique-knee-replacement', 'bilateral-knee-replacement', 'partial-knee-replacement'],
    schema: {
      procedureName: 'Total Knee Replacement Surgery',
      description: 'Total knee arthroplasty performed by Dr. Dheeraj Dubay at Shalby Hospital Jaipur replacing damaged knee joint surfaces with precision-engineered artificial components.',
      bodyLocation: 'Knee',
      followup: 'Physiotherapy from day 1. Review at 2 weeks, 6 weeks, 3 months, 6 months, 1 year, then annually.',
      preparation: 'Blood tests, ECG, anaesthesia assessment, cessation of blood thinners, dental clearance if required.',
      howPerformed: 'Open surgery under general or spinal anaesthesia. Damaged surfaces removed and replaced with metal and plastic implants. Hospital stay 3-4 days.',
    },
  },
  {
    slug: 'hip-replacement-surgery',
    title: 'Total Hip Replacement',
    h1: 'Total Hip Replacement Surgery in Jaipur',
    metaTitle: 'Total Hip Replacement Surgery Jaipur — Dr. Dheeraj Dubay',
    metaDescription: 'Expert hip replacement surgery in Jaipur by Dr. Dheeraj Dubay. Minimally invasive techniques, fast recovery, 35,000+ surgeries. Book consultation today.',
    category: 'Joint Replacement',
    intro: 'Hip replacement surgery restores freedom of movement and eliminates the debilitating pain of advanced hip arthritis, avascular necrosis, or hip fractures. Dr. Dheeraj Dubay performs total hip replacement using the latest minimally invasive techniques at Shalby Hospital Jaipur, helping patients from across Rajasthan and North India return to active, pain-free lives.',
    whatIsIt: {
      heading: 'What is Total Hip Replacement?',
      content: "Total hip replacement, also called total hip arthroplasty, is a surgical procedure where the damaged ball-and-socket hip joint is replaced with artificial components. The ball at the top of the thigh bone (femoral head) is replaced with a metal or ceramic ball attached to a metal stem inserted into the thigh bone. The socket in the pelvis (acetabulum) is replaced with a metal cup lined with a smooth plastic or ceramic surface. Together, these components replicate the natural hip joint, eliminating the pain caused by bone-on-bone contact, damaged cartilage, or structural abnormality. Hip replacement has been performed for over 50 years and is one of the most reliably successful operations in all of medicine. Over 90% of patients report excellent outcomes and return to full daily activities within 3-6 months.",
    },
    howPerformed: {
      heading: 'How Dr. Dubay Performs Hip Replacement',
      steps: [
        'General or spinal anaesthesia is administered based on patient health and preference',
        'A small incision is made at the side or back of the hip — Dr. Dubay uses minimally invasive approaches where possible',
        'The damaged femoral head (ball) is carefully removed',
        'The hip socket is prepared and a metal cup is precisely positioned and secured',
        'The femoral stem is inserted into the thigh bone and a new metal or ceramic ball is attached',
        'Stability and range of motion are tested through full movement of the hip',
        'The incision is closed — typically with dissolving stitches',
        'Fast-track rehabilitation begins within hours of surgery',
      ],
    },
    benefits: {
      heading: 'Benefits of Hip Replacement Surgery',
      items: [
        { icon: '😌', title: 'Total Pain Relief', description: 'Hip pain that prevented walking, dressing, or sleeping resolves completely for over 90% of patients' },
        { icon: '🚶', title: 'Walk Normally Again', description: 'Most patients walk freely and without a limp within weeks of surgery' },
        { icon: '🌙', title: 'Sleep Through the Night', description: 'Night hip pain — a hallmark of advanced hip arthritis — disappears completely' },
        { icon: '✈️', title: 'Travel and Explore', description: 'Long journeys, pilgrimages, and travel that were impossible become achievable again' },
        { icon: '💊', title: 'Stop Painkillers', description: 'End the cycle of injections, anti-inflammatories, and medications that only provide temporary relief' },
        { icon: '🧘', title: 'Independence Restored', description: 'Dress, bathe, and manage daily life without depending on family members for basic tasks' },
      ],
    },
    whyDrDubay: [
      'Specialist in both knee and hip replacement with equal expertise in both procedures',
      'Minimally invasive hip replacement techniques reducing blood loss and recovery time',
      'Over 464 hip replacement surgeries performed with excellent outcomes',
      'Training in advanced hip replacement techniques including FJRS fellowship in Germany',
      'Expertise in treating complex cases including avascular necrosis, post-trauma, and revision surgery',
      'Forbes World Record holder and multiple national award recipient for surgical excellence',
    ],
    candidateFor: {
      heading: 'Who Needs Hip Replacement?',
      symptoms: [
        'Severe hip pain that limits walking — even short distances become difficult',
        'Hip pain at rest, especially at night disrupting sleep',
        'Stiffness making it impossible to put on shoes, socks, or cut toenails',
        'A limp when walking due to hip pain',
        'Hip pain that failed to respond to physiotherapy, medication, and injections',
        'Avascular necrosis (bone death) of the hip caused by steroids, alcohol, or injury',
        'Hip fracture — particularly in elderly patients where replacement gives faster recovery than fixation',
      ],
      notIdeal: [
        'Active infection in or near the hip joint',
        'Severe osteoporosis making bone fixation unreliable',
        'Significant obesity increasing surgical and recovery risks',
      ],
    },
    recovery: {
      heading: 'Recovery After Hip Replacement',
      timeline: [
        { period: 'Day 1', title: 'First Steps', description: 'Most patients sit out of bed and walk short distances with a frame within 24 hours. The hip feels surprisingly functional even on day one.' },
        { period: 'Days 3-5', title: 'Hospital Discharge', description: 'Walking independently with a frame or crutches, managing stairs, and comfortable enough to go home. Most patients are discharged in 3-5 days.' },
        { period: 'Weeks 2-6', title: 'Increasing Mobility', description: 'Walking distances increase significantly each week. Hip precautions (avoiding extreme positions) are maintained. Physiotherapy continues.' },
        { period: 'Month 3', title: 'Near Normal Life', description: 'Driving (6 weeks), walking freely (8 weeks), shopping, outings, and most daily activities are comfortable. The limp resolves as strength builds.' },
        { period: 'Month 6', title: 'Full Recovery', description: 'Complete recovery for most patients. Walking long distances, travel, temple visits, and social activities are fully achievable.' },
        { period: 'Years 20+', title: 'Long-Term Success', description: 'Modern hip implants are engineered to last 20-25 years. Annual reviews ensure early detection of any wear. Many patients never need a second operation.' },
      ],
    },
    faqs: [
      { q: 'How long does hip replacement surgery take?', a: "Total hip replacement typically takes 60-90 minutes. Dr. Dubay's extensive experience means the surgery is performed efficiently with minimal operative time, which directly reduces anaesthesia exposure and surgical risks." },
      { q: 'What causes hip joint failure requiring replacement?', a: "The most common causes are osteoarthritis (wear and tear), rheumatoid arthritis, avascular necrosis (bone death due to reduced blood supply), hip fracture in elderly patients, and developmental hip dysplasia. Dr. Dubay assesses each case individually to recommend the most appropriate treatment." },
      { q: 'Will I need a walking aid permanently after hip replacement?', a: 'No. Most patients use a walking frame for 1-2 weeks, crutches for 2-4 weeks, and then a single stick for another 2-4 weeks. The majority of patients walk without any aid by 6-8 weeks after surgery.' },
      { q: 'Can I sit cross-legged after hip replacement?', a: "Sitting cross-legged (on the floor) is generally not recommended after hip replacement as it places the hip in a position that can risk dislocation. However, most activities — walking, climbing stairs, using a regular chair, and travelling — are fully achievable and comfortable." },
      { q: 'Is hip replacement safe for elderly patients?', a: "Hip replacement is routinely and successfully performed in patients in their 70s, 80s, and even 90s. A thorough pre-operative assessment ensures surgery is safe for each individual. For elderly patients with hip fractures, hip replacement often gives faster mobilisation and better outcomes than fracture fixation." },
      { q: 'How do I know if I need hip or knee replacement?', a: "Dr. Dubay evaluates the location and nature of your pain carefully. Hip joint pain typically radiates to the groin, inner thigh, or buttock. Knee pain is more localised around the knee. An X-ray and clinical examination by Dr. Dubay will confirm which joint requires treatment." },
    ],
    relatedProcedures: ['knee-replacement-surgery', 'robotic-knee-replacement', 'minimally-invasive-surgery', 'revision-knee-replacement'],
    schema: {
      procedureName: 'Total Hip Replacement Surgery',
      description: 'Total hip arthroplasty performed by Dr. Dheeraj Dubay at Shalby Hospital Jaipur replacing the damaged hip joint with precision-engineered artificial components.',
      bodyLocation: 'Hip',
      followup: 'Physiotherapy from day 1. Review at 6 weeks, 3 months, 6 months, 1 year, then annually.',
      preparation: 'Blood tests, cardiac evaluation, anaesthesia assessment, dental clearance.',
      howPerformed: 'Minimally invasive approach under general or spinal anaesthesia. Hospital stay 3-5 days.',
    },
  },
  {
    slug: 'computer-navigation-surgery',
    title: 'Computer Navigation Surgery',
    h1: 'Computer Navigation Knee Replacement Surgery in Jaipur',
    metaTitle: 'Computer Navigation Knee Replacement Jaipur — Dr. Dheeraj Dubay',
    metaDescription: 'Computer navigation guided knee replacement surgery in Jaipur by Dr. Dheeraj Dubay. Advanced technology for precise implant placement. 35,000+ surgeries. Book today.',
    category: 'Advanced Procedure',
    intro: 'Computer navigation surgery uses sophisticated sensor technology and real-time computer guidance to help Dr. Dubay achieve precise implant alignment during knee replacement. This technology eliminates the guesswork from implant positioning, resulting in better long-term outcomes and more natural-feeling knees for patients.',
    whatIsIt: {
      heading: 'What is Computer Navigation Surgery?',
      content: "Computer navigation surgery, also called computer-assisted surgery (CAS), uses a specialised computer system with infrared sensors and trackers attached to the patient's bones during surgery. The system creates a real-time map of the patient's knee and tracks the surgical instruments continuously. As Dr. Dubay performs each step, the computer provides immediate feedback on the alignment, rotation, and balance of the implant components. This allows adjustments to be made during surgery rather than after, ensuring the final implant position is optimal for that specific patient's anatomy. Studies consistently show that computer navigation improves implant alignment accuracy from approximately 70-75% (with traditional surgery) to over 95%. Better alignment means more natural knee movement, more even wear on the implant surfaces, and potentially longer implant life.",
    },
    howPerformed: {
      heading: 'How Computer Navigation Works During Surgery',
      steps: [
        'Small bone trackers are attached to the thigh bone and shin bone through tiny incisions',
        "The computer system is calibrated to the patient's specific knee anatomy",
        'As Dr. Dubay works, infrared sensors track every movement of the surgical instruments in real time',
        'The computer screen shows precise measurements of alignment, rotation, and balance',
        'Bone cuts are made with continuous computer feedback ensuring optimal angles',
        'Implant components are tested virtually on the computer before final placement',
        'Final implant position is confirmed by the navigation system before the incision is closed',
        'Bone trackers are removed and wounds are closed',
      ],
    },
    benefits: {
      heading: 'Benefits of Computer Navigation Surgery',
      items: [
        { icon: '📐', title: 'Precise Alignment', description: 'Over 95% alignment accuracy versus 70-75% with traditional surgery' },
        { icon: '🦴', title: 'No Intramedullary Rods', description: 'Eliminates the need for rods inserted into the thigh bone, reducing blood loss and fat embolism risk' },
        { icon: '⏱️', title: 'Real-Time Feedback', description: 'Dr. Dubay sees exact measurements throughout surgery and can make adjustments before closing' },
        { icon: '📅', title: 'Longer Implant Life', description: 'Properly aligned implants wear more evenly, potentially lasting 20-25 years or more' },
        { icon: '🧬', title: 'Patient-Specific Planning', description: "The system adapts to each patient's unique anatomy rather than using average measurements" },
        { icon: '💉', title: 'Reduced Blood Loss', description: 'More precise cuts mean less bone and tissue disruption, resulting in less bleeding' },
      ],
    },
    whyDrDubay: [
      'Trained and experienced in computer navigation surgery techniques',
      'Uses navigation for complex cases where standard techniques carry higher risk of misalignment',
      'Combines navigation technology with Zero technique for optimal precision and fast recovery',
      'One of limited surgeons in Rajasthan with advanced computer navigation expertise',
      '35,000+ surgeries provide the baseline experience that makes technology use most effective',
    ],
    candidateFor: {
      heading: 'Who Benefits Most from Computer Navigation?',
      symptoms: [
        'Patients with significant knee deformity (severe varus or valgus alignment)',
        'Younger patients (under 65) where implant longevity is particularly important',
        'Patients with complex anatomy that makes standard techniques less reliable',
        'Patients who have had previous knee surgery making standard alignment difficult',
        'Patients with osteoporosis where bone quality makes standard rod insertion risky',
      ],
      notIdeal: [
        'Very straightforward cases where navigation adds time without significant benefit',
        'Patients unable to tolerate the small additional surgical time required for tracker placement',
      ],
    },
    recovery: {
      heading: 'Recovery After Computer Navigation Surgery',
      timeline: [
        { period: 'Day 1', title: 'Same as Standard Protocol', description: "Recovery begins with Dr. Dubay's Zero technique — walking within 24 hours. Computer navigation does not extend recovery time." },
        { period: 'Week 1-2', title: 'Home Recovery', description: 'Walking with a frame, physiotherapy exercises, pain well controlled. Small additional wounds from tracker sites heal quickly.' },
        { period: 'Month 1-3', title: 'Normal Recovery', description: 'Recovery follows the same timeline as standard knee replacement. The benefit of navigation is seen in the long-term — better alignment means better long-term function.' },
        { period: 'Year 1-20+', title: 'Long-Term Benefit', description: 'The precision of navigation shows in the long term — more natural knee movement, less wear, and potentially longer implant life.' },
      ],
    },
    faqs: [
      { q: 'What is the difference between computer navigation and robotic surgery?', a: "Computer navigation uses sensors and a computer screen to guide the surgeon but the surgeon's hands perform all movements freely. Robotic surgery uses an actual robotic arm that physically assists and constrains movement within pre-planned boundaries. Both are superior to traditional surgery — robotic surgery is generally considered more advanced and precise." },
      { q: 'Does computer navigation make the surgery safer?', a: 'Computer navigation significantly improves implant alignment accuracy and reduces the risk of misalignment. It also eliminates the need for intramedullary rods in the thigh bone, which reduces blood loss and fat embolism risk. These factors collectively make the procedure safer and more reliable.' },
      { q: 'Is computer navigation surgery available in Jaipur?', a: "Yes, Dr. Dheeraj Dubay offers computer navigation surgery at Shalby Hospital, Jaipur. Dr. Dubay is one of a limited number of surgeons in Rajasthan with training and experience in this advanced technique." },
      { q: 'Does navigation surgery take longer?', a: 'Computer navigation adds approximately 15-20 minutes to the procedure for tracker placement and calibration. However, this additional time is well justified by the significant improvement in implant alignment that results.' },
    ],
    relatedProcedures: ['robotic-knee-replacement', 'knee-replacement-surgery', 'zero-technique-knee-replacement'],
    schema: {
      procedureName: 'Computer Navigation Knee Replacement',
      description: 'Computer-assisted total knee replacement surgery using real-time navigation technology for precise implant placement.',
      bodyLocation: 'Knee',
      followup: 'Same as standard knee replacement — physiotherapy from day 1.',
      preparation: 'Same as standard knee replacement.',
      howPerformed: 'Sensor-guided surgery with real-time computer feedback. Hospital stay 3-4 days.',
    },
  },
  {
    slug: 'zero-technique-knee-replacement',
    title: 'Zero Technique Knee Replacement',
    h1: 'Zero Technique Knee Replacement — Walk in 24 Hours',
    metaTitle: "Zero Technique Knee Replacement Jaipur — Dr. Dheeraj Dubay | Walk in 24 Hours",
    metaDescription: "Dr. Dheeraj Dubay's pioneering Zero technique knee replacement allows patients to walk within 24 hours of surgery. Fast-track rehabilitation. 35,000+ surgeries. Book today.",
    category: 'Signature Technique',
    intro: "The Zero technique is Dr. Dheeraj Dubay's pioneering approach to knee replacement rehabilitation — a fast-track protocol that gets patients walking within 24 hours of surgery. While traditional knee replacement required weeks of bed rest, Dr. Dubay's Zero technique combines advanced surgical methods, modern pain management, and immediate physiotherapy to dramatically accelerate recovery without compromising safety.",
    whatIsIt: {
      heading: 'What is the Zero Technique?',
      content: "The Zero technique is not just about surgery — it is a complete perioperative protocol that begins before the operation and continues through recovery. The name refers to the near-zero delay between surgery and mobilisation. Conventionally, patients rested for several days after knee replacement before beginning to walk. Dr. Dubay recognised that early movement is not only safe but actively beneficial — it prevents blood clots, reduces swelling, speeds muscle recovery, and significantly shortens the total recovery timeline. The Zero technique combines multimodal pain management (using several different pain-control methods simultaneously to minimise opioid use), precise surgical technique that minimises tissue disruption, pre-operative patient preparation including exercises and education, and an aggressive but carefully supervised physiotherapy protocol beginning within hours of surgery. The result is patients who walk on day one, go home in 3 days, and return to independence far faster than with traditional approaches.",
    },
    howPerformed: {
      heading: 'The Zero Technique Protocol — Step by Step',
      steps: [
        'Pre-operative preparation: patient education, exercises to build muscle strength, and medical optimisation',
        'Advanced anaesthetic technique: nerve blocks and spinal anaesthesia reducing post-operative pain dramatically',
        'Surgical precision: minimising blood loss and tissue trauma during the replacement procedure',
        'No drain tubes: avoiding drains which restrict early movement',
        'Immediate pain management: multimodal protocol using nerve blocks, oral medications, and local infiltration',
        'Standing within 6-8 hours: patient sits at bedside and performs ankle exercises',
        'Walking day 1: physiotherapist supervises first steps with a frame within 12-24 hours',
        'Progressive mobilisation: increasing walking distances, stair practice, and independence each day',
        'Discharge day 3-4: home with a physiotherapy programme, phone support, and follow-up appointment',
      ],
    },
    benefits: {
      heading: 'Why the Zero Technique Changes Everything',
      items: [
        { icon: '⚡', title: 'Walk in 24 Hours', description: 'Most patients take their first steps within 12-24 hours of surgery — not days or weeks later' },
        { icon: '🏠', title: 'Home in 3-4 Days', description: 'Short hospital stay reduces cost, reduces infection risk, and gets patients back to their own environment faster' },
        { icon: '🩸', title: 'Fewer Complications', description: 'Early movement dramatically reduces blood clot risk — one of the most serious post-operative complications' },
        { icon: '💊', title: 'Less Pain Medication', description: 'Multimodal pain management means less reliance on opioid painkillers, reducing side effects' },
        { icon: '💪', title: 'Faster Muscle Recovery', description: 'Early use prevents muscle wasting — patients regain strength weeks faster than with bed rest protocols' },
        { icon: '🧠', title: 'Better Psychological Recovery', description: 'Walking on day one gives patients confidence and significantly reduces post-operative anxiety and depression' },
      ],
    },
    whyDrDubay: [
      'Dr. Dubay developed and pioneered the Zero technique through years of research and refinement',
      'The technique has been applied across 35,000+ surgeries with outstanding safety record',
      "Zero technique is now the standard protocol at Dr. Dubay's clinic for all suitable patients",
      'Combines surgical skill with physiotherapy expertise and pain management innovation',
      "Results have been recognised nationally — contributing to Dr. Dubay's multiple excellence awards",
    ],
    candidateFor: {
      heading: 'Who Can Benefit from Zero Technique?',
      symptoms: [
        'Most patients undergoing primary (first-time) knee replacement are suitable',
        'Patients who are medically stable without serious heart, lung, or kidney conditions',
        'Patients with sufficient home support for the first 2 weeks after discharge',
        'Patients motivated to participate actively in physiotherapy from day one',
        'Patients who want the shortest possible recovery timeline',
      ],
      notIdeal: [
        'Patients with very poor pre-operative mobility making early physiotherapy difficult',
        'Patients with significant cardiac or respiratory conditions requiring more cautious mobilisation',
        'Patients undergoing complex revision surgery where more conservative recovery is appropriate',
      ],
    },
    recovery: {
      heading: 'Zero Technique Recovery Timeline',
      timeline: [
        { period: 'Hours 6-12', title: 'Sitting and Ankle Exercises', description: 'Patient sits at the bedside and begins ankle pumping exercises. Pain is well controlled.' },
        { period: 'Day 1', title: 'First Walk', description: 'Supervised first steps with a walking frame. Most patients walk 10-20 metres. A major psychological milestone.' },
        { period: 'Day 2-3', title: 'Stair Practice and Confidence', description: 'Walking distances increase. Stair practice begins. Preparing for home discharge.' },
        { period: 'Day 3-4', title: 'Home Discharge', description: 'Discharged with walking frame, oral pain medication, and a home physiotherapy programme.' },
        { period: 'Week 2-4', title: 'Rapid Progress', description: 'Walking distances increase significantly each day. Most patients stop using the frame by week 3.' },
        { period: 'Month 1-3', title: 'Full Independence', description: 'Driving, shopping, managing household tasks, and social activities all become achievable well before conventional protocols would allow.' },
      ],
    },
    faqs: [
      { q: 'Is it really safe to walk the day after knee replacement?', a: "Yes — and it is not just safe, it is beneficial. Decades of research confirm that early mobilisation after knee replacement reduces blood clot risk, accelerates muscle recovery, reduces swelling, and improves overall outcomes. The Zero technique has been applied in thousands of Dr. Dubay's surgeries with an excellent safety record." },
      { q: 'Will I feel too much pain to walk on day one?', a: 'Modern multimodal pain management ensures pain is well controlled from the moment you wake from surgery. A combination of nerve blocks, spinal anaesthesia effects, oral medications, and local anaesthetic infiltration means most patients are surprised by how comfortable they feel. The physiotherapist will not push you beyond your comfort level.' },
      { q: 'Is the Zero technique available for hip replacement too?', a: "Yes — fast-track rehabilitation principles apply to hip replacement as well. Dr. Dubay's hip replacement patients also begin mobilisation within 24 hours using similar early-recovery protocols." },
      { q: 'Do I need someone at home after early discharge?', a: "Yes — for the first 1-2 weeks at home, having a family member or carer available is strongly recommended. Dr. Dubay's team assesses home support as part of discharge planning. Patients without adequate home support may stay an additional day or two in hospital." },
    ],
    relatedProcedures: ['knee-replacement-surgery', 'robotic-knee-replacement', 'computer-navigation-surgery', 'minimally-invasive-surgery'],
    schema: {
      procedureName: 'Zero Technique Fast-Track Knee Replacement',
      description: "Dr. Dubay's pioneering Zero technique fast-track knee replacement rehabilitation protocol enabling patients to walk within 24 hours of surgery.",
      bodyLocation: 'Knee',
      followup: 'Day 1 physiotherapy, discharge day 3-4, review at 2 weeks, 6 weeks, 3 months, 6 months.',
      preparation: 'Pre-operative physiotherapy, patient education, medical optimisation.',
      howPerformed: 'Total knee replacement with multimodal pain management and immediate post-operative physiotherapy.',
    },
  },
  {
    slug: 'partial-knee-replacement',
    title: 'Partial Knee Replacement',
    h1: 'Partial Knee Replacement (Unicompartmental) Surgery in Jaipur',
    metaTitle: 'Partial Knee Replacement Surgery Jaipur — Dr. Dheeraj Dubay',
    metaDescription: 'Partial knee replacement (unicompartmental) surgery in Jaipur by Dr. Dheeraj Dubay. Smaller surgery, faster recovery. Suitable for early-stage knee arthritis. Book today.',
    category: 'Joint Replacement',
    intro: 'Partial knee replacement, also called unicompartmental knee arthroplasty, replaces only the damaged portion of the knee rather than the entire joint. For patients where arthritis is confined to one area of the knee, this less invasive procedure offers a smaller operation, less blood loss, faster recovery, and a more natural-feeling result than total knee replacement.',
    whatIsIt: {
      heading: 'What is Partial Knee Replacement?',
      content: "The knee joint has three compartments — the inner side (medial), outer side (lateral), and the kneecap area (patellofemoral). In many patients, arthritis affects primarily one compartment while the other areas remain relatively healthy. In these cases, replacing only the damaged compartment — a partial or unicompartmental knee replacement — is a highly effective option that preserves healthy bone and tissue. The procedure uses smaller implants, requires a smaller incision, involves less blood loss, and results in faster recovery than total knee replacement. Patients who have partial replacement also tend to report that the knee feels more natural than after total replacement, because the remaining native ligaments and joint surfaces are preserved. However, partial replacement requires careful patient selection — the arthritis must be genuinely confined to one compartment and other aspects of the knee including ligaments must be intact. Dr. Dubay carefully evaluates each patient's X-rays and MRI to determine whether partial or total replacement is more appropriate.",
    },
    howPerformed: {
      heading: 'How Partial Knee Replacement is Performed',
      steps: [
        'Spinal or general anaesthesia is administered',
        'A smaller incision than total replacement is made at the inner or outer side of the knee',
        'Only the damaged compartment is exposed — healthy areas of the knee are not disturbed',
        'Damaged bone and cartilage in the affected compartment are removed precisely',
        'Small metal components are fixed to the femur and tibia surfaces of that compartment',
        'A smooth plastic spacer is placed between the components',
        'Range of motion and stability are tested before closing',
        'Smaller incision is closed — typically faster healing than total replacement',
      ],
    },
    benefits: {
      heading: 'Advantages of Partial Knee Replacement',
      items: [
        { icon: '🏥', title: 'Smaller Operation', description: 'Less bone removed, smaller incision, less blood loss compared to total knee replacement' },
        { icon: '⚡', title: 'Faster Recovery', description: 'Most patients recover faster than after total replacement and return to activity sooner' },
        { icon: '🦿', title: 'More Natural Feel', description: 'Preserving native ligaments and healthy joint surfaces results in a more natural-feeling knee' },
        { icon: '💉', title: 'Less Blood Loss', description: 'Significantly reduced blood loss compared to total knee replacement — rarely requires transfusion' },
        { icon: '🔄', title: 'Revisable if Needed', description: 'If arthritis progresses to other compartments, conversion to total knee replacement is straightforward' },
        { icon: '🧠', title: 'Better Proprioception', description: "Preserved ligaments maintain the knee's natural sense of position and movement" },
      ],
    },
    whyDrDubay: [
      'Careful patient selection — Dr. Dubay performs partial replacement only when genuinely appropriate',
      'Experience in both partial and total replacement allows accurate comparison and recommendation',
      'Minimally invasive surgical technique for partial replacement minimising tissue disruption',
      'Expertise in converting partial to total replacement if arthritis progresses in future',
    ],
    candidateFor: {
      heading: 'Who is Suitable for Partial Knee Replacement?',
      symptoms: [
        'Arthritis confirmed on X-ray as primarily affecting one compartment of the knee',
        'Intact anterior cruciate ligament (ACL) — confirmed on MRI',
        'Pain localised to one side of the knee rather than all around',
        'Relatively normal weight — severe obesity increases conversion risk',
        'Older patients or those with lower activity demands',
      ],
      notIdeal: [
        'Arthritis affecting multiple compartments of the knee',
        'Torn or absent ACL — total replacement is more appropriate',
        'Inflammatory arthritis (rheumatoid) — total replacement is standard',
        'Severe deformity of the knee',
      ],
    },
    recovery: {
      heading: 'Recovery After Partial Knee Replacement',
      timeline: [
        { period: 'Day 1', title: 'Walking with Support', description: 'Even faster mobilisation than total replacement. Most patients walk with a frame within hours.' },
        { period: 'Day 2-3', title: 'Home Discharge', description: 'Most partial replacement patients go home in 2-3 days — earlier than total replacement.' },
        { period: 'Week 2-4', title: 'Rapid Recovery', description: 'Many patients progress faster than after total replacement. Walking without aids often achievable by week 4.' },
        { period: 'Month 2-3', title: 'Full Activity', description: 'Return to full daily activities, driving, and most physical pursuits earlier than with total replacement.' },
      ],
    },
    faqs: [
      { q: 'How do I know if I need partial or total knee replacement?', a: "Dr. Dubay determines this through a combination of your symptoms, clinical examination, X-rays, and MRI. The key factors are how many compartments of the knee are affected by arthritis and whether your knee ligaments are intact. Many patients who come expecting total replacement are found to be suitable for the less invasive partial procedure." },
      { q: 'Will I need total replacement later if I have partial now?', a: "Not necessarily — many patients with partial knee replacement never require conversion to total replacement. If arthritis does progress to other compartments of the knee over time, conversion to total replacement is a well-established procedure. The partial replacement does not make total replacement more difficult if needed in future." },
      { q: 'Is partial knee replacement as successful as total?', a: "For appropriately selected patients, partial knee replacement gives excellent results with high patient satisfaction. In fact, many patients report that partial replacement gives a more natural feeling knee than total replacement. The key is selecting the right patients — Dr. Dubay's careful evaluation ensures this." },
    ],
    relatedProcedures: ['knee-replacement-surgery', 'zero-technique-knee-replacement', 'robotic-knee-replacement'],
    schema: {
      procedureName: 'Partial Knee Replacement (Unicompartmental Arthroplasty)',
      description: 'Unicompartmental knee replacement replacing only the damaged portion of the knee joint, preserving healthy tissue.',
      bodyLocation: 'Knee',
      followup: 'Physiotherapy from day 1. Review at 2 weeks, 6 weeks, 3 months, 6 months.',
      preparation: 'X-ray, MRI to confirm suitability, blood tests, anaesthesia assessment.',
      howPerformed: 'Minimally invasive surgery under spinal or general anaesthesia. Hospital stay 2-3 days.',
    },
  },
  {
    slug: 'minimally-invasive-surgery',
    title: 'Minimally Invasive Joint Replacement',
    h1: 'Minimally Invasive Knee & Hip Replacement Surgery in Jaipur',
    metaTitle: 'Minimally Invasive Knee Replacement Jaipur — Dr. Dheeraj Dubay',
    metaDescription: 'Minimally invasive knee and hip replacement surgery in Jaipur. Smaller incisions, less pain, faster recovery. Expert surgeon Dr. Dheeraj Dubay. Book consultation.',
    category: 'Surgical Technique',
    intro: 'Minimally invasive joint replacement uses smaller incisions and refined surgical techniques to achieve the same excellent results as traditional surgery with significantly less disruption to surrounding muscles and tissues. Dr. Dheeraj Dubay is trained in minimally invasive approaches for both knee and hip replacement, giving suitable patients a faster, more comfortable recovery.',
    whatIsIt: {
      heading: 'What is Minimally Invasive Joint Replacement?',
      content: 'Traditional knee or hip replacement used a single large incision — typically 20-30 cm — to fully expose the joint. Minimally invasive techniques achieve the same procedure through incisions of 8-12 cm using specialised instruments designed to work through smaller openings. The key benefit is not just the smaller scar — it is that the surrounding muscles and soft tissues are split rather than cut, and then allowed to fall back into place naturally after surgery. This dramatically reduces post-operative pain, blood loss, and recovery time compared to traditional open techniques. Patients treated with minimally invasive approaches consistently report less pain in the first weeks after surgery, faster return to walking, and shorter hospital stays. Dr. Dubay combines minimally invasive surgical access with his Zero technique fast-track rehabilitation for the best possible outcomes.',
    },
    howPerformed: {
      heading: 'Minimally Invasive Surgical Technique',
      steps: [
        'Smaller 8-12 cm incision positioned precisely to access the joint',
        'Muscles are carefully moved aside rather than cut — reducing damage to surrounding tissue',
        'Specialised instruments allow full joint replacement through the smaller opening',
        'Bone cuts and implant placement are performed with the same precision as open surgery',
        'Navigation or robotic assistance may be used to compensate for reduced visual access',
        'Muscles fall back into natural position after implant placement',
        'Smaller incision is closed with dissolving stitches',
        'Fast-track recovery begins immediately',
      ],
    },
    benefits: {
      heading: 'Benefits of Minimally Invasive Surgery',
      items: [
        { icon: '🩹', title: 'Smaller Scar', description: 'Incision of 8-12 cm compared to 20-30 cm with traditional surgery' },
        { icon: '💉', title: 'Less Blood Loss', description: 'Reduced tissue disruption means less bleeding — rarely requires blood transfusion' },
        { icon: '😌', title: 'Less Post-Op Pain', description: 'Less muscle damage equals significantly less pain in the first weeks after surgery' },
        { icon: '⚡', title: 'Faster Recovery', description: 'Patients walk sooner, go home earlier, and return to full activity weeks faster' },
        { icon: '🦠', title: 'Lower Infection Risk', description: 'Smaller wound means less surface area and shorter healing time, reducing infection risk' },
        { icon: '💪', title: 'Faster Muscle Recovery', description: 'Muscles that are moved aside rather than cut recover much faster than cut muscles' },
      ],
    },
    whyDrDubay: [
      'Trained in minimally invasive techniques for both knee and hip replacement',
      'Combines MIS approach with navigation or robotic assistance for maximum precision',
      'Zero technique rehabilitation amplifies the benefits of minimally invasive surgery',
      'Careful patient selection ensures MIS is used only when genuinely beneficial',
      'Experience across 35,000+ surgeries allows confident use of advanced techniques',
    ],
    candidateFor: {
      heading: 'Who is Suitable for Minimally Invasive Surgery?',
      symptoms: [
        'Patients with relatively normal weight — obesity makes MIS technically more difficult',
        'First-time (primary) knee or hip replacement patients',
        'Patients with relatively normal bone quality',
        'Patients without extreme deformity requiring wider exposure',
        'Patients prioritising fastest possible recovery',
      ],
      notIdeal: [
        'Severe obesity making the smaller incision technically very challenging',
        'Complex deformity requiring wider exposure for safe surgery',
        'Revision surgery where extensive access is needed',
      ],
    },
    recovery: {
      heading: 'Recovery with Minimally Invasive Surgery',
      timeline: [
        { period: 'Day 1', title: 'Walking Earlier', description: 'Less tissue disruption means patients often feel more comfortable walking on day one than with traditional surgery.' },
        { period: 'Day 2-3', title: 'Earlier Discharge', description: 'Many MIS patients are discharged a day earlier than with traditional surgery.' },
        { period: 'Week 2-4', title: 'Faster Progress', description: 'Less muscle damage means strength returns faster — walking without aids often by week 3-4.' },
        { period: 'Month 2-3', title: 'Full Recovery', description: 'Full recovery typically 2-4 weeks faster than with traditional open surgery.' },
      ],
    },
    faqs: [
      { q: 'Is minimally invasive surgery always better than traditional?', a: 'For suitable patients, minimally invasive surgery offers significant advantages in recovery speed and pain. However, it is technically more demanding and not appropriate for all cases. Dr. Dubay uses MIS when it genuinely benefits the patient — not routinely in all cases regardless of suitability.' },
      { q: 'Will the results of my knee replacement be as good with MIS?', a: 'When performed by an experienced surgeon on suitable patients, results are equivalent to traditional surgery in terms of implant function and longevity. The difference is in the recovery experience — faster, more comfortable, and with less pain.' },
    ],
    relatedProcedures: ['knee-replacement-surgery', 'zero-technique-knee-replacement', 'robotic-knee-replacement', 'hip-replacement-surgery'],
    schema: {
      procedureName: 'Minimally Invasive Knee and Hip Replacement',
      description: 'Minimally invasive joint replacement surgery using smaller incisions and refined technique to reduce tissue disruption and accelerate recovery.',
      bodyLocation: 'Knee, Hip',
      followup: 'Physiotherapy from day 1. Review at 2 weeks, 6 weeks, 3 months.',
      preparation: 'Same as standard joint replacement — blood tests, anaesthesia assessment.',
      howPerformed: 'Smaller 8-12 cm incision, muscle-sparing technique, under general or spinal anaesthesia.',
    },
  },
  {
    slug: 'revision-knee-replacement',
    title: 'Revision Knee Replacement',
    h1: 'Revision Knee Replacement Surgery in Jaipur',
    metaTitle: 'Revision Knee Replacement Surgery Jaipur — Dr. Dheeraj Dubay | Failed Knee Replacement',
    metaDescription: 'Expert revision knee replacement surgery in Jaipur for failed or painful knee implants. Dr. Dheeraj Dubay — specialist in complex revision surgery. Book consultation.',
    category: 'Complex Surgery',
    intro: 'Revision knee replacement is the surgical procedure to replace a failed, worn, or painful knee implant from a previous knee replacement. It is significantly more complex than primary replacement and requires specialised expertise. Dr. Dheeraj Dubay has experience in revision knee surgery, helping patients who continue to experience pain or problems after a previous knee replacement.',
    whatIsIt: {
      heading: 'What is Revision Knee Replacement?',
      content: 'Revision knee replacement removes the original implant components and replaces them with new ones — often larger, more complex components that can compensate for bone loss that has occurred since the original surgery. The procedure is required when a knee replacement fails due to implant wear (the plastic spacer wearing thin after many years), loosening of the implant from the bone, infection around the implant, instability (the knee feels loose or gives way), stiffness preventing normal movement, or fracture around the implant. Revision surgery is considerably more complex than primary replacement because the original implants must be carefully removed without causing further bone damage, and there is typically less bone available to anchor the new components. This requires specialised revision implant systems with stems, sleeves, and wedges that compensate for bone loss. An experienced surgeon with specific revision expertise is essential for the best outcome.',
    },
    howPerformed: {
      heading: 'How Revision Knee Replacement is Performed',
      steps: [
        'Pre-operative planning including full-length X-rays and CT scan to assess bone loss',
        'Blood tests and joint aspiration to rule out infection before surgery',
        'Careful removal of old implant components without causing additional bone damage',
        'Assessment of remaining bone quality and quantity',
        'Bone defects filled with bone graft or metal augments',
        'New revision implant system with stems extending into the femur and tibia for stability',
        'Careful attention to ligament balance and joint line restoration',
        'Intensive physiotherapy beginning cautiously after surgery',
      ],
    },
    benefits: {
      heading: 'What Revision Surgery Can Achieve',
      items: [
        { icon: '😌', title: 'Pain Relief', description: 'Elimination of pain from a worn, loose, or infected knee implant' },
        { icon: '🚶', title: 'Restored Function', description: 'Return to walking and daily activities that the failed implant prevented' },
        { icon: '🦠', title: 'Infection Clearance', description: 'Two-stage revision surgery effectively treats periprosthetic joint infection' },
        { icon: '⚖️', title: 'Restored Stability', description: 'Correction of an unstable or stiff knee from a previous replacement' },
        { icon: '📅', title: 'New Long-Term Solution', description: 'Modern revision implants designed to last many years after successful revision surgery' },
      ],
    },
    whyDrDubay: [
      'Experience in complex revision cases requiring specialised implant systems',
      'Thorough pre-operative planning using advanced imaging to anticipate challenges',
      'Access to a full range of revision implant options at Shalby Hospital',
      'Expertise in managing periprosthetic infection — the most complex revision scenario',
      '35,000+ primary surgeries provide the foundation for handling complex revisions',
    ],
    candidateFor: {
      heading: 'When is Revision Surgery Needed?',
      symptoms: [
        'Persistent pain after knee replacement that never fully resolved',
        'Pain that was improving but has returned after a pain-free period',
        'Knee that feels loose, unstable, or gives way during walking',
        'Inability to fully straighten or bend the knee (stiffness)',
        'Redness, warmth, or discharge around the knee wound suggesting infection',
        'X-ray showing implant loosening, wear, or fracture around the implant',
      ],
      notIdeal: [
        'Pain from a different source than the implant (nerve pain, referred pain)',
        'Very poor overall health making complex surgery extremely high risk',
      ],
    },
    recovery: {
      heading: 'Recovery After Revision Knee Replacement',
      timeline: [
        { period: 'Day 1-3', title: 'Cautious Mobilisation', description: 'More gradual than primary replacement — the reconstructed knee requires careful, supervised mobilisation.' },
        { period: 'Week 1-4', title: 'Hospital and Early Home', description: 'Hospital stay may be 5-7 days. Early recovery is slower than primary replacement — this is normal.' },
        { period: 'Month 1-3', title: 'Gradual Improvement', description: 'Recovery is slower than primary replacement. Progress is measured in weeks not days.' },
        { period: 'Month 6-12', title: 'Full Recovery', description: 'Full recovery after revision surgery takes longer — typically 6-12 months for the best outcome.' },
      ],
    },
    faqs: [
      { q: 'How do I know if my knee replacement has failed?', a: 'Signs of implant failure include pain that never fully resolved, pain that returns after a pain-free period, a feeling of looseness or instability, inability to fully bend or straighten the knee, redness and swelling suggesting infection, and X-ray changes showing loosening. If you have any of these symptoms after knee replacement, Dr. Dubay can evaluate whether revision surgery is needed.' },
      { q: 'How long does a knee replacement last before needing revision?', a: 'Modern primary knee replacements are designed to last 20-25 years. However, some patients require earlier revision due to infection, loosening, instability, or component failure. The better the original alignment and the more active the patient, the longer the implant typically lasts.' },
      { q: 'Is revision surgery as successful as primary replacement?', a: 'Revision surgery is complex and outcomes are generally slightly less predictable than primary replacement. However, the majority of patients achieve significant pain relief and improved function after successful revision surgery. Choosing a surgeon with specific revision experience is critical.' },
    ],
    relatedProcedures: ['knee-replacement-surgery', 'robotic-knee-replacement', 'computer-navigation-surgery'],
    schema: {
      procedureName: 'Revision Knee Replacement Surgery',
      description: 'Complex surgical procedure to replace a failed or painful knee implant from a previous knee replacement.',
      bodyLocation: 'Knee',
      followup: 'More intensive follow-up than primary replacement. Reviews at 2 weeks, 6 weeks, 3 months, 6 months, 1 year.',
      preparation: 'Extensive pre-operative planning including CT scan, blood tests, joint aspiration to rule out infection.',
      howPerformed: 'Complex revision surgery under general or spinal anaesthesia. Hospital stay 5-7 days typically.',
    },
  },
  {
    slug: 'bilateral-knee-replacement',
    title: 'Bilateral Knee Replacement',
    h1: 'Bilateral Knee Replacement Surgery in Jaipur — Both Knees at Once',
    metaTitle: 'Bilateral Knee Replacement Jaipur — Dr. Dheeraj Dubay | Both Knees Together',
    metaDescription: 'Bilateral knee replacement surgery (both knees in one operation) in Jaipur by Dr. Dheeraj Dubay. One surgery, one recovery. Forbes World Record holder. Book today.',
    category: 'Joint Replacement',
    intro: 'Bilateral knee replacement replaces both knee joints in a single surgical session, offering the advantage of one anaesthetic, one hospital admission, and one recovery period instead of two. For patients with arthritis affecting both knees — which is common — this is often the most efficient and cost-effective approach. Dr. Dheeraj Dubay holds the Forbes World Record for performing 34 joint replacement surgeries in a single day, reflecting his exceptional efficiency and surgical expertise.',
    whatIsIt: {
      heading: 'What is Bilateral Knee Replacement?',
      content: "Bilateral knee replacement performs total knee replacement on both knees during the same operating session. After one knee is replaced, the surgical team repositions the patient and replaces the second knee in the same operation. The combined procedure typically takes 2-3 hours. The primary advantage is a single recovery period — rather than recovering from one knee replacement and then facing a second operation 6-12 months later, bilateral replacement means one period of recovery, one set of physiotherapy, and a faster return to full bilateral function. The approach requires careful patient selection — the patient must be medically fit enough to undergo the longer combined procedure. Blood loss, although greater than for a single knee, is managed carefully with modern blood conservation techniques. Studies show that appropriately selected patients undergoing simultaneous bilateral replacement have outcomes equivalent to staged bilateral replacement with the advantage of a single recovery.",
    },
    howPerformed: {
      heading: 'How Bilateral Replacement is Performed',
      steps: [
        'Thorough pre-operative assessment of cardiac, respiratory, and overall health to confirm fitness for bilateral procedure',
        'General or spinal anaesthesia administered',
        'First knee replacement performed completely — same technique as standard total knee replacement',
        'Patient repositioned on operating table',
        'Second knee replacement performed — same complete procedure',
        'Both knees dressed and compression stockings applied',
        'Blood conservation techniques used throughout to minimise transfusion need',
        'Fast-track rehabilitation begins within 24 hours for both knees',
      ],
    },
    benefits: {
      heading: 'Advantages of Bilateral Replacement',
      items: [
        { icon: '🔄', title: 'One Recovery', description: 'One recovery period instead of two — total time off work and activity is significantly reduced' },
        { icon: '💉', title: 'One Anaesthetic', description: 'Single anaesthetic exposure rather than two separate operations' },
        { icon: '💰', title: 'More Cost-Effective', description: 'Single hospital admission, single anaesthetic fee, and single physiotherapy period' },
        { icon: '⚖️', title: 'Simultaneous Rehabilitation', description: 'Both knees recover together — gait and balance normalise simultaneously' },
        { icon: '⏱️', title: 'Faster Return to Normal Life', description: 'Many patients are fully recovered faster with bilateral than staged replacement' },
        { icon: '🏥', title: 'Single Disruption', description: 'Family caregiving, work leave, and life disruption happen once rather than twice' },
      ],
    },
    whyDrDubay: [
      'Forbes World Record — 34 joint replacement surgeries in a single day demonstrates efficiency and stamina',
      'Extensive bilateral replacement experience with excellent safety record',
      'Rigorous patient selection ensuring bilateral surgery is only recommended when genuinely appropriate',
      'Blood conservation expertise minimising transfusion requirement',
      'Zero technique applied to bilateral recovery for fastest possible rehabilitation',
    ],
    candidateFor: {
      heading: 'Who is Suitable for Bilateral Replacement?',
      symptoms: [
        'Significant arthritis affecting both knees confirmed on X-ray',
        'Good overall health — cardiac, respiratory, and kidney function within acceptable parameters',
        'Relatively normal weight',
        'Strong motivation for physiotherapy — bilateral recovery requires significant effort',
        'Good home support for the recovery period',
      ],
      notIdeal: [
        'Significant cardiac or respiratory conditions increasing anaesthetic risk for longer procedure',
        'Significant obesity increasing blood loss and anaesthetic risk',
        'Age over 75 with comorbidities — staged replacement may be safer',
        'Patient preference for staged surgery',
      ],
    },
    recovery: {
      heading: 'Recovering from Bilateral Knee Replacement',
      timeline: [
        { period: 'Day 1', title: 'First Steps with Both Knees', description: 'Walking with a frame begins on day one — both knees working together from the start.' },
        { period: 'Days 4-5', title: 'Hospital Discharge', description: 'Slightly longer hospital stay than single replacement — typically 4-5 days.' },
        { period: 'Weeks 2-6', title: 'Home Recovery', description: 'More intensive initial recovery than single replacement. Both knees strengthen simultaneously. Walking frame transitions to crutches then stick.' },
        { period: 'Month 3', title: 'Good Mobility', description: 'Most bilateral patients are walking freely with good function in both knees by month 3.' },
        { period: 'Month 6', title: 'Full Recovery', description: 'Complete recovery. Both knees fully functional. The single recovery period pays dividends — patients are fully bilateral much earlier than if they had staged surgery.' },
      ],
    },
    faqs: [
      { q: 'Is bilateral knee replacement safe?', a: "For carefully selected patients, bilateral replacement has been shown to be safe with outcomes comparable to staged surgery. The key is thorough pre-operative assessment. Dr. Dubay recommends bilateral surgery only to patients who meet strict health criteria. Patients with significant heart, lung, or kidney conditions are generally recommended staged surgery instead." },
      { q: 'Is recovery harder with both knees replaced at once?', a: 'The initial recovery is more demanding than single replacement — you are working with two new knees simultaneously. However, the rehabilitation process proceeds well because both knees strengthen together. Many patients report that the total experience is easier than anticipated, and the single recovery period is preferable to facing surgery twice.' },
      { q: 'Will I need a blood transfusion with bilateral replacement?', a: "Blood loss is greater with bilateral than single replacement. Dr. Dubay uses blood conservation techniques including tranexamic acid and minimally invasive surgical approaches to minimise blood loss. Not all patients require transfusion, but it is more likely than with single replacement. Pre-operative blood donation by the patient (autologous donation) can be arranged if appropriate." },
    ],
    relatedProcedures: ['knee-replacement-surgery', 'robotic-knee-replacement', 'zero-technique-knee-replacement'],
    schema: {
      procedureName: 'Bilateral Total Knee Replacement Surgery',
      description: 'Simultaneous total knee replacement of both knee joints in a single surgical session.',
      bodyLocation: 'Both Knees',
      followup: 'Physiotherapy from day 1. Review at 2 weeks, 6 weeks, 3 months, 6 months.',
      preparation: 'Extensive cardiac and respiratory assessment, blood tests, anaesthesia evaluation.',
      howPerformed: 'Sequential bilateral knee replacement under general or spinal anaesthesia. Hospital stay 4-5 days.',
    },
  },
]
