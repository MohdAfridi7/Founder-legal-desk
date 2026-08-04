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
/*  Typewriter eyebrow label                                          */
/* ------------------------------------------------------------------ */
function TypewriterLabel({ text, className = "" }) {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  const [count, setCount] = useState(0);
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStarted(true);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    if (reducedRef.current) {
      setCount(text.length);
      return;
    }
    const id = setInterval(() => {
      setCount((c) => {
        if (c >= text.length) {
          clearInterval(id);
          return c;
        }
        return c + 1;
      });
    }, 28);
    return () => clearInterval(id);
  }, [started, text]);

  return (
    <span ref={ref} className={className}>
      {text.slice(0, count)}
      <span
        className="inline-block w-[7px] ml-0.5 -mb-[1px] h-[11px] bg-[#b6883f] animate-[caretBlink_1s_step-end_infinite]"
        aria-hidden="true"
      />
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Practice card with redaction reveal + cursor spotlight             */
/* ------------------------------------------------------------------ */
function PracticeCard({ area, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [spot, setSpot] = useState({ x: 50, y: 50 });

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
      { threshold: 0.25 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  const wave = (index % 3) * 110;

  function handleMove(e) {
    const rect = ref.current.getBoundingClientRect();
    setSpot({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className="group relative overflow-hidden bg-[#f8f5ec] px-7 py-9 transition-colors duration-500 hover:bg-[#0b1a2e]"
    >
      {/* cursor-tracked spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at ${spot.x}% ${spot.y}%, rgba(215,172,102,0.14), transparent 60%)`,
        }}
      />

      {/* left accent bar */}
      <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#d7ac66] origin-bottom scale-y-0 transition-transform duration-500 ease-[cubic-bezier(.16,.84,.44,1)] group-hover:scale-y-100" />

      {/* index — stamped entrance */}
      <span
        className="relative z-[1] block font-legal-mono text-xs text-[#b6883f] mb-5 transition-all duration-500 ease-[cubic-bezier(.2,1.4,.4,1)] group-hover:text-[#f4efe2]"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1) rotate(0deg)" : "scale(1.6) rotate(8deg)",
          transitionDelay: `${wave + 60}ms`,
        }}
      >
        {area.idx}
      </span>

      {/* title — redaction reveal */}
      <div className="relative mb-3 overflow-hidden">
        <h3 className="relative z-[1] font-display text-xl text-[#0b1a2e] transition-colors duration-300 group-hover:text-[#f4efe2]">
          {area.title}
        </h3>
        <span
          className="absolute inset-0 z-[2] bg-[#0b1a2e]"
          style={{
            transform: visible ? "scaleX(0)" : "scaleX(1)",
            transformOrigin: "right",
            transition: "transform 650ms cubic-bezier(.83,0,.17,1)",
            transitionDelay: `${wave + 160}ms`,
          }}
        />
      </div>

      {/* description — redaction reveal, slightly delayed */}
      <div className="relative overflow-hidden">
        <p className="relative z-[1] text-sm text-[#5c6472] leading-relaxed transition-colors duration-300 group-hover:text-[#c7cede]">
          {area.desc}
        </p>
        <span
          className="absolute inset-0 z-[2] bg-[#d7ac66]"
          style={{
            transform: visible ? "scaleX(0)" : "scaleX(1)",
            transformOrigin: "right",
            transition: "transform 650ms cubic-bezier(.83,0,.17,1)",
            transitionDelay: `${wave + 260}ms`,
          }}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */
const practiceAreas = [
  { idx: "§ 01", title: "Corporate & Commercial Law", desc: "Governance, corporate structuring and commercial legal advisory for growing businesses." },
  { idx: "§ 02", title: "Startup Legal Advisory", desc: "End-to-end legal guidance for founders from incorporation through scale." },
  { idx: "§ 03", title: "Company Incorporation & Structuring", desc: "Business formation and structuring aligned to founder and investor goals." },
  { idx: "§ 04", title: "Contract Drafting, Review & Negotiation", desc: "Commercial contracts drafted and negotiated to protect long-term value." },
  { idx: "§ 05", title: "Founder & Investment Agreements", desc: "Shareholder, founder and investment agreements built for clarity and fairness." },
  { idx: "§ 06", title: "MoUs, NDAs & Commercial Contracts", desc: "Confidentiality and commercial documentation for every stage of a deal." },
  { idx: "§ 07", title: "Regulatory Compliance & Governance", desc: "Corporate governance and regulatory compliance kept audit-ready." },
  { idx: "§ 08", title: "Trademark & IP Protection", desc: "Trademark registration and intellectual property strategy for brand assets." },
  { idx: "§ 09", title: "Due Diligence & Risk Assessment", desc: "Legal risk assessment and due diligence for transactions and partnerships." },
];

/* ------------------------------------------------------------------ */
/*  Practice Areas section                                            */
/* ------------------------------------------------------------------ */
export default function PracticeAreas() {
  return (
    <section id="practice" className="relative z-10 bg-[#f4efe2] py-20 sm:py-28 lg:py-32">
      <style jsx global>{`
        .font-display { font-family: "Fraunces", serif; }
        .font-legal-mono { font-family: "IBM Plex Mono", monospace; }

        @keyframes caretBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6 mb-14 sm:mb-16">
            <div>
              <div className="h-px w-16 bg-gradient-to-r from-[#b6883f] to-transparent mb-3" />
              <TypewriterLabel
                text="Exhibit B — Scope of Practice"
                className="font-legal-mono text-xs uppercase tracking-[0.22em] text-[#b6883f]"
              />
              <h2 className="font-display text-[clamp(1.7rem,4.5vw,2.6rem)] font-semibold mt-2">
                Where Adv. Sagir advises
              </h2>
            </div>
            <span className="font-legal-mono text-xs text-[#b6883f] tracking-[0.1em]">02 / 06</span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#0b1a2e]/10 border border-[#0b1a2e]/10">
          {practiceAreas.map((p, i) => (
            <PracticeCard key={p.title} area={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}