"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  FileSignature,
  Briefcase,
  Users,
  ShieldCheck,
  BellRing,
  Landmark,
  ArrowUpRight,
   ArrowRight
} from "lucide-react";

const services = [
  {
    title: "Vendor & Supplier Agreements",
    description:
      "Protect every vendor relationship with a clear, enforceable agreement covering scope, payment, deliverables, and dispute resolution.",
    image: "https://lawyersinventory.com/wp-content/uploads/2023/06/Vendor-Contract.png",
    icon: FileSignature,
  },
   {
    title: "Employment Contracts & HR Documents",
    description:
      "Role, compensation, IP assignment, non-solicitation, and notice period — all in one reviewed agreement.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1Kon482hqsXcuZPFW-useB4laiUfpibJ4QHV_AziMsA&s=10",
     icon: Briefcase,
  },
  {
    title: "Founder & Co-Founder Agreement",
    description:
      "Equity split, roles, vesting schedule, IP ownership, exit provisions — the most-skipped document in startup history.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVBY564JSndK_9knOicDtHaZ-mv1atd1MS1js-cz_sBA&s=10",
    icon: Users,
  },
  {
    title: "Privacy Policy & Terms of Service",
    description:
      "If your business collects user data, these are no longer optional under the DPDP Act 2023.",
    image: "/service-3-1.jpg",
    icon: ShieldCheck,
  },
   {
    title: "Compliance Tracking & Reminders",
    description:
      "Automated alerts for ROC filings, board meetings, DIR-3 KYC, AGM deadlines, and TDS dates.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUXxL9-1hr9sI8r6AJ0yCDyt1x5yLxr_2HmTR3FBObdw&s=10",
    icon: BellRing,
  },
   {
    title: "Fundraising & Investor Documents",
    description:
      "Scope, deliverables, payment terms, IP assignment, and exit clause for every freelance engagement.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd0aWbUv4QS0RxfiCJhvXO2IIkvgthxrlB1tCgC_3hvWkUTAbj1htDqVY&s=10",
   icon: Landmark,
  },
  
];
const headingVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const cardVariants = {
  hidden: (index) => ({
    opacity: 0,
    y: 60,
    x: index % 2 === 0 ? -40 : 40,
    scale: 0.95,
  }),
  visible: (index) => ({
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      delay: index * 0.15,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};
export default function Services() {
  return (
<section className="bg-[#f8f6f3] py-14 md:py-20 lg:py-28">
   <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
       <motion.div
  className="mb-14 text-center"
  variants={headingVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.4 }}
>
 <motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
  className="inline-flex items-center gap-2 text-[12.5px] font-bold uppercase tracking-[0.14em] text-[#C7954A]"
>
  <span className="w-5 h-px bg-[#C7954A]"></span>
  OUR SERVICE
</motion.div>

<motion.h2
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8, delay: 0.15 }}
  className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl"
  style={{ fontFamily: "'Fraunces', Georgia, serif" }}
>
  We're Providing Best
  <br />
  <span className="text-[#C7954A]">
    Service To Clients
  </span>
</motion.h2>
        </motion.div>

        {/* Cards */}
        <div className="mx-auto grid max-w-6xl gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
            <motion.div
  key={index}
  custom={index}
  variants={cardVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
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
                        {service.title}
                      </h3>

                      <p className="mt-4 text-sm sm:text-[15px] leading-6 sm:leading-7 text-[#777]">
                        {service.description}
                      </p>
                    </div>

                    {/* Arrow */}
                  {/* Image Section */}
<div className="relative mt-auto">
  {/* Arrow Overlap */}
  <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2">
   <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#161d35] text-white shadow-lg">
      <ArrowUpRight size={18} />
    </div>
  </div>

  {/* Image */}
<div className="relative h-[130px] sm:h-[150px] overflow-hidden">
  <img
    src={service.image}
    alt={service.title}
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
  src={service.image}
  alt={service.title}
  className="absolute inset-0 w-full h-full object-cover"
 />

                  <div className="absolute inset-0 bg-[#161d35]/90" />

                 <div className="relative flex h-full flex-col items-center justify-center px-5 sm:px-8 text-center text-white">
                    <div className="mb-8 flex h-16 w-16 items-center justify-center bg-[#c89b53]">
                      <Icon size={30} />
                    </div>

                    <h3 className="text-xl sm:text-2xl font-semibold leading-snug">
                      {service.title}
                    </h3>

                   <p className="mt-4 sm:mt-5 text-sm sm:text-[15px] leading-6 sm:leading-8 text-white/80">
                      {service.description}
                    </p>

                    <div className="mt-8 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#161d35]">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>
                </div>
             </motion.div>
            );
          })}
        </div>

        <motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
  className="mt-12 sm:mt-16 flex justify-center"
>
  <motion.button
    whileHover={{ scale: 1.04 }}
    whileTap={{ scale: 0.98 }}
    className="group flex items-center gap-3 bg-[#161d35] px-6 py-4 sm:px-8 text-white font-medium tracking-wide transition-all duration-300 hover:bg-[#C7954A]"
  >
    <span>See All Services</span>

    <motion.div
      animate={{ x: [0, 6, 0] }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <ArrowRight size={18} />
    </motion.div>
  </motion.button>
</motion.div>
      </div>
    </section>
  );
}