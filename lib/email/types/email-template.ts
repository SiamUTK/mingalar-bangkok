import type {
  BaseEmailProps,
  BusinessApprovedEmailProps,
  BusinessRejectedEmailProps,
  ChangeEmailEmailProps,
  ForgotPasswordEmailProps,
  InvoiceEmailProps,
  MembershipExpiredEmailProps,
  MembershipUpgradedEmailProps,
  PaymentFailedEmailProps,
  PaymentSuccessEmailProps,
  ResetPasswordEmailProps,
  ReviewNotificationEmailProps,
  VerificationEmailProps,
  WeeklyDigestEmailProps,
  WelcomeEmailProps,
} from "./email-props";

export type EmailTemplateName =
  | "verification"
  | "welcome"
  | "forgot-password"
  | "reset-password"
  | "change-email"
  | "membership-upgraded"
  | "membership-expired"
  | "business-approved"
  | "business-rejected"
  | "review-notification"
  | "weekly-digest"
  | "invoice"
  | "payment-success"
  | "payment-failed";

export interface EmailTemplateMap {
  verification: VerificationEmailProps;
  welcome: WelcomeEmailProps;
  "forgot-password": ForgotPasswordEmailProps;
  "reset-password": ResetPasswordEmailProps;
  "change-email": ChangeEmailEmailProps;
  "membership-upgraded": MembershipUpgradedEmailProps;
  "membership-expired": MembershipExpiredEmailProps;
  "business-approved": BusinessApprovedEmailProps;
  "business-rejected": BusinessRejectedEmailProps;
  "review-notification": ReviewNotificationEmailProps;
  "weekly-digest": WeeklyDigestEmailProps;
  invoice: InvoiceEmailProps;
  "payment-success": PaymentSuccessEmailProps;
  "payment-failed": PaymentFailedEmailProps;
}

export type EmailTemplateProps<T extends EmailTemplateName = EmailTemplateName> =
  EmailTemplateMap[T];

export interface EmailTemplateComponent<T extends EmailTemplateName = EmailTemplateName> {
  (props: EmailTemplateProps<T>): React.ReactElement | Promise<React.ReactElement>;
}

export interface EmailRenderResult {
  readonly subject: string;
  readonly html: string;
  readonly text?: string;
}

export interface EmailMessage<T extends EmailTemplateName = EmailTemplateName> {
  readonly template: T;
  readonly props: EmailTemplateProps<T>;
}

export interface EmailRecipient {
  readonly email: string;
  readonly name?: string;
}

export interface EmailAttachment {
  readonly filename: string;
  readonly content: string | Buffer;
  readonly contentType?: string;
  readonly contentId?: string;
}

export interface SendEmailOptions<T extends EmailTemplateName = EmailTemplateName> {
  readonly from?: string;
  readonly to: EmailRecipient | readonly EmailRecipient[] | string | readonly string[];
  readonly cc?: EmailRecipient | readonly EmailRecipient[] | string | readonly string[];
  readonly bcc?: EmailRecipient | readonly EmailRecipient[] | string | readonly string[];
  readonly replyTo?: string;
  readonly subject?: string;
  readonly template: T;
  readonly props: EmailTemplateProps<T>;
  readonly attachments?: readonly EmailAttachment[];
  readonly tags?: Readonly<Record<string, string>>;
  readonly headers?: Readonly<Record<string, string>>;
}

export interface SendEmailResult {
  readonly success: boolean;
  readonly data?: { readonly id: string };
  readonly error?: Error;
}

export interface EmailQueueJob<T extends EmailTemplateName = EmailTemplateName> {
  readonly id: string;
  readonly createdAt: Date;
  readonly options: SendEmailOptions<T>;
}

export interface EmailContext {
  readonly appName: string;
  readonly appUrl: string;
  readonly locale: BaseEmailProps["locale"];
}
