"use client";

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Scale,
  FileSignature,
  Handshake,
  Lock,
  Users,
  Laptop,
  Briefcase,
  Mail,
  ShieldAlert,
  ShieldCheck,
  ClipboardCheck,
  BellRing,
  FileWarning,
  Landmark,
  Files,
  PieChart,
  FileSearch,
  BadgeCheck,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const INK = '#161d35';
const GOLD = '#C7954A';
const BG = '#f8f6f3';

// Deterministic, guaranteed-to-load placeholder photo per card (swap with real photography later).
const img = (seed) => `https://picsum.photos/seed/${seed}/700/500`;

const STAGES = {
  foundation: {
    label: "BUILDING YOUR FOUNDATION",
    sub: "Set up your business on the right legal footing.",

    items: [
      {
        Icon: FileSignature,
        title: "Business Registration & Structuring",
        desc: "Company, LLP, MSME/Udyam, Startup India and other registration requirements.",
        image: img("fld-registration"),
      },

      {
        Icon: Users,
        title: "Founder & Shareholder Agreements",
        desc: "Protect founder relationships, roles, ownership and decision-making.",
        image: img("fld-founder"),
      },

      {
        Icon: Handshake,
        title: "Contracts & Commercial Agreements",
        desc: "NDAs, vendor agreements, client agreements, service agreements and more.",
        image: img("fld-contracts"),
      },

      {
        Icon: Briefcase,
        title: "Employment & Consultant Agreements",
        desc: "Put the right legal framework in place for your team and consultants.",
        image: img("fld-employment"),
      },

      {
        Icon: ShieldCheck,
        title: "Intellectual Property Protection",
        desc: "Trademark, copyright and other brand protection requirements.",
        image: img("fld-ip"),
      },
    ],
  },

  growing: {
    label: "MANAGING YOUR GROWTH",
    sub: "Stay legally prepared as your business expands.",

    items: [
      {
        Icon: ShieldCheck,
        title: "Corporate & Regulatory Compliance",
        desc: "Ongoing corporate, statutory and regulatory requirements.",
        image: img("fld-compliance"),
      },

      {
        Icon: FileSignature,
        title: "Contract Management",
        desc: "Drafting, reviewing and negotiating agreements as your business deals grow.",
        image: img("fld-contract-management"),
      },

      {
        Icon: Users,
        title: "Employment & HR Legal Support",
        desc: "Employment documentation, policies and workplace-related legal requirements.",
        image: img("fld-hr"),
      },

      {
        Icon: Lock,
        title: "Data Privacy & Technology",
        desc: "Privacy policies, data protection and technology-related legal requirements.",
        image: img("fld-privacy"),
      },

      {
        Icon: BadgeCheck,
        title: "Licences & Certifications",
        desc: "Support with business-specific licences, registrations and certifications.",
        image: img("fld-licences"),
      },
    ],
  },

  scaling: {
    label: "PROTECTING YOUR SCALE",
    sub: "Protect the business you've built.",

    items: [
      {
        Icon: ShieldCheck,
        title: "Intellectual Property & Brand Protection",
        desc: "Trademark matters, IP protection and brand-related legal requirements.",
        image: img("fld-ip-brand"),
      },

      {
        Icon: Landmark,
        title: "Corporate & Shareholder Matters",
        desc: "Shareholding, governance, restructuring and other corporate requirements.",
        image: img("fld-shareholder"),
      },

      {
        Icon: FileSignature,
        title: "Fundraising & Investment Documentation",
        desc: "Legal documentation and support for investment and fundraising requirements.",
        image: img("fld-fundraising"),
      },

      {
        Icon: FileSearch,
        title: "Due Diligence & Legal Readiness",
        desc: "Organise and address legal documentation and compliance requirements before major business transactions.",
        image: img("fld-due-diligence"),
      },

      {
        Icon: Scale,
        title: "Business Disputes & Legal Issues",
        desc: "Support when issues arise with employees, vendors, customers, partners or other business relationships.",
        image: img("fld-disputes"),
      },
    ],
  },
};

