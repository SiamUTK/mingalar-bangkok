import * as React from "react";

import { EMAIL_BRAND, EMAIL_COLORS } from "@/lib/email";
import type { PaymentFailedEmailProps } from "@/lib/email/types";

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

function formatAmount(amount: number, currency: string = "THB"): string {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toFixed(2)}`;
  }
}

// ----------------------------------------------------------------------
// Inline Styles (Reusable design tokens)
// ----------------------------------------------------------------------

const failureBoxStyle: React.CSSProperties = {
  padding: "16px",
  border: `1px solid #FCA5A5`,
  borderRadius: "10px",
  backgroundColor: "#FEF2F2",
  marginBottom: "16px",
};

const failureTableStyle: React.CSSProperties = {
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

export function PaymentFailedEmail({
  recipientName,
  amount,
  currency = "THB",
  planName,
  failureReason,
  updatePaymentUrl,
  retryDate,
}: PaymentFailedEmailProps): React.JSX.Element {
  const greeting = formatRecipient(recipientName);
  const formattedAmount = formatAmount(amount, currency);

  return (
    <EmailLayout
      title="Payment Unsuccessful"
      subtitle="Action required: We were unable to process your payment."
      preview={`Payment of ${formattedAmount} failed for ${EMAIL_BRAND.name}. Please update your payment method.`}
    >
      {/* Urgent Warning Notification */}
      <Section paddingTop={8} paddingBottom={0}>
        <Heading level={2}>Payment Unsuccessful ⚠️</Heading>

        <Text>
          Hello <strong>{greeting}</strong>,
        </Text>

        <Text>
          We were unable to process your payment of <strong>{formattedAmount}</strong> for{" "}
          <strong>{planName}</strong> on <strong>{EMAIL_BRAND.name}</strong>.
        </Text>

        <MutedText marginBottom={0}>
          Don't worry, your account services are temporarily active, but you need to update your
          payment method to avoid service interruption.
        </MutedText>
      </Section>

      {/* Failure Details Card */}
      <Section paddingTop={8} paddingBottom={0}>
        <div style={failureBoxStyle}>
          <table
            role="presentation"
            width="100%"
            cellPadding={0}
            cellSpacing={0}
            border={0}
            style={failureTableStyle}
          >
            <tbody>
              <tr>
                <td style={labelColumnStyle}>Plan/Service:</td>
                <td style={valueColumnStyle}>{planName}</td>
              </tr>
              <tr>
                <td style={labelColumnStyle}>Attempted Amount:</td>
                <td style={valueColumnStyle}>{formattedAmount}</td>
              </tr>
              {failureReason && (
                <tr>
                  <td style={labelColumnStyle}>Reason:</td>
                  <td style={{ ...valueColumnStyle, color: "#DC2626" }}>{failureReason}</td>
                </tr>
              )}
              {retryDate && (
                <tr>
                  <td style={labelColumnStyle}>Next Automatic Retry:</td>
                  <td style={valueColumnStyle}>{retryDate}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Call to Action */}
      <Section paddingTop={8} paddingBottom={8}>
        <Button href={updatePaymentUrl}>Update Payment Method</Button>

        <SmallText align="center" marginTop={16} marginBottom={0} color={EMAIL_COLORS.textMuted}>
          Updating your payment information takes less than two minutes.
        </SmallText>
      </Section>

      <Divider />

      {/* Account Impact & Policy Guidance */}
      <Section paddingTop={8} paddingBottom={0}>
        <Heading level={4}>Why did my payment fail?</Heading>

        <Text>
          Payments can fail for several reasons, including insufficient funds, an expired credit
          card, or security flags set by your card issuer or bank.
        </Text>

        <Text>
          We recommend contacting your bank or trying a different payment card to resolve this issue
          as soon as possible.
        </Text>

        <MutedText marginBottom={0}>
          If we cannot successfully process your payment after multiple attempts, your subscription
          features may be temporarily downgraded to the Free tier.
        </MutedText>
      </Section>

      <Divider />

      {/* Support Section */}
      <Section paddingTop={8} paddingBottom={0}>
        <Heading level={4}>Need assistance with your payment?</Heading>

        <Text>
          If you believe this failure was an error or if you need extra time to update your payment
          details, please reach out to our billing team.
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
          or reply directly to this email to get support.
        </SmallText>
      </Section>

      <Divider />
    </EmailLayout>
  );
}

export default PaymentFailedEmail;
