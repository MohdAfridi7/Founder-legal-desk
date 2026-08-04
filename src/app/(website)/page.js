import Hero from "../../compontents/home/HeroSection";
import SoundFamiliar from "../../compontents/home/SoundFamiliar"
import Services from "../../compontents/home/Services";
import WorkProcessSection from "../../compontents/home/WorkProcessSection";
import FeaturesSection from "../../compontents/home/FeaturesSection";
import WhoWeServe from "../../compontents/home/WhoWeServe";
import WhyUs from "../../compontents/home/WhyUs";
import Trust from "../../compontents/home/TrustSaction";
import Clientportfolio from "../../compontents/home/ClientPortfolio";
import Brand from "../../compontents/home/BrandCarousel"
import Price from "../../compontents/home/Price"
import AddOnSaction from "../../compontents/home/AddOn"
import Testimonial from "../../compontents/home/Testimonial"
import Faq from "../../compontents/home/FaqSection"

export async function generateMetadata() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/seo?pageName=home`,
    { next: { revalidate: 3600 } }
  );
  const data = await res.json();
  const seo = data.success ? data.seo : null;

  if (!seo) return {};

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.metaKeywords,
    alternates: { canonical: seo.canonicalUrl },
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

export default async function Home() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/seo?pageName=home`,
    { next: { revalidate: 3600 } }
  );
  const data = await res.json();
  const seo = data.success ? data.seo : null;

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
        <SoundFamiliar />
        <FeaturesSection />
        <Services />
        <WhoWeServe />
        <Trust />
        <Clientportfolio />
        <WorkProcessSection />
        <WhyUs />
        <Testimonial />
        <Price />
        <AddOnSaction />
        <Faq />
      </div>
    </>
  );
}