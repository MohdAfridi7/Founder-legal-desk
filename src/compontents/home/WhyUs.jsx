"use client";

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Scale,
  Gavel,
  Landmark,
  FileText,
  FileSignature,
  ShieldCheck,
  Newspaper,
  Tag,
  Clock,
} from "lucide-react";

const INK = '#F5F7FB';                  // headline text — near-white for dark bg
const MUTED = '#9FB0C9';                // body text — soft blue-gray
const BLUE = '#D9A441';                 // bright accent — now warm gold, matching reference
const NAVY = '#8A5A1F';                 // deep amber — gradient partner, blob 2
const BLUE_SOFT = 'rgba(217,164,65,0.14)'; // translucent icon-chip background
const BORDER = 'rgba(255,255,255,0.10)';
const CARD_BG = 'rgba(255,255,255,0.035)';
const BG_FROM = '#0F1D38';              // section background gradient start
const BG_TO = '#16294B';                // section background gradient end

const NODES = [
  { Icon: Scale, angle: -90 },
  { Icon: Gavel, angle: -30 },
  { Icon: FileSignature, angle: 30 },
  { Icon: Landmark, angle: 90 },
  { Icon: ShieldCheck, angle: 150 },
  { Icon: FileText, angle: 210 },
];

const FEATURES = [
  {
    Icon: Landmark,
    title: "Built for Startups",
    desc: "Get structured corporate and compliance support without having to build a full in-house function from day one.",
  },
  {
    Icon: Scale,
    title: "Specialist Network",
    desc: "Different business requirements are coordinated with specialists based on the nature of the work, ensuring the right expertise for every matter.",
  },
  {
    Icon: ShieldCheck,
    title: "One Point of Coordination",
    desc: "Manage contracts, compliance, intellectual property, employment and corporate matters through one trusted platform instead of multiple providers.",
  },
  {
    Icon: Clock,
    title: "Ongoing Support",
    desc: "Move from reactive problem-solving to proactive documentation, compliance and business protection as your company grows.",
  },
];
const cardVariants = {
  hidden: (index) => ({
    opacity: 0,
    x: index % 2 === 0 ? -100 : 100,
    y: 40,
    scale: 0.9,
  }),

  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,

    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};
function CenterIcon() {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'backOut' }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative z-10 flex h-16 w-16 cursor-pointer items-center justify-center rounded-2xl sm:h-[72px] sm:w-[72px]"
      style={{ background: `linear-gradient(135deg, ${BLUE}, ${NAVY})`, boxShadow: `0 12px 28px -8px ${BLUE}88` }}
    >
      {/* Expanding ripple rings — only appear on hover, staggered so they radiate outward */}
      {[0, 1, 2].map((ring) => (
        <motion.span
          key={ring}
          className="pointer-events-none absolute inset-0 rounded-2xl border"
          style={{ borderColor: BLUE }}
          animate={
            hovered
              ? { opacity: [0.5, 0], scale: [1, 1.9 + ring * 0.25] }
              : { opacity: 0, scale: 1 }
          }
          transition={{
            duration: 1.4,
            repeat: hovered ? Infinity : 0,
            delay: ring * 0.35,
            ease: 'easeOut',
          }}
        />
      ))}

      <motion.div
        animate={
          hovered
            ? { scale: 1.15, rotate: -18 }
            : { scale: [1, 1.08, 1], rotate: 0 }
        }
        transition={
          hovered
            ? { type: 'spring', stiffness: 300, damping: 12 }
            : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }
        }
      >
        <Scale size={30} strokeWidth={1.75} color="#fff" />
      </motion.div>
    </motion.div>
  );
}

function OrbitNode({ Icon, angle, radius, index }) {
  const rad = (angle * Math.PI) / 180;
  const x = radius * Math.cos(rad);
  const y = radius * Math.sin(rad);

  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{ transform: `translate(${x}px, ${y}px) translate(-50%, -50%)` }}
    >
      {/* Counter-rotates against the parent orbit so the icon itself always stays upright */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.4 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 + index * 0.08, ease: 'backOut' }}
          whileHover={{ scale: 1.18, borderColor: BLUE, boxShadow: `0 8px 20px -6px ${BLUE}55` }}
          className="flex h-11 w-11 items-center justify-center rounded-xl border bg-white sm:h-12 sm:w-12"
          style={{ borderColor: BORDER }}
        >
          <Icon size={19} strokeWidth={1.75} style={{ color: BLUE }} />
        </motion.div>
      </motion.div>
    </div>
  );
}

