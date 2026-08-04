import Hero from "../../../compontents/about/HomeSection";
import Brand from "../../../compontents/home/BrandCarousel";
import ProblemSaction from "../../../compontents/about/ProblemSection";
import OriginSection from "../../../compontents/about/OriginSection";
import Verifiedsection from "../../../compontents/about/Verifiedsection";
import TrustSaction from "../../../compontents/home/TrustSaction";
import Testimonial from "../../../compontents/home/Testimonial";
import FaqSection from "../../../compontents/home/FaqSection";
import { getSeo } from "@/lib/getSeo";

export async function generateMetadata() {
  const seo = await getSeo("about");

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

export default async function AboutPage() {
  const seo = await getSeo("about");

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
        <ProblemSaction />
        <OriginSection />
        <Verifiedsection />
        <TrustSaction />
        <Testimonial />
        <FaqSection />
      </div>
    </>
  );
}