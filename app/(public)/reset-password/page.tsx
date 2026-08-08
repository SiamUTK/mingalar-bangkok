// app/(public)/reset-password/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Lock, Eye, EyeOff, CheckCircle2, ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

function getStrength(pw: string): { score: number; label: string; color: string } {
  if (!pw) return { score: 0, label: "", color: "bg-border" };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;

  const map = [
    { score: 1, label: "Weak", color: "bg-rose-500 text-rose-500" },
    { score: 2, label: "Fair", color: "bg-amber-500 text-amber-500" },
    { score: 3, label: "Good", color: "bg-yellow-500 text-yellow-500" },
    { score: 4, label: "Strong", color: "bg-emerald-500 text-emerald-500" },
  ];
  return map[score - 1] ?? { score: 0, label: "", color: "bg-border text-muted-foreground" };
}

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showCp, setShowCp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<{
    password?: string;
    confirmPassword?: string;
    general?: string;
  }>({});

  const validate = () => {
    const errs: typeof errors = {};
    if (!password) errs.password = "Enter a new password.";
    else if (password.length < 8) errs.password = "Password must be at least 8 characters.";

    if (!confirmPassword) errs.confirmPassword = "Please confirm your new password.";
    else if (password !== confirmPassword) errs.confirmPassword = "Passwords do not match.";

    return errs;
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        toast.error(error.message);
        setErrors({ general: error.message });
        return;
      }

      toast.success("Password updated successfully!");
      setSuccess(true);
    } catch {
      const msg = "Failed to update password. Please try requesting a new reset link.";
      toast.error(msg);
      setErrors({ general: msg });
    } finally {
      setLoading(false);
    }
  };

  const { score, label, color } = getStrength(password);

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* ── LEFT PANEL (With WebP Background) ─────────────────────────────── */}
      <aside className="hidden lg:flex flex-col justify-between p-12 text-white relative overflow-hidden bg-[#aa2429]">
        <Image
          src="/images/backgrounds/background-reset-password.webp"
          alt="Reset Password Background"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-[#aa2429]/60 pointer-events-none" />

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xl font-black tracking-tight z-10"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 text-lg backdrop-blur-md">
            🇲🇲
          </span>
          Mingalar Bangkok
        </Link>

        <div className="space-y-6 z-10 max-w-lg">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold backdrop-blur-md">
            <ShieldCheck className="h-4 w-4" /> Account Security
          </div>

          <h2 className="text-4xl font-black tracking-tight leading-tight">
            Secure your <br />
            <span className="text-white/70 font-semibold">account access.</span>
          </h2>

          <p className="text-xs text-white/80 leading-relaxed">
            Create a strong password using letters, numbers, and symbols to protect your job
            applications, saved properties, and account preferences.
          </p>
        </div>

        <p className="text-xs text-white/60 z-10">
          © 2026 Mingalar Bangkok by Siam On Cloud Co., Ltd. All rights reserved.
        </p>
      </aside>

      {/* ── RIGHT PANEL ──────────────────────────────────────────────────── */}
      <main className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-6">
          {success ? (
            <div className="text-center space-y-4 py-4">
              <div className="flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
              </div>

              <h1 className="text-3xl font-black tracking-tight text-foreground">
                Password updated!
              </h1>

              <p className="text-xs text-muted-foreground leading-relaxed">
                Your account password has been reset successfully. You can now log into your member
                dashboard.
              </p>

              <Link href="/login" className="block pt-2">
                <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-[#aa2429] text-white text-xs font-bold hover:bg-[#8e1e22] shadow-md shadow-[#aa2429]/20 transition-all">
                  Sign in to Dashboard <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
            </div>
          ) : (
            <>
              <div>
                <h1 className="text-3xl font-black tracking-tight text-foreground">
                  Set new <span className="text-[#aa2429]">password.</span>
                </h1>
                <p className="text-xs text-muted-foreground mt-1">
                  Please enter your new password below.
                </p>
              </div>

              <form onSubmit={handleUpdatePassword} className="space-y-4">
                {errors.general && (
                  <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-600 font-medium">
                    {errors.general}
                  </div>
                )}

                <div className="space-y-1.5">
                  <label htmlFor="password" className="block text-xs font-bold text-foreground">
                    New password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      id="password"
                      type={showPw ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setErrors((p) => ({ ...p, password: undefined }));
                      }}
                      placeholder="Minimum 8 characters"
                      className="w-full rounded-2xl border border-border bg-background pl-10 pr-10 py-2.5 text-xs focus:outline-none focus:border-[#aa2429]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw(!showPw)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>

                  {password && (
                    <div className="space-y-1 pt-1">
                      <div className="flex gap-1 h-1">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className={`flex-1 rounded-full transition-colors ${
                              i <= score ? color.split(" ")[0] : "bg-muted"
                            }`}
                          />
                        ))}
                      </div>
                      <p className={`text-[10px] font-semibold ${color.split(" ")[1]}`}>
                        {label} password
                      </p>
                    </div>
                  )}
                  {errors.password && <p className="text-xs text-rose-600">{errors.password}</p>}
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-xs font-bold text-foreground"
                  >
                    Confirm new password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      id="confirmPassword"
                      type={showCp ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setErrors((p) => ({ ...p, confirmPassword: undefined }));
                      }}
                      placeholder="Re-enter password"
                      className="w-full rounded-2xl border border-border bg-background pl-10 pr-10 py-2.5 text-xs focus:outline-none focus:border-[#aa2429]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCp(!showCp)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showCp ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-xs text-rose-600">{errors.confirmPassword}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-[#aa2429] text-white text-xs font-bold hover:bg-[#8e1e22] shadow-md shadow-[#aa2429]/20 transition-all disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Updating password…
                    </>
                  ) : (
                    "Update password →"
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
