import * as React from "react";

import { EMAIL_BRAND, EMAIL_COLORS } from "@/lib/email";
import type { ForgotPasswordEmailProps } from "@/lib/email/types";

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

function formatExpiration(minutes: number): string {
  if (minutes <= 0) {
    return "This password reset link expires soon.";
  }
  if (minutes === 1) {
    return "This password reset link expires in 1 minute.";
  }
  if (minutes < 60) {
    return `This password reset link expires in ${minutes} minutes.`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours === 1) {
    return "This password reset link expires in 1 hour.";
  }

  return `This password reset link expires in ${hours} hours.`;
}

// ----------------------------------------------------------------------
// Inline Styles (Reusable design tokens)
// ----------------------------------------------------------------------

const urlBoxStyle: React.CSSProperties = {
  backgroundColor: "#F8FAFC",
  border: `1px solid ${EMAIL_COLORS.border}`,
  borderRadius: "8px",
  padding: "16px",
  overflowWrap: "anywhere",
  wordBreak: "break-word",
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace",
  fontSize: "13px",
  lineHeight: "22px",
  color: EMAIL_COLORS.primary,
};

// ----------------------------------------------------------------------
// Main Component
// ----------------------------------------------------------------------

export function ForgotPasswordEmail({
  recipientName,
  resetPasswordUrl,
  expiresInMinutes,
}: ForgotPasswordEmailProps): React.JSX.Element {
  const greeting = formatRecipient(recipientName);

  return (
    <EmailLayout
      title="Reset your password"
      subtitle="A request was received to reset your account password."
      preview="Use the secure link below to reset your Mingalar Bangkok password."
    >
      {/* Primary Call to Action */}
      <Section paddingTop={8} paddingBottom={0}>
        <Heading level={2}>Reset your password</Heading>

        <Text>
          Hello <strong>{greeting}</strong>,
        </Text>

        <Text>
          We received a request to reset the password for your <strong>{EMAIL_BRAND.name}</strong>{" "}
          account.
        </Text>

        <Text>
          If you made this request, click the button below to create a new password. For your
          security, this link can only be used once.
        </Text>

        <MutedText marginBottom={0}>
          If you did not request a password reset, you can safely ignore this email.
        </MutedText>
      </Section>

      <Section paddingTop={8} paddingBottom={8}>
        <Button href={resetPasswordUrl}>Reset Password</Button>

        <SmallText align="center" marginTop={16} marginBottom={0} color={EMAIL_COLORS.textMuted}>
          {formatExpiration(expiresInMinutes)}
        </SmallText>
      </Section>

      <Divider />

      {/* Fallback URL Box */}
      <Section paddingTop={8} paddingBottom={0}>
        <Heading level={4}>Can't click the button?</Heading>

        <Text>
          Copy and paste the following link into your web browser to continue resetting your
          password:
        </Text>

        <div style={urlBoxStyle}>{resetPasswordUrl}</div>

        <SmallText marginTop={16} marginBottom={0}>
          This password reset link can only be used once and will automatically expire after the
          time shown above.
        </SmallText>
      </Section>

      <Divider />

      {/* Security Guidance */}
      <Section paddingTop={8} paddingBottom={0}>
        <Heading level={4}>Keep your account secure</Heading>

        <Text>
          Never share your password reset link with anyone. Our support team will never ask you for
          your password or this reset link.
        </Text>

        <Text>
          Choose a strong password that is unique to your <strong>{EMAIL_BRAND.name}</strong>{" "}
          account. Avoid using passwords that you have used on other websites or services.
        </Text>

        <MutedText marginBottom={0}>
          Once your password has been changed, any previous reset links will become invalid.
        </MutedText>
      </Section>

      <Divider />

      {/* Unrequested Attempt Warning */}
      <Section paddingTop={8} paddingBottom={0}>
        <Heading level={4}>Didn't request a password reset?</Heading>

        <Text>
          If you did not request to reset your password, no further action is required. Your current
          password will remain unchanged unless someone successfully uses the password reset link
          above.
        </Text>

        <Text>
          If you believe someone is attempting to access your account without permission, we
          recommend changing your password immediately after signing in and reviewing your account
          activity.
        </Text>

        <MutedText marginBottom={0}>
          If you continue receiving unexpected password reset emails, please contact our support
          team for assistance.
        </MutedText>
      </Section>

      <Divider />

      {/* Support Section */}
      <Section paddingTop={8} paddingBottom={0}>
        <Heading level={4}>Need help?</Heading>

        <Text>
          If you're having trouble resetting your password, visit our website or contact our support
          team for assistance.
        </Text>

        <Button href={EMAIL_BRAND.website} variant="outline">
          Visit {EMAIL_BRAND.name}
        </Button>

        <SmallText align="center" marginTop={16} marginBottom={0} color={EMAIL_COLORS.textMuted}>
          For your security, password reset requests are logged and monitored to help protect your
          account from unauthorized access.
        </SmallText>
      </Section>

      <Divider />
    </EmailLayout>
  );
}

export default ForgotPasswordEmail;
