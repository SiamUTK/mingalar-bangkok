import * as React from "react";

import { EMAIL_BRAND, EMAIL_COLORS, EMAIL_LINKS } from "@/lib/email";
import type { ResetPasswordEmailProps } from "@/lib/email/types";

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

const supportLinkStyle: React.CSSProperties = {
  color: EMAIL_COLORS.primary,
  textDecoration: "none",
  fontWeight: 600,
};

// ----------------------------------------------------------------------
// Main Component
// ----------------------------------------------------------------------

export function ResetPasswordEmail({
  recipientName,
  loginUrl,
  supportEmail,
}: ResetPasswordEmailProps): React.JSX.Element {
  const greeting = formatRecipient(recipientName);

  // Safely resolve the absolute sign-in URL
  const signInUrl = React.useMemo(() => {
    if (loginUrl?.trim()) {
      return loginUrl;
    }
    try {
      return new URL(EMAIL_LINKS.login, EMAIL_BRAND.website).toString();
    } catch {
      return EMAIL_LINKS.login;
    }
  }, [loginUrl]);

  return (
    <EmailLayout
      title="Your password has been changed"
      subtitle="Your account password has been updated successfully."
      preview="Your Mingalar Bangkok password has been changed successfully."
    >
      {/* Confirmation Message */}
      <Section paddingTop={8} paddingBottom={0}>
        <Heading level={2}>Password updated successfully</Heading>

        <Text>
          Hello <strong>{greeting}</strong>,
        </Text>

        <Text>
          This email confirms that the password for your <strong>{EMAIL_BRAND.name}</strong> account
          has been changed successfully.
        </Text>

        <Text>
          If you made this change, no further action is required. Your account is now protected with
          your new password.
        </Text>

        <MutedText marginBottom={0}>You can sign in immediately using your new password.</MutedText>
      </Section>

      <Section paddingTop={8} paddingBottom={8}>
        <Button href={signInUrl}>Sign In</Button>

        <SmallText align="center" marginTop={16} marginBottom={0} color={EMAIL_COLORS.textMuted}>
          Your previous password can no longer be used to access your account.
        </SmallText>
      </Section>

      <Divider />

      {/* Security Guidance */}
      <Section paddingTop={8} paddingBottom={0}>
        <Heading level={4}>Keep your account secure</Heading>

        <Text>
          Your password has been updated and your account is now protected by your new credentials.
          We recommend using a unique password that is not shared with any other online service.
        </Text>

        <Text>
          If your account is signed in on multiple devices, you may be asked to sign in again using
          your new password.
        </Text>

        <MutedText marginBottom={0}>
          Never share your password with anyone. Our support team will never ask for your password.
        </MutedText>
      </Section>

      <Divider />

      {/* Security Warning / Unauthorized Access */}
      <Section paddingTop={8} paddingBottom={0}>
        <Heading level={4}>Didn't change your password?</Heading>

        <Text>
          If you did <strong>not</strong> change your password, your account may have been accessed
          by someone else.
        </Text>

        <Text>
          We recommend signing in immediately, changing your password again, and reviewing your
          account activity to make sure everything looks correct.
        </Text>

        {supportEmail ? (
          <Text marginBottom={0}>
            If you cannot access your account, please contact our support team immediately at{" "}
            <a href={`mailto:${supportEmail}`} style={supportLinkStyle}>
              {supportEmail}
            </a>
            .
          </Text>
        ) : (
          <Text marginBottom={0}>
            If you cannot access your account, please contact our support team immediately through{" "}
            <a
              href={EMAIL_BRAND.website}
              target="_blank"
              rel="noopener noreferrer"
              style={supportLinkStyle}
            >
              {EMAIL_BRAND.website}
            </a>
            .
          </Text>
        )}
      </Section>

      <Divider />

      {/* Support Section */}
      <Section paddingTop={8} paddingBottom={0}>
        <Heading level={4}>Need assistance?</Heading>

        <Text>
          If you experience any issues signing in with your new password, our support team is here
          to help.
        </Text>

        <Button href={EMAIL_BRAND.website} variant="outline">
          Visit {EMAIL_BRAND.name}
        </Button>

        <SmallText align="center" marginTop={16} marginBottom={0} color={EMAIL_COLORS.textMuted}>
          This is an automated security notification. Please do not reply directly to this email.
        </SmallText>
      </Section>
    </EmailLayout>
  );
}

export default ResetPasswordEmail;
