import React from "react";
import { render } from "@react-email/render";
import type { CreateEmailOptions } from "resend";

import { EMAIL_HEADERS, EMAIL_PRIORITY, EMAIL_TEMPLATE, emailConfig, resend } from "@/lib/email";

import type {
  EmailAttachment,
  EmailRecipient,
  EmailTemplateName,
  SendEmailOptions,
  EmailTemplateProps,
} from "@/lib/email/types";

import VerificationEmail from "@/emails/verification-email";
import WelcomeEmail from "@/emails/welcome-email";
import ForgotPasswordEmail from "@/emails/forgot-password-email";
import ResetPasswordEmail from "@/emails/reset-password-email";

import { generateSubject } from "./utils";

export interface SendEmailResult {
  readonly id: string;
  readonly success: boolean;
}

type RecipientInput = EmailRecipient | readonly EmailRecipient[] | string | readonly string[];

const normalizeRecipient = (recipient: EmailRecipient): string => {
  const email = recipient.email.trim();
  if (recipient.name?.trim()) {
    return `${recipient.name.trim()} <${email}>`;
  }
  return email;
};

// แก้ไข normalizeRecipients ให้รองรับทั้ง Single Item และ Array
const normalizeRecipients = (recipients: RecipientInput): string[] => {
  if (typeof recipients === "string") {
    return [recipients.trim()];
  }

  if (Array.isArray(recipients)) {
    return recipients.map((recipient) => {
      if (typeof recipient === "string") {
        return recipient.trim();
      }
      return normalizeRecipient(recipient);
    });
  }

  return [normalizeRecipient(recipients)];
};

const normalizeAttachments = (
  attachments?: readonly EmailAttachment[]
): CreateEmailOptions["attachments"] => {
  if (!attachments?.length) {
    return undefined;
  }
  return attachments.map((attachment) => ({
    filename: attachment.filename,
    content: attachment.content,
    contentType: attachment.contentType,
    contentId: attachment.contentId,
  }));
};

const createHeaders = (headers?: Readonly<Record<string, string>>): Record<string, string> => ({
  "Auto-Submitted": EMAIL_HEADERS.autoSubmitted,
  "X-Mailer": EMAIL_HEADERS.xMailer,
  Precedence: EMAIL_HEADERS.precedence,
  ...(headers ?? {}),
});

const createTags = (
  template: EmailTemplateName,
  tags?: Readonly<Record<string, string>>
): NonNullable<CreateEmailOptions["tags"]> => [
  { name: "template", value: template },
  { name: "environment", value: emailConfig.app.environment },
  ...(tags
    ? Object.entries(tags).map(([name, value]) => ({
        name,
        value,
      }))
    : []),
];

const validateSubject = (subject: string): string => {
  const value = subject.trim();
  if (!value) {
    throw new Error("Email subject cannot be empty.");
  }
  return value;
};

// แก้ไข Registry Type และ renderTemplate เพื่อหลีกเลี่ยง any / never
const templateRegistry: Partial<
  Record<EmailTemplateName, React.ComponentType<Record<string, unknown>>>
> = {
  verification: VerificationEmail as React.ComponentType<Record<string, unknown>>,
  welcome: WelcomeEmail as React.ComponentType<Record<string, unknown>>,
  "forgot-password": ForgotPasswordEmail as React.ComponentType<Record<string, unknown>>,
  "reset-password": ResetPasswordEmail as React.ComponentType<Record<string, unknown>>,
};

const renderTemplate = (
  template: EmailTemplateName,
  props: EmailTemplateProps
): React.ReactElement => {
  const Component = templateRegistry[template];

  if (!Component) {
    throw new Error(`Email template "${template}" is not registered.`);
  }

  const ComponentProps = (props ?? {}) as Record<string, unknown>;
  return <Component {...ComponentProps} />;
};

const resolveSubject = (options: SendEmailOptions): string => {
  if (options.subject?.trim()) {
    return validateSubject(options.subject);
  }
  return generateSubject(options.template);
};

const resolvePriority = (priority: keyof typeof EMAIL_PRIORITY = "NORMAL"): string =>
  EMAIL_PRIORITY[priority];

const isKnownTemplate = (template: string): template is EmailTemplateName =>
  Object.values(EMAIL_TEMPLATE).includes(
    template as (typeof EMAIL_TEMPLATE)[keyof typeof EMAIL_TEMPLATE]
  );

