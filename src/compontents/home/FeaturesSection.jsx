// components/FeaturesSection.jsx
"use client";

import React, { useEffect, useRef, useState } from 'react';

const features = [
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Briefcase / Legal Desk */}
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <path d="M3 11h18" />
        <path d="M10 11v2h4v-2" />
      </svg>
    ),
    title: "One Desk. Every Legal Need.",
    description:
      "From everyday legal questions to contracts, compliance, IP, documentation and business disputes, you have one place to turn to."
  },

  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Handshake / Legal Partner */}
        <path d="M4 12l3-3 4 1 2-2 4 1 3 3" />
        <path d="M3 13l3 3 3-2" />
        <path d="M21 13l-3 3-3-2" />
        <path d="M9 14l2 2 4-4" />
        <path d="M7 9l2-3h4l2 2" />
      </svg>
    ),
    title: "A Partner You Can Call",
    description:
      "No need to figure out which lawyer or specialist you need. Bring the issue to us and we'll help you navigate it."
  },

  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Building / Growing Business */}
        <path d="M4 21V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v16" />
        <path d="M17 9h2a2 2 0 0 1 2 2v10" />
        <path d="M2 21h20" />
        <path d="M8 7h2" />
        <path d="M8 11h2" />
        <path d="M8 15h2" />
        <path d="M12 7h2" />
        <path d="M12 11h2" />
        <path d="M12 15h2" />
      </svg>
    ),
    title: "Built for Growing Businesses",
    description:
      "Practical legal support designed around the realities, budgets and changing needs of startups and MSMEs."
  },

  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Shield / Protection */}
        <path d="M12 3l7 3v5c0 4.5-2.8 7.8-7 10-4.2-2.2-7-5.5-7-10V6l7-3z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: "Support Before Problems Grow",
    description:
      "Stay on top of legal and compliance matters instead of waiting for a small issue to become a bigger one."
  }
];

const FeaturesSection = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.18 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e, index) => {
    const card = cardRefs.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mx', `${x}%`);
    card.style.setProperty('--my', `${y}%`);
  };

  return (
    <section ref={sectionRef} className="fld-features relative bg-[#080D1A] py-24 overflow-hidden">
      {/* Ambient background glow */}
      <div className="fld-orb fld-orb-a pointer-events-none absolute -top-40 -left-32 w-[480px] h-[480px] rounded-full"></div>
      <div className="fld-orb fld-orb-b pointer-events-none absolute -bottom-52 -right-24 w-[560px] h-[560px] rounded-full"></div>
      <div className="fld-grid pointer-events-none absolute inset-0 opacity-[0.05]"></div>

      <div className="container relative mx-auto px-6 max-w-[1180px]">
        {/* Header */}
<div className="max-w-[640px] mb-14">
  <div
    className={`fld-reveal fld-eyebrow inline-flex items-center gap-2 text-[#C7954A] text-[12.5px] font-bold tracking-[0.14em] uppercase mb-4 ${
      inView ? "fld-in" : ""
    }`}
  >
    <span className="fld-eyebrow-line w-5 h-px bg-[#C7954A]"></span>
    The Solution
  </div>

  <div className="overflow-hidden">
    <h2
      className={`fld-heading text-white text-[clamp(28px,4vw,42px)] leading-[1.15] mb-3.5 ${
        inView ? "fld-heading-in" : ""
      }`}
      style={{ fontFamily: "'Fraunces', Georgia, serif" }}
    >
      Your Business Has a<span className="text-[#C7954A]"> Legal Team Now.</span>
    </h2>
  </div>

  <p
    className={`fld-reveal text-[#A6ACC0] text-[17px] max-w-[640px] ${
      inView ? "fld-in" : ""
    }`}
    style={{ transitionDelay: inView ? "250ms" : "0ms" }}
  >
   Founders Legal Desk gives startups and MSMEs ongoing legal support without the cost of building a full-time in-house team.
  </p>
</div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              onMouseMove={(e) => handleMouseMove(e, index)}
              className={`fld-card fld-reveal group relative bg-[#0D1526] border border-[rgba(255,255,255,0.09)] rounded-2xl p-[30px_26px] overflow-hidden ${inView ? 'fld-in' : ''}`}
              style={{ transitionDelay: inView ? `${260 + index * 110}ms` : '0ms' }}
            >
              {/* Mouse-tracked spotlight */}
              <div className="fld-spotlight pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100"></div>
              {/* Verification scan sweep */}
              <div className="fld-scan pointer-events-none absolute inset-0"></div>

              {/* Icon Badge */}
              <div className="relative w-[46px] h-[46px] mb-4">
                <span className="fld-ring absolute inset-[-7px] rounded-full border border-[rgba(245,166,35,0.35)]"></span>
                <div className="relative w-full h-full rounded-xl bg-[rgba(245,166,35,0.12)] text-[#F5A623] flex items-center justify-center transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
                  {feature.icon}
                </div>
                <span className="fld-check absolute -bottom-1 -right-1 w-[18px] h-[18px] rounded-full bg-[#F5A623] flex items-center justify-center opacity-0 scale-50">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#080D1A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </span>
              </div>

              {/* Content */}
              <h3 className="relative font-serif font-semibold text-[17px] text-white mb-2">
                {feature.title}
              </h3>
              <p className="relative text-[#A6ACC0] text-[14px] leading-[1.55]">
                {feature.description}
              </p>
            </div>
          ))}

          
        </div>
        {/* ✅ CTA Grid ke bahar */}
