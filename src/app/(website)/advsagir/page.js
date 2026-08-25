import Hero from "../../../compontents/profile/Hero";
import Ticker from "../../../compontents/profile/Ticker";
import About from "../../../compontents/profile/About";
import PracticeAreas from "../../../compontents/profile/PracticeAreas";
import Experience from "../../../compontents/profile/Experience";
import Education from "../../../compontents/profile/Education";
import Skills from "../../../compontents/profile/Skills";

import { getSeo } from "@/lib/getSeo";

export const revalidate = 60;

export async function generateMetadata() {
  const seo = await getSeo("advsagir");

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

export default async function SagirAhmadProfile() {
  const seo = await getSeo("advsagir");

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

      <div className="relative bg-[#f4efe2] text-[#0b1a2e] font-sans overflow-x-hidden">
        <Hero />
        <Ticker />
        <About />
        <PracticeAreas />
        <Experience />
        <Education />
        <Skills />
      </div>
    </>
  );
}