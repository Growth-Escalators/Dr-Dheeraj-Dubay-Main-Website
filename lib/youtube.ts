// Shared YouTube URL parser.
//
// This existed as two near-identical local copies (app/podcasts/page.tsx and
// app/testimonials/page.tsx) with slightly different regexes — the testimonials
// copy didn't handle `youtube.com/v/`, so the same DB row could render on one
// page and silently vanish on the other. One implementation now, covering every
// form the CRM's "link" field realistically receives.
export function getYouTubeId(url: string): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|shorts\/|live\/|watch\?v=|watch\?.+&v=))([^&?\s/]+)/,
  );
  return match ? match[1] : null;
}
