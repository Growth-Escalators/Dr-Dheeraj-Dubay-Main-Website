"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

// Wraps next/image with an onError handler that swaps to a fallback src.
// Needed because next/image's error handling requires client-side state,
// and most pages here render the image inside server components.
export function ImageWithFallback({
  src,
  fallbackSrc,
  alt,
  ...rest
}: Omit<ImageProps, "src"> & { src: string; fallbackSrc: string }) {
  const [currentSrc, setCurrentSrc] = useState(src);
  return (
    <Image
      {...rest}
      src={currentSrc}
      alt={alt}
      onError={() => {
        if (currentSrc !== fallbackSrc) setCurrentSrc(fallbackSrc);
      }}
    />
  );
}
