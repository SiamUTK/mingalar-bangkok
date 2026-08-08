// app/(public)/register/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Check,
  ArrowLeft,
  ArrowRight,
  Loader2,
  Briefcase,
  Home,
  FileCheck,
  Bot,
} from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

export interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  language: "en" | "mm" | "th";
  agreeTerms: boolean;
}

type Errors = Partial<Record<keyof RegisterFormValues | "general", string>>;

const STEPS = ["Account", "Security", "Preferences"];

const LANGS = [
  {
    code: "en",
    background: "/images/backgrounds/flag-english.webp",
    label: "English",
  },
  {
    code: "mm",
    background: "/images/backgrounds/flag-myanmar.webp",
    label: "Myanmar",
  },
  {
    code: "th",
    background: "/images/backgrounds/flag-thai.webp",
    label: "Thai",
  },
] as const;

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

function validateStep(step: number, fields: RegisterFormValues): Errors {
  const e: Errors = {};
  if (step === 0) {
    if (!fields.name.trim()) e.name = "Enter your full name.";
    else if (fields.name.trim().length < 2) e.name = "Name must be at least 2 characters.";
    if (!fields.email.trim()) e.email = "Enter your email address.";
    else if (!/\S+@\S+\.\S+/.test(fields.email)) e.email = "Enter a valid email address.";
  }
  if (step === 1) {
    if (!fields.password) e.password = "Enter a password.";
    else if (fields.password.length < 8) e.password = "Password must be at least 8 characters.";
    if (!fields.confirmPassword) e.confirmPassword = "Please confirm your password.";
    else if (fields.password !== fields.confirmPassword)
      e.confirmPassword = "Passwords do not match.";
  }
  if (step === 2) {
    if (!fields.agreeTerms) e.agreeTerms = "You must agree to the Terms of Service.";
  }
  return e;
}

