"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const API_URL = "/api/blog";

const CATEGORIES = [
  "All",
  "Business",
  "Legal",
  "Technology",
  "Finance",
  "Lifestyle",
];

const QUILL_MODULES = {
  toolbar: [
    [{ header: [2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "blockquote"],
    ["clean"],
  ],
};

const EMPTY_FORM = {
  id: null,
  title: "",
  author: "Admin",
  date: "",
  shortDescription: "",
  description: "",
  category: "",
  tags: [],
  tagInput: "",
  readTime: "",
  metaTitle: "",
  metaDescription: "",
  keywords: [],
  keywordInput: "",
  featuredImageFile: null,
  featuredImagePreview: "",
};

const PAGE_SIZE = 6;
const GOLD = "#C7954A";
const GOLD_HOVER = "#B98737";

function authHeaders() {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function toDateInputValue(value) {
  if (!value) return "";
  const d = new Date(value);
  if (isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
}

// converts form state -> FormData (matches how the backend expects fields)
function buildFormData(form) {
  const fd = new FormData();
  fd.append("title", form.title);
  fd.append("author", form.author);
  fd.append("date", form.date);
  fd.append("shortDescription", form.shortDescription);
  fd.append("description", form.description);
  fd.append("category", form.category);
  fd.append("readTime", form.readTime);
  fd.append("metaTitle", form.metaTitle);
  fd.append("metaDescription", form.metaDescription);
  fd.append("tags", form.tags.join(","));
  fd.append("keywords", form.keywords.join(","));
  if (form.featuredImageFile) {
    fd.append("featuredImage", form.featuredImageFile);
  }
  return fd;
}

export default function BlogAdmin() {
  // ---------- list state ----------
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);

  // ---------- modal state ----------
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  // ---------- delete modal state ----------
  const [deleteTarget, setDeleteTarget] = useState(null); // { id, title }
  const [deleting, setDeleting] = useState(false);

  // ==============================
  // GET all blogs
  // ==============================
  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL, {
        method: "GET",
        headers: { ...authHeaders() },
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.msg || "Failed to fetch blogs");
      }

      setBlogs(data.blogs || []);
    } catch (err) {
      toast.error(err.message || "Failed to load blogs");
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  // ---------- client-side search (title, author, category) + category filter + pagination ----------
  const filteredBlogs = useMemo(() => {
    const q = search.trim().toLowerCase();
    return blogs.filter((b) => {
      const matchesSearch =
        !q ||
        b.title?.toLowerCase().includes(q) ||
        b.author?.toLowerCase().includes(q) ||
        b.category?.toLowerCase().includes(q);
      const matchesCategory = category === "All" || b.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [blogs, search, category]);

  const totalPages = Math.max(1, Math.ceil(filteredBlogs.length / PAGE_SIZE));

  const paginatedBlogs = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredBlogs.slice(start, start + PAGE_SIZE);
  }, [filteredBlogs, page]);

  useEffect(() => {
    setPage(1);
  }, [search, category]);

  // ==============================
  // Add / Edit modal handlers
  // ==============================
  const openAddForm = () => {
    setForm({ ...EMPTY_FORM, date: toDateInputValue(new Date()) });
    setIsEditMode(false);
    setIsFormOpen(true);
  };

  const openEditForm = (blog) => {
    setForm({
      id: blog._id,
      title: blog.title || "",
      author: blog.author || "Admin",
      date: toDateInputValue(blog.date || blog.createdAt),
      shortDescription: blog.shortDescription || "",
      description: blog.description || "",
      category: blog.category || "",
      tags: blog.tags || [],
      tagInput: "",
      readTime: blog.readTime || "",
      metaTitle: blog.metaTitle || "",
      metaDescription: blog.metaDescription || "",
      keywords: blog.keywords
        ? blog.keywords.split(",").map((k) => k.trim()).filter(Boolean)
        : [],
      keywordInput: "",
      featuredImageFile: null,
      featuredImagePreview: blog.featuredImage || "",
    });
    setIsEditMode(true);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    if (saving) return;
    setIsFormOpen(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setForm((f) => ({
      ...f,
      featuredImageFile: file,
      featuredImagePreview: URL.createObjectURL(file),
    }));
  };

  // splits on comma so a pasted list ("legal, startup, company") becomes multiple chips
  const addTag = (raw) => {
    const pieces = raw
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);
    if (pieces.length === 0) return;
    setForm((f) => ({ ...f, tags: [...f.tags, ...pieces], tagInput: "" }));
  };

  const removeTag = (index) => {
    setForm((f) => ({ ...f, tags: f.tags.filter((_, i) => i !== index) }));
  };

  const addKeyword = (raw) => {
    const pieces = raw
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);
    if (pieces.length === 0) return;
    setForm((f) => ({
      ...f,
      keywords: [...f.keywords, ...pieces],
      keywordInput: "",
    }));
  };

  const removeKeyword = (index) => {
    setForm((f) => ({
      ...f,
      keywords: f.keywords.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    if (!isEditMode && !form.featuredImageFile)
      return "Featured image is required";
    if (!form.title) return "Title is required";
    if (!form.author) return "Author name is required";
    if (!form.shortDescription) return "Short description is required";
    if (!form.description) return "Full description is required";
    if (!form.category) return "Category is required";
    return "";
  };

  // ==============================
  // CREATE / UPDATE
  // ==============================
  const handleSave = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    try {
      setSaving(true);

      const isEdit = isEditMode;
      const url = isEdit ? `${API_URL}?id=${form.id}` : API_URL;

      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { ...authHeaders() },
        body: buildFormData(form),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.msg || "Failed to save blog");
      }

      toast.success(data.msg || (isEdit ? "Blog updated" : "Blog published"));
      setIsFormOpen(false);
      await fetchBlogs();
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  // ==============================
  // DELETE
  // ==============================
  const confirmDelete = (blog) => {
    setDeleteTarget({ id: blog._id, title: blog.title });
  };

  const cancelDelete = () => {
    if (deleting) return;
    setDeleteTarget(null);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      setDeleting(true);
      const res = await fetch(`${API_URL}?id=${deleteTarget.id}`, {
        method: "DELETE",
        headers: { ...authHeaders() },
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.msg || "Failed to delete blog");
      }

      toast.success(data.msg || "Blog deleted");
      setDeleteTarget(null);
      await fetchBlogs();
    } catch (err) {
      toast.error(err.message || "Failed to delete blog");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="w-full px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-6xl">
        {/* ---------- header ---------- */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Blogs</h1>
            <p className="mt-1 text-sm text-gray-500">
              {filteredBlogs.length} {filteredBlogs.length === 1 ? "post" : "posts"}
            </p>
          </div>
          <motion.button
            whileTap={{ scale: 0.98 }}
            whileHover={{ scale: 1.02 }}
            onClick={openAddForm}
            className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition"
            style={{ backgroundColor: GOLD }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = GOLD_HOVER)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = GOLD)}
          >
            <PlusIcon />
            Add New Blog
          </motion.button>
        </div>

        {/* ---------- filters ---------- */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, author, or category..."
              className="w-full rounded-xl border border-gray-300 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none transition focus:border-[#C7954A] focus:ring-2 focus:ring-[#C7954A]"
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-xl border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-[#C7954A] focus:ring-2 focus:ring-[#C7954A] sm:w-48"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* ---------- card grid ---------- */}
        {loading ? (
          <SkeletonGrid />
        ) : paginatedBlogs.length === 0 ? (
          <EmptyState
            onAdd={openAddForm}
            hasFilters={!!search || category !== "All"}
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedBlogs.map((blog) => (
              <BlogCard
                key={blog._id}
                blog={blog}
                onEdit={() => openEditForm(blog)}
                onDelete={() => confirmDelete(blog)}
              />
            ))}
          </div>
        )}

        {/* ---------- pagination ---------- */}
        {!loading && filteredBlogs.length > 0 && totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-lg px-3 py-1.5 text-sm text-gray-600 transition hover:bg-gray-100 disabled:opacity-40"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className="h-8 w-8 rounded-lg text-sm transition"
                style={
                  n === page
                    ? { backgroundColor: GOLD, color: "#fff" }
                    : { color: "#4b5563" }
                }
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="rounded-lg px-3 py-1.5 text-sm text-gray-600 transition hover:bg-gray-100 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* ---------- add / edit modal ---------- */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 px-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-gray-200 bg-white/95 shadow-2xl backdrop-blur-xl"
            >
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white/95 px-6 py-4 backdrop-blur-xl">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {isEditMode ? "Edit Blog" : "Add New Blog"}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {isEditMode ? "Update this post" : "Publish a new post"}
                  </p>
                </div>
                <button
                  onClick={closeForm}
                  className="rounded-lg p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                >
                  <CloseIcon />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-5 px-6 py-5">
                {/* Featured image first */}
                <Field label="FEATURED IMAGE">
                  <div className="flex items-center gap-4">
                    {form.featuredImagePreview ? (
                      <img
                        src={form.featuredImagePreview}
                        alt="Preview"
                        className="h-24 w-36 rounded-lg border border-gray-200 object-cover"
                      />
                    ) : (
                      <div className="flex h-24 w-36 items-center justify-center rounded-lg border border-dashed border-gray-300 text-gray-300">
                        <ImageIcon />
                      </div>
                    )}
                    <label className="cursor-pointer rounded-xl border border-dashed border-gray-300 px-4 py-2.5 text-sm text-gray-600 transition hover:border-[#C7954A]">
                      {form.featuredImagePreview ? "Change image" : "Upload image"}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </Field>

                <Field label="TITLE">
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                    placeholder="Blog title"
                    className="input"
                  />
                </Field>

                <div className="grid grid-cols-2 gap-4">
                  <Field label="AUTHOR NAME">
                    <input
                      type="text"
                      value={form.author}
                      onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
                      placeholder="Admin"
                      className="input"
                    />
                  </Field>

                  <Field label="DATE">
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                      className="input"
                    />
                  </Field>
                </div>

                <Field label="SHORT DESCRIPTION">
                  <textarea
                    value={form.shortDescription}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, shortDescription: e.target.value }))
                    }
                    rows={2}
                    placeholder="One or two lines shown in previews"
                    className="input"
                  />
                </Field>

                <Field label="FULL DESCRIPTION">
                  <div className="quill-wrapper">
                    <ReactQuill
                      theme="snow"
                      value={form.description}
                      onChange={(html) =>
                        setForm((f) => ({ ...f, description: html }))
                      }
                      modules={QUILL_MODULES}
                      placeholder="Full blog content"
                    />
                  </div>
                </Field>

                <div className="grid grid-cols-2 gap-4">
                  <Field label="CATEGORY">
                    <input
                      type="text"
                      list="category-suggestions"
                      value={form.category}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, category: e.target.value }))
                      }
                      placeholder="e.g. Business"
                      className="input"
                    />
                    <datalist id="category-suggestions">
                      {CATEGORIES.filter((c) => c !== "All").map((c) => (
                        <option key={c} value={c} />
                      ))}
                    </datalist>
                  </Field>

                  <Field label="READ TIME">
                    <input
                      type="text"
                      value={form.readTime}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, readTime: e.target.value }))
                      }
                      placeholder="e.g. 5 min read"
                      className="input"
                    />
                  </Field>
                </div>

                <Field label="TAGS">
                  <TagInput
                    value={form.tagInput}
                    onChange={(v) => setForm((f) => ({ ...f, tagInput: v }))}
                    onAdd={addTag}
                    items={form.tags}
                    onRemove={removeTag}
                    placeholder="Type a tag, or paste a comma-separated list"
                  />
                </Field>

                <div className="border-t border-gray-200 pt-5">
                  <p className="mb-3 text-sm font-semibold text-gray-900">SEO</p>
                  <div className="space-y-4">
                    <Field label="META TITLE">
                      <input
                        type="text"
                        value={form.metaTitle}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, metaTitle: e.target.value }))
                        }
                        className="input"
                      />
                    </Field>
                    <Field label="META DESCRIPTION">
                      <textarea
                        value={form.metaDescription}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, metaDescription: e.target.value }))
                        }
                        rows={2}
                        className="input"
                      />
                    </Field>
                    <Field label="KEYWORDS">
                      <TagInput
                        value={form.keywordInput}
                        onChange={(v) => setForm((f) => ({ ...f, keywordInput: v }))}
                        onAdd={addKeyword}
                        items={form.keywords}
                        onRemove={removeKeyword}
                        placeholder="Type a keyword, or paste a comma-separated list"
                      />
                    </Field>
                  </div>
                </div>

                <div className="flex justify-end gap-3 border-t border-gray-200 pt-5">
                  <button
                    type="button"
                    onClick={closeForm}
                    disabled={saving}
                    className="rounded-xl px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    whileHover={{ scale: 1.02 }}
                    type="submit"
                    disabled={saving}
                    className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition disabled:opacity-60"
                    style={{ backgroundColor: GOLD }}
                  >
                    {saving
                      ? "Saving..."
                      : isEditMode
                      ? "Save Changes"
                      : "Publish"}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------- delete modal ---------- */}
      <AnimatePresence>
        {deleteTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 px-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-sm rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl"
            >
              <h3 className="text-lg font-bold text-gray-900">Delete Blog?</h3>
              <p className="mt-2 text-sm text-gray-500">
                "{deleteTarget.title}" will be permanently removed. This can't
                be undone.
              </p>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={cancelDelete}
                  disabled={deleting}
                  className="rounded-xl px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid #d1d5db;
          background: #f9fafb;
          padding: 0.625rem 0.875rem;
          font-size: 0.875rem;
          color: #111827;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .input:focus {
          border-color: #c7954a;
          box-shadow: 0 0 0 2px rgba(199, 149, 74, 0.25);
        }
        .quill-wrapper .ql-toolbar {
          border-top-left-radius: 0.75rem;
          border-top-right-radius: 0.75rem;
          background: #f9fafb;
          border-color: #d1d5db;
        }
        .quill-wrapper .ql-container {
          border-bottom-left-radius: 0.75rem;
          border-bottom-right-radius: 0.75rem;
          border-color: #d1d5db;
          font-size: 0.875rem;
          min-height: 160px;
        }
        .quill-wrapper .ql-editor {
          min-height: 160px;
        }
      `}</style>
    </div>
  );
}

// ==============================
// Blog Card — icon-based footer (author / date / read time)
// ==============================
function BlogCard({ blog, onEdit, onDelete }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
    >
      <div className="relative h-40 w-full overflow-hidden bg-gray-100">
        <img
          src={blog.featuredImage}
          alt={blog.title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-[#B98737] backdrop-blur">
          {blog.category}
        </span>
      </div>

      <div className="p-4">
        <h3 className="line-clamp-1 text-base font-semibold text-gray-900">
          {blog.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-gray-500">
          {blog.shortDescription}
        </p>

        {blog.tags?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {blog.tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="rounded-full bg-[#C7954A]/10 px-2 py-0.5 text-xs text-[#B98737]"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-gray-500">
          <span className="inline-flex items-center gap-1">
            <UserIcon />
            {blog.author || "Admin"}
          </span>
          <span className="inline-flex items-center gap-1">
            <CalendarIcon />
            {formatDate(blog.date || blog.createdAt)}
          </span>
          <span className="inline-flex items-center gap-1">
            <ClockIcon />
            {blog.readTime}
          </span>
        </div>

        <div className="mt-4 flex justify-end gap-2 border-t border-gray-100 pt-3">
          <button
            onClick={onEdit}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:bg-gray-100"
          >
            <EditIcon />
            Edit
          </button>
          <button
            onClick={onDelete}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50"
          >
            <TrashIcon />
            Delete
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ---------------- small building-block components ----------------

function Field({ label, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-gray-600">
        {label}
      </label>
      {children}
    </div>
  );
}

function TagInput({ value, onChange, onAdd, items, onRemove, placeholder }) {
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            onAdd(value);
          }
        }}
        onPaste={(e) => {
          const pasted = e.clipboardData.getData("text");
          if (pasted.includes(",")) {
            e.preventDefault();
            onAdd(pasted);
          }
        }}
        placeholder={placeholder}
        className="input"
      />
      {items.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {items.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#C7954A]/10 px-3 py-1 text-xs text-[#B98737]"
            >
              {item}
              <button
                type="button"
                onClick={() => onRemove(i)}
                className="text-[#B98737] hover:text-gray-900"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function EmptyState({ onAdd, hasFilters }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center">
      <div className="mb-3 rounded-full bg-gray-100 p-3">
        <DocumentIcon />
      </div>
      <p className="text-sm font-medium text-gray-900">
        {hasFilters ? "No blogs match your search" : "No blogs yet"}
      </p>
      <p className="mt-1 text-sm text-gray-500">
        {hasFilters
          ? "Try a different keyword or category."
          : "Create your first post to get started."}
      </p>
      {!hasFilters && (
        <button
          onClick={onAdd}
          className="mt-4 rounded-xl px-4 py-2 text-sm font-semibold text-white transition"
          style={{ backgroundColor: GOLD }}
        >
          Add New Blog
        </button>
      )}
    </div>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
        >
          <div className="h-40 w-full animate-pulse bg-gray-100" />
          <div className="space-y-2 p-4">
            <div className="h-4 w-3/4 animate-pulse rounded bg-gray-100" />
            <div className="h-3 w-full animate-pulse rounded bg-gray-100" />
            <div className="h-3 w-2/3 animate-pulse rounded bg-gray-100" />
          </div>
        </div>
      ))}
    </div>
  );
}

function formatDate(value) {
  if (!value) return "—";
  const d = new Date(value);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// ---------------- icons (inline, no extra dependency) ----------------

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  );
}

function SearchIcon({ className }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400">
      <path d="M9 12h6M9 16h6M9 8h1M6 3h9l5 5v13a1 1 0 01-1 1H6a1 1 0 01-1-1V4a1 1 0 011-1z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ImageIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 4-6 8-6s8 2 8 6" strokeLinecap="round" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" strokeLinecap="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 20h9" strokeLinecap="round" />
      <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0l-1 14a2 2 0 01-2 2H7a2 2 0 01-2-2L4 6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 11v6M14 11v6" strokeLinecap="round" />
    </svg>
  );
}