function OrbitVisual() {
  const round = (num) => Number(num.toFixed(2));
  const size = 300;
  const nodeRadius = 120;
  const spokeRadius = 112; // slightly short of node center so lines tuck behind the icon chip

  // Precompute spoke endpoints + a few ambient particle positions
  const spokes = NODES.map((n) => {
    const rad = (n.angle * Math.PI) / 180;
    return { x: 150 + spokeRadius * Math.cos(rad), y: 150 + spokeRadius * Math.sin(rad) };
  });

  const PARTICLES = [
    { x: 60, y: 95, delay: 0 },
    { x: 235, y: 70, delay: 0.6 },
    { x: 220, y: 220, delay: 1.2 },
    { x: 75, y: 210, delay: 1.8 },
    { x: 150, y: 45, delay: 2.4 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="relative mx-auto flex items-center justify-center"
      style={{ width: size, height: size, maxWidth: '85vw', maxHeight: '85vw' }}
    >
      {/* Soft radial glow filling the core — kills the "empty circle" look */}
      <div
        className="pointer-events-none absolute rounded-full"
        style={{
          inset: '8%',
          background: `radial-gradient(circle, ${BLUE}33 0%, ${BLUE}0d 45%, transparent 72%)`,
          filter: 'blur(2px)',
        }}
      />

      {/* Tick-mark dial ring — static, gives an instrument-panel density between the two circles */}
      <svg viewBox="0 0 300 300" className="absolute inset-0 h-full w-full">
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i * 15 * Math.PI) / 180;
          const rOuter = 100;
          const rInner = i % 2 === 0 ? 92 : 96;
          return (
           <line
  key={i}
  x1={round(150 + rInner * Math.cos(a))}
  y1={round(150 + rInner * Math.sin(a))}
  x2={round(150 + rOuter * Math.cos(a))}
  y2={round(150 + rOuter * Math.sin(a))}
  stroke={i % 2 === 0 ? `${BLUE}55` : "rgba(255,255,255,0.12)"}
  strokeWidth="1"
/>
          );
        })}
      </svg>

      {/* Outer dashed ring — rotates continuously */}
      <motion.svg
        viewBox="0 0 300 300"
        className="absolute inset-0 h-full w-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        <circle
          cx="150"
          cy="150"
          r="120"
          stroke="url(#aiGrad)"
          strokeWidth="1.25"
          fill="none"
          strokeDasharray="4 8"
        />
        <defs>
          <linearGradient id="aiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={`${BLUE}73`} />
            <stop offset="100%" stopColor={`${NAVY}66`} />
          </linearGradient>
        </defs>
      </motion.svg>

      {/* Inner dashed ring — static, subtle */}
      <svg viewBox="0 0 300 300" className="absolute inset-0 h-full w-full">
        <circle cx="150" cy="150" r="80" stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="none" strokeDasharray="2 6" />
      </svg>

      {/* Spokes — connect the hub to each node, with a pulse of light traveling outward along each one */}
      <svg viewBox="0 0 300 300" className="absolute inset-0 h-full w-full">
        {spokes.map((s, i) => (
          <line
            key={i}
            x1="150"
            y1="150"
            x2={s.x}
            y2={s.y}
            stroke={`${BLUE}30`}
            strokeWidth="1"
          />
        ))}
        {spokes.map((s, i) => (
          <motion.circle
            key={`pulse-${i}`}
            r="2.5"
            fill={BLUE}
            initial={{ cx: 150, cy: 150, opacity: 0 }}
            animate={{ cx: [150, s.x], cy: [150, s.y], opacity: [0, 1, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.35 }}
          />
        ))}
      </svg>

      {/* Ambient particles — small twinkling dots so the field between rings never reads empty */}
      {PARTICLES.map((p, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute rounded-full"
          style={{ left: p.x, top: p.y, width: 4, height: 4, background: BLUE }}
          animate={{ opacity: [0.15, 0.9, 0.15], scale: [0.8, 1.3, 0.8] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
        />
      ))}

      {/* Center — the legal icon: gentle idle pulse, plus an advanced hover state with rotate, scale and expanding ripple rings */}
      <CenterIcon />

      {/* Orbiting nodes — rotate as a group, each node counter-rotates to stay upright */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
      >
        {NODES.map((n, i) => (
          <OrbitNode key={i} Icon={n.Icon} angle={n.angle} radius={nodeRadius} index={i} />
        ))}
      </motion.div>
    </motion.div>
  );
}

function FeatureCard({ Icon, title, desc, index }) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  function handleMouseMove(e) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: py * -10, ry: px * 10 });
  }

  return (
   <motion.div
  ref={ref}
  custom={index}
  variants={cardVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.25 }}
  onMouseMove={handleMouseMove}
  onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
  animate={{
    rotateX: tilt.rx,
    rotateY: tilt.ry,
    y: tilt.rx !== 0 || tilt.ry !== 0 ? -8 : 0,
    borderColor: tilt.rx !== 0 || tilt.ry !== 0 ? BLUE : BORDER,
    boxShadow:
      tilt.rx !== 0 || tilt.ry !== 0
        ? `0 18px 40px -12px ${BLUE}40`
        : "0 0px 0px rgba(0,0,0,0)",
  }}
  transition={{ type: "spring", stiffness: 180, damping: 18 }}
  style={{
    background: CARD_BG,
    borderColor: BORDER,
    transformPerspective: 800,
  }}
  className="rounded-xl border p-5"
