import * as React from "react";

import { EMAIL_BRAND, EMAIL_COLORS, EMAIL_LINKS } from "@/lib/email";
import type { WelcomeEmailProps } from "@/lib/email/types";

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

const featureBoxStyle: React.CSSProperties = {
  padding: "16px",
  border: `1px solid ${EMAIL_COLORS.border}`,
  borderRadius: "10px",
  backgroundColor: "#F8FAFC",
};

const featureTableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
};

// ----------------------------------------------------------------------
// Main Component
// ----------------------------------------------------------------------

export function WelcomeEmail({
  recipientName,
  dashboardUrl,
}: WelcomeEmailProps): React.JSX.Element {
  const greeting = formatRecipient(recipientName);

  // Safely construct absolute profile URL
  const profileUrl = React.useMemo(() => {
    try {
      return new URL(EMAIL_LINKS.settings, EMAIL_BRAND.website).toString();
    } catch {
      return EMAIL_LINKS.settings;
    }
  }, []);

  return (
    <EmailLayout
      title={`Welcome to ${EMAIL_BRAND.name}`}
      subtitle="Your account has been successfully verified."
      preview={`Welcome to ${EMAIL_BRAND.name}. Your account is now ready to use.`}
    >
      {/* Header & Main Welcome */}
      <Section paddingTop={8} paddingBottom={0}>
        <Heading level={2}>🎉 Welcome to {EMAIL_BRAND.name}</Heading>

        <Text>
          Hello <strong>{greeting}</strong>,
        </Text>

        <Text>
          Your email address has been verified successfully and your account is now active. Welcome
          to the official AI-powered platform built for the Myanmar community in Thailand.
        </Text>

        <MutedText marginBottom={0}>
          You now have access to your personal dashboard and can begin exploring all available
          features.
        </MutedText>
      </Section>

      <Section paddingTop={8} paddingBottom={8}>
        <Button href={dashboardUrl}>Open My Dashboard</Button>

        <SmallText align="center" marginTop={16} marginBottom={0} color={EMAIL_COLORS.textMuted}>
          Your dashboard is available immediately after signing in.
        </SmallText>
      </Section>

      <Divider />

      {/* Feature Highlights Table */}
      <Section paddingTop={8} paddingBottom={0}>
        <Heading level={4}>Here's what you can do next</Heading>

        <Text>
          Your account is now ready. Start exploring the platform and personalize your experience.
        </Text>

        <table
          role="presentation"
          width="100%"
          cellPadding={0}
          cellSpacing={0}
          border={0}
          style={featureTableStyle}
        >
          <tbody>
            <tr>
              <td style={featureBoxStyle}>
                <Text marginBottom={8}>✅ Complete your profile</Text>
                <Text marginBottom={8}>🤖 Try the AI Assistant</Text>
                <Text marginBottom={8}>📍 Discover trusted local businesses</Text>
                <Text marginBottom={8}>💼 Browse jobs and career opportunities</Text>
                <Text marginBottom={0}>🏠 Find housing, travel and community services</Text>
              </td>
            </tr>
          </tbody>
        </table>

        <Section paddingTop={16} paddingBottom={0}>
          <Button href={profileUrl} variant="outline">
            Complete My Profile
          </Button>
        </Section>
      </Section>

      <Divider />

      {/* Brand Mission Statement */}
      <Section paddingTop={8} paddingBottom={0}>
        <Heading level={4}>Why {EMAIL_BRAND.name}?</Heading>

        <Text>
          We built this platform to make everyday life in Thailand easier for the Myanmar community
          by bringing trusted information, useful services and AI-powered assistance into one place.
        </Text>

        <MutedText marginBottom={0}>
          New features and improvements are released regularly, so you'll always have access to the
          latest tools and resources.
        </MutedText>
      </Section>

      <Divider />

      {/* Getting Started & Support */}
      <Section paddingTop={8} paddingBottom={0}>
        <Heading level={4}>Need help getting started?</Heading>

        <Text>
          Our team is here to help you every step of the way. Whether you're looking for jobs,
          trusted businesses, housing, travel information or AI assistance, we're committed to
          providing a safe and reliable experience.
        </Text>

        <Text>
          Visit our website anytime to discover new services, community updates and future features
          designed specifically for the Myanmar community living in Thailand.
        </Text>

        <Button href={EMAIL_BRAND.website} variant="secondary">
          Explore Mingalar Bangkok
        </Button>

        <SmallText align="center" marginTop={16} marginBottom={0} color={EMAIL_COLORS.textMuted}>
          We recommend bookmarking our website so you can quickly access your dashboard and the
          latest updates.
        </SmallText>
      </Section>

      <Divider />

      {/* Security & System Communication */}
      <Section paddingTop={8} paddingBottom={0}>
        <Heading level={4}>Stay connected</Heading>

        <Text>
          You'll occasionally receive important account notifications, security alerts and feature
          updates. We only send emails that help you get the most out of your account.
        </Text>

        <MutedText marginBottom={0}>
          Thank you for choosing <strong>{EMAIL_BRAND.name}</strong>. We're excited to have you as
          part of our community.
        </MutedText>
      </Section>
    </EmailLayout>
  );
}

export default WelcomeEmail;
