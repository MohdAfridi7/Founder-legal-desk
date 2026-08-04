"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock3,
  CalendarDays,
  ArrowUpRight,
  User,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const ITEMS_PER_PAGE = 6;

/* ---------------- SINGLE CARD ---------------- */

function SingleBlogCard({ blog, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: Math.min(index, 6) * 0.06 }}
      whileHover={{ y: -6 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm transition-shadow duration-500 hover:shadow-xl hover:shadow-gray-200/60"
    >
      {/* image */}
      <Link href={`/blog/${blog.slug}`} className="relative block aspect-[16/10] w-full overflow-hidden bg-gray-100">
        <Image
          src={blog.featuredImage}
          alt={blog.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />

        {/* permanent subtle scrim for legibility of badge */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

        {/* category badge */}
        <span className="absolute left-3 top-3 sm:left-4 sm:top-4 rounded-full bg-white/95 px-2.5 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-[#0B1739] shadow-sm backdrop-blur-sm">
          {blog.category}
        </span>

        {/* read-time badge */}
        <span className="absolute right-3 top-3 sm:right-4 sm:top-4 flex items-center gap-1 rounded-full bg-black/45 px-2.5 py-1 text-[10px] sm:text-xs font-medium text-white backdrop-blur-sm">
          <Clock3 size={12} />
          {blog.readTime}
        </span>

        {/* floating arrow */}
        <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 flex h-9 w-9 sm:h-10 sm:w-10 translate-y-2 items-center justify-center rounded-full bg-[#C7954A] text-white opacity-0 shadow-lg transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight size={18} />
        </div>
      </Link>

      {/* content */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-2.5 flex items-center gap-3 text-[11px] sm:text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <CalendarDays size={13} />
            {new Date(blog.createdAt).toLocaleDateString(undefined, {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
          <span className="text-gray-300">•</span>
          <span className="flex items-center gap-1">
            <User size={13} />
            {blog.author}
          </span>
        </div>

        <Link href={`/blog/${blog.slug}`}>
          <h2 className="line-clamp-2 text-lg sm:text-xl font-bold leading-snug text-[#0B1739] transition-colors duration-300 group-hover:text-[#C7954A]">
            {blog.title}
          </h2>
        </Link>

        <p className="mt-2.5 line-clamp-2 text-sm text-gray-500 leading-relaxed">
          {blog.shortDescription}
        </p>

        <div className="mt-auto pt-5">
          <Link
            href={`/blog/${blog.slug}`}
            className="group/link inline-flex items-center gap-1.5 border-t border-gray-100 pt-4 w-full text-sm font-semibold text-[#C7954A] transition-colors duration-300"
          >
            Read article
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1"
            />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

/* ---------------- SKELETON CARD ---------------- */

function SkeletonCard() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm">
      <div className="aspect-[16/10] animate-pulse bg-gray-100" />
      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <div className="h-3 w-1/3 animate-pulse rounded bg-gray-100" />
        <div className="h-5 w-4/5 animate-pulse rounded bg-gray-100" />
        <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-gray-100" />
        <div className="mt-auto h-4 w-24 animate-pulse rounded bg-gray-100" />
      </div>
    </div>
  );
}

/* ---------------- PAGINATION ---------------- */

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = useMemo(() => {
    if (totalPages <= 1) return [];
    const arr = [];
    const range = 1;
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - range && i <= currentPage + range)) {
        arr.push(i);
      } else if (arr[arr.length - 1] !== "...") {
        arr.push("...");
      }
    }
    return arr;
  }, [currentPage, totalPages]);

  if (totalPages <= 1) return null;

  return (
    <div className="mt-10 sm:mt-14 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition hover:border-[#C7954A] hover:text-[#C7954A] disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft size={18} />
      </button>

      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`dots-${i}`} className="px-1.5 sm:px-2 text-gray-400 select-none">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            aria-current={p === currentPage ? "page" : undefined}
            className={`flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border text-sm font-semibold transition ${
              p === currentPage
                ? "border-[#C7954A] bg-[#C7954A] text-white shadow-md shadow-[#C7954A]/25"
                : "border-gray-200 text-gray-600 hover:border-[#C7954A] hover:text-[#C7954A]"
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition hover:border-[#C7954A] hover:text-[#C7954A] disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}

/* ---------------- MAIN COMPONENT ---------------- */

export default function BlogCard() {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blog");
        const data = await res.json();
        setBlogs(data.blogs || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const filteredBlogs = useMemo(() => {
    if (!search.trim()) return blogs;

    return blogs.filter((blog) =>
      (blog.title + " " + blog.shortDescription + " " + blog.category + " " + blog.author)
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [blogs, search]);

  const totalPages = Math.max(1, Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE));

  const paginatedBlogs = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredBlogs.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredBlogs, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div id="articles">
      {/* Header + Search */}
      <div className="mb-8 sm:mb-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1739]">All Blogs</h2>
          <p className="mt-1 text-sm sm:text-base text-gray-500">
            Total Blogs :
            <span className="ml-2 font-semibold text-[#C7954A]">{filteredBlogs.length}</span>
          </p>
        </div>

        <div className="relative w-full sm:w-80 md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search blogs..."
            className="h-11 sm:h-12 w-full rounded-xl border border-gray-200 pl-11 pr-4 text-sm sm:text-base outline-none transition focus:border-[#C7954A] focus:ring-2 focus:ring-[#C7954A]/20"
          />
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="rounded-2xl border border-gray-100 bg-white px-6 py-16 sm:p-20 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0B1739]">No blogs found</h2>
          <p className="mt-2 text-sm sm:text-base text-gray-500">Try another search keyword.</p>
        </div>
      ) : (
        <>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8"
            >
              {paginatedBlogs.map((blog, index) => (
                <SingleBlogCard key={blog._id} blog={blog} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}