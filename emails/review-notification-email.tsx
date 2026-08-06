import * as React from "react";

import { EMAIL_BRAND, EMAIL_COLORS } from "@/lib/email";
import type { ReviewNotificationEmailProps } from "@/lib/email/types";

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

function renderStars(rating: number): string {
  const fullStars = "★".repeat(Math.max(0, Math.min(5, Math.floor(rating))));
  const emptyStars = "☆".repeat(Math.max(0, Math.min(5, 5 - Math.floor(rating))));
  return `${fullStars}${emptyStars}`;
}

// ----------------------------------------------------------------------
// Inline Styles (Reusable design tokens)
// ----------------------------------------------------------------------

const reviewBoxStyle: React.CSSProperties = {
  padding: "16px",
  border: `1px solid ${EMAIL_COLORS.border}`,
  borderRadius: "10px",
  backgroundColor: "#F8FAFC",
  marginBottom: "16px",
};

const reviewerTableStyle: React.CSSProperties = {
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

const commentBoxStyle: React.CSSProperties = {
  marginTop: "12px",
  padding: "12px",
  borderRadius: "8px",
  backgroundColor: "#FFFFFF",
  border: `1px solid ${EMAIL_COLORS.border}`,
  fontStyle: "italic",
};

const supportLinkStyle: React.CSSProperties = {
  color: EMAIL_COLORS.primary,
  textDecoration: "none",
  fontWeight: 600,
};

// ----------------------------------------------------------------------
// Main Component
// ----------------------------------------------------------------------

export function ReviewNotificationEmail({
  recipientName,
  businessName,
  reviewerName,
  rating,
  reviewComment,
  reviewDate,
  viewReviewUrl,
}: ReviewNotificationEmailProps): React.JSX.Element {
  const greeting = formatRecipient(recipientName);
  const formattedReviewer = formatRecipient(reviewerName);
  const stars = renderStars(rating);

  return (
    <EmailLayout
      title="New Customer Review Received"
      subtitle="Someone left a review for your business listing."
      preview={`${formattedReviewer} left a ${rating}-star review for ${businessName} on ${EMAIL_BRAND.name}.`}
    >
      {/* Primary Notification */}
      <Section paddingTop={8} paddingBottom={0}>
        <Heading level={2}>New Review Received! ⭐</Heading>

        <Text>
          Hello <strong>{greeting}</strong>,
        </Text>

        <Text>
          You have received a new review for your business listing <strong>{businessName}</strong>{" "}
          on <strong>{EMAIL_BRAND.name}</strong>.
        </Text>
      </Section>

      {/* Review Details Card */}
      <Section paddingTop={8} paddingBottom={0}>
        <div style={reviewBoxStyle}>
          <table
            role="presentation"
            width="100%"
            cellPadding={0}
            cellSpacing={0}
            border={0}
            style={reviewerTableStyle}
          >
            <tbody>
              <tr>
                <td style={labelColumnStyle}>Reviewer:</td>
                <td style={valueColumnStyle}>{formattedReviewer}</td>
              </tr>
              <tr>
                <td style={labelColumnStyle}>Rating:</td>
                <td style={{ ...valueColumnStyle, color: "#F59E0B", fontSize: "16px" }}>
                  {stars} ({rating}/5)
                </td>
              </tr>
              {reviewDate && (
                <tr>
                  <td style={labelColumnStyle}>Date:</td>
                  <td style={valueColumnStyle}>{reviewDate}</td>
                </tr>
              )}
            </tbody>
          </table>

          {reviewComment && (
            <div style={commentBoxStyle}>
              <Text marginBottom={4} style={{ fontStyle: "normal" }}>
                <strong>Comment:</strong>
              </Text>
              <MutedText marginBottom={0} style={{ color: "#374151" }}>
                "{reviewComment}"
              </MutedText>
            </div>
          )}
        </div>
      </Section>

      {/* Call to Action Button */}
      <Section paddingTop={8} paddingBottom={8}>
        <Button href={viewReviewUrl}>View & Reply to Review</Button>

        <SmallText align="center" marginTop={16} marginBottom={0} color={EMAIL_COLORS.textMuted}>
          Replying promptly to customer feedback builds trust and improves customer retention.
        </SmallText>
      </Section>

      <Divider />

      {/* Community Moderation Guidelines */}
      <Section paddingTop={8} paddingBottom={0}>
        <Heading level={4}>Managing Customer Feedback</Heading>

        <Text>
          • <strong>Engage Professionally:</strong> Responding politely to both positive and
          critical feedback demonstrates exceptional customer care.
        </Text>

        <Text>
          • <strong>Report Abuse:</strong> If you believe this review violates our community
          guidelines (e.g., spam, profanity, or fraudulent content), you can flag it directly from
          your vendor portal.
        </Text>
      </Section>

      <Divider />

      {/* Support Section */}
      <Section paddingTop={8} paddingBottom={0}>
        <Heading level={4}>Need assistance?</Heading>

        <Text>
          If you have questions about review moderation policies or managing your business profile,
          our vendor support team is here to help.
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
          or access vendor support from your dashboard.
        </SmallText>
      </Section>

      <Divider />
    </EmailLayout>
  );
}

export default ReviewNotificationEmail;
