"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface LoginFormValues {
  email: string;
  password: string;
}

// ---------------------------------------------------------------------------
// Icons (inline SVG — no extra deps)
// ---------------------------------------------------------------------------
const EyeIcon = ({ open }: { open: boolean }) =>
  open ? (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );

const MailIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const LockIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

// ---------------------------------------------------------------------------
// Social proof pill  (real stat from the landing page)
// ---------------------------------------------------------------------------
const SocialProofBadge = () => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      background: "rgba(192,57,43,0.08)",
      border: "1px solid rgba(192,57,43,0.18)",
      borderRadius: "999px",
      padding: "0.35rem 0.9rem",
      fontSize: "0.78rem",
      color: "#C0392B",
      fontWeight: 600,
      letterSpacing: "0.01em",
      marginBottom: "1.5rem",
    }}
  >
    <span style={{ fontSize: "0.9rem" }}>🇲🇲</span>
    12,000+ members trust Mingalar Bangkok
  </div>
);

// ---------------------------------------------------------------------------
// Field component
// ---------------------------------------------------------------------------
interface FieldProps {
  label: string;
  labelMM: string; // Myanmar label
  id: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  icon: React.ReactNode;
  error?: string;
  rightSlot?: React.ReactNode;
  autoComplete?: string;
}

