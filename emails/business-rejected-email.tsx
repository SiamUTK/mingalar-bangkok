import * as React from "react";

import { EMAIL_BRAND, EMAIL_COLORS } from "@/lib/email";
import type { BusinessRejectedEmailProps } from "@/lib/email/types";

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

const rejectionBoxStyle: React.CSSProperties = {
  padding: "16px",
  border: "1px solid #FCA5A5",
  borderRadius: "10px",
  backgroundColor: "#FEF2F2",
  marginBottom: "16px",
};

const rejectionTableStyle: React.CSSProperties = {
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

const reasonBoxStyle: React.CSSProperties = {
  marginTop: "12px",
  padding: "12px",
  borderRadius: "8px",
  backgroundColor: "#FFFFFF",
  border: "1px solid #FECDD3",
};

const supportLinkStyle: React.CSSProperties = {
  color: EMAIL_COLORS.primary,
  textDecoration: "none",
  fontWeight: 600,
};

// ----------------------------------------------------------------------
// Main Component
// ----------------------------------------------------------------------

export function BusinessRejectedEmail({
  recipientName,
  businessName,
  rejectionReason,
  editListingUrl,
  rejectionDate,
}: BusinessRejectedEmailProps): React.JSX.Element {
  const greeting = formatRecipient(recipientName);

  return (
    <EmailLayout
      title="Business Listing Update Required"
      subtitle="Your business submission requires adjustments before publication."
      preview={`Update required for your business listing submission "${businessName}" on ${EMAIL_BRAND.name}.`}
    >
      {/* Primary Notification */}
      <Section paddingTop={8} paddingBottom={0}>
        <Heading level={2}>Listing Submission Status Update</Heading>

        <Text>
          Hello <strong>{greeting}</strong>,
        </Text>

        <Text>
          Thank you for submitting <strong>{businessName}</strong> to the{" "}
          <strong>{EMAIL_BRAND.name}</strong> business directory. Our team has reviewed your
          submission.
        </Text>

        <Text>
          Regrettably, we cannot approve your listing in its current state. Please review the
          feedback below to make the required updates.
        </Text>
      </Section>

      {/* Rejection Feedback Details */}
      <Section paddingTop={8} paddingBottom={0}>
        <div style={rejectionBoxStyle}>
          <table
            role="presentation"
            width="100%"
            cellPadding={0}
            cellSpacing={0}
            border={0}
            style={rejectionTableStyle}
          >
            <tbody>
              <tr>
                <td style={labelColumnStyle}>Business Name:</td>
                <td style={valueColumnStyle}>{businessName}</td>
              </tr>
              <tr>
                <td style={labelColumnStyle}>Status:</td>
                <td style={{ ...valueColumnStyle, color: "#DC2626" }}>Action Required</td>
              </tr>
              {rejectionDate && (
                <tr>
                  <td style={labelColumnStyle}>Review Date:</td>
                  <td style={valueColumnStyle}>{rejectionDate}</td>
                </tr>
              )}
            </tbody>
          </table>

          {rejectionReason && (
            <div style={reasonBoxStyle}>
              <Text marginBottom={4}>
                <strong>Reviewer Feedback:</strong>
              </Text>
              <MutedText marginBottom={0} style={{ color: "#7F1D1D" }}>
                {rejectionReason}
              </MutedText>
            </div>
          )}
        </div>
      </Section>

      {/* Call to Action Button */}
      <Section paddingTop={8} paddingBottom={8}>
        <Button href={editListingUrl}>Update & Resubmit Listing</Button>

        <SmallText align="center" marginTop={16} marginBottom={0} color={EMAIL_COLORS.textMuted}>
          Once modified, our verification team will re-evaluate your listing promptly.
        </SmallText>
      </Section>

      <Divider />

      {/* Platform Directory Guidelines */}
      <Section paddingTop={8} paddingBottom={0}>
        <Heading level={4}>Common Directory Requirements</Heading>

        <Text>
          To ensure high standards across our community network, listings must adhere to the
          following:
        </Text>

        <Text>
          • <strong>Accurate Information:</strong> Valid contact details, physical address, and
          official operating hours.
        </Text>

        <Text>
          • <strong>Clear Media:</strong> Authentic photos free from misleading text overlays,
          explicit content, or low resolution.
        </Text>

        <Text>
          • <strong>Compliance:</strong> Complete alignment with community trust policies and
          applicable local laws.
        </Text>
      </Section>

      <Divider />

      {/* Support Section */}
      <Section paddingTop={8} paddingBottom={0}>
        <Heading level={4}>Need assistance?</Heading>

        <Text>
          If you have questions about the feedback or require support updating your listing details,
          please visit our support portal.
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
          or contact vendor support through your vendor portal.
        </SmallText>
      </Section>

      <Divider />
    </EmailLayout>
  );
}

export default BusinessRejectedEmail;