const STAGE_KEYS = ['foundation', 'growing', 'scaling'];

/* --------------------------------------------------------------------
   Card — layout copied from <Services /> (box-in-box, icon top,
   image + arrow overlap, 3D flip hover layer). Data props unchanged:
   { Icon, title, desc, image }.
-------------------------------------------------------------------- */
function ServiceCard({ item, index }) {
  const { Icon, title, desc, image } = item;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, x: index % 2 === 0 ? -40 : 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.96 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative min-h-[520px] sm:min-h-[500px] overflow-hidden border border-[#e6e6e6] bg-white transition-all duration-500 lg:hover:-translate-y-3 hover:border-[#c89b53] hover:shadow-[0_25px_60px_-15px_rgba(199,149,74,0.25)]"
    >
      {/* Normal Card */}
      <div className="absolute inset-0 p-4 sm:p-5">
        <div className="flex h-full flex-col border border-[#e6e6e6]">
          {/* Icon */}
          <div className="relative flex justify-center">
            <div className="absolute top-0 h-14 w-[2px] bg-[#ececec]" />

            <div className="relative z-10 flex h-14 w-14 items-center justify-center bg-[#161d35]">
              <Icon size={28} className="text-white" />
            </div>
          </div>

          {/* Content */}
          <div className="px-5 sm:px-8 pt-6 sm:pt-8 text-center">
            <h3 className="min-h-[64px] sm:min-h-[72px] text-xl sm:text-2xl font-semibold leading-snug text-[#161d35]">
              {title}
            </h3>

            <p className="mt-4 text-sm sm:text-[15px] leading-6 sm:leading-7 text-[#777]">
              {desc}
            </p>
          </div>

          {/* Image Section */}
          <div className="relative mt-auto">
            {/* Arrow Overlap */}
            <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2">
              <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#161d35] text-white shadow-lg">
                <ArrowUpRight size={18} />
              </div>
            </div>

            {/* Image */}
            <div className="relative h-[205px] sm:h-[150px] overflow-hidden">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Hover Layer */}
      <div
        className="
          hidden lg:block
          absolute
          inset-5
          z-20
          overflow-hidden
          origin-center
          transition-all
          duration-700
          ease-in-out
          [transform:translateY(0)_translateZ(150px)_scaleY(0)_rotateX(90deg)]
          group-hover:[transform:translateY(0)_translateZ(0)_scaleY(1)_rotateX(0)]
        "
      >
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-[#161d35]/90" />

        <div className="relative flex h-full flex-col items-center justify-center px-5 sm:px-8 text-center text-white">
          <div className="mb-8 flex h-16 w-16 items-center justify-center bg-[#c89b53]">
            <Icon size={30} />
          </div>

          <h3 className="text-xl sm:text-2xl font-semibold leading-snug">
            {title}
          </h3>

          <p className="mt-4 sm:mt-5 text-sm sm:text-[15px] leading-6 sm:leading-8 text-white/80">
            {desc}
          </p>

          <div className="mt-8 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#161d35]">
            <ArrowUpRight size={18} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StageTabs({ active, setActive }) {
  const scrollerRef = useRef(null);

  function scrollBy(dir) {
    scrollerRef.current?.scrollBy({ left: dir * 220, behavior: 'smooth' });
  }

  return (
    <div className="mb-4 flex items-center justify-center gap-2">
      {/* Left arrow — mobile only */}
      <button
        onClick={() => scrollBy(-1)}
        aria-label="Scroll tabs left"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border sm:hidden"
        style={{ borderColor: 'rgba(22,29,53,0.15)', color: INK }}
      >
        <ChevronLeft size={16} />
      </button>

      <style>{`
        .fld-stage-scroller::-webkit-scrollbar { display: none; }
        .fld-stage-scroller { scrollbar-width: none; -ms-overflow-style: none; }
      `}</style>
      <div
        ref={scrollerRef}
        className="fld-stage-scroller flex max-w-full gap-2.5 overflow-x-auto scroll-smooth sm:flex-wrap sm:justify-center sm:overflow-visible"
      >
        {STAGE_KEYS.map((key, i) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className="relative shrink-0 whitespace-nowrap rounded-full px-5 py-2.5 text-[13.5px] font-bold transition-colors duration-300"
            style={{
              color: active === key ? '#FFFFFF' : INK,
              border: `1.5px solid ${active === key ? INK : 'rgba(22,29,53,0.15)'}`,
            }}
          >
            {active === key && (
              <motion.span
                layoutId="serviceStageTab"
                className="absolute inset-0 rounded-full"
                style={{ background: INK }}
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative z-10">
              Stage {i + 1} — {STAGES[key].label}
            </span>
          </button>
        ))}
      </div>

      {/* Right arrow — mobile only */}
      <button
        onClick={() => scrollBy(1)}
        aria-label="Scroll tabs right"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border sm:hidden"
        style={{ borderColor: 'rgba(22,29,53,0.15)', color: INK }}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

export default function ServicesCoverageSection() {
  const [active, setActive] = useState('foundation');
  const stage = STAGES[active];

  return (
    <section id="coverage" className="relative overflow-hidden py-14 md:py-20 lg:py-28" style={{ background: BG }}>
      {/* Decorative rotating circles — top-right pair */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
        className="pointer-events-none absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full border"
        style={{ borderColor: `${GOLD}22` }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
        className="pointer-events-none absolute -right-16 -top-16 h-[250px] w-[250px] rounded-full border"
        style={{ borderColor: `${GOLD}30` }}
      />
      {/* Decorative solid circle accent — bottom-left */}
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full"
        style={{ background: GOLD, opacity: 0.06, filter: 'blur(70px)' }}
      />
      {/* Small floating dot circles */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute rounded-full"
          style={{
            width: 5 + (i % 2) * 3,
            height: 5 + (i % 2) * 3,
            background: `${GOLD}55`,
            top: `${18 + i * 16}%`,
            left: `${4 + i * 3}%`,
          }}
          animate={{ y: [0, -14, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3.2 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
        />
      ))}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
       <div className="mb-10 text-center">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="inline-flex items-center gap-2 text-[12.5px] font-bold uppercase tracking-[0.14em]"
    style={{ color: GOLD }}
  >
    <span className="h-px w-5" style={{ background: GOLD }} />
    Coverage
  </motion.div>

  <motion.h2
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: 0.1 }}
    className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl"
    style={{
      fontFamily: "'Fraunces', Georgia, serif",
      color: INK,
    }}
  >
    Legal Support for Every Stage
    <br />
    <span style={{ color: GOLD }}>of Your Business.</span>
  </motion.h2>

  <motion.p
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: 0.2 }}
    className="mx-auto mt-5 max-w-2xl text-base leading-7 text-black/60 sm:text-lg"
    style={{ fontFamily: "'Manrope', sans-serif" }}
  >
   From getting started to growing and protecting your business, we help you navigate the legal requirements that come with running a company.
  </motion.p>
</div>

        {/* Stage tabs — scrollable + arrows on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <StageTabs active={active} setActive={setActive} />
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.p
            key={active + '-sub'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mx-auto mb-12 max-w-[560px] text-center text-[15px] leading-relaxed text-[#777]"
          >
            {stage.sub}
          </motion.p>
        </AnimatePresence>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div key={active} className="mx-auto grid max-w-6xl gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3">
            {stage.items.map((item, index) => (
              <ServiceCard key={item.title} item={item} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-14 flex flex-col items-center gap-4 text-center"
        >
          <p className="text-[14.5px] text-[#777]">Not sure which service you need? Book a free consultation.</p>
          <motion.a
            href="/free-consultation"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="group flex items-center gap-3 px-7 py-4 font-medium tracking-wide text-white transition-all duration-300"
            style={{ background: INK }}
            onMouseEnter={(e) => (e.currentTarget.style.background = GOLD)}
            onMouseLeave={(e) => (e.currentTarget.style.background = INK)}
          >
            <span>Book Free Consultation</span>
            <motion.div animate={{ x: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
              <ArrowUpRight size={18} />
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}