"use client";

import Image,{ type StaticImageData } from "next/image";
import { useState } from "react";
import { cn } from "../../lib/utils";
interface ProfileImageProps {
  src: string | StaticImageData;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
}
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