// Runtime source of truth for current clinic-confirmed facts.
//
// The legacy clinic-info module still contains historical figures that were
// published before the 2026-08-26 clinic update. Site code imports this module
// through an exact TypeScript path alias, so current facts can be changed in
// one place without rewriting historical audit comments/data.

import * as base from "./clinic-info";

export type { Clinic } from "./clinic-info";

export const PRIMARY_PHONE = base.PRIMARY_PHONE;
export const PRIMARY_PHONE_TEL = base.PRIMARY_PHONE_TEL;
export const PRIMARY_PHONE_DISPLAY = base.PRIMARY_PHONE_DISPLAY;
export const PRIMARY_EMAIL = base.PRIMARY_EMAIL;
export const SITE_URL = base.SITE_URL;
export const CLINICS = base.CLINICS;
export const SOCIAL_LINKS = base.SOCIAL_LINKS;
export const AGGREGATE_RATING = base.AGGREGATE_RATING;

// Clinic-confirmed current practice statistics — 2026-08-26.
export const SURGERY_COUNT = 40000;
export const SURGERY_COUNT_DISPLAY = "40,000+";
export const EXPERIENCE_YEARS = 24;
export const EXPERIENCE_YEARS_DISPLAY = "24";

// Verified single-day record used across the current site:
// 34 joint replacements in total on 9 May 2024 = 33 knee + 1 hip.
export const RECORD_SURGERIES_IN_A_DAY = 34;
export const RECORD_KNEE_REPLACEMENTS_IN_A_DAY = 33;
export const RECORD_HIP_REPLACEMENTS_IN_A_DAY = 1;
export const RECORD_TOTAL_REPLACEMENTS_IN_A_DAY = 34;

export const PATIENTS_TREATED = base.PATIENTS_TREATED;
export const PATIENTS_TREATED_DISPLAY = base.PATIENTS_TREATED_DISPLAY;
export const NATIONAL_AWARDS = base.NATIONAL_AWARDS;
export const INTERNATIONAL_CONFERENCES = base.INTERNATIONAL_CONFERENCES;
export const IMPLANT_LIFESPAN_YEARS = base.IMPLANT_LIFESPAN_YEARS;
