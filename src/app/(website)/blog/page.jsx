import HeroSection from "@/compontents/blog/HeroSection";
import BlogCard from "@/compontents/blog/BlogCard";
import { getSeo } from "@/lib/getSeo";
import { getAllBlogsLite } from "@/lib/getBlog";

export const revalidate = 60;

const FALLBACK_TITLE = "Legal Insights & Resources";
const FALLBACK_DESCRIPTION =
  "Expert legal insights, practical business guidance, compliance updates, and answers to common legal questions for Indian founders.";

// schemaJson DB me string ya object, kuch bhi ho sakta hai (default {} hai)
function getSchemaString(schemaJson) {
  if (!schemaJson) return null;

  if (typeof schemaJson === "string") {
    return schemaJson.trim() || null;
  }

  if (typeof schemaJson === "object" && Object.keys(schemaJson).length > 0) {
    return JSON.stringify(schemaJson);
  }

  return null;
}

export async function generateMetadata() {
  const seo = await getSeo("blog");

  if (!seo) {
    return {
      title: FALLBACK_TITLE,
      description: FALLBACK_DESCRIPTION,
      alternates: { canonical: "/blog" },
    };
  }

  const title = seo.metaTitle || FALLBACK_TITLE;
  const description = seo.metaDescription || FALLBACK_DESCRIPTION;

  return {
    title,
    description,
    keywords: seo.metaKeywords || undefined,

    alternates: {
      canonical: seo.canonicalUrl || "/blog",
    },

    openGraph: {
      type: "website",
      url: seo.canonicalUrl || "/blog",
      title: seo.ogTitle || title,
      description: seo.ogDescription || description,
      images: seo.ogImage ? [seo.ogImage] : [],
    },

    twitter: {
      card: "summary_large_image",
      title: seo.twitterTitle || seo.ogTitle || title,
      description:
        seo.twitterDescription || seo.ogDescription || description,
      images: seo.twitterImage
        ? [seo.twitterImage]
        : seo.ogImage
        ? [seo.ogImage]
        : [],
    },
  };
}

export default async function BlogPage() {
  // Blogs ab server par aate hain, taaki Google ko links HTML me dikhein
  const [seo, blogs] = await Promise.all([
    getSeo("blog"),
    getAllBlogsLite(),
  ]);

  const schema = getSchemaString(seo?.schemaJson);

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: schema.replace(/</g, "\\u003c"),
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
            <BlogCard initialBlogs={blogs} />
          </div>
        </section>
      </div>
    </>
  );
}