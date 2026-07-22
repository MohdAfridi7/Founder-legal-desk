// components/FeaturesSection.jsx
"use client";

import React, { useEffect, useRef, useState } from 'react';

const features = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
      </svg>
    ),
    title: "Specialist-Verified Documents",
    description: "Every document we deliver is reviewed and verified by a qualified specialist before it reaches you. Not a template engine. Not an anonymous platform. A named professional who stands behind the work."
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.59 13.41 13.42 20.6a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
        <circle cx="7" cy="7" r="1.5"/>
      </svg>
    ),
    title: "Fixed Price, No Surprises",
    description: "Choose a plan. Know exactly what you pay. No hourly billing. No scope-creep invoices. Document services that fit a real startup budget."
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: "48-Hour Turnaround",
    description: "Submit your requirement. Get a professionally reviewed, verified document within 48 hours. Built for businesses that move fast."
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 22h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>
        <line x1="10" y1="8" x2="18" y2="8"/>
        <line x1="10" y1="12" x2="18" y2="12"/>
        <line x1="10" y1="16" x2="14" y2="16"/>
      </svg>
    ),
    title: "Backed by Startup Times",
    description: "Founders Legal Desk is a Startup Times venture. If you've read our publication, you already know what we stand for: honest, useful, founder-first content."
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
    The Fix
  </div>

  <div className="overflow-hidden">
    <h2
      className={`fld-heading text-white text-[clamp(28px,4vw,42px)] leading-[1.15] mb-3.5 ${
        inView ? "fld-heading-in" : ""
      }`}
      style={{ fontFamily: "'Fraunces', Georgia, serif" }}
    >
      Founders Legal Desk <span className="text-[#C7954A]">fixes this.</span> 
    </h2>
  </div>

  <p
    className={`fld-reveal text-[#A6ACC0] text-[17px] max-w-[640px] ${
      inView ? "fld-in" : ""
    }`}
    style={{ transitionDelay: inView ? "250ms" : "0ms" }}
  >
    Fixed-price document packages for growing Indian businesses.
    Specialists. Accountability. 48-hour delivery.
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