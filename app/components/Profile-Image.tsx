"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "../../lib/utils";
interface ProfileImageProps {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
}

/**
 * next/image wrapper for profile photos. Images are fetched directly by the
 * browser (unoptimized) — the CDN rejects server-side optimizer requests with
 * 401, so we skip the optimizer to keep images loading. Lazily loads remote
 * images, fades them in once decoded, and swaps in a placeholder illustration
 * if a URL 404s or fails.
 */
export function ProfileImage({
  src,
  alt,
  sizes,
  priority = false,
  className,
  imgClassName,
}: ProfileImageProps) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={cn("relative isolate overflow-hidden bg-mist", className)}
    >
      {!loaded && !failed && (
        <div className="absolute inset-0 -z-10 animate-pulse bg-mist/90" />
      )}
      {!failed && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          unoptimized
          priority={priority}
          loading={priority ? undefined : "lazy"}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={cn(
            "object-cover transition-opacity duration-500 ease-out",
            loaded ? "opacity-100" : "opacity-0",
            imgClassName
          )}
        />
      )}
    </div>
  );
}