const buildPayload = async (options: SendEmailOptions): Promise<CreateEmailOptions> => {
  if (!isKnownTemplate(options.template)) {
    throw new Error(`Unknown email template "${options.template}".`);
  }

  const react = renderTemplate(options.template, options.props);
  const html = await render(react, { pretty: true });
  const text = await render(react, { plainText: true });

  return {
    from: emailConfig.sender.from,
    to: normalizeRecipients(options.to),
    cc: options.cc ? normalizeRecipients(options.cc) : undefined,
    bcc: options.bcc ? normalizeRecipients(options.bcc) : undefined,
    replyTo: options.replyTo ?? emailConfig.sender.replyTo,
    subject: resolveSubject(options),
    html,
    text,
    headers: createHeaders(options.headers),
    tags: createTags(options.template, options.tags),
    attachments: normalizeAttachments(options.attachments),
  };
};

export const sendEmail = async (options: SendEmailOptions): Promise<SendEmailResult> => {
  const payload = await buildPayload(options);
  const { data, error } = await resend.emails.send(payload);

  if (error) {
    throw new Error(error.message || "Failed to send email.");
  }
  if (!data?.id) {
    throw new Error("Resend did not return an email ID.");
  }

  return Object.freeze({
    id: data.id,
    success: true,
  });
};

export const sendVerificationEmail = (props: EmailTemplateProps<"verification">) =>
  sendEmail({
    to: { email: props.recipientEmail, name: props.recipientName },
    template: "verification",
    props,
  });

export const sendWelcomeEmail = (props: EmailTemplateProps<"welcome">) =>
  sendEmail({
    to: { email: props.recipientEmail, name: props.recipientName },
    template: "welcome",
    props,
  });

export const sendForgotPasswordEmail = (props: EmailTemplateProps<"forgot-password">) =>
  sendEmail({
    to: { email: props.recipientEmail, name: props.recipientName },
    template: "forgot-password",
    props,
  });

export const sendResetPasswordEmail = (props: EmailTemplateProps<"reset-password">) =>
  sendEmail({
    to: { email: props.recipientEmail, name: props.recipientName },
    template: "reset-password",
    props,
  });

export const sendChangeEmailEmail = (props: EmailTemplateProps<"change-email">) =>
  sendEmail({
    to: { email: props.recipientEmail, name: props.recipientName },
    template: "change-email",
    props,
  });

export const sendMembershipUpgradedEmail = (props: EmailTemplateProps<"membership-upgraded">) =>
  sendEmail({
    to: { email: props.recipientEmail, name: props.recipientName },
    template: "membership-upgraded",
    props,
  });

export const sendMembershipExpiredEmail = (props: EmailTemplateProps<"membership-expired">) =>
  sendEmail({
    to: { email: props.recipientEmail, name: props.recipientName },
    template: "membership-expired",
    props,
  });

export const sendBusinessApprovedEmail = (props: EmailTemplateProps<"business-approved">) =>
  sendEmail({
    to: { email: props.recipientEmail, name: props.recipientName },
    template: "business-approved",
    props,
  });

export const sendBusinessRejectedEmail = (props: EmailTemplateProps<"business-rejected">) =>
  sendEmail({
    to: { email: props.recipientEmail, name: props.recipientName },
    template: "business-rejected",
    props,
  });

export const sendReviewNotificationEmail = (props: EmailTemplateProps<"review-notification">) =>
  sendEmail({
    to: { email: props.recipientEmail, name: props.recipientName },
    template: "review-notification",
    props,
  });

export const sendWeeklyDigestEmail = (props: EmailTemplateProps<"weekly-digest">) =>
  sendEmail({
    to: { email: props.recipientEmail, name: props.recipientName },
    template: "weekly-digest",
    props,
  });

export const sendInvoiceEmail = (props: EmailTemplateProps<"invoice">) =>
  sendEmail({
    to: { email: props.recipientEmail, name: props.recipientName },
    template: "invoice",
    props,
  });

export const sendPaymentSuccessEmail = (props: EmailTemplateProps<"payment-success">) =>
  sendEmail({
    to: { email: props.recipientEmail, name: props.recipientName },
    template: "payment-success",
    props,
  });

export const sendPaymentFailedEmail = (props: EmailTemplateProps<"payment-failed">) =>
  sendEmail({
    to: { email: props.recipientEmail, name: props.recipientName },
    template: "payment-failed",
    props,
  });

export {
  buildPayload,
  createHeaders,
  createTags,
  generateSubject,
  isKnownTemplate,
  normalizeAttachments,
  normalizeRecipients,
  renderTemplate,
  resolvePriority,
  resolveSubject,
};

export default sendEmail;
