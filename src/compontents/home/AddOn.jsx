"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ============================================================
   TOKENS
   ============================================================ */
const C = {
  navy950: "#080D1A",
  navy900: "#0D1526",
  navy800: "#141F38",
  Gold : '#C7954A',
  lineDark: "rgba(255,255,255,.09)",
  lineDark2: "rgba(255,255,255,.16)",
  amber500: "#F5A623",
  amber400: "#FFC157",
  white: "#FFFFFF",
  slate300: "#A6ACC0",
  slate500: "#6B7184",
};

const fontDisplay = { fontFamily: "'Fraunces', Georgia, serif" };

/* ============================================================
   DATA — from Legal Desk packages doc
   ============================================================ */
const SECTORS = {
  "Business Setup & Registration": [
    {
      service: "Private Limited Company",
      fee: "₹1,999",
      note: "Government fees billed separately at actuals",
    },
    {
      service: "Limited Liability Partnership (LLP)",
      fee: "₹1,999 ",
      note: "Government fees billed separately at actuals",
    },
    {
      service: "One Person Company (OPC)",
      fee: "₹1,999 ",
      note: "Government fees billed separately at actuals",
    },
     {
      service: "Sole Proprietorship / MSME",
      fee: "₹499 – ₹999",
      note: "Government fees billed separately at actuals",
    },
     {
      service: "Partnership Firm",
      fee: "₹1,999",
      note: "Government fees billed separately at actuals",
    },
     {
      service: "Section 8 Company (NGO)",
      fee: "₹7,999",
      note: "Government fees billed separately at actuals",
    },
     {
      service: "Society Registration",
      fee: "₹1,999",
      note: "Government fees billed separately at actuals",
    },



     {
      service: "Trust Registration",
      fee: "Custom Quote (₹2,500 – ₹5,000)",
      note: "Government fees billed separately at actuals",
    },
     {
      service: "Startup India Recognition",
      fee: "₹1,999",
      note: "Government fees billed separately at actuals",
    },
     {
      service: "Virtual Office Address",
      fee: "₹999/mon.",
      note: "Government fees billed separately at actuals",
    },
     {
      service: "Public Limited / Nidhi / Producer Co.",
      fee: "Custom Consultation",
      note: "Government fees billed separately at actuals",
    },
  ],
  "Tax & GST Services": [
    {
      service: "GST Registration",
      fee: "₹499 – ₹999",
      // feeNote: "one-time",
      note: "Government fees billed separately at actuals",
    },
     {
      service: "GST Return Filing",
      fee: "₹499/mon.",
      // feeNote: "one-time",
      note: "Government fees billed separately at actuals",
    },
     {
      service: "GST Annual Return (GSTR-9/9C)",
      fee: "₹2,999",
      // feeNote: "one-time",
      note: "Government fees billed separately at actuals",
    },
     {
      service: "GST Notice & LUT Filing",
      fee: "₹1,499",
      // feeNote: "one-time",
      note: "Government fees billed separately at actuals",
    },
     {
      service: "Income Tax Return (ITR-1 to ITR-4)",
      fee: "₹499 – ₹1,999",
      // feeNote: "one-time",
      note: "Government fees billed separately at actuals",
    },
     {
      service: "Business ITR (ITR-5 / ITR-6 / ITR-7)",
      fee: "₹2,999 – ₹5000",
      // feeNote: "one-time",
      note: "Government fees billed separately at actuals",
    },
     {
      service: "TAN & TDS Filing",
      fee: "₹999/quarter",
      // feeNote: "one-time",
      note: "Government fees billed separately at actuals",
    },
    
  ],
   "Intellectual Property (IP) Services": [
    {
      service: "Trademark Registration",
      fee: "₹1,499 ",
      // feeNote: "one-time",
      note: "Government fees billed separately at actuals",
    },
     {
      service: "Trademark Objection Reply",
      fee: "₹1,999",
      // feeNote: "one-time",
      note: "Government fees billed separately at actuals",
    },
     {
      service: "Trademark Opposition / Hearing",
      fee: "Custom Quote (₹4,999 – ₹9,999)",
      // feeNote: "one-time",
      note: "Government fees billed separately at actuals",
    },
     {
      service: "Trademark Renewal / Transfer",
      fee: "Custom Quote",
      // feeNote: "one-time",
      note: "Government fees billed separately at actuals",
    },
     {
      service: "Copyright Registration",
      fee: "₹1,999",
      // feeNote: "one-time",
      note: "Government fees billed separately at actuals",
    },
     {
      service: "Provisional Patent Filing",
      fee: "₹9,999 ",
      // feeNote: "one-time",
      note: "Government fees billed separately at actuals",
    },
     {
      service: "Design Registration",
      fee: "₹4,999",
      // feeNote: "one-time",
      note: "Government fees billed separately at actuals",
    },
    
  ],
   "Licenses & Trade Registrations": [
    {
      service: "FSSAI Food License (Basic)",
      fee: "₹1,499 ",
      // feeNote: "one-time",
      note: "Government fees billed separately at actuals",
    },
     {
      service: "FSSAI State / Central License",
      fee: "₹2,999 – ₹5,000",
      // feeNote: "one-time",
      note: "Government fees billed separately at actuals",
    },
     {
      service: "Import Export Code (IEC)",
      fee: "₹999",
      // feeNote: "one-time",
      note: "Government fees billed separately at actuals",
    },
     {
      service: "Shop & Establishment License",
      fee: "₹1,499",
      // feeNote: "one-time",
      note: "Government fees billed separately at actuals",
    },
     {
      service: "Trade License / Fire / Safety",
      fee: "₹1,999",
      // feeNote: "one-time",
      note: "Government fees billed separately at actuals",
    },
     {
      service: "ISO Certification",
      fee: "₹2,999 ",
      // feeNote: "one-time",
      note: "Government fees billed separately at actuals",
    },
     {
      service: "PF & ESI Registration",
      fee: "₹1,999",
      // feeNote: "one-time",
      note: "Government fees billed separately at actuals",
    },
    
  ],
    "Corporate Compliance & ROC Filings": [
    {
      service: "Private Limited Annual Compliance",
      fee: "₹4,999 – ₹9,999",
      // feeNote: "one-time",
      note: "Government fees billed separately at actuals",
    },
     {
      service: "LLP Annual Compliance",
      fee: "₹2,999",
      // feeNote: "one-time",
      note: "Government fees billed separately at actuals",
    },
     {
      service: "DIR-3 KYC Filing",
      fee: "₹499",
      // feeNote: "one-time",
      note: "Government fees billed separately at actuals",
    },
     {
      service: "Issue of Shares / Capital Increase",
      fee: "₹3,999",
      // feeNote: "one-time",
      note: "Government fees billed separately at actuals",
    },
     {
      service: "Director / Partner Change",
      fee: "₹1,999",
      // feeNote: "one-time",
      note: "Government fees billed separately at actuals",
    },
     {
      service: "Business Conversion",
      fee: "₹7,999",
      // feeNote: "one-time",
      note: "Government fees billed separately at actuals",
    },
     {
      service: "Business Closure / Striking Off",
      fee: "₹4,999 – ₹9,999",
      // feeNote: "one-time",
      note: "Government fees billed separately at actuals",
    },
    
  ],
     "Accounting, Audit & Advisory Services": [
    {
      service: "Bookkeeping & Accounting",
      fee: "₹1,499 – ₹4,999/mon.",
      // feeNote: "one-time",
      note: "Government fees billed separately at actuals",
    },
     {
      service: "Statutory Audit Support",
      fee: "₹5,000 – ₹15,000",
      // feeNote: "one-time",
      note: "Government fees billed separately at actuals",
    },
     {
      service: "Contract / Legal Notice Drafting",
      fee: "₹1,999 – ₹4,999",
      // feeNote: "one-time",
      note: "Government fees billed separately at actuals",
    },    
  ],
   "Data Protetion & Policies": [
    {
      service: "Basic",
      fee: "₹4,999",
      // feeNote: "one-time",
      note: "Government fees billed separately at actuals",
    },
     {
      service: "Standard",
      fee: "₹12,500",
      // feeNote: "one-time",
      note: "Government fees billed separately at actuals",
    },
     {
      service: "Premium",
      fee: "₹20,000",
      // feeNote: "one-time",
      note: "Government fees billed separately at actuals",
    },    
  ],
  "International Business Registration & Regulatory": [
    {
      service: "International Registration",
      fee: "Custom Consultation",
      // feeNote: "one-time",
      note: "Government fees billed separately at actuals",
    },
     {
      service: "RBI / IRDA Compliance",
      fee: "Custom Consultation",
      // feeNote: "one-time",
      note: "Government fees billed separately at actuals",
    },
      
  ],
};

