"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight, Scale, ShieldCheck, BadgeIndianRupee } from "lucide-react";

const INK = "#1C1D20";
const AMBER = "#E8BF96";
const AMBER_DARK = "#b78d5a";

const HERO_BG_IMAGE = "/Home-Hero.png";

function HoverSwapButton({ href, children, icon: Icon }) {
  return (
    <a
      href={href}
      className="group relative inline-flex h-[54px] items-center justify-center overflow-hidden rounded-full px-8 font-semibold"
      style={{ background: AMBER, color: INK }}
      onMouseEnter={(e) => (e.currentTarget.style.background = AMBER_DARK)}
      onMouseLeave={(e) => (e.currentTarget.style.background = AMBER)}
    >
      <span className="flex items-center gap-2 transition-all duration-300 ease-out group-hover:-translate-y-10 group-hover:opacity-0 group-hover:text-white">
        {children}
        <Icon size={20} />
      </span>
      <span className="absolute flex translate-y-10 items-center gap-2 text-white opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
        {children}
        <Icon size={20} />
      </span>
    </a>
  );
}

// slide-in-from-left variant for text column children
const slideLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

// slide-up variant (used for heading lines / badges)
const slideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.16, delayChildren: 0.15 } },
};

export default function HeroSection() {

  return (
    <section
      className="relative overflow-hidden bg-cover bg-center pt-24 sm:pt-28 lg:pt-[120px]"
      style={{ backgroundColor: INK, backgroundImage: `url(${HERO_BG_IMAGE})` }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Manrope:wght@400;500;600;700;800&display=swap');
        @keyframes floatY {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 0.6; }
        }
        @keyframes glowDrift {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(24px, -28px) scale(1.1); }
        }
      `}</style>

      {/* Dark-to-transparent overlay — heavy behind content on the left, clear on the right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.88) 32%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.12) 75%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* Animated background glow — clustered behind the content column, nothing on the right */}
      <div
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full blur-3xl"
        style={{
          background: AMBER,
          opacity: 0.15,
          animation: "pulseGlow 6s ease-in-out infinite, glowDrift 12s ease-in-out infinite",
        }}
      />
      <div
        className="pointer-events-none absolute left-[6%] top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full blur-[110px]"
        style={{
          background: AMBER,
          opacity: 0.12,
          animation: "pulseGlow 8s ease-in-out infinite 1s, glowDrift 16s ease-in-out infinite 1s",
        }}
      />
      <div
        className="pointer-events-none absolute left-0 bottom-0 h-64 w-64 rounded-full blur-3xl"
        style={{
          background: AMBER,
          opacity: 0.1,
          animation: "pulseGlow 7s ease-in-out infinite 0.5s, glowDrift 14s ease-in-out infinite 0.5s",
        }}
      />

      {/* Fine grid texture overlay for a premium feel */}
    

      <div className="container relative z-10 mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 pb-16 lg:grid-cols-2 lg:gap-20 lg:pb-0">
          {/* Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={container}
            className="py-10 lg:py-0"
          >
            {/* Eyebrow badge */}
            <motion.div
              variants={slideLeft}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 backdrop-blur-sm"
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: AMBER, animation: "pulseGlow 2.5s ease-in-out infinite" }}
              />
              <span
                className="text-[13px] font-semibold uppercase tracking-wide text-white/90"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                YOUR BUSINESS • YOUR LEGAL DESK 
              </span>
            </motion.div>

            {/* Heading — each line slides up independently */}
            <h1
              className="mb-6 text-white"
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontWeight: 400,
                letterSpacing: "-1.88px",
                fontSize: "clamp(36px, 6vw, 57px)",
                lineHeight: 1.08,
              }}
            >
                <span className="block overflow-hidden">
                  <motion.span
                    variants={slideUp}
                    className="block"
                  >
                 Legal Support for Everything Your Business Faces.
                  </motion.span>
                </span>
            </h1>

            <motion.p
              variants={slideLeft}
              className="mb-8 max-w-[540px] text-white/80"
              style={{ fontFamily: "'Manrope', sans-serif", fontSize: "17px", lineHeight: 1.67 }}
            >
              From everyday legal questions and business documentation to compliance, contracts, intellectual property and unexpected legal issues, Founders Legal Desk gives startups and MSMEs a dedicated legal partner they can turn to.
              <br />
              <br />
              <strong>Build your business. We’ll help you navigate the legal side</strong>
            </motion.p>

            <motion.div variants={slideLeft} className="flex flex-wrap items-center gap-6">
              <HoverSwapButton href="free-consultation" icon={ArrowUpRight}>
                Book a Free Consultation
              </HoverSwapButton>

              <HoverSwapButton href="services" icon={ArrowRight}>
                Explore Our Services
              </HoverSwapButton>
            </motion.div>

            {/* Trust strip */}
            <motion.div
              variants={slideLeft}
              className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 pt-6"
            >
                <div className="flex items-center gap-2 text-white/70">
                <Scale size={18} style={{ color: AMBER }} />
                <span className="text-sm" style={{ fontFamily: "'Manrope', sans-serif" }}>
                  Ongoing Legal Support
                </span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <ShieldCheck size={18} style={{ color: AMBER }} />
                <span className="text-sm" style={{ fontFamily: "'Manrope', sans-serif" }}>
                  Practical Guidance
                </span>
              </div>
            
                <div className="flex items-center gap-2 text-white/70">
                <BadgeIndianRupee size={18} style={{ color: AMBER }} />
                <span className="text-sm" style={{ fontFamily: "'Manrope', sans-serif" }}>
                  Transparent Pricing
                </span>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      <div className="hidden h-[60px] lg:block" />
    </section>
  );
}