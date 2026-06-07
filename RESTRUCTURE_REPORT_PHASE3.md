# Phase 3 + 4 Destructive Operations — Approval Required

**Generated:** 2026-06-07 (current state of `main` branch)
**Author:** Claude (working with Jatin)
**Type:** Destructive — needs your green light before I run.

Per the approved plan, I pause before destructive deletes. Below is everything I intend to remove. Nothing is removed yet. **Confirm or reject items individually; I'll edit the plan and proceed only with the approved subset.**

---

## A. HOMEPAGE — sections to remove (`components/HomePageContent.tsx`)

The homepage currently has ~24 sections; the plan collapses it to 9. Components to **remove from HomePageContent's render order** (the component files themselves stay on disk in case used elsewhere — I'll grep to confirm before deleting any file):

| # | Component | Current line in HomePageContent.tsx | Reason |
|---|---|---|---|
| 1 | `<AchievementCollage />` | 167 | Award duplication — replaced by AwardsSlider |
| 2 | `<UKHonour />` | 168 | Award duplication — folded into AwardsSlider |
| 3 | `<ETAward />` | 169 | Award duplication — folded into AwardsSlider |
| 4 | `<Certificate2 />` | 184 | Award duplication — folded into AwardsSlider |
| 5 | `<Certificate />` | 185 | Award duplication — folded into AwardsSlider |
| 6 | `<WrittenTestimonials />` | 173 | Testimonial duplication — TestimonialStrip replaces it |
| 7 | `<Testimonial />` (the carousel) | 175 | Testimonial duplication — TestimonialStrip replaces it |
| 8 | `<Booknow />` | 181 | Contact-form-style section — replaced by Final CTA (Book + Call) |
| 9 | `<Hero2 />` | 183 | Redundant secondary hero |
| 10 | `<GoogleMaps />` | 187 | Map relocates to /locations only |
| 11 | `<Form />` (ContactForm/Form2) | 188 | No contact form on homepage per your brief |

**Kept on homepage** (in the order the new flow will use): `Card1` (Hero), `Stats`, `Services` (DB-list) → being replaced by `<ProcedureCard>` grid (Phase 5), `SpecialtiesHighlight`, Procedures-We-Offer grid, Conditions-We-Treat, Hindi block, `FeaturedAchievementsSection`, `LatestEvents`, `LatestBlogs`, `LatestPodcasts`, `WhyChoose`. Then **new** `AwardsSlider` + new `TestimonialStrip` (already shipped) + new Locations address-only + new Final CTA.

---

## B. CONTACT PAGE — `app/contact/page.tsx`

| # | Item | Reason |
|---|---|---|
| 1 | `<ContactSection />` form render | Brief says: team doesn't use form leads. Replace with phone + WhatsApp + Call Now + email + address only. |
| 2 | `<GoogleMaps />` render | Map relocates to /locations only. Replace with "Get Directions" links per location. |

**Kept on contact page**: Organization JSON-LD (already there), heading text, page metadata.

---

## C. COMPONENT FILES — keep on disk, do NOT delete yet

These component files become unused on the homepage but may still be imported elsewhere. I am **NOT deleting** the source files in this round. After Phase 5 (services unification) lands, I'll grep across the codebase for any remaining references, then propose a separate cleanup PR to delete the dead files:

- `components/Achievements/AchievementCollage.tsx`
- `components/UKHonour/UKHonour.tsx`
- `components/ETAward/ETAward.tsx`
- `components/Certificate/Certificate.tsx`
- `components/Certificate/Certificate2.tsx`
- `components/Testimonials/Testimonial.tsx`
- `components/home/WrittenTestimonials.tsx`
- `components/Booknow/Booknow.tsx`
- `components/Hero2/Hero2.tsx`
- `components/ContactForm/Form2.tsx`
- `components/ui/map.tsx` (GoogleMaps)

---

## D. NOT being deleted in this round (clarification)

- ✅ `Navbar/navbar.tsx` — kept (now globally mounted)
- ✅ `Footer/Footer.tsx` — kept (globally mounted)
- ✅ `TestimonialStrip` — kept and is now the sole testimonial section on homepage
- ✅ `LeadMagnetPopup` — kept per your decision (warm-intent, not cold form)
- ✅ `EmergencyBanner`, `MobileBookingCTA`, `WhatsAppFloat` — kept (globally mounted)
- ✅ All ROUTES kept (per Phase 3 plan: no pages removed; nav reorganization only)
- ✅ All 22 templated city pages kept for now (Phase 7 plan addresses these separately)
- ✅ Services Prisma model — kept but to be marked deprecated in Phase 5

---

## E. What changes after you approve

In one commit I will:

1. Edit `components/HomePageContent.tsx` to render only the new lean section list
2. Edit `app/contact/page.tsx` to replace the form + map with a phone/WhatsApp/email/address block
3. Push to deploy

I will NOT delete any component file in this commit. A separate cleanup PR comes after Phase 5 to delete the now-unused source files (so we can verify nothing else imports them).

---

## F. Approval format

Reply with one of:
- **"Approved, all"** — I run everything in A + B
- **"Approved, except #N, #M"** — I keep specific items
- **"Stop / changes needed"** — explain what to change first

After approval I run the deletes + build + commit + push, then move into Phase 4 (homepage rebuild with new AwardsSlider and the new 9-section flow).