<div
  className={`fld-reveal flex justify-center mt-16 ${
    inView ? "fld-in" : ""
  }`}
  style={{ transitionDelay: inView ? "700ms" : "0ms" }}
>
  <a
    href="/contact"
    className="group inline-flex items-center gap-3 rounded-full bg-[#C7954A] px-8 py-4 font-semibold text-[#080D1A] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(199,149,74,0.35)]"
  >
    Talk to Our Team

    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  </a>
</div>
      </div>

      <style>{`
      .fld-heading {
  opacity: 0;
  transform: translateY(100%);
}

.fld-heading-in {
  animation: fldHeadingReveal 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: 0.1s;
}

@keyframes fldHeadingReveal {
  0% {
    opacity: 0;
    transform: translateY(100%);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
        .fld-grid {
          background-image:
            linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(ellipse 70% 60% at 50% 30%, black 0%, transparent 75%);
        }

        .fld-orb {
          filter: blur(90px);
        }
        .fld-orb-a {
          background: radial-gradient(circle, rgba(245,166,35,0.16), transparent 70%);
          animation: fld-drift-a 16s ease-in-out infinite;
        }
        .fld-orb-b {
          background: radial-gradient(circle, rgba(245,166,35,0.10), transparent 70%);
          animation: fld-drift-b 20s ease-in-out infinite;
        }

        .fld-reveal {
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .fld-reveal.fld-in {
          opacity: 1;
          transform: translateY(0);
        }

        .fld-eyebrow-line {
          display: inline-block;
          transform-origin: left center;
          transform: scaleX(0);
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.15s;
        }
        .fld-eyebrow.fld-in .fld-eyebrow-line {
          transform: scaleX(1);
        }

        .fld-card {
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.45s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.35s ease,
                      box-shadow 0.35s ease;
        }
        .fld-card:hover {
          transform: translateY(-9px);
          border-color: #F5A623;
          box-shadow: 0 24px 50px -18px rgba(245,166,35,0.22);
        }
        .fld-card.fld-in:hover {
          transform: translateY(-9px);
        }

        .fld-spotlight {
          background: radial-gradient(240px circle at var(--mx, 50%) var(--my, 0%), rgba(245,166,35,0.14), transparent 65%);
          transition: opacity 0.4s ease;
        }

        .fld-scan {
          background: linear-gradient(115deg, transparent 30%, rgba(245,166,35,0.16) 48%, rgba(245,166,35,0.05) 55%, transparent 70%);
          transform: translateX(-120%);
          opacity: 0;
        }
        .fld-card:hover .fld-scan {
          animation: fld-scan-sweep 1.1s cubic-bezier(0.4, 0, 0.2, 1) both;
        }

        .fld-ring {
          transform: scale(0.85);
          opacity: 0;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease;
        }
        .fld-card:hover .fld-ring {
          transform: scale(1);
          opacity: 1;
          animation: fld-ring-pulse 1.8s ease-out 0.5s infinite;
        }

        .fld-check {
          transition: opacity 0.35s ease 0.35s, transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) 0.35s;
        }
        .fld-card:hover .fld-check {
          opacity: 1;
          transform: scale(1);
        }

        @keyframes fld-scan-sweep {
          from { transform: translateX(-120%); opacity: 1; }
          70% { opacity: 1; }
          to { transform: translateX(120%); opacity: 0; }
        }

        @keyframes fld-ring-pulse {
          0% { box-shadow: 0 0 0 0 rgba(245,166,35,0.35); }
          70% { box-shadow: 0 0 0 8px rgba(245,166,35,0); }
          100% { box-shadow: 0 0 0 0 rgba(245,166,35,0); }
        }

        @keyframes fld-drift-a {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, 20px); }
        }
        @keyframes fld-drift-b {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-25px, -25px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .fld-reveal, .fld-eyebrow-line, .fld-card, .fld-ring, .fld-check, .fld-orb {
            transition: none !important;
            animation: none !important;
            transform: none !important;
            opacity: 1 !important;
          }
          .fld-scan { display: none; }
        }
      `}</style>
    </section>
  );
};

export default FeaturesSection;