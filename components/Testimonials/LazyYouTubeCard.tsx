"use client";

import Image from "next/image";
import { useState } from "react";
import { PlayCircle } from "lucide-react";

interface Props {
  videoId: string;
  title?: string;
  patientName?: string;
  city?: string;
}

// Privacy + Core-Web-Vitals friendly YouTube embed.
// Shows a thumbnail with play button until clicked; only then loads the
// real iframe. Solves two problems at once: (a) black/broken tiles when
// the maxresdefault thumbnail returns 404, (b) heavy iframe weight on
// pages with many videos. Falls back to hqdefault if maxres fails.
export function LazyYouTubeCard({ videoId, title, patientName, city }: Props) {
  const [activated, setActivated] = useState(false);
  const [thumbSrc, setThumbSrc] = useState(
    `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
  );

  return (
    <article className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm flex flex-col h-full">
      <div className="relative aspect-video bg-gray-100">
        {activated ? (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={title || "Patient testimonial"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <button
            type="button"
            onClick={() => setActivated(true)}
            aria-label={`Play video: ${title || patientName || "Patient testimonial"}`}
            className="absolute inset-0 group"
          >
            <Image
              src={thumbSrc}
              alt={title || patientName || "Patient testimonial thumbnail"}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform group-hover:scale-105"
              onError={() => {
                // maxresdefault doesn't always exist; fall back to hqdefault
                if (thumbSrc.includes("maxresdefault")) {
                  setThumbSrc(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`);
                }
              }}
              unoptimized
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
              <PlayCircle className="w-16 h-16 text-white drop-shadow-lg group-hover:scale-110 transition-transform" />
            </div>
          </button>
        )}
      </div>
      {(patientName || title) && (
        <div className="p-4 border-t border-gray-100">
          {patientName && (
            <p className="font-semibold text-gray-900 text-sm">{patientName}</p>
          )}
          {(city || title) && (
            <p className="text-xs text-gray-500 mt-0.5">
              {[city, title].filter(Boolean).join(" — ")}
            </p>
          )}
        </div>
      )}
    </article>
  );
}
