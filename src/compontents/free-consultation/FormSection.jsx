"use client";

import { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  ClipboardList,
  AlertTriangle,
  Compass,
  UserCheck,
  ShieldCheck,
  Clock3,
  CheckCircle2,
  ArrowUpRight,
} from 'lucide-react';

const INK = '#12151F';
const MUTED = '#6B7184';
const AMBER = '#C7954A';
const AMBER_SOFT = '#F3E4CE';
const CREAM = '#F7F6F2';
const NAVY = '#12182B';
const LINE = 'rgba(18,21,31,0.16)';

const INTRO_CARDS = [
  { num: '01', Icon: ClipboardList, title: 'Your current document situation', desc: 'What do you have? What are you missing? Where is your exposure?' },
  { num: '02', Icon: AlertTriangle, title: 'Your immediate risk areas', desc: 'Which gaps are urgent and which can wait — based on your stage and industry.' },
  { num: '03', Icon: Compass, title: 'A clear recommendation', desc: 'Which plan fits your volume, or whether a single-document quote makes more sense.' },
];

const TRUST_CARDS = [
  { Icon: UserCheck, text: 'A qualified specialist joins the consultation — not a sales rep. You get a real professional opinion.' },
  { Icon: ShieldCheck, text: "We tell you if you don't need us. If your current setup is fine, we'll say so." },
  { Icon: Clock3, text: "No follow-up pressure. If you don't respond after the call, we don't chase. Your decision, your timeline." },
];

const CALLBACK_TIMES = [
  { v: 'morning', label: 'Morning', sub: '9am–12pm' },
  { v: 'afternoon', label: 'Afternoon', sub: '12pm–4pm' },
  { v: 'evening', label: 'Evening', sub: '4pm–7pm' },
];

// Clean underline field — label sits above, input has just a bottom border
// that expands from the center on focus. Deliberately different from the
// boxed floating-label style used on the Contact page.
function UnderlineField({ label, name, type = 'text', required, textarea, rows = 3, options, className = '' }) {
  const [focused, setFocused] = useState(false);
  const shared = {
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
  };

  return (
    <div className={className}>
      <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.08em]" style={{ color: MUTED }}>
        {label} {required && <span style={{ color: AMBER }}>*</span>}
      </label>
      <div className="relative">
        {textarea ? (
          <textarea
            name={name}
            required={required}
            rows={rows}
            {...shared}
            className="w-full resize-none bg-transparent pb-2.5 text-[15px] outline-none"
            style={{ color: INK }}
          />
        ) : options ? (
          <select
            name={name}
            required={required}
            defaultValue=""
            {...shared}
            className="w-full appearance-none bg-transparent pb-2.5 text-[15px] outline-none"
            style={{ color: INK }}
          >
            <option value="" disabled hidden></option>
            {options.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            name={name}
            required={required}
            {...shared}
            className="w-full bg-transparent pb-2.5 text-[15px] outline-none"
            style={{ color: INK }}
          />
        )}
        <div className="absolute bottom-0 left-0 h-[1.5px] w-full" style={{ background: LINE }} />
        <motion.div
          className="absolute bottom-0 left-1/2 h-[1.5px] -translate-x-1/2"
          style={{ background: AMBER }}
          initial={{ width: 0 }}
          animate={{ width: focused ? '100%' : 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

function IntroCard({ num, Icon, title, desc, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: 'easeOut' }}
      whileHover={{ y: -6 }}
      className="rounded-2xl border bg-white p-6 transition-shadow duration-300 hover:shadow-[0_20px_45px_-20px_rgba(18,21,31,0.18)]"
      style={{ borderColor: 'rgba(18,21,31,0.08)' }}
    >
      <div className="mb-4 flex items-center justify-between">
        <span
          className="text-[13px] font-bold"
          style={{ fontFamily: "'DM Serif Display', serif", color: AMBER }}
        >
          {num}
        </span>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: AMBER_SOFT }}>
          <Icon size={16} strokeWidth={2} style={{ color: AMBER }} />
        </div>
      </div>
      <h3 className="mb-1.5 text-[16px] font-semibold leading-snug" style={{ color: INK }}>
        {title}
      </h3>
      <p className="text-[13.5px] leading-relaxed" style={{ color: MUTED }}>
        {desc}
      </p>
    </motion.div>
  );
}

