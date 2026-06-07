"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Event {
  id: string;
  title: string;
  imageUrl?: string;
  description: string;
  createdAt: string;
}

export default function LatestEvents() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetch("/api/events")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setEvents(data.slice(0, 3));
      })
      .catch(e => console.error('[LatestEvents/fetch]', e));
  }, []);

  if (events.length === 0) return null;

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Latest Events
          </h2>
          <p className="text-gray-500">
            Health camps, walkathons and orthopedic awareness programs
          </p>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full mt-3" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow overflow-hidden border border-gray-100"
            >
              <div className="relative h-48 bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center overflow-hidden">
                {event.imageUrl ? (
                  <Image
                    src={event.imageUrl}
                    alt={event.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                    unoptimized
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                ) : (
                  <span className="text-4xl">🏥</span>
                )}
              </div>
              <div className="p-5">
                <p className="text-xs text-gray-400 mb-1">
                  {new Date(event.createdAt).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                  {event.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/events"
            className="inline-block px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            View All Events
          </Link>
        </div>
      </div>
    </section>
  );
}
