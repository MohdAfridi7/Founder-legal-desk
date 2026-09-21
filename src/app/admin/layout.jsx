
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "@/compontents/dashboard/Sidebar";
import Header from "@/compontents/dashboard/Header";

export default function AdminLayout({ children }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Token nahi hai
    if (!token) {
      router.replace("/login");
      return;
    }

    try {
      // JWT payload decode
      const payload = JSON.parse(atob(token.split(".")[1]));

      // Token expiration time
      const expirationTime = payload.exp * 1000;

      // Current time
      const currentTime = Date.now();

      // Token already expired
      if (expirationTime <= currentTime) {
        localStorage.removeItem("token");
        router.replace("/login");
        return;
      }

      // Token valid hai
      setLoading(false);

      // Exact expiration tak timer
      const remainingTime = expirationTime - currentTime;

      const timer = setTimeout(() => {
        localStorage.removeItem("token");
        router.replace("/login");
      }, remainingTime);

      // Cleanup
      return () => {
        clearTimeout(timer);
      };
    } catch (error) {
      console.error("Invalid token:", error);

      localStorage.removeItem("token");
      router.replace("/login");
    }
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FB]">
      {/* Mobile Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          h-screen w-72
          bg-[#0F172A]
          transition-all duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <Sidebar
          mobileOpen={open}
          setMobileOpen={setOpen}
        />
      </aside>

      {/* Right Side */}
      <div className="lg:ml-72 flex flex-col min-h-screen">
        <Header openSidebar={() => setOpen(true)} />

        <main className="flex-1 p-5 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

