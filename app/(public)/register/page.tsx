"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  language: "en" | "mm" | "th";
  agreeTerms: boolean;
}

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------
const EyeIcon = ({ open }: { open: boolean }) =>
  open ? (
    <svg
      width="17"
      height="17"
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
      width="17"
      height="17"
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

const UserIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const MailIcon = () => (
  <svg
    width="15"
    height="15"
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
    width="15"
    height="15"
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

const CheckIcon = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// ---------------------------------------------------------------------------
// Password strength meter
// ---------------------------------------------------------------------------
function getStrength(pw: string): { score: number; label: string; color: string } {
  if (!pw) return { score: 0, label: "", color: "#e0e0e0" };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const map = [
    { score: 1, label: "Weak", color: "#e74c3c" },
    { score: 2, label: "Fair", color: "#e67e22" },
    { score: 3, label: "Good", color: "#f1c40f" },
    { score: 4, label: "Strong", color: "#27ae60" },
  ];
  return map[score - 1] ?? { score: 0, label: "", color: "#e0e0e0" };
}

const StrengthBar = ({ password }: { password: string }) => {
  const { score, label, color } = getStrength(password);
  if (!password) return null;
  return (
    <div style={{ marginTop: "0.4rem" }}>
      <div style={{ display: "flex", gap: "4px", marginBottom: "4px" }}>
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: "3px",
              borderRadius: "99px",
              background: i <= score ? color : "#e8e8e8",
              transition: "background 0.2s",
            }}
          />
        ))}
      </div>
      {label && (
        <p style={{ fontSize: "0.72rem", color, fontWeight: 600, margin: 0 }}>{label} password</p>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Field component
// ---------------------------------------------------------------------------
interface FieldProps {
  label: string;
  labelMM: string;
  id: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  icon: React.ReactNode;
  error?: string;
  rightSlot?: React.ReactNode;
  autoComplete?: string;
  children?: React.ReactNode; // slot below input (e.g. strength bar)
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
  children,
}: FieldProps) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
    <label htmlFor={id}>
      <span
        style={{
          display: "block",
          fontSize: "0.82rem",
          fontWeight: 600,
          color: "#1a1a1a",
          letterSpacing: "0.01em",
        }}
      >
        {label}
      </span>
      <span
        style={{
          display: "block",
          fontSize: "0.71rem",
          color: "#999",
          fontFamily: "sans-serif",
          marginTop: "1px",
        }}
      >
        {labelMM}
      </span>
    </label>

    <div style={{ position: "relative" }}>
      <span
        style={{
          position: "absolute",
          left: "0.85rem",
          top: "50%",
          transform: "translateY(-50%)",
          color: error ? "#C0392B" : "#bbb",
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
          padding: "0.72rem 2.6rem",
          paddingLeft: "2.4rem",
          border: `1.5px solid ${error ? "#C0392B" : "#e2e2e2"}`,
          borderRadius: "10px",
          fontSize: "0.9rem",
          color: "#1a1a1a",
          background: error ? "rgba(192,57,43,0.03)" : "#fafafa",
          outline: "none",
          transition: "border-color 0.15s, box-shadow 0.15s",
          boxSizing: "border-box",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "#C0392B";
          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(192,57,43,0.09)";
          e.currentTarget.style.background = "#fff";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = error ? "#C0392B" : "#e2e2e2";
          e.currentTarget.style.boxShadow = "none";
        }}
      />

      {rightSlot && (
        <span
          style={{
            position: "absolute",
            right: "0.8rem",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          {rightSlot}
        </span>
      )}
    </div>

    {children}

    {error && <p style={{ fontSize: "0.76rem", color: "#C0392B", margin: 0 }}>{error}</p>}
  </div>
);

// ---------------------------------------------------------------------------
// Language selector
// ---------------------------------------------------------------------------
const LANGS = [
  { code: "en", flag: "🇬🇧", label: "English" },
  { code: "mm", flag: "🇲🇲", label: "မြန်မာ" },
  { code: "th", flag: "🇹🇭", label: "ภาษาไทย" },
] as const;

type LangCode = (typeof LANGS)[number]["code"];

const LangPicker = ({ value, onChange }: { value: LangCode; onChange: (v: LangCode) => void }) => (
  <div>
    <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "#1a1a1a", marginBottom: "0.5rem" }}>
      Preferred language
      <span
        style={{
          display: "block",
          fontSize: "0.71rem",
          color: "#999",
          fontWeight: 400,
          fontFamily: "sans-serif",
        }}
      >
        နှစ်သက်သောဘာသာစကား
      </span>
    </p>
    <div style={{ display: "flex", gap: "0.5rem" }}>
      {LANGS.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => onChange(l.code)}
          style={{
            flex: 1,
            padding: "0.55rem 0.4rem",
            borderRadius: "9px",
            border: `1.5px solid ${value === l.code ? "#C0392B" : "#e2e2e2"}`,
            background: value === l.code ? "rgba(192,57,43,0.06)" : "#fafafa",
            color: value === l.code ? "#C0392B" : "#666",
            fontSize: "0.78rem",
            fontWeight: value === l.code ? 700 : 500,
            cursor: "pointer",
            transition: "all 0.15s",
            fontFamily: "inherit",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2px",
          }}
          aria-pressed={value === l.code}
        >
          <span style={{ fontSize: "1.2rem" }}>{l.flag}</span>
          {l.label}
        </button>
      ))}
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// Custom checkbox
// ---------------------------------------------------------------------------
const Checkbox = ({
  checked,
  onChange,
  children,
  error,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  children: React.ReactNode;
  error?: string;
}) => (
  <div>
    <label style={{ display: "flex", alignItems: "flex-start", gap: "0.65rem", cursor: "pointer" }}>
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        style={{
          width: "18px",
          height: "18px",
          minWidth: "18px",
          borderRadius: "5px",
          border: `1.5px solid ${error ? "#C0392B" : checked ? "#C0392B" : "#ccc"}`,
          background: checked ? "#C0392B" : "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "all 0.15s",
          marginTop: "1px",
        }}
      >
        {checked && <CheckIcon />}
      </button>
      <span style={{ fontSize: "0.8rem", color: "#555", lineHeight: 1.5 }}>{children}</span>
    </label>
    {error && (
      <p style={{ fontSize: "0.76rem", color: "#C0392B", margin: "0.3rem 0 0 1.65rem" }}>{error}</p>
    )}
  </div>
);

