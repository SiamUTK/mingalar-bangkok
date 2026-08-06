export { default as emailConfig } from "./config";

export {
  EMAIL_BRAND,
  EMAIL_COLORS,
  EMAIL_DEFAULTS,
  EMAIL_HEADERS,
  EMAIL_LAYOUT,
  EMAIL_LINKS,
  EMAIL_PRIORITY,
  EMAIL_SOCIAL_LINKS,
  EMAIL_SUBJECTS,
  EMAIL_SUPPORT,
  EMAIL_TEMPLATE,
} from "./constants";

export type { EmailPriority, EmailTemplateName } from "./constants";

export {
  default as resend,
  emailClient,
  assertResendConfigured,
  isResendConfigured,
} from "./resend";
