"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import {  FileSearch,Scale,FileCheck,ShieldCheck,Award } from 'lucide-react';

const steps = [
  {
    id: 1,
    label: 'O1',
    title: 'Tell us what you need',
    description: 'Choose a plan or describe the specific document you need. Takes 2 minutes.',
    Icon: FileSearch,
  },
  {
    id: 2,
    label: 'O2',
    title: 'We assign a specialist',
    description: 'A qualified specialist from our panel takes your requirement and reviews your situation.',
    Icon: Scale,
  },
  {
    id: 3,
    label: 'O3',
    title: 'Document prepared & verified',
    description: 'The specialist drafts, reviews, and verifies your document for accuracy and enforceability.',
    Icon: FileCheck,
  },
  {
    id: 4,
    label: 'O4',
    title: 'Delivered within 48 hours',
    description: 'You receive a professionally prepared, verified document you can use with confidence.',
    Icon: ShieldCheck,
  },
];

/* ============================================================
   ARROWS — now drawn on scroll instead of appearing instantly,
   using stroke-dashoffset so the connector visibly "slides"
   from one step to the next.
   ============================================================ */
function ArrowDownRight() {
  return (
    <svg width="80" height="52" viewBox="0 0 80 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.path
        d="M4 8 Q40 8 72 44"
        stroke="#1F2235"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, ease: 'easeInOut', delay: 0.15 }}
      />
      <motion.path
        d="M60 38 L73 45 L73 30"
        stroke="#1F2235"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ opacity: 0, x: -8 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.35, delay: 0.75 }}
      />
    </svg>
  );
}

function ArrowUpRight() {
  return (
    <svg width="80" height="52" viewBox="0 0 80 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.path
        d="M4 44 Q40 44 72 8"
        stroke="#1F2235"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, ease: 'easeInOut', delay: 0.15 }}
      />
      <motion.path
        d="M60 7 L75 5 L75 20"
        stroke="#1F2235"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ opacity: 0, x: 8 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.35, delay: 0.75 }}
      />
    </svg>
  );
}

const arrowList = [ArrowDownRight, ArrowUpRight, ArrowDownRight];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

/* ============================================================
   SLIDE-IN CARD VARIANTS
   Alternating steps slide in from opposite horizontal directions
   (left → right → left → right) instead of a plain fade-up,
   giving the zig-zag layout a real "sliding" motion.
   ============================================================ */
const cardVariants = {
  hidden: (index) => ({
    opacity: 0,
    x: index % 2 === 0 ? -70 : 70,
    y: 24,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 0.85, 0.3, 1.1] },
  },
};

/* mobile: alternate slide direction is less useful in a single
   column, so slide up with a touch of horizontal drift instead */