export default function RegisterPage() {
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [showPw, setShowPw] = useState(false);
  const [showCp, setShowCp] = useState(false);

  const [fields, setFields] = useState<RegisterFormValues>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    language: "en",
    agreeTerms: false,
  });

  const set = <K extends keyof RegisterFormValues>(k: K, v: RegisterFormValues[K]) => {
    setFields((p) => ({ ...p, [k]: v }));
    setErrors((p) => ({ ...p, [k]: undefined }));
  };

  function next() {
    const errs = validateStep(step, fields);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStep((s) => s + 1);
  }

  function back() {
    setErrors({});
    setStep((s) => s - 1);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateStep(step, fields);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email: fields.email,
        password: fields.password,
        options: {
          data: {
            full_name: fields.name,
            preferred_language: fields.language,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        toast.error(error.message);
        setErrors({ general: error.message });
        return;
      }

      if (data.session) {
        toast.success("Account created successfully!");
        router.push("/dashboard");
      } else {
        toast.info("Please check your email to confirm your account!");
        router.push("/login");
      }
    } catch {
      const msg = "Something went wrong. Please try again.";
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

  const { score, label, color } = getStrength(fields.password);

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* ── LEFT PANEL (With WebP Background) ─────────────────────────────── */}
      <aside className="hidden lg:flex flex-col justify-between p-12 text-white relative overflow-hidden bg-[#aa2429]">
        <Image
          src="/images/backgrounds/background-register.webp"
          alt="Register Background"
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
            <p className="text-sm font-medium text-white/80">Create a new account</p>
            <h2 className="text-4xl font-black tracking-tight leading-tight mt-1">
              Join 12,000+ <br />
              <span className="text-white/70 font-semibold">Myanmar members.</span>
            </h2>
          </div>

          <div className="space-y-5">
            {[
              {
                icon: <Briefcase className="h-5 w-5 text-white" />,
                title: "4,500+ verified jobs",
                desc: "Factories, hotels, restaurants & tech roles across Thailand",
              },
              {
                icon: <Home className="h-5 w-5 text-white" />,
                title: "Find housing near your workplace",
                desc: "Budget rooms, condos & worker apartments — verified listings",
              },
              {
                icon: <FileCheck className="h-5 w-5 text-white" />,
                title: "Visa & 90-day reminders",
                desc: "Never miss a deadline. Get alerts sent to your dashboard",
              },
              {
                icon: <Bot className="h-5 w-5 text-white" />,
                title: "Ask Mingalar AI — 24/7",
                desc: "Get answers in Burmese, Thai, or English anytime",
              },
            ].map((b, i) => (
              <div key={i} className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md border border-white/10">
                  {b.icon}
                </div>
                <div>
                  <div className="text-sm font-bold">{b.title}</div>
                  <div className="text-xs text-white/80">{b.desc}</div>
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
          <div>
            <h1 className="text-3xl font-black tracking-tight text-foreground">
              Create your <span className="text-[#aa2429]">account.</span>
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              It&apos;s 100% free — takes about 60 seconds.
            </p>
          </div>

          {/* Stepper Bar */}
          <div className="flex items-center justify-between pb-2">
            {STEPS.map((s, i) => {
              const done = i < step;
              const active = i === step;
              return (
                <div key={s} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all ${
                        done
                          ? "bg-[#aa2429] text-white"
                          : active
                            ? "border-2 border-[#aa2429] text-[#aa2429] bg-background"
                            : "border-2 border-border text-muted-foreground bg-muted/30"
                      }`}
                    >
                      {done ? <Check className="h-4 w-4" /> : i + 1}
                    </div>
                    <span
                      className={`text-[10px] font-semibold ${
                        active
                          ? "text-[#aa2429]"
                          : done
                            ? "text-foreground"
                            : "text-muted-foreground"
                      }`}
                    >
                      {s}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div
                      className={`h-0.5 flex-1 mx-2 mb-4 transition-colors ${
                        done ? "bg-[#aa2429]" : "bg-border"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 0 && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="block text-xs font-bold text-foreground">
                    Full name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      id="name"
                      type="text"
                      value={fields.name}
                      onChange={(e) => set("name", e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full rounded-2xl border border-border bg-background pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-[#aa2429]"
                    />
                  </div>
                  {errors.name && <p className="text-xs text-rose-600">{errors.name}</p>}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-xs font-bold text-foreground">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      id="email"
                      type="email"
                      value={fields.email}
                      onChange={(e) => set("email", e.target.value)}
                      placeholder="you@example.com"
                      className="w-full rounded-2xl border border-border bg-background pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-[#aa2429]"
                    />
                  </div>
                  {errors.email && <p className="text-xs text-rose-600">{errors.email}</p>}
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="password" className="block text-xs font-bold text-foreground">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      id="password"
                      type={showPw ? "text" : "password"}
                      value={fields.password}
                      onChange={(e) => set("password", e.target.value)}
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
                  {fields.password && (
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
                    Confirm password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      id="confirmPassword"
                      type={showCp ? "text" : "password"}
                      value={fields.confirmPassword}
                      onChange={(e) => set("confirmPassword", e.target.value)}
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
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-foreground">
                    Preferred language
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {LANGS.map((l) => {
                      const selected = fields.language === l.code;

                      return (
                        <button
                          key={l.code}
                          type="button"
                          onClick={() => set("language", l.code)}
                          aria-pressed={selected}
                          className={`relative min-h-[82px] overflow-hidden rounded-2xl border text-xs transition-all ${
                            selected
                              ? "border-[#aa2429] ring-2 ring-[#aa2429]/20"
                              : "border-border hover:border-[#aa2429]/40"
                          }`}
                        >
                          {/* Flag background */}
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${l.background})` }}
                          />

                          {/* Soft overlay */}
                          <span
                            aria-hidden="true"
                            className={`absolute inset-0 ${
                              selected ? "bg-white/65" : "bg-white/75"
                            }`}
                          />

                          {/* Content */}
                          <span
                            className={`relative z-10 flex h-full flex-col items-center justify-center gap-1 ${
                              selected ? "font-bold text-[#aa2429]" : "font-medium text-foreground"
                            }`}
                          >
                            <span>{l.label}</span>
                          </span>

                          {/* Selected indicator */}
                          {selected && (
                            <span className="absolute right-2 top-2 z-20 flex h-5 w-5 items-center justify-center rounded-full bg-[#aa2429] text-white">
                              <Check className="h-3 w-3" />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {errors.general && (
                  <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-600 font-medium">
                    {errors.general}
                  </div>
                )}

                <div className="space-y-1.5 pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer text-xs text-muted-foreground">
                    <input
                      type="checkbox"
                      checked={fields.agreeTerms}
                      onChange={(e) => set("agreeTerms", e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded-md border-border text-[#aa2429] focus:ring-[#aa2429]"
                    />
                    <span>
                      I agree to the{" "}
                      <Link href="/terms" className="text-[#aa2429] font-bold hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-[#aa2429] font-bold hover:underline">
                        Privacy Policy
                      </Link>
                      . Mingalar Bangkok is operated by Siam On Cloud Co., Ltd.
                    </span>
                  </label>
                  {errors.agreeTerms && (
                    <p className="text-xs text-rose-600">{errors.agreeTerms}</p>
                  )}
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              {step > 0 && (
                <button
                  type="button"
                  onClick={back}
                  className="flex items-center gap-1 px-4 py-2.5 rounded-2xl border border-border text-xs font-bold hover:bg-muted transition-colors"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> Back
                </button>
              )}

              {step < 2 ? (
                <button
                  type="button"
                  onClick={next}
                  className="flex-1 flex items-center justify-center gap-1 py-2.5 rounded-2xl bg-[#aa2429] text-white text-xs font-bold hover:bg-[#8e1e22] shadow-md shadow-[#aa2429]/20 transition-all"
                >
                  Continue <ArrowRight className="h-3.5 w-3.5" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-[#aa2429] text-white text-xs font-bold hover:bg-[#8e1e22] shadow-md shadow-[#aa2429]/20 transition-all disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Creating account…
                    </>
                  ) : (
                    "Create account →"
                  )}
                </button>
              )}
            </div>

            {step === 0 && (
              <>
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
              </>
            )}
          </form>

          <p className="text-center text-xs text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-[#aa2429] font-bold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
