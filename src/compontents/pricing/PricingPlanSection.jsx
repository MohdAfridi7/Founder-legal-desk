"use client";

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

import {
  Check,
  Sparkles,
  MessageCircle,
  Gift,
  UtensilsCrossed,
  ScanBarcode,
  Rocket,
  ShieldCheck,
} from 'lucide-react';

const INK = '#12151F';
const MUTED = '#6B7184';
const AMBER = '#F5A623';
const AMBER_SOFT = '#F3E4CE';
const CREAM = '#F7F6F2';
const NAVY = '#12182B';
const BORDER = 'rgba(18,21,31,0.09)';

const PLANS = [
  {
    tier: "Tier 1",
    name: "Basic",
    audience: "Early-stage businesses",
    monthly: 3000,
    yearly: 30000,
    popular: false,

    feats: [
      {
        label: "Ongoing Legal Consultation",
        value: "Ongoing legal consultation",
      },
      {
        label: "Business Legal Guidance",
        value: "Business legal guidance",
      },
      {
        label: "Legal Document",
        value: "1 legal document/month",
      },
      {
        label: "Document Review",
        value: "Basic document review",
      },
    ],
  },

  {
    tier: "Tier 2",
    name: "Standard",
    audience: "Growing startups & MSMEs",
    monthly: 10000,
    yearly: 100000,
    popular: true,

    feats: [
      {
        label: "Included",
        value: "Everything in Essential, plus",
      },
      {
        label: "Legal Documents",
        value: "Up to 3 legal documents/month",
      },
      {
        label: "Contract Review",
        value: "Contract & agreement review",
      },
      {
        label: "Compliance",
        value: "Compliance guidance",
      },
      {
        label: "Employment & HR",
        value: "Employment & HR support",
      },
      {
        label: "IP & Trademark",
        value: "IP & trademark support",
      },
      {
        label: "Communication",
        value: "Priority communication",
      },
    ],
  },

  {
    tier: "Tier 3",
    name: "Premium",
    audience: "Scaling businesses",
    monthly: 35000,
    yearly: 350000,
    popular: false,

    feats: [
      {
        label: "Included",
        value: "Everything in Growth, plus",
      },
      {
        label: "Legal Services",
        value: "Up to 7 legal services/month",
      },
      {
        label: "Commercial Support",
        value: "Advanced contract & commercial support",
      },
      {
        label: "Corporate Matters",
        value: "Corporate & shareholder matters",
      },
      {
        label: "Data & Technology",
        value: "Data & technology compliance",
      },
      {
        label: "Fundraising",
        value: "Fundraising documentation support",
      },
      {
        label: "Due Diligence",
        value: "Due diligence support",
      },
      {
        label: "ESOP & Structuring",
        value: "ESOP & corporate structuring support",
      },
      {
        label: "Pricing",
        value: "Preferential Pricing",
      },
    ],
  },
];

const ADD_ONS = [
  { Icon: UtensilsCrossed, sector: 'D2C & Quick-Commerce', name: 'Food safety state license facilitation', fee: '₹3,500' },
  { Icon: ScanBarcode, sector: 'D2C & Quick-Commerce', name: 'Legal metrology (packaged commodity) registration', fee: '₹2,500' },
  { Icon: Rocket, sector: 'D2C & Quick-Commerce', name: 'Official Startup India recognition assistance', fee: '₹5,999' },
  { Icon: ShieldCheck, sector: 'Software & Technology', name: 'Digital data protection readiness pack', fee: '₹25,000', oneTime: true },
];

function formatINR(n) {
  return '₹' + n.toLocaleString('en-IN');
}

