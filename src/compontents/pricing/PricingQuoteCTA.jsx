"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MessageSquareText, UserCheck, FileCheck2, ArrowUpRight } from 'lucide-react';

const NAVY = '#0D1526';
const AMBER = '#C7954A';
const AMBER_LIGHT = '#E3B978';
const WHITE = '#FFFFFF';
const MUTED = '#A6ACC0';

const STEPS = [
  { Icon: MessageSquareText, title: 'Tell us what you need', desc: 'Share the requirement, document or legal matter you need assistance with.' },
  { Icon: UserCheck, title: 'We Assess the Requirement', desc: 'We understand the requirement and determine the appropriate scope of work.' },
  { Icon: FileCheck2, title: 'Get a Clear Quote', desc: 'Receive the scope, timeline and professional fee upfront.' },
];

function ProcessStep({ step, index, inView, isLast }) {
  return (
    <div className="relative flex flex-1 flex-col items-center text-center sm:flex-row sm:text-left">
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.5 + index * 0.18, ease: 'backOut' }}
        className="relative z-10 mb-4 flex h-14 w-14 shrink-0 items-center justify-center rounded-full sm:mb-0 sm:mr-4"
        style={{ background: NAVY, border: `1.5px solid ${AMBER}` }}
      >
        <motion.div
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: index * 0.4 }}
        >
          <step.Icon size={22} strokeWidth={1.9} style={{ color: AMBER }} />
        </motion.div>
        <span
          className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold"
          style={{ background: AMBER, color: NAVY }}
        >
          {index + 1}
        </span>
      </motion.div>

      <div>
        <h4 className="mb-1 text-[14.5px] font-semibold text-white">{step.title}</h4>
        <p className="max-w-[190px] text-[12.5px] leading-relaxed" style={{ color: MUTED }}>
          {step.desc}
        </p>
      </div>

      {!isLast && (
        <div className="relative mx-2 my-3 h-6 w-px overflow-hidden sm:my-0 sm:h-px sm:w-10 sm:flex-1">
          <div className="absolute inset-0" style={{ background: 'rgba(255,255,255,0.1)' }} />
          <motion.div
            initial={{ scaleY: 0, scaleX: 0 }}
            animate={inView ? { scaleY: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.9 + index * 0.18, ease: 'easeInOut' }}
            className="absolute inset-0 origin-top sm:origin-left"
            style={{ background: AMBER }}
          />
        </div>
      )}
    </div>
  );
}

export default function PricingQuoteCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="quote"
      ref={ref}
      className="relative overflow-hidden px-6 py-20 sm:px-8 lg:py-28"
      style={{ background: NAVY, fontFamily: "'Manrope', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Manrope:wght@400;500;600;700;800&display=swap');
        @keyframes quoteLinesDrift {
          from { background-position: 0 0; }
          to { background-position: 120px 120px; }
        }
        .quote-lines-bg {
          background-image: repeating-linear-gradient(
            135deg,
            rgba(199,149,74,0.07) 0px,
            rgba(199,149,74,0.07) 1px,
            transparent 1px,
            transparent 26px
          );
          animation: quoteLinesDrift 12s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .quote-lines-bg { animation: none !important; }
        }
      `}</style>

      {/* Unique diagonal-line texture, drifting slowly — distinct from the ring/particle system used elsewhere */}
      <div className="quote-lines-bg pointer-events-none absolute inset-0" />

      {/* Radial spotlight behind the heading */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2"
        style={{ background: `radial-gradient(ellipse at center, ${AMBER}1a 0%, transparent 65%)` }}
      />

      {/* Ambient corner glow */}
      <motion.div
        className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full"
        style={{ background: AMBER, opacity: 0.1, filter: 'blur(100px)' }}
        animate={{ x: [0, -20, 0], y: [0, 15, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative mx-auto max-w-[820px] text-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.12em]"
          style={{ background: 'rgba(199,149,74,0.12)', color: AMBER_LIGHT, border: `1px solid ${AMBER}33` }}
        >
          <span className="relative flex h-1.5 w-1.5">
            <motion.span
              animate={{ scale: [1, 2.2], opacity: [0.7, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
              className="absolute inline-flex h-full w-full rounded-full"
              style={{ background: AMBER }}
            />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: AMBER }} />
          </span>
          Custom Quote
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.08 }}
          className="mb-4"
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontWeight: 400,
            fontSize: 'clamp(28px, 4vw, 44px)',
            lineHeight: 1.15,
            color: WHITE,
          }}
        >
         Need a Specific Legal Service?
          <br />
          <span style={{ color: AMBER_LIGHT }}>We’ll Take It From Here.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="mx-auto mb-10 max-w-[520px] text-[16px] leading-relaxed"
          style={{ color: MUTED }}
        >
         Whether you need a document, registration, certification, compliance support or any other specific legal requirement, tell us what you need and we’ll provide a clear scope and quote.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.24 }}
          className="mb-16 flex justify-center"
        >
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            className="group relative inline-flex h-[54px] items-center justify-center gap-2 overflow-hidden rounded-full px-8 text-[14.5px] font-semibold"
            style={{ background: AMBER, color: NAVY }}
            onMouseEnter={(e) => (e.currentTarget.style.background = AMBER_LIGHT)}
            onMouseLeave={(e) => (e.currentTarget.style.background = AMBER)}
          >
            Request a Quote
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="flex"
            >
              <ArrowUpRight size={18} />
            </motion.span>
          </motion.a>
        </motion.div>

        {/* Mini process flow — turns a plain CTA band into something worth reading */}
        <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-start sm:gap-0">
          {STEPS.map((step, i) => (
            <ProcessStep key={i} step={step} index={i} inView={inView} isLast={i === STEPS.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}