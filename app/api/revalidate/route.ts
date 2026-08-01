import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

// On-demand revalidation, called by the admin CRM after a content write.
//
// Every page here is `export const revalidate = 3600`, which meant a CRM edit
// took up to an hour to appear. The admin now POSTs here after saving so the
// affected pages rebuild immediately.
//
// Auth is a shared secret in a header — this endpoint only busts a cache, it
// never returns or mutates data, so a secret is proportionate. It must match
// REVALIDATE_SECRET in the admin project.
export async function POST(req: Request) {
  const secret = process.env.REVALIDATE_SECRET;

  if (!secret) {
    return NextResponse.json(
      { error: "REVALIDATE_SECRET is not configured on this deployment" },
      { status: 501 },
    );
  }

  if (req.headers.get("x-revalidate-secret") !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let paths: string[] = ["/"];
  try {
    const body = await req.json();
    if (Array.isArray(body?.paths) && body.paths.length) {
      // Only allow same-origin paths — never a full URL.
      paths = body.paths
        .map((p: unknown) => String(p))
        .filter((p: string) => p.startsWith("/"));
    }
  } catch {
    // No body / bad JSON — fall back to revalidating the homepage.
  }

  for (const path of paths) {
    revalidatePath(path);
  }

  return NextResponse.json({ revalidated: paths, at: Date.now() });
}
