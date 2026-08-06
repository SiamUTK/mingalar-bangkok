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
import type { PaymentFailedEmailProps } from "@/lib/email/types/email-props";

export default function PaymentFailedEmail({
  name,
  amount,
  currency = "THB",
  updatePaymentUrl,
  reason,
}: PaymentFailedEmailProps): React.JSX.Element {
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount);

  return (
    <EmailLayout previewText={`Action required: Payment failed for ${EMAIL_BRAND.name}`}>
      <Section style={styles.container}>
        <Heading style={styles.heading}>Payment Failed</Heading>

        <Text style={styles.text}>Hello {name},</Text>

        <Text style={styles.text}>
          We attempted to process your recent payment of{" "}
          <span style={styles.highlight}>{formattedAmount}</span>, but the transaction could not be
          completed.
        </Text>

        {reason ? (
          <Section style={styles.reasonContainer}>
            <Text style={styles.reasonTitle}>Reason for failure:</Text>
            <Text style={styles.reasonText}>{reason}</Text>
          </Section>
        ) : null}

        <Text style={styles.text}>
          To prevent any interruption to your services or subscription, please update your payment
          method and retry the transaction as soon as possible.
        </Text>

        <Section style={styles.buttonContainer}>
          <Button href={updatePaymentUrl} style={styles.button}>
            Update Payment Method
          </Button>
        </Section>

        <Divider style={styles.divider} />

        <MutedText style={styles.mutedText}>
          If you have already updated your payment details or believe this is an error, please
          contact our support team for assistance.
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
    backgroundColor: "#fef2f2",
    borderRadius: "6px",
    border: "1px solid #fecaca",
    padding: "16px",
    margin: "16px 0",
  },
  reasonTitle: {
    color: "#991b1b",
    fontSize: "14px",
    fontWeight: "bold",
    margin: "0 0 8px",
  },
  reasonText: {
    color: "#7f1d1d",
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
