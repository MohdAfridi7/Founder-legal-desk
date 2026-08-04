"use client";

import { useEffect, useId, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Seal component (used only in this section)                        */
/* ------------------------------------------------------------------ */
function SealRing({ size = 150 }) {
  const pathId = useId();

  return (
    <div
      className="relative flex items-center justify-center rounded-full"
      style={{ width: size, height: size }}
    >
      {/* Outer engraved ring */}
      <div className="absolute inset-0 rounded-full border-2 border-[#d7ac66]" />
      <div className="absolute inset-[4px] rounded-full border border-[#d7ac66]/25" />

      {/* Rotating curved micro-text */}
      <svg
        viewBox="0 0 150 150"
        className="absolute inset-0 animate-[spinSlow_50s_linear_infinite]"
        style={{ width: size, height: size }}
        aria-hidden="true"
      >
        <defs>
          <path
            id={pathId}
            d="M 75,75 m -58,0 a 58,58 0 1,1 116,0 a 58,58 0 1,1 -116,0"
          />
        </defs>
        <text fill="#d7ac66" fontSize="6.4" letterSpacing="2.2" fontFamily="'IBM Plex Mono', monospace">
          <textPath href={`#${pathId}`} startOffset="0%">
            FOUNDERS LEGAL DESK &#8226; CORPORATE COUNSEL &#8226; FOUNDERS LEGAL DESK &#8226; CORPORATE COUNSEL &#8226;
          </textPath>
        </text>
      </svg>

      {/* Counter-rotating dashed ring */}
      <div className="absolute inset-[20px] rounded-full border border-dashed border-[#d7ac66]/45 animate-[spinReverse_38s_linear_infinite]" />

      {/* Profile Image */}
      <div className="absolute inset-[28px] rounded-full overflow-hidden ring-1 ring-[#d7ac66]/50 shadow-[0_0_0_4px_rgba(11,26,46,0.6)]">
        <img
          src="https://media.licdn.com/dms/image/v2/D5603AQEGD7WmaDUHBQ/profile-displayphoto-crop_800_800/B56Z.lLOtrG4AI-/0/1785182615999?e=1787184000&v=beta&t=o-5W0Vlr73OkBJQ6_iqAaWKehl1k3qWGl0nv_NaKnFs"
          alt="Adv. Sagir Ahmad"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */
const sealTags = ["Corporate Law", "Contracts", "IP"];

const tickerItems = [
  "FLD / 2026",
  "Corporate Advisory",
  "Contract Drafting & Negotiation",
  "IP Protection & Licensing",
  "Startup Compliance",
  "Fundraising Counsel — Seed to Series C",
  "Founders Legal Desk",
];

/* ------------------------------------------------------------------ */
/*  Hero section                                                      */
/* ------------------------------------------------------------------ */
export default function Hero() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const frameRef = useRef(null);
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedRef.current) return;

    function handleMove(e) {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(() => setTilt({ x, y }));
    }

    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <header className="relative min-h-[92vh] sm:min-h-screen flex items-center pt-16 pb-16 sm:pt-20 overflow-hidden bg-[#070c16]">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,450;0,9..144,600;0,9..144,700;1,9..144,450&family=Inter:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap");

        .font-display { font-family: "Fraunces", serif; }
        .font-legal-mono { font-family: "IBM Plex Mono", monospace; }
        .font-sans { font-family: "Inter", sans-serif; }

        @keyframes riseUp { to { transform: translateY(0); } }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes stampIn {
          0% { opacity: 0; transform: scale(1.5) rotate(-10deg); filter: blur(4px); }
          60% { opacity: 1; transform: scale(0.94) rotate(2deg); filter: blur(0); }
          100% { opacity: 1; transform: scale(1) rotate(-2deg); }
        }
        @keyframes scrollmove {
          0% { top: -100%; }
          100% { top: 100%; }
        }
        @keyframes spinSlow { to { transform: rotate(360deg); } }
        @keyframes spinReverse { to { transform: rotate(-360deg); } }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .hero-line span {
          display: inline-block;
          transform: translateY(110%);
          animation: riseUp 1s cubic-bezier(0.16, 0.84, 0.44, 1) forwards;
        }
        .ticker-track {
          display: flex;
          width: max-content;
          animation: marquee 34s linear infinite;
        }
        a:focus-visible {
          outline: 2px solid #d7ac66;
          outline-offset: 3px;
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* Parallax background image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLbu7AfkFH_2Fd0dxH5B8_N_Q0KY-tzU2EH7BquL3W__DNJsgM4udkyrw&s=10')",
          transform: `scale(1.08) translate(${tilt.x * -18}px, ${tilt.y * -10}px)`,
          transition: "transform 0.5s ease-out",
        }}
      />

      {/* Background overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(7,12,22,.95) 0%, rgba(7,12,22,.85) 28%, rgba(7,12,22,.55) 55%, rgba(7,12,22,.15) 100%)",
        }}
      />
      <div className="absolute inset-0 bg-black/20 z-0" />

      {/* Faint dot texture */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(11,26,46,0.06) 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* Paper-grain texture (legal-document feel) */}
      <svg className="hidden">
        <filter id="grainFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" result="noise" />
          <feColorMatrix in="noise" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.05 0" />
        </filter>
      </svg>
      <div
        className="pointer-events-none absolute inset-0 z-[2] mix-blend-overlay"
        style={{ filter: "url(#grainFilter)" }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px] gap-10 lg:gap-16 items-center">
          <div>
            <div className="font-legal-mono text-[11px] sm:text-xs text-white/70 tracking-[0.18em] flex flex-wrap gap-x-5 gap-y-2 mb-6 uppercase">
              <span>DOCKET <b className="text-white">FLD/2026</b></span>
              <span>SEAT <b className="text-white">Delhi, India</b></span>
              <span>STATUS <b className="text-white">Practising</b></span>
            </div>

            <h1 className="font-display text-white font-semibold leading-[1.02] text-[clamp(2.1rem,7vw,4.2rem)] mb-6 overflow-hidden">
              <span className="hero-line block overflow-hidden">
                <span style={{ animationDelay: "0.15s" }}>Adv. Sagir Ahmad</span>
              </span>
              <span className="hero-line block overflow-hidden">
                <span style={{ animationDelay: "0.28s" }}>
                  — <em className="italic text-[#d7ac66] font-normal">Corporate &amp; Startup Counsel</em>
                </span>
              </span>
            </h1>

            <p
              className="text-white text-base sm:text-lg leading-relaxed max-w-xl mb-8 opacity-0"
              style={{ animation: "fadeUp 0.9s ease forwards", animationDelay: "0.6s" }}
            >
              Founder of Founders Legal Desk, advising startups, entrepreneurs, SMEs and
              investors on corporate law, commercial contracts, compliance and intellectual
              property — with legal counsel roles at Startup Times and Devobyte.
            </p>

            <div
              className="flex flex-wrap gap-4 opacity-0"
              style={{ animation: "fadeUp 0.9s ease forwards", animationDelay: "0.78s" }}
            >
              <a
                href="#free-consultation"
                className="group relative overflow-hidden border border-[#0b1a2e] bg-[#0b1a2e] px-7 py-4 font-legal-mono text-xs tracking-[0.08em] uppercase text-[#f8f5ec] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(11,26,46,0.28)]"
              >
                <span className="absolute inset-0 -translate-x-full bg-[#d7ac66] transition-transform duration-500 ease-[cubic-bezier(.65,0,.35,1)] group-hover:translate-x-0" />
                <span className="relative z-10 flex items-center gap-2">
                  Consult Adv. Sagir
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                    <path d="M1 6h9.5M6.5 1.5 11 6l-4.5 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
              <a
                href="#experience"
                className="border border-[#0b1a2e] px-7 py-4 font-legal-mono text-xs tracking-[0.08em] uppercase text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#d7ac66] hover:text-[#f8f5ec]"
              >
                View case history
              </a>
            </div>
          </div>

          {/* Seal card */}
          <div className="flex items-center justify-center order-first lg:order-last">
            <div
              className="relative w-full max-w-[300px] sm:max-w-[320px] aspect-[3/3.4] bg-[#0b1a2e] border border-[#d7ac66]/50 flex flex-col items-center justify-center px-7 py-9 shadow-[0_20px_60px_rgba(11,26,46,0.18)] opacity-0"
              style={{ animation: "stampIn 1s cubic-bezier(.2,1.4,.4,1) forwards", animationDelay: "0.9s" }}
            >
              {/* corner fold detail */}
              <div className="absolute top-0 right-0 w-8 h-8 bg-[#070c16] [clip-path:polygon(100%_0,0_0,100%_100%)] opacity-70" />

              <div className="mb-6">
                <SealRing />
              </div>
              <h3 className="font-display text-xl text-[#f4efe2] font-semibold text-center mb-1">
                Sagir Ahmad
              </h3>
              <p className="font-legal-mono text-[10px] text-[#d7ac66] uppercase tracking-[0.14em] text-center mb-6">
                Founder · Founders Legal Desk
              </p>
              <div className="w-11 h-px bg-[#b6883f] mb-5" />
              <div className="flex flex-wrap gap-2 justify-center">
                {sealTags.map((t) => (
                  <span
                    key={t}
                    className="font-legal-mono text-[10px] uppercase tracking-wide text-[#f4efe2] border border-[#f4efe2]/25 px-2.5 py-1.5"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

 

    
    </header>
  );
}