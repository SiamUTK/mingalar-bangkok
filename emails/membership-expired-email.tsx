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
import type { MembershipExpiredEmailProps } from "@/lib/email/types/email-props";

export default function MembershipExpiredEmail({
  name,
  planName,
  renewUrl,
  expirationDate,
}: MembershipExpiredEmailProps): React.JSX.Element {
  return (
    <EmailLayout previewText={`Your ${EMAIL_BRAND.name} membership has expired`}>
      <Section style={styles.container}>
        <Heading style={styles.heading}>Membership Expired</Heading>

        <Text style={styles.text}>Hello {name},</Text>

        <Text style={styles.text}>
          This is a notification that your <span style={styles.highlight}>{planName}</span> plan
          membership with {EMAIL_BRAND.name} has expired.
        </Text>

        <Section style={styles.detailsBox}>
          <Text style={styles.detailsRow}>
            <strong>Expired Plan:</strong> {planName}
          </Text>
          {expirationDate ? (
            <Text style={styles.detailsRow}>
              <strong>Expiration Date:</strong> {expirationDate}
            </Text>
          ) : null}
        </Section>

        <Text style={styles.text}>
          Your account has been moved to a free tier. To restore access to premium features and
          retain your existing service limits, please renew your subscription.
        </Text>

        <Section style={styles.buttonContainer}>
          <Button href={renewUrl} style={styles.button}>
            Renew Subscription
          </Button>
        </Section>

        <Divider style={styles.divider} />

        <MutedText style={styles.mutedText}>
          If you have already renewed or believe this notification was sent in error, please
          disregard this email or contact support.
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
