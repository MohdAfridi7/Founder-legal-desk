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
/*  Skill pill                                                        */
/* ------------------------------------------------------------------ */
function SkillTag({ name, accent }) {
  return (
    <div
      className={`group relative overflow-hidden cursor-default border rounded-full px-4 py-2 font-legal-mono text-[12px] sm:text-[13px] transition-transform duration-300 hover:-translate-y-0.5 ${
        accent ? "border-[#d7ac66]/50 text-[#d7ac66]" : "border-[#f4efe2]/25 text-[#f4efe2]/90"
      }`}
    >
      <span
        className={`absolute inset-0 translate-y-full transition-transform duration-400 ease-[cubic-bezier(.65,0,.35,1)] group-hover:translate-y-0 ${
          accent ? "bg-[#d7ac66]" : "bg-[#f4efe2]"
        }`}
      />
      <span className="relative z-10 transition-colors duration-300 group-hover:text-[#0b1a2e]">
        {name}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Data — grouped into legal "clauses"                               */
/* ------------------------------------------------------------------ */
const clauses = [
  {
    num: "5.1",
    title: "Corporate & Governance",
    skills: [
      { name: "Corporate Law", accent: true },
      { name: "Corporate Governance" },
      { name: "Business Structuring" },
      { name: "Regulatory Compliance" },
    ],
  },
  {
    num: "5.2",
    title: "Advisory & Strategy",
    skills: [
      { name: "Business Consulting" },
      { name: "Startup Advisory" },
      { name: "Commercial Advisory" },
      { name: "Legal Analysis" },
    ],
  },
  {
    num: "5.3",
    title: "IP & Risk Management",
    skills: [
      { name: "Intellectual Property", accent: true },
      { name: "Trademark Registration" },
      { name: "Due Diligence" },
      { name: "Risk Management" },
    ],
  },
  {
    num: "5.4",
    title: "Documentation & Practice",
    skills: [
      { name: "Contract Drafting" },
      { name: "Legal Documentation" },
      { name: "Criminal Law", accent: true },
      { name: "Law" },
    ],
  },
];

const totalSkills = clauses.reduce((acc, c) => acc + c.skills.length, 0);

/* ------------------------------------------------------------------ */
/*  Skills section — dark, clause-based legal-document layout         */
/* ------------------------------------------------------------------ */
export default function Skills() {
  return (
    <section id="skills" className="relative z-10 bg-[#0b1a2e] text-[#f4efe2] py-20 sm:py-28 lg:py-32 overflow-hidden">
      <style jsx global>{`
        .font-display {
          font-family: "Fraunces", serif;
        }
        .font-legal-mono {
          font-family: "IBM Plex Mono", monospace;
        }
      `}</style>

      {/* ambient glow */}
      <div className="pointer-events-none absolute -top-40 right-0 w-[500px] h-[500px] bg-[#d7ac66]/[0.06] rounded-full blur-[130px]" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        {/* ---------------- Header ---------------- */}
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12 sm:mb-16">
            <div>
              <div className="h-px w-16 bg-gradient-to-r from-[#d7ac66] to-transparent mb-3" />
              <span className="font-legal-mono text-xs uppercase tracking-[0.22em] text-[#d7ac66]">
                Exhibit E — Areas of Skill
              </span>
              <h2 className="font-display text-[clamp(1.7rem,4.5vw,2.6rem)] font-semibold mt-2 text-[#f4efe2]">
                Clauses of expertise
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-legal-mono text-xs text-[#d7ac66] tracking-[0.1em]">05 / 06</span>
              <span className="hidden sm:block h-8 w-px bg-[#f4efe2]/15" />
              <span className="hidden sm:block font-legal-mono text-[11px] text-[#8b95a8] tracking-[0.08em] uppercase">
                {String(totalSkills).padStart(2, "0")} skills on record
              </span>
            </div>
          </div>
        </Reveal>

        {/* ---------------- Sealed document panel ---------------- */}
        <Reveal delay={100}>
          <div className="relative border border-[#f4efe2]/12 rounded-sm px-5 py-8 sm:px-10 sm:py-12">
            {/* corner marks */}
            <span className="absolute -top-px -left-px w-5 h-5 border-t-2 border-l-2 border-[#d7ac66]" />
            <span className="absolute -top-px -right-px w-5 h-5 border-t-2 border-r-2 border-[#d7ac66]" />
            <span className="absolute -bottom-px -left-px w-5 h-5 border-b-2 border-l-2 border-[#d7ac66]" />
            <span className="absolute -bottom-px -right-px w-5 h-5 border-b-2 border-r-2 border-[#d7ac66]" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-14 gap-y-10 lg:gap-y-12">
              {clauses.map((c, i) => (
                <Reveal key={c.num} delay={i * 90}>
                  <div className="relative">
                    <div className="flex items-baseline gap-4 mb-5 pb-4 border-b border-[#f4efe2]/10">
                      <span
                        className="font-display text-3xl sm:text-4xl font-semibold leading-none select-none"
                        style={{ WebkitTextStroke: "1px #d7ac66", color: "transparent" }}
                      >
                        {c.num}
                      </span>
                      <h3 className="font-display text-lg sm:text-xl text-[#f4efe2]">{c.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2.5 sm:gap-3">
                      {c.skills.map((s) => (
                        <SkillTag key={s.name} name={s.name} accent={s.accent} />
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}