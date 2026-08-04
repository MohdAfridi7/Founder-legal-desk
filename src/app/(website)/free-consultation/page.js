import Hero from "../../../compontents/free-consultation/Herosection";
import Brand from "../../../compontents/home/BrandCarousel";
import FormSection from "../../../compontents/free-consultation/FormSection";
import Consultationintrocards from "../../../compontents/free-consultation/Consultationintrocards";
import Testimonial from "../../../compontents/home/Testimonial";
import FaqSection from "../../../compontents/home/FaqSection";

export async function generateMetadata() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/seo?pageName=free-consultation`,
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
    `${process.env.NEXT_PUBLIC_API_URL}/api/seo?pageName=free-consultation`,
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
        <Consultationintrocards />
        <FormSection />
        <Testimonial />
        <FaqSection />
      </div>
    </>
  );
}