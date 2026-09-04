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
  .blog-content .ql-size-large { font-size: clamp(1.05rem, 1rem + 1vw, 1.4em); }
  .blog-content .ql-size-huge { font-size: clamp(1.15rem, 1rem + 2vw, 2em); }

  @media (max-width: 640px) {
    .blog-content [style*="font-size"] {
      font-size: 1.05rem !important;
      line-height: 1.65 !important;
    }
  }

  /* Headings inside the body content — stay dark/navy, untouched by the
     gray body-text rule below */
  .blog-content h1 { font-size: clamp(1.5rem, 1.1rem + 3vw, 2.5rem); }
  .blog-content h2 { font-size: clamp(1.3rem, 1rem + 2.2vw, 2rem); }
  .blog-content h3 { font-size: clamp(1.15rem, 0.95rem + 1.6vw, 1.5rem); }
  .blog-content h4 { font-size: clamp(1.05rem, 0.9rem + 1vw, 1.25rem); }

  .blog-content em { font-style: italic; }
  .blog-content u { text-decoration: underline; }
  .blog-content s { text-decoration: line-through; }

  /* Quill tables overflow on mobile / behind sticky sidebar */
  .blog-content table {
    display: block;
    width: 100%;
    max-width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    border-collapse: collapse;
    margin: 1.5rem 0;
  }
  .blog-content table tbody,
  .blog-content table thead,
  .blog-content table tr {
    display: table;
    width: 100%;
    table-layout: fixed;
  }
  .blog-content table th,
  .blog-content table td {
    border: 1px solid #e5e7eb;
    padding: 0.6rem 0.9rem;
    white-space: normal;
    word-break: break-word;
    overflow-wrap: anywhere;
    vertical-align: top;
  }
  .blog-content table th {
    background-color: #f9fafb;
    font-weight: 700;
    text-align: left;
  }

  .blog-content img,
  .blog-content iframe,
  .blog-content video {
    max-width: 100%;
    height: auto;
  }
  .blog-content pre,
  .blog-content code {
    max-width: 100%;
    overflow-x: auto;
    word-break: break-word;
    white-space: pre-wrap;
  }
  .blog-content a {
    overflow-wrap: anywhere;
  }

  /* Body text (paragraphs, list items etc.) — gray. Headings are NOT
     included here, so they keep their navy/black color from
     prose-headings:text-[#0B1739] in the JSX. */
  .blog-content p,
  .blog-content li,
  .blog-content div,
  .blog-content span {
    color: #4b5563 !important;
  }

  .blog-content strong,
  .blog-content b {
    color: #0B1739 !important;
    font-weight: 700;
  }
`}</style>

      {/* pt clears the fixed/sticky navbar, pb replaces the old hero-section bottom spacing */}
      <div className="container mx-auto px-4 pb-12 pt-24 sm:px-5 sm:pt-28 md:pb-16 md:pt-32">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left: stacked content — back link, title, image, meta, desc, tags */}
          <div className="min-w-0 lg:col-span-8">
            <Link
              href="/blog"
              className="fade-up mb-4 inline-flex w-fit items-center gap-2 text-sm font-medium text-gray-500 transition-transform duration-200 hover:-translate-x-1 hover:text-[#C7954A]"
              style={{ animationDelay: "0ms" }}
            >
              <ArrowLeft size={18} />
              Back to Blogs
            </Link>

            <h1
              className="fade-up mt-2 max-w-4xl break-words text-2xl font-bold leading-tight text-[#0B1739] sm:text-3xl md:text-4xl"
              style={{ animationDelay: "80ms" }}
            >
              {blog.title}
            </h1>

            {/* Image with category badge overlaid on top-left of the image */}
            <div
              className="fade-up relative mt-6 w-full overflow-hidden rounded-2xl"
              style={{ animationDelay: "160ms" }}
            >
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={blog.featuredImage}
                  alt={blog.title}
                  fill
                  sizes="(min-width: 1024px) 66vw, 100vw"
                  className="object-cover"
                  priority
                />
              </div>

              <span className="absolute left-4 top-4 rounded-full bg-[#C7954A] px-4 py-1.5 text-xs font-semibold text-white shadow-md sm:text-sm">
                {blog.category}
              </span>
            </div>

            {/* Author / date / read time — below the image */}
            <div
              className="fade-up mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-gray-600"
              style={{ animationDelay: "240ms" }}
            >
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0B1739]/5">
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

            {/* Short description */}
            {blog.shortDescription && (
              <p
                className="fade-up mt-6 text-sm leading-relaxed text-gray-600 sm:text-base md:text-lg"
                style={{ animationDelay: "320ms" }}
              >
                {blog.shortDescription}
              </p>
            )}

            {/* Full description */}
            <div
              className="fade-up prose prose-sm sm:prose-base md:prose-lg mt-8 max-w-none break-words blog-content prose-headings:text-[#0B1739] prose-a:text-[#C7954A] prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl prose-img:shadow-md"
              style={{ animationDelay: "400ms" }}
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

          {/* Right: sticky related blogs (unchanged) */}
          <aside className="lg:col-span-4">
            <div className="fade-up rounded-2xl border border-gray-100 bg-[#F4EDE7] p-5 transition-shadow duration-300 hover:shadow-lg lg:sticky lg:top-24">
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