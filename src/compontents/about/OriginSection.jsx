"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Newspaper, MapPin, BadgeCheck, ArrowUpRight } from 'lucide-react';

const NAVY_BG = '#0D1526';
const NAVY_CARD = '#141F38';
const AMBER = '#C7954A';
const AMBER_LIGHT = '#E3B978';
const WHITE = '#FFFFFF';
const MUTED = '#A6ACC0';

const ORIGIN_IMAGE =
  'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1000&q=80';

function HoverButton({ href, children, icon: Icon }) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
      className="group relative inline-flex h-[52px] items-center justify-center overflow-hidden rounded-full px-7 font-semibold"
      style={{ background: AMBER, color: NAVY_BG }}
      onMouseEnter={(e) => (e.currentTarget.style.background = AMBER_LIGHT)}
      onMouseLeave={(e) => (e.currentTarget.style.background = AMBER)}
    >
      <span className="flex items-center gap-2 text-[14.5px] transition-all duration-300 ease-out group-hover:-translate-y-10 group-hover:opacity-0">
        {children}
        <Icon size={18} />
      </span>
      <span className="absolute flex translate-y-10 items-center gap-2 text-[14.5px] text-white opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
        {children}
        <Icon size={18} />
      </span>
    </motion.a>
  );
}

// Counts 0 → target once the element scrolls into view. Kept as a simple
// requestAnimationFrame loop so no extra dependency is needed.
function useCountUp(target, inView, duration = 1400) {
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [inView, target, duration]);

  return value;
}

function StatBadge({ style, delay, Icon, label, floatDelay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay, ease: 'backOut' }}
      className="absolute z-[2] flex items-center gap-2.5 rounded-xl px-4 py-3 shadow-2xl"
      style={{ background: NAVY_CARD, border: '1px solid rgba(255,255,255,0.08)', ...style }}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: floatDelay }}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
        style={{ background: 'rgba(199,149,74,0.15)' }}
      >
        <Icon size={15} strokeWidth={2} style={{ color: AMBER }} />
      </motion.div>
      <span className="whitespace-nowrap text-[12.5px] font-semibold text-white">{label}</span>
    </motion.div>
  );
}

