"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

/* ============================================================
   TOKENS
   ============================================================ */
const C = {
  navy950: "#080D1A",
  navy900: "#0D1526",
  amber500: "#F5A623",
  amber400: "#FFC157",
  Gold:"#C7954A",
  ink900: "#12151F",
  ink700: "#33384A",
  slate500: "#6B7184",
  cream50: "#F7F6F2",
  white: "#FFFFFF",
};

const fontDisplay = { fontFamily: "'Fraunces', Georgia, serif" };

/* ============================================================
   DATA — all clients, flattened (no category grouping)
   ============================================================ */
const CLIENTS = [
  {
    name: "Litconnect",
    tag: "LegalTech — London, UK",
    contact: "Balachander",
    scope: "Comprehensive data privacy compliance",
    deliverables:
      "Drafted GDPR/UK-GDPR and CCPA-compliant Privacy and Cookie Policies covering lawful basis, DSARs, cross-border data transfers, cookie consent, and processor obligations.",
    seed: "litconnect-legal",
    image: "https://media.licdn.com/dms/image/v2/C5603AQE_v3a_mvk7Yw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1650304809148?e=1787184000&v=beta&t=YsGc8m1NYLuhT6gy2i84niPwzgdm9UYQpKcNZr8VYLA",
  },
  {
    name: "Awliyah",
    tag: "Toronto, Canada",
    contact: "Sohaib Ahmed, Founder",
    deliverables:
      "Drafted a robust Privacy Policy benchmarked against Canada's PIPEDA regulations, with GDPR-compliant frameworks.",
    seed: "awliyah-office",
    image: "https://media.licdn.com/dms/image/v2/D5603AQGRyHD8z17U8w/profile-displayphoto-crop_800_800/B56Z7WkrnIGcAI-/0/1781716403019?e=1787184000&v=beta&t=0nmF2tpMHDZeTWwutsqEU9DRL6RWQYbsDmyXWiLXiWE",
  },
  {
    name: "Mumbra One",
    tag: "India",
    contact: "Sufiyan",
    deliverables:
      "Drafted Privacy Policy and ancillary user-facing agreements aligned with India's DPDP Act, 2023, and the IT Act, 2000.",
    seed: "mumbra-startup",
    image: "https://media.licdn.com/dms/image/v2/D5603AQH7IqG1YxQ6Iw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1726560837872?e=1787184000&v=beta&t=8NBKOdD4SeE6YxkrEDWod3BpyBhOp6upRd9liGa-n2c",
  },
  {
    name: "Medixcy",
    tag: "HealthTech — India",
    contact: "Ahmad Umar",
    scope: "Digital health data compliance",
    deliverables:
      "Drafted Privacy Notice, Founders' Agreement, and Terms & Conditions. Researched Telemedicine Practice Guidelines, 2020, and DPDP Act implications.",
    seed: "medixcy-health",
    image: "https://media.licdn.com/dms/image/v2/D4E03AQGc4ijGE6qb6g/profile-displayphoto-shrink_800_800/B4EZTg6DPGHMAc-/0/1738940103940?e=1787184000&v=beta&t=9Y8HBnfhQwwfDITb6UXWsKgQalKqVFI9r_jxDOQTzf4",
  },
  {
    name: "Acqify Ltd.",
    tag: "New Delhi / Remote",
    contact: "Aamish",
    deliverables:
      "Drafted tailored NDAs and commercial contracts. Provided client-specific compliance strategies under the Digital Personal Data Protection Act, 2023.",
    seed: "acqify-remote",
    image: "https://media.licdn.com/dms/image/v2/D5603AQGc-CBKQ1s1UA/profile-displayphoto-crop_800_800/B56ZlIzLJWIsAI-/0/1757863001851?e=1787184000&v=beta&t=iuAUrpM0JxjC6F6Qo9AhiiKGY0J9M_fKvHrT6TGRzDE",
  },
  {
    name: "Chaichaska",
    tag: "F&B / QSR",
    contact: "Suhaib Siddiqui",
    scope: "Brand protection and operational contracts",
    deliverables:
      "Filed trademark application under the Trade Marks Act, 1999; drafted Franchise and Employment Agreements; processed MSME (Udyam) registration.",
    seed: "chaichaska-cafe",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQEf280CtaBHQA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1678684584450?e=1787184000&v=beta&t=V8wrEK1PwE6U3Cu7elkqGLD_jsQrcLbiiJ_BkaSy6gc",
  },
  {
    name: "V2V Garments",
    tag: "Retail",
    contact: "Hammas Khan",
    scope: "Intellectual property litigation support",
    deliverables:
      "Drafted the Written Statement and application under Order VII Rule 10, CPC for a trademark infringement suit, anchored on territorial-jurisdiction objections under Section 134 of the Trade Marks Act, 1999.",
    seed: "v2v-garments-retail",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQGNT9AXGiPXyg/profile-displayphoto-crop_800_800/B4DZ6torN4JcAI-/0/1781029584543?e=1787184000&v=beta&t=Dbm-U6EDJ5czkqgsRPqRJJD-z5JXML_-phWUhi-1fAE",
  },
];

