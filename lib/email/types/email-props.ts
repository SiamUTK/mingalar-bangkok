export interface BaseEmailProps {
  readonly recipientEmail: string;
  readonly recipientName: string;
  readonly locale?: "en" | "th" | "my";
}

export interface VerificationEmailProps extends BaseEmailProps {
  readonly verificationUrl: string;
  readonly expiresInMinutes: number;
}

export interface WelcomeEmailProps extends BaseEmailProps {
  readonly dashboardUrl: string;
}

export interface ForgotPasswordEmailProps extends BaseEmailProps {
  readonly resetPasswordUrl: string;
  readonly expiresInMinutes: number;
}

export interface ResetPasswordEmailProps extends BaseEmailProps {
  readonly loginUrl: string;
  readonly supportEmail?: string;
}

export interface ChangeEmailEmailProps extends BaseEmailProps {
  readonly newEmail: string;
  readonly confirmationUrl: string;
  readonly expiresInMinutes: number;
}

export interface MembershipUpgradedEmailProps extends BaseEmailProps {
  readonly planName: string;
  readonly startedAt: Date;
  readonly expiresAt?: Date;
  readonly dashboardUrl: string;
}

export interface MembershipExpiredEmailProps extends BaseEmailProps {
  readonly planName: string;
  readonly expiredAt: Date;
  readonly renewUrl: string;
}

export interface BusinessApprovedEmailProps extends BaseEmailProps {
  readonly businessName: string;
  readonly businessUrl: string;
  readonly dashboardUrl?: string;
  readonly approvalDate?: Date;
}

export interface BusinessRejectedEmailProps extends BaseEmailProps {
  readonly businessName: string;
  readonly reason: string;
  readonly editListingUrl: string;
}

export interface ReviewNotificationEmailProps extends BaseEmailProps {
  readonly businessName: string;
  readonly reviewerName: string;
  readonly rating: number;
  readonly review: string;
  readonly reviewComment?: string;
  readonly reviewUrl: string;
}

export interface WeeklyDigestItem {
  readonly title: string;
  readonly description: string;
  readonly url: string;
}

export interface WeeklyDigestEmailProps extends BaseEmailProps {
  readonly weekLabel: string;
  readonly items: readonly WeeklyDigestItem[];
}

export interface InvoiceItem {
  readonly description: string;
  readonly quantity: number;
  readonly unitPrice: number;
  readonly total: number;
}

export interface InvoiceEmailProps extends BaseEmailProps {
  readonly invoiceNumber: string;
  readonly invoiceDate: Date;
  readonly dueDate: Date;
  readonly currency: string;
  readonly items: readonly InvoiceItem[];
  readonly subtotal: number;
  readonly tax: number;
  readonly total: number;
  readonly invoiceUrl: string;
}

export interface PaymentSuccessEmailProps extends BaseEmailProps {
  readonly amount: number;
  readonly currency: string;
  readonly paymentDate: Date;
  readonly receiptUrl: string;
  readonly referenceNumber: string;
  readonly paymentUrl?: string;
  readonly planName?: string;
}

export interface PaymentFailedEmailProps extends BaseEmailProps {
  readonly amount: number;
  readonly currency: string;
  readonly failureReason: string;
  readonly retryUrl: string;
  readonly paymentUrl?: string;
  readonly planName?: string;
}

export type EmailPropsMap = {
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
};

export type EmailTemplateProps<T extends keyof EmailPropsMap = keyof EmailPropsMap> =
  EmailPropsMap[T];
