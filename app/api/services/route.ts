import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const revalidate = 3600;

export async function GET(request: Request) {
  try {
    const services = await db.services.findMany();
    return NextResponse.json(services);
  } catch (error) {
    console.error("[SERVICES_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}