/* ============================================================
   GLOBAL STYLE
   ============================================================ */
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700;800&display=swap');
    .cp-root{ font-family:'Inter',sans-serif; }

   .cp-scroll{
  display:flex;
  overflow:hidden;
  scroll-snap-type:x mandatory;
  scroll-behavior:smooth;
}
    .cp-scroll.cp-dragging{ scroll-behavior:auto; cursor:grabbing; scroll-snap-type:none; }
    .cp-scroll::-webkit-scrollbar{ display:none; }
    .cp-slide{ scroll-snap-align:start; }

    .cp-card{ position:relative; overflow:hidden; }
    .cp-card::before{
      content:''; position:absolute; inset:0; border-radius:inherit; padding:1.5px; z-index:5;
      background:linear-gradient(135deg, ${C.amber500}, transparent 45%, transparent 60%, ${C.amber500});
      -webkit-mask:linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
      -webkit-mask-composite:xor; mask-composite:exclude;
      opacity:0; transition:opacity .4s ease; pointer-events:none;
    }
    .cp-card:hover::before{ opacity:1; }

    .cp-img{ transition: transform .6s cubic-bezier(.2,.8,.2,1); }
    .cp-card:hover .cp-img{ transform: scale(1.08); }

    .cp-overlay{ transition: opacity .4s ease; }
    .cp-card:hover .cp-overlay{ opacity:.9; }

    .cp-tag{ transition: transform .35s cubic-bezier(.2,.8,.2,1.3); }
    .cp-card:hover .cp-tag{ transform: translateY(-3px); }

    .cp-arrow-btn{ transition: background .25s ease, transform .25s ease, box-shadow .25s ease; }
    .cp-arrow-btn:hover{ transform: translateY(-2px); box-shadow:0 10px 24px -10px rgba(8,13,26,.4); }
    .cp-arrow-btn:active{ transform: translateY(0) scale(.95); }

    @media (prefers-reduced-motion: reduce){ .cp-scroll{ scroll-behavior:auto; } .cp-img{ transition:none; } }
  `}</style>
);

/* ============================================================
   ICONS
   ============================================================ */
const UserIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

/* ============================================================
   RESPONSIVE VISIBLE-COUNT HOOK
   ============================================================ */
function useVisibleCount() {
  const [n, setN] = useState(3);
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      setN(w < 680 ? 1 : w < 1024 ? 2 : 3);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);
  return n;
}

/* ============================================================
   CLIENT CARD
   ============================================================ */
function ClientCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.1, ease: [0.22, 0.85, 0.3, 1.05] }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="cp-card rounded-2xl h-full flex flex-col"
      style={{ background: C.white, border: "1px solid rgba(18,21,31,.08)", boxShadow: "0 10px 30px -18px rgba(8,13,26,.3)" }}
    >
      {/* image */}
      <div className="relative pt-3 w-full overflow-hidden rounded-t-2xl" style={{ aspectRatio: "13/10" }}>
       <img
  src={item.image}
  alt={item.name}
  className="cp-img absolute inset-0 w-full h-full object-cover"
  loading="lazy"
/>
        <div
          className="cp-overlay absolute inset-0"
          style={{ background: `linear-gradient(180deg, transparent 40%, ${C.navy950} 110%)`, opacity: 0.75 }}
        />
        <span
          className="cp-tag absolute top-3.5 left-3.5 text-[11px] font-bold uppercase tracking-wide px-3 py-1.5 rounded-full"
          style={{ background: "rgba(8,13,26,.55)", color: C.amber400, backdropFilter: "blur(4px)" }}
        >
          {item.tag}
        </span>
        <h3
          className="absolute bottom-3.5 left-4 right-4 text-[19px] sm:text-[20px] font-semibold leading-snug"
          style={{ ...fontDisplay, color: C.white }}
        >
          {item.name}
        </h3>
      </div>

      {/* body */}
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <span className="inline-flex items-center gap-1.5 text-[12.5px] font-medium mb-3" style={{ color: C.slate500 }}>
          <UserIcon /> {item.contact}
        </span>

        {item.scope && (
          <p className="text-[13px] font-semibold mb-2" style={{ color: C.amber500 }}>{item.scope}</p>
        )}

        <p className="text-[13.5px] leading-relaxed" style={{ color: C.ink700 }}>
          {item.deliverables}
        </p>
      </div>
    </motion.div>
  );
}

/* ============================================================
   DOTS
   ============================================================ */
function Dots({ count, active, onSelect }) {
  return (
    <div className="flex items-center justify-center gap-2.5 mt-9">
      {Array.from({ length: count }).map((_, i) => {
        const isActive = i === active;
        return (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => onSelect(i)}
            className="relative flex items-center justify-center"
            style={{ width: 20, height: 20 }}
          >
            {isActive && (
              <span className="absolute inset-0 rounded-full border transition-all duration-300" style={{ borderColor: C.amber500 }} />
            )}
            <span
              className="rounded-full transition-all duration-300"
              style={{
                width: isActive ? 9 : 7,
                height: isActive ? 9 : 7,
                background: isActive ? C.amber500 : "transparent",
                border: isActive ? "none" : `2px solid ${C.ink900}`,
              }}
            />
          </button>
        );
      })}
    </div>
  );
}

/* ============================================================
   SECTION
   ============================================================ */
export default function ClientPortfolio({
  eyebrow = "Client Portfolio",
  title = "Client Portfolio & Impact",
  description = "A snapshot of the businesses we've helped protect — across privacy, IP, and commercial law, spanning five jurisdictions.",
}) {
  const visible = useVisibleCount();
  const maxIndex = Math.max(0, CLIENTS.length - visible);
  const [index, setIndex] = useState(0);
  const scrollRef = useRef(null);
  const dragging = useRef(false);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });

  useEffect(() => {
    if (index > maxIndex) setIndex(maxIndex);
  }, [maxIndex, index]);

  const goTo = useCallback(
    (i) => {
      const clamped = Math.min(Math.max(i, 0), maxIndex);
      setIndex(clamped);
      const el = scrollRef.current;
      if (!el) return;
      const cardWidth = el.scrollWidth / CLIENTS.length;
      el.scrollTo({ left: clamped * cardWidth, behavior: "smooth" });
    },
    [maxIndex]
  );

  const onScrollEnd = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / CLIENTS.length;
    const i = Math.round(el.scrollLeft / cardWidth);
    setIndex(Math.min(Math.max(i, 0), maxIndex));
  }, [maxIndex]);

  let scrollTimeout;
  const handleScroll = () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(onScrollEnd, 100);
  };

  const onPointerDown = (e) => {
    dragging.current = true;
    const el = scrollRef.current;
    el.classList.add("cp-dragging");
    dragStart.current = { x: e.clientX, scrollLeft: el.scrollLeft };
  };
  const onPointerMove = (e) => {
    if (!dragging.current) return;
    const el = scrollRef.current;
    el.scrollLeft = dragStart.current.scrollLeft - (e.clientX - dragStart.current.x);
  };
  const endDrag = () => {
    dragging.current = false;
    const el = scrollRef.current;
    if (el) el.classList.remove("cp-dragging");
    onScrollEnd();
  };

  return (
    <section className="cp-root py-16 sm:py-24" style={{ background: C.cream50 }}>
      <GlobalStyle />
      <div className="max-w-[1180px] mx-auto px-6">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl mb-10 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 text-[12px] sm:text-[12.5px] font-bold uppercase tracking-[.14em] mb-4" style={{ color: C.Gold }}>
            <span style={{ width: 20, height: 1, background: C.Gold }} />
            {eyebrow}
          </div>
          <h2 className="text-[26px] sm:text-[34px] lg:text-[42px] leading-[1.15] font-semibold mb-3" style={{ ...fontDisplay, color: C.ink900, letterSpacing: "-.01em" }}>
          Client Portfolio & <span style={{ color: C.Gold }}>Impact</span>
          </h2>
          <p className="text-[15.5px] sm:text-[17px]" style={{ color: C.slate500 }}>{description}</p>
        </motion.div>

        {/* carousel + arrows */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="cp-scroll gap-5 sm:gap-6"
            onScroll={handleScroll}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
          >
            {CLIENTS.map((item, i) => (
              <div key={item.name} className="cp-slide flex-shrink-0" style={{ width: `calc(${100 / visible}% - ${((visible - 1) * 24) / visible}px)` }}>
                <ClientCard item={item} index={i} />
              </div>
            ))}
          </div>

          {/* arrow buttons */}
          <button
            aria-label="Previous"
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            className="cp-arrow-btn hidden sm:flex absolute top-1/2 -translate-y-1/2 items-center justify-center rounded-full"
            style={{
              left: -22, width: 46, height: 46,
              background: C.white, color: C.ink900, border: "1px solid rgba(18,21,31,.1)",
              opacity: index === 0 ? 0.35 : 1, cursor: index === 0 ? "default" : "pointer",
            }}
          >
            <ArrowLeftIcon />
          </button>
          <button
            aria-label="Next"
            onClick={() => goTo(index + 1)}
            disabled={index === maxIndex}
            className="cp-arrow-btn hidden sm:flex absolute top-1/2 -translate-y-1/2 items-center justify-center rounded-full"
            style={{
              right: -22, width: 46, height: 46,
              background: C.navy950, color: C.amber400, border: "1px solid rgba(18,21,31,.1)",
              opacity: index === maxIndex ? 0.35 : 1, cursor: index === maxIndex ? "default" : "pointer",
            }}
          >
            <ArrowRightIcon />
          </button>
        </div>

        <Dots count={maxIndex + 1} active={index} onSelect={goTo} />
      </div>
    </section>
  );
}