import { HINDI_PAGES as RAW_HINDI_PAGES } from "./hindi-pages";
import type { HindiPage } from "./hindi-pages";
import { normalizePracticeFacts } from "./practice-fact-normalizer";
import { applyHindiSeoOverrides } from "./hindi-seo-overrides";

export type { HindiPage } from "./hindi-pages";

export const HINDI_PAGES: HindiPage[] = applyHindiSeoOverrides(
  normalizePracticeFacts(RAW_HINDI_PAGES),
);
