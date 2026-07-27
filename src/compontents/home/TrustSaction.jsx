"use client";
import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import Link from "next/link";
const BG = '#1A2035';
const CARD_BG = '#151A2D';
const GOLD = '#C7954A';



const STATS = [
  { value: 15, suffix: '+', label: 'Privacy & Technology Contracts Drafted' },
  { value: 7, suffix: '+', label: 'Early-Stage & Startup Clients Advised', large: true },
  { value: 5, suffix: '', label: 'Global Jurisdictions Served (India, UK, Canada, EU, US-California)' },
];

function AnimatedNumber({ target, suffix, inView }) {
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 45, damping: 20, mass: 1.2 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) {
      motionVal.set(target);
    }
  }, [inView, target, motionVal]);

  useEffect(() => {
    return spring.on('change', (v) => setDisplay(Math.round(v)));
  }, [spring]);

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
}

function HammerIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 23 23" fill="none">
      <motion.g
        animate={{ y: [0, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        fill={GOLD}
      >
        <path d="M21.6562 20.875H10.7188C10.5115 20.875 10.3128 20.9573 10.1663 21.1038C10.0198 21.2503 9.9375 21.449 9.9375 21.6562C9.9375 21.8635 10.0198 22.0622 10.1663 22.2087C10.3128 22.3552 10.5115 22.4375 10.7188 22.4375H21.6562C21.8635 22.4375 22.0622 22.3552 22.2087 22.2087C22.3552 22.0622 22.4375 21.8635 22.4375 21.6562C22.4375 21.449 22.3552 21.2503 22.2087 21.1038C22.0622 20.9573 21.8635 20.875 21.6562 20.875Z" />
        <path d="M13.8056 16.9688C13.1943 16.9695 12.6083 17.2126 12.1761 17.6448C11.7439 18.0771 11.5007 18.6631 11.5 19.2744V20.0938H20.875V19.2744C20.8743 18.6631 20.6311 18.0771 20.1989 17.6448C19.7667 17.2126 19.1807 16.9695 18.5694 16.9688H13.8056Z" />
      </motion.g>
      <motion.g
        style={{ transformOrigin: '15px 8px' }}
        animate={{ rotate: [0, -15, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        fill={GOLD}
      >
        <path d="M15.9585 13.6149C15.9006 13.6678 15.8349 13.7114 15.7637 13.7442L15.989 13.9696C16.4566 14.4355 17.0898 14.6971 17.7499 14.697C18.41 14.6969 19.0432 14.4352 19.5107 13.9693L21.7812 11.698C22.0124 11.4668 22.1959 11.1924 22.321 10.8903C22.4462 10.5882 22.5106 10.2645 22.5106 9.9375C22.5106 9.61053 22.4462 9.28677 22.321 8.9847C22.1959 8.68263 22.0124 8.40818 21.7812 8.17701L21.5888 7.98456L15.9585 13.6149Z" />
        <path d="M9.2226 7.20295L14.8529 1.57267C14.9108 1.51976 14.9765 1.47611 15.0478 1.44326L14.8224 1.21791C14.3548 0.752021 13.7216 0.490468 13.0615 0.49054C12.4014 0.490611 11.7682 0.752302 11.3007 1.21829L9.03015 3.48915C8.79891 3.72035 8.61548 3.99484 8.49034 4.29694C8.36519 4.59904 8.30078 4.92283 8.30078 5.24982C8.30078 5.57681 8.36519 5.9006 8.49034 6.2027C8.61548 6.5048 8.79891 6.77929 9.03015 7.01049L9.2226 7.20295Z" />
        <path d="M14.3015 12.2813L14.0726 12.5102C13.9993 12.5825 13.9411 12.6687 13.9012 12.7637C13.8613 12.8586 13.8406 12.9605 13.8403 13.0635C13.84 13.1665 13.8601 13.2686 13.8993 13.3638C13.9386 13.459 13.9963 13.5455 14.0691 13.6184C14.142 13.6912 14.2285 13.7489 14.3237 13.7882C14.4189 13.8274 14.521 13.8475 14.624 13.8471C14.727 13.8468 14.8289 13.8261 14.9238 13.7863C15.0188 13.7464 15.105 13.6881 15.1773 13.6149L21.4273 7.36485C21.5716 7.21791 21.6521 7.01992 21.6511 6.81397C21.6502 6.60802 21.568 6.41077 21.4223 6.26514C21.2767 6.11951 21.0795 6.03729 20.8735 6.03635C20.6676 6.03542 20.4696 6.11586 20.3226 6.26016L20.0937 6.48907L16.5113 2.90602L16.7398 2.67735C16.8841 2.53041 16.9646 2.33242 16.9636 2.12647C16.9627 1.92052 16.8805 1.72327 16.7348 1.57764C16.5892 1.43201 16.392 1.34979 16.186 1.34885C15.9801 1.34792 15.7821 1.42836 15.6351 1.57266L9.38514 7.82266C9.31152 7.89496 9.25296 7.98112 9.21283 8.07618C9.17269 8.17123 9.15179 8.27329 9.15132 8.37647C9.15086 8.47965 9.17083 8.5819 9.2101 8.67731C9.24937 8.77273 9.30715 8.85942 9.38011 8.93238C9.45307 9.00534 9.53976 9.06312 9.63518 9.10239C9.73059 9.14166 9.83284 9.16163 9.93602 9.16117C10.0392 9.1607 10.1413 9.1398 10.2363 9.09966C10.3314 9.05953 10.4175 9.00097 10.4898 8.92735L10.7187 8.69844L10.7859 8.76559L1.18201 18.3695C0.953685 18.5955 0.772269 18.8644 0.648189 19.1608C0.524109 19.4571 0.459812 19.7751 0.458992 20.0963C0.458172 20.4176 0.520846 20.7359 0.643411 21.0328C0.765976 21.3298 0.946017 21.5996 1.17319 21.8268C1.40036 22.054 1.67018 22.234 1.96715 22.3566C2.26412 22.4791 2.58239 22.5418 2.90365 22.541C3.22492 22.5402 3.54286 22.4759 3.8392 22.3518C4.13554 22.2277 4.40444 22.0463 4.63045 21.818L14.2344 12.2141L14.3015 12.2813Z" />
      </motion.g>
    </svg>
  );
}

/* ============================================================
   FLOATING VERIFIED BADGE
   Small circular emblem that sits on the seam between the first
   stat card and the gold circle behind it — matches the tiny
   floating badge in the reference design.
   ============================================================ */
function VerifiedBadge({ inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.75, ease: [0.34, 1.56, 0.64, 1] }}
      className="absolute z-20"
      style={{ right: -12, top: -12 }}
    >
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative flex items-center justify-center rounded-full"
        style={{
          width: 34,
          height: 34,
          background: BG,
          border: `2px solid ${GOLD}`,
          boxShadow: `0 4px 14px rgba(0,0,0,.45)`,
        }}
      >
        {/* slow rotating dashed ring */}
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
          className="absolute rounded-full"
          style={{ inset: -5, border: `1.5px dashed ${GOLD}55` }}
        />
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </motion.div>
    </motion.div>
  );
}

function StatCard({
  stat,
  index,
  inView,
  badge = false,
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 30 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ scale: 1.04, transition: { duration: 0.25 } }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative flex flex-col justify-end overflow-visible rounded-2xl p-6 sm:p-7"
      style={{ background: CARD_BG }}
    >
      {badge && <VerifiedBadge inView={inView} />}

      {/* content wrapper clips the shimmer without clipping the badge above */}
      <div className="relative overflow-hidden rounded-2xl -m-6 sm:-m-7 p-6 sm:p-7">
        {/* Shimmer sweep on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ x: '-100%', opacity: 0.6 }}
              animate={{ x: '200%', opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="pointer-events-none absolute inset-0 z-10"
              style={{
                background:
                  'linear-gradient(105deg, transparent 30%, rgba(199,149,74,0.18) 50%, transparent 70%)',
              }}
            />
          )}
        </AnimatePresence>

        {/* Gold corner accent */}
        <motion.div
          animate={hovered ? { width: 40, height: 40 } : { width: 20, height: 20 }}
          transition={{ duration: 0.35 }}
          className="absolute right-4 top-4 rounded-full"
          style={{ background: `${GOLD}22` }}
        />
        <motion.div
          animate={hovered ? { scale: 1.5 } : { scale: 1 }}
          transition={{ duration: 0.35 }}
          className="absolute right-5 top-5 h-2 w-2 rounded-full"
          style={{ background: GOLD }}
        />

        <div
          className="mb-1 font-extrabold leading-none tracking-tight text-white"
          style={{
            fontSize: stat.large ? 'clamp(48px, 5.5vw, 72px)' : 'clamp(40px, 4.5vw, 62px)',
            fontFamily: "'Playfair Display', serif",
          }}
        >
          <AnimatedNumber target={stat.value} suffix={stat.suffix} inView={inView} />
        </div>
        <p
          className="text-[13px] font-medium uppercase tracking-widest"
          style={{ color: '#7B8199' }}
        >
          {stat.label}
        </p>
      </div>
    </motion.div>
  );
}

/* ============================================================
   TRUST MARQUEE — small auto-scrolling strip of trust chips,
   sits right below the Read More button.
   ============================================================ */
const TRUST_ITEMS = [
  "Non-profits & Sec 8", "Import & Export", "Franchise & Distribution",
  "Client logos — updated as we grow", "SaaS & Technology", "D2C & E-commerce",
];

function TrustMarquee() {
  const loop = [...TRUST_ITEMS, ...TRUST_ITEMS];
  return (
    <>
      <style>{`
        @keyframes fld-marquee-x{ from{ transform:translateX(0); } to{ transform:translateX(-50%); } }
        .fld-marquee-row{ overflow:hidden; position:relative; }
        .fld-marquee-row::before, .fld-marquee-row::after{
          content:''; position:absolute; top:0; bottom:0; width:36px; z-index:2; pointer-events:none;
        }
        .fld-marquee-row::before{ left:0; background:linear-gradient(90deg, ${BG}, transparent); }
        .fld-marquee-row::after{ right:0; background:linear-gradient(270deg, ${BG}, transparent); }
        .fld-marquee-track{ display:flex; align-items:center; gap:22px; width:max-content; animation: fld-marquee-x 22s linear infinite; }
        .fld-marquee-row:hover .fld-marquee-track{ animation-play-state:paused; }
        @media (prefers-reduced-motion: reduce){ .fld-marquee-track{ animation:none !important; } }
      `}</style>
      <div className="fld-marquee-row border-t pt-4" style={{ borderColor: 'rgba(255,255,255,.08)' }}>
        <div className="fld-marquee-track">
          {loop.map((n, i) => (
            <span key={i} className="flex items-center gap-3 flex-shrink-0">
              <span className="h-1 w-1 rounded-full flex-shrink-0" style={{ background: GOLD }} />
              <span className="text-[13px] font-medium whitespace-nowrap" style={{ color: '#8892A4' }}>{n}</span>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

export default function TrustSaction() {
const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  const leftVariants = {
    hidden: { opacity: 0, x: -48 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  return (
    <section
      ref={ref}
      className="relative overflow-hidden px-5 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-24"
      style={{ background: BG, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* Background decorative circles */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        className="pointer-events-none absolute -bottom-40 -left-40 h-[480px] w-[480px] rounded-full border"
        style={{ borderColor: `${GOLD}14` }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        className="pointer-events-none absolute -bottom-20 -left-20 h-[280px] w-[280px] rounded-full border"
        style={{ borderColor: `${GOLD}20` }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 hidden h-32 w-64 -translate-x-1/2 rounded-t-full sm:block"
        style={{ background: `${GOLD}0D` }}
      />

      {/* Floating particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute rounded-full"
          style={{
            width: 4 + (i % 3) * 3,
            height: 4 + (i % 3) * 3,
            background: `${GOLD}${['33', '44', '22', '55', '33'][i]}`,
            top: `${15 + i * 14}%`,
            left: `${8 + i * 6}%`,
          }}
          animate={{ y: [0, -14, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 }}
        />
      ))}

      <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left column */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Label */}
          <motion.div variants={leftVariants} className="mb-5 flex items-center gap-2">
            <HammerIcon />
            <span
              className="text-[11px] font-bold uppercase tracking-[0.2em]"
              style={{ color: GOLD }}
            >
              Trust
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={leftVariants}
            className="mb-5 font-extrabold leading-[1.1] text-white"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(32px, 4.5vw, 56px)',
            }}
          >
            Businesses that trust 
            <br />
          
            <motion.span
              style={{ color: GOLD }}
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              Founders Legal Desk
            </motion.span>
          </motion.h2>

          {/* Paragraph */}
          <motion.p
            variants={leftVariants}
            className="mb-9 max-w-[440px] text-[15px] leading-relaxed"
            style={{ color: '#8892A4' }}
          >
           We have worked with founders and businesses across India — from early-stage startups to established companies in their growth phase.
          </motion.p>

          {/* Pulsing dot */}
          <motion.div
            variants={leftVariants}
            className="mb-9 flex items-center gap-3"
          >
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="h-3 w-3 rounded-full"
              style={{ background: GOLD }}
            />
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
              className="h-2 w-2 rounded-full"
              style={{ background: `${GOLD}66` }}
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: `${GOLD}44` }}
            />
          </motion.div>

          {/* CTA button */}
          <motion.div variants={leftVariants}>
            <Link href="/free-consultation">
            <motion.button
              whileHover={{ scale: 1.04, backgroundColor: '#B8843A' }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="group flex items-center gap-2 rounded-full px-6 py-3 text-[14px] font-semibold text-white"
              style={{ background: GOLD, border: `1.5px solid ${GOLD}` }}
            >
            Book a Free Consultation 
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="text-base"
              >
                ↗
              </motion.span>
            </motion.button>
            </Link>
          </motion.div>

        
        </motion.div>

        {/* Right column — stats grid */}
        <div className="relative">
          {/* Gold quarter-circle background decoration */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
            className="pointer-events-none absolute -right-8 top-1/2 -translate-y-1/2"
            style={{
              width: 'clamp(140px, 22vw, 220px)',
              height: 'clamp(140px, 22vw, 220px)',
              background: GOLD,
              borderRadius: '50%',
              clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
            }}
          />

          {/* Grid: 2 left stacked + 1 large right */}
          <div className="relative grid grid-cols-2 gap-3 sm:gap-4">
            {/* Left column — two small cards */}
            <div className="flex flex-col gap-3 sm:gap-4">
              <StatCard stat={STATS[0]} index={0} inView={inView} badge />
              <StatCard stat={STATS[2]} index={2} inView={inView} />
            </div>

            {/* Right column — one tall card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ scale: 1.03, transition: { duration: 0.25 } }}
              className="relative flex flex-col justify-end overflow-hidden rounded-2xl p-6 sm:p-7"
              style={{ background: CARD_BG }}
            >
              {/* Shimmer */}
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '200%' }}
                transition={{ duration: 2.5, delay: 1.2, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }}
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'linear-gradient(105deg, transparent 30%, rgba(199,149,74,0.12) 50%, transparent 70%)',
                }}
              />

              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute right-5 top-5 h-8 w-8 rounded-full border"
                style={{ borderColor: `${GOLD}33` }}
              />
              <div
                className="absolute right-6 top-6 h-2 w-2 rounded-full"
                style={{ background: GOLD }}
              />

              <div
                className="mb-1 font-extrabold leading-none tracking-tight text-white"
                style={{
                  fontSize: 'clamp(48px, 5.5vw, 72px)',
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                <AnimatedNumber target={STATS[1].value} suffix={STATS[1].suffix} inView={inView} />
              </div>
              <p
                className="text-[13px] font-medium uppercase tracking-widest"
                style={{ color: '#7B8199' }}
              >
                {STATS[1].label}
              </p>
            </motion.div>
          </div>
        </div>
        
      </div>
        {/* Trust marquee strip */}
          <motion.div variants={leftVariants} className="mt-10 ">
            <TrustMarquee />
          </motion.div>
    </section>
  );
}