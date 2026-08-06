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
import type { EmailTemplateProps, SendEmailOptions } from "./types";

export class MailerService {
  /**
   * Generic low-level send method.
   */
  public async send(options: SendEmailOptions) {
    return sendEmail(options);
  }

  /**
   * Sends transactional account verification email.
   */
  public async sendVerification(props: EmailTemplateProps<"verification">) {
    return sendVerificationEmail(props);
  }

  /**
   * Sends welcome email upon successful account registration.
   */
  public async sendWelcome(props: EmailTemplateProps<"welcome">) {
    return sendWelcomeEmail(props);
  }

  /**
   * Sends password reset link email.
   */
  public async sendForgotPassword(props: EmailTemplateProps<"forgot-password">) {
    return sendForgotPasswordEmail(props);
  }

  /**
   * Sends confirmation email after password reset completion.
   */
  public async sendResetPassword(props: EmailTemplateProps<"reset-password">) {
    return sendResetPasswordEmail(props);
  }

  /**
   * Sends email change confirmation request.
   */
  public async sendChangeEmail(props: EmailTemplateProps<"change-email">) {
    return sendChangeEmailEmail(props);
  }

  /**
   * Sends membership upgrade notification.
   */
  public async sendMembershipUpgraded(props: EmailTemplateProps<"membership-upgraded">) {
    return sendMembershipUpgradedEmail(props);
  }

  /**
   * Sends membership expiration alert.
   */
  public async sendMembershipExpired(props: EmailTemplateProps<"membership-expired">) {
    return sendMembershipExpiredEmail(props);
  }

  /**
   * Sends business listing approval notification.
   */
  public async sendBusinessApproved(props: EmailTemplateProps<"business-approved">) {
    return sendBusinessApprovedEmail(props);
  }

  /**
   * Sends business listing rejection feedback.
   */
  public async sendBusinessRejected(props: EmailTemplateProps<"business-rejected">) {
    return sendBusinessRejectedEmail(props);
  }

  /**
   * Sends customer review alert to vendor.
   */
  public async sendReviewNotification(props: EmailTemplateProps<"review-notification">) {
    return sendReviewNotificationEmail(props);
  }

  /**
   * Sends curated weekly digest email.
   */
  public async sendWeeklyDigest(props: EmailTemplateProps<"weekly-digest">) {
    return sendWeeklyDigestEmail(props);
  }

  /**
   * Sends billing invoice email.
   */
  public async sendInvoice(props: EmailTemplateProps<"invoice">) {
    return sendInvoiceEmail(props);
  }

  /**
   * Sends payment receipt confirmation.
   */
  public async sendPaymentSuccess(props: EmailTemplateProps<"payment-success">) {
    return sendPaymentSuccessEmail(props);
  }

  /**
   * Sends payment failure notification and recovery link.
   */
  public async sendPaymentFailed(props: EmailTemplateProps<"payment-failed">) {
    return sendPaymentFailedEmail(props);
  }
}

export const mailer = new MailerService();

export default mailer;
