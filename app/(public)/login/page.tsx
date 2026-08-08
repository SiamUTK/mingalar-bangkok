// app/(public)/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Mail, Lock, Eye, EyeOff, Loader2, Briefcase, Home, Bot, Users } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

export interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});

  function validate() {
    const next: typeof errors = {};
    if (!email.trim()) next.email = "Please enter your email.";
    else if (!/\S+@\S+\.\S+/.test(email)) next.email = "Enter a valid email address.";
    if (!password) next.password = "Please enter your password.";
    else if (password.length < 6) next.password = "Password must be at least 6 characters.";
    return next;
  }

  async function handleSubmit(e: React.FormEvent) {
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
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error("Invalid login credentials.");
        setErrors({ general: error.message });
        return;
      }

      toast.success("Welcome back!");
      router.refresh();
      router.push("/dashboard");
    } catch {
      const msg = "Incorrect email or password. Please try again.";
      toast.error(msg);
      setErrors({ general: msg });
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) toast.error(error.message);
    } catch {
      toast.error("Failed to connect with Google.");
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* ── LEFT PANEL (With WebP Background) ─────────────────────────────── */}
      <aside className="hidden lg:flex flex-col justify-between p-12 text-white relative overflow-hidden bg-[#aa2429]">
        {/* Background Image & Overlay */}
        <Image
          src="/images/backgrounds/background-login.webp"
          alt="Login Background"
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
            <p className="text-sm font-medium text-white/80">Manage your life in Thailand</p>
            <h2 className="text-4xl font-black tracking-tight leading-tight mt-1">
              Your life in Thailand, <br />
              <span className="text-white/70 font-semibold">organized.</span>
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                icon: <Briefcase className="h-5 w-5 text-white" />,
                num: "4,500+",
                lbl: "Verified jobs available",
              },
              {
                icon: <Home className="h-5 w-5 text-white" />,
                num: "800+",
                lbl: "Rooms & condos listed",
              },
              {
                icon: <Bot className="h-5 w-5 text-white" />,
                num: "24/7",
                lbl: "Mingalar AI assistant",
              },
              {
                icon: <Users className="h-5 w-5 text-white" />,
                num: "12,000+",
                lbl: "Myanmar members",
              },
            ].map((s) => (
              <div key={s.lbl} className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md border border-white/10">
                  {s.icon}
                </div>
                <div>
                  <div className="text-sm font-bold">{s.num}</div>
                  <div className="text-xs text-white/80">{s.lbl}</div>
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
          <div className="inline-flex items-center gap-2 rounded-full border border-[#aa2429]/20 bg-[#aa2429]/10 px-3.5 py-1 text-xs font-bold text-[#aa2429]">
            <span>🇲🇲</span>
            <span>12,000+ members trust Mingalar Bangkok</span>
          </div>

          <div>
            <h1 className="text-3xl font-black tracking-tight text-foreground">
              Welcome <span className="text-[#aa2429]">back.</span>
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              Sign in to your account — jobs, housing & AI support are waiting.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {errors.general && (
              <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-600 font-medium">
                {errors.general}
              </div>
            )}

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
                    setErrors((p) => ({ ...p, email: undefined }));
                  }}
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border border-border bg-background pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-[#aa2429]"
                />
              </div>
              {errors.email && <p className="text-xs text-rose-600">{errors.email}</p>}
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-xs font-bold text-foreground">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-[#aa2429] font-bold hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
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
                  placeholder="Enter your password"
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
              {errors.password && <p className="text-xs text-rose-600">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-[#aa2429] text-white text-xs font-bold hover:bg-[#8e1e22] shadow-md shadow-[#aa2429]/20 transition-all disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Signing in…
                </>
              ) : (
                "Sign in →"
              )}
            </button>

            <div className="relative my-4 text-center text-xs text-muted-foreground">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <span className="relative bg-background px-2">or</span>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl border border-border bg-background text-xs font-bold hover:bg-muted transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>
          </form>

          <p className="text-center text-xs text-muted-foreground">
            New to Mingalar Bangkok?{" "}
            <Link href="/register" className="text-[#aa2429] font-bold hover:underline">
              Create a free account
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
