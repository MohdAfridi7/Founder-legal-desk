"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Mail,
  Search,
  X,
} from "lucide-react";

const menu = [
  {
    title: "Overview",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Blogs",
    href: "/admin/blog",
    icon: FileText,
  },
  {
    title: "Free Consultation Query",
    href: "/admin/free-consultation",
    icon: MessageSquare,
  },
  {
    title: "Contact Query",
    href: "/admin/contact-query",
    icon: Mail,
  },
  {
    title: "SEO",
    href: "/admin/seo",
    icon: Search,
  },
   {
    title: "Change Email",
    href: "/admin/change-email",
    icon: Mail,
  },
];

export default function Sidebar({
  mobileOpen,
  setMobileOpen,
}) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      <aside
        className={`
        fixed lg:static top-0 left-0 z-50
        h-screen w-72
        bg-[#0F172A]
        border-r border-[#1E293B]
        transform transition-transform duration-300
        ${
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }
      `}
      >
        <div className="h-20 flex items-center justify-between px-6 border-b border-[#1E293B]">
           <span className="flex flex-col leading-tight">
              <span className="font-serif text-lg font-bold text-white">
                Founders Legal Desk
              </span>
              <span className="mt-0.5 text-[10.5px] font-semibold uppercase tracking-[.08em] text-[#FFC157]">
                A Startup Times Venture
              </span>
            </span>

          <button
            className="lg:hidden text-white"
            onClick={() => setMobileOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {menu.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                flex items-center gap-3
                px-4 py-3 rounded-xl
                transition
                ${
                  active
                    ? "bg-[#C7954A] text-white"
                    : "text-gray-300 hover:bg-[#1E293B]"
                }
              `}
              >
                <Icon size={20} />
                {item.title}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}