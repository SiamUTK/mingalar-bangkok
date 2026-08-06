import * as React from "react";

import { EMAIL_BRAND, EMAIL_COLORS } from "@/lib/email";
import type { BusinessApprovedEmailProps } from "@/lib/email/types";

import { EmailLayout } from "./layouts";
import { Button, Divider } from "./partials";
import { Heading, MutedText, Section, SmallText, Text } from "./shared";

// ----------------------------------------------------------------------
// Helper Functions
// ----------------------------------------------------------------------

function formatRecipient(name?: string): string {
  const value = name?.trim();
  return value && value.length > 0 ? value : "there";
}

// ----------------------------------------------------------------------
// Inline Styles (Reusable design tokens)
// ----------------------------------------------------------------------

const businessBoxStyle: React.CSSProperties = {
  padding: "16px",
  border: `1px solid ${EMAIL_COLORS.border}`,
  borderRadius: "10px",
  backgroundColor: "#F8FAFC",
  marginBottom: "16px",
};

const businessTableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
};

const labelColumnStyle: React.CSSProperties = {
  padding: "6px 0",
  fontSize: "14px",
  color: EMAIL_COLORS.textMuted,
  width: "40%",
};

const valueColumnStyle: React.CSSProperties = {
  padding: "6px 0",
  fontSize: "14px",
  color: "#1F2937",
  fontWeight: 600,
  textAlign: "right",
};

const supportLinkStyle: React.CSSProperties = {
  color: EMAIL_COLORS.primary,
  textDecoration: "none",
  fontWeight: 600,
};

// ----------------------------------------------------------------------
// Main Component
// ----------------------------------------------------------------------

export function BusinessApprovedEmail({
  recipientName,
  businessName,
  businessUrl,
  dashboardUrl,
  approvalDate,
}: BusinessApprovedEmailProps): React.JSX.Element {
  const greeting = formatRecipient(recipientName);

  return (
    <EmailLayout
      title="Business Listing Approved"
      subtitle="Your business profile is now live on Mingalar Bangkok."
      preview={`Great news! ${businessName} has been approved and listed on ${EMAIL_BRAND.name}.`}
    >
      {/* Primary Success Notification */}
      <Section paddingTop={8} paddingBottom={0}>
        <Heading level={2}>Business Approved! 🎉</Heading>

        <Text>
          Hello <strong>{greeting}</strong>,
        </Text>

        <Text>
          We are excited to inform you that your business listing for{" "}
          <strong>{businessName}</strong> has been reviewed and officially approved by our
          moderation team.
        </Text>

        <MutedText marginBottom={0}>
          Your listing is now live and searchable in the official{" "}
          <strong>{EMAIL_BRAND.name}</strong> business directory.
        </MutedText>
      </Section>

      {/* Business Details Summary */}
      <Section paddingTop={8} paddingBottom={0}>
        <div style={businessBoxStyle}>
          <table
            role="presentation"
            width="100%"
            cellPadding={0}
            cellSpacing={0}
            border={0}
            style={businessTableStyle}
          >
            <tbody>
              <tr>
                <td style={labelColumnStyle}>Business Name:</td>
                <td style={valueColumnStyle}>{businessName}</td>
              </tr>
              <tr>
                <td style={labelColumnStyle}>Status:</td>
                <td style={{ ...valueColumnStyle, color: "#16A34A" }}>Verified & Active</td>
              </tr>
              {approvalDate && (
                <tr>
                  <td style={labelColumnStyle}>Approval Date:</td>
                  <td style={valueColumnStyle}>{approvalDate}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Call to Action Buttons */}
      <Section paddingTop={8} paddingBottom={8}>
        {businessUrl && <Button href={businessUrl}>View Live Listing</Button>}

        <Section paddingTop={12} paddingBottom={0}>
          <Button href={dashboardUrl} variant="outline">
            Manage Business Profile
          </Button>
        </Section>

        <SmallText align="center" marginTop={16} marginBottom={0} color={EMAIL_COLORS.textMuted}>
          You can update business hours, contact info, and media anytime via your business portal.
        </SmallText>
      </Section>

      <Divider />

      {/* Maximizing Reach Guidance */}
      <Section paddingTop={8} paddingBottom={0}>
        <Heading level={4}>Tips to maximize your business visibility</Heading>

        <Text>
          Now that your listing is live, here are a few ways to attract more customers in the
          community:
        </Text>

        <Text>
          • <strong>Keep details updated:</strong> Ensure your operating hours, address, and phone
          numbers are accurate.
        </Text>

        <Text>
          • <strong>Add high-quality photos:</strong> Businesses with storefront and product photos
          receive higher engagement.
        </Text>

        <Text>
          • <strong>Encourage customer reviews:</strong> Ask satisfied clients to leave verified
          reviews on your page.
        </Text>

        <MutedText marginBottom={0}>
          You can also explore Premium promotion options on your dashboard to feature your business
          at the top of search results.
        </MutedText>
      </Section>

      <Divider />

      {/* Support Section */}
      <Section paddingTop={8} paddingBottom={0}>
        <Heading level={4}>Need help managing your profile?</Heading>

        <Text>
          If you have questions or need assistance with your business tools, our vendor support team
          is ready to help.
        </Text>

        <SmallText align="center" marginTop={16} marginBottom={0}>
          Visit{" "}
          <a
            href={EMAIL_BRAND.website}
            target="_blank"
            rel="noopener noreferrer"
            style={supportLinkStyle}
          >
            {EMAIL_BRAND.website}
          </a>{" "}
          or contact vendor support directly through your dashboard.
        </SmallText>
      </Section>

      <Divider />
    </EmailLayout>
  );
}

export default BusinessApprovedEmail;
