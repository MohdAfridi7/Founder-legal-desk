"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const API_URL = "/api/consultation";

const STATUSES = ["All", "Pending", "Completed", "Cancelled"];

const STATUS_STYLES = {
  Pending: "bg-yellow-100 text-yellow-700",
  Contacted: "bg-blue-100 text-blue-700",
  Completed: "bg-green-100 text-green-700",
  Cancelled: "bg-gray-100 text-gray-500",
};

const PAGE_SIZE = 10;
const GOLD = "#C7954A";

function authHeaders() {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export default function FreeConsultationAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);

  const [viewItem, setViewItem] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const [deleteTarget, setDeleteTarget] = useState(null); // { id, name }
  const [deleting, setDeleting] = useState(false);

  // ==============================
  // GET all consultations
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
        throw new Error(data.msg || "Failed to fetch consultations");
      }

      setItems(data.consultations || []);
    } catch (err) {
      toast.error(err.message || "Failed to load consultations");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // ---------- client-side search + status filter + pagination ----------
  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items.filter((c) => {
      const matchesSearch =
        !q ||
        c.fullName?.toLowerCase().includes(q) ||
        c.businessName?.toLowerCase().includes(q) ||
        c.email?.toLowerCase().includes(q) ||
        c.phoneNumber?.toLowerCase().includes(q);
      const matchesStatus = status === "All" || c.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [items, search, status]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredItems.slice(start, start + PAGE_SIZE);
  }, [filteredItems, page]);

  useEffect(() => {
    setPage(1);
  }, [search, status]);

  // ==============================
  // UPDATE status
  // ==============================
  const handleStatusChange = async (id, newStatus) => {
    try {
      setUpdatingId(id);

      // optimistic update
      setItems((prev) =>
        prev.map((c) => (c._id === id ? { ...c, status: newStatus } : c))
      );

      const res = await fetch(`${API_URL}?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders(),
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.msg || "Failed to update status");
      }

      toast.success(data.msg || "Status updated");
    } catch (err) {
      toast.error(err.message || "Failed to update status");
      await fetchItems(); // revert on failure
    } finally {
      setUpdatingId(null);
    }
  };

  // ==============================
  // DELETE
  // ==============================
  const confirmDelete = (item) => {
    setDeleteTarget({ id: item._id, name: item.fullName });
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

      toast.success(data.msg || "Consultation deleted");
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
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Free Consultation Requests</h1>
          <p className="mt-1 text-sm text-gray-500">
            {filteredItems.length} {filteredItems.length === 1 ? "request" : "requests"}
          </p>
        </div>

        {/* ---------- filters ---------- */}
        <div className="mb-5 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, business, email, or phone..."
              className="w-full rounded-xl border border-gray-300 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none transition focus:border-[#C7954A] focus:ring-2 focus:ring-[#C7954A]"
            />
          </div>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-xl border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-[#C7954A] focus:ring-2 focus:ring-[#C7954A] sm:w-48"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* ---------- table ---------- */}
        <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Business</th>
                <th className="px-5 py-3 font-medium">Contact</th>
                <th className="px-5 py-3 font-medium">Preferred Time</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <SkeletonRows />
              ) : paginatedItems.length === 0 ? (
                <tr>
                  <td colSpan={7}>
                    <EmptyState hasFilters={!!search || status !== "All"} />
                  </td>
                </tr>
              ) : (
                paginatedItems.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                  >
                    <td className="px-5 py-3 font-medium text-gray-900">
                      {item.fullName}
                    </td>
                    <td className="px-5 py-3 text-gray-600">
                      <div>{item.businessName}</div>
                      <div className="text-xs text-gray-400">{item.industry}</div>
                    </td>
                    <td className="px-5 py-3 text-gray-600">
                      <div>{item.phoneNumber}</div>
                      <div className="text-xs text-gray-400">{item.email}</div>
                    </td>
                    <td className="px-5 py-3 text-gray-600">
                      {item.preferredCallTime || "—"}
                    </td>
                    <td className="px-5 py-3">
                      <select
                        value={item.status}
                        disabled={updatingId === item._id}
                        onChange={(e) => handleStatusChange(item._id, e.target.value)}
                        className={`rounded-full border-0 px-2.5 py-1 text-xs font-medium outline-none disabled:opacity-50 ${
                          STATUS_STYLES[item.status] || "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {STATUSES.filter((s) => s !== "All").map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-5 py-3 text-gray-500">
                      {formatDate(item.createdAt)}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setViewItem(item)}
                          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:bg-gray-100"
                        >
                          <EyeIcon />
                          View
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

      {/* ---------- view details modal ---------- */}
      <AnimatePresence>
        {viewItem && (
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
              className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl"
            >
              <div className="mb-5 flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{viewItem.fullName}</h2>
                  <span
                    className={`mt-1 inline-block rounded-full px-2.5 py-1 text-xs font-medium ${
                      STATUS_STYLES[viewItem.status] || "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {viewItem.status}
                  </span>
                </div>
                <button
                  onClick={() => setViewItem(null)}
                  className="rounded-lg p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                >
                  <CloseIcon />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <DetailField label="Business Name" value={viewItem.businessName} />
                <DetailField label="Business Type" value={viewItem.businessType} />
                <DetailField label="Industry" value={viewItem.industry} />
                <DetailField label="Employees" value={viewItem.numberOfEmployees} />
                <DetailField label="Phone" value={viewItem.phoneNumber} />
                <DetailField label="Email" value={viewItem.email} />
                <DetailField label="Preferred Call Time" value={viewItem.preferredCallTime} />
                <DetailField label="Submitted On" value={formatDate(viewItem.createdAt)} />
              </div>

              <div className="mt-4">
                <p className="mb-1 text-xs font-medium text-gray-500">CONCERN</p>
                <p className="rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700">
                  {viewItem.concern || "—"}
                </p>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setViewItem(null)}
                  className="rounded-xl px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
                >
                  Close
                </button>
              </div>
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
              <h3 className="text-lg font-bold text-gray-900">Delete Request?</h3>
              <p className="mt-2 text-sm text-gray-500">
                "{deleteTarget.name}"'s consultation request will be permanently
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

// ---------------- small building-block components ----------------

function DetailField({ label, value }) {
  return (
    <div>
      <p className="text-xs font-medium text-gray-500">{label.toUpperCase()}</p>
      <p className="mt-0.5 text-sm text-gray-900">{value || "—"}</p>
    </div>
  );
}

function EmptyState({ hasFilters }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="mb-3 rounded-full bg-gray-100 p-3">
        <InboxIcon />
      </div>
      <p className="text-sm font-medium text-gray-900">
        {hasFilters ? "No requests match your search" : "No consultation requests yet"}
      </p>
      <p className="mt-1 text-sm text-gray-500">
        {hasFilters
          ? "Try a different keyword or status."
          : "New requests from the website will show up here."}
      </p>
    </div>
  );
}

function SkeletonRows() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <tr key={i} className="border-b border-gray-100 last:border-0">
          {Array.from({ length: 7 }).map((_, j) => (
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

function EyeIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="3" />
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

function InboxIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400">
      <path d="M22 12h-6l-2 3h-4l-2-3H2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}