// Runtime source of truth for current clinic-confirmed facts.
// The base module now carries the same August 2026 figures, while this module
// remains the stable path-alias target used by current public routes.

import * as base from "./clinic-info";

export type { Clinic } from "./clinic-info";

export const PRIMARY_PHONE = base.PRIMARY_PHONE;
export const PRIMARY_PHONE_TEL = base.PRIMARY_PHONE_TEL;
export const PRIMARY_PHONE_DISPLAY = base.PRIMARY_PHONE_DISPLAY;
export const PRIMARY_EMAIL = base.PRIMARY_EMAIL;
export const SITE_URL = base.SITE_URL;
export const CLINICS = base.CLINICS;
export const SOCIAL_LINKS = base.SOCIAL_LINKS;

// Clinic-confirmed current practice statistics — August 2026.
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

// Compatibility exports retained for legacy data normalisation only. They are
// not used as homepage proof points until their evidence inventory is complete.
export const PATIENTS_TREATED = base.PATIENTS_TREATED;
export const PATIENTS_TREATED_DISPLAY = base.PATIENTS_TREATED_DISPLAY;
export const NATIONAL_AWARDS = base.NATIONAL_AWARDS;
export const INTERNATIONAL_CONFERENCES = base.INTERNATIONAL_CONFERENCES;
export const IMPLANT_LIFESPAN_YEARS = base.IMPLANT_LIFESPAN_YEARS;
