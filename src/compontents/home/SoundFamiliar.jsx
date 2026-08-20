"use client";
import React, { useEffect, useRef, useState } from "react";

/* ============================================================
   TOKENS
   ============================================================ */
const C = {
  navy950: "#080D1A",
  amber500: "#F5A623",
  amber400: "#FFC157",
  Gold: '#C7954A',
  ink900: "#12151F",
  ink700: "#33384A",
  slate500: "#6B7184",
  cream50: "#F7F6F2",
  white: "#FFFFFF",
  red: "#D14343",
};

const fontDisplay = { fontFamily: "'Fraunces', Georgia, serif" };

/* ============================================================
   GLOBAL STYLE — signature animation: each card behaves like a
   flagged document — it drops in like a paper landing on a desk,
   a rubber-stamp number thuds down, and the headline gets
   marked up with a highlighter sweep, exactly like a specialist
   reviewing a flawed contract.
   ============================================================ */
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700;800&display=swap');
    .sf-root{font-family:'Inter',sans-serif;}

    /* paper drop-in */
    @keyframes sf-drop{
      0%{opacity:0; transform:translateY(-60px) rotate(var(--sf-rot-start)) scale(.96);}
      60%{opacity:1; transform:translateY(6px) rotate(calc(var(--sf-rot-end) * 1.4)) scale(1.01);}
      80%{transform:translateY(-2px) rotate(calc(var(--sf-rot-end) * .7)) scale(1);}
      100%{opacity:1; transform:translateY(0) rotate(var(--sf-rot-end)) scale(1);}
    }
    .sf-card{
      opacity:0;
      transform-origin:top center;
    }
    .sf-card.sf-in{
      animation:sf-drop .85s cubic-bezier(.22,.9,.32,1.1) forwards;
      animation-delay:var(--sf-delay);
    }

    /* rubber stamp number */
    @keyframes sf-stamp{
      0%{opacity:0; transform:scale(2.6) rotate(-18deg);}
      55%{opacity:1; transform:scale(.85) rotate(-6deg);}
      75%{transform:scale(1.08) rotate(-9deg);}
      100%{opacity:1; transform:scale(1) rotate(-7deg);}
    }
    .sf-stamp{ opacity:0; }
    .sf-card.sf-in .sf-stamp{
      animation:sf-stamp .5s cubic-bezier(.3,1.6,.4,1) forwards;
      animation-delay:calc(var(--sf-delay) + .5s);
    }

    /* highlighter sweep behind headline */
    .sf-hl-wrap{ position:relative; display:inline; }
    .sf-hl-bar{
      position:absolute; left:-3px; right:100%; top:8%; bottom:2%;
      background:rgba(245,166,35,.35);
      transform:skewX(-6deg);
      z-index:0;
      transition:right 0s;
    }
    .sf-card.sf-in .sf-hl-bar{
      animation:sf-sweep .55s cubic-bezier(.4,0,.2,1) forwards;
      animation-delay:calc(var(--sf-delay) + .95s);
    }
    @keyframes sf-sweep{ to{ right:-3px; } }
    .sf-hl-text{ position:relative; z-index:1; }

    /* underline squiggle for description, like a specialist's red pen */
    .sf-underline{
      stroke-dasharray:400;
      stroke-dashoffset:400;
    }
    .sf-card.sf-in .sf-underline{
      animation:sf-draw 1s ease-out forwards;
      animation-delay:calc(var(--sf-delay) + 1.3s);
    }
    @keyframes sf-draw{ to{ stroke-dashoffset:0; } }

    /* dog-ear corner fold */
    .sf-fold{
      position:absolute; top:0; right:0; width:34px; height:34px;
      background:linear-gradient(135deg, transparent 50%, rgba(18,21,31,.06) 50.5%, rgba(18,21,31,.1) 100%);
      transition:width .35s ease, height .35s ease;
      pointer-events:none;
      border-bottom-left-radius:4px;
    }
    .sf-card:hover .sf-fold{ width:46px; height:46px; }

    @media (prefers-reduced-motion: reduce){
      .sf-card, .sf-card.sf-in, .sf-stamp, .sf-hl-bar, .sf-underline{
        animation:none !important; opacity:1 !important; transform:none !important;
      }
      .sf-hl-bar{ right:-3px !important; }
      .sf-underline{ stroke-dashoffset:0 !important; }
    }
  `}</style>
);

/* ============================================================
   DATA — edit copy here
   ============================================================ */
const problems = [
  {
    t: "Legal Questions Keep Coming",
    d: "Contracts, employees, compliance, IP, vendors, customers, notices. There is always something that needs legal attention.",
  },
  {
    t: "But Who Do You Call?",
    d: "Most startups and MSMEs don't have a dedicated legal team. Every new issue means finding the right person, getting advice and starting from scratch.",
  },
  {
    t: "And Problems Don't Wait",
    d: "A small legal gap today can become a costly dispute, compliance issue or business risk tomorrow.",
  },
];

/* ============================================================
   REVEAL HOOK
   ============================================================ */
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setInView(true)),
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ============================================================
   PROBLEM CARD
   ============================================================ */
function ProblemCard({ num, title, desc, index }) {
  const [ref, inView] = useInView(0.25);
  const rotStart = index % 2 === 0 ? "-4deg" : "4deg";
  const rotEnd = index % 2 === 0 ? "-1.4deg" : "1.4deg";

  return (
    <div
      ref={ref}
      className={`sf-card relative rounded-2xl p-7 sm:p-8 border transition-shadow duration-300 ${inView ? "sf-in" : ""}`}
      style={{
        background: C.white,
        borderColor: "rgba(18,21,31,.08)",
        boxShadow: "0 10px 30px -18px rgba(8,13,26,.25)",
        "--sf-delay": `${index * 0.18}s`,
        "--sf-rot-start": rotStart,
        "--sf-rot-end": rotEnd,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 24px 50px -18px rgba(8,13,26,.35)")}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 10px 30px -18px rgba(8,13,26,.25)")}
    >
      <div className="sf-fold" />

      <div
        className="sf-stamp inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 mb-5 text-[13px] font-extrabold tracking-wide"
        style={{ borderColor: C.amber500, color: C.amber500, ...fontDisplay }}
      >
        0{num}
      </div>

      <h3 className="text-[18px] sm:text-[19px] ] mb-3 leading-snug  font-semibold" style={fontDisplay}>
        <span className="sf-hl-wrap">
          <span className="sf-hl-bar" />
          <span className="sf-hl-text text-black">{title}</span>
        </span>
      </h3>

      <p className="text-[14.5px] sm:text-[15px] relative" style={{ color: C.slate500 }}>
        {desc}
      </p>

      {/* hand-drawn underline flourish */}
      <svg className="mt-3" width="60" height="8" viewBox="0 0 60 8" fill="none">
        <path
          className="sf-underline"
          d="M2 5.5C12 2 24 2 32 5C40 8 50 4 58 2.5"
          stroke={C.amber500}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

/* ============================================================
   SECTION
   ============================================================ */
export default function SoundFamiliar({
  eyebrow = "The problem",
  title = "Sound familiar?",
}) {
  const [headRef, headIn] = useInView(0.4);
  return (
    <section className="sf-root py-16 sm:py-24" style={{ background: C.cream50 }}>
      <GlobalStyle />
      <div className="max-w-[1180px] mx-auto px-6">
        <div
          ref={headRef}
          className="text-center mb-12 sm:mb-14 transition-all duration-700"
          style={{
            opacity: headIn ? 1 : 0,
            transform: headIn ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <div
            className="inline-flex items-center gap-2 text-[12px] sm:text-[12.5px] font-bold uppercase tracking-[.14em] mb-4 justify-center"
            style={{ color: C.Gold }}
          >
            <span style={{ width: 20, height: 1, background: C.amber500 }} />
            {eyebrow}
          </div>
         <h2
  className="overflow-hidden text-[26px] sm:text-[34px] lg:text-[42px] leading-[1.15] font-semibold"
  style={{ ...fontDisplay, color: C.ink900, letterSpacing: "-.01em" }}
>
  <span
    className="block transition-all duration-1000"
    style={{
      transform: headIn ? "translateY(0%)" : "translateY(100%)",
      opacity: headIn ? 1 : 0,
    }}
  >
      Every Growing Business Runs Into
    <span style={{ color: C.Gold }}> Legal Problems.</span>
  </span>
</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {problems.map((p, i) => (
            <ProblemCard key={i} num={i + 1} title={p.t} desc={p.d} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}