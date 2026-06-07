import type { CityPage } from "./types";
import { CITY_PAGES as LEGACY_CITY_PAGES } from "@/lib/city-pages";

import jaipur from "./joint-replacement-surgeon-jaipur";
import ajmer from "./knee-replacement-ajmer";
import kota from "./knee-replacement-kota";
import sikar from "./knee-replacement-sikar";
import alwar from "./knee-replacement-alwar";
import agra from "./knee-replacement-agra";

// Tier 1 (unique, rich content). Add Tier 2 + 3 imports here as we
// migrate. The route falls back to legacy CITY_PAGES for un-migrated
// slugs.
export const RICH_CITIES: CityPage[] = [
  jaipur,
  ajmer,
  kota,
  sikar,
  alwar,
  agra,
];

export type { CityPage } from "./types";

// Single lookup that prefers rich data when present; falls back to the
// legacy templated lib/city-pages.ts entry.
export function findCityBySlug(slug: string):
  | { kind: "rich"; data: CityPage }
  | { kind: "legacy"; data: (typeof LEGACY_CITY_PAGES)[number] }
  | null {
  const rich = RICH_CITIES.find((c) => c.slug === slug);
  if (rich) return { kind: "rich", data: rich };

  const legacy = LEGACY_CITY_PAGES.find((c) => c.slug === slug);
  if (legacy) return { kind: "legacy", data: legacy };

  return null;
}

export function isRichCity(slug: string): boolean {
  return RICH_CITIES.some((c) => c.slug === slug);
}
