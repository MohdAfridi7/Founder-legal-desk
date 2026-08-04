import HeroSection from "@/compontents/blog/HeroSection";
import BlogCard from "@/compontents/blog/BlogCard";

export const metadata = {
  title: "Blogs",
  description: "Latest Legal Articles and Updates",
};

export default function BlogPage() {
  return (
    <>
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
    </>
  );
}