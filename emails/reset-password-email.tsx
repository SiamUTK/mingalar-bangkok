import * as React from "react";
import {
  EmailLayout,
  Heading,
  Section,
  Text,
  MutedText,
  Divider,
  Button,
} from "@/lib/email/components";
import { EMAIL_BRAND, EMAIL_COLORS } from "@/lib/email/constants";
import type { ResetPasswordEmailProps } from "@/lib/email/types/email-props";

export default function ResetPasswordEmail({
  name,
  loginUrl,
}: ResetPasswordEmailProps): React.JSX.Element {
  return (
    <EmailLayout previewText={`Your password has been successfully reset for ${EMAIL_BRAND.name}`}>
      <Section style={styles.container}>
        <Heading style={styles.heading}>Password Reset Successful</Heading>

        <Text style={styles.text}>Hello {name},</Text>

        <Text style={styles.text}>
          This is a confirmation that the password for your {EMAIL_BRAND.name} account has been
          successfully changed.
        </Text>

        <Text style={styles.text}>
          If you initiated this change, no further action is required. You can now log in to your
          account using your new password.
        </Text>

        <Section style={styles.buttonContainer}>
          <Button href={loginUrl} style={styles.button}>
            Log In to Your Account
          </Button>
        </Section>

        <Text style={styles.warningText}>
          If you did not request a password change, please contact our support team immediately as
          your account security may be compromised.
        </Text>

        <Divider style={styles.divider} />

        <MutedText style={styles.mutedText}>
          You are receiving this security notification because a critical change was made to your{" "}
          {EMAIL_BRAND.name} account.
        </MutedText>
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
  warningText: {
    color: "#d97706",
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
    margin: "0",
  },
};
