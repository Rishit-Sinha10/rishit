"use client";
import dynamic from "next/dynamic";
import Portfolio from "../app/pages/Home";
import Work from "./projects/page";
import Experience from "./experience/[[...rest]]/page";
export default function App() {
  return (
    <>
      <Portfolio />
      <Experience/>
    </>
  );
}
