import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const revalidate = 3600;

export async function GET() {
  try {
    const blogs = await db.blogs.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: "desc" },
    });
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("[BLOGS_PUBLIC_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