function PlanCard({ plan, index, yearly, inView }) {
  const [hovered, setHovered] = useState(false);
  const price = yearly ? plan.yearly : plan.monthly;
  const isPopular = plan.popular;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.94 }}
      animate={inView ? { opacity: 1, y: 0, scale: isPopular ? 1.04 : 1 } : {}}
      transition={{ duration: 0.65, delay: 0.15 + index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -8, scale: isPopular ? 1.05 : 1.02 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative flex h-full flex-col overflow-visible rounded-2xl p-7 sm:p-8"
      style={{
        background: isPopular ? NAVY : '#FFFFFF',
        border: `1.5px solid ${isPopular ? AMBER : BORDER}`,
        boxShadow: isPopular
          ? '0 24px 60px -18px rgba(199,149,74,0.35)'
          : hovered
          ? '0 20px 45px -18px rgba(18,21,31,0.18)'
          : '0 0 0 rgba(0,0,0,0)',
      }}
    >
      {/* Shimmer sweep on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ x: '-100%', opacity: 0.6 }}
            animate={{ x: '200%', opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              background: `linear-gradient(105deg, transparent 30%, ${AMBER}22 50%, transparent 70%)`,
            }}
          />
        )}
      </AnimatePresence>

      {isPopular && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.8 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5, ease: 'backOut' }}
          className="absolute  -top-3.5 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full px-4 py-1.5 text-[11.5px] font-bold uppercase tracking-wide"
          style={{ background: AMBER, color: NAVY }}
        >
          <Sparkles size={12} strokeWidth={2.5} />
          Most Popular
        </motion.div>
      )}

      <div
        className="mb-1 text-[12px] font-bold uppercase tracking-[0.1em]"
        style={{ color: isPopular ? AMBER : MUTED }}
      >
        {plan.tier}
      </div>
      <h3
        className="mb-2 text-[22px] font-semibold"
        style={{ fontFamily: "'DM Serif Display', serif", color: isPopular ? '#FFFFFF' : INK }}
      >
        {plan.name}
      </h3>
      <p
        className="mb-6 min-h-[40px] text-[13.5px] leading-snug"
        style={{ color: isPopular ? 'rgba(255,255,255,0.65)' : MUTED }}
      >
        {plan.audience}
      </p>

      {/* Price — cross-fades between monthly / yearly */}
      <div className="mb-1 flex items-baseline gap-1.5">
        <AnimatePresence mode="wait">
          <motion.span
            key={yearly ? 'y' : 'm'}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="text-[34px] font-bold leading-none sm:text-[38px]"
            style={{ fontFamily: "'DM Serif Display', serif", color: isPopular ? '#FFFFFF' : INK }}
          >
            {formatINR(price)}
          </motion.span>
        </AnimatePresence>
        <span className="text-[13px] font-medium" style={{ color: isPopular ? 'rgba(255,255,255,0.55)' : MUTED }}>
          /{yearly ? 'year' : 'month'}
        </span>
      </div>
      <div className="mb-7 text-[12px]" style={{ color: isPopular ? 'rgba(255,255,255,0.5)' : MUTED }}>
        Professional fee billed separately, equal amount
      </div>

      <div className="mb-7 flex flex-col gap-4">
        {plan.feats.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.3 + index * 0.12 + i * 0.05 }}
            className="flex items-start gap-2.5"
            style={{ borderTop: i === 0 ? 'none' : `1px solid ${isPopular ? 'rgba(255,255,255,0.08)' : BORDER}`, paddingTop: i === 0 ? 0 : 12 }}
          >
            <Check size={15} strokeWidth={2.5} className="mt-0.5 shrink-0" style={{ color: AMBER }} />
            <div>
              <div
                className="text-[11px] font-bold uppercase tracking-wide"
                style={{ color: isPopular ? AMBER : AMBER }}
              >
                {f.label}
              </div>
              <div
                className="text-[13.5px] leading-snug"
                style={{ color: isPopular ? 'rgba(255,255,255,0.85)' : INK }}
              >
                {f.value}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.a
        href="/free-consultation"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="mt-auto flex h-[50px] items-center justify-center rounded-full text-[14.5px] font-semibold transition-colors duration-300"
        style={{
          background: isPopular ? AMBER : 'transparent',
          color: isPopular ? NAVY : INK,
          border: isPopular ? 'none' : `1.5px solid ${INK}22`,
        }}
      >
        Get Started
      </motion.a>
    </motion.div>
  );
}