// ---------------------------------------------------------------------------
// Steps indicator
// ---------------------------------------------------------------------------
const STEPS = ["Account", "Security", "Preferences"];

const StepBar = ({ current }: { current: number }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "0", marginBottom: "1.75rem" }}>
    {STEPS.map((s, i) => {
      const done = i < current;
      const active = i === current;
      const isLast = i === STEPS.length - 1;
      return (
        <div key={s} style={{ display: "flex", alignItems: "center", flex: isLast ? 0 : 1 }}>
          {/* circle */}
          <div
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}
          >
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: done ? "#C0392B" : active ? "#fff" : "#f0f0f0",
                border: `2px solid ${done || active ? "#C0392B" : "#e0e0e0"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.72rem",
                fontWeight: 700,
                color: done ? "#fff" : active ? "#C0392B" : "#bbb",
                transition: "all 0.2s",
                flexShrink: 0,
              }}
            >
              {done ? <CheckIcon /> : i + 1}
            </div>
            <span
              style={{
                fontSize: "0.65rem",
                fontWeight: active ? 700 : 500,
                color: active ? "#C0392B" : done ? "#888" : "#bbb",
                whiteSpace: "nowrap",
              }}
            >
              {s}
            </span>
          </div>
          {/* connector */}
          {!isLast && (
            <div
              style={{
                flex: 1,
                height: "2px",
                margin: "0 6px",
                marginBottom: "18px",
                background: done ? "#C0392B" : "#e8e8e8",
                transition: "background 0.2s",
              }}
            />
          )}
        </div>
      );
    })}
  </div>
);

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------
type Errors = Partial<Record<keyof RegisterFormValues | "general", string>>;

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

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------
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
    language: "mm",
    agreeTerms: false,
  });

  const set = <K extends keyof RegisterFormValues>(k: K, v: RegisterFormValues[K]) => {
    setFields((p) => ({ ...p, [k]: v }));
    setErrors((p) => ({ ...p, [k]: undefined }));
  };

  // ── step navigation ──────────────────────────────────────────────────────
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

  // ── submit ───────────────────────────────────────────────────────────────
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
      // TODO: replace with Supabase
      // const { error } = await supabase.auth.signUp({ email: fields.email, password: fields.password })
      await new Promise((r) => setTimeout(r, 1000));
      router.push("/dashboard");
    } catch {
      setErrors({ general: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  // ── per-step content ─────────────────────────────────────────────────────
  const stepContent = [
    // Step 0 — Account
    <>
      <Field
        label="Full name"
        labelMM="အမည်အပြည့်အစုံ"
        id="name"
        type="text"
        value={fields.name}
        onChange={(v) => set("name", v)}
        placeholder="Ko Aung, May Thu, …"
        icon={<UserIcon />}
        error={errors.name}
        autoComplete="name"
      />
      <Field
        label="Email address"
        labelMM="အီးမေးလ်လိပ်စာ"
        id="email"
        type="email"
        value={fields.email}
        onChange={(v) => set("email", v)}
        placeholder="you@example.com"
        icon={<MailIcon />}
        error={errors.email}
        autoComplete="email"
      />
    </>,

    // Step 1 — Security
    <>
      <Field
        label="Password"
        labelMM="စကားဝှက်"
        id="password"
        type={showPw ? "text" : "password"}
        value={fields.password}
        onChange={(v) => set("password", v)}
        placeholder="Minimum 8 characters"
        icon={<LockIcon />}
        error={errors.password}
        autoComplete="new-password"
        rightSlot={
          <button
            type="button"
            onClick={() => setShowPw((p) => !p)}
            aria-label={showPw ? "Hide password" : "Show password"}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#bbb",
              padding: "2px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <EyeIcon open={showPw} />
          </button>
        }
      >
        <StrengthBar password={fields.password} />
      </Field>

      <Field
        label="Confirm password"
        labelMM="စကားဝှက်အတည်ပြုပါ"
        id="confirmPassword"
        type={showCp ? "text" : "password"}
        value={fields.confirmPassword}
        onChange={(v) => set("confirmPassword", v)}
        placeholder="Re-enter your password"
        icon={<LockIcon />}
        error={errors.confirmPassword}
        autoComplete="new-password"
        rightSlot={
          <button
            type="button"
            onClick={() => setShowCp((p) => !p)}
            aria-label={showCp ? "Hide password" : "Show password"}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#bbb",
              padding: "2px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <EyeIcon open={showCp} />
          </button>
        }
      />
    </>,

    // Step 2 — Preferences
    <>
      <LangPicker value={fields.language} onChange={(v) => set("language", v)} />
      {errors.general && (
        <div
          style={{
            background: "rgba(192,57,43,0.07)",
            border: "1px solid rgba(192,57,43,0.2)",
            borderRadius: "10px",
            padding: "0.7rem 1rem",
            fontSize: "0.82rem",
            color: "#C0392B",
            fontWeight: 500,
          }}
          role="alert"
        >
          {errors.general}
        </div>
      )}
      <Checkbox
        checked={fields.agreeTerms}
        onChange={(v) => set("agreeTerms", v)}
        error={errors.agreeTerms}
      >
        I agree to the{" "}
        <Link href="/terms" style={{ color: "#C0392B", fontWeight: 600, textDecoration: "none" }}>
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" style={{ color: "#C0392B", fontWeight: 600, textDecoration: "none" }}>
          Privacy Policy
        </Link>
        . Mingalar Bangkok is operated by Siam On Cloud Co., Ltd.
      </Checkbox>
    </>,
  ];

  // ── render ───────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; background: #f7f7f5; min-height: 100vh; }

        .mb-root {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
        }

        /* ── Left ─────────────────────────────────────────────── */
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
          position: absolute; inset: 0;
          background: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Ccircle cx='40' cy='40' r='36'/%3E%3C/g%3E%3C/svg%3E") repeat;
          pointer-events: none;
        }
        .mb-left-logo {
          display: flex; align-items: center; gap: 0.6rem;
          color: #fff; font-size: 1.1rem; font-weight: 800;
          letter-spacing: -0.02em; position: relative; z-index: 1;
          text-decoration: none;
        }
        .mb-left-logo-icon {
          width: 36px; height: 36px;
          background: rgba(255,255,255,0.18); border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.2rem;
        }
        .mb-left-body { position: relative; z-index: 1; }
        .mb-left-mm { font-size: 0.85rem; color: rgba(255,255,255,0.6); margin-bottom: 0.5rem; }
        .mb-left-heading {
          font-size: 2rem; font-weight: 800; color: #fff;
          line-height: 1.2; letter-spacing: -0.03em; margin-bottom: 1.75rem;
        }
        .mb-left-heading span { color: rgba(255,255,255,0.5); font-weight: 500; }

        /* benefit list */
        .mb-benefits { display: flex; flex-direction: column; gap: 1rem; }
        .mb-benefit {
          display: flex; align-items: flex-start; gap: 0.75rem;
          color: rgba(255,255,255,0.9);
        }
        .mb-benefit-icon {
          width: 34px; height: 34px; flex-shrink: 0;
          background: rgba(255,255,255,0.12); border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem; margin-top: 1px;
        }
        .mb-benefit-title { font-size: 0.88rem; font-weight: 700; line-height: 1.3; }
        .mb-benefit-desc  { font-size: 0.75rem; color: rgba(255,255,255,0.6); margin-top: 1px; }

        .mb-left-foot { font-size: 0.74rem; color: rgba(255,255,255,0.4); position: relative; z-index: 1; }

        /* ── Right ────────────────────────────────────────────── */
        .mb-right {
          display: flex; align-items: center; justify-content: center;
          padding: 2.5rem; background: #fff;
        }
        .mb-card { width: 100%; max-width: 440px; }

        .mb-card-title {
          font-size: 1.55rem; font-weight: 800; color: #111;
          letter-spacing: -0.03em; line-height: 1.15; margin-bottom: 0.3rem;
        }
        .mb-card-title span { color: #C0392B; }
        .mb-card-sub { font-size: 0.83rem; color: #999; margin-bottom: 1.75rem; line-height: 1.5; }

        .mb-fields { display: flex; flex-direction: column; gap: 1rem; }

        /* nav buttons */
        .mb-nav { display: flex; gap: 0.75rem; margin-top: 0.5rem; }
        .mb-btn-back {
          flex: 0 0 auto;
          padding: 0.8rem 1.2rem;
          background: #f5f5f5; color: #555;
          border: 1.5px solid #e8e8e8; border-radius: 10px;
          font-size: 0.88rem; font-weight: 600; cursor: pointer;
          transition: background 0.15s; font-family: inherit;
        }
        .mb-btn-back:hover { background: #ebebeb; }
        .mb-btn-next {
          flex: 1;
          padding: 0.82rem;
          background: #C0392B; color: #fff;
          border: none; border-radius: 10px;
          font-size: 0.93rem; font-weight: 700; cursor: pointer;
          transition: background 0.15s, box-shadow 0.15s;
          display: flex; align-items: center; justify-content: center;
          gap: 0.5rem; font-family: inherit;
        }
        .mb-btn-next:hover:not(:disabled) {
          background: #a93226;
          box-shadow: 0 4px 18px rgba(192,57,43,0.26);
        }
        .mb-btn-next:disabled { opacity: 0.65; cursor: not-allowed; }

        .mb-spinner {
          width: 15px; height: 15px;
          border: 2px solid rgba(255,255,255,0.35);
          border-top-color: #fff; border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .mb-divider {
          display: flex; align-items: center; gap: 0.75rem;
          color: #ccc; font-size: 0.76rem; margin: 0.25rem 0;
        }
        .mb-divider::before, .mb-divider::after {
          content: ""; flex: 1; height: 1px; background: #e8e8e8;
        }
        .mb-btn-google {
          width: 100%; padding: 0.78rem;
          background: #f5f5f5; color: #444;
          border: 1.5px solid #e8e8e8; border-radius: 10px;
          font-size: 0.88rem; font-weight: 600; cursor: pointer;
          transition: background 0.15s; font-family: inherit;
          display: flex; align-items: center; justify-content: center; gap: 0.5rem;
        }
        .mb-btn-google:hover { background: #ebebeb; }

        .mb-login-row {
          text-align: center; font-size: 0.82rem; color: #999; margin-top: 1.25rem;
        }
        .mb-login-row a {
          color: #C0392B; font-weight: 600; text-decoration: none;
        }
        .mb-login-row a:hover { text-decoration: underline; }

        /* ── Mobile ───────────────────────────────────────────── */
        @media (max-width: 720px) {
          .mb-root { grid-template-columns: 1fr; }
          .mb-left { display: none; }
          .mb-right {
            padding: 1.75rem 1.25rem;
            background: #f7f7f5;
            min-height: 100vh;
            align-items: flex-start;
            padding-top: 2.5rem;
          }
          .mb-card {
            background: #fff; border-radius: 16px;
            padding: 1.75rem 1.5rem;
            box-shadow: 0 4px 32px rgba(0,0,0,0.07);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .mb-spinner { animation: none; opacity: 0.6; }
        }

        input:focus-visible { outline: 2px solid #C0392B; outline-offset: 2px; }
        a:focus-visible     { outline: 2px solid #C0392B; outline-offset: 2px; border-radius: 3px; }
        button:focus-visible { outline: 2px solid #C0392B; outline-offset: 2px; border-radius: 8px; }
      `}</style>

      <div className="mb-root">
        {/* ── LEFT PANEL ─────────────────────────────────────── */}
        <aside className="mb-left" aria-hidden="true">
          <Link href="/" className="mb-left-logo">
            <span className="mb-left-logo-icon">🇲🇲</span>
            Mingalar Bangkok
          </Link>

          <div className="mb-left-body">
            <p className="mb-left-mm">အကောင့်အသစ်ဖန်တီးပါ</p>
            <h2 className="mb-left-heading">
              Join 12,000+
              <br />
              <span>Myanmar members.</span>
            </h2>

            <div className="mb-benefits">
              {[
                {
                  icon: "💼",
                  title: "4,500+ verified jobs",
                  desc: "Factories, hotels, restaurants & tech roles across Thailand",
                },
                {
                  icon: "🏠",
                  title: "Find housing near your workplace",
                  desc: "Budget rooms, condos & worker apartments — verified listings",
                },
                {
                  icon: "🛂",
                  title: "Visa & 90-day reminders",
                  desc: "Never miss a deadline. Get alerts sent to your dashboard",
                },
                {
                  icon: "🤖",
                  title: "Ask Mingalar AI — 24/7",
                  desc: "Get answers in Burmese, Thai, or English anytime",
                },
              ].map((b) => (
                <div className="mb-benefit" key={b.title}>
                  <div className="mb-benefit-icon">{b.icon}</div>
                  <div>
                    <div className="mb-benefit-title">{b.title}</div>
                    <div className="mb-benefit-desc">{b.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="mb-left-foot">© 2026 Mingalar Bangkok by Siam On Cloud Co., Ltd.</p>
        </aside>

        {/* ── RIGHT PANEL ────────────────────────────────────── */}
        <main className="mb-right">
          <div className="mb-card">
            <h1 className="mb-card-title">
              Create your <span>account.</span>
            </h1>
            <p className="mb-card-sub">It&apos;s 100% free — takes about 60 seconds.</p>

            <StepBar current={step} />

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-fields">{stepContent[step]}</div>

              <div className="mb-nav" style={{ marginTop: "1.25rem" }}>
                {step > 0 && (
                  <button type="button" className="mb-btn-back" onClick={back}>
                    ← Back
                  </button>
                )}

                {step < 2 ? (
                  <button type="button" className="mb-btn-next" onClick={next}>
                    Continue →
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="mb-btn-next"
                    disabled={loading}
                    aria-busy={loading}
                  >
                    {loading ? (
                      <>
                        <span className="mb-spinner" role="status" aria-label="Creating account" />
                        Creating account…
                      </>
                    ) : (
                      "Create account →"
                    )}
                  </button>
                )}
              </div>

              {/* Google SSO — only on step 0 */}
              {step === 0 && (
                <>
                  <div className="mb-divider" style={{ marginTop: "1.1rem" }}>
                    or
                  </div>
                  <button type="button" className="mb-btn-google">
                    <svg width="17" height="17" viewBox="0 0 24 24">
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

            <p className="mb-login-row">
              Already have an account? <Link href="/login">Sign in</Link>
            </p>
          </div>
        </main>
      </div>
    </>
  );
}
