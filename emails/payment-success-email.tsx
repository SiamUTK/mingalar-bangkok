import * as React from "react";

import { EMAIL_BRAND, EMAIL_COLORS } from "@/lib/email";
import type { PaymentSuccessEmailProps } from "@/lib/email/types";

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

const receiptBoxStyle: React.CSSProperties = {
  padding: "16px",
  border: `1px solid ${EMAIL_COLORS.border}`,
  borderRadius: "10px",
  backgroundColor: "#F8FAFC",
  marginBottom: "16px",
};

const receiptTableStyle: React.CSSProperties = {
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

const totalRowStyle: React.CSSProperties = {
  borderTop: `1px solid ${EMAIL_COLORS.border}`,
};

const supportLinkStyle: React.CSSProperties = {
  color: EMAIL_COLORS.primary,
  textDecoration: "none",
  fontWeight: 600,
};

// ----------------------------------------------------------------------
// Main Component
// ----------------------------------------------------------------------

export function PaymentSuccessEmail({
  recipientName,
  amount,
  currency = "THB",
  transactionId,
  paymentDate,
  planName,
  receiptUrl,
  dashboardUrl,
}: PaymentSuccessEmailProps): React.JSX.Element {
  const greeting = formatRecipient(recipientName);
  const formattedAmount = formatAmount(amount, currency);

  return (
    <EmailLayout
      title="Payment Confirmation"
      subtitle="Your payment has been successfully processed."
      preview={`Payment of ${formattedAmount} received for ${EMAIL_BRAND.name}.`}
    >
      {/* Primary Success Notification */}
      <Section paddingTop={8} paddingBottom={0}>
        <Heading level={2}>Payment Received 🎉</Heading>

        <Text>
          Hello <strong>{greeting}</strong>,
        </Text>

        <Text>
          Thank you for your payment! We have successfully processed your transaction for{" "}
          <strong>{EMAIL_BRAND.name}</strong>. Below is a summary of your payment details.
        </Text>
      </Section>

      {/* Payment Receipt Summary Table */}
      <Section paddingTop={8} paddingBottom={0}>
        <div style={receiptBoxStyle}>
          <table
            role="presentation"
            width="100%"
            cellPadding={0}
            cellSpacing={0}
            border={0}
            style={receiptTableStyle}
          >
            <tbody>
              <tr>
                <td style={labelColumnStyle}>Description:</td>
                <td style={valueColumnStyle}>{planName}</td>
              </tr>
              <tr>
                <td style={labelColumnStyle}>Transaction ID:</td>
                <td style={valueColumnStyle}>{transactionId}</td>
              </tr>
              <tr>
                <td style={labelColumnStyle}>Payment Date:</td>
                <td style={valueColumnStyle}>{paymentDate}</td>
              </tr>
              <tr style={totalRowStyle}>
                <td style={{ ...labelColumnStyle, paddingTop: "12px", fontWeight: 700 }}>
                  Amount Paid:
                </td>
                <td
                  style={{
                    ...valueColumnStyle,
                    paddingTop: "12px",
                    fontSize: "16px",
                    color: EMAIL_COLORS.primary,
                  }}
                >
                  {formattedAmount}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {receiptUrl && (
          <Section paddingTop={0} paddingBottom={8}>
            <Button href={receiptUrl} variant="outline">
              Download Official Receipt
            </Button>
          </Section>
        )}
      </Section>

      <Section paddingTop={8} paddingBottom={8}>
        <Button href={dashboardUrl}>Go to Dashboard</Button>

        <SmallText align="center" marginTop={16} marginBottom={0} color={EMAIL_COLORS.textMuted}>
          Your features and membership status have been updated immediately.
        </SmallText>
      </Section>

      <Divider />

      {/* Account Security & Billing Info */}
      <Section paddingTop={8} paddingBottom={0}>
        <Heading level={4}>Billing & Record Keeping</Heading>

        <Text>
          This email serves as an official confirmation of your payment. You can access all your
          past invoices, transaction details, and billing settings anytime from your account
          settings.
        </Text>

        <MutedText marginBottom={0}>
          If you noticed an error in your transaction or did not authorize this charge, please
          contact our support team immediately.
        </MutedText>
      </Section>

      <Divider />

      {/* Support Section */}
      <Section paddingTop={8} paddingBottom={0}>
        <Heading level={4}>Need help with your invoice?</Heading>

        <Text>
          Our support and billing team is available to assist you with any questions regarding your
          subscription or receipts.
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
          or reply to this email for customer support.
        </SmallText>
      </Section>

      <Divider />
    </EmailLayout>
  );
}

export default PaymentSuccessEmail;
