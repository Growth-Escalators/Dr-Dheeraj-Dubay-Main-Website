import {
  COST_PAGES as RAW_COST_PAGES,
  PROCEDURE_TO_COST_SLUG,
} from "./cost-pages";
import type {
  CostFactor,
  InsuranceScheme,
  CostFaq,
  CostPage,
} from "./cost-pages";
import { normalizePracticeFacts } from "./practice-fact-normalizer";

export type { CostFactor, InsuranceScheme, CostFaq, CostPage } from "./cost-pages";

export const COST_PAGES: CostPage[] = normalizePracticeFacts(RAW_COST_PAGES);
export { PROCEDURE_TO_COST_SLUG };
