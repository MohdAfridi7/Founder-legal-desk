import Link from "next/link";
import Image from "next/image";
import { getBlog, getRelatedBlogs } from "@/lib/getBlog";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  User,
} from "lucide-react";

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

  /*
   * ---------------------------------------------------------
   * Wrap Quill tables inside a responsive container.
   *
   * This prevents the entire page from overflowing on mobile.
   * Only the table itself becomes horizontally scrollable.
   * ---------------------------------------------------------
   */
  const formattedDescription = blog.description
   ?.replace(/&nbsp;/g, " ") 
    ?.replace(
      /<table(\s[^>]*)?>/gi,
      '<div class="table-scroll"><table$1>'
    )
    ?.replace(
      /<\/table>/gi,
      "</table></div>"
    );

  return (
    <section className="bg-white">
      <style>{`
        /* =====================================================
           BLOG ARTICLE
           PROFESSIONAL TYPOGRAPHY SYSTEM
        ===================================================== */

        .blog-content {
          width: 100%;
          max-width: 100%;
          min-width: 0;

          color: #4b5563;
          font-size: 1.05rem;
          line-height: 1.85;
          letter-spacing: -0.01em;

          overflow-wrap: break-word;
          word-break: normal;
        }

        /* =====================================================
           ANIMATION
        ===================================================== */

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fade-up {
          animation: fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1)
            forwards;
          opacity: 0;
        }

        /* =====================================================
           HEADINGS
        ===================================================== */

        .blog-content h1,
        .blog-content h2,
        .blog-content h3,
        .blog-content h4,
        .blog-content h5,
        .blog-content h6 {
          color: #0B1739 !important;
          font-weight: 750;
          letter-spacing: -0.025em;
          line-height: 1.25;

          overflow-wrap: break-word;
          word-break: normal;
        }

        .blog-content h1 {
          font-size: clamp(
            1.75rem,
            1.25rem + 2.5vw,
            2.75rem
          );

          margin: 2.5rem 0 1.25rem;
        }

        .blog-content h2 {
          font-size: clamp(
            1.5rem,
            1.15rem + 1.8vw,
            2.1rem
          );

          margin: 2.4rem 0 1rem;
        }

        .blog-content h3 {
          font-size: clamp(
            1.3rem,
            1.05rem + 1.2vw,
            1.65rem
          );

          margin: 2rem 0 0.85rem;
        }

        .blog-content h4 {
          font-size: clamp(
            1.15rem,
            1rem + 0.7vw,
            1.35rem
          );

          margin: 1.75rem 0 0.75rem;
        }

        .blog-content h5 {
          font-size: 1.1rem;
          margin: 1.5rem 0 0.65rem;
        }

        .blog-content h6 {
          font-size: 1rem;
          margin: 1.4rem 0 0.6rem;
        }

        .blog-content
          > h1:first-child,
        .blog-content
          > h2:first-child,
        .blog-content
          > h3:first-child {
          margin-top: 0;
        }

        /* =====================================================
           PARAGRAPHS
        ===================================================== */

        .blog-content p {
          margin: 0 0 1.25rem;

    color: #6B7280 !important;

          font-size: inherit;
          line-height: 1.85;

          overflow-wrap: break-word;
        }

        .blog-content p span {
  color: #6B7280 !important;
}

        .blog-content p:last-child {
          margin-bottom: 0;
        }

        .blog-content p:empty {
          min-height: 0.75rem;
        }

        /* =====================================================
           TEXT FORMATTING
        ===================================================== */

        .blog-content strong,
        .blog-content b {
          color: #0B1739 !important;
          font-weight: 750;
        }

        .blog-content em {
          font-style: italic;
        }

        .blog-content u {
          text-decoration: underline;
          text-decoration-thickness: 1px;
          text-underline-offset: 3px;
        }

        .blog-content s {
          text-decoration: line-through;
        }

        .blog-content mark {
          background: rgba(199, 149, 74, 0.18);
          color: #0B1739;

          padding: 0.08em 0.25em;
          border-radius: 0.25rem;
        }

        /* =====================================================
           LINKS
        ===================================================== */

        .blog-content a {
          color: #B47F32 !important;
          font-weight: 600;

          text-decoration: underline;
          text-decoration-color: rgba(
            180,
            127,
            50,
            0.35
          );

          text-decoration-thickness: 1px;
          text-underline-offset: 3px;

          transition:
            color 0.2s ease,
            text-decoration-color 0.2s ease;

          overflow-wrap: break-word;
        }

        .blog-content a:hover {
          color: #0B1739 !important;
          text-decoration-color: #0B1739;
        }

       /* =====================================================
   LISTS
===================================================== */

.blog-content ul,
.blog-content ol {
  margin: 1.25rem 0 1.5rem;
  padding-left: 1.7rem;

  color: #6B7280 !important;
}

.blog-content ul {
  list-style-type: disc;
}

.blog-content ol {
  list-style-type: decimal;
}

.blog-content li {
  margin: 0.45rem 0;
  padding-left: 0.35rem;

  color: #6B7280 !important;

  line-height: 1.75;
  overflow-wrap: break-word;
  word-break: normal;
}

/* Quill span text */
.blog-content li span {
  color: #6B7280 !important;
}

/* Bullet / Number color */
.blog-content li::marker {
  color: #C7954A !important;
  font-weight: 700;
}

.blog-content li > ul,
.blog-content li > ol {
  margin-top: 0.45rem;
  margin-bottom: 0.45rem;
}

        /* =====================================================
           QUILL ALIGNMENT
        ===================================================== */

        .blog-content .ql-align-center {
          text-align: center !important;
        }

        .blog-content .ql-align-right {
          text-align: right !important;
        }

        .blog-content .ql-align-left {
          text-align: left !important;
        }

        .blog-content .ql-align-justify {
          text-align: justify !important;
        }

        /* =====================================================
           QUILL INDENT
        ===================================================== */

        .blog-content .ql-indent-1 {
          margin-left: 1.5rem;
        }

        .blog-content .ql-indent-2 {
          margin-left: 3rem;
        }

        .blog-content .ql-indent-3 {
          margin-left: 4.5rem;
        }

        .blog-content .ql-indent-4 {
          margin-left: 6rem;
        }

        .blog-content .ql-indent-5 {
          margin-left: 7.5rem;
        }

        .blog-content .ql-indent-6 {
          margin-left: 9rem;
        }

        /* =====================================================
           QUILL FONT SIZES
        ===================================================== */

        .blog-content .ql-size-small {
          font-size: 0.85em;
        }

        .blog-content .ql-size-large {
          font-size: clamp(
            1.1rem,
            1rem + 0.8vw,
            1.4rem
          );
        }

        .blog-content .ql-size-huge {
          font-size: clamp(
            1.3rem,
            1rem + 1.8vw,
            2rem
          );
        }

        /*
          Do NOT override Quill inline font-size values.
          This keeps editor formatting intact.
        */

        .blog-content [style*="font-size"] {
          max-width: 100%;
        }

        /* =====================================================
           BLOCKQUOTE
        ===================================================== */

        .blog-content blockquote {
          margin: 2rem 0;

          padding: 1.25rem 1.5rem 1.25rem 1.75rem;

          border-left: 4px solid #C7954A;

          border-radius:
            0
            0.75rem
            0.75rem
            0;

          background: linear-gradient(
            90deg,
            rgba(199, 149, 74, 0.08),
            rgba(199, 149, 74, 0.025)
          );

          color: #24304A !important;

          font-size: 1.08em;
          font-style: italic;
          line-height: 1.75;
        }

        .blog-content blockquote p {
          margin-bottom: 0;
          color: #24304A !important;
        }

        /* =====================================================
           HORIZONTAL RULE
        ===================================================== */

        .blog-content hr {
          margin: 2.5rem 0;

          border: 0;
          border-top: 1px solid #e5e7eb;
        }

        /* =====================================================
           IMAGES
        ===================================================== */

        .blog-content img {
          display: block;

          width: auto;
          max-width: 100%;
          height: auto;

          margin: 2rem auto;

          border-radius: 0.9rem;

          box-shadow:
            0 10px 30px rgba(11, 23, 57, 0.08),
            0 2px 8px rgba(11, 23, 57, 0.04);
        }

        .blog-content figure {
          margin: 2rem 0;
        }

        .blog-content figcaption {
          margin-top: -1rem;

          color: #6b7280;

          font-size: 0.85rem;
          line-height: 1.5;

          text-align: center;
        }

        /* =====================================================
           VIDEO / IFRAME
        ===================================================== */

        .blog-content iframe,
        .blog-content video {
          display: block;

          width: 100%;
          max-width: 100%;

          margin: 2rem auto;

          border: 0;
          border-radius: 0.9rem;
        }

        .blog-content iframe {
          min-height: 320px;
        }

        .blog-content video {
          height: auto;
        }

        /* =====================================================
           RESPONSIVE TABLE
        ===================================================== */

        /*
          IMPORTANT:

          Never put overflow-x directly on the table.
          The wrapper handles horizontal scrolling.
        */

        .blog-content .table-scroll {
          width: 100%;
          max-width: 100%;

          margin: 2rem 0;

          overflow-x: auto;
          overflow-y: hidden;

          -webkit-overflow-scrolling: touch;

          overscroll-behavior-x: contain;

          scrollbar-width: thin;

          scrollbar-color:
            #cbd5e1
            transparent;
        }

        .blog-content .table-scroll table {
          width: 100%;

          /*
            Table can be wider than mobile viewport,
            but ONLY the wrapper scrolls.
          */
          min-width: 600px;

          margin: 0;

          border-collapse: separate;
          border-spacing: 0;

          background: #ffffff;

          font-size: 0.95rem;
          line-height: 1.6;
        }

      .blog-content .table-scroll th,
.blog-content .table-scroll td {
  padding: 0.75rem 0.9rem;

  border: 1px solid #e5e7eb !important;

  text-align: left;
  vertical-align: top;

  white-space: normal;

  overflow-wrap: anywhere;
  word-break: break-word;
}

        /* Left border */
        .blog-content
          .table-scroll
          tr
          th:first-child,
        .blog-content
          .table-scroll
          tr
          td:first-child {
          border-left: 1px solid #e5e7eb;
        }

        /* Top border */
        .blog-content
          .table-scroll
          thead
          tr:first-child
          th,
        .blog-content
          .table-scroll
          tbody
          tr:first-child
          td {
          border-top: 1px solid #e5e7eb;
        }

        /* Header */
        .blog-content .table-scroll th {
          background: #f8fafc;

          color: #0B1739 !important;

          font-weight: 700;
        }

        /* Body */
        .blog-content .table-scroll td {
          color: #4b5563 !important;
        }

        /* Alternate rows */
        .blog-content
          .table-scroll
          tbody
          tr:nth-child(even)
          td {
          background: #fcfcfd;
        }

        /* Hover */
        .blog-content
          .table-scroll
          tbody
          tr:hover
          td {
          background: rgba(
            199,
            149,
            74,
            0.045
          );
        }

        /* Rounded corners */
        .blog-content
          .table-scroll
          thead
          tr:first-child
          th:first-child {
          border-top-left-radius: 8px;
        }

        .blog-content
          .table-scroll
          thead
          tr:first-child
          th:last-child {
          border-top-right-radius: 8px;
        }

        .blog-content
          .table-scroll
          tbody
          tr:last-child
          td:first-child {
          border-bottom-left-radius: 8px;
        }

        .blog-content
          .table-scroll
          tbody
          tr:last-child
          td:last-child {
          border-bottom-right-radius: 8px;
        }

        /* Remove unwanted black outer border */
.blog-content .table-scroll table {
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
}

/* Keep only subtle gray cell borders */
.blog-content .table-scroll th,
.blog-content .table-scroll td {
  border-color: #e5e7eb !important;
}

        /* =====================================================
           CODE
        ===================================================== */

        .blog-content code {
          padding: 0.15rem 0.4rem;

          border-radius: 0.35rem;

          background: #f3f4f6;

          color: #0B1739;

          font-size: 0.88em;

          font-family:
            ui-monospace,
            SFMono-Regular,
            Menlo,
            Monaco,
            Consolas,
            "Liberation Mono",
            monospace;

          overflow-wrap: break-word;
        }

        .blog-content pre {
          max-width: 100%;

          margin: 1.75rem 0;

          padding: 1.25rem;

          overflow-x: auto;

          border: 1px solid #e5e7eb;
          border-radius: 0.85rem;

          background: #0B1739;

          color: #f8fafc;

          line-height: 1.65;

          -webkit-overflow-scrolling: touch;
        }

        .blog-content pre code {
          padding: 0;

          background: transparent;

          color: inherit;

          font-size: 0.9rem;

          white-space: pre;
        }

        /* =====================================================
           QUILL VIDEO
        ===================================================== */

        .blog-content .ql-video {
          display: block;

          width: 100%;
          max-width: 100%;

          margin: 2rem auto;

          aspect-ratio: 16 / 9;

          border: 0;
          border-radius: 0.9rem;
        }

        /* =====================================================
           SAFE WORD BREAKING
        ===================================================== */

        .blog-content,
        .blog-content p,
        .blog-content li,
        .blog-content h1,
        .blog-content h2,
        .blog-content h3,
        .blog-content h4,
        .blog-content h5,
        .blog-content h6,
        .blog-content a {
          overflow-wrap: break-word;
        }

        /* =====================================================
           MOBILE
        ===================================================== */

        @media (max-width: 768px) {
          .blog-content {
            font-size: 1rem;
            line-height: 1.8;
          }

          .blog-content h1 {
            margin-top: 2rem;
            margin-bottom: 1rem;
          }

          .blog-content h2 {
            margin-top: 1.9rem;
            margin-bottom: 0.85rem;
          }

          .blog-content h3 {
            margin-top: 1.7rem;
            margin-bottom: 0.75rem;
          }

          .blog-content p {
            margin-bottom: 1.1rem;
            
          }

          .blog-content ul,
          .blog-content ol {
            padding-left: 1.35rem;
          }

          .blog-content .ql-indent-1 {
            margin-left: 1rem;
          }

          .blog-content .ql-indent-2 {
            margin-left: 2rem;
          }

          .blog-content .ql-indent-3 {
            margin-left: 3rem;
          }

          .blog-content .ql-indent-4 {
            margin-left: 4rem;
          }

          .blog-content .ql-indent-5 {
            margin-left: 5rem;
          }

          .blog-content .ql-indent-6 {
            margin-left: 6rem;
          }

          .blog-content blockquote {
            margin: 1.5rem 0;

            padding:
              1rem
              1rem
              1rem
              1.15rem;

            font-size: 1rem;
          }

          .blog-content img {
            margin: 1.5rem auto;
            border-radius: 0.7rem;
          }

          .blog-content iframe {
            min-height: 220px;
            margin: 1.5rem auto;
          }

          .blog-content pre {
            margin: 1.5rem 0;
            padding: 1rem;
            border-radius: 0.7rem;
          }

          /* ================================
             TABLE — MOBILE
          ================================= */

          .blog-content .table-scroll {
            margin: 1.5rem 0;

            /*
              Prevent scroll container itself
              from expanding page width.
            */
            width: 100%;
            max-width: 100%;

            overflow-x: auto;
            overflow-y: hidden;
          }

          .blog-content .table-scroll table {
            min-width: 560px;

            font-size: 0.84rem;
          }

          .blog-content .table-scroll th,
          .blog-content .table-scroll td {
            padding:
              0.6rem
              0.7rem;
          }
        }

        /* =====================================================
           SMALL MOBILE
        ===================================================== */

        @media (max-width: 480px) {
          .blog-content {
            font-size: 0.98rem;
            line-height: 1.75;
          }

          .blog-content h1 {
            font-size: 1.7rem;
          }

          .blog-content h2 {
            font-size: 1.45rem;
          }

          .blog-content h3 {
            font-size: 1.25rem;
          }

          .blog-content h4 {
            font-size: 1.12rem;
          }

          .blog-content
            .ql-indent-4,
          .blog-content
            .ql-indent-5,
          .blog-content
            .ql-indent-6 {
            margin-left: 2rem;
          }

          .blog-content blockquote {
            font-size: 0.97rem;
          }

          .blog-content iframe {
            min-height: 200px;
          }

          /* ================================
             TABLE — SMALL MOBILE
          ================================= */

          .blog-content .table-scroll {
            width: 100%;
            max-width: 100%;
          }

          .blog-content .table-scroll table {
            min-width: 520px;

            font-size: 0.8rem;
          }

          .blog-content .table-scroll th,
          .blog-content .table-scroll td {
            padding:
              0.55rem
              0.6rem;
          }
        }

        /* =====================================================
           ACCESSIBILITY
        ===================================================== */

        .blog-content a:focus-visible {
          outline: 2px solid #C7954A;
          outline-offset: 3px;
          border-radius: 3px;
        }

        /* =====================================================
           REDUCED MOTION
        ===================================================== */

        @media (prefers-reduced-motion: reduce) {
          .fade-up {
            animation: none;

            opacity: 1;
            transform: none;
          }

          .blog-content a {
            transition: none;
          }
        }
      `}</style>

      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div
        className="
          container
          mx-auto
          min-w-0
          px-4
          pb-12
          pt-24
          sm:px-5
          sm:pt-28
          md:pb-16
          md:pt-32
        "
      >
        <div
          className="
            grid
            min-w-0
            grid-cols-1
            gap-10
            lg:grid-cols-12
            lg:gap-12
          "
        >
          {/* =================================================
              LEFT — BLOG CONTENT
          ================================================= */}

          <div className="min-w-0 lg:col-span-8">
            {/* Back */}
            <Link
              href="/blog"
              className="
                fade-up
                mb-4
                inline-flex
                w-fit
                items-center
                gap-2
                text-sm
                font-medium
                text-gray-500
                transition-transform
                duration-200
                hover:-translate-x-1
                hover:text-[#C7954A]
              "
              style={{
                animationDelay: "0ms",
              }}
            >
              <ArrowLeft size={18} />
              Back to Blogs
            </Link>

            {/* =================================================
                TITLE
            ================================================= */}

            <h1
              className="
                fade-up
                mt-2
                max-w-4xl
                break-words
                text-2xl
                font-bold
                leading-tight
                text-[#0B1739]
                sm:text-3xl
                md:text-4xl
              "
              style={{
                animationDelay: "80ms",
              }}
            >
              {blog.title}
            </h1>

            {/* =================================================
                FEATURED IMAGE
            ================================================= */}

            <div
              className="
                fade-up
                relative
                mt-6
                w-full
                overflow-hidden
                rounded-2xl
              "
              style={{
                animationDelay: "160ms",
              }}
            >
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={blog.featuredImage}
                  alt={blog.title}
                  fill
                  sizes="
                    (min-width: 1024px) 66vw,
                    100vw
                  "
                  className="object-cover"
                  priority
                />
              </div>

              {/* Category */}
              <span
                className="
                  absolute
                  left-4
                  top-4
                  rounded-full
                  bg-[#C7954A]
                  px-4
                  py-1.5
                  text-xs
                  font-semibold
                  text-white
                  shadow-md
                  sm:text-sm
                "
              >
                {blog.category}
              </span>
            </div>

            {/* =================================================
                META
            ================================================= */}

            <div
              className="
                fade-up
                mt-6
                flex
                flex-wrap
                items-center
                gap-x-6
                gap-y-3
                text-gray-600
              "
              style={{
                animationDelay: "240ms",
              }}
            >
              {/* Author */}
              <div className="flex items-center gap-2">
                <div
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    bg-[#0B1739]/5
                  "
                >
                  <User size={14} />
                </div>

                <span className="text-sm font-medium">
                  {blog.author}
                </span>
              </div>

              {/* Date */}
              <div className="flex items-center gap-1.5 text-sm">
                <CalendarDays
                  size={15}
                  className="text-[#C7954A]"
                />

                {new Date(
                  blog.date || blog.createdAt
                ).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </div>

              {/* Read Time */}
              {blog.readTime && (
                <div className="flex items-center gap-1.5 text-sm">
                  <Clock3
                    size={15}
                    className="text-[#C7954A]"
                  />

                  {blog.readTime}
                </div>
              )}
            </div>

            {/* =================================================
                SHORT DESCRIPTION
            ================================================= */}

            {blog.shortDescription && (
              <p
                className="
                  fade-up
                  mt-6
                  text-sm
                  leading-relaxed
                  text-[#6B7280]
                  sm:text-base
                  md:text-lg
                "
                style={{
                  animationDelay: "320ms",
                }}
              >
                {blog.shortDescription}
              </p>
            )}

            {/* =================================================
                FULL BLOG CONTENT
            ================================================= */}

            <div
              className="
                fade-up
                prose
                prose-sm
                mt-8
                min-w-0
                max-w-none
                break-words
                blog-content
                sm:prose-base
                md:prose-lg
                prose-headings:text-[#0B1739]
                prose-a:text-[#C7954A]
                prose-a:no-underline
                hover:prose-a:underline
                prose-img:rounded-2xl
                prose-img:shadow-md
              "
              style={{
                animationDelay: "400ms",
              }}
              dangerouslySetInnerHTML={{
                __html: formattedDescription || "",
              }}
            />

            {/* =================================================
                TAGS
            ================================================= */}

            {Array.isArray(blog.tags) &&
              blog.tags.length > 0 && (
                <div
                  className="
                    fade-up
                    mt-10
                    flex
                    flex-wrap
                    items-center
                    gap-2
                    border-t
                    border-gray-100
                    pt-8
                  "
                >
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="
                        rounded-full
                        border
                        border-gray-200
                        px-3
                        py-1
                        text-xs
                        font-medium
                        text-gray-600
                        transition-colors
                        duration-200
                        hover:border-[#C7954A]
                        hover:bg-[#C7954A]/5
                        hover:text-[#C7954A]
                      "
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
          </div>

          {/* =================================================
              RIGHT — RELATED BLOGS
          ================================================= */}

          <aside className="min-w-0 lg:col-span-4">
            <div
              className="
                fade-up
                rounded-2xl
                border
                border-gray-100
                bg-[#F4EDE7]
                p-5
                transition-shadow
                duration-300
                hover:shadow-lg
                lg:sticky
                lg:top-24
              "
            >
              <h3
                className="
                  mb-4
                  text-lg
                  font-bold
                  text-[#0B1739]
                "
              >
                Related Articles
              </h3>

              {relatedBlogs.length === 0 ? (
                <p className="text-sm text-gray-400">
                  No related articles yet.
                </p>
              ) : (
                <div
                  className="
                    flex
                    min-w-0
                    flex-col
                    divide-y
                    divide-gray-500
                    divide-dashed
                  "
                >
                  {relatedBlogs.map((item) => (
                    <Link
                      key={item._id}
                      href={`/blog/${item.slug}`}
                      className="
                        group
                        flex
                        min-w-0
                        gap-4
                        p-3
                        transition-colors
                        hover:bg-[#0B1739]/5
                      "
                    >
                      {/* Related Image */}
                      <div
                        className="
                          relative
                          h-20
                          w-24
                          shrink-0
                          overflow-hidden
                          rounded-lg
                        "
                      >
                        <Image
                          src={item.featuredImage}
                          alt={item.title}
                          fill
                          sizes="96px"
                          className="
                            object-cover
                            transition-transform
                            duration-500
                            group-hover:scale-110
                          "
                        />
                      </div>

                      {/* Related Content */}
                      <div className="min-w-0">
                        <span
                          className="
                            text-[11px]
                            font-semibold
                            uppercase
                            tracking-wide
                            text-[#C7954A]
                          "
                        >
                          {item.category}
                        </span>

                        <h4
                          className="
                            mt-1
                            line-clamp-2
                            text-sm
                            font-semibold
                            leading-snug
                            text-[#0B1739]
                            group-hover:text-[#C7954A]
                          "
                        >
                          {item.title}
                        </h4>

                        <span
                          className="
                            mt-2
                            flex
                            items-center
                            gap-1
                            text-xs
                            text-gray-500
                          "
                        >
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