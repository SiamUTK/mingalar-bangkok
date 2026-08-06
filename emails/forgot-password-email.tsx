import * as React from "react";
import {
  EmailLayout,
  Heading,
  Section,
  Text,
  MutedText,
  SmallText,
  Divider,
  Button,
} from "@/lib/email/components";
import { EMAIL_BRAND, EMAIL_COLORS } from "@/lib/email/constants";
import type { ForgotPasswordEmailProps } from "@/lib/email/types/email-props";

export default function ForgotPasswordEmail({
  name,
  resetUrl,
  expiresInMinutes = 30,
}: ForgotPasswordEmailProps): React.JSX.Element {
  return (
    <EmailLayout previewText={`Reset your password for ${EMAIL_BRAND.name}`}>
      <Section style={styles.container}>
        <Heading style={styles.heading}>Reset Your Password</Heading>

        <Text style={styles.text}>Hello {name},</Text>

        <Text style={styles.text}>
          We received a request to reset the password for your {EMAIL_BRAND.name} account. If you
          made this request, click the button below to choose a new password.
        </Text>

        <Section style={styles.buttonContainer}>
          <Button href={resetUrl} style={styles.button}>
            Reset Password
          </Button>
        </Section>

        <Text style={styles.text}>
          This password reset link is secure and will expire in {expiresInMinutes} minutes. If you
          did not request a password reset, please ignore this email or contact support if you have
          concerns.
        </Text>

        <Divider style={styles.divider} />

        <MutedText style={styles.mutedText}>
          If you're having trouble clicking the button, copy and paste the URL below into your web
          browser:
        </MutedText>

        <SmallText style={styles.linkText}>{resetUrl}</SmallText>
      </Section>
    </EmailLayout>
  );
}

const styles = {
  container: {
    padding: "0 24px",
  },
  heading: {
    color: EMAIL_COLORS.textPrimary,
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "left" as const,
    margin: "0 0 20px",
  },
  text: {
    color: EMAIL_COLORS.textSecondary,
    fontSize: "16px",
    lineHeight: "24px",
    margin: "0 0 16px",
  },
  buttonContainer: {
    margin: "24px 0",
    textAlign: "center" as const,
  },
  button: {
    backgroundColor: EMAIL_COLORS.primary,
    borderRadius: "6px",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "bold",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "inline-block",
    padding: "12px 24px",
  },
  divider: {
    borderColor: EMAIL_COLORS.border,
    margin: "24px 0",
  },
  mutedText: {
    color: EMAIL_COLORS.textMuted,
    fontSize: "14px",
    lineHeight: "20px",
    margin: "0 0 8px",
  },
  linkText: {
    color: EMAIL_COLORS.primary,
    fontSize: "12px",
    wordBreak: "break-all" as const,
    margin: "0",
  },
};
