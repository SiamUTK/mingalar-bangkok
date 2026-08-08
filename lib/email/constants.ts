export const EMAIL_BRAND = Object.freeze({
  name: "Mingalar Bangkok",
  tagline: "AI-First Super App for the Myanmar Community in Thailand",
  website: "https://mingalarbangkok.com",
  logoAlt: "Mingalar Bangkok",
});

export const EMAIL_DEFAULTS = Object.freeze({
  locale: "en",
  charset: "UTF-8",
  previewLength: 90,
  maxSubjectLength: 150,
});

export const EMAIL_COLORS = Object.freeze({
  primary: "#2563EB",
  primaryForeground: "#FFFFFF",

  secondary: "#7C3AED",
  secondaryForeground: "#FFFFFF",

  accent: "#06B6D4",

  background: "#F8FAFC",
  surface: "#FFFFFF",

  border: "#E2E8F0",

  text: "#0F172A",
  textMuted: "#64748B",
  textPrimary: "#0F172A",
  textSecondary: "#475569",

  success: "#16A34A",
  warning: "#D97706",
  danger: "#DC2626",

  footer: "#94A3B8",
});

export const EMAIL_LAYOUT = Object.freeze({
  width: 600,
  borderRadius: 12,
  contentPadding: 32,
  sectionSpacing: 24,
  footerPadding: 24,
});

export const EMAIL_SOCIAL_LINKS = Object.freeze({
  facebook: "https://facebook.com/mingalarbangkok",
  instagram: "https://instagram.com/mingalarbangkok",
  x: "https://x.com/mingalarbangkok",
  youtube: "https://youtube.com/@mingalarbangkok",
});

export const EMAIL_SUPPORT = Object.freeze({
  helpCenter: "https://mingalarbangkok.com/help",
  contact: "https://mingalarbangkok.com/contact",
  privacy: "https://mingalarbangkok.com/privacy",
  terms: "https://mingalarbangkok.com/terms",
});

export const EMAIL_TEMPLATE = Object.freeze({
  verification: "verification-email",
  welcome: "welcome-email",
  forgotPassword: "forgot-password-email",
  resetPassword: "reset-password-email",
  changeEmail: "change-email-email",
  membershipUpgraded: "membership-upgraded-email",
  membershipExpired: "membership-expired-email",
  businessApproved: "business-approved-email",
  businessRejected: "business-rejected-email",
  reviewNotification: "review-notification-email",
  weeklyDigest: "weekly-digest-email",
  invoice: "invoice-email",
  paymentSuccess: "payment-success-email",
  paymentFailed: "payment-failed-email",
} as const);

export type EmailTemplateName = (typeof EMAIL_TEMPLATE)[keyof typeof EMAIL_TEMPLATE];

export const EMAIL_SUBJECTS = Object.freeze({
  verification: "Verify your email address",
  welcome: "Welcome to Mingalar Bangkok",
  forgotPassword: "Reset your password",
  resetPassword: "Your password has been reset",
  changeEmail: "Confirm your new email address",
  membershipUpgraded: "Your membership has been upgraded",
  membershipExpired: "Your membership has expired",
  businessApproved: "Your business listing has been approved",
  businessRejected: "Your business listing requires changes",
  reviewNotification: "You have received a new review",
  weeklyDigest: "Your weekly Mingalar Bangkok updates",
  invoice: "Your invoice is ready",
  paymentSuccess: "Payment successful",
  paymentFailed: "Payment failed",
} as const);

export const EMAIL_PRIORITY = Object.freeze({
  HIGH: "high",
  NORMAL: "normal",
  LOW: "low",
} as const);

export type EmailPriority = (typeof EMAIL_PRIORITY)[keyof typeof EMAIL_PRIORITY];

export const EMAIL_HEADERS = Object.freeze({
  autoSubmitted: "auto-generated",
  xMailer: "Mingalar Bangkok",
  precedence: "bulk",
});

export const EMAIL_LINKS = Object.freeze({
  dashboard: "/dashboard",
  login: "/login",
  settings: "/settings",
  memberships: "/memberships",
  businesses: "/businesses",
});
