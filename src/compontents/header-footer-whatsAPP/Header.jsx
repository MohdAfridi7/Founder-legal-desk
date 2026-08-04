"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

/**
 * Drop this in as components/Header.jsx and render it in app/layout.jsx.
 *
 * Fonts: the brand name uses a serif display face. If you want the exact
 * "Fraunces" look from the original design, load it once in app/layout.jsx:
 *
 *   import { Fraunces } from "next/font/google";
 *   const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });
 *   // then add `className={fraunces.variable}` to your <html> or <body> tag
 *
 * and swap `font-serif` below for `font-[var(--font-fraunces)]`.
 * Until then it falls back to the browser's default serif, which still reads fine.
 */

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
   { label: "Profile", href: "/profile" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const SEAL_NAVY = "#0D1526";
const SEAL_AMBER = "#F5A623";

// Small animated "Specialist Verified" seal — recreated from the reference
// badge, sized for the navbar. Ring rotates continuously; a soft glow
// pulses behind it so it reads clearly against both the transparent and
// scrolled (dark) navbar states.
function SealLogo({ size = 38 }) {
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <motion.div
        className="absolute rounded-full"
        style={{ inset: -4, background: SEAL_AMBER, opacity: 0.25, filter: "blur(8px)" }}
        animate={{ opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        className="absolute inset-0 rounded-full"
        style={{ background: SEAL_NAVY, boxShadow: "0 4px 14px rgba(0,0,0,.4)" }}
      />
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      >
        <circle cx="50" cy="50" r="45" fill="none" stroke={`${SEAL_AMBER}55`} strokeWidth="1" />
        <circle cx="50" cy="50" r="40" fill="none" stroke={SEAL_AMBER} strokeWidth="1.5" />
        <path id="navSealPath" d="M 50,50 m -30,0 a 30,30 0 1,1 60,0 a 30,30 0 1,1 -60,0" fill="none" />
        <text fontSize="5.6" fill={SEAL_AMBER} letterSpacing="1" fontFamily="inherit" fontWeight="700">
          <textPath href="#navSealPath">
            SPECIALIST VERIFIED &#8226; FOUNDERS LEGAL DESK &#8226;
          </textPath>
        </text>
      </motion.svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <Check size={size * 0.34} strokeWidth={2.75} style={{ color: SEAL_AMBER }} />
      </div>
    </div>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // navbar background/blur once the page scrolls
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close the drawer whenever the route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // lock body scroll while the mobile drawer is open, close on Escape
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href) => pathname === href;

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-[1000] transition-[background-color,box-shadow,padding] duration-400 ${
          scrolled
            ? "bg-[#080D1A]/90 backdrop-blur-xl shadow-[0_8px_30px_-10px_rgba(0,0,0,.4)] py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-[1180px] items-center justify-between px-6">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5">
            <SealLogo />
            <span className="flex flex-col leading-tight">
              <span className="font-serif text-lg font-bold text-white">
                Founders Legal Desk
              </span>
              <span className="mt-0.5 text-[10.5px] font-semibold uppercase tracking-[.08em] text-[#FFC157]">
                A Startup Times Venture
              </span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative py-1 text-[14.5px] font-semibold transition-colors ${
                    active ? "text-[#F5A623]" : "text-white hover:text-[#F5A623]"
                  }`}
                >
                  {link.label}
                  {/* sliding underline: always visible + full width when active,
                      grows from center on hover otherwise */}
                  <span
                    className={`pointer-events-none absolute -bottom-2 left-0 right-0 h-[2px] rounded-full bg-[#F5A623] transition-transform duration-300 ease-out ${
                      active
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                    style={{ transformOrigin: "center" }}
                  />
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <Link
            href="/free-consultation"
            className="hidden shrink-0 items-center justify-center gap-2 rounded-full bg-[#F5A623] px-7 py-[15px] text-[15px] font-bold text-[#080D1A] shadow-[0_8px_24px_-8px_rgba(245,166,35,.35)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-[#FFC157] hover:shadow-[0_16px_34px_-10px_rgba(245,166,35,.35)] lg:inline-flex"
          >
            Book Free Consultation
          </Link>

          {/* Hamburger (mobile / tablet) */}
          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="z-[1200] flex flex-col gap-[5px] rounded-full p-2 transition-colors duration-300 hover:bg-white/10 lg:hidden"
          >
            <span
              className={`h-0.5 w-[22px] bg-white transition-transform duration-300 ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-[22px] bg-white transition-opacity duration-300 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`h-0.5 w-[22px] bg-white transition-transform duration-300 ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[1050] bg-black/50 backdrop-blur-[2px] transition-opacity duration-400 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Mobile / tablet drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-[1100] flex w-[80%] max-w-[340px] flex-col bg-[#0D1526] shadow-[-20px_0_60px_rgba(0,0,0,.4)] transition-transform duration-450 ease-[cubic-bezier(.2,.8,.2,1)] lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* explicit close (X) button */}
        <div className="flex items-center justify-between px-6 pt-6">
          <span className="flex flex-col leading-tight">
              <span className="font-serif text-lg font-bold text-white">
                Founders Legal Desk
              </span>
              <span className="mt-0.5 text-[10.5px] font-semibold uppercase tracking-[.08em] text-[#FFC157]">
                A Startup Times Venture
              </span>
            </span>
          <button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white transition-colors duration-300 hover:border-[#F5A623] hover:bg-[#F5A623]/10 hover:text-[#F5A623]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="mt-8 flex flex-1 flex-col gap-1 px-8">
          {NAV_LINKS.map((link, i) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative flex items-center justify-between border-b border-white/[.06] py-4 text-[18px] font-semibold transition-all duration-300 ${
                  open ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                } ${active ? "text-[#F5A623]" : "text-white hover:text-[#FFC157]"}`}
                style={{ transitionDelay: open ? `${80 + i * 55}ms` : "0ms" }}
              >
                {link.label}
                <svg
                  width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
                  className="opacity-40 transition-transform duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                >
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            );
          })}
        </div>

        <div className="px-8 pb-8">
          <Link
            href="/consultation"
            onClick={() => setOpen(false)}
            className="inline-flex w-full items-center justify-center rounded-full bg-[#F5A623] px-7 py-[15px] text-[15px] font-bold text-[#080D1A] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#FFC157]"
          >
            Book Free Consultation
          </Link>
        </div>
      </div>
    </>
  );
}