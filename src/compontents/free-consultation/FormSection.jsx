"use client";

import { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { UserCheck, ShieldCheck, Clock3, CheckCircle2, Send } from 'lucide-react';

const INK = '#12151F';
const MUTED = '#6B7184';
const AMBER = '#C7954A';
const AMBER_SOFT = '#F3E4CE';
const CREAM = '#F7F6F2';
const NAVY = '#12182B';
const BORDER = 'rgba(18,21,31,0.1)';

const TRUST_POINTS = [
  {
    Icon: UserCheck,
    title: 'A real specialist, not a sales rep',
    text: 'A qualified specialist joins the consultation — not a sales rep. You get a real professional opinion.',
  },
  {
    Icon: ShieldCheck,
    title: "We'll tell you if you don't need us",
    text: "If your current setup is fine, we'll say so. We don't manufacture a problem to sell a plan.",
  },
  {
    Icon: Clock3,
    title: 'No follow-up pressure',
    text: "If you don't respond after the call, we don't chase. Your decision, your timeline.",
  },
];

const CALLBACK_TIMES = [
  { v: 'morning', label: 'Morning', sub: '9am–12pm' },
  { v: 'afternoon', label: 'Afternoon', sub: '12pm–4pm' },
  { v: 'evening', label: 'Evening', sub: '4pm–7pm' },
];

function TrustPointRow({ Icon, title, text, index, isLast }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -28 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.12, ease: 'easeOut' }}
      whileHover={{ x: 6 }}
      className="group relative flex gap-4 pb-9"
    >
      {!isLast && (
        <div className="absolute left-[23px] top-[52px] h-[calc(100%-52px)] w-px" style={{ background: BORDER }}>
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.12 + 0.2 }}
            className="h-full w-full origin-top"
            style={{ background: AMBER }}
          />
        </div>
      )}

      <motion.div
        initial={{ scale: 0, rotate: -30 }}
        animate={inView ? { scale: 1, rotate: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.12 + 0.1, ease: 'backOut' }}
        className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 group-hover:bg-[#C7954A]"
        style={{ background: AMBER_SOFT }}
      >
        <Icon size={19} strokeWidth={2} style={{ color: AMBER }} className="transition-colors duration-300 group-hover:text-white" />
      </motion.div>

      <div className="pt-1.5">
        <h4 className="mb-1.5 text-[15px] font-semibold leading-snug" style={{ color: INK }}>
          {title}
        </h4>
        <p className="max-w-[320px] text-[13.5px] leading-relaxed" style={{ color: MUTED }}>
          {text}
        </p>
      </div>
    </motion.div>
  );
}

// Same boxed floating-label field used on the Contact page, for a consistent theme.
function FloatField({ label, type = 'text', name, required, textarea, rows = 3, options, className = '' }) {
  const base =
    'peer w-full rounded-lg border bg-white px-4 pb-2.5 pt-5 text-[14.5px] outline-none transition-all duration-300 focus:shadow-[0_0_0_4px_rgba(199,149,74,0.15)]';
  const labelBase =
    'pointer-events-none absolute left-4 top-4 text-[14.5px] transition-all duration-300 peer-focus:top-2 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:text-[#C7954A] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:font-semibold';

  return (
    <div className={`relative ${className}`}>
      {textarea ? (
        <textarea
          name={name}
          required={required}
          rows={rows}
          placeholder=" "
          className={base + ' resize-none'}
          style={{ borderColor: BORDER, color: INK }}
          onFocus={(e) => (e.currentTarget.style.borderColor = AMBER)}
          onBlur={(e) => (e.currentTarget.style.borderColor = BORDER)}
        />
      ) : options ? (
        <select
          name={name}
          required={required}
          defaultValue=""
          className={base}
          style={{ borderColor: BORDER, color: INK }}
          onFocus={(e) => (e.currentTarget.style.borderColor = AMBER)}
          onBlur={(e) => (e.currentTarget.style.borderColor = BORDER)}
        >
          <option value="" disabled hidden> </option>
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
          placeholder=" "
          className={base}
          style={{ borderColor: BORDER, color: INK }}
          onFocus={(e) => (e.currentTarget.style.borderColor = AMBER)}
          onBlur={(e) => (e.currentTarget.style.borderColor = BORDER)}
        />
      )}
      <label className={labelBase} style={{ color: MUTED }}>
        {label}
        {required ? ' *' : ''}
      </label>
    </div>
  );
}

