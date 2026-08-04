"use client";

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */
const ticker = [
  "CORPORATE LAW",
  "STARTUP ADVISORY",
  "CONTRACT DRAFTING",
  "IP PROTECTION",
  "COMPLIANCE",
  "DUE DILIGENCE",
  "RISK MANAGEMENT",
  "COMMERCIAL LAW",
];

/* ------------------------------------------------------------------ */
/*  Ticker section                                                    */
/* ------------------------------------------------------------------ */
export default function Ticker() {
  return (
    <div className="relative z-10 border-y border-[#0b1a2e]/10 bg-[#eee6d3] py-3 overflow-hidden">
      <style jsx global>{`
        .font-legal-mono {
          font-family: "IBM Plex Mono", monospace;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .marquee-track {
          animation: marquee 26s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
      <div className="flex whitespace-nowrap marquee-track w-max">
        {[...ticker, ...ticker].map((t, i) => (
          <span
            key={i}
            className="font-legal-mono text-[11px] sm:text-xs tracking-[0.2em] text-[#5c6472] mx-6 flex items-center gap-6"
          >
            {t}
            <span className="text-[#b6883f]">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}