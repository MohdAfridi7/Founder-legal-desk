"use client";

import Hero from "../../../compontents/profile/Hero";
import Ticker from "../../../compontents/profile/Ticker";
import About from "../../../compontents/profile/About";
import PracticeAreas from "../../../compontents/profile/PracticeAreas";
import Experience from "../../../compontents/profile/Experience";
import Education from "../../../compontents/profile/Education";
import Skills from "../../../compontents/profile/Skills";


/* ------------------------------------------------------------------ */
/*  Main component                                                    */
/* ------------------------------------------------------------------ */
export default function SagirAhmadProfile() {
  return (
    <div className="relative bg-[#f4efe2] text-[#0b1a2e] font-sans overflow-x-hidden">
      <Hero />
      <Ticker />
      <About />
      <PracticeAreas />
      <Experience />
      <Education />
      <Skills />
    </div>
  );
}