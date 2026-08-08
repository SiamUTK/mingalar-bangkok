// app/(public)/forgot-password/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email.trim()) {
      setError("Enter your email address.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const supabase = createClient();
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (resetError) {
        toast.error(resetError.message);
        setError(resetError.message);
        return;
      }

      toast.success("Reset link sent!");
      setSent(true);
    } catch {
      const msg = "Something went wrong. Please try again.";
      toast.error(msg);
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* ── LEFT PANEL (With WebP Background) ─────────────────────────────── */}
      <aside className="hidden lg:flex flex-col justify-between p-12 text-white relative overflow-hidden bg-[#aa2429]">
        <Image
          src="/images/backgrounds/background-forgot-password.webp"
          alt="Forgot Password Background"
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

        <div className="space-y-8 z-10 max-w-lg">
          <div>
            <p className="text-sm font-medium text-white/80">Reset your account password</p>
            <h2 className="text-4xl font-black tracking-tight leading-tight mt-1">
              Reset in <br />
              <span className="text-white/70 font-semibold">three easy steps.</span>
            </h2>
          </div>

          <div className="space-y-5">
            {[
              {
                n: "1",
                title: "Enter your email",
                desc: "Use the email address linked to your Mingalar Bangkok account",
              },
              {
                n: "2",
                title: "Check your inbox",
                desc: "We'll send a secure password reset link — valid for 30 minutes",
              },
              {
                n: "3",
                title: "Set a new password",
                desc: "Choose a strong password and log back into your dashboard",
              },
            ].map((s) => (
              <div key={s.n} className="flex items-start gap-3.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-xs font-bold text-white">
                  {s.n}
                </div>
                <div>
                  <div className="text-sm font-bold">{s.title}</div>
                  <div className="text-xs text-white/80">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-white/60 z-10">
          © 2026 Mingalar Bangkok by Siam On Cloud Co., Ltd. All rights reserved.
        </p>
      </aside>

      {/* ── RIGHT PANEL ──────────────────────────────────────────────────── */}
      <main className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-6">
          {sent ? (
            <div className="text-center space-y-4 py-4">
              <div className="flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                  <CheckCircle className="h-10 w-10" />
                </div>
              </div>

              <h2 className="text-2xl font-black tracking-tight text-foreground">
                Check your inbox
              </h2>

              <p className="text-xs text-muted-foreground leading-relaxed">
                We&apos;ve sent a password reset link to{" "}
                <strong className="text-foreground">{email}</strong>.
                <br />
                Please check your spam or junk folder if you don&apos;t see it shortly.
              </p>

              <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-3.5 text-xs text-amber-700 dark:text-amber-400 text-left font-medium">
                ⚡ The password reset link will expire in 30 minutes.
              </div>

              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-[#aa2429] hover:underline pt-2"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Back to Sign in
              </Link>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-[#aa2429] transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Back to Sign in
              </Link>

              <div>
                <h1 className="text-3xl font-black tracking-tight text-foreground">
                  Forgot your <span className="text-[#aa2429]">password?</span>
                </h1>
                <p className="text-xs text-muted-foreground mt-1">
                  No worries — enter your email address below and we&apos;ll send you a secure reset
                  link.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-xs font-bold text-foreground">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      placeholder="you@example.com"
                      className="w-full rounded-2xl border border-border bg-background pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-[#aa2429]"
                    />
                  </div>
                  {error && <p className="text-xs text-rose-600">{error}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-[#aa2429] text-white text-xs font-bold hover:bg-[#8e1e22] shadow-md shadow-[#aa2429]/20 transition-all disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Sending link…
                    </>
                  ) : (
                    "Send reset link →"
                  )}
                </button>
              </form>

              <p className="text-center text-xs text-muted-foreground">
                Remember your password?{" "}
                <Link href="/login" className="text-[#aa2429] font-bold hover:underline">
                  Sign in
                </Link>
              </p>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
