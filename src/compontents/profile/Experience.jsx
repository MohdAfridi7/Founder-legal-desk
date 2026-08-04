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
/*  Data                                                              */
/* ------------------------------------------------------------------ */
const experience = [
  {
    period: "Jan 2026 — Present",
    duration: "8 mos",
    role: "Founder",
    org: "Founders Legal Desk",
    meta: "Full-time · Noida, Uttar Pradesh",
    desc: "Advises startups, entrepreneurs, SMEs and investors on corporate law, commercial contracts, regulatory compliance, IP and legal risk management — combining legal expertise with commercial understanding.",
    bullets: [],
  },
  {
    period: "Mar 2021 — Present",
    duration: "5 yrs 6 mos",
    role: "Legal Counsel",
    org: "Startup Times",
    meta: "Full-time · Noida, Uttar Pradesh",
    desc: "Oversees legal, regulatory and corporate governance functions; advises leadership on legal risk, commercial transactions, IP, employment matters and regulatory compliance.",
    bullets: [
      "Drafts, reviews and negotiates commercial, service, vendor and partnership agreements, NDAs and MoUs",
      "Advises on company law, corporate governance, compliance and risk management",
      "Manages intellectual property matters including trademark protection",
      "Coordinates with external counsel on litigation and regulatory matters",
    ],
  },
  {
    period: "Apr 2022 — Present",
    duration: "4 yrs 5 mos",
    role: "Legal Counsel",
    org: "DevoByte",
    meta: "Full-time · Noida, Uttar Pradesh · Hybrid",
    desc: "Advises startups, SMEs and growing businesses on business structuring, legal documentation, compliance, IP, commercial agreements and digital transformation, while managing client relationships and growth initiatives.",
    bullets: [],
  },
  {
    period: "Jun 2022 — Present",
    duration: "4 yrs 3 mos",
    role: "Legal Intern",
    org: "Supreme Court of India",
    meta: "Delhi",
    desc: "Legal research, drafting and litigation support under an Advocate practising before the Supreme Court of India, across constitutional, civil, criminal and commercial matters.",
    bullets: [],
  },
  {
    period: "Dec 2022 — Jul 2023",
    duration: "8 mos",
    role: "Legal Assistant",
    org: "GAEE, Jamia Millia Islamia",
    meta: "Delhi",
    desc: "Legal and administrative support on contracts, compliance, documentation and institutional governance — drafting notices, orders, agreements and official correspondence.",
    bullets: [],
  },
];

/* ------------------------------------------------------------------ */
/*  Experience section — editorial "case docket" layout               */
/* ------------------------------------------------------------------ */
export default function Experience() {
  return (
    <section id="experience" className="relative z-10 bg-[#0b1a2e] text-[#f4efe2] py-20 sm:py-28 lg:py-32">
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
              <div className="h-px w-16 bg-gradient-to-r from-[#d7ac66] to-transparent mb-3" />
              <span className="font-legal-mono text-xs uppercase tracking-[0.22em] text-[#d7ac66]">
                Exhibit C — Case History
              </span>
              <h2 className="font-display text-[clamp(1.7rem,4.5vw,2.6rem)] font-semibold mt-2 text-[#f4efe2]">
                Experience on record
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-legal-mono text-xs text-[#d7ac66] tracking-[0.1em]">03 / 06</span>
              <span className="hidden sm:block h-8 w-px bg-[#f4efe2]/15" />
              <span className="hidden sm:block font-legal-mono text-[11px] text-[#8b95a8] tracking-[0.08em] uppercase">
                {String(experience.length).padStart(2, "0")} records filed
              </span>
            </div>
          </div>
        </Reveal>

        {/* ---------------- Docket list ---------------- */}
        <div className="border-t border-[#f4efe2]/10">
          {experience.map((e, i) => {
            const isCurrent = e.period.includes("Present");
            return (
              <Reveal key={i} delay={i * 70}>
                <div className="group relative grid grid-cols-1 lg:grid-cols-[104px_220px_1fr] gap-x-8 gap-y-4 py-10 sm:py-12 px-2 sm:px-4 -mx-2 sm:-mx-4 border-b border-[#f4efe2]/10 transition-colors duration-500 hover:bg-[#f4efe2]/[0.025]">
                  {/* left accent bar */}
                  <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#d7ac66] via-[#d7ac66] to-[#7c2b2b] origin-top scale-y-0 transition-transform duration-500 ease-out group-hover:scale-y-100" />

                  {/* index number */}
                  <div className="flex items-baseline gap-4 lg:block">
                    <span
                      className="font-display text-[2.5rem] sm:text-[3rem] lg:text-[3.75rem] leading-[0.8] font-semibold select-none transition-all duration-500 group-hover:text-[#d7ac66]"
                      style={{
                        WebkitTextStroke: "1.1px #d7ac66",
                        color: "transparent",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex flex-col gap-1.5 lg:hidden">
                      <span className="font-legal-mono text-[11px] uppercase tracking-[0.1em] text-[#a9b3c4]">
                        {e.period}
                      </span>
                      <span className="font-legal-mono text-[10px] text-[#8b95a8]">{e.duration}</span>
                    </div>
                  </div>

                  {/* meta column — desktop only */}
                  <div className="hidden lg:flex flex-col gap-2 pt-2">
                    <span className="font-legal-mono text-[11px] uppercase tracking-[0.1em] text-[#a9b3c4]">
                      {e.period}
                    </span>
                    <span className="font-legal-mono text-[10px] text-[#8b95a8] tracking-wide">
                      {e.duration}
                    </span>
                    {isCurrent && (
                      <span className="inline-flex items-center gap-1.5 font-legal-mono text-[10px] uppercase tracking-[0.12em] text-[#d7ac66] mt-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#d7ac66] animate-pulse" />
                        Active engagement
                      </span>
                    )}
                  </div>

                  {/* content */}
                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                      <h3 className="font-display text-2xl sm:text-[1.6rem] text-[#f4efe2] transition-colors duration-300 group-hover:text-[#d7ac66]">
                        {e.role}
                      </h3>
                      {isCurrent && (
                        <span className="lg:hidden inline-flex items-center gap-1.5 font-legal-mono text-[9px] uppercase tracking-[0.12em] text-[#d7ac66]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#d7ac66] animate-pulse" />
                          Active
                        </span>
                      )}
                    </div>
                    <div className="font-legal-mono text-xs sm:text-[0.78rem] text-[#a9b3c4] mb-4">
                      {e.org} <span className="text-[#8b95a8]">· {e.meta}</span>
                    </div>
                    <p className="text-[#c7cede] leading-relaxed text-[0.9rem] sm:text-[0.95rem] max-w-2xl">
                      {e.desc}
                    </p>

                    {e.bullets.length > 0 && (
                      <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
                        {e.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-2.5">
                            <span className="font-legal-mono text-[#d7ac66] text-xs mt-[3px] flex-shrink-0">
                              —
                            </span>
                            <span className="text-[#c7cede] text-[0.85rem] leading-relaxed">{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}