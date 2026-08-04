"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const API_URL = "/api/seo";

const PAGE_SIZE = 10;
const GOLD = "#C7954A";

// Matches the actual pages in src/app/(website)/ — keep this list in sync
// whenever a new page is added or a route is renamed.
const PAGE_NAMES = [
  "home",
  "about",
  "contact",
  "pricing",
  "services",
  "free-consultation",
];

const EMPTY_FORM = {
  pageName: "",
  metaTitle: "",
  metaDescription: "",
  canonicalUrl: "",
  metaKeywords: "",
  ogTitle: "",
  ogDescription: "",
  twitterTitle: "",
  twitterDescription: "",
  schemaType: "",
  schemaJson: "",
};

function authHeaders() {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export default function SeoAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState("create"); // "create" | "edit"
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  // image files to upload (File objects), plus existing URLs shown when editing
  const [ogImageFile, setOgImageFile] = useState(null);
  const [twitterImageFile, setTwitterImageFile] = useState(null);
  const [existingOgImage, setExistingOgImage] = useState("");
  const [existingTwitterImage, setExistingTwitterImage] = useState("");

  const [deleteTarget, setDeleteTarget] = useState(null); // { id, name }
  const [deleting, setDeleting] = useState(false);

  // ==============================
  // GET all SEO entries
  // ==============================
  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL, {
        method: "GET",
        headers: { ...authHeaders() },
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.msg || "Failed to fetch SEO entries");
      }

      // NOTE: assuming the list endpoint returns { success, seo: [...] }.
      // If your API returns a different key (e.g. "seos"), update this line.
      setItems(Array.isArray(data.seo) ? data.seo : data.seo ? [data.seo] : []);
    } catch (err) {
      toast.error(err.message || "Failed to load SEO entries");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // ---------- client-side search + pagination ----------
  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (s) =>
        s.pageName?.toLowerCase().includes(q) ||
        s.metaTitle?.toLowerCase().includes(q) ||
        s.canonicalUrl?.toLowerCase().includes(q)
    );
  }, [items, search]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredItems.slice(start, start + PAGE_SIZE);
  }, [filteredItems, page]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  // ==============================
  // FORM open/close helpers
  // ==============================
  const openCreateForm = () => {
    setFormMode("create");
    setFormData(EMPTY_FORM);
    setEditingId(null);
    setOgImageFile(null);
    setTwitterImageFile(null);
    setExistingOgImage("");
    setExistingTwitterImage("");
    setFormOpen(true);
  };

  const openEditForm = (item) => {
    setFormMode("edit");
    setFormData({
      pageName: item.pageName || "",
      metaTitle: item.metaTitle || "",
      metaDescription: item.metaDescription || "",
      canonicalUrl: item.canonicalUrl || "",
      metaKeywords: item.metaKeywords || "",
      ogTitle: item.ogTitle || "",
      ogDescription: item.ogDescription || "",
      twitterTitle: item.twitterTitle || "",
      twitterDescription: item.twitterDescription || "",
      schemaType: item.schemaType || "",
      schemaJson:
        typeof item.schemaJson === "string"
          ? item.schemaJson
          : item.schemaJson
          ? JSON.stringify(item.schemaJson, null, 2)
          : "",
    });
    setEditingId(item._id);
    setOgImageFile(null);
    setTwitterImageFile(null);
    setExistingOgImage(item.ogImage || "");
    setExistingTwitterImage(item.twitterImage || "");
    setFormOpen(true);
  };

  const closeForm = () => {
    if (saving) return;
    setFormOpen(false);
  };

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // ==============================
  // CREATE / UPDATE
  // ==============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.pageName.trim()) {
      toast.error("Page name is required");
      return;
    }

    // validate schemaJson if provided
    if (formData.schemaJson.trim()) {
      try {
        JSON.parse(formData.schemaJson);
      } catch {
        toast.error("Schema JSON is not valid JSON");
        return;
      }
    }

    try {
      setSaving(true);

      const isEdit = formMode === "edit";
      const url = isEdit ? `${API_URL}?id=${editingId}` : API_URL;
      const method = isEdit ? "PUT" : "POST";

      // form-data, since ogImage/twitterImage are actual file uploads
      // (backend uploads them to Cloudinary and stores the returned URL)
      const body = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        body.append(key, value ?? "");
      });
      if (ogImageFile) body.append("ogImage", ogImageFile);
      if (twitterImageFile) body.append("twitterImage", twitterImageFile);

      const res = await fetch(url, {
        method,
        headers: { ...authHeaders() }, // no Content-Type — browser sets the multipart boundary
        body,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.msg || "Failed to save SEO entry");
      }

      toast.success(data.msg || (isEdit ? "SEO updated" : "SEO created"));
      setFormOpen(false);
      await fetchItems();
    } catch (err) {
      toast.error(err.message || "Failed to save SEO entry");
    } finally {
      setSaving(false);
    }
  };

  // ==============================
  // DELETE
  // ==============================
  const confirmDelete = (item) => {
    setDeleteTarget({ id: item._id, name: item.pageName });
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
        throw new Error(data.msg || "Failed to delete");
      }

      toast.success(data.msg || "SEO entry deleted");
      setDeleteTarget(null);
      await fetchItems();
    } catch (err) {
      toast.error(err.message || "Failed to delete");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="w-full px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-6xl">
        {/* ---------- header ---------- */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">SEO Settings</h1>
            <p className="mt-1 text-sm text-gray-500">
              {filteredItems.length} {filteredItems.length === 1 ? "page" : "pages"} configured
            </p>
          </div>
          <button
            onClick={openCreateForm}
            className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition"
            style={{ backgroundColor: GOLD }}
          >
            <PlusIcon />
            Add SEO Entry
          </button>
        </div>

        {/* ---------- filters ---------- */}
        <div className="mb-5">
          <div className="relative max-w-md">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by page name, title, or URL..."
              className="w-full rounded-xl border border-gray-300 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none transition focus:border-[#C7954A] focus:ring-2 focus:ring-[#C7954A]"
            />
          </div>
        </div>

        {/* ---------- table ---------- */}
        <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <th className="px-5 py-3 font-medium">Page</th>
                <th className="px-5 py-3 font-medium">Meta Title</th>
                <th className="px-5 py-3 font-medium">Canonical URL</th>
                <th className="px-5 py-3 font-medium">Updated</th>
                <th className="px-5 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <SkeletonRows />
              ) : paginatedItems.length === 0 ? (
                <tr>
                  <td colSpan={5}>
                    <EmptyState hasFilters={!!search} onAdd={openCreateForm} />
                  </td>
                </tr>
              ) : (
                paginatedItems.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                  >
                    <td className="px-5 py-3 font-medium text-gray-900">
                      {item.pageName}
                    </td>
                    <td className="px-5 py-3 text-gray-600">
                      <div className="max-w-[220px] truncate">{item.metaTitle}</div>
                    </td>
                    <td className="px-5 py-3 text-gray-500">
                      <div className="max-w-[220px] truncate">
                        {item.canonicalUrl || "—"}
                      </div>
                    </td>
                    <td className="px-5 py-3 text-gray-500">
                      {formatDate(item.updatedAt)}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEditForm(item)}
                          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:bg-gray-100"
                        >
                          <EditIcon />
                          Edit
                        </button>
                        <button
                          onClick={() => confirmDelete(item)}
                          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50"
                        >
                          <TrashIcon />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ---------- pagination ---------- */}
        {!loading && filteredItems.length > 0 && totalPages > 1 && (
          <div className="mt-5 flex items-center justify-center gap-1">
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

      {/* ---------- create/edit form modal ---------- */}
      <AnimatePresence>
        {formOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 px-4 py-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl"
            >
              <div className="mb-5 flex items-start justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  {formMode === "edit" ? "Edit SEO Entry" : "Add SEO Entry"}
                </h2>
                <button
                  onClick={closeForm}
                  className="rounded-lg p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                >
                  <CloseIcon />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <FieldGroup title="General">
                  <SelectField
                    label="Page Name"
                    value={formData.pageName}
                    onChange={(v) => handleFieldChange("pageName", v)}
                    options={PAGE_NAMES}
                    required
                  />
                  <TextField
                    label="Canonical URL"
                    value={formData.canonicalUrl}
                    onChange={(v) => handleFieldChange("canonicalUrl", v)}
                    placeholder="https://example.com"
                  />
                  <TextField
                    label="Meta Title"
                    value={formData.metaTitle}
                    onChange={(v) => handleFieldChange("metaTitle", v)}
                    full
                  />
                  <TextAreaField
                    label="Meta Description"
                    value={formData.metaDescription}
                    onChange={(v) => handleFieldChange("metaDescription", v)}
                    full
                  />
                  <TextField
                    label="Meta Keywords"
                    value={formData.metaKeywords}
                    onChange={(v) => handleFieldChange("metaKeywords", v)}
                    placeholder="comma, separated, keywords"
                    full
                  />
                </FieldGroup>

                <FieldGroup title="Open Graph">
                  <TextField
                    label="OG Title"
                    value={formData.ogTitle}
                    onChange={(v) => handleFieldChange("ogTitle", v)}
                  />
                  <ImageUploadField
                    label="OG Image"
                    file={ogImageFile}
                    existingUrl={existingOgImage}
                    onChange={setOgImageFile}
                  />
                  <TextAreaField
                    label="OG Description"
                    value={formData.ogDescription}
                    onChange={(v) => handleFieldChange("ogDescription", v)}
                    full
                  />
                </FieldGroup>

                <FieldGroup title="Twitter">
                  <TextField
                    label="Twitter Title"
                    value={formData.twitterTitle}
                    onChange={(v) => handleFieldChange("twitterTitle", v)}
                  />
                  <ImageUploadField
                    label="Twitter Image"
                    file={twitterImageFile}
                    existingUrl={existingTwitterImage}
                    onChange={setTwitterImageFile}
                  />
                  <TextAreaField
                    label="Twitter Description"
                    value={formData.twitterDescription}
                    onChange={(v) => handleFieldChange("twitterDescription", v)}
                    full
                  />
                </FieldGroup>

                <FieldGroup title="Schema">
                  <TextField
                    label="Schema Type"
                    value={formData.schemaType}
                    onChange={(v) => handleFieldChange("schemaType", v)}
                    placeholder="Organization"
                  />
                  <TextAreaField
                    label="Schema JSON"
                    value={formData.schemaJson}
                    onChange={(v) => handleFieldChange("schemaJson", v)}
                    placeholder='{"@context":"https://schema.org","@type":"Organization"}'
                    mono
                    full
                  />
                </FieldGroup>

                <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
                  <button
                    type="button"
                    onClick={closeForm}
                    disabled={saving}
                    className="rounded-xl px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition disabled:opacity-60"
                    style={{ backgroundColor: GOLD }}
                  >
                    {saving
                      ? "Saving..."
                      : formMode === "edit"
                      ? "Save Changes"
                      : "Create"}
                  </button>
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
              <h3 className="text-lg font-bold text-gray-900">Delete SEO Entry?</h3>
              <p className="mt-2 text-sm text-gray-500">
                SEO settings for "{deleteTarget.name}" will be permanently
                removed. This can't be undone.
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
    </div>
  );
}

// ---------------- form building blocks ----------------

function FieldGroup({ title, children }) {
  return (
    <div>
      <p className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-gray-500">
        {title}
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>
    </div>
  );
}

function TextField({ label, value, onChange, placeholder, required, full }) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label className="mb-1 block text-xs font-medium text-gray-600">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-gray-300 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-[#C7954A] focus:ring-2 focus:ring-[#C7954A]"
      />
    </div>
  );
}

