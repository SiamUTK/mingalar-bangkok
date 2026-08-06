import * as React from "react";

import { EMAIL_BRAND, EMAIL_COLORS } from "@/lib/email";
import type { InvoiceEmailProps } from "@/lib/email/types";

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

const invoiceBoxStyle: React.CSSProperties = {
  padding: "16px",
  border: `1px solid ${EMAIL_COLORS.border}`,
  borderRadius: "10px",
  backgroundColor: "#F8FAFC",
  marginBottom: "16px",
};

const invoiceTableStyle: React.CSSProperties = {
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

export function InvoiceEmail({
  recipientName,
  invoiceNumber,
  issueDate,
  dueDate,
  amount,
  currency = "THB",
  description,
  invoiceUrl,
  paymentUrl,
}: InvoiceEmailProps): React.JSX.Element {
  const greeting = formatRecipient(recipientName);
  const formattedAmount = formatAmount(amount, currency);

  return (
    <EmailLayout
      title={`Invoice ${invoiceNumber}`}
      subtitle="Your new billing invoice is available."
      preview={`Invoice ${invoiceNumber} for ${formattedAmount} from ${EMAIL_BRAND.name}.`}
    >
      {/* Primary Notification */}
      <Section paddingTop={8} paddingBottom={0}>
        <Heading level={2}>New Invoice Issued 📄</Heading>

        <Text>
          Hello <strong>{greeting}</strong>,
        </Text>

        <Text>
          A new invoice <strong>{invoiceNumber}</strong> has been generated for your{" "}
          <strong>{EMAIL_BRAND.name}</strong> account. Below is a summary of the charges.
        </Text>
      </Section>

      {/* Invoice Details Card */}
      <Section paddingTop={8} paddingBottom={0}>
        <div style={invoiceBoxStyle}>
          <table
            role="presentation"
            width="100%"
            cellPadding={0}
            cellSpacing={0}
            border={0}
            style={invoiceTableStyle}
          >
            <tbody>
              <tr>
                <td style={labelColumnStyle}>Invoice Number:</td>
                <td style={valueColumnStyle}>{invoiceNumber}</td>
              </tr>
              <tr>
                <td style={labelColumnStyle}>Issue Date:</td>
                <td style={valueColumnStyle}>{issueDate}</td>
              </tr>
              {dueDate && (
                <tr>
                  <td style={labelColumnStyle}>Due Date:</td>
                  <td style={valueColumnStyle}>{dueDate}</td>
                </tr>
              )}
              {description && (
                <tr>
                  <td style={labelColumnStyle}>Description:</td>
                  <td style={valueColumnStyle}>{description}</td>
                </tr>
              )}
              <tr style={totalRowStyle}>
                <td style={{ ...labelColumnStyle, paddingTop: "12px", fontWeight: 700 }}>
                  Total Amount:
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
      </Section>

      {/* Actions */}
      <Section paddingTop={8} paddingBottom={8}>
        {paymentUrl ? (
          <Button href={paymentUrl}>Pay Invoice Now</Button>
        ) : (
          invoiceUrl && <Button href={invoiceUrl}>View & Download Invoice</Button>
        )}

        <SmallText align="center" marginTop={16} marginBottom={0} color={EMAIL_COLORS.textMuted}>
          You can access all past and current invoices anytime from your account billing settings.
        </SmallText>
      </Section>

      <Divider />

      {/* Payment Instructions & Tax Info */}
      <Section paddingTop={8} paddingBottom={0}>
        <Heading level={4}>Tax & Payment Information</Heading>

        <Text>
          This document serves as an official electronic invoice. If your payment method is set to
          auto-debit, your account will be charged automatically on the due date.
        </Text>

        <MutedText marginBottom={0}>
          Please retain a copy of this invoice for your accounting and tax records.
        </MutedText>
      </Section>

      <Divider />

      {/* Support Section */}
      <Section paddingTop={8} paddingBottom={0}>
        <Heading level={4}>Questions about this invoice?</Heading>

        <Text>
          If you have any questions regarding these charges or require adjustments to your billing
          details, our finance team is here to help.
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
          or contact customer support for billing assistance.
        </SmallText>
      </Section>

      <Divider />
    </EmailLayout>
  );
}

export default InvoiceEmail;
