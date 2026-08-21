  "use client";

  import { useState } from "react";
  import { motion } from "framer-motion";
  import Image from "next/image";
  import Link from "next/link";
  import { useRouter } from "next/navigation";
  import { toast } from "sonner";

  // import logo from "@/assets/logo.png";

  export default function LoginForm() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
      e.preventDefault();

      if (!email || !password) {
        toast.error("All fields are required");
        return;
      }

      try {
        setLoading(true);

        const res = await fetch("/api/admin/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          toast.error(data.msg || "Login failed");
          return;
        }

        localStorage.setItem("token", data.token);

        localStorage.setItem(
          "user",
          JSON.stringify({
            email,
            role: "admin",
          })
        );

        toast.success(data.msg || "Login successful");

        router.push("/admin");
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    return (
      <div
        className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gradient-to-br
        from-gray-100
        via-gray-50
        to-gray-200
        px-4
      "
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 25,
            scale: 0.98,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.4,
          }}
          className="
          bg-white/90
          backdrop-blur-xl
          shadow-2xl
          rounded-3xl
          p-6
          md:p-8
          w-full
          max-w-sm
          border
          border-gray-200
        "
        >
          {/* Logo */}
       {/* Logo */}
<div className="flex flex-col mb-6">
  <Image
    src="/logo-main.png"
    alt="Founders Legal Desk"
    width={180}
    height={60}
    priority
    className="w-auto h-12 object-contain object-left"
  />
</div>

          <p className="text-gray-500 mb-3 text-sm">
            Sign in to continue your dashboard
          </p>

          <form
            className="space-y-5"
            onSubmit={handleLogin}
          >
            <div>
              <label className="text-xs font-medium text-gray-600">
                EMAIL
              </label>

              <input
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="
                w-full
                mt-2
                px-4
                py-3
                rounded-xl
                border
                border-gray-300
                bg-gray-50
                focus:outline-none
                focus:ring-2
                focus:ring-[#C7954A]
                focus:border-[#C7954A]
                transition
              "
              />
            </div>

            <div>
              <label className="text-xs font-medium text-gray-600">
                PASSWORD
              </label>

              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="
                w-full
                mt-2
                px-4
                py-3
                rounded-xl
                border
                border-gray-300
                bg-gray-50
                focus:outline-none
                focus:ring-2
                focus:ring-[#C7954A]
                focus:border-[#C7954A]
                transition
              "
              />
            </div>

            <div className="flex justify-end">
              <Link
                href="/login/forgot-password"
                className="
                text-sm
                text-[#C7954A]
                hover:underline
              "
              >
                Forgot Password?
              </Link>
            </div>

            <motion.button
              whileTap={{
                scale: 0.98,
              }}
              whileHover={{
                scale: 1.02,
              }}
              type="submit"
              disabled={loading}
              className="
              w-full
              py-3
              rounded-xl
              bg-[#C7954A]
              text-white
              font-semibold
              transition
              hover:bg-[#B98737]
              disabled:opacity-60
              disabled:cursor-not-allowed
            "
            >
              {loading ? "Signing In..." : "Sign In"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    );
  }