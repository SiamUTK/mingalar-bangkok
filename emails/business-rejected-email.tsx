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
import type { BusinessRejectedEmailProps } from "@/lib/email/types/email-props";

export default function BusinessRejectedEmail({
  name,
  businessName,
  reason,
  supportUrl,
}: BusinessRejectedEmailProps): React.JSX.Element {
  return (
    <EmailLayout
      previewText={`Update regarding your business account application for ${businessName}`}
    >
      <Section style={styles.container}>
        <Heading style={styles.heading}>Business Account Application Update</Heading>

        <Text style={styles.text}>Hello {name},</Text>

        <Text style={styles.text}>
          Thank you for applying to register <span style={styles.highlight}>{businessName}</span> on{" "}
          {EMAIL_BRAND.name}. After careful review, we regret to inform you that we are unable to
          approve your business account application at this time.
        </Text>

        {reason ? (
          <Section style={styles.reasonContainer}>
            <Text style={styles.reasonTitle}>Reason for decision:</Text>
            <Text style={styles.reasonText}>{reason}</Text>
          </Section>
        ) : null}

        <Text style={styles.text}>
          If you believe this decision was made in error or if you would like to submit additional
          documentation, please reach out to our support team for further assistance.
        </Text>

        <Section style={styles.buttonContainer}>
          <Button href={supportUrl} style={styles.button}>
            Contact Support
          </Button>
        </Section>

        <Divider style={styles.divider} />

        <MutedText style={styles.mutedText}>
          You are receiving this notification because your business application status was updated
          on {EMAIL_BRAND.name}.
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
  highlight: {
    color: EMAIL_COLORS.textPrimary,
    fontWeight: "600",
  },
  reasonContainer: {
    backgroundColor: "#f8fafc",
    borderRadius: "6px",
    border: `1px solid ${EMAIL_COLORS.border}`,
    padding: "16px",
    margin: "16px 0",
  },
  reasonTitle: {
    color: EMAIL_COLORS.textPrimary,
    fontSize: "14px",
    fontWeight: "bold",
    margin: "0 0 8px",
  },
  reasonText: {
    color: EMAIL_COLORS.textSecondary,
    fontSize: "14px",
    lineHeight: "20px",
    margin: "0",
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
