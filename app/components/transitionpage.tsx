"use client";
import { TransitionRouter } from "next-transition-router";
import { PropsWithChildren } from "react";
import gsap from "gsap";
export default function TransitionLayout({
  children,
}: PropsWithChildren) {
  return (
    <TransitionRouter
      auto
      leave={(next) => {
        gsap.to("main", {
          opacity: 0,
          y: -20,
          duration: 0.4,
          onComplete: next,
        });
      }}
      enter={(next) => {
        gsap.fromTo(
          "main",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            onComplete: next,
          }
        );
      }}
    >
      {children}
    </TransitionRouter>
  );
}