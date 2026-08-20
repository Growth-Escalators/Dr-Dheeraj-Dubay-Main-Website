import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const revalidate = 3600;

export async function GET() {
  try {
    const achievements = await db.achievement.findMany({
      orderBy: [
        { isFeatured: "desc" },
        { featuredOrder: "asc" },
        { createdAt: "desc" },
      ],
    });
    return NextResponse.json(achievements);
  } catch (error) {
    console.error("[ACHIEVEMENTS_PUBLIC_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
