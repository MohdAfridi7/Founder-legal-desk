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

  /* --- FIX: these were fixed em multipliers (1.4em / 2em). On desktop's
     larger prose-lg base that's fine, but on a narrow phone screen the
     same multiplier renders visually huge. clamp() scales them smoothly
     between a sane mobile minimum and the original desktop size. --- */
  .blog-content .ql-size-large { font-size: clamp(1.05rem, 1rem + 1vw, 1.4em); }
  .blog-content .ql-size-huge { font-size: clamp(1.15rem, 1rem + 2vw, 2em); }

  /* --- FIX: Quill (and pasted Word content) often emits hardcoded inline
     font-size in px directly on spans/paragraphs, e.g. style="font-size:32px".
     Inline styles beat every class-based rule below by CSS specificity, so
     none of the responsive sizing above could touch them — this was the
     main cause of "text bahut badi" on phone. We cap it on small screens. --- */
  @media (max-width: 640px) {
    .blog-content [style*="font-size"] {
      font-size: 1.05rem !important;
      line-height: 1.65 !important;
    }
  }

  /* Headings inside the body content itself (not the hero h1) — Tailwind's
     default prose heading scale is desktop-sized; clamp keeps it readable
     on phones without a media query per breakpoint. */
  .blog-content h1 { font-size: clamp(1.5rem, 1.1rem + 3vw, 2.5rem); }
  .blog-content h2 { font-size: clamp(1.3rem, 1rem + 2.2vw, 2rem); }
  .blog-content h3 { font-size: clamp(1.15rem, 0.95rem + 1.6vw, 1.5rem); }
  .blog-content h4 { font-size: clamp(1.05rem, 0.9rem + 1vw, 1.25rem); }

  .blog-content strong { font-weight: 700; }
  .blog-content em { font-style: italic; }
  .blog-content u { text-decoration: underline; }
  .blog-content s { text-decoration: line-through; }

  /* --- FIX: Quill tables overflow on mobile / behind sticky sidebar --- */
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

  /* long unbreakable words/links inside prose shouldn't blow out the layout */
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
`}</style>

      {/*
        Full-width hero image with overlay content.

        FIX: instead of a fixed/min-height container with an absolutely
        positioned content overlay (which made the image height independent
        of the text — long titles/descriptions used to overflow upward past
        the hero), we use CSS grid stacking:
          - both the image layer and the content layer sit in the SAME
            grid cell (col-start-1 row-start-1)
          - the content layer is in normal flow, so its natural height
            (title + description + meta) sets the grid row's height
          - the image layer stretches (h-full) to match that row height
        Result: hero height always auto-follows the content, and the image
        always covers exactly the area behind the text — no overflow, no
        clipping. `minmax(…, auto)` keeps a sensible minimum height when
        content is short, while letting it grow when content is long.
      */}
      <div
        className="relative grid w-full overflow-hidden"
        style={{
          gridTemplateColumns: "1fr",
          gridTemplateRows: "minmax(480px, auto)",
        }}
      >
        {/* Image layer */}
        <div className="relative col-start-1 row-start-1 h-full w-full">
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
        </div>

        {/*
          Content layer — normal flow (not absolute), so it defines the
          grid row's auto height. pt-24/28/32 keeps it clear of the
          fixed/sticky navbar regardless of content length.
        */}
        <div className="relative z-10 col-start-1 row-start-1 flex flex-col justify-end pt-24 sm:pt-28 md:pt-32">
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
                className="fade-up inline-block rounded-full bg-[#C7954A] px-4 py-1.5 text-xs font-semibold text-white sm:text-sm"
                style={{ animationDelay: "80ms" }}
              >
                {blog.category}
              </span>
            </div>

            <h1
              className="fade-up mt-5 max-w-4xl break-words text-2xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
              style={{ animationDelay: "160ms" }}
            >
              {blog.title}
            </h1>

            {blog.shortDescription && (
              <p
                className="fade-up mt-5 max-w-2xl text-sm leading-relaxed text-gray-200 sm:text-base md:text-lg"
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
              className="fade-up prose prose-sm sm:prose-base md:prose-lg max-w-none break-words blog-content prose-headings:text-[#0B1739] prose-a:text-[#C7954A] prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl prose-img:shadow-md"
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