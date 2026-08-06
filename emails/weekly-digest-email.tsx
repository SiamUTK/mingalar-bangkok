import * as React from "react";

import { EMAIL_BRAND, EMAIL_COLORS } from "@/lib/email";
import type { WeeklyDigestEmailProps } from "@/lib/email/types";

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

const cardStyle: React.CSSProperties = {
  padding: "16px",
  border: `1px solid ${EMAIL_COLORS.border}`,
  borderRadius: "10px",
  backgroundColor: "#F8FAFC",
  marginBottom: "12px",
};

const cardTitleStyle: React.CSSProperties = {
  margin: "0 0 6px",
  fontSize: "15px",
  fontWeight: 700,
  color: "#1F2937",
};

const cardMetaStyle: React.CSSProperties = {
  margin: "0 0 8px",
  fontSize: "13px",
  color: EMAIL_COLORS.textMuted,
};

const cardLinkStyle: React.CSSProperties = {
  color: EMAIL_COLORS.primary,
  textDecoration: "none",
  fontWeight: 600,
  fontSize: "13px",
};

const supportLinkStyle: React.CSSProperties = {
  color: EMAIL_COLORS.primary,
  textDecoration: "none",
  fontWeight: 600,
};

// ----------------------------------------------------------------------
// Main Component
// ----------------------------------------------------------------------

export function WeeklyDigestEmail({
  recipientName,
  weekRange,
  featuredJobs = [],
  featuredBusinesses = [],
  featuredHousing = [],
  communityHighlights = [],
  dashboardUrl,
  unsubscribeUrl,
}: WeeklyDigestEmailProps): React.JSX.Element {
  const greeting = formatRecipient(recipientName);

  const hasJobs = featuredJobs.length > 0;
  const hasBusinesses = featuredBusinesses.length > 0;
  const hasHousing = featuredHousing.length > 0;
  const hasHighlights = communityHighlights.length > 0;

  return (
    <EmailLayout
      title={`Weekly Digest ${weekRange ? `(${weekRange})` : ""}`}
      subtitle="Your weekly roundup of top updates, jobs, and community highlights."
      preview={`Explore this week's top opportunities and highlights on ${EMAIL_BRAND.name}.`}
    >
      {/* Header & Main Greeting */}
      <Section paddingTop={8} paddingBottom={0}>
        <Heading level={2}>Weekly Highlights 🗞️</Heading>

        <Text>
          Hello <strong>{greeting}</strong>,
        </Text>

        <Text>
          Here is your weekly digest from <strong>{EMAIL_BRAND.name}</strong> featuring the latest
          job openings, verified businesses, housing opportunities, and community updates tailored
          for you in Thailand.
        </Text>
      </Section>

      {/* Featured Jobs Section */}
      {hasJobs && (
        <>
          <Divider />
          <Section paddingTop={8} paddingBottom={0}>
            <Heading level={4}>💼 Top Career Opportunities</Heading>
            {featuredJobs.map((job) => (
              <div key={job.id} style={cardStyle}>
                <p style={cardTitleStyle}>{job.title}</p>
                <p style={cardMetaStyle}>
                  {job.company} • {job.location} {job.salary ? `• ${job.salary}` : ""}
                </p>
                {job.url && (
                  <a href={job.url} target="_blank" rel="noopener noreferrer" style={cardLinkStyle}>
                    View Job Details →
                  </a>
                )}
              </div>
            ))}
          </Section>
        </>
      )}

      {/* Featured Businesses Section */}
      {hasBusinesses && (
        <>
          <Divider />
          <Section paddingTop={8} paddingBottom={0}>
            <Heading level={4}>📍 Featured Local Businesses</Heading>
            {featuredBusinesses.map((biz) => (
              <div key={biz.id} style={cardStyle}>
                <p style={cardTitleStyle}>{biz.name}</p>
                <p style={cardMetaStyle}>
                  {biz.category} • {biz.location}
                </p>
                {biz.description && (
                  <Text marginBottom={8} style={{ fontSize: "14px", color: "#4B5563" }}>
                    {biz.description}
                  </Text>
                )}
                {biz.url && (
                  <a href={biz.url} target="_blank" rel="noopener noreferrer" style={cardLinkStyle}>
                    Explore Business Profile →
                  </a>
                )}
              </div>
            ))}
          </Section>
        </>
      )}

      {/* Featured Housing Listings */}
      {hasHousing && (
        <>
          <Divider />
          <Section paddingTop={8} paddingBottom={0}>
            <Heading level={4}>🏠 Available Housing & Rentals</Heading>
            {featuredHousing.map((house) => (
              <div key={house.id} style={cardStyle}>
                <p style={cardTitleStyle}>{house.title}</p>
                <p style={cardMetaStyle}>
                  {house.location} • {house.price}
                </p>
                {house.url && (
                  <a
                    href={house.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={cardLinkStyle}
                  >
                    View Listing →
                  </a>
                )}
              </div>
            ))}
          </Section>
        </>
      )}

      {/* Community Highlights */}
      {hasHighlights && (
        <>
          <Divider />
          <Section paddingTop={8} paddingBottom={0}>
            <Heading level={4}>🌟 Community Updates & Guides</Heading>
            {communityHighlights.map((item) => (
              <div key={item.id} style={cardStyle}>
                <p style={cardTitleStyle}>{item.title}</p>
                {item.summary && (
                  <Text marginBottom={8} style={{ fontSize: "14px", color: "#4B5563" }}>
                    {item.summary}
                  </Text>
                )}
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={cardLinkStyle}
                  >
                    Read Full Story →
                  </a>
                )}
              </div>
            ))}
          </Section>
        </>
      )}

      {/* Main Call to Action */}
      <Section paddingTop={8} paddingBottom={8}>
        <Button href={dashboardUrl}>Open My Dashboard</Button>

        <SmallText align="center" marginTop={16} marginBottom={0} color={EMAIL_COLORS.textMuted}>
          Sign in to access personalized AI recommendations and search all categories.
        </SmallText>
      </Section>

      <Divider />

      {/* Preferences & Unsubscribe */}
      <Section paddingTop={8} paddingBottom={0}>
        <Heading level={4}>Email Preferences</Heading>

        <Text>
          You are receiving this weekly digest because you are a registered member of{" "}
          <strong>{EMAIL_BRAND.name}</strong>.
        </Text>

        {unsubscribeUrl ? (
          <MutedText marginBottom={0}>
            If you prefer not to receive weekly summary emails, you can{" "}
            <a href={unsubscribeUrl} style={supportLinkStyle}>
              update your email preferences
            </a>{" "}
            anytime.
          </MutedText>
        ) : (
          <MutedText marginBottom={0}>
            You can update your notification settings anytime from your account dashboard.
          </MutedText>
        )}
      </Section>

      <Divider />
    </EmailLayout>
  );
}

export default WeeklyDigestEmail;
