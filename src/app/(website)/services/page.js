import Hero from "../../../compontents/services/HeroSection";
import Brand from "../../../compontents/home/BrandCarousel";
import ServicesCoverageSection from "../../../compontents/services/ServicesCoverageSection";
import WhoWeServe from "../../../compontents/home/WhoWeServe";
import Testimonial from "../../../compontents/home/Testimonial";
import Faq from "../../../compontents/home/FaqSection";
import { getSeo } from "@/lib/getSeo";

const servicesFaqs = [
  {
    q: "What legal services do you provide?",
    a: "We help businesses with founder agreements, employment contracts, vendor agreements, privacy policies, terms of service, compliance support, fundraising documents, and other essential legal documentation.",
  },
  {
    q: "Can you customise documents for my business?",
    a: "Yes. Every document is tailored to your business model, industry, and specific legal requirements instead of using generic templates.",
  },
  {
    q: "How long does it take to prepare a document?",
    a: "The timeline depends on the complexity of the document. Standard agreements are usually delivered within a few business days, while customised documents may require additional time.",
  },
  {
    q: "Are the documents legally reviewed?",
    a: "Yes. All documents are prepared or reviewed by experienced legal professionals to ensure they are accurate, compliant, and suitable for your business.",
  },
  {
    q: "Do you provide ongoing legal support?",
    a: "Yes. We offer ongoing legal assistance, document updates, compliance reminders, and business legal support through our subscription plans.",
  },
];

export async function generateMetadata() {
  const seo = await getSeo("services");

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

export default async function ServicesPage() {
  const seo = await getSeo("services");

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
        <ServicesCoverageSection />
        <WhoWeServe />
        <Testimonial />
        <Faq
          title="Services FAQs"
          subtitle="Common questions about our legal services"
          faqs={servicesFaqs}
        />
      </div>
    </>
  );
}