const SECTOR_KEYS = Object.keys(SECTORS);

/* ============================================================
   ICONS
   ============================================================ */
const PlugIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.amber400} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 2v6M15 2v6M6 8h12l-1 5a5 5 0 0 1-10 0z" />
    <path d="M12 17v5" />
  </svg>
);

/* ============================================================
   GLOBAL STYLE — shimmer + connector-line keyframes
   ============================================================ */
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700;800&display=swap');
    .ao-root{ font-family:'Inter',sans-serif; }
    .ao-card{ position:relative; overflow:hidden; }
    .ao-card::before{
      content:''; position:absolute; inset:0; border-radius:inherit; padding:1.5px;
      background:linear-gradient(135deg, ${C.amber500}, transparent 45%, transparent 60%, ${C.amber500});
      -webkit-mask:linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
      -webkit-mask-composite:xor; mask-composite:exclude;
      opacity:0; transition:opacity .35s ease; pointer-events:none;
    }
    .ao-card:hover::before{ opacity:1; }
    .ao-shine{ position:absolute; inset:0; pointer-events:none; overflow:hidden; border-radius:inherit; }
    .ao-shine::after{
      content:''; position:absolute; top:-60%; left:-30%; width:35%; height:220%;
      background:linear-gradient(120deg, transparent, rgba(245,166,35,.14), transparent);
      transform:rotate(18deg) translateX(-160%); transition:transform .7s ease;
    }
    .ao-card:hover .ao-shine::after{ transform:rotate(18deg) translateX(340%); }
    .ao-plug-line{ stroke-dasharray:60; stroke-dashoffset:60; transition:stroke-dashoffset .5s ease; }
    .ao-card:hover .ao-plug-line{ stroke-dashoffset:0; }
    .ao-blob{ position:absolute; border-radius:9999px; filter:blur(80px); opacity:.18; pointer-events:none; }
    @media (prefers-reduced-motion: reduce){
      .ao-shine::after{ transition:none !important; transform:none !important; }
    }
  `}</style>
);

/* ============================================================
   ADD-ON CARD
   ============================================================ */
function AddOnCard({ item, index }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 26, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -14, scale: 0.96 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 0.85, 0.3, 1.05] }}
      whileHover={{ y: -8, transition: { duration: 0.25 } }}
      className="ao-card rounded-2xl p-6 sm:p-7 flex flex-col h-full"
      style={{ background: C.navy900, border: `1px solid ${C.lineDark}`, boxShadow: "0 14px 34px -18px rgba(0,0,0,.55)" }}
    >
      <div className="ao-shine" />

      {/* module connector header */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(245,166,35,.14)" }}
        >
          <PlugIcon />
        </div>
        <svg width="34" height="10" viewBox="0 0 34 10" className="flex-shrink-0">
          <line className="ao-plug-line" x1="0" y1="5" x2="34" y2="5" stroke={C.amber500} strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: C.amber500 }} />
      </div>

      <h3 className="text-[16.5px] sm:text-[17px] font-semibold leading-snug mb-3" style={{ ...fontDisplay, color: C.white }}>
        {item.service}
      </h3>

      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-[26px] sm:text-[28px] font-bold" style={{ ...fontDisplay, color: C.amber400 }}>
          {item.fee}
        </span>
        {item.feeNote && (
          <span className="text-[12px] font-semibold uppercase tracking-wide" style={{ color: C.slate300 }}>
            {item.feeNote}
          </span>
        )}
      </div>

      <p className="text-[13.5px] leading-relaxed mt-auto pt-3 border-t" style={{ color: C.slate300, borderColor: C.lineDark }}>
        {item.note}
      </p>
    </motion.div>
  );
}

/* ============================================================
   SECTOR TABS — sliding highlight pill via layoutId
   ============================================================ */
function SectorTabs({ active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2.5 mb-10 sm:mb-12">
      {SECTOR_KEYS.map((key) => {
        const isActive = key === active;
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            className="relative px-5 py-3 rounded-full font-bold text-[13.5px] sm:text-[14px] transition-colors duration-300"
            style={{ color: isActive ? C.navy950 : C.white }}
          >
            {isActive && (
              <motion.span
                layoutId="ao-tab-pill-dark"
                className="absolute inset-0 rounded-full"
                style={{ background: C.amber500, zIndex: 0 }}
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <span
              className="absolute inset-0 rounded-full border-[1.5px]"
              style={{ borderColor: isActive ? "transparent" : C.lineDark2, zIndex: 0 }}
            />
            <span className="relative z-10">{key}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ============================================================
   SECTION
   ============================================================ */
export default function AddOn({
  eyebrow = "Add-Ons",
  title = "Modular Sector-Specific Add-Ons",
  description = "Plug in exactly what your industry needs, on top of your base package — priced separately, added only when you need them.",
  onSelect = (sector, item) => {},
}) {
  const [active, setActive] = useState(SECTOR_KEYS[0]);
  const items = SECTORS[active];

  return (
    <section className="ao-root relative overflow-hidden py-16 sm:py-24" style={{ background: C.navy950 }}>
      <GlobalStyle />

      <div className="ao-blob" style={{ width: 420, height: 420, background: C.amber500, top: -160, right: -120 }} />
      <div className="ao-blob" style={{ width: 320, height: 320, background: "#3452C7", bottom: -140, left: -100 }} />

      <div className="max-w-[1180px] mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl mb-10 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 text-[12px] sm:text-[12.5px] font-bold uppercase tracking-[.14em] mb-4" style={{ color: C.Gold }}>
            <span style={{ width: 20, height: 1, background: C.Gold }} />
            {eyebrow}
          </div>
          <h2 className="text-[26px] sm:text-[34px] lg:text-[42px] leading-[1.15] font-semibold mb-3" style={{ ...fontDisplay, color: C.white, letterSpacing: "-.01em" }}>
            Modular Sector-Specific <span style={{ color: C.Gold }}>Add-Ons</span> 
          </h2>
          <p className="text-[15.5px] sm:text-[17px]" style={{ color: C.slate300 }}>{description}</p>
        </motion.div>

        <SectorTabs active={active} onChange={setActive} />

        <div className="relative" style={{ minHeight: 260 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: [0.22, 0.85, 0.3, 1.05] }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
            >
              {items.map((item, i) => (
                <AddOnCard key={item.service} item={item} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center mt-10 text-[13.5px]"
          style={{ color: C.slate300 }}
        >
          Government / statutory fees, where applicable, are billed separately at actuals.
        </motion.p>
      </div>
    </section>
  );
}