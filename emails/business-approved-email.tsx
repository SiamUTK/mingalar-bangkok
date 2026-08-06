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
import type { BusinessApprovedEmailProps } from "@/lib/email/types/email-props";

export default function BusinessApprovedEmail({
  name,
  businessName,
  dashboardUrl,
}: BusinessApprovedEmailProps): React.JSX.Element {
  return (
    <EmailLayout
      previewText={`Great news! Your business account for ${businessName} has been approved.`}
    >
      <Section style={styles.container}>
        <Heading style={styles.heading}>Business Account Approved!</Heading>

        <Text style={styles.text}>Hello {name},</Text>

        <Text style={styles.text}>
          We are thrilled to inform you that your business account application for{" "}
          <span style={styles.highlight}>{businessName}</span> has been successfully reviewed and
          approved on {EMAIL_BRAND.name}.
        </Text>

        <Text style={styles.text}>
          You now have full access to all business features, management tools, and specialized
          capabilities designed to help your enterprise succeed.
        </Text>

        <Section style={styles.buttonContainer}>
          <Button href={dashboardUrl} style={styles.button}>
            Access Business Dashboard
          </Button>
        </Section>

        <Text style={styles.text}>
          If you need any assistance setting up your profile or have questions about our business
          tools, our support team is always here to help.
        </Text>

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
