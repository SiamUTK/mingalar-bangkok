import * as React from "react";

import { EMAIL_BRAND, EMAIL_COLORS } from "@/lib/email";
import type { ChangeEmailEmailProps } from "@/lib/email/types";

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
    return "This email change link expires soon.";
  }
  if (minutes === 1) {
    return "This email change link expires in 1 minute.";
  }
  if (minutes < 60) {
    return `This email change link expires in ${minutes} minutes.`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours === 1) {
    return "This email change link expires in 1 hour.";
  }

  return `This email change link expires in ${hours} hours.`;
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

const supportLinkStyle: React.CSSProperties = {
  color: EMAIL_COLORS.primary,
  textDecoration: "none",
  fontWeight: 600,
};

// ----------------------------------------------------------------------
// Main Component
// ----------------------------------------------------------------------

export function ChangeEmailEmail({
  recipientName,
  newEmail,
  confirmEmailUrl,
  expiresInMinutes,
}: ChangeEmailEmailProps): React.JSX.Element {
  const greeting = formatRecipient(recipientName);

  return (
    <EmailLayout
      title="Confirm your new email address"
      subtitle="A request was made to update your account email address."
      preview={`Confirm your new email address for your ${EMAIL_BRAND.name} account.`}
    >
      {/* Primary Call to Action */}
      <Section paddingTop={8} paddingBottom={0}>
        <Heading level={2}>Confirm your new email address</Heading>

        <Text>
          Hello <strong>{greeting}</strong>,
        </Text>

        <Text>
          We received a request to change the primary email address for your{" "}
          <strong>{EMAIL_BRAND.name}</strong> account to <strong>{newEmail}</strong>.
        </Text>

        <Text>
          To complete this update, please verify that you have access to this email address by
          clicking the button below.
        </Text>

        <MutedText marginBottom={0}>
          Your email address will not be changed until you click the confirmation button below.
        </MutedText>
      </Section>

      <Section paddingTop={8} paddingBottom={8}>
        <Button href={confirmEmailUrl}>Confirm Email Address</Button>

        <SmallText align="center" marginTop={16} marginBottom={0} color={EMAIL_COLORS.textMuted}>
          {formatExpiration(expiresInMinutes)}
        </SmallText>
      </Section>

      <Divider />

      {/* Fallback URL Box */}
      <Section paddingTop={8} paddingBottom={0}>
        <Heading level={4}>Can't click the button?</Heading>

        <Text>
          Copy and paste the following link into your web browser to confirm your new email address:
        </Text>

        <div style={urlBoxStyle}>{confirmEmailUrl}</div>

        <SmallText marginTop={16} marginBottom={0}>
          This confirmation link can only be used once and will automatically expire after the time
          shown above.
        </SmallText>
      </Section>

      <Divider />

      {/* Security Guidance */}
      <Section paddingTop={8} paddingBottom={0}>
        <Heading level={4}>Keep your account secure</Heading>

        <Text>
          If you requested this change, no further action is required other than confirming via the
          link above.
        </Text>

        <Text>
          If you did <strong>not</strong> request this change, please ignore this email or contact
          our support team immediately. Your current email address will remain active and unchanged.
        </Text>

        <MutedText marginBottom={0}>
          For your security, never forward this email or share confirmation links with anyone. Our
          team will never ask for this link.
        </MutedText>
      </Section>

      <Divider />

      {/* Support Section */}
      <Section paddingTop={8} paddingBottom={0}>
        <Heading level={4}>Need help?</Heading>

        <Text>
          If you have questions or suspect unauthorized activity on your account, our support team
          is ready to assist you.
        </Text>

        <Button href={EMAIL_BRAND.website} variant="outline">
          Visit {EMAIL_BRAND.name}
        </Button>

        <SmallText align="center" marginTop={16} marginBottom={0} color={EMAIL_COLORS.textMuted}>
          You can also visit{" "}
          <a
            href={EMAIL_BRAND.website}
            target="_blank"
            rel="noopener noreferrer"
            style={supportLinkStyle}
          >
            {EMAIL_BRAND.website}
          </a>{" "}
          for security tips and account assistance.
        </SmallText>
      </Section>

      <Divider />
    </EmailLayout>
  );
}

export default ChangeEmailEmail;
