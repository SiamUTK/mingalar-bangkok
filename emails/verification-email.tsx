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
import type { VerificationEmailProps } from "@/lib/email/types/email-props";

export default function VerificationEmail({
  name,
  verificationUrl,
  expiresInMinutes = 30,
}: VerificationEmailProps): React.JSX.Element {
  return (
    <EmailLayout previewText={`Verify your email address for ${EMAIL_BRAND.name}`}>
      <Section style={styles.container}>
        <Heading style={styles.heading}>Verify Your Email Address</Heading>

        <Text style={styles.text}>Hello {name},</Text>

        <Text style={styles.text}>
          Thank you for signing up with {EMAIL_BRAND.name}! Please click the button below to verify
          your email address and activate your account.
        </Text>

        <Section style={styles.buttonContainer}>
          <Button href={verificationUrl} style={styles.button}>
            Verify Email Address
          </Button>
        </Section>

        <Text style={styles.text}>
          This verification link will expire in {expiresInMinutes} minutes. If you did not request
          this verification, please ignore this email.
        </Text>

        <Divider style={styles.divider} />

        <MutedText style={styles.mutedText}>
          If you're having trouble clicking the button, copy and paste the URL below into your web
          browser:
        </MutedText>

        <SmallText style={styles.linkText}>{verificationUrl}</SmallText>
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
