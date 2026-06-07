"use client";

import { useState } from "react";
import { MapPinIcon } from "lucide-react";

interface Props {
  src: string;
  title: string;
  height?: number;
}

// Lazy Google Maps iframe — renders a click-to-load placeholder until the
// user opts in. Iframes are heavy (~1MB+ each); deferring them removes
// the homepage / contact page CWV penalty.
export function LazyMapEmbed({ src, title, height = 320 }: Props) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        src={src}
        title={title}
        width="100%"
        height={height}
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      aria-label={`Load map: ${title}`}
      className="w-full bg-gray-100 border border-gray-200 rounded-lg flex flex-col items-center justify-center hover:bg-gray-50 transition group cursor-pointer"
      style={{ height }}
    >
      <MapPinIcon className="w-10 h-10 text-emerald-600 mb-2 group-hover:scale-110 transition-transform" />
      <span className="text-sm font-semibold text-gray-700">Click to load map</span>
      <span className="text-xs text-gray-400 mt-1">{title}</span>
    </button>
  );
}
