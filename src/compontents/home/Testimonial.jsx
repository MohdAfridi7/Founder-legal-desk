"use client";
import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

/* ============================================================
   TOKENS
   ============================================================ */
const C = {
  ink900: "#1B1D22",
  ink700: "#3A3D46",
  slate500: "#7A7E89",
  gold: "#D9A867",
  goldLight: "#E9C89A",
  goldStar: "#F0B429",
  blueText: "#3D5A99",
  cream: "#FFFDF9",
  white: "#FFFFFF",
  border: "#EAD9BE",
};
const headingVariants = {
  hidden: {
    opacity: 0,
    y: 50,
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

const textVariants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
    },
  },
};

const fontDisplay = { fontFamily: "'Fraunces', Georgia, serif" };

const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap');
    .tc-root{font-family:'Inter',sans-serif;}
    .tc-track{ transition: transform .55s cubic-bezier(.22,.8,.28,1); }
    @media (prefers-reduced-motion: reduce){ .tc-track{ transition:none; } }
  `}</style>
);

/* ============================================================
   ICONS
   ============================================================ */
const StarIcon = ({ size = 15, filled = true }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? C.goldStar : "none"} stroke={C.goldStar} strokeWidth="1.5">
    <polygon points="12 2 15.09 8.63 22 9.24 16.5 14.14 18.18 21 12 17.27 5.82 21 7.5 14.14 2 9.24 8.91 8.63 12 2" />
  </svg>
);

const Stars = ({ count = 5, size = 14 }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: count }).map((_, i) => <StarIcon key={i} size={size} />)}
  </div>
);

/* ============================================================
   DATA — edit here
   ============================================================ */
const testimonials = [
  {
    name: "Balachander",
    role: "Litconnect — LegalTech, London",
    avatar: "https://media.licdn.com/dms/image/v2/C5603AQE_v3a_mvk7Yw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1650304809148?e=1787184000&v=beta&t=YsGc8m1NYLuhT6gy2i84niPwzgdm9UYQpKcNZr8VYLA",
    quote:
      "Founders Legal Desk supported us on complex privacy and technology documentation across multiple regulatory frameworks. The team understood the requirements thoroughly and delivered structured, business-focused documentation.",
  },
  {
    name: "Sohaib Ahmed",
    role: "Founder, Awliyah — Toronto",
    avatar: "https://media.licdn.com/dms/image/v2/D5603AQGRyHD8z17U8w/profile-displayphoto-crop_800_800/B56Z7WkrnIGcAI-/0/1781716403019?e=1787184000&v=beta&t=0nmF2tpMHDZeTWwutsqEU9DRL6RWQYbsDmyXWiLXiWE",
    quote:
      "The team supported us with our privacy documentation and understood the international nature of our business. The entire process was clear, responsive and professionally managed.",
  },
  {
    name: "Ahmad Umar",
    role: "Medixcy — HealthTech",
    avatar: "https://media.licdn.com/dms/image/v2/D4E03AQGc4ijGE6qb6g/profile-displayphoto-shrink_800_800/B4EZTg6DPGHMAc-/0/1738940103940?e=1787184000&v=beta&t=9Y8HBnfhQwwfDITb6UXWsKgQalKqVFI9r_jxDOQTzf4",
    quote:
      "We needed support across privacy, founder documentation and the regulatory requirements applicable to a digital healthcare business. The team took the time to understand our model and gave us practical, well-researched support.",
  },
  {
    name: "Aamish",
    role: "Acqify Ltd.",
    avatar: "https://media.licdn.com/dms/image/v2/D5603AQGc-CBKQ1s1UA/profile-displayphoto-crop_800_800/B56ZlIzLJWIsAI-/0/1757863001851?e=1787184000&v=beta&t=iuAUrpM0JxjC6F6Qo9AhiiKGY0J9M_fKvHrT6TGRzDE",
    quote:
      "From NDAs and commercial contracts to data-protection requirements, the team understood what our business actually needed instead of giving us generic templates. The support was responsive and practical.",
  },
  {
    name: "Suhaib Siddiqui",
    role: "Chaichaska — F&B / QSR",
    avatar: "https://media.licdn.com/dms/image/v2/D4D03AQEf280CtaBHQA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1678684584450?e=1787184000&v=beta&t=V8wrEK1PwE6U3Cu7elkqGLD_jsQrcLbiiJ_BkaSy6gc",
    quote:
      "We worked with the team across multiple requirements including trademark, franchise documentation, employment documentation and MSME registration. Having one team coordinate different requirements made the process much easier for us.",
  },
  {
    name: "Hammas Khan",
    role: "V2V Garments — Retail",
    avatar: "https://media.licdn.com/dms/image/v2/D4D03AQGNT9AXGiPXyg/profile-displayphoto-crop_800_800/B4DZ6torN4JcAI-/0/1781029584543?e=1787184000&v=beta&t=Dbm-U6EDJ5czkqgsRPqRJJD-z5JXML_-phWUhi-1fAE",
    quote:
      "The team supported us on an important intellectual-property matter with detailed documentation and research. They were thorough, responsive and clear throughout the process.",
  },
];

/* ============================================================
   RESPONSIVE VISIBLE-COUNT HOOK
   ============================================================ */
function useVisibleCount() {
  const [n, setN] = useState(3);
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      setN(w < 700 ? 1 : w < 1024 ? 2 : 3);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);
  return n;
}

/* ============================================================
   HEADER
   ============================================================ */
function Header({
  avatars = ["https://i.pravatar.cc/100?img=14", "https://i.pravatar.cc/100?img=45"],
  stat = "1900k+",
  headline = "What founders say",
  description = "We're just getting started. Be one of the first businesses to experience what affordable, specialist-verified documents look like.",
  rating = "4.9",
  ratingCount = "500 Reviews",
}) {
  return (
   <motion.div
  className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-10 mb-10 sm:mb-14"
  variants={headingVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
>
  <div>
    <motion.div
      variants={textVariants}
      className="inline-flex items-center gap-2 text-[12.5px] font-bold uppercase tracking-[0.14em] text-[#D9A867] mb-4"
    >
      <span className="w-5 h-px bg-[#D9A867]" />
      TESTIMONIALS
    </motion.div>

    <motion.h2
      variants={textVariants}
      className="text-[26px] text-black sm:text-[34px] lg:text-[42px] leading-[1.15] font-semibold"
      style={{ fontFamily: "'Fraunces', Georgia, serif" }}
    >
     What Our <span style={{ color: '#D9A867' }}>Clients Say</span>
    </motion.h2>
  </div>

  <motion.p
    variants={textVariants}
    className="text-[15.5px] text-black sm:text-[17px] leading-relaxed max-w-md"
    
  >
   Businesses across technology, healthcare, retail, food & beverage and other sectors have trusted us with important corporate, privacy and commercial requirements.
  </motion.p>

  <motion.div
    variants={textVariants}
    className="flex items-center gap-2"
  >
    <StarIcon size={26} />
    <span
      className="text-[26px] text-black sm:text-[30px] font-bold"
      style={{ fontFamily: "'Fraunces', Georgia, serif" }}
    >
      4.9
    </span>
    <div className="ml-1 text-black text-[13px] leading-tight">
      <div>500+ Reviews</div>
    </div>
  </motion.div>
</motion.div>
  );
}

/* ============================================================
   TESTIMONIAL CARD
   ============================================================ */
function TestimonialCard({ t }) {
  return (
   <div
  className="group h-full rounded-2xl border px-6 py-7 sm:px-7 sm:py-8 flex flex-col
             transition-all duration-500 hover:-translate-y-2"
  style={{
    borderColor: C.border,
    background: C.white,
  }}
>
      <Stars />
      <p className="text-[14px] sm:text-[14.5px] leading-relaxed mt-4 mb-6 flex-1" style={{ color: C.ink700 }}>
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="flex items-center gap-3 pt-1">
        <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-full object-cover" />
        <div>
          <div className="text-[14.5px] font-semibold" style={{ color: C.ink900 }}>{t.name}</div>
          <div className="text-[12.5px]" style={{ color: C.slate500 }}>{t.role}</div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   DOTS
   ============================================================ */
function Dots({ count, active, onSelect }) {
  return (
    <div className="flex items-center justify-center gap-3 mt-10 sm:mt-12">
      {Array.from({ length: count }).map((_, i) => {
        const isActive = i === active;
        return (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => onSelect(i)}
            className="relative flex items-center justify-center transition-all duration-300"
            style={{ width: 22, height: 22 }}
          >
            {isActive && (
              <span
                className="absolute inset-0 rounded-full border transition-all duration-300"
                style={{ borderColor: C.gold }}
              />
            )}
            <span
              className="rounded-full transition-all duration-300"
              style={{
                width: isActive ? 10 : 8,
                height: isActive ? 10 : 8,
                background: isActive ? C.gold : "transparent",
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
   MAIN SECTION
   ============================================================ */
export default function Testimonial(props) {
  const visible = useVisibleCount();
  const maxIndex = Math.max(0, testimonials.length - visible);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (index > maxIndex) setIndex(maxIndex);
  }, [maxIndex, index]);

  useEffect(() => {
  if (paused) return;

  const interval = setInterval(() => {
    setIndex((prev) => {
      return prev >= maxIndex ? 0 : prev + 1;
    });
  }, 3000);

  return () => clearInterval(interval);
}, [paused, maxIndex]);

  const goTo = useCallback((i) => setIndex(Math.min(Math.max(i, 0), maxIndex)), [maxIndex]);

  return (
    <section className="tc-root py-16 sm:py-24 px-6" style={{ background: C.cream }}>
      <GlobalStyle />
      <div className="max-w-[1180px] mx-auto">
        <Header {...props} />

      <div
  className="overflow-hidden"
  onMouseEnter={() => setPaused(true)}
  onMouseLeave={() => setPaused(false)}
>
          <div
            className="tc-track flex"
            style={{ transform: `translateX(-${index * (100 / visible)}%)` }}
          >
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="flex-shrink-0 px-2.5 sm:px-3"
                style={{ width: `${100 / visible}%` }}
              >
                <TestimonialCard t={t} />
              </div>
            ))}
          </div>
        </div>

      <Dots count={maxIndex + 1} active={index} onSelect={goTo} />
      </div>
    </section>
  );
}