function AddOnCard({ Icon, sector, name, fee, oneTime, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      className="flex flex-col gap-3 rounded-xl p-5 transition-colors duration-300 hover:bg-white"
      style={{ background: 'rgba(255,255,255,0.6)', border: `1px solid ${BORDER}` }}
    >
      <div className="flex items-center justify-between">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-lg"
          style={{ background: AMBER_SOFT }}
        >
          <Icon size={18} strokeWidth={2} style={{ color: AMBER }} />
        </div>
        <div className="text-right">
          <div className="text-[16px] font-bold" style={{ color: INK }}>
            {fee}
          </div>
          <div className="text-[10.5px] font-medium uppercase tracking-wide" style={{ color: MUTED }}>
            {oneTime ? 'one-time' : 'professional fee'}
          </div>
        </div>
      </div>
      <div>
        <div className="mb-0.5 text-[11px] font-bold uppercase tracking-wide" style={{ color: AMBER }}>
          {sector}
        </div>
        <p className="text-[13.5px] leading-snug" style={{ color: INK }}>
          {name}
        </p>
      </div>
      <p className="text-[11.5px]" style={{ color: MUTED }}>
        Government fees billed separately at actuals
      </p>
    </motion.div>
  );
}

export default function PricingPlansSection() {
  const [yearly, setYearly] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      id="plans"
      ref={ref}
      className="relative overflow-hidden px-6 py-20 sm:px-8 lg:py-28"
      style={{ background: CREAM, fontFamily: "'Manrope', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Manrope:wght@400;500;600;700;800&display=swap');
      `}</style>

      {/* Rotating ring outline — centered above the heading this time, for variety */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        className="pointer-events-none absolute -top-56 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full border"
        style={{ borderColor: `${AMBER}18` }}
      />

      {/* Floating particles along both edges */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`l-${i}`}
          className="pointer-events-none absolute rounded-full"
          style={{
            width: 4 + (i % 3) * 3,
            height: 4 + (i % 3) * 3,
            background: `${AMBER}55`,
            top: `${20 + i * 18}%`,
            left: `${3 + i * 2}%`,
          }}
          animate={{ y: [0, -14, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3.4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
        />
      ))}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`r-${i}`}
          className="pointer-events-none absolute rounded-full"
          style={{
            width: 4 + (i % 3) * 3,
            height: 4 + (i % 3) * 3,
            background: `${AMBER}55`,
            top: `${28 + i * 16}%`,
            right: `${3 + i * 2}%`,
          }}
          animate={{ y: [0, -14, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3.6 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 + 0.3 }}
        />
      ))}

      <div className="relative mx-auto max-w-[1180px]">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-4 flex items-center justify-center gap-2 text-[12.5px] font-bold uppercase tracking-[0.14em]"
          style={{ color: AMBER }}
        >
          <span className="h-px w-5" style={{ background: AMBER }} />
          Subscription Packages
          <span className="h-px w-5" style={{ background: AMBER }} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mb-5 text-center"
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontWeight: 400,
            fontSize: 'clamp(28px, 3.6vw, 42px)',
            lineHeight: 1.15,
            color: INK,
          }}
        >
         Flexible Legal Support For Every Stage
        </motion.h2>

        {/* Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-14 flex justify-center"
        >
          <div
            className="inline-flex items-center gap-1 rounded-full p-1.5"
            style={{ background: '#FFFFFF', border: `1px solid ${BORDER}` }}
          >
            <button
              onClick={() => setYearly(false)}
              className="relative rounded-full px-5 py-2.5 text-[13.5px] font-bold transition-colors duration-300"
              style={{ color: !yearly ? '#FFFFFF' : MUTED }}
            >
              {!yearly && (
                <motion.span
                  layoutId="pricingToggle"
                  className="absolute inset-0 rounded-full"
                  style={{ background: NAVY }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">Monthly</span>
            </button>
            <button
              onClick={() => setYearly(true)}
              className="relative rounded-full px-5 py-2.5 text-[13.5px] font-bold transition-colors duration-300"
              style={{ color: yearly ? '#FFFFFF' : MUTED }}
            >
              {yearly && (
                <motion.span
                  layoutId="pricingToggle"
                  className="absolute inset-0 rounded-full"
                  style={{ background: NAVY }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                Yearly
                <span style={{ color: yearly ? AMBER : AMBER }} className="text-[11.5px] font-bold">
                  save up to ₹72k
                </span>
              </span>
            </button>
          </div>
        </motion.div>

        {/* Plan cards */}
       <div className="grid grid-cols-1 items-stretch gap-6 pt-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {PLANS.map((plan, i) => (
            <PlanCard key={plan.name} plan={plan} index={i} yearly={yearly} inView={inView} />
          ))}
        </div>

      
      </div>
    </section>
  );
}