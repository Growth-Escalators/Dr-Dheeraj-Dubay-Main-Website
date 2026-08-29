import { CITY_PAGES as RAW_CITY_PAGES } from "./city-pages";
import { normalizePracticeFacts } from "./practice-fact-normalizer";
import { normalizeCityClaims } from "./city-claim-normalizer";
import { applyCitySeoOverrides } from "./city-seo-overrides";

export const CITY_PAGES: typeof RAW_CITY_PAGES = applyCitySeoOverrides(
  normalizeCityClaims(
    normalizePracticeFacts(RAW_CITY_PAGES),
  ),
);
