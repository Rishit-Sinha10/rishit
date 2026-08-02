"use client";
import dynamic from "next/dynamic";
import Portfolio from "@/app/pages/Home";
const Work = dynamic(() => import("./projects/page"), { ssr: false });
const ExperienceSection = dynamic(
  () => import("../app/pages/experience").then((m) => ({ default: m.Experience })),
  { ssr: false },
);
const Contact = dynamic(() => import("./components/contact"), { ssr: false });
export default function App() {
  return (
    <>
      <Portfolio />
      <Work />
      <ExperienceSection />
      <Contact />
    </>
  );
}
