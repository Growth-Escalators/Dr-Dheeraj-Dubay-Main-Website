# Awards photos — where to drop the files

The homepage **Awards & Honours** carousel (`components/home/AwardsSlider.tsx`)
loads each award's photos from this folder. Each award has its own
sub-folder, named by the award `id` from `lib/awards.ts`.

## How to add real photos

For each award, drop up to **3 photos** named `1.jpg`, `2.jpg`, `3.jpg`
into the matching folder. They'll appear in the carousel automatically —
first one as the cover, the rest as clickable thumbnails below.

```
public/assets/awards/
├── forbes-world-record/
│   ├── 1.jpg   ← main cover (ceremony shot is ideal)
│   ├── 2.jpg   ← additional photo (with dignitaries, certificate, etc.)
│   └── 3.jpg
├── uk-honour/
│   ├── 1.jpg
│   ├── 2.jpg
│   └── 3.jpg
├── et-inspiring-leaders/
├── most-trusted-surgeon/
├── golden-warriors/
└── health-minister-award/
```

## Specs

- Aspect ratio: roughly **16:10 / 16:9** works best (main image is wide)
- Resolution: 1200×800 minimum
- Format: `.jpg` (smaller file size) or `.png` if transparency needed
- File size: under ~400 KB each — compress with [TinyPNG](https://tinypng.com) before uploading

## Adding more than 3 photos for one award

Open `lib/awards.ts`, find the award's entry, and extend its `images` array.
The carousel adapts automatically — 2 photos shows 2 thumbnails, 5 shows 5.

## What happens if a file is missing

Any photo path that doesn't exist falls back to `/assets/images/hero.png`
(handled by `ImageWithFallback`). So it's safe to ship the carousel with
some slots empty — visitors will just see the generic hero image until
the real photo lands.
