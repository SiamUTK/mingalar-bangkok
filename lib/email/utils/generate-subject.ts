import { EMAIL_BRAND, EMAIL_SUBJECTS } from "../constants";
import type { EmailTemplateName } from "../types";

export interface GenerateSubjectOptions {
  readonly appName?: string;
  readonly prefix?: string;
  readonly suffix?: string;
}

const DEFAULT_APP_NAME = EMAIL_BRAND.name;

const SUBJECTS: Readonly<Record<EmailTemplateName, string>> = {
  verification: EMAIL_SUBJECTS.verification,
  welcome: EMAIL_SUBJECTS.welcome,
  "forgot-password": EMAIL_SUBJECTS.forgotPassword,
  "reset-password": EMAIL_SUBJECTS.resetPassword,
  "change-email": EMAIL_SUBJECTS.changeEmail,
  "membership-upgraded": EMAIL_SUBJECTS.membershipUpgraded,
  "membership-expired": EMAIL_SUBJECTS.membershipExpired,
  "business-approved": EMAIL_SUBJECTS.businessApproved,
  "business-rejected": EMAIL_SUBJECTS.businessRejected,
  "review-notification": EMAIL_SUBJECTS.reviewNotification,
  "weekly-digest": EMAIL_SUBJECTS.weeklyDigest,
  invoice: EMAIL_SUBJECTS.invoice,
  "payment-success": EMAIL_SUBJECTS.paymentSuccess,
  "payment-failed": EMAIL_SUBJECTS.paymentFailed,
};

const sanitize = (value: string): string => value.replace(/\s+/g, " ").trim();

export const getDefaultSubject = (template: EmailTemplateName): string => SUBJECTS[template];

export const generateSubject = (
  template: EmailTemplateName,
  options: GenerateSubjectOptions = {}
): string => {
  const appName = sanitize(options.appName ?? DEFAULT_APP_NAME);
  const subject = sanitize(getDefaultSubject(template));

  const parts = [
    options.prefix ? sanitize(options.prefix) : undefined,
    `[${appName}]`,
    subject,
    options.suffix ? sanitize(options.suffix) : undefined,
  ].filter(Boolean);

  return parts.join(" ");
};

export default generateSubject;
