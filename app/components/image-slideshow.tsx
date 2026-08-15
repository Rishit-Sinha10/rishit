"use client";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";
import Image1 from "../../public/Images/imag1.png";
import Image2 from "../../public/Images/imag2.png";
const NOISE =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")";

export type Slide = {
  src: string | StaticImageData;
  alt: string;
  caption: string;
};

export const ABOUT_SLIDES: Slide[] = [
  {
    src: Image1,
    alt: "Rishit Sinha, full-stack developer",
    caption: "A few frames in",
  },
  {
    src: Image2,
    alt: "Rishit Sinha portrait",
    caption: "From the archive",
  },
];

interface ImageSlideshowProps {
  slides: Slide[];
  className?: string;
  layout?: "stacked" | "side";
}

export function ImageSlideshow({
  slides,
  className,
  layout = "stacked",
}: ImageSlideshowProps) {
  const count = slides.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const go = useCallback(
    (delta: number) => {
      setIndex((i) => (((i + delta) % count) + count) % count);
    },
    [count],
  );

  useEffect(() => {
    if (prefersReducedMotion || paused || count <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 5000);
    return () => clearInterval(id);
  }, [prefersReducedMotion, paused, count]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const images = (
    <>
      {slides.map((slide, i) => (
        <Image
          key={i}
          src={slide.src}
          alt={slide.alt}
          fill
          sizes="(max-width: 768px) 100vw, 320px"
          priority={i === 0}
          className={cn(
            "object-cover transition-opacity duration-[1200ms] ease-out",
            i === index ? "opacity-100" : "opacity-0",
          )}
        />
      ))}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: NOISE }}
        aria-hidden="true"
      />
    </>
  );

  const progress = (
    <div className="h-[2px] w-full bg-[var(--border)]/60">
      <div
        className="h-full bg-[var(--foreground)] transition-[width] duration-700 ease-out"
        style={{ width: `${((index + 1) / count) * 100}%` }}
      />
    </div>
  );

  const counter = (
    <p className="text-label" aria-live="polite">
      <span className="tabular-nums">{String(index + 1).padStart(2, "0")}</span>
      <span className="mx-1 text-[var(--border)]">/</span>
      <span className="tabular-nums">{String(count).padStart(2, "0")}</span>
    </p>
  );

  const controls = (
    <div className="flex shrink-0 items-center gap-1">
      <button
        onClick={() => go(-1)}
        aria-label="Previous image"
        className="rounded-md border border-[var(--border)] p-1.5 text-[var(--muted)] transition hover:bg-[var(--accent-light)] hover:text-[var(--foreground)]"
      >
        <ChevronLeft size={14} />
      </button>
      <button
        onClick={() => go(1)}
        aria-label="Next image"
        className="rounded-md border border-[var(--border)] p-1.5 text-[var(--muted)] transition hover:bg-[var(--accent-light)] hover:text-[var(--foreground)]"
      >
        <ChevronRight size={14} />
      </button>
    </div>
  );

  if (layout === "side") {
    return (
      <div
        className={cn("flex w-full flex-col gap-2", className)}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        role="group"
        aria-roledescription="carousel"
        aria-label="A few frames from the journey"
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
          {images}
        </div>
        {progress}
        <div className="flex items-center justify-between gap-4">
          {counter}
          {controls}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn("w-full", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="group"
      aria-roledescription="carousel"
      aria-label="A few frames from the journey"
    >
      <div className="relative aspect-[16/7] w-full overflow-hidden sm:aspect-[21/8]">
        {images}
      </div>
      <div className="mt-3 flex flex-col gap-3">
        <div className="flex items-baseline justify-between gap-4">
          {counter}
          {controls}
        </div>
        {progress}
      </div>
    </div>
  );
}
