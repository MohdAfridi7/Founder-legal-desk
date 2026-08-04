"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const router = useRouter();

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");

  const [otp, setOtp] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const [loading, setLoading] = useState(false);

  const [newPassword, setNewPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const inputStyle =
    "w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#C7954A] focus:border-[#C7954A] transition text-sm shadow-sm";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    let interval;

    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    if (timer === 0) {
      setCanResend(true);
    }

    return () => clearInterval(interval);
  }, [step, timer]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];

    newOtp[index] = value;

    setOtp(newOtp);

    if (value && index < 5) {
      document
        .getElementById(`otp-${index + 1}`)
        ?.focus();
    }
  };

  // SEND OTP

  const handleSendOtp = async () => {
    if (!email) {
      toast.error("Email is required");
      return false;
    }

    if (!emailRegex.test(email)) {
      toast.error("Enter valid email");
      return false;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/admin/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg);
      }

      toast.success(data.msg);

      return true;
    } catch (err) {
      toast.error(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // VERIFY OTP

  const handleVerify = async () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      toast.error("Enter valid OTP");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/admin/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp: enteredOtp,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg);
      }

      toast.success(data.msg);

      setOtp(["", "", "", "", "", ""]);

      setStep(3);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // RESET PASSWORD

  const handleReset = async () => {
    if (!newPassword || !confirmPassword) {
      toast.error("All fields required");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password minimum 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/admin/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg);
      }

      toast.success(data.msg);

      router.push("/login");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

    return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 px-4">

      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl p-6 md:p-8 w-full max-w-sm border border-gray-200"
      >

        <div className="mb-6">
          <h2 className="text-3xl font-bold text-[#0F172A]">
            Forgot Password
          </h2>

          <p className="text-gray-500 mt-2 text-sm">
            Reset your admin account password
          </p>
        </div>

        <AnimatePresence mode="wait">

          {/* STEP 1 */}

          {step === 1 && (

            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: .3 }}
            >

              <div className="mb-5">
                <label className="text-xs text-gray-500">
                  EMAIL
                </label>

                <input
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  className={inputStyle}
                />
              </div>

              <button
                disabled={loading}
                onClick={async()=>{

                  const success = await handleSendOtp();

                  if(success){

                    setStep(2);
                    setTimer(30);
                    setCanResend(false);

                  }

                }}
                className="w-full bg-[#C7954A] hover:bg-[#B8873D] text-white py-3 rounded-xl font-semibold disabled:opacity-50"
              >

                {loading ? "Sending..." : "Send OTP"}

              </button>

              <Link
                href="/login"
                className="block text-center mt-5 text-sm text-[#C7954A]"
              >
                Back to Login
              </Link>

            </motion.div>

          )}

          {/* STEP 2 */}

          {step===2 && (

            <motion.div
              key="step2"
              initial={{opacity:0,x:30}}
              animate={{opacity:1,x:0}}
              exit={{opacity:0,x:-30}}
            >

              <h3 className="font-semibold text-center text-lg">
                Verify OTP
              </h3>

              <p className="text-sm text-center text-gray-500 mt-2">
                Enter the 6 digit code sent to your email
              </p>

              <div className="flex justify-between mt-6">

                {otp.map((digit,index)=>(

                  <input
                    key={index}
                    id={`otp-${index}`}
                    maxLength={1}
                    value={digit}
                    onChange={(e)=>handleChange(e.target.value,index)}
                    className="w-11 h-11 border rounded-lg text-center text-lg focus:ring-2 focus:ring-[#C7954A] outline-none"
                  />

                ))}

              </div>

              <div className="text-center mt-5">

                {canResend ? (

                  <button
                    onClick={async()=>{

                      const success = await handleSendOtp();

                      if(success){

                        setTimer(30);
                        setCanResend(false);

                      }

                    }}
                    className="text-[#C7954A] font-semibold"
                  >

                    Resend OTP

                  </button>

                ) : (

                  <span className="text-gray-500 text-sm">

                    Resend in {timer}s

                  </span>

                )}

              </div>

              <div className="flex gap-3 mt-6">

                <button
                  onClick={()=>setStep(1)}
                  className="w-1/2 border rounded-xl py-3"
                >

                  Back

                </button>

                <button
                  disabled={loading}
                  onClick={handleVerify}
                  className="w-1/2 bg-[#C7954A] hover:bg-[#B8873D] text-white rounded-xl py-3"
                >

                  {loading ? "Verifying..." : "Verify"}

                </button>

              </div>

            </motion.div>

          )}

          {/* STEP 3 */}

          {step===3 && (

            <motion.div
              key="step3"
              initial={{opacity:0,x:30}}
              animate={{opacity:1,x:0}}
              exit={{opacity:0,x:-30}}
            >

              <div className="mb-4">

                <label className="text-xs text-gray-500">
                  NEW PASSWORD
                </label>

                <input
                  type="password"
                  value={newPassword}
                  onChange={(e)=>setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className={inputStyle}
                />

              </div>

              <div className="mb-6">

                <label className="text-xs text-gray-500">
                  CONFIRM PASSWORD
                </label>

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e)=>setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  className={inputStyle}
                />

              </div>

              <button
                disabled={loading}
                onClick={handleReset}
                className="w-full bg-[#C7954A] hover:bg-[#B8873D] text-white py-3 rounded-xl font-semibold"
              >

                {loading ? "Resetting..." : "Reset Password"}

              </button>

            </motion.div>

          )}

        </AnimatePresence>

      </motion.div>

    </div>
  );
}