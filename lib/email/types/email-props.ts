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
  readonly confirmEmailUrl: string;
  readonly expiresInMinutes: number;
}

export interface MembershipUpgradedEmailProps extends BaseEmailProps {
  readonly newPlanName: string;
  readonly effectiveDate: string;
  readonly nextBillingDate?: string;
  readonly dashboardUrl: string;
}

export interface MembershipExpiredEmailProps extends BaseEmailProps {
  readonly previousPlanName: string;
  readonly expirationDate: string;
  readonly renewUrl: string;
}

export interface BusinessApprovedEmailProps extends BaseEmailProps {
  readonly businessName: string;
  readonly businessUrl?: string;
  readonly dashboardUrl: string;
  readonly approvalDate?: string;
}

export interface BusinessRejectedEmailProps extends BaseEmailProps {
  readonly businessName: string;
  readonly rejectionReason?: string;
  readonly editListingUrl: string;
  readonly rejectionDate?: string;
}

export interface ReviewNotificationEmailProps extends BaseEmailProps {
  readonly businessName: string;
  readonly reviewerName: string;
  readonly rating: number;
  readonly reviewComment: string;
  readonly reviewDate?: string;
  readonly viewReviewUrl: string;
}

export interface WeeklyDigestItem {
  readonly title: string;
  readonly description: string;
  readonly url: string;
}

export interface WeeklyDigestEmailProps extends BaseEmailProps {
  readonly weekRange?: string;
  readonly featuredJobs?: readonly WeeklyDigestItem[];
  readonly featuredBusinesses?: readonly WeeklyDigestItem[];
  readonly featuredHousing?: readonly WeeklyDigestItem[];
  readonly communityHighlights?: readonly WeeklyDigestItem[];
  readonly dashboardUrl: string;
  readonly unsubscribeUrl?: string;
}

export interface InvoiceEmailProps extends BaseEmailProps {
  readonly invoiceNumber: string;
  readonly issueDate: string;
  readonly dueDate?: string;
  readonly amount: number;
  readonly currency?: string;
  readonly description?: string;
  readonly invoiceUrl?: string;
  readonly paymentUrl?: string;
}

export interface PaymentSuccessEmailProps extends BaseEmailProps {
  readonly amount: number;
  readonly currency?: string;
  readonly transactionId: string;
  readonly paymentDate: string;
  readonly planName?: string;
  readonly receiptUrl: string;
  readonly dashboardUrl: string;
}

export interface PaymentFailedEmailProps extends BaseEmailProps {
  readonly amount: number;
  readonly currency?: string;
  readonly planName?: string;
  readonly failureReason: string;
  readonly updatePaymentUrl: string;
  readonly retryDate?: string;
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

export type EmailTemplateName = keyof EmailPropsMap;

export type EmailTemplateProps<T extends EmailTemplateName = EmailTemplateName> = EmailPropsMap[T];
