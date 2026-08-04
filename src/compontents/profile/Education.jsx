"use client";

import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Reveal-on-scroll wrapper (used only in this section)               */
/* ------------------------------------------------------------------ */
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-[900ms] ease-[cubic-bezier(.16,.84,.44,1)] ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Docket entry row — shared editorial style                        */
/* ------------------------------------------------------------------ */
function DocketRow({ number, title, subtitle, meta, current = false }) {
  return (
    <div className="group relative grid grid-cols-[52px_1fr] sm:grid-cols-[64px_1fr] gap-x-5 sm:gap-x-7 py-7 sm:py-8 px-2 sm:px-3 -mx-2 sm:-mx-3 border-b border-[#0b1a2e]/10 transition-colors duration-500 hover:bg-[#0b1a2e]/[0.025]">
      {/* left accent bar */}
      <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#b6883f] to-[#7c2b2b] origin-top scale-y-0 transition-transform duration-500 ease-out group-hover:scale-y-100" />

      {/* outline number */}
      <span
        className="font-display text-[2.1rem] sm:text-[2.5rem] leading-[0.75] font-semibold select-none transition-all duration-500 group-hover:text-[#b6883f]"
        style={{ WebkitTextStroke: "1px #b6883f", color: "transparent" }}
      >
        {String(number).padStart(2, "0")}
      </span>

      {/* content */}
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1 mb-1.5">
          <h4 className="font-display text-lg sm:text-xl text-[#0b1a2e] transition-colors duration-300 group-hover:text-[#7c2b2b]">
            {title}
          </h4>
          {current && (
            <span className="inline-flex items-center gap-1.5 font-legal-mono text-[9px] uppercase tracking-[0.12em] text-[#b6883f]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b6883f] animate-pulse" />
              Active
            </span>
          )}
        </div>
        <div className="text-sm text-[#5c6472] mb-2 leading-relaxed">{subtitle}</div>
        <div className="font-legal-mono text-[10px] sm:text-[11px] uppercase tracking-[0.1em] text-[#b6883f]">
          {meta}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */
const education = [
  {
    school: "Jamia Millia Islamia",
    degree: "Bachelor of Laws — LLB, Law",
    years: "2021 – 2026 · Bachelor's Degree",
    current: true,
  },
  {
    school: "School of Excellence",
    degree: "Science Stream (PCM)",
    years: "Jul 2019 – Mar 2021 · CBSE 12th — 87%",
    current: false,
  },
];

const certifications = [
  {
    school: "Bar Council of Delhi",
    degree: "Enrolled Advocate",
    years: "Practising · Delhi, India",
    current: true,
  },
  {
    school: "Search Engine Optimization",
    degree: "Issued by Google",
    years: "Digital & Marketing Credential",
    current: false,
  },
];

/* ------------------------------------------------------------------ */
/*  Education & Certifications section — editorial docket layout      */
/* ------------------------------------------------------------------ */
export default function Education() {
  return (
    <section id="education" className="relative z-10 bg-[#f8f5ec] py-20 sm:py-28 lg:py-32">
      <style jsx global>{`
        .font-display {
          font-family: "Fraunces", serif;
        }
        .font-legal-mono {
          font-family: "IBM Plex Mono", monospace;
        }
      `}</style>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        {/* ---------------- Header ---------------- */}
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12 sm:mb-16">
            <div>
              <div className="h-px w-16 bg-gradient-to-r from-[#b6883f] to-transparent mb-3" />
              <span className="font-legal-mono text-xs uppercase tracking-[0.22em] text-[#b6883f]">
                Exhibit D — Credentials
              </span>
              <h2 className="font-display text-[clamp(1.7rem,4.5vw,2.6rem)] font-semibold mt-2 text-[#0b1a2e]">
                Education &amp; certification
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-legal-mono text-xs text-[#b6883f] tracking-[0.1em]">04 / 06</span>
              <span className="hidden sm:block h-8 w-px bg-[#0b1a2e]/10" />
              <span className="hidden sm:block font-legal-mono text-[11px] text-[#5c6472] tracking-[0.08em] uppercase">
                {String(education.length + certifications.length).padStart(2, "0")} credentials filed
              </span>
            </div>
          </div>
        </Reveal>

        {/* ---------------- Two docket columns ---------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-14">
          <Reveal>
            <div>
              <div className="flex items-center justify-between mb-2 pb-3 border-b border-[#0b1a2e]/15">
                <h3 className="font-legal-mono text-[11px] uppercase tracking-[0.14em] text-[#b6883f]">
                  Education
                </h3>
                <span className="font-legal-mono text-[10px] text-[#8b95a8]">
                  {String(education.length).padStart(2, "0")} entries
                </span>
              </div>
              <div>
                {education.map((e, i) => (
                  <DocketRow
                    key={e.school}
                    number={i + 1}
                    title={e.school}
                    subtitle={e.degree}
                    meta={e.years}
                    current={e.current}
                  />
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div>
              <div className="flex items-center justify-between mb-2 pb-3 border-b border-[#0b1a2e]/15">
                <h3 className="font-legal-mono text-[11px] uppercase tracking-[0.14em] text-[#b6883f]">
                  Licenses &amp; Certifications
                </h3>
                <span className="font-legal-mono text-[10px] text-[#8b95a8]">
                  {String(certifications.length).padStart(2, "0")} entries
                </span>
              </div>
              <div>
                {certifications.map((e, i) => (
                  <DocketRow
                    key={e.school}
                    number={i + 1}
                    title={e.school}
                    subtitle={e.degree}
                    meta={e.years}
                    current={e.current}
                  />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}