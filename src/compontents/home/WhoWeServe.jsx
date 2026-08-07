"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Laptop,
  ShoppingBag,
  Megaphone,
  GraduationCap,
  HeartPulse,
  Users,
  Landmark,
  Truck,
  Factory,
  Building2,
  Camera,
  UtensilsCrossed,
  Plane,
  HardHat,
  Briefcase,
  HandHeart,
  Globe,
  Store,
} from "lucide-react";
/* ============================================================
   TOKENS
   ============================================================ */
const C = {
  navy950: "#080D1A",
  navy900: "#0D1526",
  Gold:"#C7954A",
  amber500: "#F5A623",
  amber400: "#FFC157",
  ink900: "#12151F",
  ink700: "#33384A",
  slate500: "#6B7184",
  cream50: "#F7F6F2",
  cream100: "#F0EEE7",
  white: "#FFFFFF",
};

const headingVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fontDisplay = { fontFamily: "'Fraunces', Georgia, serif" };

const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700;800&display=swap');
    .ws-root{font-family:'Inter',sans-serif;}

    @keyframes ws-pop{
      0%{ opacity:0; transform: translateY(26px) scale(.85) rotate(var(--ws-rot)); }
      65%{ opacity:1; transform: translateY(-4px) scale(1.03) rotate(calc(var(--ws-rot) * .25)); }
      100%{ opacity:1; transform: translateY(0) scale(1) rotate(0deg); }
    }
    .ws-card{
      opacity:0;
      transform-style: preserve-3d;
      transition: box-shadow .35s ease, border-color .35s ease, transform .12s ease-out;
      will-change: transform;
    }
    .ws-card.ws-in{
      animation: ws-pop .7s cubic-bezier(.22,.85,.3,1.15) forwards;
      animation-delay: var(--ws-delay);
    }

    @keyframes ws-orbit{ to{ transform: rotate(360deg); } }
    .ws-orbit{ animation: ws-orbit 7s linear infinite; }

    .ws-glow{
      position:absolute; inset:0; border-radius:inherit; pointer-events:none;
      opacity:0; transition:opacity .35s ease;
      background: radial-gradient(220px circle at var(--x,50%) var(--y,50%), rgba(245,166,35,.20), transparent 65%);
    }
    .ws-card:hover .ws-glow{ opacity:1; }

    .ws-icon{ transition: transform .45s cubic-bezier(.2,.8,.2,1.4), background .35s ease, color .35s ease; }
    .ws-card:hover .ws-icon{ transform: rotate(-10deg) scale(1.12); }

    .ws-label{ transition: color .3s ease, transform .3s ease; }
    .ws-card:hover .ws-label{ transform: translateY(-1px); }

    .ws-shine{
      position:absolute; inset:0; border-radius:inherit; pointer-events:none; overflow:hidden;
    }
    .ws-shine::before{
      content:''; position:absolute; top:-50%; left:-60%; width:40%; height:200%;
      background:linear-gradient(120deg, transparent, rgba(255,255,255,.55), transparent);
      transform:rotate(20deg) translateX(-120%);
      transition: transform .7s ease;
    }
    .ws-card:hover .ws-shine::before{ transform: rotate(20deg) translateX(280%); }

    @media (prefers-reduced-motion: reduce){
      .ws-card, .ws-card.ws-in{ animation:none !important; opacity:1 !important; transform:none !important; }
      .ws-orbit{ animation:none !important; }
      .ws-card:hover{ transform:none !important; }
    }
  `}</style>
);

/* ============================================================
   ICONS
   ============================================================ */
const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1.5">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

/* ============================================================
   DATA
   ============================================================ */
const industries = [
  { title: "SaaS & Technology", icon: Laptop },
  { title: "D2C & E-commerce", icon: ShoppingBag },
  { title: "Digital & Creative Agencies", icon: Megaphone },
  { title: "EdTech", icon: GraduationCap },
  { title: "HealthTech & Telemedicine", icon: HeartPulse },
  { title: "HR Tech & Staffing", icon: Users },
  { title: "FinTech", icon: Landmark },
  { title: "Logistics & Supply Chain", icon: Truck },
  { title: "Manufacturing & Retail", icon: Factory },
  { title: "Real Estate & PropTech", icon: Building2 },
  { title: "Media & Creator Economy", icon: Camera },
  { title: "Food & Beverage", icon: UtensilsCrossed },
  { title: "Travel & Hospitality", icon: Plane },
  { title: "Construction & Infrastructure", icon: HardHat },
  { title: "Consulting Services", icon: Briefcase },
  { title: "Non-Profits & Section 8", icon: HandHeart },
  { title: "Import & Export", icon: Globe },
  { title: "Franchise & Distribution", icon: Store },
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
   TILT CARD — 3D tilt + spotlight, framer-motion-style micro interaction
   ============================================================ */
function IndustryCard({ name, icon: Icon, index }) {
  const cardRef = useRef(null);
  const [wrapRef, inView] = useInView(0.15);
  const rotSeed = ((index % 5) - 2) * 6; // -12..12 deg entrance rotation variety

  const handleMove = useCallback((e) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rotY = (px - 0.5) * 16;
    const rotX = (0.5 - py) * 16;
    el.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px) scale(1.035)`;
    el.style.setProperty("--x", `${px * 100}%`);
    el.style.setProperty("--y", `${py * 100}%`);
  }, []);

  const handleLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transition = "transform .5s cubic-bezier(.22,.9,.3,1.2), box-shadow .35s ease, border-color .35s ease";
    el.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)";
    window.setTimeout(() => { if (el) el.style.transition = "box-shadow .35s ease, border-color .35s ease"; }, 500);
  }, []);

  const handleEnter = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transition = "box-shadow .35s ease, border-color .35s ease";
  }, []);

  return (
    <div
      ref={(node) => { wrapRef.current = node; cardRef.current = node; }}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={`ws-card group relative flex flex-col items-center text-center gap-3 rounded-2xl py-7 px-3 border cursor-default ${inView ? "ws-in" : ""}`}
      style={{
        background: C.white,
        borderColor: "rgba(18,21,31,.08)",
        boxShadow: "0 1px 3px rgba(8,13,26,.04)",
        "--ws-delay": `${(index % 6) * 0.07}s`,
        "--ws-rot": `${rotSeed}deg`,
      }}
    >
      <div className="ws-shine" />
      <div className="ws-glow" />

     <div
  className="ws-icon relative flex h-12 w-12 items-center justify-center rounded-full sm:h-14 sm:w-14"
  style={{ background: C.navy950, color: C.amber400 }}
>
  <span
    className="ws-orbit absolute inset-0 rounded-full"
    style={{ border: `1.5px dashed rgba(245,166,35,.35)` }}
  />

  <Icon size={24} strokeWidth={2} />
</div>

      <span className="ws-label text-[13px] sm:text-[13.5px] font-semibold leading-snug" style={{ color: C.ink700 }}>
        {name}
      </span>
    </div>
  );
}

