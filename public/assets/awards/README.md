# Awards photos — where to drop the files

The homepage **Awards & Honours** carousel (`components/home/AwardsSlider.tsx`)
loads one image per award from this folder. File name = the award's `id`
from `lib/awards.ts`.

## How to add real photos

Drop **one `.jpg` file per award** with the matching id:

```
public/assets/awards/
├── forbes-world-record.jpg       ← Forbes World Record
├── uk-honour.jpg                 ← Indo-UK Leadership Award
├── et-inspiring-leaders.jpg      ← ET Inspiring Leaders Award
├── most-trusted-surgeon.jpg      ← Most Trusted Joint Replacement Surgeon
├── golden-warriors.jpg           ← Golden Warriors Walkathon
└── health-minister-award.jpg     ← Health Minister Award
```

Once a file exists at the matching path, it shows automatically on the
slider for that award. No code change needed.

## Specs

- Aspect ratio: roughly **16:10 / 16:9** works best (image area is wide on desktop)
- Resolution: 1200×800 minimum
- Format: `.jpg` (smaller file size) preferred
- File size: under ~400 KB each — compress with [TinyPNG](https://tinypng.com) before uploading

## Adding a new award

1. Open `lib/awards.ts` and append a new entry to the `AWARDS` array.
   Pick a unique kebab-case `id`.
2. Set `image: "/assets/awards/{id}.jpg"`.
3. Drop the matching `.jpg` here.

## What happens if a file is missing

Any image path that doesn't exist falls back to `/assets/images/hero.png`
(handled by `ImageWithFallback`). So it's safe to ship paths that don't
have real photos yet — visitors will see the generic hero image until
the real photo lands.
