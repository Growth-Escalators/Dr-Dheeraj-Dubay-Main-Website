# SEO Setup Steps — drdubay.in (Jatin, manual, one-time)

This is the manual half of WS-1 (technical SEO foundation). The code side
(`app/sitemap.ts`, `app/robots.ts`, `public/BingSiteAuth.xml`,
`public/2dcc1d75803f6c857a97c1cf5959736a.txt`, `lib/indexnow.ts`) is already
committed on `feat/seo-technical-foundation`. These steps happen after that
branch is merged and deployed to production (`www.drdubay.in`).

## 1. Verify a GSC domain property

1. Go to [Google Search Console](https://search.google.com/search-console) →
   **Add property** → choose **Domain** (not URL-prefix) → enter `drdubay.in`.
2. GSC gives you a TXT record (`google-site-verification=...`). Add it at
   the DNS provider for `drdubay.in` as a `TXT` record on the root.
3. Wait for DNS to propagate (usually minutes, can take up to 24h), then
   click **Verify** in GSC.
4. Domain property verification covers `www`, non-`www`, `http`, and `https`
   automatically — no separate URL-prefix property needed.

## 2. Verify Bing Webmaster Tools + paste the code

1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters) → sign in
   → **Add a site** → enter `https://www.drdubay.in`.
2. Bing Webmaster Tools can usually **import verification directly from
   GSC** (if step 1 is already done) — pick that option first, it's the
   fastest path and needs no code change.
3. If it asks for manual verification instead, choose the **XML file**
   method. Bing will show you a `<user>...</user>` code.
4. Open `public/BingSiteAuth.xml` in this repo and replace the placeholder:
   ```xml
   <?xml version="1.0"?>
   <users>
   	<user>REPLACE_WITH_BING_WMT_CODE</user>
   </users>
   ```
   Swap `REPLACE_WITH_BING_WMT_CODE` for the real code Bing gives you.
5. Commit that one-line change, redeploy, then confirm
   `https://www.drdubay.in/BingSiteAuth.xml` is reachable and shows the real
   code before clicking **Verify** in Bing Webmaster Tools.

## 3. Submit the sitemap in both consoles

1. **GSC:** left nav → **Sitemaps** → enter `sitemap.xml` → **Submit**.
   (Full URL resolves at `https://www.drdubay.in/sitemap.xml`.)
2. **Bing Webmaster Tools:** left nav → **Sitemaps** → **Submit sitemap** →
   enter `https://www.drdubay.in/sitemap.xml`.
3. Sanity-check the sitemap yourself first:
   `curl -s https://www.drdubay.in/sitemap.xml | head -50` — confirm it
   returns XML with real URLs (not an error page) before submitting.

## 4. Confirm the IndexNow key file resolves after deploy

The IndexNow key generated for this site is:

```
2dcc1d75803f6c857a97c1cf5959736a
```

1. After the branch is deployed, check the key file is publicly reachable:
   ```
   curl -s https://www.drdubay.in/2dcc1d75803f6c857a97c1cf5959736a.txt
   ```
   It should return exactly the key string above, nothing else.
2. That's the only manual step for IndexNow right now — `lib/indexnow.ts`
   is prepared but **not wired to fire anywhere yet**. WS-5 will call
   `submitUrlToIndexNow()` from the blog publish/revalidate path so new/
   updated blog posts get pinged to Bing automatically. No action needed
   from you until that lands.

## Notes

- Do not repeat "Request Indexing" in GSC beyond ~10-12 URLs/day — it's
  quota-limited and does nothing extra beyond that.
- Bing's index feeds ChatGPT/Copilot retrieval — skipping step 2 means the
  site is effectively invisible to those AI answer engines even if Google
  indexing is perfect.
