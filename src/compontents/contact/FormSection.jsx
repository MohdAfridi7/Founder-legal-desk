"use client";

import { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Mail, MessageCircle, Clock, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

const API_URL = '/api/contact';

const INK = '#12151F';
const MUTED = '#6B7184';
const AMBER = '#C7954A';
const AMBER_SOFT = '#F3E4CE';
const CREAM = '#F7F6F2';
const NAVY = '#12182B';
const BORDER = 'rgba(18,21,31,0.1)';

const CONTACT_INFO = [
  { Icon: Mail, label: 'Email', value: 'legal@founderslegaldesk.com' },
  { Icon: MessageCircle, label: 'WhatsApp', value: '+91 97117 52388' },
  { Icon: Clock, label: 'Response time', value: 'We respond to all enquiries within 1 business day.' },
  { Icon: MapPin, label: 'Address', value: 'A-522, Tower T3, NX One,Tech zone 4, Plot No - 17, Amrapali Dream Valley, Greater Noida, Uttar Pradesh 201318, India' },
];

function ContactInfoRow({ Icon, label, value, index, isLast }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -28 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.12, ease: 'easeOut' }}
      whileHover={{ x: 6 }}
      className="group relative flex gap-4 pb-8"
    >
      {/* Timeline connector */}
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
        style={{ background: NAVY }}
      >
        <Icon size={19} strokeWidth={2} style={{ color: AMBER }} className="transition-colors duration-300 group-hover:text-white" />
      </motion.div>

      <div className="pt-1.5">
        <div className="mb-1 text-[11px] font-bold uppercase tracking-wide" style={{ color: MUTED }}>
          {label}
        </div>
        <p className="text-[15px] font-medium leading-snug" style={{ color: INK }}>
          {value}
        </p>
      </div>
    </motion.div>
  );
}

// Floating-label input using the peer/placeholder-shown trick — no extra JS state needed per field.
function FloatField({ label, type = 'text', name, required, textarea, rows = 4, options }) {
  const base =
    'peer w-full rounded-lg border bg-white px-4 pb-2.5 pt-5 text-[14.5px] outline-none transition-all duration-300 focus:shadow-[0_0_0_4px_rgba(199,149,74,0.15)]';
  const labelBase =
    'pointer-events-none absolute left-4 top-4 text-[14.5px] transition-all duration-300 peer-focus:top-2 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:text-[#C7954A] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:font-semibold';

  return (
    <div className="relative">
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

export default function ContactFormSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.1 });

  async function handleSubmit(e) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get('name')?.toString().trim() || '',
      email: formData.get('email')?.toString().trim() || '',
      phone: formData.get('phone')?.toString().trim() || '',
      companyName: formData.get('company')?.toString().trim() || '',
      helpType: formData.get('reason')?.toString().trim() || '',
      message: formData.get('message')?.toString().trim() || '',
    };

    if (!payload.name || !payload.email || !payload.phone || !payload.companyName || !payload.helpType || !payload.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.msg || 'Failed to send message');
      }

      toast.success(data.msg || 'Message sent successfully');
      form.reset();
      setSubmitted(true);
    } catch (err) {
      toast.error(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="contact-form"
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-20 sm:px-8 lg:py-28"
      style={{ background: CREAM, fontFamily: "'Manrope', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Manrope:wght@400;500;600;700;800&display=swap');
      `}</style>

      {/* Decorative rotating rings — bottom-center this time */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 85, repeat: Infinity, ease: 'linear' }}
        className="pointer-events-none absolute -bottom-52 left-1/2 h-[460px] w-[460px] -translate-x-1/2 rounded-full border"
        style={{ borderColor: `${AMBER}18` }}
      />
      {/* Floating particles along the top edge */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute rounded-full"
          style={{
            width: 4 + (i % 3) * 3,
            height: 4 + (i % 3) * 3,
            background: `${AMBER}55`,
            top: `${6 + i * 5}%`,
            left: `${18 + i * 20}%`,
          }}
          animate={{ y: [0, -12, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3.2 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
        />
      ))}

      <div className="relative mx-auto grid max-w-[1180px] grid-cols-1 gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* ---------- Left — contact info ---------- */}
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
            Get in Touch
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
            Reach us directly, or use the form.
          </motion.h2>

          <div>
            {CONTACT_INFO.map((c, i) => (
              <ContactInfoRow key={c.label} {...c} index={i} isLast={i === CONTACT_INFO.length - 1} />
            ))}
          </div>
        </div>

        {/* ---------- Right — form card ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative overflow-hidden rounded-2xl p-6 sm:p-9"
          style={{ background: '#FFFFFF', border: `1px solid ${BORDER}`, boxShadow: '0 30px 70px -30px rgba(18,21,31,0.18)' }}
        >
          {/* Gold corner accent, echoes the pricing-card style used elsewhere */}
          <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-bl-full" style={{ background: `${AMBER}10` }} />

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <h3 className="mb-6 text-[22px] font-semibold" style={{ fontFamily: "'DM Serif Display', serif", color: INK }}>
                  Send us a message
                </h3>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <FloatField label="Name" name="name" required />
                  <FloatField label="Email" type="email" name="email" required />
                  <FloatField label="Phone" type="tel" name="phone" required />
                  <FloatField label="Company name" name="company" required />
                  <div className="sm:col-span-2">
                    <FloatField
                      label="What do you need help with?"
                      name="reason"
                      required
                      options={['Ongoing Legal Support', 'Contracts & Agreements', 'Compliance & Registrations', 'IP & Trademark', 'Employment & Business Matters', 'Other']}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <FloatField label="Tell us briefly about your requirement" name="message" required textarea rows={4} />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative mt-7 flex h-[54px] w-full items-center justify-center gap-2 overflow-hidden rounded-full text-[14.5px] font-semibold text-white transition-opacity duration-300"
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
                      Send Message
                      <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
                        <Send size={16} />
                      </motion.span>
                    </>
                  )}
                </motion.button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                className="flex flex-col items-center justify-center py-16 text-center"
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
                  Message sent.
                </h3>
                <p className="max-w-[320px] text-[14.5px] leading-relaxed" style={{ color: MUTED }}>
                  We&apos;ll get back to you within 1 business day.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}