"use client";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "../../lib/utils";
import SignatureSvg from "../../public/Images/file.svg";

interface SignatureProps {
  className?: string;
}

const MotionSignature = motion(SignatureSvg);

export function Signature({ className }: SignatureProps) {
  const prefersReducedMotion = useReducedMotion();

  const svgProps = {
    "aria-hidden": true,
    focusable: false,
    className: cn(
      "h-auto w-full max-w-[560px] text-[var(--foreground)]",
      className,
    ),
  };

  if (prefersReducedMotion) {
    return <SignatureSvg {...svgProps} />;
  }

  return (
    <MotionSignature
      {...svgProps}
      initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
      whileInView={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
      viewport={{ once: true, amount: 0.65 }}
      transition={{ duration: 2.2, ease: [0.65, 0, 0.35, 1] }}
    />
  );
}
