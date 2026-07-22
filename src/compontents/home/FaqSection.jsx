"use client";
import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const INK = '#0E0B06';
const NAVY = '#19223A';
const GOLD = '#C7954A';
const TEXT = '#838790';
const BORDER = '#D9D9D9';

const IMG_TOP = 'https://bracketweb.com/procounsel-html/assets/images/resources/faq-1-1.jpg';
const IMG_BOTTOM = 'https://bracketweb.com/procounsel-html/assets/images/resources/faq-1-2.jpg';
const IMG_BOTTOM_RIGHT = 'https://bracketweb.com/procounsel-html/assets/images/resources/faq-1-3.png';

const FAQS = [
  {
    q: 'What exactly does Founders Legal Desk do?',
    a: 'We prepare, review, and deliver business documents — contracts, agreements, policies, and compliance paperwork — for incorporated Indian businesses. Every document is verified by a qualified specialist before delivery. You get a fixed-price monthly package or a single-document quote, with delivery within 48 hours.',
  },
  {
    q: 'Who prepares my documents?',
    a: 'Your documents are prepared and reviewed by qualified specialists from our empaneled panel. Each specialist reviews the document personally and verifies it before its delivered to you.',
  },
  {
    q: "What does 'verified' mean?",
    a: 'Every document delivered through Founders Legal Desk is reviewed by a qualified specialist who checks it for accuracy, enforceability, and completeness — and takes personal responsibility for the work. This is different from a template download, where no professional has reviewed what you re signing.',
  },
  {
    q: 'How is this different from downloading a template?',
    a: "A downloaded template is a generic format. It has not been reviewed for your specific situation, your industry, or the current legal environment in India. Our documents are reviewed by a qualified specialist for your specific business context. If a clause is wrong for your situation, we change it.",
  },
   {
    q: 'What if I\'m not sure which plan I need?',
    a: "Book a free consultation. We'll review your situation and tell you exactly what you need — including whether a plan makes sense or a single-document quote is better for you.",
  },
];

function HammerIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.g
        animate={{ y: [0, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        fill={GOLD}
      >
        <path d="M21.6562 20.875H10.7188C10.5115 20.875 10.3128 20.9573 10.1663 21.1038C10.0198 21.2503 9.9375 21.449 9.9375 21.6562C9.9375 21.8635 10.0198 22.0622 10.1663 22.2087C10.3128 22.3552 10.5115 22.4375 10.7188 22.4375H21.6562C21.8635 22.4375 22.0622 22.3552 22.2087 22.2087C22.3552 22.0622 22.4375 21.8635 22.4375 21.6562C22.4375 21.449 22.3552 21.2503 22.2087 21.1038C22.0622 20.9573 21.8635 20.875 21.6562 20.875Z" />
        <path d="M13.8056 16.9688C13.1943 16.9695 12.6083 17.2126 12.1761 17.6448C11.7439 18.0771 11.5007 18.6631 11.5 19.2744V20.0938H20.875V19.2744C20.8743 18.6631 20.6311 18.0771 20.1989 17.6448C19.7667 17.2126 19.1807 16.9695 18.5694 16.9688H13.8056Z" />
      </motion.g>
      <motion.g
        style={{ transformOrigin: '15px 8px' }}
        animate={{ rotate: [0, -15, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        fill={GOLD}
      >
        <path d="M15.9585 13.6149C15.9006 13.6678 15.8349 13.7114 15.7637 13.7442L15.989 13.9696C16.4566 14.4355 17.0898 14.6971 17.7499 14.697C18.41 14.6969 19.0432 14.4352 19.5107 13.9693L21.7812 11.698C22.0124 11.4668 22.1959 11.1924 22.321 10.8903C22.4462 10.5882 22.5106 10.2645 22.5106 9.9375C22.5106 9.61053 22.4462 9.28677 22.321 8.9847C22.1959 8.68263 22.0124 8.40818 21.7812 8.17701L21.5888 7.98456L15.9585 13.6149Z" />
        <path d="M9.2226 7.20295L14.8529 1.57267C14.9108 1.51976 14.9765 1.47611 15.0478 1.44326L14.8224 1.21791C14.3548 0.752021 13.7216 0.490468 13.0615 0.49054C12.4014 0.490611 11.7682 0.752302 11.3007 1.21829L9.03015 3.48915C8.79891 3.72035 8.61548 3.99484 8.49034 4.29694C8.36519 4.59904 8.30078 4.92283 8.30078 5.24982C8.30078 5.57681 8.36519 5.9006 8.49034 6.2027C8.61548 6.5048 8.79891 6.77929 9.03015 7.01049L9.2226 7.20295Z" />
        <path d="M14.3015 12.2813L14.0726 12.5102C13.9993 12.5825 13.9411 12.6687 13.9012 12.7637C13.8613 12.8586 13.8406 12.9605 13.8403 13.0635C13.84 13.1665 13.8601 13.2686 13.8993 13.3638C13.9386 13.459 13.9963 13.5455 14.0691 13.6184C14.142 13.6912 14.2285 13.7489 14.3237 13.7882C14.4189 13.8274 14.521 13.8475 14.624 13.8471C14.727 13.8468 14.8289 13.8261 14.9238 13.7863C15.0188 13.7464 15.105 13.6881 15.1773 13.6149L21.4273 7.36485C21.5716 7.21791 21.6521 7.01992 21.6511 6.81397C21.6502 6.60802 21.568 6.41077 21.4223 6.26514C21.2767 6.11951 21.0795 6.03729 20.8735 6.03635C20.6676 6.03542 20.4696 6.11586 20.3226 6.26016L20.0937 6.48907L16.5113 2.90602L16.7398 2.67735C16.8841 2.53041 16.9646 2.33242 16.9636 2.12647C16.9627 1.92052 16.8805 1.72327 16.7348 1.57764C16.5892 1.43201 16.392 1.34979 16.186 1.34885C15.9801 1.34792 15.7821 1.42836 15.6351 1.57266L9.38514 7.82266C9.31152 7.89496 9.25296 7.98112 9.21283 8.07618C9.17269 8.17123 9.15179 8.27329 9.15132 8.37647C9.15086 8.47965 9.17083 8.5819 9.2101 8.67731C9.24937 8.77273 9.30715 8.85942 9.38011 8.93238C9.45307 9.00534 9.53976 9.06312 9.63518 9.10239C9.73059 9.14166 9.83284 9.16163 9.93602 9.16117C10.0392 9.1607 10.1413 9.1398 10.2363 9.09966C10.3314 9.05953 10.4175 9.00097 10.4898 8.92735L10.7187 8.69844L10.7859 8.76559L1.18201 18.3695C0.953685 18.5955 0.772269 18.8644 0.648189 19.1608C0.524109 19.4571 0.459812 19.7751 0.458992 20.0963C0.458172 20.4176 0.520846 20.7359 0.643411 21.0328C0.765976 21.3298 0.946017 21.5996 1.17319 21.8268C1.40036 22.054 1.67018 22.234 1.96715 22.3566C2.26412 22.4791 2.58239 22.5418 2.90365 22.541C3.22492 22.5402 3.54286 22.4759 3.8392 22.3518C4.13554 22.2277 4.40444 22.0463 4.63045 21.818L14.2344 12.2141L14.3015 12.2813Z" />
      </motion.g>
    </svg>
  );
}



function FaqAccordionItem({
  item,
  index,
  isOpen,
  onToggle,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      className="mt-5"
    >
      <div
        className="flex items-stretch overflow-hidden rounded-md border transition-colors duration-300"
        style={{ borderColor: isOpen ? GOLD : BORDER }}
      >
        <div
          className="hidden shrink-0 items-center border-r px-6 py-4 text-lg transition-colors duration-300 sm:flex"
          style={{
            borderColor: isOpen ? 'rgba(255,255,255,0.2)' : BORDER,
            color: isOpen ? '#fff' : NAVY,
            background: isOpen ? GOLD : 'transparent',
            fontFamily: "'Marcellus', serif",
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </div>

        <button
          onClick={onToggle}
          className="flex flex-1 items-center justify-between gap-4 px-5 py-4 text-left transition-colors duration-300 sm:px-6"
          style={{ background: isOpen ? GOLD : 'transparent' }}
        >
          <span
            className="flex-1 text-[15px] font-normal capitalize transition-colors duration-300 sm:text-[16px]"
            style={{ color: isOpen ? '#fff' : NAVY, fontFamily: "'Marcellus', serif" }}
          >
            {item.q}
          </span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
            style={{ background: isOpen ? '#fff' : '#F0F0F0', color: isOpen ? GOLD : INK }}
          >
            <ChevronDown size={15} />
          </motion.span>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden rounded-b-md border-x border-b"
            style={{ borderColor: BORDER }}
          >
            <motion.p
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="px-5 py-5 text-[14.5px] leading-relaxed sm:px-6"
              style={{ color: TEXT }}
            >
              {item.a}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(3);
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, amount: 0.5 });

  return (
    <section
      className="overflow-hidden bg-white px-6 py-20 sm:px-8 lg:py-28"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-14">
        {/* Left — heading + accordion */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex items-center gap-2"
          >
            <HammerIcon />
            <span
              className="text-[13px] font-semibold uppercase tracking-[0.14em]"
              style={{ color: GOLD }}
            >
              Faqs
            </span>
          </motion.div>

      <h2
  className="mb-10"
  style={{
    fontFamily: "'Marcellus', serif",
    fontSize: "clamp(32px, 4.5vw, 50px)",
    lineHeight: 1.15,
    color: INK,
  }}
>
  <span className="block overflow-hidden">
    <motion.span
      className="block"
      initial={{ y: "100%" }}
      whileInView={{ y: "0%" }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      Have Questions
    </motion.span>
  </span>

  <span className="block overflow-hidden">
    <motion.span
      className="block"
      initial={{ y: "100%" }}
      whileInView={{ y: "0%" }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        delay: 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ color: GOLD }}
    >
      in Your Mind?
    </motion.span>
  </span>
</h2>

          <div>
            {FAQS.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <FaqAccordionItem
                  key={i}
                  item={item}
                  index={i}
                  isOpen={isOpen}
                  onToggle={() => setOpenIndex(isOpen ? -1 : i)}
                />
              );
            })}
          </div>
        </div>

        {/* Right — image collage (desktop only, hidden on mobile) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative mx-auto hidden aspect-[4/3] w-full max-w-[520px] lg:block lg:max-w-none"
        >
          <motion.img
            src={IMG_TOP}
            alt="Consultation"
            initial={{ opacity: 0, x: 40, y: -20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            animate={{ y: [0, -8, 0] }}
            className="absolute right-0 top-0 h-[62%] w-[72%] rounded-xl object-cover shadow-xl"
          />
          <motion.img
            src={IMG_BOTTOM}
            alt="Our work"
            initial={{ opacity: 0, x: -40, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.35 }}
            animate={{ y: [0, 8, 0] }}
            className="absolute bottom-0 left-0 h-[55%] w-[62%] rounded-xl border-8 border-white object-cover shadow-xl"
          />
   <motion.img
  src={IMG_BOTTOM_RIGHT}
  alt="Our work"
  initial={{ opacity: 0, scale: 0.8 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: true }}
  animate={{
    x: [-20, 20, -20],
  }}
  transition={{
    opacity: {
      duration: 0.6,
      delay: 0.5,
    },
    scale: {
      duration: 0.6,
      delay: 0.5,
    },
    x: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    },
  }}
  className="absolute bottom-0 right-0 h-[55%] w-[40%] object-cover"
/>
        </motion.div>
      </div>
    </section>
  );
}
