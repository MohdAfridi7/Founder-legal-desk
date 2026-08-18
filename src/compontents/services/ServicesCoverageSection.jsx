"use client";

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
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
    label: 'Building your foundation',
    sub: 'The documents every incorporated business needs before anything goes wrong.',
    items: [
      { Icon: FileSignature, title: 'Vendor & Supplier Agreements', desc: 'Protect every vendor relationship with a clear, enforceable agreement covering scope, payment, deliverables, and dispute resolution.', image: img('fld-vendor') },
      { Icon: Handshake, title: 'Client Service Agreements', desc: 'Define what you deliver, what you charge, and what happens if something goes wrong — before it does.', image: img('fld-client') },
      { Icon: Lock, title: 'Non-Disclosure Agreements (NDA)', desc: 'For investor conversations, vendor discussions, freelancer onboarding, and pilot partnerships.', image: img('fld-nda') },
      { Icon: Users, title: 'Founder & Co-Founder Agreement', desc: 'Equity split, roles, vesting schedule, IP ownership, exit provisions — the most-skipped document in startup history.', image: img('fld-cofounder') },
      { Icon: Laptop, title: 'Freelancer & Consultant Agreements', desc: 'Scope, deliverables, payment terms, IP assignment, and exit clause for every freelance engagement.', image: img('fld-freelancer') },
    ],
  },
  growing: {
    label: 'Managing your growth',
    sub: 'As your team and vendor relationships grow, so does your exposure.',
    items: [
      { Icon: Briefcase, title: 'Employment Contracts', desc: 'Role, compensation, IP assignment, non-solicitation, and notice period — all in one reviewed agreement.', image: img('fld-employment') },
      { Icon: Mail, title: 'Offer Letters', desc: 'Professional, sound offer letters that protect the company and set clear expectations from day one.', image: img('fld-offer') },
      { Icon: ShieldAlert, title: 'POSH Policy & Committee', desc: 'Mandatory at 10+ employees under the POSH Act, 2013. Non-compliance shows up in investor due diligence.', image: img('fld-posh') },
      { Icon: ShieldCheck, title: 'Privacy Policy & Terms of Service', desc: "If your business collects user data, these are no longer optional under the DPDP Act 2023.", image: img('fld-privacy') },
      { Icon: ClipboardCheck, title: 'DPDP Act Compliance Review', desc: "A structured review of your data handling practices against India's DPDP Act, 2023.", image: img('fld-dpdp') },
      { Icon: BellRing, title: 'Compliance Tracking & Reminders', desc: 'Automated alerts for ROC filings, board meetings, DIR-3 KYC, AGM deadlines, and TDS dates.', image: img('fld-compliance') },
      { Icon: FileWarning, title: 'Formal Notice Drafting', desc: 'For non-payment, breach of contract, or IP infringement — from a specialist, not an email.', image: img('fld-notice') },
    ],
  },
  scaling: {
    label: 'Protecting your scale',
    sub: 'Fundraising, high-volume hiring, and new markets all create complexity.',
    items: [
      { Icon: Landmark, title: 'Shareholder Agreement (SHA)', desc: 'Rights, obligations, drag-along, tag-along, anti-dilution — reviewed for the round you\u2019re raising.', image: img('fld-sha') },
      { Icon: Files, title: 'Share Subscription Agreement (SSA)', desc: 'The investment instrument, reviewed and prepared for your round.', image: img('fld-ssa') },
      { Icon: PieChart, title: 'ESOP Scheme Documentation', desc: 'Option pool creation, vesting schedule, exercise price, forfeiture — documented correctly.', image: img('fld-esop') },
      { Icon: FileSearch, title: 'Term Sheet Review', desc: 'A specialist reads your term sheet and identifies what to push back on — before you sign.', image: img('fld-termsheet') },
      { Icon: BadgeCheck, title: 'Trademark Filing Support', desc: 'Application, follow-up, and objection response — brand protection made simple.', image: img('fld-trademark') },
      { Icon: Handshake, title: 'MoU & Partnership Agreements', desc: 'For joint ventures, channel partnerships, and strategic alliances.', image: img('fld-mou') },
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
            style={{ fontFamily: "'Fraunces', Georgia, serif", color: INK }}
          >
            What we handle
            <br />
            <span style={{ color: GOLD }}>for you</span>
          </motion.h2>
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