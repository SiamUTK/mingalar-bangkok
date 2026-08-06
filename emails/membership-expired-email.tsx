import * as React from "react";

import { EMAIL_BRAND, EMAIL_COLORS } from "@/lib/email";
import type { MembershipExpiredEmailProps } from "@/lib/email/types";

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

const expiredBoxStyle: React.CSSProperties = {
  padding: "16px",
  border: `1px solid ${EMAIL_COLORS.border}`,
  borderRadius: "10px",
  backgroundColor: "#F8FAFC",
  marginBottom: "16px",
};

const expiredTableStyle: React.CSSProperties = {
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

export function MembershipExpiredEmail({
  recipientName,
  previousPlanName,
  expirationDate,
  renewUrl,
}: MembershipExpiredEmailProps): React.JSX.Element {
  const greeting = formatRecipient(recipientName);

  return (
    <EmailLayout
      title="Membership Expired"
      subtitle="Your premium membership plan has ended."
      preview={`Your ${previousPlanName} membership on ${EMAIL_BRAND.name} has expired. Renew to restore full access.`}
    >
      {/* Primary Expiration Notification */}
      <Section paddingTop={8} paddingBottom={0}>
        <Heading level={2}>Your Membership Has Expired ⌛</Heading>

        <Text>
          Hello <strong>{greeting}</strong>,
        </Text>

        <Text>
          This email is to notify you that your <strong>{previousPlanName}</strong> membership on{" "}
          <strong>{EMAIL_BRAND.name}</strong> has officially expired on{" "}
          <strong>{expirationDate}</strong>.
        </Text>

        <MutedText marginBottom={0}>
          Your account has been safely transitioned to our standard Free tier. All your saved data,
          profile settings, and history remain intact.
        </MutedText>
      </Section>

      {/* Plan Summary Card */}
      <Section paddingTop={8} paddingBottom={0}>
        <div style={expiredBoxStyle}>
          <table
            role="presentation"
            width="100%"
            cellPadding={0}
            cellSpacing={0}
            border={0}
            style={expiredTableStyle}
          >
            <tbody>
              <tr>
                <td style={labelColumnStyle}>Expired Plan:</td>
                <td style={valueColumnStyle}>{previousPlanName}</td>
              </tr>
              <tr>
                <td style={labelColumnStyle}>Expiration Date:</td>
                <td style={valueColumnStyle}>{expirationDate}</td>
              </tr>
              <tr>
                <td style={labelColumnStyle}>Current Status:</td>
                <td style={{ ...valueColumnStyle, color: "#D97706" }}>Free Tier Active</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* Primary CTA */}
      <Section paddingTop={8} paddingBottom={8}>
        <Button href={renewUrl}>Renew Membership</Button>

        <SmallText align="center" marginTop={16} marginBottom={0} color={EMAIL_COLORS.textMuted}>
          Renew today to instantly restore your unlimited features and priority access.
        </SmallText>
      </Section>

      <Divider />

      {/* What Changes Guidance */}
      <Section paddingTop={8} paddingBottom={0}>
        <Heading level={4}>What changes with the Free tier?</Heading>

        <Text>
          On the Free tier, you can still search the business directory, view public listings, and
          access basic community features.
        </Text>

        <Text>
          However, advanced features such as unlimited AI assistant queries, priority business
          visibility, direct application tools, and premium community perks will be restricted until
          you renew.
        </Text>

        <MutedText marginBottom={0}>
          You can upgrade or renew your subscription at any time directly from your account
          settings.
        </MutedText>
      </Section>

      <Divider />

      {/* Support Section */}
      <Section paddingTop={8} paddingBottom={0}>
        <Heading level={4}>Have questions about your account?</Heading>

        <Text>
          If you need help choosing a plan or have any questions regarding your billing history, our
          support team is always here for you.
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
          or reply to this email for assistance.
        </SmallText>
      </Section>

      <Divider />
    </EmailLayout>
  );
}

export default MembershipExpiredEmail;
