import { CITY_PAGES as RAW_CITY_PAGES } from "./city-pages";
import { normalizePracticeFacts } from "./practice-fact-normalizer";

export const CITY_PAGES: typeof RAW_CITY_PAGES = normalizePracticeFacts(
  RAW_CITY_PAGES,
);