const cardVariantsMobile = {
  hidden: (index) => ({
    opacity: 0,
    x: index % 2 === 0 ? -30 : 30,
    y: 40,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

function StepText({ title, description }) {
  return (
    <div className="text-center w-full max-w-[260px] px-2">
      <h3
        className="font-medium text-[#1F2235] mb-3"
        style={{ fontFamily: "'Playfair Display', serif", fontSize: '26px', lineHeight: '1.3' }}
      >
        {title}
      </h3>
      <p
        className="text-[#7B7B7B]"
        style={{ fontFamily: "'Poppins', sans-serif", fontSize: '15px', lineHeight: '1.7' }}
      >
        {description}
      </p>
    </div>
  );
}

function StepRing({ step, index, isHovered }) {
  const isEven = index % 2 !== 0;
  const { Icon } = step;

  return (
    <div className="relative shrink-0 w-[170px] h-[170px] sm:w-[180px] sm:h-[190px] lg:w-[180px] lg:h-[180px]">
      {/* Conic-gradient progress ring */}
      <div
        className={`process-ring-base absolute inset-0 w-full h-full ${
          isHovered ? 'ring-active' : ''
        }`}
      />
      {/* Inner circle */}
      <div
        className="absolute inset-[10px] lg:inset-[12px] rounded-full bg-white flex items-center justify-center"
      >
       <div className="w-10 h-10 sm:w-[52px] sm:h-[52px]">
    <Icon
      className="w-full h-full text-[#1F2235]"
      strokeWidth={1.5}
    />
  </div>
      </div>
      {/* Number badge */}
      <div
        className={[
          'absolute left-1/2 -translate-x-1/2 z-10',
          'flex items-center justify-center rounded-full font-medium',
          'transition-all duration-700 ease-in-out',
          isHovered ? 'bg-[#1F2235] text-white' : 'bg-[#F5F5F5] text-[#1F2235]',
          isEven ? '-bottom-4' : '-top-4',
        ].join(' ')}
        style={{
          width: '48px',
          height: '48px',
          fontFamily: "'Poppins', sans-serif",
          fontSize: '13px',
        }}
      >
        {step.label}
      </div>
    </div>
  );
}

function StepCard({ step, index, isHovered, onEnter, onLeave, variants }) {
  const isEven = index % 2 !== 0;

  return (
    <motion.div
      custom={index}
      variants={variants}
      className="flex flex-col items-center gap-6 cursor-pointer select-none rounded-2xl"
      style={{
        padding: '12px',
        transition: 'transform 700ms ease',
        transform: isHovered ? 'translateY(-12px) scale(1.03)' : 'translateY(0) scale(1)',
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* On desktop: even steps show text on top, odd steps show text on bottom
          On mobile/tablet: always ring on top, text on bottom */}
      {isEven ? (
        <>
          <div className="hidden lg:block">
            <StepText title={step.title} description={step.description} />
          </div>
          <StepRing step={step} index={index} isHovered={isHovered} />
          <div className="lg:hidden">
            <StepText title={step.title} description={step.description} />
          </div>
        </>
      ) : (
        <>
          <StepRing step={step} index={index} isHovered={isHovered} />
          <StepText title={step.title} description={step.description} />
        </>
      )}
    </motion.div>
  );
}

export default function WorkProcessSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="relative bg-white py-20 lg:py-28 overflow-hidden">
      {/* ============================================================
          DECORATIVE SIDE ELEMENTS — rotating ring circles + floating
          dots on both edges. Each ring group slides in from off-screen
          (not just a fade) the first time the section scrolls into view.
          ============================================================ */}
      <motion.div
        initial={{ x: -140, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute -left-32 top-1/2 hidden -translate-y-1/2 sm:block"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 75, repeat: Infinity, ease: 'linear' }}
          className="h-[360px] w-[360px] rounded-full border"
          style={{ borderColor: 'rgba(199,149,74,0.22)' }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 95, repeat: Infinity, ease: 'linear' }}
          className="absolute left-16 top-16 h-[220px] w-[220px] rounded-full border"
          style={{ borderColor: 'rgba(199,149,74,0.3)' }}
        />
      </motion.div>

      <motion.div
        initial={{ x: 140, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="pointer-events-none absolute -right-32 top-1/3 hidden -translate-y-1/2 sm:block"
      >
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
          className="h-[320px] w-[320px] rounded-full border"
          style={{ borderColor: 'rgba(199,149,74,0.22)' }}
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
          className="absolute left-14 top-14 h-[190px] w-[190px] rounded-full border"
          style={{ borderColor: 'rgba(199,149,74,0.3)' }}
        />
      </motion.div>

      {/* Floating dots — left edge, slide in with the left ring group */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`dot-l-${i}`}
          initial={{ x: -60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 + i * 0.08 }}
          className="pointer-events-none absolute rounded-full"
          style={{
            width: 5 + (i % 2) * 3,
            height: 5 + (i % 2) * 3,
            background: 'rgba(199,149,74,0.55)',
            top: `${18 + i * 18}%`,
            left: `${2 + i * 2.5}%`,
          }}
        >
          <motion.span
            className="block h-full w-full rounded-full bg-inherit"
            animate={{ y: [0, -14, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
          />
        </motion.div>
      ))}

      {/* Floating dots — right edge */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`dot-r-${i}`}
          initial={{ x: 60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.25 + i * 0.08 }}
          className="pointer-events-none absolute rounded-full"
          style={{
            width: 5 + (i % 2) * 3,
            height: 5 + (i % 2) * 3,
            background: 'rgba(199,149,74,0.55)',
            top: `${24 + i * 16}%`,
            right: `${2 + i * 2.5}%`,
          }}
        >
          <motion.span
            className="block h-full w-full rounded-full bg-inherit"
            animate={{ y: [0, -14, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3.2 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 + 0.3 }}
          />
        </motion.div>
      ))}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
       <motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
  className="text-center mb-16 lg:mb-24"
>
  <div className="inline-flex items-center gap-2 text-[12.5px] font-bold uppercase tracking-[0.14em] text-[#C7954A] mb-4">
    <span className="w-5 h-px bg-[#C7954A]" />
    PROCESS
  </div>

  <h2
  className="text-[28px] sm:text-[34px] lg:text-[42px] leading-[1.15] font-semibold"
  style={{ fontFamily: "'Fraunces', Georgia, serif" }}
>
  How it <span className="text-[#C7954A]"> works
  </span>
</h2>
</motion.div>

        {/* Desktop zig-zag layout */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={containerVariants}
          className="hidden lg:flex items-center justify-center"
          style={{ minHeight: '500px' }}
        >
          {steps.map((step, index) => {
            const isEven = index % 2 !== 0;
            const ArrowComp = arrowList[index];

            return (
              <div key={step.id} className="flex items-center">
                <div
                  className={`
                    ${isEven ? 'translate-y-12 xl:translate-y-16' : '-translate-y-4 xl:-translate-y-6'}
                  `}
                >
                  <StepCard
                    step={step}
                    index={index}
                    isHovered={hoveredIndex === index}
                    onEnter={() => setHoveredIndex(index)}
                    onLeave={() => setHoveredIndex(null)}
                    variants={cardVariants}
                  />
                </div>

                {index < steps.length - 1 && (
                  <div
                    className="flex items-center justify-center shrink-0"
                    style={{
                      width: '88px',
                      marginTop: isEven ? '-40px' : '40px',
                    }}
                  >
                    <ArrowComp />
                  </div>
                )}
              </div>
            );
          })}
        </motion.div>

        {/* Mobile / Tablet layout */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="
lg:hidden
grid
grid-cols-1
md:grid-cols-2
gap-y-14
gap-x-8
place-items-center
"
        >
          {steps.map((step, index) => (
            <StepCard
              key={step.id}
              step={step}
              index={index}
              isHovered={hoveredIndex === index}
              onEnter={() => setHoveredIndex(index)}
              onLeave={() => setHoveredIndex(null)}
              variants={cardVariantsMobile}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}