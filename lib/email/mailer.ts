import {
  sendBusinessApprovedEmail,
  sendBusinessRejectedEmail,
  sendChangeEmailEmail,
  sendEmail,
  sendForgotPasswordEmail,
  sendInvoiceEmail,
  sendMembershipExpiredEmail,
  sendMembershipUpgradedEmail,
  sendPaymentFailedEmail,
  sendPaymentSuccessEmail,
  sendResetPasswordEmail,
  sendReviewNotificationEmail,
  sendVerificationEmail,
  sendWeeklyDigestEmail,
  sendWelcomeEmail,
} from "./send-email";
import type { EmailTemplateName, EmailTemplateProps, SendEmailOptions } from "./types";

export class MailerService {
  /**
   * Generic low-level send method.
   */
  public async send<TName extends EmailTemplateName>(options: SendEmailOptions<TName>) {
    return sendEmail(options);
  }

  /**
   * Sends transactional account verification email.
   */
  public async sendVerification(to: string, props: EmailTemplateProps<"verification">) {
    return sendVerificationEmail(to, props);
  }

  /**
   * Sends welcome email upon successful account registration.
   */
  public async sendWelcome(to: string, props: EmailTemplateProps<"welcome">) {
    return sendWelcomeEmail(to, props);
  }

  /**
   * Sends password reset link email.
   */
  public async sendForgotPassword(to: string, props: EmailTemplateProps<"forgot-password">) {
    return sendForgotPasswordEmail(to, props);
  }

  /**
   * Sends confirmation email after password reset completion.
   */
  public async sendResetPassword(to: string, props: EmailTemplateProps<"reset-password">) {
    return sendResetPasswordEmail(to, props);
  }

  /**
   * Sends email change confirmation request.
   */
  public async sendChangeEmail(to: string, props: EmailTemplateProps<"change-email">) {
    return sendChangeEmailEmail(to, props);
  }

  /**
   * Sends membership upgrade notification.
   */
  public async sendMembershipUpgraded(
    to: string,
    props: EmailTemplateProps<"membership-upgraded">
  ) {
    return sendMembershipUpgradedEmail(to, props);
  }

  /**
   * Sends membership expiration alert.
   */
  public async sendMembershipExpired(to: string, props: EmailTemplateProps<"membership-expired">) {
    return sendMembershipExpiredEmail(to, props);
  }

  /**
   * Sends business listing approval notification.
   */
  public async sendBusinessApproved(to: string, props: EmailTemplateProps<"business-approved">) {
    return sendBusinessApprovedEmail(to, props);
  }

  /**
   * Sends business listing rejection feedback.
   */
  public async sendBusinessRejected(to: string, props: EmailTemplateProps<"business-rejected">) {
    return sendBusinessRejectedEmail(to, props);
  }

  /**
   * Sends customer review alert to vendor.
   */
  public async sendReviewNotification(
    to: string,
    props: EmailTemplateProps<"review-notification">
  ) {
    return sendReviewNotificationEmail(to, props);
  }

  /**
   * Sends curated weekly digest email.
   */
  public async sendWeeklyDigest(to: string, props: EmailTemplateProps<"weekly-digest">) {
    return sendWeeklyDigestEmail(to, props);
  }

  /**
   * Sends billing invoice email.
   */
  public async sendInvoice(to: string, props: EmailTemplateProps<"invoice">) {
    return sendInvoiceEmail(to, props);
  }

  /**
   * Sends payment receipt confirmation.
   */
  public async sendPaymentSuccess(to: string, props: EmailTemplateProps<"payment-success">) {
    return sendPaymentSuccessEmail(to, props);
  }

  /**
   * Sends payment failure notification and recovery link.
   */
  public async sendPaymentFailed(to: string, props: EmailTemplateProps<"payment-failed">) {
    return sendPaymentFailedEmail(to, props);
  }
}

export const mailer = new MailerService();

export default mailer;