export default function ConsultationFormSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [callback, setCallback] = useState('');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 900);
  }

  return (
    <section id="consultation" ref={ref} className="relative overflow-hidden px-6 py-20 sm:px-8 lg:py-24" style={{ background: '#FFFFFF', fontFamily: "'Manrope', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Manrope:wght@400;500;600;700;800&display=swap');
        select { background-image: none; }
      `}</style>

      {/* Single, quiet ambient glow — kept minimal for a clean feel */}
      <div
        className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full"
        style={{ background: AMBER, opacity: 0.05, filter: 'blur(110px)' }}
      />

      <div className="relative mx-auto max-w-[1100px]">
        {/* Intro cards */}
        <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {INTRO_CARDS.map((c, i) => (
            <IntroCard key={c.num} {...c} index={i} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16 text-center text-[14px] italic"
          style={{ color: MUTED }}
        >
          This is a genuine consultation, not a sales call with a consultation label on it. If
          you don&apos;t need a plan, we&apos;ll tell you.
        </motion.p>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative mx-auto max-w-[720px] overflow-hidden rounded-2xl p-6 sm:p-10"
          style={{ background: CREAM }}
        >
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3 }}
              >
                <h2
                  className="mb-8 text-[24px] font-semibold sm:text-[26px]"
                  style={{ fontFamily: "'DM Serif Display', serif", color: INK }}
                >
                  Book your free consultation
                </h2>

                <div className="grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2">
                  <UnderlineField label="Full Name" name="name" required />
                  <UnderlineField label="Business Name" name="business" required />
                  <UnderlineField
                    label="Business Type"
                    name="type"
                    required
                    options={['Pvt Ltd', 'LLP', 'OPC', 'Partnership', 'Other']}
                  />
                  <UnderlineField
                    label="Industry"
                    name="industry"
                    required
                    options={[
                      'SaaS/Tech', 'D2C/E-commerce', 'Agency', 'Edtech', 'Healthtech', 'HR Tech',
                      'Fintech', 'Logistics', 'Manufacturing', 'Real Estate', 'Media/Content',
                      'Food & Beverage', 'Travel', 'Construction', 'Consulting', 'Other',
                    ]}
                  />
                  <UnderlineField
                    label="Number of Employees"
                    name="employees"
                    required
                    options={['1–10', '11–25', '26–50', '51–100', '100+']}
                  />
                  <UnderlineField label="Phone Number" name="phone" type="tel" required />
                  <UnderlineField label="Email Address" name="email" type="email" required className="sm:col-span-2" />
                  <UnderlineField
                    label="What's your most pressing document or compliance concern right now? (optional)"
                    name="concern"
                    textarea
                    rows={3}
                    className="sm:col-span-2"
                  />

                  {/* Callback time pills */}
                  <div className="sm:col-span-2">
                    <label className="mb-3 block text-[11px] font-bold uppercase tracking-[0.08em]" style={{ color: MUTED }}>
                      Preferred callback time
                    </label>
                    <div className="flex flex-wrap gap-2.5">
                      {CALLBACK_TIMES.map((t) => (
                        <button
                          key={t.v}
                          type="button"
                          onClick={() => setCallback(t.v)}
                          className="relative overflow-hidden rounded-full px-5 py-2.5 text-[13.5px] font-semibold transition-colors duration-300"
                          style={{
                            color: callback === t.v ? '#FFFFFF' : INK,
                            border: `1.5px solid ${callback === t.v ? NAVY : LINE}`,
                          }}
                        >
                          {callback === t.v && (
                            <motion.span
                              layoutId="callbackPill"
                              className="absolute inset-0 -z-10"
                              style={{ background: NAVY }}
                              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                            />
                          )}
                          {t.label} <span style={{ opacity: 0.7 }}>({t.sub})</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-10 flex h-[54px] w-full items-center justify-center gap-2 rounded-full text-[15px] font-semibold text-white transition-opacity duration-300"
                  style={{ background: NAVY, opacity: loading ? 0.75 : 1 }}
                >
                  {loading ? (
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                    />
                  ) : (
                    'Book My Free Consultation'
                  )}
                </motion.button>
                <p className="mt-4 text-center text-[12.5px] leading-relaxed" style={{ color: MUTED }}>
                  We call you back within 24 hours on business days. Your information is never
                  shared or sold. No unsolicited follow-up after the call.
                </p>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                className="flex flex-col items-center py-8 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.15, ease: [0.34, 1.56, 0.64, 1] }}
                  className="mb-6 flex h-16 w-16 items-center justify-center rounded-full"
                  style={{ background: AMBER_SOFT }}
                >
                  <CheckCircle2 size={30} strokeWidth={2} style={{ color: AMBER }} />
                </motion.div>
                <h2 className="mb-3 text-[24px] font-semibold" style={{ fontFamily: "'DM Serif Display', serif", color: INK }}>
                  You&apos;re booked.
                </h2>
                <p className="mb-2 max-w-[420px] text-[14.5px] leading-relaxed" style={{ color: MUTED }}>
                  We&apos;ve received your request. Someone from our team will call you within 24
                  hours — during your preferred time window. Check your email for a confirmation.
                </p>
                <p className="mb-6 max-w-[420px] text-[13.5px] leading-relaxed" style={{ color: MUTED }}>
                  Tip: have a quick list of the contracts or agreements your business currently
                  uses — or knows it should have. We&apos;ll take it from there.
                </p>
                <a
                  href="#resources"
                  className="inline-flex items-center gap-1.5 text-[14px] font-semibold"
                  style={{ color: AMBER }}
                >
                  Read our guide to the 5 documents every Indian startup needs
                  <ArrowUpRight size={15} />
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Trust cards */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {TRUST_CARDS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
              className="flex flex-col items-start gap-3 rounded-2xl p-6"
              style={{ background: CREAM }}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: AMBER_SOFT }}>
                <t.Icon size={16} strokeWidth={2} style={{ color: AMBER }} />
              </div>
              <p className="text-[13.5px] leading-relaxed" style={{ color: INK }}>
                {t.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}