import * as React from "react";

import { EMAIL_BRAND, EMAIL_COLORS, EMAIL_LINKS } from "@/lib/email";
import type { VerificationEmailProps } from "@/lib/email/types";

import { EmailLayout } from "./layouts";
import { Button, Divider } from "./partials";
import { Heading, MutedText, Section, SmallText, Text } from "./shared";

// ----------------------------------------------------------------------
// Helper Functions (Memoized/Cleaned)
// ----------------------------------------------------------------------

function formatExpiration(minutes: number): string {
  if (minutes <= 0) {
    return "This verification link expires soon.";
  }
  if (minutes === 1) {
    return "This verification link expires in 1 minute.";
  }
  if (minutes < 60) {
    return `This verification link expires in ${minutes} minutes.`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours === 1) {
    return "This verification link expires in 1 hour.";
  }

  return `This verification link expires in ${hours} hours.`;
}

function formatRecipient(name?: string): string {
  const value = name?.trim();
  return value && value.length > 0 ? value : "there";
}

// ----------------------------------------------------------------------
// Inline Styles (Reusable tokens to clean up JSX)
// ----------------------------------------------------------------------

const codeContainerStyle: React.CSSProperties = {
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

const linkStyle: React.CSSProperties = {
  color: EMAIL_COLORS.primary,
  textDecoration: "none",
  fontWeight: 600,
};

// ----------------------------------------------------------------------
// Main Component
// ----------------------------------------------------------------------

export function VerificationEmail({
  recipientName,
  verificationUrl,
  expiresInMinutes,
}: VerificationEmailProps): React.JSX.Element {
  const greeting = formatRecipient(recipientName);

  // Safely construct absolute URL
  const loginUrl = React.useMemo(() => {
    try {
      return new URL(EMAIL_LINKS.login, EMAIL_BRAND.website).toString();
    } catch {
      return EMAIL_LINKS.login;
    }
  }, []);

  return (
    <EmailLayout
      title="Verify your email address"
      subtitle="Complete your account verification to start using Mingalar Bangkok."
      preview="Verify your email address to activate your Mingalar Bangkok account."
    >
      {/* Primary Call to Action */}
      <Section paddingTop={8} paddingBottom={0}>
        <Heading level={2}>Verify your email address</Heading>

        <Text>
          Hello <strong>{greeting}</strong>,
        </Text>

        <Text>
          Thank you for creating your <strong>{EMAIL_BRAND.name}</strong> account. Before you can
          start using all features, we need to verify that this email address belongs to you.
        </Text>

        <MutedText marginBottom={0}>
          Please click the button below to verify your email address.
        </MutedText>
      </Section>

      <Section paddingTop={8} paddingBottom={8}>
        <Button href={verificationUrl}>Verify Email Address</Button>

        <SmallText align="center" color={EMAIL_COLORS.textMuted} marginTop={16} marginBottom={0}>
          {formatExpiration(expiresInMinutes)}
        </SmallText>
      </Section>

      <Divider />

      {/* Fallback URL Box */}
      <Section paddingTop={8} paddingBottom={0}>
        <Heading level={4}>Can't click the button?</Heading>

        <Text>Copy and paste the following URL into your web browser:</Text>

        <div style={codeContainerStyle}>{verificationUrl}</div>

        <SmallText marginTop={16} marginBottom={0}>
          This verification link can only be used once.
        </SmallText>
      </Section>

      <Divider />

      {/* Security Guidance */}
      <Section paddingTop={8} paddingBottom={0}>
        <Heading level={4}>Keep your account secure</Heading>

        <Text>
          If you did not create a <strong>{EMAIL_BRAND.name}</strong> account, you can safely ignore
          this email. No account will be activated unless this verification link is used.
        </Text>

        <Text>
          For your security, never forward this email or share the verification link with anyone.
          Our support team will never ask you for this link.
        </Text>

        <Text marginBottom={0}>
          If you believe someone is attempting to use your email address without your permission,
          please contact our support team immediately.
        </Text>
      </Section>

      <Divider />

      {/* Support Section */}
      <Section paddingTop={8} paddingBottom={0}>
        <Heading level={4}>Need help?</Heading>

        <Text>
          If you have any questions or experience any issues while verifying your account, our team
          is ready to help.
        </Text>

        <Button href={loginUrl} variant="outline">
          Go to Sign In
        </Button>

        <SmallText align="center" marginTop={16} marginBottom={0}>
          You can also visit{" "}
          <a href={EMAIL_BRAND.website} target="_blank" rel="noopener noreferrer" style={linkStyle}>
            {EMAIL_BRAND.website}
          </a>{" "}
          for additional support and documentation.
        </SmallText>
      </Section>
    </EmailLayout>
  );
}

export default VerificationEmail;
