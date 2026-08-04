"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  ShieldCheck,
  ArrowLeft,
  ArrowRight,
  Loader2,
  CheckCircle2,
} from "lucide-react";

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

export default function ChangeEmail() {
  const [step, setStep] = useState(1); // 1: email, 2: otp, 3: success
  const [newEmail, setNewEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const inputStyle =
    "w-full mt-2 px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#C7954A] focus:border-[#C7954A] transition";

  // 📧 SEND OTP — hits /api/admin/change-email (sendEmailChangeOtp)
  const handleSendOtp = async (e) => {
    e?.preventDefault();

    const trimmedEmail = newEmail.trim();

    if (!trimmedEmail) {
      toast.error("Email required");
      return;
    }
    if (!isValidEmail(trimmedEmail)) {
      toast.error("Enter a valid email address");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await fetch("/api/admin/change-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newEmail: trimmedEmail }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.msg || "Failed to send OTP");
        return;
      }

      toast.success(data.msg || "OTP sent");
      setStep(2);
      setOtp(["", "", "", "", "", ""]);
      setTimer(30);
      setCanResend(false);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ⏳ TIMER
  useEffect(() => {
    let interval;

    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    if (timer === 0) setCanResend(true);

    return () => clearInterval(interval);
  }, [step, timer]);

  // 🎯 AUTO-FOCUS FIRST OTP BOX
  useEffect(() => {
    if (step === 2) {
      const t = setTimeout(() => document.getElementById("otp-0")?.focus(), 150);
      return () => clearTimeout(t);
    }
  }, [step]);

  // 🔢 OTP INPUT CHANGE
  const handleOtpChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  // 📋 OTP PASTE SUPPORT
  const handleOtpPaste = (e, index) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6 - index);
    if (!pasted) return;

    const newOtp = [...otp];
    pasted.split("").forEach((char, i) => {
      if (index + i < 6) newOtp[index + i] = char;
    });
    setOtp(newOtp);

    const nextIndex = Math.min(index + pasted.length, 5);
    document.getElementById(`otp-${nextIndex}`)?.focus();
  };

  // 🔙 BACKSPACE FIX
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];

      if (otp[index]) {
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        newOtp[index - 1] = "";
        setOtp(newOtp);
        document.getElementById(`otp-${index - 1}`)?.focus();
      }
    }
  };

  // 🔐 VERIFY OTP — hits /api/admin/verify-email-change (verifyEmailChange)
  const handleVerify = async (e) => {
    e?.preventDefault();

    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      toast.error("Enter valid OTP");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await fetch("/api/admin/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ otp: enteredOtp }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.msg || "Invalid OTP");
        return;
      }

      const user = JSON.parse(localStorage.getItem("user") || "null");
      if (user) {
        user.email = newEmail;
        localStorage.setItem("user", JSON.stringify(user));
      }

      toast.success(data.msg || "Email updated");
      setStep(3);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDone = () => {
    setStep(1);
    setNewEmail("");
    setOtp(["", "", "", "", "", ""]);
  };

  const handleBack = () => {
    setStep(1);
    setOtp(["", "", "", "", "", ""]);
  };

  const stepAnimation = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
    transition: { duration: 0.35 },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 px-4">
      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl p-6 md:p-8 w-full max-w-sm border border-gray-200"
      >
        {/* Logo — same as LoginForm */}
        <span className="flex flex-col mb-6 leading-tight">
          <span className="font-serif text-lg font-bold text-black">
            Founders Legal Desk
          </span>
          <span className="mt-0.5 text-[10.5px] font-semibold uppercase tracking-[.08em] text-[#C7954A]">
            A Startup Times Venture
          </span>
        </span>

        {/* PROGRESS DOTS */}
        {step !== 3 && (
          <div className="flex items-center gap-1.5 mb-5">
            <div
              className={`h-1.5 rounded-full transition-all duration-300 ${
                step >= 1 ? "w-6 bg-[#C7954A]" : "w-1.5 bg-gray-200"
              }`}
            />
            <div
              className={`h-1.5 rounded-full transition-all duration-300 ${
                step >= 2 ? "w-6 bg-[#C7954A]" : "w-1.5 bg-gray-200"
              }`}
            />
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* STEP 1 */}
          {step === 1 && (
            <motion.form key="step1" {...stepAnimation} onSubmit={handleSendOtp} className="space-y-5">
              <p className="text-gray-500 text-sm">
                Update the email linked to your account
              </p>

              <div>
                <label className="text-xs font-medium text-gray-600">
                  NEW EMAIL
                </label>
                <input
                  type="email"
                  value={newEmail}
                  placeholder="you@example.com"
                  onChange={(e) => setNewEmail(e.target.value)}
                  autoFocus
                  className={inputStyle}
                />
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                className="w-full py-3 rounded-xl bg-[#C7954A] text-white font-semibold transition hover:bg-[#B98737] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    Send OTP <ArrowRight size={15} />
                  </>
                )}
              </motion.button>
            </motion.form>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <motion.form key="step2" {...stepAnimation} onSubmit={handleVerify} className="space-y-5">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-[#C7954A]/10 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck size={16} className="text-[#C7954A]" />
                </div>
                <h2 className="text-lg font-serif font-bold text-gray-900">Verify OTP</h2>
              </div>

              <p className="text-sm text-gray-500">
                OTP sent to <span className="font-semibold text-gray-700">{newEmail}</span>
              </p>

              {/* OTP BOXES */}
              <div className="flex justify-center gap-2 sm:gap-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={(e) => handleOtpPaste(e, index)}
                    className="w-10 h-10 sm:w-12 sm:h-12 text-center border border-gray-300 rounded-xl bg-gray-50 text-base sm:text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C7954A] focus:border-[#C7954A] transition"
                  />
                ))}
              </div>

              {/* 🔁 RESEND */}
              <div className="text-center text-sm">
                {canResend ? (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={loading}
                    className="text-[#C7954A] font-semibold hover:underline disabled:opacity-50 transition-colors"
                  >
                    Resend OTP
                  </button>
                ) : (
                  <span className="text-gray-500">
                    Resend in <span className="text-[#C7954A] font-semibold tabular-nums">{timer}s</span>
                  </span>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={loading}
                  className="w-1/2 border border-gray-300 py-3 rounded-xl text-sm hover:bg-gray-100 disabled:opacity-50 transition-colors flex items-center justify-center gap-1.5"
                >
                  <ArrowLeft size={14} /> Back
                </button>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  className="w-1/2 py-3 rounded-xl bg-[#C7954A] text-white font-semibold transition hover:bg-[#B98737] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 size={16} className="animate-spin" /> : "Verify"}
                </motion.button>
              </div>
            </motion.form>
          )}

          {/* STEP 3 — SUCCESS */}
          {step === 3 && (
            <motion.div key="step3" {...stepAnimation} className="text-center space-y-4 py-2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
                className="w-16 h-16 rounded-full bg-[#C7954A]/10 flex items-center justify-center mx-auto"
              >
                <CheckCircle2 size={32} className="text-[#C7954A]" />
              </motion.div>

              <div>
                <h2 className="text-lg font-serif font-bold text-gray-900">Email Updated</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Your account email is now{" "}
                  <span className="font-semibold text-gray-700">{newEmail}</span>
                </p>
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                whileHover={{ scale: 1.02 }}
                onClick={handleDone}
                className="w-full py-3 rounded-xl bg-[#C7954A] text-white font-semibold transition hover:bg-[#B98737]"
              >
                Done
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}