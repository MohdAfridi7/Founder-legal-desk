"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
/* ============================================================
   DESIGN TOKENS
   ============================================================ */
const C = {
  navy950: "#080D1A",
  amber500: "#F5A623",
  Gold: "#C7954A",
  slate500: "#6B7184",
  slate300: "#A6ACC0",
  ink900: "#12151F",
  white: "#FFFFFF",
  lineDark: "rgba(255,255,255,.09)",
};

const fontDisplay = { fontFamily: "'Fraunces', Georgia, serif" };

const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700;800&display=swap');
    .pricing-root{font-family:'Inter',sans-serif;}
  `}</style>
);

const CheckIcon = ({ size = 17, color = C.amber500 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1.5">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

/* ============================================================
   DATA — edit plans / features here
   ============================================================ */
const plans = [
  {
    name: "Basic",
    price: "₹3,000",
    period: "/month",
    note : "The Startup Legal Safety Net ",
    items: [
      "Up to 3 template documents/month",
      "Basic WhatsApp support (48-hour response)",
      "Compliance calendar alerts",
      "Ideal for early-stage startups",
    ],
  },
  {
    name: "Standard",
    price: "₹10,000",
    period: "/month",
    popular: true,
    note : "The (VC-Ready Fractional GC) ",
    items: [
      "All-Time Ongoing Legal Consultancy",
      "One Dedicated Core Legal Service per Month",
      "Standard Template Library Access",
    ],
  },
  {
    name: "Premium",
    price: "₹25,000 - ₹35,000",
    period: "/month",
    note : "The (Scale-Up GC Command)",
    items: [
      "Unlimited Fractional General Counsel Support",
      "Up to Seven Dedicated Legal Services per Month",
      "The \"IP Lockbox\" Engine",
      "Tech, AI & Data Protection Compliance",
      "Mock Due Diligence Data Room Setup",
      "SHA, SSA & Term Sheet Assistance",
      "End-to-End ESOP Architecture",
    ],
  },
];

/* ============================================================
   PRICING SECTION
   ============================================================ */
export default function Price({
  eyebrow = "Pricing",
  title = "Simple plans. No surprises.",

  onChoosePlan = (planName) => console.log("Chosen:", planName),
  onSeeFullPricing = () => console.log("See full pricing"),
  onRequestQuote = () => console.log("Request quote"),
}) {
  return (
    <section className="pricing-root py-12 sm:py-24" style={{ background: C.white }}>
      <GlobalStyle />
      <div className="max-w-[1180px] mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-11">
          <div className="inline-flex items-center gap-2 text-[12.5px] font-bold uppercase tracking-[.14em] mb-4 justify-center" style={{ color: C.Gold }}>
            <span style={{ width: 20, height: 1, background: C.Gold }} />
            {eyebrow}
          </div>
          <h2
  className="overflow-hidden text-[28px] sm:text-[34px] lg:text-[42px] leading-[1.15] font-semibold"
  style={{
    ...fontDisplay,
    color: C.ink900,
    letterSpacing: "-.01em",
  }}
>
  <motion.span
    className="block"
    initial={{ y: "100%" }}
    whileInView={{ y: "0%" }}
    viewport={{ once: true }}
    transition={{
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    }}
  >
Flexible Legal Support <span className="text-[#C7954A]"> For Every Stage
</span>
  </motion.span>
</h2>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((pl) => (
            <div
              key={pl.name}
              className="rounded-[20px] p-8 h-full flex flex-col border-[1.5px] transition-all duration-300 hover:-translate-y-2 relative"
              style={
                pl.popular
                  ? { borderColor: C.amber500, background: C.navy950 }
                  : { borderColor: "rgba(18,21,31,.09)", background: C.white }
              }
            >
              {pl.popular && (
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[11.5px] font-extrabold px-4 py-1.5 rounded-full tracking-wide whitespace-nowrap"
                  style={{ background: C.amber500, color: C.navy950 }}
                >
                 Best Value
                </div>
              )}

              <h3 className="text-[18px]" style={{ ...fontDisplay, color: pl.popular ? C.white : C.ink900 }}>
                {pl.name}
              </h3>

              <div className="text-[34px] font-semibold my-2.5" style={{ ...fontDisplay, color: pl.popular ? C.white : C.ink900 }}>
                {pl.price}
                <span className="text-[14px] font-normal">{pl.period}</span>
              </div>

              <div className="text-[12.5px] mb-6" style={{ color: pl.popular ? C.slate300 : C.slate500 }}>
                {pl.note}
              </div>

              <div className="flex-1">
                {pl.items.map((it, j) => (
                  <div
                    key={j}
                    className="flex gap-2.5 py-2.5 border-t text-[14px]"
                    style={{
                      borderColor: pl.popular ? C.lineDark : "rgba(18,21,31,.07)",
                      color: pl.popular ? C.white : C.ink900,
                    }}
                  >
                    <span className="flex-shrink-0 mt-0.5"><CheckIcon /></span>
                    <span>{it}</span>
                  </div>
                ))}
              </div>
<Link href="/free-consultation">
              <button
                onClick={() => onChoosePlan(pl.name)}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-bold text-[14.5px] transition-all duration-300 hover:-translate-y-1 active:translate-y-0 w-full"
                style={
                  pl.popular
                    ? { background: C.amber500, color: C.navy950, boxShadow: "0 8px 24px -8px rgba(245,166,35,.35)" }
                    : { border: "1.5px solid rgba(18,21,31,.18)", color: C.ink900, background: "transparent" }
                }
              >
                Get Started
              </button>
              </Link>
            </div>
          ))}
        </div>

        {/* Footer links */}
        <div className="text-center mt-10 flex flex-col gap-2.5">
          
          <Link href="/pricing" className="group inline-flex items-center gap-1.5 font-bold text-[15px] justify-center w-full" style={{ color: C.ink900 }}>
            See full pricing and what's included <ArrowIcon />
          </Link>
          <Link href="/pricing#quote"   className="group inline-flex items-center gap-1.5 font-bold text-[15px] justify-center w-full" style={{ color: C.ink900 }}>
            Don't need a plan? We quote single documents too. <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}