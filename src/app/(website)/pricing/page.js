import Hero from "../../../compontents/pricing/HeroSection";
import Brand from "../../../compontents/home/BrandCarousel";
import PricingPlanSection from "../../../compontents/pricing/PricingPlanSection";
import AddOn from "../../../compontents/home/AddOn";
import PricingQuoteCTA from "../../../compontents/pricing/PricingQuoteCTA";
import Testimonial from "../../../compontents/home/Testimonial";
import Faq from "../../../compontents/home/FaqSection";
import { getSeo } from "@/lib/getSeo";

const pricingFaqs = [
  {
    q: "Why is the specialist fee billed separately?",
    a: "Founders Legal Desk Pvt Ltd charges a platform fee for matching, coordination, and document infrastructure. The specialist who prepares your document charges a separate professional fee in their own name. These are two distinct services, billed separately. Your total cost is the platform fee plus the specialist fee — equal amounts."
  },
  {
    q: "Can I cancel my subscription?",
    a: "Yes. Monthly plans can be cancelled with 30 days' notice. Annual plans are non-refundable but can be paused for up to 60 days in a year. Documents already delivered are yours."
  },
  {
    q: "What if I need something not listed in my plan?",
    a: "Tell us. We will either cover it under your existing plan or quote it as a fixed-price add-on. We do not retroactively bill for scope."
  },
  {
    q: "Is there a setup fee?",
    a: "No setup fee on any plan."
  },
  {
    q: "What happens after I choose a plan?",
    a: "You fill a short onboarding form telling us about your business. We assign your specialist. You submit your first document requirement — and receive your reviewed, verified document within the SLA."
  },
];

export async function generateMetadata() {
  const seo = await getSeo("pricing");

  if (!seo) return {};

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.metaKeywords,
    alternates: {
      canonical: seo.canonicalUrl,
    },
    openGraph: {
      title: seo.ogTitle,
      description: seo.ogDescription,
      images: seo.ogImage ? [seo.ogImage] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.twitterTitle,
      description: seo.twitterDescription,
      images: seo.twitterImage ? [seo.twitterImage] : [],
    },
  };
}

export default async function PricingPage() {
  const seo = await getSeo("pricing");

  return (
    <>
      {seo?.schemaJson && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: seo.schemaJson }}
        />
      )}

      <div className="min-h-screen bg-white">
        <Hero />
        <Brand />
        <PricingPlanSection />
        <AddOn />
        <Testimonial />
        <PricingQuoteCTA />

        <Faq
          title="Pricing FAQs"
          subtitle="Questions related to plans and pricing"
          faqs={pricingFaqs}
        />
      </div>
    </>
  );
}