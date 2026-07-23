"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FileWarning, UserX, ScrollText, CheckCircle2 } from 'lucide-react';

const INK = '#12151F';
const MUTED = '#6B7184';
const AMBER = '#C7954A';
const AMBER_SOFT = '#F3E4CE';
const CREAM = '#F7F6F2';
const NAVY = '#12182B';

const PROBLEM_IMAGE =
  'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1000&q=80';

const PAIN_POINTS = [
  {
    Icon: ScrollText,
    text: "Vendor agreements that don't hold up in a dispute.",
  },
  {
    Icon: FileWarning,
    text: 'Offer letters missing key clauses.',
  },
  {
    Icon: UserX,
    text: 'Co-founder agreements that were never signed — because "we trust each other."',
  },
];

function PainPointRow({ Icon, text, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -28 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.12, ease: 'easeOut' }}
      whileHover={{ x: 6 }}
      className="group flex items-start gap-4 rounded-xl border border-transparent px-3 py-3 transition-colors duration-300 hover:border-[#C7954A33] hover:bg-white"
    >
      <motion.div
        initial={{ scale: 0, rotate: -30 }}
        animate={inView ? { scale: 1, rotate: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.12 + 0.15, ease: 'backOut' }}
        className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors duration-300 group-hover:bg-[#C7954A]"
        style={{ background: AMBER_SOFT }}
      >
        <Icon size={17} strokeWidth={2} style={{ color: AMBER }} className="transition-colors duration-300 group-hover:text-white" />
      </motion.div>
      <p className="pt-1 text-[15px] leading-relaxed" style={{ color: INK }}>
        {text}
      </p>
    </motion.div>
  );
}

export default function ProblemSection() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, amount: 0.5 });

  return (
    <section
      className="relative overflow-hidden px-6 py-20 sm:px-8 lg:py-28"
      style={{ background: CREAM, fontFamily: "'Manrope', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Manrope:wght@400;500;600;700;800&display=swap');
      `}</style>

      {/* Ambient accent glow, top-left */}
      <div
        className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full"
        style={{ background: AMBER, opacity: 0.08, filter: 'blur(100px)' }}
      />

      {/* Rotating ring outlines — bottom-right this time, so the pattern feels consistent across sections without repeating in the same spot */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
        className="pointer-events-none absolute -bottom-44 -right-44 h-[460px] w-[460px] rounded-full border"
        style={{ borderColor: `${AMBER}22` }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
        className="pointer-events-none absolute -bottom-20 -right-20 h-[270px] w-[270px] rounded-full border"
        style={{ borderColor: `${AMBER}30` }}
      />

      {/* Floating particles, scattered along the right edge */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute rounded-full"
          style={{
            width: 4 + (i % 3) * 3,
            height: 4 + (i % 3) * 3,
            background: `${AMBER}${['66', '77', '55', '88', '66'][i]}`,
            top: `${12 + i * 15}%`,
            right: `${4 + i * 4}%`,
          }}
          animate={{ y: [0, -14, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 }}
        />
      ))}

      <div className="relative mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        {/* ---------- Image column ---------- */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative mx-auto w-full max-w-[440px] lg:mx-0"
        >
          {/* Offset frame behind the image */}
          <motion.div
            initial={{ opacity: 0, x: -14, y: 14 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
            className="absolute -bottom-5 -right-5 h-full w-full rounded-2xl"
            style={{ border: `2px solid ${AMBER}`, zIndex: 0 }}
          />

          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="relative z-[1] aspect-[4/5] overflow-hidden rounded-2xl shadow-xl"
          >
            <img
              src={PROBLEM_IMAGE}
              alt="Business documents and contracts on a desk"
              className="h-full w-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(180deg, transparent 55%, rgba(18,21,31,0.55) 100%)' }}
            />
          </motion.div>

          {/* Floating stat / callout card, overlapping the image */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5, ease: 'backOut' }}
            animate={{ y: [0, -8, 0] }}
            className="absolute -left-6 bottom-6 z-[2] w-[220px] rounded-xl p-4 shadow-2xl sm:-left-8 sm:w-[240px] sm:p-5"
            style={{ background: NAVY }}
          >
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              className="mb-2 flex h-8 w-8 items-center justify-center rounded-full"
              style={{ background: AMBER }}
            >
              <FileWarning size={16} strokeWidth={2} color={NAVY} />
            </motion.div>
            <p className="text-[13px] font-semibold leading-snug text-white">
              Most disputes trace back to a document nobody reviewed.
            </p>
          </motion.div>
        </motion.div>

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
            The Problem
          </motion.div>

          <h2
            ref={headingRef}
            className="mb-6"
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontWeight: 400,
              fontSize: 'clamp(28px, 3.6vw, 42px)',
              lineHeight: 1.15,
              color: INK,
            }}
          >
            {'The problem we\u2019re solving'.split(' ').map((w, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 18 }}
                animate={headingInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.07, ease: 'easeOut' }}
                className="inline-block"
              >
                {w}
                {i < 3 ? '\u00A0' : ''}
              </motion.span>
            ))}
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8 max-w-[520px] text-[16px] leading-relaxed"
            style={{ color: MUTED }}
          >
            Most Indian startups and growing businesses fall into a document no-man&apos;s-land.
            Too small to justify a retainer. Too exposed to rely on downloaded templates. Too busy
            to figure out what they actually need. The result:
          </motion.p>

          {/* Pain points */}
          <div className="mb-8 flex flex-col gap-1">
            {PAIN_POINTS.map((p, i) => (
              <PainPointRow key={i} {...p} index={i} />
            ))}
          </div>

          {/* Closing statement — highlighted card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            className="relative overflow-hidden rounded-xl p-6"
            style={{ background: NAVY }}
          >
            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-1"
              style={{ background: AMBER }}
            />
            <div className="flex items-start gap-3">
              <motion.div
                animate={{ rotate: [0, 8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="mt-0.5 shrink-0"
              >
                <CheckCircle2 size={22} strokeWidth={2} style={{ color: AMBER }} />
              </motion.div>
              <p className="text-[15px] leading-relaxed text-white/90">
                <span className="font-semibold text-white">Founders Legal Desk closes that gap.</span>{' '}
                Fixed-price packages. Qualified specialists who review and verify every document. A
                platform built by people who understand startups — not by people who&apos;ve only
                ever worked for large corporations.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}