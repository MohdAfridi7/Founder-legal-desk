import Link from "next/link";
import Image from "next/image";
import { getBlog, getRelatedBlogs } from "@/lib/getBlog";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock3, User } from "lucide-react";





export async function generateMetadata({ params }) {
  const { slug } = await params;
 const blog = await getBlog(slug);

if (!blog) {
  return {
    title: "Blog Not Found",
  };
}
  return {
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription,
    keywords: blog.keywords,
  };
}

export default async function BlogDetails({ params }) {
  const { slug } = await params;
 const blog = await getBlog(slug);

if (!blog) notFound();

const relatedBlogs = await getRelatedBlogs(blog._id);

  return (
    <section className="bg-white">
     <style>{`
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .fade-up {
    animation: fadeUp 0.6s ease forwards;
    opacity: 0;
  }

  /* Quill output classes — prose doesn't know these */
  .blog-content .ql-align-center { text-align: center; }
  .blog-content .ql-align-right { text-align: right; }
  .blog-content .ql-align-justify { text-align: justify; }

  .blog-content .ql-indent-1 { margin-left: 1.5rem; }
  .blog-content .ql-indent-2 { margin-left: 3rem; }
  .blog-content .ql-indent-3 { margin-left: 4.5rem; }
  .blog-content .ql-indent-4 { margin-left: 6rem; }

  .blog-content .ql-size-small { font-size: 0.85em; }
  .blog-content .ql-size-large { font-size: 1.4em; }
  .blog-content .ql-size-huge { font-size: 2em; }

  .blog-content strong { font-weight: 700; }
  .blog-content em { font-style: italic; }
  .blog-content u { text-decoration: underline; }
  .blog-content s { text-decoration: line-through; }
`}</style>

      {/* Full-width hero image with overlay content */}
      <div className="relative h-[70vh] min-h-[420px] w-full overflow-hidden sm:h-[85vh] md:h-[95vh]">
        <Image
          src={blog.featuredImage}
          alt={blog.title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />

        {/* dark gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1739] via-[#0B1739]/60 to-[#0B1739]/10" />

       <div className="absolute inset-0 flex flex-col justify-end">
  <div className="container mx-auto px-4 pb-10 sm:px-5 md:pb-14">
    <Link
      href="/blog"
      className="fade-up mb-4 inline-flex w-fit items-center gap-2 text-sm font-medium text-white/90 transition-transform duration-200 hover:-translate-x-1 hover:text-white"
      style={{ animationDelay: "0ms" }}
    >
      <ArrowLeft size={18} />
      Back to Blogs
    </Link>

    <div>
      <span
        className="fade-up inline-block rounded-full bg-[#C7954A] px-4 py-1.5 text-sm font-semibold text-white"
        style={{ animationDelay: "80ms" }}
      >
        {blog.category}
      </span>
    </div>

    <h1
      className="fade-up mt-5 max-w-4xl text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
      style={{ animationDelay: "160ms" }}
    >
      {blog.title}
    </h1>

    {blog.shortDescription && (
      <p
        className="fade-up mt-5 max-w-2xl text-base leading-relaxed text-gray-200 sm:text-lg"
        style={{ animationDelay: "240ms" }}
      >
        {blog.shortDescription}
      </p>
    )}

    <div
      className="fade-up mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-gray-200"
      style={{ animationDelay: "320ms" }}
    >
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
          <User size={14} />
        </div>
        <span className="text-sm font-medium">{blog.author}</span>
      </div>

      <div className="flex items-center gap-1.5 text-sm">
        <CalendarDays size={15} className="text-[#C7954A]" />
        {new Date(blog.date || blog.createdAt).toLocaleDateString(
          "en-US",
          { year: "numeric", month: "long", day: "numeric" }
        )}
      </div>

      {blog.readTime && (
        <div className="flex items-center gap-1.5 text-sm">
          <Clock3 size={15} className="text-[#C7954A]" />
          {blog.readTime}
        </div>
      )}
    </div>
  </div>
</div>
      </div>

      {/* Below hero: two-section layout */}
      <div className="container mx-auto px-4 py-12 sm:px-5 md:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left: full description */}
          <div className="min-w-0 lg:col-span-8">
            <div
  className="fade-up prose prose-lg max-w-none break-words blog-content prose-headings:text-[#0B1739] prose-a:text-[#C7954A] prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl prose-img:shadow-md"
  style={{ animationDelay: "0ms" }}
  dangerouslySetInnerHTML={{ __html: blog.description }}
/>

            {Array.isArray(blog.tags) && blog.tags.length > 0 && (
              <div className="fade-up mt-10 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-8">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-600 transition-colors duration-200 hover:border-[#C7954A] hover:bg-[#C7954A]/5 hover:text-[#C7954A]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Right: sticky related blogs */}
          <aside className="lg:col-span-4">
            <div className="fade-up rounded-2xl border border-gray-100 bg-gray-50 p-5 transition-shadow duration-300 hover:shadow-lg lg:sticky lg:top-24">
              <h3 className="mb-4 text-lg font-bold text-[#0B1739]">
                Related Articles
              </h3>

              {relatedBlogs.length === 0 ? (
                <p className="text-sm text-gray-400">
                  No related articles yet.
                </p>
              ) : (
              <div className="flex flex-col divide-y divide-gray-100">
  {relatedBlogs.map((item) => (
    <Link
      key={item._id}
      href={`/blog/${item.slug}`}
      className="group flex gap-4 p-3 transition-colors hover:bg-[#0B1739]/5"
    >
      <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-lg">
        <Image
          src={item.featuredImage}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="min-w-0">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-[#C7954A]">
          {item.category}
        </span>

        <h4 className="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-[#0B1739] group-hover:text-[#C7954A]">
          {item.title}
        </h4>

        <span className="mt-2 flex items-center gap-1 text-xs text-gray-500">
          <Clock3 size={12} />
          {item.readTime}
        </span>
      </div>
    </Link>
  ))}
</div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}