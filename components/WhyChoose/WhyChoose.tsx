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
import AwardsSection from "../Awards/AwardsSection";

// Six concrete reasons + why each matters to a patient considering surgery.
// Generic taglines ("we care") build no trust; pairing each value with a
// proof point or commitment does. Per design-tokens.ts the whole site
// stays on the emerald accent — older variants of this file used six
// different pastel accents per card, which felt off-brand and got removed.
const REASONS = [
  {
    icon: ShieldCheck,
    title: "Safety First",
    body:
      "NABH-certified protocols at every step. 35,000+ surgeries performed with zero compromise on patient safety standards.",
  },
  {
    icon: HeartHandshake,
    title: "Patient-Centric Care",
    body:
      "Every treatment plan is personalised. Dr. Dubay personally counsels each patient before, during, and after surgery.",
  },
  {
    icon: Trophy,
    title: "Award-Winning Leadership",
    body:
      "Forbes World Record holder. ET Inspiring Leaders Award. Most trusted Joint Replacement Surgeon of North India (2024).",
  },
  {
    icon: Microscope,
    title: "Cutting-Edge Technology",
    body:
      "Robotic-assisted joint replacement, computer navigation, minimally invasive techniques — the latest tools in orthopaedic surgery.",
  },
  {
    icon: IndianRupee,
    title: "Transparent Pricing",
    body:
      "No hidden charges. Upfront cost estimates including implants, hospital stay, and follow-up — discussed before you decide.",
  },
  {
    icon: Activity,
    title: "Coordinated Recovery",
    body:
      "Same-day mobilisation. Stair-climbing by day 2. Dedicated physiotherapy team guides your recovery from hospital to home.",
  },
] as const;

const WhyChoose = () => {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10 md:mb-14">
          <span className={SECTION_HEADING_CLASSES.eyebrow}>
            Why Patients Trust Dr. Dubay
          </span>
          <h2 className={SECTION_HEADING_CLASSES.h2}>
            Why Choose <span className="text-emerald-600">Us</span>?
          </h2>
          <p className={SECTION_HEADING_CLASSES.sub}>
            Six things you can verify about the care you&apos;ll receive &mdash;
            not promises, but commitments backed by record and recognition.
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
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {reason.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {reason.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recognition & Excellence section nests here — gets its own redesign
          in Deploy 2 of this project plan. */}
      <AwardsSection />
    </section>
  );
};

export default WhyChoose;
