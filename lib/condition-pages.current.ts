import { CONDITION_PAGES as RAW_CONDITION_PAGES } from "./condition-pages";
import type { ConditionPage } from "./condition-pages";
import { normalizePracticeFacts } from "./practice-fact-normalizer";
import { normalizeMedicalClaims } from "./medical-claim-normalizer";

export type { ConditionPage } from "./condition-pages";

export const CONDITION_PAGES: ConditionPage[] = normalizeMedicalClaims(
  normalizePracticeFacts(RAW_CONDITION_PAGES),
);
