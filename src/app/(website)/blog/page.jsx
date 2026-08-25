import HeroSection from "@/compontents/blog/HeroSection";
import BlogCard from "@/compontents/blog/BlogCard";
import { getSeo } from "@/lib/getSeo";

export const revalidate = 60;

export async function generateMetadata() {
  const seo = await getSeo("blog");

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

export default async function BlogPage() {
  const seo = await getSeo("blog");

  return (
    <>
      {seo?.schemaJson && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: seo.schemaJson,
          }}
        />
      )}

      <div className="min-h-screen bg-white">
        <HeroSection
          badge="Latest Articles"
          title="Legal Insights & Resources"
          description="Stay informed with expert legal insights, practical business guidance, compliance updates, and answers to common legal questions."
        />

        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-5">
            <BlogCard />
          </div>
        </section>
      </div>
    </>
  );
}