function SelectField({ label, value, onChange, options, required, full }) {
  // if editing an entry whose pageName isn't in the known list (e.g. a
  // stale/renamed route), keep it selectable instead of silently dropping it
  const allOptions = value && !options.includes(value) ? [value, ...options] : options;

  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label className="mb-1 block text-xs font-medium text-gray-600">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full rounded-xl border border-gray-300 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-[#C7954A] focus:ring-2 focus:ring-[#C7954A]"
      >
        <option value="" disabled>
          Select a page
        </option>
        {allOptions.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function ImageUploadField({ label, file, existingUrl, onChange }) {
  const previewUrl = useMemo(() => {
    if (file) return URL.createObjectURL(file);
    return existingUrl || "";
  }, [file, existingUrl]);

  useEffect(() => {
    return () => {
      if (file && previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [file, previewUrl]);

  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-gray-600">{label}</label>
      <div className="flex items-center gap-3">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt={label}
            className="h-12 w-12 flex-shrink-0 rounded-lg border border-gray-200 object-cover"
          />
        ) : (
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 text-gray-300">
            <ImageIcon />
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => onChange(e.target.files?.[0] || null)}
          className="w-full text-xs text-gray-500 file:mr-3 file:rounded-lg file:border-0 file:bg-gray-100 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-gray-700 hover:file:bg-gray-200"
        />
      </div>
    </div>
  );
}

function TextAreaField({ label, value, onChange, placeholder, full, mono }) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label className="mb-1 block text-xs font-medium text-gray-600">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={mono ? 4 : 3}
        className={`w-full rounded-xl border border-gray-300 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-[#C7954A] focus:ring-2 focus:ring-[#C7954A] ${
          mono ? "font-mono text-xs" : ""
        }`}
      />
    </div>
  );
}

// ---------------- small building-block components ----------------

function EmptyState({ hasFilters, onAdd }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="mb-3 rounded-full bg-gray-100 p-3">
        <InboxIcon />
      </div>
      <p className="text-sm font-medium text-gray-900">
        {hasFilters ? "No pages match your search" : "No SEO entries yet"}
      </p>
      <p className="mt-1 text-sm text-gray-500">
        {hasFilters ? "Try a different keyword." : "Add your first page's SEO settings."}
      </p>
      {!hasFilters && (
        <button
          onClick={onAdd}
          className="mt-4 inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold text-white transition"
          style={{ backgroundColor: GOLD }}
        >
          <PlusIcon />
          Add SEO Entry
        </button>
      )}
    </div>
  );
}

function SkeletonRows() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <tr key={i} className="border-b border-gray-100 last:border-0">
          {Array.from({ length: 5 }).map((_, j) => (
            <td key={j} className="px-5 py-3">
              <div className="h-4 w-full max-w-[100px] animate-pulse rounded bg-gray-100" />
            </td>
          ))}
        </tr>
      ))}
    </>
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

// ---------------- icons ----------------

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

function EditIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" strokeLinecap="round" strokeLinejoin="round" />
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

function ImageIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  );
}

function InboxIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400">
      <path d="M22 12h-6l-2 3h-4l-2-3H2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}