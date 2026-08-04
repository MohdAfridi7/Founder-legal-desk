"use client";

import { Menu } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Header({ openSidebar }) {
  const router = useRouter();

  const handleLogout = () => {
    // Remove specific auth data (recommended)
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("admin");

    // OR agar sab clear karna hai
    localStorage.clear();
    sessionStorage.clear();

    // Redirect to login
    router.replace("/");
  };

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <button onClick={openSidebar} className="lg:hidden">
        <Menu size={22} />
      </button>

      <div className="ml-auto">
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </header>
  );
}