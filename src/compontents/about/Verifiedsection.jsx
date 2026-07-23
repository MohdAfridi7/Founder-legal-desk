"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BadgeCheck, ShieldCheck, UserCheck, ScrollText } from 'lucide-react';

const INK = '#12151F';
const MUTED = '#6B7184';
const AMBER = '#C7954A';
const AMBER_SOFT = '#F3E4CE';
const CREAM_100 = '#F0EEE7';
const NAVY = '#12182B';

const VERIFY_IMAGE =
  'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1000&q=80';

const CHECKLIST = [
  {
    Icon: UserCheck,
    text: 'A named professional reviews every single document — not an algorithm.',
  },
  {
    Icon: ShieldCheck,
    text: 'Checked for accuracy, enforceability, and completeness before delivery.',
  },
  {
    Icon: ScrollText,
    text: 'Personal accountability — the specialist stands behind the work.',
  },
];

function ChecklistRow({ Icon, text, index }) {
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

// The circular "verified" seal — text running along a ring, the ring itself
// draws in with a stroke animation once it scrolls into view.
function VerifiedSeal({ inView }) {
  const size = 132;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      className="absolute -bottom-8 -left-8 z-[2] flex items-center justify-center rounded-full sm:-bottom-10 sm:-left-10"
      style={{ width: size, height: size, background: NAVY, boxShadow: '0 14px 34px -10px rgba(18,21,31,0.5)' }}
    >
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 132 132"
        animate={{ rotate: 360 }}
        transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0"
      >
        <circle cx="66" cy="66" r="52" fill="none" stroke={`${AMBER}33`} strokeWidth="1" />
        <motion.circle
          cx="66"
          cy="66"
          r="58"
          fill="none"
          stroke={AMBER}
          strokeWidth="1.5"
          strokeDasharray="365"
          initial={{ strokeDashoffset: 365 }}
          animate={inView ? { strokeDashoffset: 0 } : {}}
          transition={{ duration: 1.6, delay: 0.6, ease: 'easeInOut' }}
        />
        <path id="sealPath" d="M 66,66 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="none" />
        <text fontSize="7" fill={AMBER} letterSpacing="2" fontFamily="'Manrope', sans-serif" fontWeight="700">
          <textPath href="#sealPath">SPECIALIST VERIFIED &#8226; FOUNDERS LEGAL DESK &#8226; </textPath>
        </text>
      </motion.svg>

      <motion.div
        initial={{ opacity: 0, scale: 0.4 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 1.3, ease: 'backOut' }}
        className="flex h-11 w-11 items-center justify-center rounded-full"
        style={{ background: AMBER }}
      >
        <BadgeCheck size={22} strokeWidth={2} color={NAVY} />
      </motion.div>
    </motion.div>
  );
}

export default function VerifiedSection() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, amount: 0.5 });

  const sealRef = useRef(null);
  const sealInView = useInView(sealRef, { once: true, amount: 0.5 });

  return (
    <section
      className="relative overflow-hidden px-6 py-20 sm:px-8 lg:py-28"
      style={{ background: CREAM_100, fontFamily: "'Manrope', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Manrope:wght@400;500;600;700;800&display=swap');
      `}</style>

      {/* Rotating ring outlines — top-left this time, completing the rotation around the page corners */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 75, repeat: Infinity, ease: 'linear' }}
        className="pointer-events-none absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full border"
        style={{ borderColor: `${AMBER}22` }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 95, repeat: Infinity, ease: 'linear' }}
        className="pointer-events-none absolute -left-16 -top-16 h-[250px] w-[250px] rounded-full border"
        style={{ borderColor: `${AMBER}30` }}
      />

      {/* Floating particles, scattered bottom-right */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute rounded-full"
          style={{
            width: 4 + (i % 3) * 3,
            height: 4 + (i % 3) * 3,
            background: `${AMBER}${['55', '66', '44', '77', '55'][i]}`,
            bottom: `${10 + i * 14}%`,
            right: `${6 + i * 5}%`,
          }}
          animate={{ y: [0, -14, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 }}
        />
      ))}

      <div className="relative mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
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
            Verification
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
            {'What "specialist-verified" means'.split(' ').map((w, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 18 }}
                animate={headingInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.06, ease: 'easeOut' }}
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
            className="mb-4 max-w-[540px] text-[16px] leading-relaxed"
            style={{ color: MUTED }}
          >
            Every document delivered through Founders Legal Desk is reviewed and verified by the
            specialist who prepared it. This isn&apos;t a platform badge or an automated quality
            check.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mb-8 max-w-[540px] text-[16px] leading-relaxed"
            style={{ color: MUTED }}
          >
            A named professional has reviewed your document, checked it for accuracy and
            enforceability, and takes personal responsibility for the work. That&apos;s different
            from any template platform or anonymous marketplace — and it&apos;s what makes a
            document from Founders Legal Desk worth more than a downloaded format, at a price
            that works for a growing business.
          </motion.p>

          {/* Checklist */}
          <div className="flex flex-col gap-1">
            {CHECKLIST.map((c, i) => (
              <ChecklistRow key={i} {...c} index={i} />
            ))}
          </div>
        </div>

        {/* ---------- Image column ---------- */}
        <motion.div
          ref={sealRef}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative mx-auto w-full max-w-[400px] lg:mx-0 lg:ml-auto"
        >
          {/* Offset frame behind the image */}
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
            className="relative z-[1] aspect-[4/5] overflow-hidden rounded-2xl shadow-xl"
          >
            <img
              src={VERIFY_IMAGE}
              alt="Specialist reviewing and verifying a legal document"
              className="h-full w-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(180deg, transparent 55%, rgba(18,21,31,0.5) 100%)' }}
            />
          </motion.div>

          {/* Rotating "verified" seal, overlapping the bottom-left corner */}
          <VerifiedSeal inView={sealInView} />
        </motion.div>
      </div>
    </section>
  );
}