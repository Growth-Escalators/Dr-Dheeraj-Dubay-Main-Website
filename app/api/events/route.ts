import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const events = await db.event.findMany({
      // CRM drag order first (admin → Events), newest-first for anything that
      // hasn't been placed explicitly.
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    });
    
    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { title, videoLink, imageUrl, description } = await req.json();

    const event = await db.event.create({
      data: {
        title,
        videoLink,
        imageUrl,
        description,
      }
    });

    return NextResponse.json(event);
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
} 