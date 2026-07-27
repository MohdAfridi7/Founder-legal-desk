"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, ArrowRight, ArrowUpRight, ArrowUp } from 'lucide-react';
import { FaLinkedinIn, FaTwitter, FaInstagram } from "react-icons/fa";
const NAVY = '#19223A';
const NAVY_DARK = '#141B2F';
const GOLD = '#C7954A';
const GOLD_DARK = '#b78d5a';
const TEXT_DARK = '#8892AC';

const PLATFORM_LINKS = [
  { label: 'Services', href: '/services' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Free Consultation', href: 'free-consultation' },
  { label: 'Resources', href: '/resources' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Refund Policy', href: '#' },
];

const SOCIALS = [
  { Icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
  { Icon: FaTwitter, href: "#", label: "Twitter" },
  { Icon: FaInstagram, href: "#", label: "Instagram" },
];

function FooterLinkList({ title, links }) {
  return (
    <div>
      <h5 className="mb-5 text-[13px] font-bold uppercase tracking-[0.08em] text-white">
        {title}
      </h5>
      <ul className="flex flex-col gap-1">
        {links.map((link, i) => (
          <li key={i}>
            <a
              href={link.href}
              className="group inline-flex items-center gap-1.5 py-1.5 text-[14.5px] font-medium transition-colors duration-300"
              style={{ color: TEXT_DARK }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = TEXT_DARK)}
            >
              {link.label}
              <ArrowUpRight
                size={14}
                strokeWidth={2.5}
                className="-translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                style={{ color: GOLD }}
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialButton({ Icon, href, label }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-[1.5px] text-[14px] transition-all duration-300 hover:-translate-y-1"
      style={{ borderColor: 'rgba(255,255,255,0.25)', color: '#FFFFFF' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = GOLD;
        e.currentTarget.style.borderColor = GOLD;
        e.currentTarget.style.color = NAVY;
        e.currentTarget.style.boxShadow = `0 8px 20px -6px ${GOLD}88`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
        e.currentTarget.style.color = '#FFFFFF';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <Icon size={18} strokeWidth={2} />
    </a>
  );
}

function BackToTop() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[1.5px] transition-all duration-300 hover:-translate-y-1"
      style={{ borderColor: 'rgba(255,255,255,0.25)', color: '#FFFFFF' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = GOLD;
        e.currentTarget.style.borderColor = GOLD;
        e.currentTarget.style.color = NAVY;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
        e.currentTarget.style.color = '#FFFFFF';
      }}
    >
      <ArrowUp size={17} strokeWidth={2.25} />
    </button>
  );
}

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  }

  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="relative overflow-hidden"
      style={{ background: NAVY, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Marcellus&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
      `}</style>

      {/* Top hairline accent */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }}
      />

      {/* Ambient glow blobs — subtle depth, matches the rest of the site */}
      <div
        className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full"
        style={{ background: GOLD, opacity: 0.06, filter: 'blur(90px)' }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 -right-20 h-80 w-80 rounded-full"
        style={{ background: GOLD, opacity: 0.05, filter: 'blur(90px)' }}
      />

      <div className="relative mx-auto max-w-[1200px] px-5 py-14 sm:px-8 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="mb-1 text-[20px] font-normal text-white sm:text-[21px]"
              style={{ fontFamily: "'Marcellus', serif" }}
            >
              Founders Legal Desk
            </div>
            <div className="mb-5 text-[11px] font-semibold uppercase tracking-[0.1em]" style={{ color: GOLD }}>
              A Startup Times Venture
            </div>
            <p className="mb-6 max-w-full text-[14.5px] leading-relaxed sm:max-w-[280px]" style={{ color: TEXT_DARK }}>
              Business document protection for Indian companies that are building something real.
            </p>
            <div className="flex items-center gap-3">
              {SOCIALS.map((s, i) => (
                <SocialButton key={i} {...s} />
              ))}
            </div>
          </motion.div>

          {/* Platform links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <FooterLinkList title="Platform" links={PLATFORM_LINKS} />
          </motion.div>

          {/* Legal links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <FooterLinkList title="Legal" links={LEGAL_LINKS} />
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <h5 className="mb-5 text-[13px] font-bold uppercase tracking-[0.08em] text-white">
              Stay in the loop
            </h5>
            <p className="mb-4 text-[14.5px] leading-relaxed" style={{ color: TEXT_DARK }}>
              One practical business document tip for Indian founders — every two weeks.
            </p>

            {!subscribed ? (
              <form
                onSubmit={handleSubmit}
                className="flex w-full overflow-hidden rounded-lg border"
                style={{ borderColor: 'rgba(255,255,255,0.14)' }}
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="h-[52px] min-w-0 flex-1 bg-white px-4 text-[13px] font-medium outline-none"
                  style={{ color: '#262629' }}
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="flex h-[52px] w-[52px] shrink-0 items-center justify-center transition-colors duration-300"
                  style={{ background: GOLD }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = GOLD_DARK)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = GOLD)}
                >
                  <ArrowRight size={18} strokeWidth={2.25} color={NAVY} />
                </button>
              </form>
            ) : (
              <p className="text-[14px] font-semibold" style={{ color: GOLD }}>
                You&apos;re subscribed — welcome aboard.
              </p>
            )}

            <div className="mt-6 flex items-center gap-2 text-[13.5px] break-all sm:break-normal" style={{ color: TEXT_DARK }}>
              <Mail size={16} strokeWidth={2} style={{ color: GOLD }} className="shrink-0" />
              advocatesagir1@gmail.com
            </div>
            <div className="flex items-center gap-2" style={{ color: TEXT_DARK }}> 
    <Phone
      size={16}
      strokeWidth={2}
      style={{ color: GOLD }}
      className="shrink-0"
    />
    +91 97117 52388
  </div>
          </motion.div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="relative border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        <div
          className="mx-auto max-w-[1000px] px-5 py-6 text-center text-[11.5px] leading-relaxed sm:px-8 sm:text-[12px]"
          style={{ color: TEXT_DARK }}
        >
          Founders Legal Desk Pvt Ltd is a technology and coordination platform. It is not a law
          firm and does not itself practice law or provide legal advice. Documents are prepared and
          reviewed by independently enrolled specialists. The professional fee charged by the
          delivering specialist is separate from and in addition to the platform fee charged by
          Founders Legal Desk Pvt Ltd. Use of this platform does not constitute a client
          relationship with Founders Legal Desk Pvt Ltd.
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative" style={{ background: NAVY_DARK }}>
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 px-5 py-6 text-[12.5px] sm:flex-row sm:px-8 sm:text-[13px]">
          <span className="text-center" style={{ color: TEXT_DARK }}>
            © 2026 Founders Legal Desk Pvt Ltd. All rights reserved.
          </span>
          <div className="flex items-center gap-5" style={{ color: TEXT_DARK }}>
            <a href="#" className="transition-colors duration-300 hover:text-white">
              Privacy
            </a>
            <a href="#" className="transition-colors duration-300 hover:text-white">
              Terms
            </a>
            <a href="#" className="transition-colors duration-300 hover:text-white">
              Contact
            </a>
            <BackToTop />
          </div>
        </div>
      </div>
    </motion.footer>
  );
}