import { HINDI_PAGES as RAW_HINDI_PAGES } from "./hindi-pages";
import type { HindiPage } from "./hindi-pages";
import { normalizePracticeFacts } from "./practice-fact-normalizer";
import { normalizeMedicalClaims } from "./medical-claim-normalizer";
import { applyHindiSeoOverrides } from "./hindi-seo-overrides";

export type { HindiPage } from "./hindi-pages";

// Apply the same medical-claim guard used by the English procedure/condition
// layers before page-specific Hindi SEO overrides. This protects legacy Hindi
// pages that do not yet have a dedicated rewrite from absolute outcome claims.
export const HINDI_PAGES: HindiPage[] = applyHindiSeoOverrides(
  normalizeMedicalClaims(
    normalizePracticeFacts(RAW_HINDI_PAGES),
  ),
);
