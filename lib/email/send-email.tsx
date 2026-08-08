import { render } from "@react-email/render";
import { Resend } from "resend";
import type { CreateEmailOptions } from "resend";

import VerificationEmail from "@/emails/verification-email";
import WelcomeEmail from "@/emails/welcome-email";
import ForgotPasswordEmail from "@/emails/forgot-password-email";
import ResetPasswordEmail from "@/emails/reset-password-email";
import ChangeEmailEmail from "@/emails/change-email-email";
import MembershipUpgradedEmail from "@/emails/membership-upgraded-email";
import MembershipExpiredEmail from "@/emails/membership-expired-email";
import BusinessApprovedEmail from "@/emails/business-approved-email";
import BusinessRejectedEmail from "@/emails/business-rejected-email";
import ReviewNotificationEmail from "@/emails/review-notification-email";
import WeeklyDigestEmail from "@/emails/weekly-digest-email";
import InvoiceEmail from "@/emails/invoice-email";
import PaymentSuccessEmail from "@/emails/payment-success-email";
import PaymentFailedEmail from "@/emails/payment-failed-email";

import type {
  EmailTemplateName,
  EmailPropsMap,
  EmailRecipient,
  SendEmailOptions,
  SendEmailResult,
} from "./types";

const resend = new Resend(process.env.RESEND_API_KEY);
const DEFAULT_FROM = process.env.EMAIL_FROM || "noreply@example.com";

const TEMPLATE_REGISTRY: {
  [K in EmailTemplateName]: React.ComponentType<EmailPropsMap[K]>;
} = {
  verification: VerificationEmail,
  welcome: WelcomeEmail,
  "forgot-password": ForgotPasswordEmail,
  "reset-password": ResetPasswordEmail,
  "change-email": ChangeEmailEmail,
  "membership-upgraded": MembershipUpgradedEmail,
  "membership-expired": MembershipExpiredEmail,
  "business-approved": BusinessApprovedEmail,
  "business-rejected": BusinessRejectedEmail,
  "review-notification": ReviewNotificationEmail,
  "weekly-digest": WeeklyDigestEmail,
  invoice: InvoiceEmail,
  "payment-success": PaymentSuccessEmail,
  "payment-failed": PaymentFailedEmail,
};

export function normalizeRecipients(
  recipient: EmailRecipient | readonly EmailRecipient[] | string | readonly string[]
): string[] {
  const recipients = Array.isArray(recipient) ? recipient : [recipient];

  return recipients.map((item) => {
    if (typeof item === "string") {
      return item;
    }
    if (typeof item === "object" && item !== null && "email" in item) {
      const emailValue = (item as { email: unknown }).email;
      if (typeof emailValue === "string") {
        return emailValue;
      }
    }
    throw new Error("Invalid recipient format");
  });
}

export function renderTemplate<TName extends EmailTemplateName>(
  templateName: TName,
  props: EmailPropsMap[TName]
): React.ReactElement {
  const Component = TEMPLATE_REGISTRY[templateName] as React.ComponentType<EmailPropsMap[TName]>;
  return <Component {...props} />;
}

export async function buildPayload<TName extends EmailTemplateName>(
  options: SendEmailOptions<TName>
): Promise<CreateEmailOptions> {
  const element = renderTemplate(options.template, options.props);

  const [html, text] = await Promise.all([
    render(element, { pretty: false }),
    render(element, { plainText: true }),
  ]);

  const payload: CreateEmailOptions = {
    from: options.from || DEFAULT_FROM,
    to: normalizeRecipients(options.to),
    ...(options.cc ? { cc: normalizeRecipients(options.cc) } : {}),
    ...(options.bcc ? { bcc: normalizeRecipients(options.bcc) } : {}),
    ...(options.replyTo ? { replyTo: options.replyTo } : {}),
    subject: options.subject ?? "Mingalar Bangkok",
    html,
    text,
    react: element,
    ...(options.headers ? { headers: { ...options.headers } } : {}),
    ...(options.tags
      ? { tags: Object.entries(options.tags).map(([name, value]) => ({ name, value })) }
      : {}),
    ...(options.attachments ? { attachments: [...options.attachments] } : {}),
  };

  return payload;
}

export async function sendEmail<TName extends EmailTemplateName>(
  options: SendEmailOptions<TName>
): Promise<SendEmailResult> {
  try {
    const payload = await buildPayload(options);
    const { data, error } = await resend.emails.send(payload);

    if (error) {
      return {
        success: false,
        error: new Error(error.message),
      };
    }

    if (!data) {
      return {
        success: false,
        error: new Error("Unknown error occurred while sending email"),
      };
    }

    return {
      success: true,
      data: { id: data.id },
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err : new Error(String(err)),
    };
  }
}

