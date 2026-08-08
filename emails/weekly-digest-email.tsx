import * as React from "react";
import {
  EmailLayout,
  Heading,
  Section,
  Text,
  MutedText,
  SmallText,
  Divider,
  Button,
} from "@/lib/email/components";
import { EMAIL_BRAND, EMAIL_COLORS } from "@/lib/email/constants";
import type { WeeklyDigestEmailProps, WeeklyDigestItem } from "@/lib/email/types/email-props";

function DigestSection({
  title,
  items,
}: {
  title: string;
  items: readonly WeeklyDigestItem[];
}): React.JSX.Element | null {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <Section style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {items.map((item, index) => (
        <Section key={`${item.title}-${index}`} style={styles.itemCard}>
          <Text style={styles.itemTitle}>
            <a href={item.url} style={styles.itemLink}>
              {item.title}
            </a>
          </Text>
          <Text style={styles.itemDescription}>{item.description}</Text>
        </Section>
      ))}
    </Section>
  );
}

export default function WeeklyDigestEmail({
  recipientName,
  weekRange,
  featuredJobs = [],
  featuredBusinesses = [],
  featuredHousing = [],
  communityHighlights = [],
  dashboardUrl,
  unsubscribeUrl,
}: WeeklyDigestEmailProps): React.JSX.Element {
  return (
    <EmailLayout previewText={`Your ${EMAIL_BRAND.name} Weekly Digest (${weekRange})`}>
      <Section style={styles.container}>
        <Heading style={styles.heading}>Your Weekly Digest</Heading>

        <Text style={styles.subheading}>{weekRange}</Text>

        <Text style={styles.text}>Hello {recipientName},</Text>

        <Text style={styles.text}>
          Here is your curated weekly roundup of top updates, opportunities, and community activity
          from {EMAIL_BRAND.name}.
        </Text>

        <DigestSection title="Featured Jobs" items={featuredJobs} />
        <DigestSection title="Featured Businesses" items={featuredBusinesses} />
        <DigestSection title="Featured Housing" items={featuredHousing} />
        <DigestSection title="Community Highlights" items={communityHighlights} />

        <Section style={styles.buttonContainer}>
          <Button href={dashboardUrl} style={styles.button}>
            Go to Your Dashboard
          </Button>
        </Section>

        <Divider style={styles.divider} />

        {unsubscribeUrl ? (
          <MutedText style={styles.unsubscribeText}>
            Don&apos;t want to receive these emails?{" "}
            <a href={unsubscribeUrl} style={styles.footerLink}>
              Unsubscribe from weekly digest
            </a>
          </MutedText>
        ) : null}

        <SmallText style={styles.mutedText}>
          You are receiving this digest because you are a registered user on {EMAIL_BRAND.name}.
        </SmallText>
      </Section>
    </EmailLayout>
  );
}

const styles = {
  container: {
    padding: "0 24px",
  },
  heading: {
    color: EMAIL_COLORS.textPrimary,
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "left" as const,
    margin: "0 0 4px",
  },
  subheading: {
    color: EMAIL_COLORS.textMuted,
    fontSize: "14px",
    fontWeight: "600",
    margin: "0 0 20px",
  },
  text: {
    color: EMAIL_COLORS.textSecondary,
    fontSize: "16px",
    lineHeight: "24px",
    margin: "0 0 16px",
  },
  sectionContainer: {
    margin: "24px 0 12px",
  },
  sectionTitle: {
    color: EMAIL_COLORS.textPrimary,
    fontSize: "18px",
    fontWeight: "bold",
    margin: "0 0 12px",
    paddingBottom: "6px",
    borderBottom: `2px solid ${EMAIL_COLORS.primary}`,
  },
  itemCard: {
    backgroundColor: "#f8fafc",
    borderRadius: "6px",
    border: `1px solid ${EMAIL_COLORS.border}`,
    padding: "14px 16px",
    margin: "0 0 10px",
  },
  itemTitle: {
    fontSize: "15px",
    fontWeight: "bold",
    margin: "0 0 4px",
  },
  itemLink: {
    color: EMAIL_COLORS.primary,
    textDecoration: "none",
  },
  itemDescription: {
    color: EMAIL_COLORS.textSecondary,
    fontSize: "14px",
    lineHeight: "20px",
    margin: "0",
  },
  buttonContainer: {
    margin: "32px 0 24px",
    textAlign: "center" as const,
  },
  button: {
    backgroundColor: EMAIL_COLORS.primary,
    borderRadius: "6px",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "bold",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "inline-block",
    padding: "12px 24px",
  },
  divider: {
    borderColor: EMAIL_COLORS.border,
    margin: "24px 0",
  },
  unsubscribeText: {
    color: EMAIL_COLORS.textMuted,
    fontSize: "13px",
    lineHeight: "18px",
    margin: "0 0 8px",
    textAlign: "center" as const,
  },
  footerLink: {
    color: EMAIL_COLORS.textMuted,
    textDecoration: "underline",
  },
  mutedText: {
    color: EMAIL_COLORS.textMuted,
    fontSize: "12px",
    lineHeight: "18px",
    margin: "0",
    textAlign: "center" as const,
  },
};
