"use client";

import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

const INK = '#1C1D20';
const AMBER = '#E8BF96';
const AMBER_DARK = '#b78d5a';

// Same hero background used across the site so every page feels part of one system.
const HERO_BG_IMAGE = 'https://t4.ftcdn.net/jpg/05/16/20/99/360_F_516209984_APT701DWSDCUPzErByEByUrqEjHwRYCX.jpg';

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

export default function HeroSection() {
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

      {/* Dark-to-transparent overlay, matching the Home / About heroes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.15 }}
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(0,0,0,0.95) 6%, rgba(0,0,0,0.55) 42%, rgba(0,0,0,0.25) 100%)',
        }}
      />

      {/* Floating ambient glow */}
      <motion.div
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full sm:h-96 sm:w-96"
        style={{ background: AMBER, opacity: 0.16, filter: 'blur(90px)' }}
        animate={{ x: [0, 26, 0], y: [0, 20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="container relative z-10 mx-auto max-w-[1320px] px-4 pb-20 sm:px-6 sm:pb-24 lg:px-8 lg:pb-28">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={container}
          className="max-w-[780px] py-10 lg:py-6"
        >
          <motion.div
            variants={item}
            whileHover={{ x: 4 }}
            className="mb-4 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-wide text-white sm:text-[15px]"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            <span className="h-px w-5" style={{ background: AMBER }} />
            <span style={{ color: AMBER }}>Pricing</span>
          </motion.div>

          <AnimatedHeading
            text="Business document protection at a price that makes sense."
            className="mb-6 text-white"
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontWeight: 400,
              letterSpacing: '-1.5px',
              fontSize: 'clamp(32px, 5.4vw, 58px)',
              lineHeight: 1.12,
            }}
          />

          <motion.p
            variants={item}
            className="mb-8 max-w-[560px] text-white/85"
            style={{ fontFamily: "'Manrope', sans-serif", fontSize: '16.5px', lineHeight: 1.7 }}
          >
            No hourly billing. No scope-creep invoices. Choose a plan and know exactly what you
            pay — every month.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap items-center gap-4 sm:gap-6">
            <HoverSwapButton href="#consultation" icon={ArrowUpRight}>
              Book Free Consultation
            </HoverSwapButton>

            <HoverSwapButton href="#plans" icon={ArrowRight}>
              Compare Plans
            </HoverSwapButton>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}