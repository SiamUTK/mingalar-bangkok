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
import type { MembershipUpgradedEmailProps } from "@/lib/email/types/email-props";

export default function MembershipUpgradedEmail({
  name,
  planName,
  effectiveDate,
  dashboardUrl,
}: MembershipUpgradedEmailProps): React.JSX.Element {
  return (
    <EmailLayout
      previewText={`Your ${EMAIL_BRAND.name} membership has been upgraded to ${planName}!`}
    >
      <Section style={styles.container}>
        <Heading style={styles.heading}>Membership Upgraded!</Heading>

        <Text style={styles.text}>Hello {name},</Text>

        <Text style={styles.text}>
          Congratulations! Your account has been successfully upgraded to the{" "}
          <span style={styles.highlight}>{planName}</span> plan.
        </Text>

        <Section style={styles.detailsBox}>
          <Text style={styles.detailsRow}>
            <strong>New Plan:</strong> {planName}
          </Text>
          {effectiveDate ? (
            <Text style={styles.detailsRow}>
              <strong>Effective Date:</strong> {effectiveDate}
            </Text>
          ) : null}
        </Section>

        <Text style={styles.text}>
          You now have immediate access to all premium features, higher limits, and priority support
          included with your new tier.
        </Text>

        <Section style={styles.buttonContainer}>
          <Button href={dashboardUrl} style={styles.button}>
            Explore Your New Features
          </Button>
        </Section>

        <Divider style={styles.divider} />

        <MutedText style={styles.mutedText}>
          Thank you for growing with {EMAIL_BRAND.name}. If you have any questions about your
          upgraded plan, please feel free to reach out to our team.
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