>
      <div
        className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg"
        style={{ background: BLUE_SOFT }}
      >
        <Icon size={17} strokeWidth={1.75} style={{ color: BLUE }} />
      </div>
      <h3 className="mb-1.5 text-[15px] font-semibold" style={{ color: INK }}>
        {title}
      </h3>
      <p className="text-[13.5px] leading-relaxed" style={{ color: MUTED }}>
        {desc}
      </p>
    </motion.div>
  );
}

export default function WhyUs() {
  const sectionRef = useRef(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  function handleSectionMouseMove(e) {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setParallax({ x: px * 16, y: py * 12 });
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={() => setParallax({ x: 0, y: 0 })}
      className="relative overflow-hidden px-6 py-20 sm:px-8 lg:py-28"
      style={{
        fontFamily: "'Inter', sans-serif",
        background: `linear-gradient(135deg, ${BG_FROM} 0%, ${BG_TO} 100%)`,
      }}
    >
      {/* Floating gradient blobs — slow, continuous ambient motion behind everything */}
      <motion.div
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full"
        style={{ background: BLUE, opacity: 0.12, filter: 'blur(70px)' }}
        animate={{ x: [0, 30, 0], y: [0, 20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full"
        style={{ background: NAVY, opacity: 0.1, filter: 'blur(80px)' }}
        animate={{ x: [0, -25, 0], y: [0, -20, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      <motion.div
        animate={{ x: -parallax.x, y: -parallax.y }}
        transition={{ type: 'spring', stiffness: 60, damping: 20 }}
        className="relative z-10 mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-12"
        style={{ perspective: 1000 }}
      >
        <motion.div animate={{ x: parallax.x * 1.4, y: parallax.y * 1.4 }} transition={{ type: 'spring', stiffness: 60, damping: 20 }}>
          <OrbitVisual />
        </motion.div>

        <div>
  <motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
  className="mb-4 inline-flex items-center gap-2 text-[12.5px] font-bold uppercase tracking-[0.14em]"
  style={{ color: NAVY }}
>
  <span className="w-5 h-px" style={{ background: NAVY }} />
  WHY US
</motion.div>

<motion.h2
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8, delay: 0.15 }}
  className="mb-5 text-[28px] sm:text-[34px] lg:text-[42px] font-semibold leading-[1.15]"
  style={{
    fontFamily: "'Fraunces', Georgia, serif",
    color: INK,
  }}
>
  Why Growing Businesses
  <br />
  <span style={{ color: BLUE }}>
    Choose Us Founders Legal Desk
  </span>
</motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8 max-w-[540px] text-[15.5px] leading-relaxed"
            style={{ color: MUTED }}
          >
            What sets Founders Legal Desk apart from downloaded templates and expensive law firms.
          </motion.p>

        <motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={{
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  }}
  className="grid grid-cols-1 gap-4 sm:grid-cols-2"
>
            {FEATURES.map((f, i) => (
              <FeatureCard key={i} {...f} index={i} />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}