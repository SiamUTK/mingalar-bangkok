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
import type { WelcomeEmailProps } from "@/lib/email/types/email-props";

export default function WelcomeEmail({
  name,
  dashboardUrl,
  supportEmail,
}: WelcomeEmailProps): React.JSX.Element {
  return (
    <EmailLayout previewText={`Welcome to ${EMAIL_BRAND.name}! We're thrilled to have you.`}>
      <Section style={styles.container}>
        <Heading style={styles.heading}>Welcome aboard, {name}!</Heading>

        <Text style={styles.text}>
          Thank you for joining {EMAIL_BRAND.name}. We are absolutely thrilled to have you as part
          of our community.
        </Text>

        <Text style={styles.text}>
          Our platform is designed to give you seamless access to all our features, tools, and
          personalized experiences. Get started right away by visiting your dashboard.
        </Text>

        <Section style={styles.buttonContainer}>
          <Button href={dashboardUrl} style={styles.button}>
            Go to Dashboard
          </Button>
        </Section>

        <Text style={styles.text}>
          If you have any questions, feedback, or need assistance getting started, feel free to
          reach out to our support team at <span style={styles.link}>{supportEmail}</span>.
        </Text>

        <Divider style={styles.divider} />

        <MutedText style={styles.mutedText}>
          You are receiving this email because you recently created an account with{" "}
          {EMAIL_BRAND.name}.
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
  link: {
    color: EMAIL_COLORS.primary,
    textDecoration: "underline",
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
