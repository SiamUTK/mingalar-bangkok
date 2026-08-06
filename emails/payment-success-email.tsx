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
import type { PaymentSuccessEmailProps } from "@/lib/email/types/email-props";

export default function PaymentSuccessEmail({
  name,
  amount,
  currency = "THB",
  invoiceId,
  dashboardUrl,
}: PaymentSuccessEmailProps): React.JSX.Element {
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount);

  return (
    <EmailLayout previewText={`Payment successful for ${EMAIL_BRAND.name}`}>
      <Section style={styles.container}>
        <Heading style={styles.heading}>Payment Successful</Heading>

        <Text style={styles.text}>Hello {name},</Text>

        <Text style={styles.text}>
          We are writing to confirm that your payment of{" "}
          <span style={styles.highlight}>{formattedAmount}</span> has been successfully processed.
        </Text>

        <Section style={styles.detailsBox}>
          <Text style={styles.detailsRow}>
            <strong>Amount Paid:</strong> {formattedAmount}
          </Text>
          {invoiceId ? (
            <Text style={styles.detailsRow}>
              <strong>Invoice ID:</strong> {invoiceId}
            </Text>
          ) : null}
        </Section>

        <Text style={styles.text}>
          You can view your full transaction history and manage your active subscription details
          anytime directly from your dashboard.
        </Text>

        <Section style={styles.buttonContainer}>
          <Button href={dashboardUrl} style={styles.button}>
            View Dashboard
          </Button>
        </Section>

        <Divider style={styles.divider} />

        <MutedText style={styles.mutedText}>
          Thank you for choosing {EMAIL_BRAND.name}. If you have any questions or require an
          official tax invoice, please contact our support team.
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
  detailsBox: {
    backgroundColor: "#f8fafc",
    borderRadius: "6px",
    border: `1px solid ${EMAIL_COLORS.border}`,
    padding: "16px",
    margin: "16px 0",
  },
  detailsRow: {
    color: EMAIL_COLORS.textPrimary,
    fontSize: "14px",
    lineHeight: "20px",
    margin: "0 0 8px",
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
