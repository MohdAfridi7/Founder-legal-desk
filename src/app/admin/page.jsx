"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  Users,
  MessageSquare,
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  ListChecks,
  RefreshCw,
  Mail,
  Phone,
  Building2,
  ArrowUpRight,
  Inbox,
  TrendingUp,
} from "lucide-react";

const STATUS_STYLES = {
  Completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  Cancelled: "bg-red-50 text-red-700 border-red-200",
};

const timeAgo = (dateStr) => {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
};

const initials = (name = "") =>
  name
    .trim()
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("");

export default function Overview() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchOverview = async (isRefresh = false) => {
    try {
      isRefresh ? setRefreshing(true) : setLoading(true);

      const token = localStorage.getItem("token");

      const res = await fetch("/api/overview", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        toast.error(json.msg || "Failed to load overview");
        return;
      }

      setData(json);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  const stats = data?.stats;

  const statCards = stats
    ? [
        {
          label: "Total Consultations",
          value: stats.totalConsultations,
          icon: ListChecks,
          accent: "from-[#C7954A] to-[#B98737]",
        },
        {
          label: "Pending",
          value: stats.pendingConsultations,
          icon: Clock,
          accent: "from-amber-500 to-amber-600",
        },
        {
          label: "Completed",
          value: stats.completedConsultations,
          icon: CheckCircle2,
          accent: "from-emerald-500 to-emerald-600",
        },
        {
          label: "Cancelled",
          value: stats.cancelledConsultations,
          icon: XCircle,
          accent: "from-red-500 to-red-600",
        },
        {
          label: "Contact Inquiries",
          value: stats.totalContactInquiries,
          icon: MessageSquare,
          accent: "from-slate-600 to-slate-700",
        },
        {
          label: "Total Blogs",
          value: stats.totalBlogs,
          icon: FileText,
          accent: "from-indigo-500 to-indigo-600",
        },
      ]
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 px-4 sm:px-6 lg:px-10 py-8">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <span className="flex flex-col leading-tight">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-black">
                Overview
              </span>
              <span className="mt-1 text-[11px] font-semibold uppercase tracking-[.1em] text-[#C7954A]">
                Founders Legal Desk · Admin Dashboard
              </span>
            </span>
          </div>

          <button
            onClick={() => fetchOverview(true)}
            disabled={refreshing}
            className="self-start sm:self-auto inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-[#C7954A]/40 disabled:opacity-60 transition-all shadow-sm"
          >
            <RefreshCw
              size={15}
              className={refreshing ? "animate-spin text-[#C7954A]" : "text-[#C7954A]"}
            />
            Refresh
          </button>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-8">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-gray-200 bg-white/70 p-4 h-28 animate-pulse"
                />
              ))
            : statCards.map((card, i) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.label}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
                    whileHover={{ y: -3 }}
                    className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white/90 backdrop-blur-xl shadow-sm hover:shadow-xl transition-shadow p-4"
                  >
                    <div
                      className={`absolute -top-6 -right-6 w-20 h-20 rounded-full bg-gradient-to-br ${card.accent} opacity-[0.07] group-hover:opacity-[0.12] transition-opacity`}
                    />
                    <div
                      className={`w-9 h-9 rounded-xl bg-gradient-to-br ${card.accent} flex items-center justify-center mb-3 shadow-sm`}
                    >
                      <Icon size={16} className="text-white" />
                    </div>
                    <p className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 tabular-nums leading-none">
                      {card.value}
                    </p>
                    <p className="text-[11px] sm:text-xs text-gray-500 font-medium mt-1.5 leading-tight">
                      {card.label}
                    </p>
                  </motion.div>
                );
              })}
        </div>

        {/* TWO-COLUMN: CONSULTATIONS LEFT · CONTACTS RIGHT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Panel
            title="Recent Consultations"
            subtitle="Latest client consultation requests"
            icon={ListChecks}
            loading={loading}
            onSeeMore={() => router.push("/admin/free-consultation")}
          >
            <ConsultationsPanel items={data?.recentConsultations || []} />
          </Panel>

          <Panel
            title="Contact Inquiries"
            subtitle="Latest messages from the contact form"
            icon={MessageSquare}
            loading={loading}
            onSeeMore={() => router.push("/admin/contact-query")}
          >
            <ContactsPanel items={data?.recentContacts || []} />
          </Panel>
        </div>
      </div>
    </div>
  );
}

function Panel({ title, subtitle, icon: Icon, loading, onSeeMore, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.15 }}
      className="rounded-3xl border border-gray-200 bg-white/90 backdrop-blur-xl shadow-xl overflow-hidden flex flex-col"
    >
      <div className="flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#C7954A]/10 flex items-center justify-center flex-shrink-0">
            <Icon size={16} className="text-[#C7954A]" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-serif font-bold text-gray-900">
              {title}
            </h3>
            <p className="text-[11px] sm:text-xs text-gray-400">{subtitle}</p>
          </div>
        </div>
      </div>

      <div className="flex-1">
        {loading ? (
          <div className="p-5 space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-16 rounded-xl bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : (
          children
        )}
      </div>

      <button
        onClick={onSeeMore}
        className="flex items-center justify-center gap-1.5 py-3.5 text-sm font-semibold text-[#C7954A] hover:bg-[#C7954A]/5 border-t border-gray-100 transition-colors"
      >
        See More <ArrowUpRight size={14} />
      </button>
    </motion.div>
  );
}

function EmptyState({ label }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center px-6">
      <div className="w-12 h-12 rounded-full bg-[#C7954A]/10 flex items-center justify-center mb-3">
        <Inbox size={20} className="text-[#C7954A]" />
      </div>
      <p className="text-sm font-medium text-gray-700">No {label} yet</p>
      <p className="text-xs text-gray-400 mt-1">New entries will show up here</p>
    </div>
  );
}

function ConsultationsPanel({ items }) {
  if (!items.length) return <EmptyState label="consultations" />;

  return (
    <div className="divide-y divide-gray-100 max-h-[520px] overflow-y-auto">
      {items.map((c) => (
        <div
          key={c._id}
          className="p-4 sm:p-5 flex items-start gap-3 hover:bg-gray-50/70 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C7954A] to-[#B98737] flex items-center justify-center text-xs font-bold text-white flex-shrink-0 shadow-sm">
            {initials(c.fullName)}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="font-semibold text-gray-900 truncate">{c.fullName}</p>
                <p className="text-xs text-gray-500 truncate">
                  {c.businessName || "—"} · {c.businessType}
                </p>
              </div>
              <span
                className={`shrink-0 inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold border ${
                  STATUS_STYLES[c.status] || "bg-gray-50 text-gray-600 border-gray-200"
                }`}
              >
                {c.status}
              </span>
            </div>

            <p className="text-sm text-gray-600 mt-2 line-clamp-1">{c.concern}</p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2.5 text-[11px] text-gray-400">
              <span className="inline-flex items-center gap-1">
                <Phone size={11} /> {c.phoneNumber}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock size={11} /> {c.preferredCallTime}
              </span>
              <span className="ml-auto text-gray-400">{timeAgo(c.createdAt)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ContactsPanel({ items }) {
  if (!items.length) return <EmptyState label="contacts" />;

  return (
    <div className="divide-y divide-gray-100 max-h-[520px] overflow-y-auto">
      {items.map((c) => (
        <div
          key={c._id}
          className="p-4 sm:p-5 flex items-start gap-3 hover:bg-gray-50/70 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-xs font-bold text-white flex-shrink-0 shadow-sm">
            {initials(c.name)}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <p className="font-semibold text-gray-900 truncate">{c.name}</p>
              <span className="shrink-0 text-[11px] text-gray-400">
                {timeAgo(c.createdAt)}
              </span>
            </div>

            <p className="text-sm text-gray-600 mt-1.5 line-clamp-1">{c.message}</p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2.5 text-[11px] text-gray-400">
              <span className="inline-flex items-center gap-1 truncate">
                <Mail size={11} /> {c.email}
              </span>
              <span className="inline-flex items-center gap-1">
                <Phone size={11} /> {c.phone}
              </span>
              {c.companyName && (
                <span className="inline-flex items-center gap-1">
                  <Building2 size={11} /> {c.companyName}
                </span>
              )}
            </div>

            <span className="inline-flex items-center gap-1 mt-2 text-[11px] font-semibold text-[#C7954A] bg-[#C7954A]/10 px-2 py-0.5 rounded-full">
              {c.helpType}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}