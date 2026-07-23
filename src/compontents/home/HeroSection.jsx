"use client";

import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

const INK = '#1C1D20';
const AMBER = '#E8BF96';
const AMBER_DARK = '#b78d5a';

const HERO_BG_IMAGE = 'https://theme.nanoit.biz/tf-lawgis-html-demo/assets/img/bg-img/64.jpg';
const HERO_THUMBNAIL = 'https://theme.nanoit.biz/tf-lawgis-html-demo/assets/img/bg-img/63.png';

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
      className="relative overflow-hidden bg-cover bg-center pt-24 sm:pt-28 lg:pt-[126px]"
      style={{ backgroundColor: INK, backgroundImage: `url(${HERO_BG_IMAGE})` }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Manrope:wght@400;500;600;700;800&display=swap');
      `}</style>

      {/* Dark-to-transparent overlay, same as the reference: solid on the left, fading toward the image on the right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.15 }}
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(0,0,0,0.95) 6%, rgba(0,0,0,0.9) 39%, rgba(0,0,0,0.15) 97%)',
        }}
      />

      <div className="container relative z-10 mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 pb-16 lg:grid-cols-2 lg:gap-20 lg:pb-0">
          {/* Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={container}
            className="py-10 lg:py-0"
          >
            <motion.div
              variants={item}
              className="mb-2 text-[15px] font-semibold uppercase tracking-wide text-white"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Founders Legal Desk
            </motion.div>

            <motion.h1
              variants={item}
              className="mb-6 text-white"
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontWeight: 400,
                letterSpacing: '-1.88px',
                fontSize: 'clamp(36px, 6vw, 72px)',
                lineHeight: 1.08,
              }}
            >
              Your business is growing. Your legal documents should keep up.
            </motion.h1>

            <motion.p
              variants={item}
              className="mb-8 max-w-[540px] text-white/85"
              style={{ fontFamily: "'Manrope', sans-serif", fontSize: '17px', lineHeight: 1.67 }}
            >
              Affordable, specialist-reviewed contracts and agreements for Indian businesses that
              can&apos;t afford a law firm — and won&apos;t risk a downloaded template.
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap items-center gap-6">
              <HoverSwapButton href="#consultation" icon={ArrowUpRight}>
                Book Free Consultation
              </HoverSwapButton>

              <HoverSwapButton href="#services" icon={ArrowRight}>
                Explore Our Services
              </HoverSwapButton>
            </motion.div>
          </motion.div>

          {/* Thumbnail — hidden on mobile, shifted down like the reference on desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.3 }}
            className="relative hidden pr-0 lg:block lg:translate-y-[130px] lg:pr-10"
          >
            <img
              src={HERO_THUMBNAIL}
              alt="Founders Legal Desk"
              className="h-[580px] w-full max-w-[410px] rounded-2xl object-cover"
            />
          </motion.div>
        </div>
      </div>

      {/* Spacer so the shifted-down thumbnail has room to overlap without crushing the next section */}
      <div className="hidden h-[130px] lg:block" />
    </motion.section>
  );
}