"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { safeImageUrl } from "@/lib/image-url";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

interface Event {
  id: string;
  title: string;
  videoLink?: string;
  imageUrl?: string;
  description: string;
  createdAt: string;
}

const EventsClient = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  // Renders the event image straight from the stored URL, the same way the
  // homepage does.
  //
  // This used to throw away the URL, keep only the filename, and ask
  // /api/r2/get-signed-url to sign it as a Cloudflare R2 object — then
  // `return null` when that produced nothing, leaving a blank box with no
  // error. No event image is in R2: they are local paths like
  // /assets/images/HomePagePic.jpeg, and anything uploaded through the CRM
  // now lands on Vercel Blob. So every image on this page rendered blank
  // while the same image showed fine on the homepage.
  const ImageComponent = ({ src, alt }: { src: string; alt: string }) => {
    const url = safeImageUrl(src, "");
    // Events can be published without a photo — show a labelled panel rather
    // than a bare gap where the image would be.
    if (!url) return <ImagePlaceholder label="Event" kind="event" />;

    return (
      <Image
        src={url}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover rounded-t-lg"
        // Event images come from whatever the CRM uploaded to; skipping the
        // optimizer keeps an unconfigured host from throwing here.
        unoptimized
      />
    );
  };

  const eventSchema = events.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Dr. Dheeraj Dubay Events and OPD Camps",
    "itemListElement": events.map((event, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "item": {
        "@type": "Event",
        "name": event.title,
        "description": event.description || event.title,
        "startDate": event.createdAt,
        "eventStatus": "https://schema.org/EventScheduled",
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        "location": {
          "@type": "Place",
          "name": "Jaipur, Rajasthan",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Jaipur",
            "addressRegion": "Rajasthan",
            "addressCountry": "IN"
          }
        },
        "organizer": {
          "@type": "Person",
          "name": "Dr. Dheeraj Dubay",
          "url": "https://www.drdubay.in/about"
        },
        "image": event.imageUrl || undefined
      }
    }))
  } : null

  if (loading) {
    return (
      <>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </>
    );
  }

  return (
    <>
      {eventSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
        />
      )}
      <div className="max-w-6xl mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
            Latest Updates & Events
          </h1>
          <div className="h-1 w-24 bg-primary mx-auto rounded-full"></div>
        </div>

        {events.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <p className="text-xl">
              Events coming soon — check back for Dr. Dubay&apos;s latest
              health camps and activities.
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="relative pt-[56.25%]">
                {event.videoLink ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(event.videoLink)}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full rounded-t-lg"
                  ></iframe>
                ) : (
                  // Renders the placeholder when imageUrl is absent — three of
                  // the four current events have no image, and this box left an
                  // unexplained blank space above the title.
                  <ImageComponent src={event.imageUrl || ""} alt={event.title} />
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {event.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {event.description}
                </p>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    {/* "View Image" used to show on every card, including the
                        ones with no image at all. */}
                    {event.videoLink ? (
                      <>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                        </svg>
                        <span>Watch Video</span>
                      </>
                    ) : event.imageUrl ? (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>View Image</span>
                      </>
                    ) : null}
                  </div>
                  <div className="h-3 w-px bg-gray-300"></div>
                  <span>{new Date(event.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default EventsClient;
