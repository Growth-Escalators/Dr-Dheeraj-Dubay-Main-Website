import { PROCEDURE_PAGES as RAW_PROCEDURE_PAGES } from "./procedure-pages";
import type { ProcedurePage } from "./procedure-pages";
import { normalizePracticeFacts } from "./practice-fact-normalizer";
import { normalizeMedicalClaims } from "./medical-claim-normalizer";

export type { ProcedurePage } from "./procedure-pages";

export const PROCEDURE_PAGES: ProcedurePage[] = normalizeMedicalClaims(
  normalizePracticeFacts(RAW_PROCEDURE_PAGES),
);
