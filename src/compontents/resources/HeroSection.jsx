"use client";

import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight, Check } from 'lucide-react';

const INK = '#1C1D20';
const AMBER = '#E8BF96';
const AMBER_DARK = '#b78d5a';

// Same hero background used across the site so every page feels part of one system.
const HERO_BG_IMAGE = 'https://theme.nanoit.biz/tf-lawgis-html-demo/assets/img/bg-img/64.jpg';

// Seal colors — matched to the uploaded badge (deep navy disc, amber ring + text, amber check)
const SEAL_NAVY = '#0D1526';
const SEAL_AMBER = '#F5A623';

function HoverSwapButton({ href, children, icon: Icon }) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
      className="group relative inline-flex h-[52px] items-center justify-center overflow-hidden rounded-full px-7 font-semibold sm:h-[54px] sm:px-8"
      style={{ background: AMBER, color: INK }}
      onMouseEnter={(e) => (e.currentTarget.style.background = AMBER_DARK)}
      onMouseLeave={(e) => (e.currentTarget.style.background = AMBER)}
    >
      <span className="flex items-center gap-2 text-[14.5px] transition-all duration-300 ease-out group-hover:-translate-y-10 group-hover:opacity-0 group-hover:text-white sm:text-[15px]">
        {children}
        <Icon size={19} />
      </span>
      <span className="absolute flex translate-y-10 items-center gap-2 text-[14.5px] text-white opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 sm:text-[15px]">
        {children}
        <Icon size={19} />
      </span>
    </motion.a>
  );
}

// Splits the heading into words so each one animates in individually.
function AnimatedHeading({ text, className, style }) {
  const words = text.split(' ');
  return (
    <h1 className={className} style={style}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 26, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.65, ease: 'easeOut', delay: 0.35 + i * 0.05 }}
          className="inline-block"
        >
          {word}
          {i < words.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </h1>
  );
}

// Recreation of the uploaded "Specialist Verified" seal — fully animated:
// outer ring draws itself in, the whole mark rotates continuously, and the
// checkmark pops in once the draw finishes.
function VerifiedSealLarge() {
  const size = 260;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.75 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* Soft glow pulse behind the seal */}
      <motion.div
        className="absolute rounded-full"
        style={{ inset: -20, background: SEAL_AMBER, opacity: 0.18, filter: 'blur(40px)' }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.14, 0.24, 0.14] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Disc background */}
      <div
        className="absolute rounded-full"
        style={{ inset: 6, background: SEAL_NAVY, boxShadow: '0 24px 60px -14px rgba(0,0,0,0.55)' }}
      />

      {/* Continuously rotating ring + circular text */}
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 260 260"
        animate={{ rotate: 360 }}
        transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0"
      >
        <circle cx="130" cy="130" r="118" fill="none" stroke={`${SEAL_AMBER}40`} strokeWidth="1.5" />
        <motion.circle
          cx="130"
          cy="130"
          r="106"
          fill="none"
          stroke={SEAL_AMBER}
          strokeWidth="2.5"
          strokeDasharray="666"
          initial={{ strokeDashoffset: 666 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 1.8, delay: 0.5, ease: 'easeInOut' }}
        />
        <path id="heroSealPath" d="M 130,130 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0" fill="none" />
        <text fontSize="12.5" fill={SEAL_AMBER} letterSpacing="3" fontFamily="'Manrope', sans-serif" fontWeight="700">
          <textPath href="#heroSealPath">
            SPECIALIST VERIFIED &#8226; FOUNDERS LEGAL DESK &#8226;
          </textPath>
        </text>
      </motion.svg>

      {/* Checkmark, pops in after the ring finishes drawing */}
      <motion.div
        initial={{ opacity: 0, scale: 0.3, rotate: -25 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.5, delay: 1.9, ease: [0.34, 1.56, 0.64, 1] }}
        className="relative z-10 flex h-16 w-16 items-center justify-center"
      >
        <Check size={54} strokeWidth={2.5} style={{ color: SEAL_AMBER }} />
      </motion.div>

      {/* Gentle continuous float on the whole badge */}
      <motion.div
        className="absolute inset-0"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2.4 }}
      />
    </motion.div>
  );
}

export default function ResourcesHeroSection() {
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="relative overflow-hidden pt-24 sm:pt-28 lg:pt-[126px]"
      style={{ backgroundColor: INK }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Manrope:wght@400;500;600;700;800&display=swap');
      `}</style>

      {/* Background image — slow continuous Ken Burns zoom */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_BG_IMAGE})` }}
        initial={{ scale: 1.08 }}
        animate={{ scale: 1.18 }}
        transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
      />

      {/* Dark-to-transparent overlay, matching the rest of the site */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.15 }}
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(0,0,0,0.95) 6%, rgba(0,0,0,0.85) 42%, rgba(0,0,0,0.35) 100%)',
        }}
      />

      {/* Floating ambient glow */}
      <motion.div
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full sm:h-96 sm:w-96"
        style={{ background: AMBER, opacity: 0.16, filter: 'blur(90px)' }}
        animate={{ x: [0, 26, 0], y: [0, 20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="container relative z-10 mx-auto max-w-[1320px] px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          {/* Left — text content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={container}
            className="max-w-[720px] py-10 lg:py-6"
          >
            <motion.div
              variants={item}
              whileHover={{ x: 4 }}
              className="mb-4 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-wide text-white sm:text-[15px]"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              <span className="h-px w-5" style={{ background: AMBER }} />
              <span style={{ color: AMBER }}>Resources</span>
            </motion.div>

            <AnimatedHeading
              text="Free resources for Indian founders and businesses."
              className="mb-6 text-white"
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontWeight: 400,
                letterSpacing: '-1.5px',
                fontSize: 'clamp(30px, 5vw, 54px)',
                lineHeight: 1.14,
              }}
            />

            <motion.p
              variants={item}
              className="mb-8 max-w-[560px] text-white/85"
              style={{ fontFamily: "'Manrope', sans-serif", fontSize: '16.5px', lineHeight: 1.7 }}
            >
              Practical guides on business documents, contracts, and compliance — written in
              plain language, not jargon.
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap items-center gap-4 sm:gap-6">
              <HoverSwapButton href="#articles" icon={ArrowRight}>
                Browse Guides
              </HoverSwapButton>

              <HoverSwapButton href="#consultation" icon={ArrowUpRight}>
                Book Free Consultation
              </HoverSwapButton>
            </motion.div>
          </motion.div>

          {/* Right — animated verified seal */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <VerifiedSealLarge />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}