/* ============================================================
   SECTION
   ============================================================ */
export default function WhoWeServe({
  eyebrow = "Who we serve",

  description = "We work with businesses where contracts, compliance, employees, intellectual property, customer data and commercial relationships become increasingly important as the company grows.",
  footNote = "If your business is growing faster than your compliance function, we're built for you.",
  ctaLabel = "Book a Free Consultation →",
  onCta = () => {},
}) {
  const [headRef, headIn] = useInView(0.4);

  return (
    <section className="ws-root py-16 sm:py-24" style={{ background: C.cream100 }}>
      <GlobalStyle />
      <div className="max-w-[1180px] mx-auto px-6">
     <motion.div
  className="text-center max-w-xl mx-auto mb-12 sm:mb-14"
  variants={headingVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.4 }}
>
          <div className="inline-flex items-center gap-2 text-[12px] sm:text-[12.5px] font-bold uppercase tracking-[.14em] mb-4 justify-center" style={{ color: C.Gold }}>
            <span style={{ width: 20, height: 1, }} />
            {eyebrow}
          </div>
          <h2 className="text-[26px] sm:text-[34px] lg:text-[42px] leading-[1.15] font-semibold mb-3" style={{ ...fontDisplay, color: C.ink900, letterSpacing: "-.01em" }}>
          Built for Startups.
Ready to Scale With <span className="text-[#C7954A]">You.</span>
          </h2>
          <p className="text-[15.5px] sm:text-[17px]" style={{ color: C.slate500 }}>{description}</p>
       </motion.div>

      <div
  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5"
  style={{ perspective: 1000 }}
>
  {industries.map((item, i) => (
    <IndustryCard
      key={item.title}
      name={item.title}
      icon={item.icon}
      index={i}
    />
  ))}
</div>

        <p className="text-center mt-9 text-[15px] sm:text-[16px]" style={{ color: C.slate500 }}>{footNote}</p>

        <div className="text-center mt-6">
          <Link href="/free-consultation">
          <button
            onClick={onCta}
            className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 font-bold text-[15px] transition-all duration-300 hover:-translate-y-1 active:translate-y-0"
            style={{ background: C.amber500, color: C.navy950, boxShadow: "0 8px 24px -8px rgba(245,166,35,.35)" }}
          >
            {ctaLabel}
          </button>
          </Link>
        </div>
      </div>
    </section>
  );
}