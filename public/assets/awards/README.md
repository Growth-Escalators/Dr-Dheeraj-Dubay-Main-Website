# Awards photos

## Current status: not rendered anywhere

The homepage **Awards & Honours** section
(`components/home/AwardsShowcase.tsx`) shows **one fixed portrait of Dr. Dubay**
(`/assets/images/hero.png`) while the card beside it cycles through the awards
in `lib/awards.ts`. It does **not** load per-award photos.

That replaced the old `AwardsSlider`, which did try to load one photo per award
from this folder — but no photos were ever uploaded, so every slide fell back to
the same hero image anyway. The new design makes that intentional.

So: **dropping .jpg files in this folder currently does nothing.** The `image`
field on each award in `lib/awards.ts` is kept for future use, not read by the
homepage.

## If you want per-award photos back

Two options, both small changes:

1. **Thumbnail on the card** — show the award photo inside the rotating card,
   keeping the fixed portrait on the left. Best of both.
2. **Photo replaces the portrait per slide** — reverts to the old behaviour.

Ask and it can be wired up. If you go this route, the specs that worked before:

- Aspect ratio: roughly **16:10 / 16:9**
- Resolution: 1200×800 minimum
- Format: `.jpg`, under ~400 KB (compress with [TinyPNG](https://tinypng.com))
- File name = the award's `id` in `lib/awards.ts`, e.g.
  `forbes-world-record.jpg`

## Award photos on /achievements

Separate system — `/achievements` is DB-driven (the `Achievement` model, images
uploaded through the admin panel). Nothing in this folder affects it.