export default function ConsultationFormSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [callback, setCallback] = useState('');
  const sectionRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 900);
  }

  return (
    <section
      id="consultation"
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-20 sm:px-8 lg:py-28"
      style={{ background: CREAM, fontFamily: "'Manrope', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Manrope:wght@400;500;600;700;800&display=swap');
      `}</style>

      {/* Decorative rotating circles — left-middle this time, a placement not used yet */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        className="pointer-events-none absolute -left-52 top-1/2 h-[440px] w-[440px] -translate-y-1/2 rounded-full border"
        style={{ borderColor: `${AMBER}18` }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
        className="pointer-events-none absolute -left-24 top-1/2 h-[260px] w-[260px] -translate-y-1/2 rounded-full border"
        style={{ borderColor: `${AMBER}26` }}
      />
      {/* Floating particles, scattered right side */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute rounded-full"
          style={{
            width: 4 + (i % 3) * 3,
            height: 4 + (i % 3) * 3,
            background: `${AMBER}55`,
            top: `${16 + i * 18}%`,
            right: `${3 + i * 2}%`,
          }}
          animate={{ y: [0, -14, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3.2 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
        />
      ))}

      <div className="relative mx-auto grid max-w-[1180px] grid-cols-1 gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* ---------- Left — trust points ---------- */}
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
            Free Consultation
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mb-8 max-w-[380px]"
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontWeight: 400,
              fontSize: 'clamp(24px, 3vw, 32px)',
              lineHeight: 1.2,
              color: INK,
            }}
          >
            A genuine consultation — not a sales call wearing a consultation label.
          </motion.h2>

          <div>
            {TRUST_POINTS.map((p, i) => (
              <TrustPointRow key={p.title} {...p} index={i} isLast={i === TRUST_POINTS.length - 1} />
            ))}
          </div>
        </div>

        {/* ---------- Right — form card ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative overflow-hidden rounded-2xl p-6 sm:p-9"
          style={{ background: '#FFFFFF', border: `1px solid ${BORDER}`, boxShadow: '0 30px 70px -30px rgba(18,21,31,0.18)' }}
        >
          <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-bl-full" style={{ background: `${AMBER}10` }} />

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <h3 className="mb-6 text-[22px] font-semibold" style={{ fontFamily: "'DM Serif Display', serif", color: INK }}>
                  Book your free consultation
                </h3>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <FloatField label="Full Name" name="name" required />
                  <FloatField label="Business Name" name="business" required />
                  <FloatField label="Business Type" name="type" required options={['Pvt Ltd', 'LLP', 'OPC', 'Partnership', 'Other']} />
                  <FloatField
                    label="Industry"
                    name="industry"
                    required
                    options={[
                      'SaaS/Tech', 'D2C/E-commerce', 'Agency', 'Edtech', 'Healthtech', 'HR Tech',
                      'Fintech', 'Logistics', 'Manufacturing', 'Real Estate', 'Media/Content',
                      'Food & Beverage', 'Travel', 'Construction', 'Consulting', 'Other',
                    ]}
                  />
                  <FloatField label="Number of Employees" name="employees" required options={['1–10', '11–25', '26–50', '51–100', '100+']} />
                  <FloatField label="Phone Number" name="phone" type="tel" required />
                  <FloatField label="Email Address" name="email" type="email" required className="sm:col-span-2" />
                  <FloatField
                    label="Most pressing document/compliance concern? (optional)"
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
                            border: `1.5px solid ${callback === t.v ? NAVY : BORDER}`,
                          }}
                        >
                          {callback === t.v && (
                            <motion.span
                              layoutId="consultCallbackPill"
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
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative mt-8 flex h-[54px] w-full items-center justify-center gap-2 overflow-hidden rounded-full text-[14.5px] font-semibold text-white transition-opacity duration-300"
                  style={{ background: NAVY, opacity: loading ? 0.75 : 1 }}
                >
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  {loading ? (
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                    />
                  ) : (
                    <>
                      Book My Free Consultation
                      <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
                        <Send size={16} />
                      </motion.span>
                    </>
                  )}
                </motion.button>
                <p className="mt-4 text-center text-[12px] leading-relaxed" style={{ color: MUTED }}>
                  We call you back within 24 hours on business days. Your information is never
                  shared or sold.
                </p>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                className="flex flex-col items-center justify-center py-14 text-center"
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
                <h3 className="mb-2 text-[22px] font-semibold" style={{ fontFamily: "'DM Serif Display', serif", color: INK }}>
                  You&apos;re booked.
                </h3>
                <p className="max-w-[340px] text-[14.5px] leading-relaxed" style={{ color: MUTED }}>
                  We&apos;ll get back to you within 24 hours, during your preferred time window.
                  Check your email for a confirmation.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}