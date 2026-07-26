"use client";

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ClipboardList, AlertTriangle, Compass } from 'lucide-react';

const INK = '#12151F';
const MUTED = '#6B7184';
const AMBER = '#C7954A';
const AMBER_SOFT = '#F3E4CE';
const CREAM = '#F7F6F2';
const BORDER = 'rgba(18,21,31,0.08)';

const CARDS = [
  {
    num: '01',
    Icon: ClipboardList,
    title: 'Your current document situation',
    desc: 'What do you have? What are you missing? Where is your exposure?',
  },
  {
    num: '02',
    Icon: AlertTriangle,
    title: 'Your immediate risk areas',
    desc: 'Which gaps are urgent and which can wait — based on your stage and industry.',
  },
  {
    num: '03',
    Icon: Compass,
    title: 'A clear recommendation',
    desc: 'Which plan fits your volume, or whether a single-document quote makes more sense.',
  },
];

function IntroCard({ card, index, inView }) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [hovered, setHovered] = useState(false);

  function handleMouseMove(e) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: py * -8, ry: px * 8 });
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.92 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.65, delay: 0.15 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setTilt({ rx: 0, ry: 0 });
      }}
      style={{ transformPerspective: 900 }}
      className="relative"
    >
      <motion.div
        animate={{
          rotateX: tilt.rx,
          rotateY: tilt.ry,
          y: hovered ? -8 : 0,
          borderColor: hovered ? AMBER : BORDER,
          boxShadow: hovered
            ? '0 26px 55px -20px rgba(199,149,74,0.35)'
            : '0 4px 20px -12px rgba(18,21,31,0.08)',
        }}
        transition={{ type: 'spring', stiffness: 180, damping: 18 }}
        className="relative overflow-hidden rounded-2xl border bg-white p-7"
        style={{ transformPerspective: 900 }}
      >
        {/* Ghost numeral watermark */}
        <div
          className="pointer-events-none absolute -right-2 -top-6 select-none text-[100px] font-bold leading-none"
          style={{ fontFamily: "'DM Serif Display', serif", color: AMBER, opacity: hovered ? 0.14 : 0.07, transition: 'opacity .4s' }}
        >
          {card.num}
        </div>

        <div className="relative mb-5 flex items-center gap-3">
          <motion.div
            animate={{ rotate: hovered ? 10 : 0, scale: hovered ? 1.08 : 1 }}
            transition={{ duration: 0.3 }}
            className="flex h-11 w-11 items-center justify-center rounded-xl"
            style={{ background: AMBER_SOFT }}
          >
            <card.Icon size={19} strokeWidth={2} style={{ color: AMBER }} />
          </motion.div>
          <span
            className="text-[13px] font-bold tracking-wide"
            style={{ fontFamily: "'DM Serif Display', serif", color: AMBER }}
          >
            {card.num}
          </span>
        </div>

        <h3 className="relative mb-2 text-[17px] font-semibold leading-snug" style={{ color: INK }}>
          {card.title}
        </h3>
        <p className="relative text-[14px] leading-relaxed" style={{ color: MUTED }}>
          {card.desc}
        </p>

        {/* Bottom accent line that grows in on hover */}
        <motion.div
          className="absolute bottom-0 left-0 h-[3px]"
          style={{ background: AMBER }}
          animate={{ width: hovered ? '100%' : '0%' }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function ConsultationIntroCards() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden px-6 py-16 sm:px-8 lg:py-20"
      style={{ background: CREAM, fontFamily: "'Manrope', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Manrope:wght@400;500;600;700;800&display=swap');
      `}</style>

      {/* Large faint ring, centered behind the row — a fresh placement */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border"
        style={{ borderColor: `${AMBER}12` }}
      />

      {/* Floating particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute rounded-full"
          style={{
            width: 4 + (i % 3) * 3,
            height: 4 + (i % 3) * 3,
            background: `${AMBER}50`,
            top: `${10 + i * 16}%`,
            left: `${i % 2 === 0 ? 3 + i : 92 - i}%`,
          }}
          animate={{ y: [0, -12, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
        />
      ))}

      <div className="relative mx-auto max-w-[1100px]">
        <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-5">
          {/* Connecting dotted line — desktop only, draws in behind the cards */}
          <div className="pointer-events-none absolute left-0 right-0 top-[58px] hidden sm:block">
            <svg width="100%" height="2" className="overflow-visible">
              <motion.line
                x1="16%"
                y1="1"
                x2="84%"
                y2="1"
                stroke={AMBER}
                strokeWidth="1.5"
                strokeDasharray="1 9"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 0.6 } : {}}
                transition={{ duration: 1.2, delay: 0.3, ease: 'easeInOut' }}
              />
            </svg>
          </div>

          {CARDS.map((card, i) => (
            <IntroCard key={card.num} card={card} index={i} inView={inView} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-10 text-center text-[14.5px] italic"
          style={{ color: MUTED }}
        >
          This is a genuine consultation, not a sales call with a consultation label on it. If
          you don&apos;t need a plan, we&apos;ll tell you.
        </motion.p>
      </div>
    </section>
  );
}