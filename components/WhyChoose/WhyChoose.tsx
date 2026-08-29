"use client";

import React from "react";
import {
  ShieldCheck,
  HeartHandshake,
  Trophy,
  Microscope,
  IndianRupee,
  Activity,
} from "lucide-react";
import { SECTION_HEADING_CLASSES } from "@/lib/design-tokens";
import {
  RECORD_SURGERIES_IN_A_DAY,
  SURGERY_COUNT_DISPLAY,
} from "@/lib/clinic-info";

const REASONS = [
  {
    icon: ShieldCheck,
    title: "Hospital-Based Surgical Care",
    body:
      "Joint-replacement care is provided at Shalby Hospital Jaipur. Surgical suitability and individual risks are assessed before treatment.",
  },
  {
    icon: HeartHandshake,
    title: "Individual Treatment Planning",
    body:
      "Treatment decisions consider symptoms, examination, imaging, overall health and patient goals rather than a one-size-fits-all pathway.",
  },
  {
    icon: Trophy,
    title: "Documented Surgical Experience",
    body:
      `${SURGERY_COUNT_DISPLAY} total surgeries across his career and a recorded single-day milestone of ${RECORD_SURGERIES_IN_A_DAY} joint replacements on 9 May 2024 — 33 knee and 1 hip.`,
  },
  {
    icon: Microscope,
    title: "Technology When Appropriate",
    body:
      "Robotic assistance and computer navigation may be used for selected joint-replacement cases when they are clinically appropriate. The surgeon remains responsible for planning and execution.",
  },
  {
    icon: IndianRupee,
    title: "Patient-Specific Cost Guidance",
    body:
      "Hospital estimates depend on the procedure, implant, room category, clinical needs and insurance eligibility. Current coverage should be verified before admission.",
  },
  {
    icon: Activity,
    title: "Individualised Rehabilitation",
    body:
      "Mobilisation and physiotherapy are planned according to the patient's medical condition and progress. Recovery timelines vary between patients.",
  },
] as const;

// Timeline props are retained for API compatibility with HomePageContent while
// award/recognition content is kept in the dedicated, evidence-led sections.
const WhyChoose = ({
  timelineProfessional: _timelineProfessional,
  timelineAcademic: _timelineAcademic,
}: {
  timelineProfessional?: { year: string; items: { text: string; highlight?: boolean }[] }[] | null;
  timelineAcademic?: { year: string; items: { text: string; highlight?: boolean }[] }[] | null;
} = {}) => {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10 md:mb-14">
          <span className={SECTION_HEADING_CLASSES.eyebrow}>
            Experience, planning &amp; patient information
          </span>
          <h2 className={SECTION_HEADING_CLASSES.h2}>
            What Patients Can <span className="text-emerald-600">Consider</span>
          </h2>
          <p className={SECTION_HEADING_CLASSES.sub}>
            Practical factors to discuss when considering knee or hip replacement care in Jaipur.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {REASONS.map((reason) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className="group bg-white rounded-xl border border-gray-200 p-6 hover:border-emerald-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{reason.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{reason.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
