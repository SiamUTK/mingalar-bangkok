import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),

  NEXT_PUBLIC_APP_NAME: z.string().trim().min(1).default("Mingalar Bangkok"),

  NEXT_PUBLIC_APP_URL: z.string().url(),

  RESEND_API_KEY: z
    .string()
    .trim()
    .min(1, "Missing RESEND_API_KEY")
    .startsWith("re_", "Invalid RESEND_API_KEY"),

  EMAIL_FROM: z
    .string()
    .trim()
    .min(1, "Missing EMAIL_FROM")
    .refine((value) => /^[^<>]+<[^<>@\s]+@[^<>@\s]+\.[^<>@\s]+>$/.test(value), {
      message: 'EMAIL_FROM must be in the format: "Display Name <email@example.com>"',
    }),

  EMAIL_REPLY_TO: z
    .string()
    .trim()
    .optional()
    .refine(
      (value) =>
        value === undefined || value.length === 0 || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      {
        message: "EMAIL_REPLY_TO must be a valid email address",
      }
    ),

  EMAIL_SUPPORT: z
    .string()
    .trim()
    .optional()
    .refine(
      (value) =>
        value === undefined || value.length === 0 || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      {
        message: "EMAIL_SUPPORT must be a valid email address",
      }
    ),
});

const parsed = envSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  EMAIL_FROM: process.env.EMAIL_FROM,
  EMAIL_REPLY_TO: process.env.EMAIL_REPLY_TO,
  EMAIL_SUPPORT: process.env.EMAIL_SUPPORT,
});

if (!parsed.success) {
  const errors = parsed.error.issues
    .map((issue) => `• ${issue.path.join(".")}: ${issue.message}`)
    .join("\n");

  throw new Error(`Invalid email configuration:\n${errors}`);
}

const env = parsed.data;

export const emailConfig = Object.freeze({
  app: {
    name: env.NEXT_PUBLIC_APP_NAME,
    url: env.NEXT_PUBLIC_APP_URL,
    environment: env.NODE_ENV,
    isProduction: env.NODE_ENV === "production",
    isDevelopment: env.NODE_ENV === "development",
    isTest: env.NODE_ENV === "test",
  },

  resend: {
    apiKey: env.RESEND_API_KEY,
  },

  sender: {
    from: env.EMAIL_FROM,
    replyTo: env.EMAIL_REPLY_TO && env.EMAIL_REPLY_TO.length > 0 ? env.EMAIL_REPLY_TO : undefined,
    support: env.EMAIL_SUPPORT && env.EMAIL_SUPPORT.length > 0 ? env.EMAIL_SUPPORT : undefined,
  },
});

export type EmailConfig = typeof emailConfig;

export default emailConfig;
