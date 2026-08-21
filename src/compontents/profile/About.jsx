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
/*  Animated counter (used only in this section)                       */
/* ------------------------------------------------------------------ */
function Counter({ target, suffix = "+" }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !done) {
            const duration = 1400;
            const start = performance.now();
            function tick(now) {
              const p = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              setVal(Math.floor(eased * target));
              if (p < 1) requestAnimationFrame(tick);
              else setDone(true);
            }
            requestAnimationFrame(tick);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    obs.observe(node);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span ref={ref} className="font-display text-3xl sm:text-4xl font-semibold text-[#0b1a2e]">
      {val}
      {done ? suffix : ""}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Framed portrait — with graceful fallback if no photo is present   */
/* ------------------------------------------------------------------ */
function Portrait() {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative max-w-sm mx-auto lg:mx-0">
      {/* offset frame behind the photo */}
      <div className="absolute -top-4 -left-4 sm:-top-5 sm:-left-5 w-full h-full border border-[#b6883f]/60" />

      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#0b1a2e]">
        {!imgError ? (
          <img
            src="/Adv-sagir-ahmad.png"
            alt="Adv. Sagir Ahmad"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover grayscale-[20%] contrast-[1.05]"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span
              className="font-display text-8xl font-semibold select-none"
              style={{ WebkitTextStroke: "1px rgba(244,239,226,0.35)", color: "transparent" }}
            >
              SA
            </span>
          </div>
        )}

        {/* corner brackets on the photo */}
        <span className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#d7ac66]" />
        <span className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[#d7ac66]" />
        <span className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-[#d7ac66]" />
        <span className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-[#d7ac66]" />

        {/* legibility gradient + caption plate */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0b1a2e] via-[#0b1a2e]/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
          <div className="font-display text-xl text-[#f4efe2]">Sagir Ahmad</div>
          <div className="font-legal-mono text-[10px] uppercase tracking-[0.14em] text-[#d7ac66] mt-1.5">
            Founder · Founders Legal Desk
          </div>
        </div>
      </div>

      {/* small floating credential tag */}
      <div className="hidden sm:flex absolute -bottom-5 -right-5 items-center gap-2 bg-[#f8f5ec] border border-[#0b1a2e]/12 px-4 py-2.5 shadow-[0_10px_30px_rgba(11,26,46,0.12)]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#b6883f] animate-pulse" />
        <span className="font-legal-mono text-[10px] uppercase tracking-[0.1em] text-[#5c6472]">
          Bar Council of Delhi
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */
const credentials = [
  { label: "Education", value: "LLB, Jamia Millia Islamia · 2021–2026" },
  { label: "License", value: "Enrolled Advocate, Bar Council of Delhi" },
  { label: "Practice", value: "Corporate, Startup & Commercial Law" },
  { label: "Based in", value: "Delhi, India" },
];

const stats = [
  { n: 5, label: "Years advising startups" },
  { n: 3, label: "Concurrent engagements" },
  { n: 12, label: "Practice areas" },
  { n: 500, label: "Professional network" },
];

/* ------------------------------------------------------------------ */
/*  About section — photo-led attorney bio layout                     */
/* ------------------------------------------------------------------ */
export default function About() {
  return (
    <section id="about" className="relative z-10 bg-[#f8f5ec] py-20 sm:py-28 lg:py-32">
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
          <div className="flex flex-wrap items-end justify-between gap-6 mb-14 sm:mb-16">
            <div>
              <div className="h-px w-16 bg-gradient-to-r from-[#b6883f] to-transparent mb-3" />
              <span className="font-legal-mono text-xs uppercase tracking-[0.22em] text-[#b6883f]">
                Exhibit A — Profile
              </span>
              <h2 className="font-display text-[clamp(1.7rem,4.5vw,2.6rem)] font-semibold mt-2">
                Legal counsel, built for founders
              </h2>
            </div>
            <span className="font-legal-mono text-xs text-[#b6883f] tracking-[0.1em]">01 / 06</span>
          </div>
        </Reveal>

        {/* ---------------- Photo + content ---------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-14 items-start">
          <Reveal className="lg:col-span-5">
            <Portrait />
          </Reveal>

          <Reveal delay={160} className="lg:col-span-7">
            <div>
              <p className="font-display italic text-xl sm:text-2xl leading-snug text-[#0b1a2e] mb-6 max-w-xl">
                &ldquo;Legal services should help businesses move faster with confidence — not
                create unnecessary complexity.&rdquo;
              </p>

              <div className="space-y-5 text-[#2b3547] text-[0.98rem] sm:text-base leading-[1.85]">
                <p>
                  Businesses don&apos;t just need legal documents — they need legal strategies
                  that support growth, reduce risk and protect long-term value. As Founder of
                  Founders Legal Desk, Adv. Sagir Ahmad advises startups, entrepreneurs, SMEs,
                  investors and growing businesses on corporate legal matters, commercial
                  contracts, regulatory compliance, intellectual property and legal risk
                  management.
                </p>
                <p>
                  His approach combines legal expertise with commercial understanding. In
                  addition to independent practice, he serves as Legal Counsel at Startup Times
                  and Devobyte, advising on corporate governance, commercial transactions,
                  contract management, compliance, business structuring, IP protection and legal
                  strategy — insight drawn from working closely with founders at every stage of
                  growth.
                </p>
              </div>

              {/* credentials definition list */}
              <dl className="mt-8 pt-7 border-t border-[#0b1a2e]/10 space-y-3.5">
                {credentials.map((c) => (
                  <div key={c.label} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                    <dt className="font-legal-mono text-[10px] uppercase tracking-[0.12em] text-[#b6883f] sm:w-28 flex-shrink-0">
                      {c.label}
                    </dt>
                    <dd className="text-sm text-[#2b3547]">{c.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>

        {/* ---------------- Vitals strip ---------------- */}
        <Reveal delay={260}>
          <div className="mt-16 sm:mt-20 pt-10 sm:pt-12 border-t border-[#0b1a2e]/10">
            <div className="grid grid-cols-2 sm:grid-cols-4">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`text-center px-4 py-4 sm:py-0 ${
                    i > 0 ? "sm:border-l sm:border-[#0b1a2e]/10" : ""
                  } ${i < 2 ? "border-b sm:border-b-0 border-[#0b1a2e]/10" : ""}`}
                >
                  <Counter target={s.n} />
                  <div className="font-legal-mono text-[10px] uppercase tracking-[0.08em] text-[#5c6472] mt-2.5 max-w-[130px] mx-auto">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}