const Field = ({
  label,
  labelMM,
  id,
  type,
  value,
  onChange,
  placeholder,
  icon,
  error,
  rightSlot,
  autoComplete,
}: FieldProps) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
    <label htmlFor={id} style={{ display: "flex", flexDirection: "column", gap: "0.1rem" }}>
      <span
        style={{ fontSize: "0.82rem", fontWeight: 600, color: "#1a1a1a", letterSpacing: "0.01em" }}
      >
        {label}
      </span>
      <span style={{ fontSize: "0.72rem", color: "#888", fontFamily: "sans-serif" }}>
        {labelMM}
      </span>
    </label>

    <div style={{ position: "relative" }}>
      {/* left icon */}
      <span
        style={{
          position: "absolute",
          left: "0.9rem",
          top: "50%",
          transform: "translateY(-50%)",
          color: error ? "#C0392B" : "#aaa",
          pointerEvents: "none",
        }}
      >
        {icon}
      </span>

      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "0.75rem 2.8rem",
          paddingLeft: "2.6rem",
          border: `1.5px solid ${error ? "#C0392B" : "#e0e0e0"}`,
          borderRadius: "10px",
          fontSize: "0.93rem",
          color: "#1a1a1a",
          background: error ? "rgba(192,57,43,0.03)" : "#fafafa",
          outline: "none",
          transition: "border-color 0.15s, box-shadow 0.15s",
          boxSizing: "border-box",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "#C0392B";
          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(192,57,43,0.10)";
          e.currentTarget.style.background = "#fff";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = error ? "#C0392B" : "#e0e0e0";
          e.currentTarget.style.boxShadow = "none";
        }}
      />

      {/* right slot (show/hide password) */}
      {rightSlot && (
        <span
          style={{
            position: "absolute",
            right: "0.85rem",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          {rightSlot}
        </span>
      )}
    </div>

    {error && <p style={{ fontSize: "0.78rem", color: "#C0392B", margin: 0 }}>{error}</p>}
  </div>
);

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------
export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});

  // ── validation ──────────────────────────────────────────────────────────
  function validate() {
    const next: typeof errors = {};
    if (!email.trim()) next.email = "Please enter your email.";
    else if (!/\S+@\S+\.\S+/.test(email)) next.email = "Enter a valid email address.";
    if (!password) next.password = "Please enter your password.";
    else if (password.length < 6) next.password = "Password must be at least 6 characters.";
    return next;
  }

  // ── submit ───────────────────────────────────────────────────────────────
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
      // TODO: replace with real Supabase auth
      // const { error } = await supabase.auth.signInWithPassword({ email, password })
      await new Promise((r) => setTimeout(r, 900)); // mock delay
      router.push("/dashboard");
    } catch {
      setErrors({ general: "Incorrect email or password. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  // ── render ───────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          background: #f7f7f5;
          min-height: 100vh;
        }

        .mb-login-root {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
        }

        /* ── Left panel ─────────────────────────────────────── */
        .mb-left {
          background: #C0392B;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 3rem 3.5rem;
          position: relative;
          overflow: hidden;
        }
        .mb-left::before {
          content: "";
          position: absolute;
          inset: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Ccircle cx='30' cy='30' r='28'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
          pointer-events: none;
        }
        .mb-left-logo {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          color: #fff;
          font-size: 1.1rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          position: relative;
          z-index: 1;
          text-decoration: none;
        }
        .mb-left-logo-icon {
          width: 36px; height: 36px;
          background: rgba(255,255,255,0.18);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.2rem;
        }
        .mb-left-body {
          position: relative;
          z-index: 1;
        }
        .mb-left-tagline-mm {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.65);
          margin-bottom: 0.5rem;
          letter-spacing: 0.02em;
        }
        .mb-left-tagline {
          font-size: 2rem;
          font-weight: 800;
          color: #fff;
          line-height: 1.2;
          letter-spacing: -0.03em;
          margin-bottom: 1.5rem;
        }
        .mb-left-tagline span {
          color: rgba(255,255,255,0.55);
          font-weight: 500;
        }
        .mb-stat-row {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .mb-stat {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .mb-stat-icon {
          width: 38px; height: 38px;
          background: rgba(255,255,255,0.12);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.1rem;
          flex-shrink: 0;
        }
        .mb-stat-text { color: #fff; }
        .mb-stat-num  { font-size: 1rem; font-weight: 700; }
        .mb-stat-lbl  { font-size: 0.75rem; color: rgba(255,255,255,0.6); }

        .mb-left-footer {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.45);
          position: relative;
          z-index: 1;
        }

        /* ── Right panel ────────────────────────────────────── */
        .mb-right {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2.5rem;
          background: #fff;
        }
        .mb-card {
          width: 100%;
          max-width: 420px;
        }
        .mb-card-header {
          margin-bottom: 2rem;
        }
        .mb-card-title {
          font-size: 1.65rem;
          font-weight: 800;
          color: #111;
          letter-spacing: -0.03em;
          line-height: 1.15;
          margin-bottom: 0.35rem;
        }
        .mb-card-title span { color: #C0392B; }
        .mb-card-subtitle {
          font-size: 0.85rem;
          color: #888;
          line-height: 1.5;
        }

        .mb-form { display: flex; flex-direction: column; gap: 1.1rem; }

        .mb-forgot {
          text-align: right;
          margin-top: -0.5rem;
        }
        .mb-forgot a {
          font-size: 0.78rem;
          color: #C0392B;
          text-decoration: none;
          font-weight: 500;
        }
        .mb-forgot a:hover { text-decoration: underline; }

        .mb-error-banner {
          background: rgba(192,57,43,0.07);
          border: 1px solid rgba(192,57,43,0.2);
          border-radius: 10px;
          padding: 0.7rem 1rem;
          font-size: 0.82rem;
          color: #C0392B;
          font-weight: 500;
        }

        .mb-btn-primary {
          width: 100%;
          padding: 0.85rem;
          background: #C0392B;
          color: #fff;
          border: none;
          border-radius: 10px;
          font-size: 0.95rem;
          font-weight: 700;
          letter-spacing: 0.01em;
          cursor: pointer;
          transition: background 0.15s, transform 0.1s, box-shadow 0.15s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-family: inherit;
          margin-top: 0.3rem;
        }
        .mb-btn-primary:hover:not(:disabled) {
          background: #a93226;
          box-shadow: 0 4px 18px rgba(192,57,43,0.28);
        }
        .mb-btn-primary:active:not(:disabled) { transform: scale(0.98); }
        .mb-btn-primary:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .mb-spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.35);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .mb-divider {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: #ccc;
          font-size: 0.78rem;
          margin: 0.2rem 0;
        }
        .mb-divider::before,
        .mb-divider::after {
          content: "";
          flex: 1;
          height: 1px;
          background: #e8e8e8;
        }

        .mb-btn-ghost {
          width: 100%;
          padding: 0.8rem;
          background: #f5f5f5;
          color: #444;
          border: 1.5px solid #e8e8e8;
          border-radius: 10px;
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-family: inherit;
        }
        .mb-btn-ghost:hover { background: #efefef; border-color: #ccc; }

        .mb-register-row {
          text-align: center;
          font-size: 0.83rem;
          color: #888;
          margin-top: 0.5rem;
        }
        .mb-register-row a {
          color: #C0392B;
          font-weight: 600;
          text-decoration: none;
        }
        .mb-register-row a:hover { text-decoration: underline; }

        /* ── Mobile ─────────────────────────────────────────── */
        @media (max-width: 720px) {
          .mb-login-root { grid-template-columns: 1fr; }
          .mb-left { display: none; }
          .mb-right { padding: 2rem 1.25rem; background: #f7f7f5; min-height: 100vh; }
          .mb-card { background: #fff; border-radius: 16px; padding: 2rem 1.5rem; box-shadow: 0 4px 32px rgba(0,0,0,0.07); }
        }

        @media (prefers-reduced-motion: reduce) {
          .mb-spinner { animation: none; opacity: 0.6; }
          .mb-btn-primary { transition: none; }
        }

        /* keyboard focus */
        input:focus-visible { outline: 2px solid #C0392B; outline-offset: 2px; }
        a:focus-visible    { outline: 2px solid #C0392B; outline-offset: 2px; border-radius: 3px; }
      `}</style>

      <div className="mb-login-root">
        {/* ── LEFT PANEL ─────────────────────────────────────── */}
        <aside className="mb-left" aria-hidden="true">
          <Link href="/" className="mb-left-logo">
            <span className="mb-left-logo-icon">🇲🇲</span>
            Mingalar Bangkok
          </Link>

          <div className="mb-left-body">
            <p className="mb-left-tagline-mm">ထိုင်းနိုင်ငံတွင် သင်၏ဘဝကို စီမံပါ</p>
            <h2 className="mb-left-tagline">
              Your life in Thailand,
              <br />
              <span>organized.</span>
            </h2>

            <div className="mb-stat-row">
              {[
                { icon: "💼", num: "4,500+", lbl: "Verified jobs available" },
                { icon: "🏠", num: "800+", lbl: "Rooms & condos listed" },
                { icon: "🤖", num: "24/7", lbl: "Mingalar AI assistant" },
                { icon: "👥", num: "12,000+", lbl: "Myanmar members" },
              ].map((s) => (
                <div className="mb-stat" key={s.lbl}>
                  <div className="mb-stat-icon">{s.icon}</div>
                  <div className="mb-stat-text">
                    <div className="mb-stat-num">{s.num}</div>
                    <div className="mb-stat-lbl">{s.lbl}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="mb-left-footer">© 2026 Mingalar Bangkok by Siam On Cloud Co., Ltd.</p>
        </aside>

        {/* ── RIGHT PANEL ────────────────────────────────────── */}
        <main className="mb-right">
          <div className="mb-card">
            {/* Social proof — mobile only shows this instead of sidebar */}
            <div style={{ marginBottom: "1.5rem" }}>
              <SocialProofBadge />
            </div>

            <header className="mb-card-header">
              <h1 className="mb-card-title">
                Welcome <span>back.</span>
              </h1>
              <p className="mb-card-subtitle">
                Sign in to your account — jobs, housing & AI support are waiting.
              </p>
            </header>

            <form className="mb-form" onSubmit={handleSubmit} noValidate>
              {errors.general && (
                <div className="mb-error-banner" role="alert">
                  {errors.general}
                </div>
              )}

              <Field
                label="Email address"
                labelMM="အီးမေးလ်လိပ်စာ"
                id="email"
                type="email"
                value={email}
                onChange={(v) => {
                  setEmail(v);
                  setErrors((p) => ({ ...p, email: undefined }));
                }}
                placeholder="you@example.com"
                icon={<MailIcon />}
                error={errors.email}
                autoComplete="email"
              />

              <Field
                label="Password"
                labelMM="စကားဝှက်"
                id="password"
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(v) => {
                  setPassword(v);
                  setErrors((p) => ({ ...p, password: undefined }));
                }}
                placeholder="Enter your password"
                icon={<LockIcon />}
                error={errors.password}
                autoComplete="current-password"
                rightSlot={
                  <button
                    type="button"
                    onClick={() => setShowPw((p) => !p)}
                    aria-label={showPw ? "Hide password" : "Show password"}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#aaa",
                      padding: "2px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <EyeIcon open={showPw} />
                  </button>
                }
              />

              <div className="mb-forgot">
                <Link href="/forgot-password">Forgot password?</Link>
              </div>

              <button
                type="submit"
                className="mb-btn-primary"
                disabled={loading}
                aria-busy={loading}
              >
                {loading ? (
                  <>
                    <span className="mb-spinner" role="status" aria-label="Signing in" />
                    Signing in…
                  </>
                ) : (
                  "Sign in →"
                )}
              </button>

              <div className="mb-divider">or</div>

              {/* Google SSO placeholder — wire up next */}
              <button type="button" className="mb-btn-ghost">
                <svg width="18" height="18" viewBox="0 0 24 24">
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

            <p className="mb-register-row" style={{ marginTop: "1.5rem" }}>
              New to Mingalar Bangkok? <Link href="/register">Create a free account</Link>
            </p>
          </div>
        </main>
      </div>
    </>
  );
}
