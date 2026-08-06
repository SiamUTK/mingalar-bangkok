import * as React from "react";

import { EMAIL_BRAND, EMAIL_COLORS } from "@/lib/email";
import type { MembershipUpgradedEmailProps } from "@/lib/email/types";

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

const planBoxStyle: React.CSSProperties = {
  padding: "16px",
  border: `1px solid ${EMAIL_COLORS.border}`,
  borderRadius: "10px",
  backgroundColor: "#F8FAFC",
  marginBottom: "16px",
};

const planTableStyle: React.CSSProperties = {
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

const featureBoxStyle: React.CSSProperties = {
  padding: "16px",
  border: `1px solid ${EMAIL_COLORS.border}`,
  borderRadius: "10px",
  backgroundColor: "#FFFFFF",
};

const featureTableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
};

const supportLinkStyle: React.CSSProperties = {
  color: EMAIL_COLORS.primary,
  textDecoration: "none",
  fontWeight: 600,
};

// ----------------------------------------------------------------------
// Main Component
// ----------------------------------------------------------------------

export function MembershipUpgradedEmail({
  recipientName,
  newPlanName,
  effectiveDate,
  nextBillingDate,
  dashboardUrl,
}: MembershipUpgradedEmailProps): React.JSX.Element {
  const greeting = formatRecipient(recipientName);

  return (
    <EmailLayout
      title="Membership Upgraded"
      subtitle="Your account membership has been successfully updated."
      preview={`Congratulations! Your ${EMAIL_BRAND.name} account is now upgraded to ${newPlanName}.`}
    >
      {/* Primary Success Notification */}
      <Section paddingTop={8} paddingBottom={0}>
        <Heading level={2}>Membership Upgraded! 🚀</Heading>

        <Text>
          Hello <strong>{greeting}</strong>,
        </Text>

        <Text>
          Congratulations! Your <strong>{EMAIL_BRAND.name}</strong> account has been successfully
          upgraded to the <strong>{newPlanName}</strong> plan.
        </Text>

        <MutedText marginBottom={0}>
          All premium features, enhanced quotas, and priority services associated with your new plan
          are now active and ready to use.
        </MutedText>
      </Section>

      {/* Plan Details Card */}
      <Section paddingTop={8} paddingBottom={0}>
        <div style={planBoxStyle}>
          <table
            role="presentation"
            width="100%"
            cellPadding={0}
            cellSpacing={0}
            border={0}
            style={planTableStyle}
          >
            <tbody>
              <tr>
                <td style={labelColumnStyle}>Current Plan:</td>
                <td style={{ ...valueColumnStyle, color: EMAIL_COLORS.primary }}>{newPlanName}</td>
              </tr>
              <tr>
                <td style={labelColumnStyle}>Effective Date:</td>
                <td style={valueColumnStyle}>{effectiveDate}</td>
              </tr>
              {nextBillingDate && (
                <tr>
                  <td style={labelColumnStyle}>Next Renewal Date:</td>
                  <td style={valueColumnStyle}>{nextBillingDate}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Primary CTA */}
      <Section paddingTop={8} paddingBottom={8}>
        <Button href={dashboardUrl}>Explore Premium Features</Button>

        <SmallText align="center" marginTop={16} marginBottom={0} color={EMAIL_COLORS.textMuted}>
          Your updated privileges are immediately available on your dashboard.
        </SmallText>
      </Section>

      <Divider />

      {/* Premium Features Highlights */}
      <Section paddingTop={8} paddingBottom={0}>
        <Heading level={4}>What's included in your upgraded plan?</Heading>

        <Text>Here is a quick look at the enhanced features unlocked for your account:</Text>

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
                <Text marginBottom={8}>
                  🤖 <strong>Unlimited AI Assistance:</strong> Get instant answers, translations,
                  and guidance without daily limits.
                </Text>
                <Text marginBottom={8}>
                  ⭐ <strong>Priority Listing Visibility:</strong> Business and service listings
                  receive top placement in search results.
                </Text>
                <Text marginBottom={8}>
                  💼 <strong>Direct Employer Access:</strong> Apply to verified job postings with
                  priority applicant status.
                </Text>
                <Text marginBottom={0}>
                  ⚡ <strong>Exclusive Perks:</strong> Access specialized housing, legal, and
                  community tools tailored for you.
                </Text>
              </td>
            </tr>
          </tbody>
        </table>
      </Section>

      <Divider />

      {/* Billing & Subscription Management */}
      <Section paddingTop={8} paddingBottom={0}>
        <Heading level={4}>Managing your subscription</Heading>

        <Text>
          You can review your billing receipts, manage payment methods, or make adjustments to your
          subscription plan anytime through your account settings.
        </Text>

        <MutedText marginBottom={0}>
          An official receipt for this transaction has been dispatched separately to your registered
          email address.
        </MutedText>
      </Section>

      <Divider />

      {/* Support Section */}
      <Section paddingTop={8} paddingBottom={0}>
        <Heading level={4}>Need assistance with your plan?</Heading>

        <Text>
          If you have questions about your new plan benefits or need help getting started, our
          dedicated support team is ready to assist.
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
          or reply directly to this email for member support.
        </SmallText>
      </Section>

      <Divider />
    </EmailLayout>
  );
}

export default MembershipUpgradedEmail;