export async function sendVerificationEmail(
  to: EmailRecipient | EmailRecipient[] | string | string[],
  props: EmailPropsMap["verification"],
  subject = "Verify your email address"
): Promise<SendEmailResult> {
  return sendEmail({
    template: "verification",
    to,
    subject,
    props,
  });
}

export async function sendWelcomeEmail(
  to: EmailRecipient | EmailRecipient[] | string | string[],
  props: EmailPropsMap["welcome"],
  subject = "Welcome to our platform!"
): Promise<SendEmailResult> {
  return sendEmail({
    template: "welcome",
    to,
    subject,
    props,
  });
}

export async function sendForgotPasswordEmail(
  to: EmailRecipient | EmailRecipient[] | string | string[],
  props: EmailPropsMap["forgot-password"],
  subject = "Reset your password"
): Promise<SendEmailResult> {
  return sendEmail({
    template: "forgot-password",
    to,
    subject,
    props,
  });
}

export async function sendResetPasswordEmail(
  to: EmailRecipient | EmailRecipient[] | string | string[],
  props: EmailPropsMap["reset-password"],
  subject = "Your password has been reset"
): Promise<SendEmailResult> {
  return sendEmail({
    template: "reset-password",
    to,
    subject,
    props,
  });
}

export async function sendChangeEmailEmail(
  to: EmailRecipient | EmailRecipient[] | string | string[],
  props: EmailPropsMap["change-email"],
  subject = "Confirm your new email address"
): Promise<SendEmailResult> {
  return sendEmail({
    template: "change-email",
    to,
    subject,
    props,
  });
}

export async function sendMembershipUpgradedEmail(
  to: EmailRecipient | EmailRecipient[] | string | string[],
  props: EmailPropsMap["membership-upgraded"],
  subject = "Your membership has been upgraded!"
): Promise<SendEmailResult> {
  return sendEmail({
    template: "membership-upgraded",
    to,
    subject,
    props,
  });
}

export async function sendMembershipExpiredEmail(
  to: EmailRecipient | EmailRecipient[] | string | string[],
  props: EmailPropsMap["membership-expired"],
  subject = "Your membership has expired"
): Promise<SendEmailResult> {
  return sendEmail({
    template: "membership-expired",
    to,
    subject,
    props,
  });
}

export async function sendBusinessApprovedEmail(
  to: EmailRecipient | EmailRecipient[] | string | string[],
  props: EmailPropsMap["business-approved"],
  subject = "Your business account has been approved!"
): Promise<SendEmailResult> {
  return sendEmail({
    template: "business-approved",
    to,
    subject,
    props,
  });
}

export async function sendBusinessRejectedEmail(
  to: EmailRecipient | EmailRecipient[] | string | string[],
  props: EmailPropsMap["business-rejected"],
  subject = "Update regarding your business account application"
): Promise<SendEmailResult> {
  return sendEmail({
    template: "business-rejected",
    to,
    subject,
    props,
  });
}

export async function sendReviewNotificationEmail(
  to: EmailRecipient | EmailRecipient[] | string | string[],
  props: EmailPropsMap["review-notification"],
  subject = "You have a new review"
): Promise<SendEmailResult> {
  return sendEmail({
    template: "review-notification",
    to,
    subject,
    props,
  });
}

export async function sendWeeklyDigestEmail(
  to: EmailRecipient | EmailRecipient[] | string | string[],
  props: EmailPropsMap["weekly-digest"],
  subject = "Your Weekly Digest"
): Promise<SendEmailResult> {
  return sendEmail({
    template: "weekly-digest",
    to,
    subject,
    props,
  });
}

export async function sendInvoiceEmail(
  to: EmailRecipient | EmailRecipient[] | string | string[],
  props: EmailPropsMap["invoice"],
  subject = "Your Invoice"
): Promise<SendEmailResult> {
  return sendEmail({
    template: "invoice",
    to,
    subject,
    props,
  });
}

export async function sendPaymentSuccessEmail(
  to: EmailRecipient | EmailRecipient[] | string | string[],
  props: EmailPropsMap["payment-success"],
  subject = "Payment Successful"
): Promise<SendEmailResult> {
  return sendEmail({
    template: "payment-success",
    to,
    subject,
    props,
  });
}

export async function sendPaymentFailedEmail(
  to: EmailRecipient | EmailRecipient[] | string | string[],
  props: EmailPropsMap["payment-failed"],
  subject = "Payment Failed"
): Promise<SendEmailResult> {
  return sendEmail({
    template: "payment-failed",
    to,
    subject,
    props,
  });
}