export default function OriginSection() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, amount: 0.5 });

  const statRef = useRef(null);
  const statInView = useInView(statRef, { once: true, amount: 0.6 });
  const readers = useCountUp(2, statInView, 1200);

  return (
    <section
      className="relative overflow-hidden px-6 py-20 sm:px-8 lg:py-28"
      style={{ background: NAVY_BG, fontFamily: "'Manrope', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Manrope:wght@400;500;600;700;800&display=swap');
      `}</style>

      {/* Ambient glow blobs */}
      <motion.div
        className="pointer-events-none absolute -right-32 -top-24 h-80 w-80 rounded-full"
        style={{ background: AMBER, opacity: 0.1, filter: 'blur(100px)' }}
        animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full"
        style={{ background: '#3452C7', opacity: 0.08, filter: 'blur(90px)' }}
        animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* Rotating ring outlines — same decorative language as the Trust section, mirrored to the top-right this time so it doesn't repeat identically */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 65, repeat: Infinity, ease: 'linear' }}
        className="pointer-events-none absolute -right-36 -top-36 h-[440px] w-[440px] rounded-full border"
        style={{ borderColor: `${AMBER}14` }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 85, repeat: Infinity, ease: 'linear' }}
        className="pointer-events-none absolute -right-16 -top-16 h-[260px] w-[260px] rounded-full border"
        style={{ borderColor: `${AMBER}20` }}
      />

      {/* Floating particles, scattered along the left edge */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute rounded-full"
          style={{
            width: 4 + (i % 3) * 3,
            height: 4 + (i % 3) * 3,
            background: `${AMBER}${['33', '44', '22', '55', '33'][i]}`,
            top: `${18 + i * 15}%`,
            left: `${5 + i * 4}%`,
          }}
          animate={{ y: [0, -14, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 }}
        />
      ))}

      <div className="relative mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        {/* ---------- Content column ---------- */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex items-center gap-2 text-[12.5px] font-bold uppercase tracking-[0.14em]"
            style={{ color: AMBER }}
          >
            <span className="h-px w-5" style={{ background: AMBER }} />
            Origin
          </motion.div>

          <h2
            ref={headingRef}
            className="mb-6"
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontWeight: 400,
              fontSize: 'clamp(28px, 3.6vw, 42px)',
              lineHeight: 1.15,
              color: WHITE,
            }}
          >
            {'Why Startup Times built this'.split(' ').map((w, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 18 }}
                animate={headingInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.06, ease: 'easeOut' }}
                className="inline-block"
              >
                {w}
                {i < 4 ? '\u00A0' : ''}
              </motion.span>
            ))}
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-5 max-w-[540px] text-[16px] leading-relaxed"
            style={{ color: MUTED }}
          >
            Founders Legal Desk is a venture of Startup Times Media Network — India&apos;s
            founder-focused publication covering entrepreneurs across India and the UAE. Google
            News approved, with over 2 lakh monthly readers.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mb-5 max-w-[540px] text-[16px] leading-relaxed"
            style={{ color: MUTED }}
          >
            We&apos;ve spent years in the startup ecosystem. We&apos;ve covered hundreds of
            founders and their businesses. We&apos;ve seen firsthand what happens when a business
            grows without its document foundation in place. That visibility gave us a clear
            picture of the gap. This platform is our answer to it.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.26 }}
            className="mb-8 max-w-[540px] text-[16px] leading-relaxed"
            style={{ color: MUTED }}
          >
            If you&apos;ve read Startup Times, you know we don&apos;t do generic. We bring the
            same standard to Founders Legal Desk:{' '}
            {['honest', 'practical', 'founder-first'].map((wrd, i) => (
              <motion.span
                key={wrd}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.1, ease: 'backOut' }}
                className="mr-1.5 inline-block rounded-full px-3 py-1 text-[13px] font-semibold"
                style={{ background: 'rgba(199,149,74,0.14)', color: AMBER_LIGHT }}
              >
                {wrd}
              </motion.span>
            ))}
            .
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <HoverButton href="/free-consultation" icon={ArrowUpRight}>
              Book a Free Consultation
            </HoverButton>
          </motion.div>
        </div>

        {/* ---------- Image column ---------- */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative mx-auto w-full max-w-[420px] lg:mx-0 lg:ml-auto"
        >
          {/* Offset frame */}
          <motion.div
            initial={{ opacity: 0, x: 14, y: -14 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
            className="absolute -right-5 -top-5 h-full w-full rounded-2xl"
            style={{ border: `2px solid ${AMBER}`, zIndex: 0 }}
          />

          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="relative z-[1] aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl"
          >
            <img
              src={ORIGIN_IMAGE}
              alt="Startup Times newsroom — founder-focused publication"
              className="h-full w-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(180deg, rgba(13,21,38,0.15) 0%, rgba(13,21,38,0.6) 100%)' }}
            />
          </motion.div>

          {/* Floating credibility badges */}
          <StatBadge
            style={{ left: -28, top: '14%' }}
            delay={0.5}
            floatDelay={0}
            Icon={BadgeCheck}
            label="Google News Approved"
          />
          <StatBadge
            style={{ right: -20, bottom: '10%' }}
            delay={0.65}
            floatDelay={0.6}
            Icon={MapPin}
            label="India + UAE Coverage"
          />

          {/* Reader-count card, anchored bottom-left, overlapping the frame */}
          <motion.div
            ref={statRef}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative z-[2] mt-6 flex items-center gap-3 rounded-xl p-4"
            style={{ background: NAVY_CARD, border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
              style={{ background: 'rgba(199,149,74,0.15)' }}
            >
              <Newspaper size={19} strokeWidth={2} style={{ color: AMBER }} />
            </div>
            <div>
              <div
                className="text-[22px] font-bold leading-none text-white"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                {readers.toFixed(readers < 2 ? 1 : 0)}L+
              </div>
              <div className="mt-1 text-[12px] font-medium" style={{ color: MUTED }}>
                Monthly readers on Startup Times
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}